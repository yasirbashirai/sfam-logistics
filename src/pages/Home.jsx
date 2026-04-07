import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Boxes, Snowflake, PackageOpen, Route, Zap, ShieldCheck, Clock, Award, Globe2, Users, TrendingUp, CheckCircle2, Star, Phone, MapPin, Quote as QuoteIcon, DollarSign, Headphones, FileCheck, Wallet, Gauge, MessageSquare, Briefcase, Target, Eye, Heart, Calendar, FileText } from 'lucide-react'
import { services } from '../data/site.js'
import IMG from '../data/images.js'
import CountUp from '../components/CountUp.jsx'
import Reveal from '../components/Reveal.jsx'
import USAMap from '../components/USAMap.jsx'
import CreativeMarquee from '../components/CreativeMarquee.jsx'
import Carousel from '../components/Carousel.jsx'

const iconMap = { Truck, Boxes, Snowflake, PackageOpen, Route, Zap }

export default function Home() {
  return (
    <>
      {/* ============ 1. CENTERED CINEMATIC HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center pt-40 pb-20 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={IMG.handshake} alt="SFam Logistics partnership" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute inset-0 grid-bg opacity-60" />
        </div>
        {/* Floating orbs */}
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-orange-400/15 rounded-full blur-3xl animate-orb pointer-events-none" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-3xl animate-orb pointer-events-none" style={{ animationDelay: '5s' }} />

        {/* Floating side cards (decorative) */}
        <div className="hidden lg:block absolute left-8 top-1/3 float-card z-10">
          <div className="glass-navy p-5 max-w-[200px]">
            <div className="flex items-center gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /><span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Live Now</span></div>
            <div className="font-display italic font-black text-xl text-orange-400"><CountUp end={47} /> Loads</div>
            <div className="text-xs text-white/60">In transit right now</div>
          </div>
        </div>
        <div className="hidden lg:block absolute right-8 top-1/3 float-card-delay z-10">
          <div className="glass-navy p-5 max-w-[200px]">
            <div className="flex gap-1 mb-2">{[...Array(5)].map((_,i)=><Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400" />)}</div>
            <div className="font-display italic font-black text-2xl text-orange-400">4.9<span className="text-base text-white/50">/5</span></div>
            <div className="text-xs text-white/60">From 500+ carriers</div>
          </div>
        </div>
        <div className="hidden lg:block absolute left-12 bottom-32 float-card-delay z-10">
          <div className="glass-navy p-5 max-w-[200px]">
            <Truck className="w-6 h-6 text-orange-400 mb-2" />
            <div className="font-display italic font-black text-xl text-orange-400">98% On-Time</div>
            <div className="text-xs text-white/60">Across all lanes</div>
          </div>
        </div>
        <div className="hidden lg:block absolute right-12 bottom-32 float-card z-10">
          <div className="glass-navy p-5 max-w-[200px]">
            <DollarSign className="w-6 h-6 text-orange-400 mb-2" />
            <div className="font-display italic font-black text-xl text-orange-400">Same-Day Pay</div>
            <div className="text-xs text-white/60">For carriers</div>
          </div>
        </div>

        {/* CENTERED CONTENT */}
        <div className="container-x relative text-center z-20 max-w-5xl">
          <Reveal>
            <div className="badge mb-6 mx-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              FMCSA Licensed • BMC-84 Bonded • Bothell, WA
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="font-display italic font-black text-7xl sm:text-8xl lg:text-[10rem] leading-[0.85] text-shadow tracking-tighter">
              <span className="text-white">We Know</span><br />
              <span className="text-white">The </span><span className="shimmer-text">Road.</span>
            </h1>
            <div className="mt-6 text-2xl sm:text-3xl text-white/85 font-display italic font-light">Because we&apos;ve been on it.</div>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-8 text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Built by drivers, trusted by shippers. Nationwide freight brokerage with the kind of communication and respect only real road experience can teach.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link to="/quote" className="btn-3d text-base !px-9 !py-4">Get an Instant Quote <ArrowRight className="w-5 h-5" /></Link>
              <Link to="/carrier-onboarding" className="btn-ghost text-base !px-9 !py-4">Become a Carrier</Link>
            </div>
          </Reveal>

          {/* === HORIZONTAL QUOTE FORM BAR === */}
          <Reveal delay={600}>
            <div className="mt-14 relative max-w-5xl mx-auto">
              <div className="absolute -inset-4 bg-orange-400/25 blur-3xl rounded-3xl" />
              <form action="/quote" className="relative glass-strong neon-border p-3 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center text-left">
                <div className="lg:col-span-2 px-3">
                  <div className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">Origin</div>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                    <input className="bg-transparent border-0 pl-6 w-full text-sm font-bold focus:outline-none placeholder:text-white/30" placeholder="ZIP code" />
                  </div>
                </div>
                <div className="hidden lg:block w-px h-12 bg-white/10" />
                <div className="lg:col-span-2 px-3">
                  <div className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">Destination</div>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                    <input className="bg-transparent border-0 pl-6 w-full text-sm font-bold focus:outline-none placeholder:text-white/30" placeholder="ZIP code" />
                  </div>
                </div>
                <div className="hidden lg:block w-px h-12 bg-white/10" />
                <div className="lg:col-span-2 px-3">
                  <div className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">Freight Type</div>
                  <select className="bg-transparent border-0 w-full text-sm font-bold focus:outline-none mt-1 cursor-pointer text-white/85"><option className="bg-brand-navy">FTL</option><option className="bg-brand-navy">LTL</option><option className="bg-brand-navy">Reefer</option><option className="bg-brand-navy">Flatbed</option></select>
                </div>
                <div className="hidden lg:block w-px h-12 bg-white/10" />
                <div className="lg:col-span-2 px-3">
                  <div className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">Weight (lbs)</div>
                  <input className="bg-transparent border-0 w-full text-sm font-bold focus:outline-none mt-1 placeholder:text-white/30" placeholder="0 lbs" />
                </div>
                <Link to="/quote" className="btn-primary lg:col-span-2 w-full !py-4">Get Quote <ArrowRight className="w-4 h-4" /></Link>
              </form>
              <div className="flex items-center justify-center gap-6 mt-6 text-xs text-white/50">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> No signup required</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> 30-min response</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> 100% free</span>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs flex flex-col items-center gap-2 animate-pulse z-10">
          <span className="tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-orange-400 to-transparent" />
        </div>
      </section>

      {/* ============ 2. CREATIVE 3D MARQUEE ============ */}
      <CreativeMarquee />

      {/* ============ 3. QUICK INTRO + IMAGE STRIP ============ */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-5">
            <div className="badge mb-4">Who We Are</div>
            <h2 className="font-display italic font-black text-5xl lg:text-6xl mb-6">A freight broker that <span className="text-orange-400">actually drives.</span></h2>
            <div className="divider-glow w-32 mb-6" />
            <p className="text-white/70 text-lg leading-relaxed mb-6">SFam Logistics LLC is a Washington-based freight brokerage built on over a decade of real road experience. We coordinate truckload, LTL, reefer, flatbed, and dedicated freight across all 48 states — with the kind of clarity, fairness, and follow-through that the industry too often forgets.</p>
            <p className="text-white/70 text-lg leading-relaxed mb-8">We&apos;re not a faceless broker. We&apos;re drivers who became dispatchers, dispatchers who became brokers — and now agents and partners who all believe the same thing: <span className="text-orange-300 font-semibold">freight moves on trust.</span></p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="btn-outline">Our Story <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/services" className="btn-ghost">View Services</Link>
            </div>
          </Reveal>
          <Reveal delay={200} className="lg:col-span-7">
            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[520px]">
              <div className="col-span-4 row-span-4 rounded-3xl overflow-hidden border border-orange-400/30 group">
                <img src={IMG.ownTruck} alt="SFam truck on lot" className="w-full h-full object-cover zoom-img" />
              </div>
              <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden border border-orange-400/30 group">
                <img src={IMG.cabInterior} alt="Cab interior" className="w-full h-full object-cover zoom-img" />
              </div>
              <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden border border-orange-400/30 group">
                <img src={IMG.dispatchDesk} alt="Dispatch desk" className="w-full h-full object-cover zoom-img" />
              </div>
              <div className="col-span-4 row-span-2 rounded-3xl overflow-hidden border border-orange-400/30 group relative">
                <img src={IMG.roadMountains} alt="Open road" className="w-full h-full object-cover zoom-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent grid place-items-center">
                  <div className="text-center">
                    <div className="font-display italic font-black text-3xl text-orange-400">10+ Years</div>
                    <div className="text-xs text-white/70 uppercase tracking-widest">On The Road</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 4. SERVICES GRID ============ */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/40 to-transparent">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="container-x relative">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="badge mb-4 mx-auto">Our Services</div>
              <h2 className="font-display italic font-black text-5xl sm:text-6xl">Every Lane.<br /><span className="text-orange-400">Every Load. Every Time.</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
              <p className="mt-6 text-white/70 text-lg">From a single LTL pallet to dedicated weekly truckload capacity — we&apos;ve got carriers, systems, and experience to move it.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || Truck
              const imgKeys = ['ftlTruck', 'ltlPallets', 'reeferTrailer', 'flatbedLoad', 'dedicatedFleet', 'expeditedVan']
              return (
                <Reveal key={s.slug} delay={i * 80}>
                  <Link to={`/services/${s.slug}`} className="group block relative overflow-hidden rounded-3xl border border-white/10 h-[380px] hover:border-orange-400/50 transition-all hover:-translate-y-2">
                    <img src={IMG[imgKeys[i]]} alt={s.name} className="absolute inset-0 w-full h-full object-cover zoom-img" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/85 to-brand-navy/40" />
                    <div className="absolute top-4 right-4 text-7xl font-display italic font-black text-orange-400/30">{String(i + 1).padStart(2, '0')}</div>
                    <div className="relative h-full p-7 flex flex-col justify-end">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4 shadow-lg shadow-orange-500/40 group-hover:scale-110 transition"><Icon className="w-7 h-7 text-brand-navy" /></div>
                      <h3 className="font-display italic font-black text-2xl mb-2">{s.name}</h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">{s.short}</p>
                      <span className="inline-flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest">Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition" /></span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ 5. WHY US ============ */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative group">
              <div className="absolute -inset-6 bg-orange-400/20 blur-3xl rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-orange-400/30 aspect-[4/5]">
                <img src={IMG.driverPortrait} alt="Driver-built leadership" className="w-full h-full object-cover zoom-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="badge mb-3">Built By Drivers</div>
                  <div className="font-display italic font-black text-3xl mb-2">10+ Years Behind the Wheel</div>
                  <div className="text-white/70 text-sm">From the cab to the corner office.</div>
                </div>
                <div className="absolute top-6 right-6 glass-navy p-4">
                  <div className="text-3xl font-display italic font-black text-orange-400">98%</div>
                  <div className="text-[10px] text-white/70 uppercase tracking-widest">On-Time</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <div className="badge mb-4">Why Shippers Choose Us</div>
              <h2 className="font-display italic font-black text-5xl mb-6">Trusted From <br /><span className="text-orange-400">First Mile to Last.</span></h2>
              <div className="divider-glow w-32 mb-6" />
              <p className="text-white/70 text-lg mb-8">Our owner spent over a decade behind the wheel before founding SFam. That perspective shows up in every load — realistic schedules, honest communication, fair carrier rates.</p>
              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, t: 'Vetted Carrier Network', d: 'Every carrier verified for authority, insurance & safety scores before they touch your freight.' },
                  { icon: Clock, t: '24/7 Dispatch Coverage', d: 'Hot loads, late-night pickups, weekend recoveries — we answer the phone when others won\'t.' },
                  { icon: Award, t: 'Driver-First Mentality', d: 'Happy drivers deliver on time. We pay quickly, communicate clearly, treat carriers like partners.' },
                  { icon: Globe2, t: 'Nationwide Coverage', d: 'All 48 contiguous states with deep capacity in PNW, California, Texas, and Midwest corridors.' }
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t} className="flex gap-4 glass p-5 hover:border-orange-400/40 hover:translate-x-2 transition group">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center group-hover:rotate-6 transition"><Icon className="w-7 h-7 text-brand-navy" /></div>
                    <div>
                      <div className="font-display italic font-bold text-lg mb-1">{t}</div>
                      <div className="text-sm text-white/60">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 6. CARRIER CONVERSION SECTION (PRIORITY) ============ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.heroFleet} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/50" />
        </div>
        <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="badge mb-4">Calling All Carriers</div>
            <h2 className="font-display italic font-black text-5xl lg:text-6xl mb-6 leading-[0.95]">
              Drive For A <br /><span className="text-orange-400">Broker That Pays Fast.</span>
            </h2>
            <div className="divider-glow w-32 mb-6" />
            <p className="text-white/85 text-xl leading-relaxed mb-8">Stop chasing checks. Stop waiting on hold. SFam Logistics treats carriers the way drivers deserve — same-day pay options, fair rates, honest communication, and real respect.</p>
            <div className="space-y-3 mb-10">
              {[
                ['💰', 'Same-day pay options', 'Get paid in days, not weeks. Quick-pay available on every load.'],
                ['📞', '24/7 dispatch you can reach', 'A real human, every time. No phone trees.'],
                ['🛡️', 'No detention disputes', 'We pay what we owe. Period.'],
                ['🤝', 'Long-term lane partnerships', 'Consistent freight, not random one-offs.']
              ].map(([emoji, t, d]) => (
                <div key={t} className="flex gap-4 items-start">
                  <div className="text-2xl">{emoji}</div>
                  <div>
                    <div className="font-display italic font-bold text-lg">{t}</div>
                    <div className="text-sm text-white/60">{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/carrier-onboarding" className="btn-primary !px-9 !py-4 text-base">Sign Up as a Carrier <ArrowRight className="w-5 h-5" /></Link>
              <a href="tel:+18886985556" className="btn-ghost !px-9 !py-4 text-base"><Phone className="w-5 h-5" /> Call Dispatch</a>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative">
              <div className="absolute -inset-6 bg-orange-400/30 blur-3xl rounded-3xl" />
              <div className="relative glass-strong neon-border p-8">
                <h3 className="font-display italic font-black text-2xl mb-1">Quick Carrier Signup</h3>
                <p className="text-white/60 text-sm mb-6">Get approved in 24 hours.</p>
                <div className="space-y-4">
                  <input className="input" placeholder="Company Name" />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="input" placeholder="MC #" />
                    <input className="input" placeholder="DOT #" />
                  </div>
                  <input className="input" placeholder="Contact Name" />
                  <input className="input" placeholder="Phone" />
                  <input className="input" placeholder="Email" />
                  <Link to="/carrier-onboarding" className="btn-primary w-full !py-4">Complete Application <ArrowRight className="w-5 h-5" /></Link>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                  {[['24h', 'Approval'], ['$0', 'Setup Fee'], ['100%', 'Insured']].map(([n, l]) => (
                    <div key={l}>
                      <div className="text-2xl font-display italic font-black text-orange-400">{n}</div>
                      <div className="text-[10px] text-white/50 uppercase tracking-widest">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 7. STATS BAR ============ */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-r from-brand-navy via-brand-navy3 to-brand-navy">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-orange-400/10 blur-3xl rounded-full" />
        <div className="container-x relative grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { i: TrendingUp, n: 98, suf: '%', l: 'On-Time Delivery' },
            { i: Users, n: 500, suf: '+', l: 'Active Carriers' },
            { i: Truck, n: 12000, suf: '+', l: 'Loads Moved' },
            { i: Star, n: 49, suf: '/50', l: 'Customer Rating' }
          ].map(({ i: Icon, n, suf, l }, idx) => (
            <Reveal key={l} delay={idx * 100}>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center shadow-2xl shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-6 transition"><Icon className="w-10 h-10 text-brand-navy" /></div>
                <div className="text-5xl sm:text-6xl font-display italic font-black text-orange-400"><CountUp end={n} suffix={suf} /></div>
                <div className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-bold">{l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. COVERAGE MAP ============ */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div>
              <div className="badge mb-4">Coverage</div>
              <h2 className="font-display italic font-black text-5xl lg:text-6xl mb-6">All 48 States.<br /><span className="text-orange-400">One Phone Call.</span></h2>
              <div className="divider-glow w-32 mb-6" />
              <p className="text-white/70 text-lg leading-relaxed mb-8">From the Pacific Northwest to the Atlantic seaboard — we move freight everywhere it needs to go. With deep capacity in major freight corridors and trusted carrier partners in every region.</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[['Pacific Northwest', '🌲'], ['California', '☀️'], ['Texas Triangle', '⭐'], ['Midwest Lanes', '🌾'], ['Southeast', '🌴'], ['Northeast', '🏙️']].map(([region, emoji]) => (
                  <div key={region} className="glass p-4 flex items-center gap-3 hover:border-orange-400/40 transition">
                    <span className="text-2xl">{emoji}</span>
                    <span className="font-bold text-sm">{region}</span>
                  </div>
                ))}
              </div>
              <Link to="/track" className="btn-outline">Track A Shipment <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative">
              <div className="absolute inset-0 bg-orange-400/10 blur-3xl rounded-full" />
              <div className="relative glass-strong p-8">
                <USAMap />
                <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" /> Active Hubs</span>
                  <span>Live Coverage Map</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 9. PROCESS TIMELINE ============ */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/30 to-transparent">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <div className="badge mb-4 mx-auto">The Process</div>
              <h2 className="font-display italic font-black text-5xl sm:text-6xl">From Quote to <span className="text-orange-400">Delivery</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="relative">
            <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-orange-400/0 via-orange-400 to-orange-400/0" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
              {[
                { n: '01', i: Phone, t: 'Submit Request', d: 'Send origin, destination, and freight details — online or by phone.' },
                { n: '02', i: TrendingUp, t: 'Get a Quote', d: 'Receive a competitive rate within 30 minutes during business hours.' },
                { n: '03', i: Truck, t: 'We Dispatch', d: 'A vetted carrier is assigned, paperwork signed, pickup scheduled.' },
                { n: '04', i: CheckCircle2, t: 'Track & Deliver', d: 'Live updates from pickup to POD. No surprises, no silence.' }
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 150}>
                  <div className="text-center relative">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="absolute inset-0 bg-orange-400/30 blur-2xl rounded-full" />
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center shadow-2xl shadow-orange-500/40 ring-4 ring-brand-navy"><s.i className="w-10 h-10 text-brand-navy" /></div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-brand-navy border-2 border-orange-400 grid place-items-center text-orange-400 font-display italic font-bold text-sm">{s.n}</div>
                    </div>
                    <h3 className="font-display italic font-black text-2xl mb-3">{s.t}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 10. INDUSTRIES SERVED ============ */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="badge mb-4 mx-auto">Industries We Serve</div>
              <h2 className="font-display italic font-black text-5xl sm:text-6xl">We Move <span className="text-orange-400">Everything.</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { i: '🏭', t: 'Manufacturing' }, { i: '🌾', t: 'Agriculture' }, { i: '🥩', t: 'Food & Beverage' },
              { i: '🏗️', t: 'Construction' }, { i: '🛒', t: 'Retail / E-com' }, { i: '⚕️', t: 'Pharma / Medical' },
              { i: '⚙️', t: 'Heavy Equipment' }, { i: '📦', t: 'CPG' }, { i: '🚗', t: 'Automotive' },
              { i: '💻', t: 'Electronics' }, { i: '⚡', t: 'Energy' }, { i: '🏢', t: 'Government' }
            ].map((ind, i) => (
              <Reveal key={ind.t} delay={i * 50}>
                <div className="glass p-6 text-center hover:border-orange-400/50 hover:-translate-y-1 transition group">
                  <div className="text-4xl mb-3 group-hover:scale-125 transition">{ind.i}</div>
                  <div className="font-bold text-sm">{ind.t}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 11. TESTIMONIALS CAROUSEL ============ */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/40 to-transparent">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div className="text-center mb-16">
              <div className="badge mb-4 mx-auto">Real Voices</div>
              <h2 className="font-display italic font-black text-5xl sm:text-6xl">What Partners <span className="text-orange-400">Say About Us</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <Carousel items={[
              { n: 'Marcus T.', r: 'Owner-Operator • 12 years OTR', q: 'SFam pays fast and they communicate. As a driver, that\'s all I ask. Best broker I\'ve worked with this year — bar none.' },
              { n: 'Jennifer L.', r: 'Logistics Manager, Pacific Foods', q: 'They actually answer the phone at 6am. We\'ve moved 40+ loads with them and zero issues. They feel like an extension of our team.' },
              { n: 'David K.', r: 'VP Operations, Northwest Manufacturing', q: 'Their rates are fair, the trucks show up on time, and the team treats our freight like it\'s theirs. Highly recommend.' },
              { n: 'Sarah M.', r: 'Carrier Owner, 8-truck Fleet', q: 'I\'ve worked with brokers for 15 years. SFam is the only one that pays quick-pay reliably and never argues about detention.' },
              { n: 'Roberto C.', r: 'Plant Manager, Texas Distribution', q: 'When we had a hot load to LA on a Sunday, SFam had a truck under our load in 90 minutes. Real 24/7 dispatch.' }
            ]} />
          </Reveal>
        </div>
      </section>

      {/* ============ 12. AGENT RECRUITMENT BANNER ============ */}
      <section className="section">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl border-2 border-orange-400/30">
            <div className="absolute inset-0">
              <img src={IMG.teamMeeting} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/40" />
            </div>
            <div className="relative grid lg:grid-cols-2 gap-10 p-10 lg:p-16 items-center">
              <div>
                <div className="badge mb-4">Now Recruiting</div>
                <h2 className="font-display italic font-black text-4xl sm:text-5xl mb-5">Join SFam as an<br /><span className="text-orange-400">Independent Freight Agent</span></h2>
                <p className="text-white/85 text-lg mb-8">Top commission splits, full back-office support, and the freedom to grow your book — backed by a leadership team that&apos;s been on the road.</p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/agent-opportunities" className="btn-primary !px-8 !py-4">Apply Now <ArrowRight className="w-5 h-5" /></Link>
                  <Link to="/agent-opportunities" className="btn-ghost !px-8 !py-4">Learn More</Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[['Top Splits', '70/30+'], ['Same-Day Pay', 'Available'], ['TMS Access', 'Included'], ['Territory', 'Open']].map(([k, v]) => (
                  <div key={k} className="glass-navy p-5 text-center">
                    <div className="text-2xl font-display italic font-black text-orange-400">{v}</div>
                    <div className="text-xs text-white/60 uppercase tracking-widest mt-1 font-bold">{k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 13. BLOG TEASER ============ */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <div className="badge mb-3">Latest Insights</div>
                <h2 className="font-display italic font-black text-5xl">From The <span className="text-orange-400">Road</span></h2>
              </div>
              <Link to="/blog" className="btn-ghost">All Articles <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: IMG.blogShipping, tag: 'Shippers', title: 'How to Choose the Right Freight Broker', slug: 'how-to-choose-a-freight-broker' },
              { img: IMG.blogCarriers, tag: 'Carriers', title: 'The Carrier Onboarding Checklist', slug: 'carrier-onboarding-checklist' },
              { img: IMG.blogIndustry, tag: 'Industry', title: 'FTL vs LTL: Which Saves You More?', slug: 'ftl-vs-ltl' }
            ].map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link to={`/blog/${p.slug}`} className="group block rounded-3xl overflow-hidden border border-white/10 hover:border-orange-400/50 transition hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover zoom-img" />
                  </div>
                  <div className="p-6 bg-brand-navy3/40">
                    <div className="text-[10px] uppercase tracking-widest text-orange-400 font-bold mb-2">{p.tag}</div>
                    <h3 className="font-display italic font-black text-xl group-hover:text-orange-300 transition">{p.title}</h3>
                    <span className="inline-flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest mt-4">Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 14. FINAL CTA ============ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="relative glass-strong neon-border overflow-hidden p-12 lg:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-orange-400/10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-400/20 blur-3xl rounded-full" />
            <div className="relative">
              <div className="badge mb-6 mx-auto">Ready When You Are</div>
              <h2 className="font-display italic font-black text-5xl sm:text-6xl lg:text-7xl">Your Freight.<br /><span className="text-orange-400">Our Promise.</span></h2>
              <div className="divider-glow w-40 mx-auto my-8" />
              <p className="text-white/70 text-xl max-w-2xl mx-auto">Whether you ship one load a month or one hundred, we&apos;d love to earn your business. Get a no-pressure quote in minutes.</p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <Link to="/quote" className="btn-primary !px-10 !py-4 text-base">Get a Free Quote <ArrowRight className="w-5 h-5" /></Link>
                <a href="tel:+18886985556" className="btn-ghost !px-10 !py-4 text-base"><Phone className="w-5 h-5" /> 1 (888) 698-5556</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
