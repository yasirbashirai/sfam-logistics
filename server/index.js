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

// === SEED 5 DEMO RECORDS PER TABLE (only if empty) ===
const seedRow = (table, payload) => {
  db.prepare(`INSERT INTO ${table} (id, created_at, status, payload) VALUES (?, ?, ?, ?)`).run(
    crypto.randomUUID(), new Date().toISOString(), payload._status || 'new', JSON.stringify(payload)
  )
}

if (db.prepare('SELECT COUNT(*) as c FROM quotes').get().c === 0) {
  ;[
    { name: 'Marcus Thompson', company: 'Pacific Foods Inc', email: 'marcus@pacfoods.com', phone: '206-555-0142', originCity: 'Seattle, WA', originZip: '98101', destCity: 'Los Angeles, CA', destZip: '90001', freightType: 'Full Truckload (FTL)', equipment: 'Reefer', weight: '38000', commodity: 'Frozen seafood', hazmat: false, _status: 'new' },
    { name: 'Jennifer Liu', company: 'Northwest Manufacturing', email: 'jliu@nwmfg.com', phone: '425-555-0188', originCity: 'Portland, OR', originZip: '97201', destCity: 'Dallas, TX', destZip: '75201', freightType: 'Full Truckload (FTL)', equipment: 'Dry Van', weight: '42000', commodity: 'Industrial parts', hazmat: false, _status: 'contacted' },
    { name: 'David Kim', company: 'Westside Distribution LLC', email: 'david@westsidedist.com', phone: '503-555-0167', originCity: 'San Francisco, CA', originZip: '94102', destCity: 'Chicago, IL', destZip: '60601', freightType: 'LTL', equipment: 'Dry Van', weight: '4500', pallets: '6', commodity: 'Electronics', hazmat: false, _status: 'approved' },
    { name: 'Sarah Mendez', company: 'Mendez Produce Co', email: 'sarah@mendezproduce.com', phone: '602-555-0103', originCity: 'Phoenix, AZ', originZip: '85001', destCity: 'Denver, CO', destZip: '80202', freightType: 'Full Truckload (FTL)', equipment: 'Reefer', weight: '36000', commodity: 'Fresh produce', hazmat: false, _status: 'new' },
    { name: 'Roberto Chen', company: 'Lone Star Building Supply', email: 'rchen@lonestar.com', phone: '713-555-0145', originCity: 'Houston, TX', originZip: '77002', destCity: 'Atlanta, GA', destZip: '30301', freightType: 'Full Truckload (FTL)', equipment: 'Flatbed', weight: '44000', commodity: 'Steel beams', hazmat: false, _status: 'contacted' }
  ].forEach(p => seedRow('quotes', p))
}

if (db.prepare('SELECT COUNT(*) as c FROM carriers').get().c === 0) {
  ;[
    { company: 'Pacific Trans LLC', mc: 'MC-987654', dot: '3214567', contactName: 'James Rodriguez', email: 'jr@pacifictrans.com', phone: '206-555-0211', city: 'Tacoma', state: 'WA', zip: '98401', fleetSize: '6-15 trucks', equipmentTypes: ['Dry Van', 'Reefer'], lanes: 'PNW to CA, OTR', _status: 'approved' },
    { company: 'Southern Hauling Co', mc: 'MC-876543', dot: '2987654', contactName: 'Tasha Brooks', email: 'tasha@southernhauling.com', phone: '404-555-0322', city: 'Atlanta', state: 'GA', zip: '30301', fleetSize: '2-5 trucks', equipmentTypes: ['Dry Van', 'Flatbed'], lanes: 'Southeast to Midwest', _status: 'approved' },
    { company: 'Mountain West Express', mc: 'MC-765432', dot: '2876543', contactName: 'Carlos Mendoza', email: 'carlos@mwexpress.com', phone: '801-555-0433', city: 'Salt Lake City', state: 'UT', zip: '84101', fleetSize: '16-50 trucks', equipmentTypes: ['Reefer', 'Dry Van'], lanes: 'Mountain region, West coast', _status: 'new' },
    { company: 'Lone Star Logistics', mc: 'MC-654321', dot: '2765432', contactName: 'Mike Reeves', email: 'mike@lonestarlog.com', phone: '214-555-0544', city: 'Dallas', state: 'TX', zip: '75201', fleetSize: '50+ trucks', equipmentTypes: ['Dry Van', 'Flatbed', 'Step Deck'], lanes: 'TX triangle, nationwide', _status: 'approved' },
    { company: 'Northeast Cartage Inc', mc: 'MC-543210', dot: '2654321', contactName: 'Linda Petrov', email: 'linda@necartage.com', phone: '617-555-0655', city: 'Boston', state: 'MA', zip: '02101', fleetSize: '6-15 trucks', equipmentTypes: ['Dry Van', 'Power Only'], lanes: 'Northeast corridor', _status: 'contacted' }
  ].forEach(p => seedRow('carriers', p))
}

