import { useState } from 'react'
import { Search, Truck, MapPin, CheckCircle2, Clock, Package, Navigation } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'

const demoLoads = {
  'SFAM-2026-0001': {
    tracking_number: 'SFAM-2026-0001', status: 'In Transit',
    origin: 'Seattle, WA', destination: 'Los Angeles, CA',
    carrier: 'Pacific Trans LLC', pickup_date: '2026-04-05',
    delivery_date: '2026-04-09', current_location: 'Sacramento, CA',
    progress: 65,
    events: [
      { time: '2026-04-05 08:30', event: 'Picked up', location: 'Seattle, WA' },
      { time: '2026-04-05 19:45', event: 'In transit', location: 'Portland, OR' },
      { time: '2026-04-06 11:20', event: 'In transit', location: 'Redding, CA' },
      { time: '2026-04-07 09:00', event: 'Currently here', location: 'Sacramento, CA' }
    ]
  },
  'SFAM-2026-0002': {
    tracking_number: 'SFAM-2026-0002', status: 'Delivered',
    origin: 'Dallas, TX', destination: 'Atlanta, GA',
    carrier: 'Southern Hauling Co', pickup_date: '2026-04-01',
    delivery_date: '2026-04-03', current_location: 'Atlanta, GA',
    progress: 100,
    events: [
      { time: '2026-04-01 07:00', event: 'Picked up', location: 'Dallas, TX' },
      { time: '2026-04-02 14:30', event: 'In transit', location: 'Birmingham, AL' },
      { time: '2026-04-03 10:15', event: 'Delivered', location: 'Atlanta, GA' }
    ]
  }
}

export default function Track() {
  const [tracking, setTracking] = useState('')
  const [load, setLoad] = useState(null)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const search = async (e) => {
    e?.preventDefault()
    setErr(''); setLoad(null); setLoading(true)
    try {
      // Try backend first
      const r = await fetch(`/api/loads/${tracking.trim().toUpperCase()}`)
      if (r.ok) { setLoad(await r.json()); setLoading(false); return }
    } catch {}
    // Fallback to demo data
    const demo = demoLoads[tracking.trim().toUpperCase()]
    if (demo) setLoad(demo)
    else setErr('Tracking number not found. Try SFAM-2026-0001 or SFAM-2026-0002.')
    setLoading(false)
  }

  return (
    <>
      <PageMeta title="Track Shipment" description="Track your freight shipment in real-time with SFam Logistics. Enter your load reference, BOL, or PO number for live status updates from pickup to delivery. Powered by AscendTMS." />
      <PageHero eyebrow="Track Shipment" title={<>Track Your <span className="text-orange-400">Shipment</span></>} subtitle="Real-time visibility from pickup to POD powered by AscendTMS. Enter your SFam tracking number below." />

      <section className="section pt-0">
        <Orbs />
        <div className="container-x relative max-w-4xl">
          <form onSubmit={search} className="glass-strong p-6 lg:p-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  className="input !pl-12 !py-4 text-lg font-mono uppercase tracking-wider"
                  placeholder="SFAM-2026-XXXX"
                  value={tracking}
                  onChange={e => setTracking(e.target.value)}
                  required
                />
              </div>
              <button className="btn-primary !px-8 !py-4">{loading ? 'Searching...' : 'Track Load'}</button>
            </div>
            {err && <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">{err}</div>}
            <div className="mt-4 text-xs text-white/40">Demo: try <button type="button" onClick={() => setTracking('SFAM-2026-0001')} className="text-orange-300 hover:underline">SFAM-2026-0001</button> or <button type="button" onClick={() => setTracking('SFAM-2026-0002')} className="text-orange-300 hover:underline">SFAM-2026-0002</button></div>
          </form>

          {load && (
            <div className="space-y-6 animate-fade-up">
              {/* Status Card */}
              <div className="glass-strong p-8">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-widest">Tracking Number</div>
                    <div className="font-mono text-2xl font-bold mt-1">{load.tracking_number}</div>
                  </div>
                  <div className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${load.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-orange-400/20 text-orange-300 border border-orange-400/40'}`}>
                    {load.status === 'Delivered' ? '✓' : '🚛'} {load.status}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-white/50 mb-2">
                    <span>📍 {load.origin}</span>
                    <span>{load.progress || (load.status === 'Delivered' ? 100 : 60)}%</span>
                    <span>🏁 {load.destination}</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-1000" style={{ width: `${load.progress || (load.status === 'Delivered' ? 100 : 60)}%` }} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { i: MapPin, l: 'Currently', v: load.current_location },
                    { i: Truck, l: 'Carrier', v: load.carrier },
                    { i: Package, l: 'Pickup', v: load.pickup_date },
                    { i: CheckCircle2, l: 'Est. Delivery', v: load.delivery_date }
                  ].map(({ i: Icon, l, v }) => (
                    <div key={l} className="glass p-4">
                      <Icon className="w-5 h-5 text-orange-400 mb-2" />
                      <div className="text-[10px] uppercase tracking-widest text-white/40">{l}</div>
                      <div className="text-sm font-semibold mt-1">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="glass-strong p-8">
                <h3 className="font-display italic font-black text-lg mb-6 flex items-center gap-3"><Navigation className="w-5 h-5 text-orange-400" /> Event Timeline</h3>
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-orange-400 via-orange-400/40 to-transparent" />
                  {load.events.slice().reverse().map((ev, i) => (
                    <div key={i} className="relative pl-14 pb-6 last:pb-0">
                      <div className={`absolute left-2.5 top-1 w-5 h-5 rounded-full grid place-items-center ${i === 0 ? 'bg-orange-400 ring-4 ring-orange-400/30 animate-pulse' : 'bg-white/10'}`}>
                        {i === 0 && <span className="w-2 h-2 rounded-full bg-brand-navy" />}
                      </div>
                      <div className="text-xs text-white/50 flex items-center gap-2"><Clock className="w-3 h-3" /> {ev.time}</div>
                      <div className="font-bold text-lg mt-1">{ev.event}</div>
                      <div className="text-sm text-white/60 flex items-center gap-2 mt-1"><MapPin className="w-3 h-3 text-orange-400" /> {ev.location}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!load && !err && (
            <div className="glass p-10 text-center">
              <Truck className="w-12 h-12 text-orange-400/40 mx-auto mb-3" />
              <h3 className="font-display italic font-black text-lg mb-2">Track Any Shipment</h3>
              <p className="text-white/50 text-sm mb-4">Enter your SFam tracking number above to see real-time status, location, and event history.</p>
              <p className="text-white/30 text-xs">Tracking powered by AscendTMS integration. Real-time carrier updates via CRM.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
