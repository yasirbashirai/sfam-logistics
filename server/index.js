// SFam Logistics — Backend API
// Express + (Postgres OR SQLite) + multer (file uploads) + nodemailer (optional alerts)
//
// STORAGE:
//   • If DATABASE_URL is set (e.g. a Neon Postgres connection string), all data is
//     stored in Postgres — permanent, survives every restart/redeploy. THIS IS THE
//     PRODUCTION MODE. Set DATABASE_URL in the Render dashboard.
//   • If DATABASE_URL is NOT set, we fall back to a local SQLite file (sfam.db).
//     Convenient for local dev, but on Render's free tier that file is wiped on
//     every restart — do not rely on it for real leads.
//
// There is NO demo/seed data. The database only ever contains real submissions.

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOAD_DIR = path.join(__dirname, 'uploads')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

// === DATABASE LAYER (Postgres in prod, SQLite fallback for local dev) ===
const PG = !!process.env.DATABASE_URL
let pool = null
let sqlite = null

if (PG) {
  const pg = (await import('pg')).default
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Neon (and most hosted PG) require SSL
  })
  console.log('🗄️  Using Postgres (DATABASE_URL set) — data is permanent.')
} else {
  const Database = (await import('better-sqlite3')).default
  sqlite = new Database(path.join(__dirname, 'sfam.db'))
  sqlite.pragma('journal_mode = WAL')
  console.log('🗄️  Using local SQLite (no DATABASE_URL) — NOT durable on Render free tier.')
}

// Dialect-specific bits
const JSON_T = PG ? 'JSONB' : 'TEXT'        // payload / events column type
const TS_T = PG ? 'TIMESTAMPTZ' : 'TEXT'    // created_at / last_message_at column type
const emailExpr = PG ? "payload->>'email'" : "json_extract(payload, '$.email')"

// Unified async query helper. Write SQL with $1, $2... placeholders (Postgres
// style). For SQLite we transparently convert them to positional `?` markers.
const q = async (sql, params = []) => {
  if (PG) {
    const { rows } = await pool.query(sql, params)
    return rows
  }
  const sqliteSql = sql.replace(/\$\d+/g, '?')
  if (/^\s*select/i.test(sqliteSql)) {
    return sqlite.prepare(sqliteSql).all(...params)
  }
  sqlite.prepare(sqliteSql).run(...params)
  return []
}

// Normalize a generic row (quotes/carriers/etc.) into the shape the frontend expects:
// flatten the JSON payload onto the row and emit created_at as an ISO string.
const parseRow = (r) => {
  const payload = typeof r.payload === 'string' ? JSON.parse(r.payload || '{}') : (r.payload || {})
  const created_at = r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at
  return { ...r, ...payload, created_at }
}

// Normalize a load row (events is JSON).
const parseLoad = (r) => ({
  ...r,
  created_at: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
  events: typeof r.events === 'string' ? JSON.parse(r.events || '[]') : (r.events || [])
})

// === SCHEMA ===
const initDb = async () => {
  const tables = ['quotes', 'carriers', 'agents', 'contacts', 'subscribers']
  for (const t of tables) {
    await q(`CREATE TABLE IF NOT EXISTS ${t} (
      id TEXT PRIMARY KEY,
      created_at ${TS_T} NOT NULL,
      status TEXT DEFAULT 'new',
      payload ${JSON_T} NOT NULL
    )`)
  }

  await q(`CREATE TABLE IF NOT EXISTS loads (
    id TEXT PRIMARY KEY,
    tracking_number TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL,
    origin TEXT,
    destination TEXT,
    carrier TEXT,
    pickup_date TEXT,
    delivery_date TEXT,
    current_location TEXT,
    events ${JSON_T},
    created_at ${TS_T} NOT NULL
  )`)

  await q(`CREATE TABLE IF NOT EXISTS chat_conversations (
    id TEXT PRIMARY KEY,
    visitor_name TEXT,
    visitor_email TEXT,
    page TEXT,
    status TEXT NOT NULL DEFAULT 'open',
    created_at ${TS_T} NOT NULL,
    last_message_at ${TS_T} NOT NULL
  )`)

  await q(`CREATE TABLE IF NOT EXISTS chat_messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL,
    sender TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at ${TS_T} NOT NULL
  )`)

  await q(`CREATE INDEX IF NOT EXISTS idx_chat_messages_convo ON chat_messages(conversation_id, created_at)`)
}