if (db.prepare('SELECT COUNT(*) as c FROM agents').get().c === 0) {
  ;[
    { name: 'Rachel Sanchez', email: 'rachel.s@email.com', phone: '512-555-0701', city: 'Austin', state: 'TX', yearsExperience: '5-10 years', currentCompany: 'BigBox Logistics', bookOfBusiness: 'Medium (6-20 accounts)', monthlyRevenue: '$120,000', specialties: ['Dry Van', 'Reefer'], whyJoin: 'Looking for a brokerage that respects agents and pays fairly.', _status: 'contacted' },
    { name: 'Tom Jackson', email: 'tom.j@email.com', phone: '404-555-0712', city: 'Atlanta', state: 'GA', yearsExperience: '3-5 years', currentCompany: 'Echo Global', bookOfBusiness: 'Small (1-5 active accounts)', monthlyRevenue: '$45,000', specialties: ['Flatbed', 'Specialized'], whyJoin: 'Want better tech and same-day pay.', _status: 'new' },
    { name: 'Linda Kowalski', email: 'linda.k@email.com', phone: '312-555-0723', city: 'Chicago', state: 'IL', yearsExperience: '10+ years', currentCompany: 'TQL', bookOfBusiness: 'Large (20+ accounts)', monthlyRevenue: '$280,000', specialties: ['Dry Van', 'LTL', 'Intermodal'], whyJoin: 'Tired of corporate culture, want autonomy.', _status: 'approved' },
    { name: 'Marcus Wong', email: 'marcus.w@email.com', phone: '714-555-0734', city: 'Anaheim', state: 'CA', yearsExperience: '1-3 years', currentCompany: 'Coyote Logistics', bookOfBusiness: 'None yet', monthlyRevenue: '$15,000', specialties: ['Dry Van'], whyJoin: 'Ready to go independent and build my book.', _status: 'new' },
    { name: 'Diana Patel', email: 'diana.p@email.com', phone: '732-555-0745', city: 'Newark', state: 'NJ', yearsExperience: '5-10 years', currentCompany: 'CH Robinson', bookOfBusiness: 'Medium (6-20 accounts)', monthlyRevenue: '$95,000', specialties: ['Reefer', 'Cross Border'], whyJoin: 'Looking for a smaller, more nimble brokerage.', _status: 'contacted' }
  ].forEach(p => seedRow('agents', p))
}

if (db.prepare('SELECT COUNT(*) as c FROM contacts').get().c === 0) {
  ;[
    { name: 'Alan Foster', email: 'afoster@example.com', phone: '253-555-0801', subject: 'Question about LTL rates', message: 'Hi, we have weekly LTL shipments from Seattle to Boise. Can you provide pricing?', _status: 'new' },
    { name: 'Maria Gomez', email: 'mgomez@example.com', phone: '619-555-0812', subject: 'Carrier setup question', message: 'How long does carrier onboarding typically take?', _status: 'contacted' },
    { name: 'Brian Wells', email: 'bwells@example.com', phone: '702-555-0823', subject: 'Reefer load — urgent', message: 'Need a reefer Vegas to Sacramento by Friday. Please advise.', _status: 'approved' },
    { name: 'Jessica Tran', email: 'jtran@example.com', phone: '503-555-0834', subject: 'Agent inquiry', message: 'Hi I have 8 years of brokerage experience. Are you still recruiting agents in Oregon?', _status: 'new' },
    { name: 'Kevin Park', email: 'kpark@example.com', phone: '425-555-0845', subject: 'Long-term contract', message: 'We move 200+ loads/month and looking for a new primary brokerage. Can we set up a meeting?', _status: 'new' }
  ].forEach(p => seedRow('contacts', p))
}

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

// === CONFIRMATION EMAIL (quote/application submissions) ===
app.post('/api/send-confirmation', async (req, res) => {
  const { to, name, type } = req.body
  if (!to) return res.status(400).json({ error: 'Email required' })

  const subjects = {
    'quote': 'SFam Logistics — Quote Request Received',
    'carrier-application': 'SFam Logistics — Carrier Application Received',
    'agent-application': 'SFam Logistics — Agent Application Received',
    'contact': 'SFam Logistics — Message Received'
  }

  const bodies = {
    'quote': `Dear ${name || 'Valued Customer'},\n\nThank you for submitting your quote request with SFam Logistics LLC.\n\nOur team has received your request and will respond within 30 minutes during business hours (Mon–Fri, 8AM–5PM PST). If submitted after hours, we will respond first thing the next business day.\n\nFor urgent needs, please call us directly at 1 (888) 698-5556.\n\nBest regards,\nSFam Logistics LLC\ninfo@sfamlogistics.com\n1 (888) 698-5556`,
    'carrier-application': `Dear ${name || 'Valued Carrier'},\n\nThank you for submitting your carrier application with SFam Logistics LLC.\n\nYour application has been received and our team will review your authority, insurance, and documentation. Most carriers are approved within 24 hours.\n\nFor questions, please call us at 1 (888) 698-5556 or email info@sfamlogistics.com.\n\nBest regards,\nSFam Logistics LLC`,
    'agent-application': `Dear ${name || 'Valued Applicant'},\n\nThank you for submitting your agent application with SFam Logistics LLC.\n\nYour application has been received. Our recruiting team will review your information and reach out within 48 hours.\n\nFor questions, please call us at 1 (888) 698-5556 or email info@sfamlogistics.com.\n\nBest regards,\nSFam Logistics LLC`,
    'contact': `Dear ${name || 'Valued Customer'},\n\nThank you for contacting SFam Logistics LLC.\n\nYour message has been received. We will respond within 1 business hour during business hours (Mon–Fri, 8AM–5PM PST).\n\nFor urgent freight needs, please call us at 1 (888) 698-5556.\n\nBest regards,\nSFam Logistics LLC`
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
  const { visitorName, visitorEmail, timestamp } = req.body
  const alertBody = `A website visitor has requested to speak with a live agent.\n\nName: ${visitorName}\nEmail: ${visitorEmail}\nTime: ${timestamp}\n\nPlease reach out to them as soon as possible.`

  await sendAlert('Live Agent Request — Website Visitor', alertBody)
  res.json({ ok: true })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`✅ SFam API running on http://localhost:${PORT}`))
