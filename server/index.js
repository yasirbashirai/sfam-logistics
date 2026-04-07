// SFam Logistics — Backend API
// Express + SQLite + multer (file uploads) + nodemailer (optional alerts)

import express from 'express'
import cors from 'cors'
import multer from 'multer'
import Database from 'better-sqlite3'
import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOAD_DIR = path.join(__dirname, 'uploads')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

// === DATABASE ===
const db = new Database(path.join(__dirname, 'sfam.db'))
db.pragma('journal_mode = WAL')

const tables = ['quotes', 'carriers', 'agents', 'contacts']
tables.forEach(t => {
  db.exec(`CREATE TABLE IF NOT EXISTS ${t} (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    payload TEXT NOT NULL
  )`)
})

// Loads (tracking)
db.exec(`CREATE TABLE IF NOT EXISTS loads (
  id TEXT PRIMARY KEY,
  tracking_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL,
  origin TEXT,
  destination TEXT,
  carrier TEXT,
  pickup_date TEXT,
  delivery_date TEXT,
  current_location TEXT,
  events TEXT,
  created_at TEXT NOT NULL
)`)

// Seed demo loads if empty
const loadCount = db.prepare('SELECT COUNT(*) as c FROM loads').get().c
if (loadCount === 0) {
  const seed = [
    { tracking_number: 'SFAM-2026-0001', status: 'In Transit', origin: 'Seattle, WA', destination: 'Los Angeles, CA', carrier: 'Pacific Trans LLC', pickup_date: '2026-04-05', delivery_date: '2026-04-09', current_location: 'Sacramento, CA',
      events: JSON.stringify([
        { time: '2026-04-05 08:30', event: 'Picked up', location: 'Seattle, WA' },
        { time: '2026-04-05 19:45', event: 'In transit', location: 'Portland, OR' },
        { time: '2026-04-06 11:20', event: 'In transit', location: 'Redding, CA' },
        { time: '2026-04-07 09:00', event: 'Currently here', location: 'Sacramento, CA' }
      ]) },
    { tracking_number: 'SFAM-2026-0002', status: 'Delivered', origin: 'Dallas, TX', destination: 'Atlanta, GA', carrier: 'Southern Hauling Co', pickup_date: '2026-04-01', delivery_date: '2026-04-03', current_location: 'Atlanta, GA',
      events: JSON.stringify([
        { time: '2026-04-01 07:00', event: 'Picked up', location: 'Dallas, TX' },
        { time: '2026-04-02 14:30', event: 'In transit', location: 'Birmingham, AL' },
        { time: '2026-04-03 10:15', event: 'Delivered', location: 'Atlanta, GA' }
      ]) }
  ]
  const stmt = db.prepare('INSERT INTO loads (id, tracking_number, status, origin, destination, carrier, pickup_date, delivery_date, current_location, events, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)')
  seed.forEach(l => stmt.run(crypto.randomUUID(), l.tracking_number, l.status, l.origin, l.destination, l.carrier, l.pickup_date, l.delivery_date, l.current_location, l.events, new Date().toISOString()))
}

// === EMAIL (optional) ===
let transporter = null
if (process.env.SMTP_HOST) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  })
}
const sendAlert = async (subject, body) => {
  if (!transporter) return console.log(`[ALERT] ${subject}`)
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@sfamlogistics.com',
      to: process.env.ALERT_TO || 'info@sfamlogistics.com',
      subject, text: body
    })
  } catch (e) { console.error('Email failed:', e.message) }
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

const list = (table) => db.prepare(`SELECT * FROM ${table} ORDER BY created_at DESC`).all().map(r => ({ ...r, ...JSON.parse(r.payload) }))
const insert = (table, payload) => {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  db.prepare(`INSERT INTO ${table} (id, created_at, status, payload) VALUES (?, ?, ?, ?)`).run(id, now, 'new', JSON.stringify(payload))
  return { id, created_at: now, status: 'new', ...payload }
}
const updateStatus = (table, id, status) => db.prepare(`UPDATE ${table} SET status = ? WHERE id = ?`).run(status, id)
const remove = (table, id) => db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id)

// === ROUTES ===
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }))

// Generic CRUD per table
tables.forEach(table => {
  app.get(`/api/${table}`, (req, res) => res.json(list(table)))
  app.post(`/api/${table}`, (req, res) => {
    const row = insert(table, req.body)
    sendAlert(`New ${table.slice(0, -1)} submission`, JSON.stringify(req.body, null, 2))
    res.json(row)
  })
  app.patch(`/api/${table}/:id`, (req, res) => { updateStatus(table, req.params.id, req.body.status); res.json({ ok: true }) })
  app.delete(`/api/${table}/:id`, (req, res) => { remove(table, req.params.id); res.json({ ok: true }) })
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

// Load tracking
app.get('/api/loads', (req, res) => {
  const rows = db.prepare('SELECT * FROM loads ORDER BY created_at DESC').all()
  res.json(rows.map(r => ({ ...r, events: JSON.parse(r.events || '[]') })))
})
app.get('/api/loads/:tracking', (req, res) => {
  const row = db.prepare('SELECT * FROM loads WHERE tracking_number = ?').get(req.params.tracking)
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json({ ...row, events: JSON.parse(row.events || '[]') })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`✅ SFam API running on http://localhost:${PORT}`))