// === EMAIL (optional) ===
let transporter = null
if (process.env.SMTP_HOST) {
  const smtpPort = parseInt(process.env.SMTP_PORT || '587')
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  })
  transporter.verify((err) => {
    if (err) console.error('SMTP verify failed:', err.message)
    else console.log('✅ SMTP ready — alerts will route to', process.env.ALERT_TO || 'info@sfamlogistics.com')
  })
}
// Route inbound form alerts to the right inbox per form type. Each can be
// overridden with an env var; the defaults below are the destinations the client
// explicitly confirmed (note the exact spellings 'qoutes@' and 'agentes@'):
//   - quotes      → qoutes@sfamlogistics.com      (quote requests)
//   - agents      → agentes@sfamlogistics.com     (agent applications)
//   - carriers    → onboarding@sfamlogistics.com  (carrier applications)
//   - subscribers → info@sfamlogistics.com        (newsletter signups)
//   - contacts    → support@sfamlogistics.com     (visitor messages)
const ALERT_ROUTING = {
  quotes:      process.env.ALERT_TO_QUOTES || 'qoutes@sfamlogistics.com',
  agents:      process.env.ALERT_TO_AGENTS || 'agentes@sfamlogistics.com',
  carriers:    process.env.ALERT_TO_CARRIERS || 'onboarding@sfamlogistics.com',
  subscribers: process.env.ALERT_TO_SUBSCRIBERS || 'info@sfamlogistics.com',
  contacts:    process.env.ALERT_TO_CONTACTS || 'support@sfamlogistics.com'
}

const sendAlert = async (subject, body, table = null) => {
  const to = (table && ALERT_ROUTING[table]) || process.env.ALERT_TO || 'info@sfamlogistics.com'
  if (!transporter) return console.log(`[ALERT → ${to}] ${subject}\n${body}`)
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@sfamlogistics.com',
      to,
      subject,
      text: body
    })
  } catch (e) { console.error('Email failed:', e.message) }
}

// Direct mail helper (for confirmation emails to visitor)
const sendMail = async ({ to, subject, text, html }) => {
  if (!transporter) return console.log(`[MAIL → ${to}] ${subject}`)
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@sfamlogistics.com',
      to,
      subject,
      text,
      html
    })
  } catch (e) { console.error('sendMail failed:', e.message) }
}

// === UPLOADS ===
const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-z0-9.\-_]/gi, '_')
    cb(null, `${Date.now()}-${crypto.randomBytes(4).toString('hex')}-${safe}`)
  }
})
const upload = multer({ storage, limits: { fileSize: 15 * 1024 * 1024 } })

// === APP ===
const app = express()
app.use(cors())
app.use(express.json({ limit: '5mb' }))
app.use('/uploads', express.static(UPLOAD_DIR))

const TABLES = ['quotes', 'carriers', 'agents', 'contacts', 'subscribers']

const list = async (table) => {
  const rows = await q(`SELECT * FROM ${table} ORDER BY created_at DESC`)
  return rows.map(parseRow)
}
const insert = async (table, payload) => {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  await q(`INSERT INTO ${table} (id, created_at, status, payload) VALUES ($1, $2, $3, $4)`,
    [id, now, 'new', JSON.stringify(payload)])
  return { id, created_at: now, status: 'new', ...payload }
}
const updateStatus = (table, id, status) => q(`UPDATE ${table} SET status = $1 WHERE id = $2`, [status, id])
const remove = (table, id) => q(`DELETE FROM ${table} WHERE id = $1`, [id])

// === ROUTES ===
app.get('/api/health', (req, res) => res.json({ ok: true, storage: PG ? 'postgres' : 'sqlite', time: new Date().toISOString() }))

