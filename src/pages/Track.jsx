import { useState } from 'react'
import { Mail, Phone, Headphones, Clock, ShieldCheck, Search, Truck, MapPin, CheckCircle2, Package, Navigation } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { breadcrumbLd } from '../data/seo.js'

const trackJsonLd = [
  breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Track Shipment', path: '/track' }]),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Track Your SFam Logistics Shipment',
    url: 'https://sfamlogistics.com/track',
    description: 'Real-time freight tracking for SFam Logistics shipments. Or contact your operations manager directly at ops@sfamlogistics.com.',
    isPartOf: { '@id': 'https://sfamlogistics.com/#website' }
  }
]

export default function Track() {
  const [tracking, setTracking] = useState('')
  const [load, setLoad] = useState(null)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const search = async (e) => {
    e?.preventDefault()
    const q = tracking.trim().toUpperCase()
    setErr(''); setLoad(null); setLoading(true)
    try {
      const r = await fetch(`/api/loads/${q}`)
      if (r.ok) { setLoad(await r.json()); setLoading(false); return }
    } catch {}
    // Fallback: shipments saved by admin in localStorage (when backend offline)
    try {
      const local = JSON.parse(localStorage.getItem('sfam_loads_v1') || '[]')
      const hit = local.find(l => (l.tracking_number || '').toUpperCase() === q)
      if (hit) { setLoad(hit); setLoading(false); return }
    } catch {}
    setErr('Tracking number not found. For real-time updates, contact your operations manager at ops@sfamlogistics.com or call 1 (888) 698-5556.')
    setLoading(false)
  }

  return (
    <>
      <PageMeta
        title="Track Shipment — Real-Time Freight Tracking"
        description="Track your SFam Logistics freight shipment in real time. Enter your tracking number for live status updates, or contact your operations manager directly at ops@sfamlogistics.com / 1 (888) 698-5556."
        keywords="freight tracking, shipment tracking, BOL tracking, PO tracking, load tracking, real time freight tracking, SFam Logistics tracking, ops manager"
        path="/track"
        jsonLd={trackJsonLd}
      />
      <PageHero
        eyebrow="Track Shipment"
        title={<>Real-Time <span className="text-orange-400">Load Updates</span></>}
        subtitle="Look up your shipment below — or talk directly to the operations manager handling your freight."
      />

      {/* ===== 1. CONTACT YOUR OPS MANAGER ===== */}
      <section className="section pt-0">
        <Orbs />
        <div className="container-x relative max-w-4xl">
          <Reveal>
            <div className="glass-strong p-8 lg:p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mx-auto mb-6 shadow-2xl shadow-orange-500/40">
                <Headphones className="w-10 h-10 text-brand-navy" />
              </div>
              <h2 className="font-display italic font-black text-3xl lg:text-4xl mb-4">
                Talk Directly To Your <span className="text-orange-400">Operations Manager</span>
              </h2>
              <div className="divider-glow w-32 mx-auto mb-6" />
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                For real-time load updates, contact your assigned operations manager directly at{' '}
                <a href="mailto:ops@sfamlogistics.com" className="text-orange-300 font-bold hover:text-orange-200 underline decoration-orange-400/50 hover:decoration-orange-300">ops@sfamlogistics.com</a>{' '}
                or call{' '}
                <a href="tel:+18886985556" className="text-orange-300 font-bold hover:text-orange-200 underline decoration-orange-400/50 hover:decoration-orange-300">1 (888) 698-5556</a>.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <a
                  href="mailto:ops@sfamlogistics.com"
                  className="glass p-6 hover:border-orange-400/60 hover:-translate-y-1 transition group flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4 group-hover:rotate-6 transition">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Email Operations</div>
                  <div className="font-display italic font-black text-lg text-white group-hover:text-orange-300 transition">ops@sfamlogistics.com</div>
                </a>

                <a
                  href="tel:+18886985556"
                  className="glass p-6 hover:border-orange-400/60 hover:-translate-y-1 transition group flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4 group-hover:rotate-6 transition">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Call Dispatch</div>
                  <div className="font-display italic font-black text-lg text-white group-hover:text-orange-300 transition">1 (888) 698-5556</div>
                </a>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 grid sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">Extended Hours</div>
                    <div className="text-xs text-white/60">Mon–Fri 7AM–5PM PST · Dispatch available extended hours for urgent freight.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Headphones className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">Direct Line</div>
                    <div className="text-xs text-white/60">No phone trees — talk to a real person handling your freight.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">Proactive Updates</div>
                    <div className="text-xs text-white/60">We push status changes to you, not the other way around.</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 2. SELF-SERVE TRACKING LOOKUP ===== */}
      <section className="section pt-0">
        <div className="container-x relative max-w-4xl">
          <Reveal>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-[0.15em] mb-3">Self-Serve Tracking</div>
              <h2 className="font-display italic font-black text-3xl lg:text-4xl text-white">
                Or Look Up Your <span className="text-orange-400">Shipment</span>
              </h2>
              <div className="divider-glow w-24 mx-auto mt-4" />
              <p className="text-white/60 text-sm mt-3 max-w-xl mx-auto">Have your SFam tracking number? Enter it below for instant status, current location, and event history.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={search} className="glass-strong p-6 lg:p-8 mb-6">
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
            </form>
          </Reveal>

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

                {/* Footer note pointing back to ops */}
                <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-white/60">
                  Need more detail than what&apos;s shown here? Email{' '}
                  <a href="mailto:ops@sfamlogistics.com" className="text-orange-300 hover:text-orange-200 font-bold">ops@sfamlogistics.com</a>{' '}
                  or call{' '}
                  <a href="tel:+18886985556" className="text-orange-300 hover:text-orange-200 font-bold">1 (888) 698-5556</a>.
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
