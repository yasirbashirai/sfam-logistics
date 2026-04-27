import { useEffect, useState } from 'react'
import { Plus, Trash2, Edit3, X, Truck, MapPin, Clock, Save, ListPlus, Database } from 'lucide-react'

const STATUS_OPTIONS = ['Booked', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'On Hold', 'Cancelled']

const empty = {
  tracking_number: '',
  status: 'Booked',
  origin: '',
  destination: '',
  carrier: '',
  pickup_date: '',
  delivery_date: '',
  current_location: '',
  events: []
}

// localStorage helpers — used as fallback when /api/loads is unreachable
// (e.g. on Vercel where the Express server isn't deployed)
const STORAGE_KEY = 'sfam_loads_v1'
const SEED_LOADS = [
  {
    id: 'seed-1',
    tracking_number: 'SFAM-2026-0001',
    status: 'In Transit',
    origin: 'Seattle, WA',
    destination: 'Los Angeles, CA',
    carrier: 'Pacific Trans LLC',
    pickup_date: '2026-04-05',
    delivery_date: '2026-04-09',
    current_location: 'Sacramento, CA',
    events: [
      { time: '2026-04-05 08:30', event: 'Picked up', location: 'Seattle, WA' },
      { time: '2026-04-05 19:45', event: 'In transit', location: 'Portland, OR' },
      { time: '2026-04-06 11:20', event: 'In transit', location: 'Redding, CA' },
      { time: '2026-04-07 09:00', event: 'Currently here', location: 'Sacramento, CA' }
    ],
    created_at: '2026-04-05T08:30:00.000Z'
  },
  {
    id: 'seed-2',
    tracking_number: 'SFAM-2026-0002',
    status: 'Delivered',
    origin: 'Dallas, TX',
    destination: 'Atlanta, GA',
    carrier: 'Southern Hauling Co',
    pickup_date: '2026-04-01',
    delivery_date: '2026-04-03',
    current_location: 'Atlanta, GA',
    events: [
      { time: '2026-04-01 07:00', event: 'Picked up', location: 'Dallas, TX' },
      { time: '2026-04-02 14:30', event: 'In transit', location: 'Birmingham, AL' },
      { time: '2026-04-03 10:15', event: 'Delivered', location: 'Atlanta, GA' }
    ],
    created_at: '2026-04-01T07:00:00.000Z'
  }
]

const readLocal = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  // First time: seed
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_LOADS))
  return [...SEED_LOADS]
}
const writeLocal = (rows) => localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
const uid = () => (crypto?.randomUUID?.() || `local-${Date.now()}-${Math.random().toString(36).slice(2)}`)