// Generic CRUD per table
TABLES.forEach(table => {
  app.get(`/api/${table}`, async (req, res) => {
    try { res.json(await list(table)) }
    catch (e) { console.error(`GET /api/${table} failed:`, e.message); res.status(500).json({ error: 'db error' }) }
  })

  app.post(`/api/${table}`, async (req, res) => {
    const payload = req.body || {}
    try {
      // Subscribers: dedupe by email so we don't store the same address twice
      if (table === 'subscribers' && payload.email) {
        const existing = await q(`SELECT id FROM subscribers WHERE ${emailExpr} = $1`, [payload.email])
        if (existing.length) {
          return res.json({ id: existing[0].id, duplicate: true, ok: true })
        }
      }

      const row = await insert(table, payload)
      sendAlert(`New ${table.slice(0, -1)} submission`, JSON.stringify(payload, null, 2), table)

      // Auto-confirmation email to subscriber
      if (table === 'subscribers' && payload.email) {
        sendMail({
          to: payload.email,
          subject: 'Welcome to SFam Logistics — You\'re Subscribed',
          text: `Thanks for subscribing to SFam Logistics insights.\n\nYou'll receive industry tips, rate trends, and SFam updates straight to your inbox. No spam — ever.\n\nQuestions? Reply directly to this email or reach us at loads@sfamlogistics.com / 1 (888) 698-5556.\n\n— SFam Logistics LLC\n   FMCSA Authorized · MC 1810116 · USDOT 4555943`,
          html: `<div style="font-family:system-ui,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0d1b2e">
  <div style="text-align:center;margin-bottom:20px">
    <h1 style="color:#ff7a18;font-size:24px;margin:0">Welcome to SFam Logistics</h1>
  </div>
  <p>Thanks for subscribing! You'll receive industry tips, rate trends, and SFam updates straight to your inbox. <strong>No spam — ever.</strong></p>
  <p>Questions? Reply directly to this email or reach us at <a href="mailto:loads@sfamlogistics.com" style="color:#ff7a18">loads@sfamlogistics.com</a> / <a href="tel:+18886985556" style="color:#ff7a18">1 (888) 698-5556</a>.</p>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0" />
  <p style="font-size:12px;color:#666">SFam Logistics LLC · FMCSA Authorized · MC 1810116 · USDOT 4555943<br>19125 North Creek Parkway Suite 120, Bothell, WA 98011</p>
</div>`
        })
      }

      res.json(row)
    } catch (e) {
      console.error(`POST /api/${table} failed:`, e.message)
      res.status(500).json({ error: 'db error' })
    }
  })

  app.patch(`/api/${table}/:id`, async (req, res) => {
    try { await updateStatus(table, req.params.id, req.body.status); res.json({ ok: true }) }
    catch (e) { console.error(`PATCH /api/${table} failed:`, e.message); res.status(500).json({ error: 'db error' }) }
  })

  app.delete(`/api/${table}/:id`, async (req, res) => {
    try { await remove(table, req.params.id); res.json({ ok: true }) }
    catch (e) { console.error(`DELETE /api/${table} failed:`, e.message); res.status(500).json({ error: 'db error' }) }
  })
})

// File uploads
app.post('/api/upload', upload.array('files', 6), (req, res) => {
  const files = (req.files || []).map(f => ({
    name: f.originalname,
    size: f.size,
    url: `/uploads/${f.filename}`
  }))
  res.json({ files })
})

// Load tracking — public read
app.get('/api/loads', async (req, res) => {
  try {
    const rows = await q('SELECT * FROM loads ORDER BY created_at DESC')
    res.json(rows.map(parseLoad))
  } catch (e) { console.error('GET /api/loads failed:', e.message); res.status(500).json({ error: 'db error' }) }
})
app.get('/api/loads/:tracking', async (req, res) => {
  try {
    const rows = await q('SELECT * FROM loads WHERE tracking_number = $1', [req.params.tracking])
    if (!rows.length) return res.status(404).json({ error: 'Not found' })
    res.json(parseLoad(rows[0]))
  } catch (e) { console.error('GET /api/loads/:tracking failed:', e.message); res.status(500).json({ error: 'db error' }) }
})

// Load tracking — admin CRUD
app.post('/api/loads', async (req, res) => {
  try {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const b = req.body || {}
    const events = Array.isArray(b.events) ? b.events : []
    await q(`INSERT INTO loads (id, tracking_number, status, origin, destination, carrier, pickup_date, delivery_date, current_location, events, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`, [
      id,
      b.tracking_number,
      b.status || 'Booked',
      b.origin || '',
      b.destination || '',
      b.carrier || '',
      b.pickup_date || '',
      b.delivery_date || '',
      b.current_location || '',
      JSON.stringify(events),
      now
    ])
    res.json({ ok: true, id })
  } catch (e) { console.error('POST /api/loads failed:', e.message); res.status(500).json({ error: 'db error' }) }
})

app.patch('/api/loads/:id', async (req, res) => {
  try {
    const b = req.body || {}
    const rows = await q('SELECT * FROM loads WHERE id = $1', [req.params.id])
    if (!rows.length) return res.status(404).json({ error: 'Not found' })
    const existing = rows[0]
    const existingEvents = typeof existing.events === 'string' ? existing.events : JSON.stringify(existing.events || [])
    const merged = {
      tracking_number: b.tracking_number ?? existing.tracking_number,
      status: b.status ?? existing.status,
      origin: b.origin ?? existing.origin,
      destination: b.destination ?? existing.destination,
      carrier: b.carrier ?? existing.carrier,
      pickup_date: b.pickup_date ?? existing.pickup_date,
      delivery_date: b.delivery_date ?? existing.delivery_date,
      current_location: b.current_location ?? existing.current_location,
      events: b.events !== undefined ? JSON.stringify(b.events) : existingEvents
    }
    await q(`UPDATE loads SET tracking_number=$1, status=$2, origin=$3, destination=$4, carrier=$5, pickup_date=$6, delivery_date=$7, current_location=$8, events=$9 WHERE id=$10`, [
      merged.tracking_number, merged.status, merged.origin, merged.destination, merged.carrier,
      merged.pickup_date, merged.delivery_date, merged.current_location, merged.events, req.params.id
    ])
    res.json({ ok: true })
  } catch (e) { console.error('PATCH /api/loads/:id failed:', e.message); res.status(500).json({ error: 'db error' }) }
})

app.post('/api/loads/:id/event', async (req, res) => {
  try {
    const rows = await q('SELECT * FROM loads WHERE id = $1', [req.params.id])
    if (!rows.length) return res.status(404).json({ error: 'Not found' })
    const row = rows[0]
    const events = typeof row.events === 'string' ? JSON.parse(row.events || '[]') : (row.events || [])
    const ev = {
      time: req.body.time || new Date().toISOString().replace('T', ' ').slice(0, 16),
      event: req.body.event || 'Update',
      location: req.body.location || row.current_location || ''
    }
    events.push(ev)
    const current_location = req.body.current_location || row.current_location || ''
    const status = req.body.status || row.status
    await q(`UPDATE loads SET events=$1, current_location=$2, status=$3 WHERE id=$4`, [
      JSON.stringify(events), current_location, status, req.params.id
    ])
    res.json({ ok: true })
  } catch (e) { console.error('POST /api/loads/:id/event failed:', e.message); res.status(500).json({ error: 'db error' }) }
})

app.delete('/api/loads/:id', async (req, res) => {
  try { await q('DELETE FROM loads WHERE id = $1', [req.params.id]); res.json({ ok: true }) }
  catch (e) { console.error('DELETE /api/loads/:id failed:', e.message); res.status(500).json({ error: 'db error' }) }
})

// === LIVE CHAT ===
app.post('/api/chat/start', async (req, res) => {
  try {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const { firstMessage = '', visitorName = null, visitorEmail = null, page = '/' } = req.body || {}
    await q('INSERT INTO chat_conversations (id, visitor_name, visitor_email, page, status, created_at, last_message_at) VALUES ($1,$2,$3,$4,$5,$6,$7)',
      [id, visitorName, visitorEmail, page, 'open', now, now])
    if (firstMessage) {
      await q('INSERT INTO chat_messages (id, conversation_id, sender, text, created_at) VALUES ($1,$2,$3,$4,$5)',
        [crypto.randomUUID(), id, 'visitor', firstMessage, now])
    }
    sendAlert(
      'New website chat started',
      `A visitor started a chat conversation.\n\nPage: ${page}\nName: ${visitorName || '(anonymous)'}\nEmail: ${visitorEmail || '(none)'}\nFirst message: ${firstMessage || '(none)'}\n\nJoin live: ${process.env.SITE_URL || 'http://localhost:5173'}/admin/chat/${id}`
    )
    res.json({ id })
  } catch (e) { console.error('POST /api/chat/start failed:', e.message); res.status(500).json({ error: 'db error' }) }
})