export default function AdminShipments() {
  const [loads, setLoads] = useState([])
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [eventForm, setEventForm] = useState({ event: '', location: '', current_location: '', status: '' })
  const [loading, setLoading] = useState(true)
  const [demoMode, setDemoMode] = useState(false) // true when running off localStorage

  const load = async () => {
    try {
      const r = await fetch('/api/loads')
      if (!r.ok) throw new Error('bad status')
      const apiRows = await r.json()
      setLoads(apiRows)
      setDemoMode(false)
    } catch {
      // Backend unreachable — fall back to localStorage
      setLoads(readLocal())
      setDemoMode(true)
    }
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const filtered = loads.filter(l => JSON.stringify(l).toLowerCase().includes(search.toLowerCase()))

  const save = async () => {
    if (!editing) return
    if (!editing.tracking_number) { alert('Tracking number is required'); return }

    if (!demoMode) {
      try {
        const r = editing._isNew
          ? await fetch('/api/loads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
          : await fetch(`/api/loads/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
        if (!r.ok) throw new Error('bad status')
        setEditing(null)
        load()
        return
      } catch {
        setDemoMode(true) // fall through to local save
      }
    }

    // Local (demo) save
    const rows = readLocal()
    if (editing._isNew) {
      const row = { ...editing, id: uid(), created_at: new Date().toISOString() }
      delete row._isNew
      rows.unshift(row)
    } else {
      const idx = rows.findIndex(r => r.id === editing.id)
      if (idx >= 0) rows[idx] = { ...rows[idx], ...editing }
    }
    writeLocal(rows)
    setLoads(rows)
    setEditing(null)
  }

  const remove = async (id) => {
    if (!confirm('Delete this shipment?')) return
    if (!demoMode) {
      try {
        const r = await fetch(`/api/loads/${id}`, { method: 'DELETE' })
        if (!r.ok) throw new Error('bad status')
        load()
        return
      } catch {
        setDemoMode(true)
      }
    }
    const rows = readLocal().filter(r => r.id !== id)
    writeLocal(rows)
    setLoads(rows)
  }

  const addEvent = async () => {
    if (!editing || editing._isNew || !eventForm.event) return
    const newEvent = {
      time: new Date().toISOString().replace('T', ' ').slice(0, 16),
      event: eventForm.event,
      location: eventForm.location || editing.current_location || ''
    }

    if (!demoMode) {
      try {
        const r = await fetch(`/api/loads/${editing.id}/event`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventForm)
        })
        if (!r.ok) throw new Error('bad status')
        setEventForm({ event: '', location: '', current_location: '', status: '' })
        load()
        const rAll = await fetch('/api/loads')
        if (rAll.ok) {
          const all = await rAll.json()
          const found = all.find(l => l.id === editing.id)
          if (found) setEditing(found)
        }
        return
      } catch {
        setDemoMode(true)
      }
    }

    // Local: append event, update derived fields
    const rows = readLocal()
    const idx = rows.findIndex(r => r.id === editing.id)
    if (idx >= 0) {
      const updated = {
        ...rows[idx],
        events: [...(rows[idx].events || []), newEvent],
        current_location: eventForm.current_location || rows[idx].current_location,
        status: eventForm.status || rows[idx].status
      }
      rows[idx] = updated
      writeLocal(rows)
      setLoads(rows)
      setEditing(updated)
    }
    setEventForm({ event: '', location: '', current_location: '', status: '' })
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="label mb-2">Tracking System</div>
          <h1 className="font-display font-bold text-4xl">Shipments</h1>
          <p className="text-white/60 mt-2">Create, update, and dispatch shipments. Customers see live status on the public Track page.</p>
        </div>
        <div className="flex gap-3">
          <input className="input !py-2 max-w-xs" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          <button onClick={() => setEditing({ ...empty, _isNew: true })} className="btn-primary !py-2 !px-5"><Plus className="w-4 h-4" /> New Shipment</button>
        </div>
      </div>

      {demoMode && !loading && (
        <div className="mb-6 p-3 rounded-xl bg-orange-400/10 border border-orange-400/30 flex items-center gap-3 text-xs">
          <Database className="w-4 h-4 text-orange-300 shrink-0" />
          <div className="text-white/70 flex-1">
            <span className="font-bold text-orange-200">Demo mode</span> — saving to your browser only. Shipments you add here are visible on this device. To enable multi-device sync and live chat, deploy the Express backend.
          </div>
        </div>
      )}

      <div className="glass-strong overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-white/40">Loading shipments...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-white/40">No shipments yet. Click "New Shipment" to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-white/50">
                <tr>
                  <th className="px-5 py-4">Tracking #</th>
                  <th className="px-5 py-4">Lane</th>
                  <th className="px-5 py-4">Carrier</th>
                  <th className="px-5 py-4">Current Location</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(l => (
                  <tr key={l.id} className="hover:bg-white/[0.03]">
                    <td className="px-5 py-4 font-mono text-orange-300">{l.tracking_number}</td>
                    <td className="px-5 py-4">{l.origin} → {l.destination}</td>
                    <td className="px-5 py-4 text-white/70">{l.carrier || '—'}</td>
                    <td className="px-5 py-4 text-white/70">{l.current_location || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${l.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300' : l.status === 'Cancelled' || l.status === 'On Hold' ? 'bg-red-500/20 text-red-300' : 'bg-orange-500/20 text-orange-300'}`}>{l.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setEditing({ ...l, _isNew: false })} className="p-2 rounded-lg bg-white/5 hover:bg-orange-500/20 hover:text-orange-300" title="Edit"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => remove(l.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-300" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setEditing(null)}>
          <div className="glass-strong max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setEditing(null)} className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-red-500/20"><X className="w-4 h-4" /></button>

            <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-3">
              <Truck className="w-6 h-6 text-orange-400" />
              {editing._isNew ? 'Create Shipment' : `Edit ${editing.tracking_number}`}
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Field label="Tracking number" value={editing.tracking_number} onChange={v => setEditing({ ...editing, tracking_number: v })} placeholder="SFAM-2026-XXXX" />
              <SelectField label="Status" value={editing.status} options={STATUS_OPTIONS} onChange={v => setEditing({ ...editing, status: v })} />
              <Field label="Origin" value={editing.origin} onChange={v => setEditing({ ...editing, origin: v })} placeholder="Seattle, WA" />
              <Field label="Destination" value={editing.destination} onChange={v => setEditing({ ...editing, destination: v })} placeholder="Los Angeles, CA" />
              <Field label="Carrier" value={editing.carrier} onChange={v => setEditing({ ...editing, carrier: v })} placeholder="Pacific Trans LLC" />
              <Field label="Current location" value={editing.current_location} onChange={v => setEditing({ ...editing, current_location: v })} placeholder="Sacramento, CA" />
              <Field label="Pickup date" value={editing.pickup_date} onChange={v => setEditing({ ...editing, pickup_date: v })} placeholder="2026-04-05" />
              <Field label="Delivery date" value={editing.delivery_date} onChange={v => setEditing({ ...editing, delivery_date: v })} placeholder="2026-04-09" />
            </div>

            <div className="flex gap-3 mb-8">
              <button onClick={save} className="btn-primary !py-2.5"><Save className="w-4 h-4" /> Save Shipment</button>
              <button onClick={() => setEditing(null)} className="btn-ghost !py-2.5">Cancel</button>
            </div>

            {!editing._isNew && (
              <div className="border-t border-white/10 pt-6">
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-orange-400" /> Tracking Events</h3>

                <div className="space-y-3 mb-6">
                  {(editing.events || []).length === 0 && <div className="text-sm text-white/40">No events yet. Add one below to update the customer's tracking page.</div>}
                  {(editing.events || []).slice().reverse().map((ev, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{ev.event}</div>
                        <div className="text-xs text-white/60">{ev.location}</div>
                      </div>
                      <div className="text-xs text-white/40">{ev.time}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
                  <div className="text-xs uppercase tracking-wider text-orange-300 font-bold mb-3 flex items-center gap-2"><ListPlus className="w-4 h-4" /> Log a new event</div>
                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <Field label="Event" value={eventForm.event} onChange={v => setEventForm({ ...eventForm, event: v })} placeholder="Picked up / In transit / Delivered" />
                    <Field label="Event location" value={eventForm.location} onChange={v => setEventForm({ ...eventForm, location: v })} placeholder="Portland, OR" />
                    <Field label="Set current location to" value={eventForm.current_location} onChange={v => setEventForm({ ...eventForm, current_location: v })} placeholder="(optional)" />
                    <SelectField label="Set status to" value={eventForm.status} options={['', ...STATUS_OPTIONS]} onChange={v => setEventForm({ ...eventForm, status: v })} />
                  </div>
                  <button onClick={addEvent} className="btn-primary !py-2 text-sm"><Plus className="w-4 h-4" /> Log Event</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{label}</span>
      <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="input mt-1 !py-2 text-sm" />
    </label>
  )
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{label}</span>
      <select value={value || ''} onChange={e => onChange(e.target.value)} className="select mt-1 !py-2 text-sm">
        {options.map(o => <option key={o} value={o}>{o || '— no change —'}</option>)}
      </select>
    </label>
  )
}