app.post('/api/chat/:id/message', async (req, res) => {
  try {
    const { sender, text } = req.body || {}
    if (!sender || !text) return res.status(400).json({ error: 'sender and text required' })
    const now = new Date().toISOString()
    const exists = await q('SELECT id FROM chat_conversations WHERE id = $1', [req.params.id])
    if (!exists.length) return res.status(404).json({ error: 'Conversation not found' })
    await q('INSERT INTO chat_messages (id, conversation_id, sender, text, created_at) VALUES ($1,$2,$3,$4,$5)',
      [crypto.randomUUID(), req.params.id, sender, text, now])
    await q('UPDATE chat_conversations SET last_message_at = $1 WHERE id = $2', [now, req.params.id])
    if (sender === 'visitor') {
      sendAlert(
        'New chat message from website visitor',
        `Conversation: ${req.params.id}\n\nMessage:\n${text}\n\nJoin live: ${process.env.SITE_URL || 'http://localhost:5173'}/admin/chat/${req.params.id}`
      )
    }
    res.json({ ok: true })
  } catch (e) { console.error('POST /api/chat/:id/message failed:', e.message); res.status(500).json({ error: 'db error' }) }
})

app.get('/api/chat/:id/messages', async (req, res) => {
  try {
    const sinceId = req.query.since
    let rows
    if (sinceId) {
      const sinceRow = await q('SELECT created_at FROM chat_messages WHERE id = $1', [sinceId])
      if (sinceRow.length) {
        rows = await q('SELECT * FROM chat_messages WHERE conversation_id = $1 AND created_at > $2 ORDER BY created_at ASC',
          [req.params.id, sinceRow[0].created_at])
      } else {
        rows = await q('SELECT * FROM chat_messages WHERE conversation_id = $1 ORDER BY created_at ASC', [req.params.id])
      }
    } else {
      rows = await q('SELECT * FROM chat_messages WHERE conversation_id = $1 ORDER BY created_at ASC', [req.params.id])
    }
    res.json(rows.map(r => ({ ...r, created_at: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at })))
  } catch (e) { console.error('GET /api/chat/:id/messages failed:', e.message); res.status(500).json({ error: 'db error' }) }
})

app.get('/api/chat/conversations', async (req, res) => {
  try {
    const rows = await q(`
      SELECT c.*, (SELECT COUNT(*) FROM chat_messages m WHERE m.conversation_id = c.id) AS message_count
      FROM chat_conversations c
      ORDER BY c.last_message_at DESC
    `)
    res.json(rows.map(r => ({
      ...r,
      message_count: Number(r.message_count),
      created_at: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
      last_message_at: r.last_message_at instanceof Date ? r.last_message_at.toISOString() : r.last_message_at
    })))
  } catch (e) { console.error('GET /api/chat/conversations failed:', e.message); res.status(500).json({ error: 'db error' }) }
})

app.patch('/api/chat/:id', async (req, res) => {
  try {
    const { status } = req.body || {}
    if (status) await q('UPDATE chat_conversations SET status = $1 WHERE id = $2', [status, req.params.id])
    res.json({ ok: true })
  } catch (e) { console.error('PATCH /api/chat/:id failed:', e.message); res.status(500).json({ error: 'db error' }) }
})

// === CONFIRMATION EMAIL (quote/application submissions) ===
app.post('/api/send-confirmation', async (req, res) => {
  const { to, name, type } = req.body
  if (!to) return res.status(400).json({ error: 'Email required' })

  const subjects = {
    'quote': 'SFam Logistics — Quote Request Received',
    'carrier-application': 'SFam Logistics — Carrier Application Received',
    'agent-application': 'SFam Logistics — Agent Application Received',
    'contact': 'SFam Logistics — Message Received',
    'subscribe': 'Welcome to SFam Logistics — You\'re Subscribed'
  }

  const bodies = {
    'quote': `Dear ${name || 'Valued Customer'},\n\nThank you for submitting your quote request with SFam Logistics LLC.\n\nOur team has received your request and will respond with real-time pricing within 30 minutes during business hours (Mon–Fri, 7AM–5PM PST). If submitted after hours, we will respond first thing the next business day.\n\nFor urgent needs, please call us directly at 1 (888) 698-5556.\n\nBest regards,\nSFam Logistics LLC\ninfo@sfamlogistics.com\n1 (888) 698-5556`,
    'carrier-application': `Dear ${name || 'Valued Carrier'},\n\nThank you for submitting your carrier application with SFam Logistics LLC.\n\nYour application has been received and our team will review your authority, insurance, and documentation. Most carriers are approved within 24 hours.\n\nFor questions, please call us at 1 (888) 698-5556 or email info@sfamlogistics.com.\n\nBest regards,\nSFam Logistics LLC`,
    'agent-application': `Dear ${name || 'Valued Applicant'},\n\nThank you for submitting your agent application with SFam Logistics LLC.\n\nYour application has been received. Our recruiting team will review your information and reach out within 48 hours.\n\nFor questions, please call us at 1 (888) 698-5556 or email info@sfamlogistics.com.\n\nBest regards,\nSFam Logistics LLC`,
    'contact': `Dear ${name || 'Valued Customer'},\n\nThank you for contacting SFam Logistics LLC.\n\nYour message has been received and routed to our support team. We will respond within 1 business hour during business hours (Mon–Fri, 7AM–5PM PST).\n\nFor urgent freight needs, please call us at 1 (888) 698-5556 or email support@sfamlogistics.com.\n\nBest regards,\nSFam Logistics LLC`,
    'subscribe': `Dear ${name || 'Subscriber'},\n\nThanks for subscribing to SFam Logistics insights.\n\nYou'll receive industry tips, rate trends, and SFam updates straight to your inbox. No spam — ever.\n\nQuestions? Reply directly to this email or reach us at loads@sfamlogistics.com / 1 (888) 698-5556.\n\n— SFam Logistics LLC\n   FMCSA Authorized · MC 1810116 · USDOT 4555943`
  }

  const subject = subjects[type] || subjects['contact']
  const body = bodies[type] || bodies['contact']

  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'no-reply@sfamlogistics.com',
        to,
        subject,
        text: body
      })
    } catch (e) { console.error('Confirmation email failed:', e.message) }
  } else {
    console.log(`[CONFIRMATION] Would send to ${to}: ${subject}`)
  }

  res.json({ ok: true })
})

// === LIVE AGENT REQUEST (from chatbot) ===
app.post('/api/live-agent-request', async (req, res) => {
  try {
    const { visitorName, visitorEmail, timestamp, conversationId } = req.body
    if (conversationId) {
      await q('UPDATE chat_conversations SET visitor_name = COALESCE($1, visitor_name), visitor_email = COALESCE($2, visitor_email), status = $3 WHERE id = $4',
        [visitorName || null, visitorEmail || null, 'awaiting-agent', conversationId])
    }
    const link = conversationId ? `\n\nJoin live: ${process.env.SITE_URL || 'http://localhost:5173'}/admin/chat/${conversationId}` : ''
    const alertBody = `A website visitor has requested to speak with a live agent.\n\nName: ${visitorName}\nEmail: ${visitorEmail}\nTime: ${timestamp}${link}\n\nPlease reach out to them as soon as possible.`
    await sendAlert('Live Agent Request — Website Visitor', alertBody)
    res.json({ ok: true })
  } catch (e) { console.error('POST /api/live-agent-request failed:', e.message); res.status(500).json({ error: 'db error' }) }
})

// === SERVE PRODUCTION FRONTEND ===
// In production we ship the built React app and the API from the same Node process.
// Looks first for `../public_html` (deploy layout), then falls back to `../dist` (dev build).
const staticCandidates = [
  path.join(__dirname, '..', 'public_html'),
  path.join(__dirname, '..', 'dist')
]
const STATIC_DIR = staticCandidates.find(p => fs.existsSync(p))
if (STATIC_DIR) {
  console.log(`📁 Serving frontend from ${STATIC_DIR}`)

  // Serve the Terms & Conditions PDF at the clean, extension-less URL /terms.
  // Must come before the SPA catch-all below, which would otherwise return index.html.
  app.get(/^\/terms\/?$/, (req, res) => {
    res.type('application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="SFam-Logistics-Terms-and-Conditions-of-Service.pdf"')
    res.sendFile(path.join(STATIC_DIR, 'terms.pdf'))
  })

  app.use(express.static(STATIC_DIR))
  app.get(/^\/(?!api|uploads).*/, (req, res) => {
    res.sendFile(path.join(STATIC_DIR, 'index.html'))
  })
}

const PORT = process.env.PORT || 4000

initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ SFam API running on http://localhost:${PORT}`))
  })
  .catch((e) => {
    console.error('❌ Failed to initialize database:', e.message)
    process.exit(1)
  })
