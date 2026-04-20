import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Boxes, Snowflake, PackageOpen, Route, Zap, ShieldCheck, Clock, Award, Users, TrendingUp, CheckCircle2, Phone, MapPin, DollarSign, Headphones, Heart } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { services } from '../data/site.js'
import IMG from '../data/images.js'
import CountUp from '../components/CountUp.jsx'
import Reveal from '../components/Reveal.jsx'
import CreativeMarquee from '../components/CreativeMarquee.jsx'

const iconMap = { Truck, Boxes, Snowflake, PackageOpen, Route, Zap }

export default function Home() {
  return (
    <>
      <PageMeta title="Nationwide Freight Brokerage" description="SFam Logistics LLC — FMCSA-authorized freight brokerage in Bothell, WA. FTL, LTL, reefer, flatbed, dedicated, and expedited freight across the United States and North America. MC 1810116 • USDOT 4555943. Built by drivers, trusted by shippers." />

      {/* ============ 1. HERO WITH LARGE BANNER ============ */}
      <section className="relative min-h-[92vh] flex items-center pt-36 pb-12 overflow-hidden">
        {/* Full-width hero banner image */}
        <div className="absolute inset-0">
          <img src={IMG.highwayMountains} alt="SFam Logistics — freight on the open road" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/70 to-brand-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/30" />
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-transparent" />

        <div className="container-x relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-orange-400" />
                <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-bold">Nationwide Freight Brokerage</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-display italic font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight">
                <span className="text-white block">Reliable Freight,</span>
                <span className="text-white block">Delivered With</span>
                <span className="text-orange-400 block">Honest Hands.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 text-base lg:text-lg text-white/75 max-w-xl leading-relaxed">
                SFam Logistics LLC is a freight brokerage built by drivers. We coordinate FTL, LTL, reefer, flatbed, and dedicated freight across the United States and North America — with the kind of communication only real road experience teaches.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/quote" className="btn-primary !px-8 !py-3.5">Request a Quote <ArrowRight className="w-4 h-4" /></Link>
                <Link to="/carrier-onboarding" className="btn-ghost !px-8 !py-3.5">Drive For Us</Link>
              </div>
            </Reveal>
            <Reveal delay={480}>
              <div className="mt-10 flex items-center gap-6 pt-6 border-t border-white/10">
                <div>
                  <div className="text-2xl font-display italic font-black text-orange-400"><CountUp end={10} suffix="+" /></div>
                  <div className="text-[9px] text-white/50 uppercase tracking-widest font-bold mt-1">Years on Road</div>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div>
                  <div className="text-2xl font-display italic font-black text-orange-400">24/7</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-widest font-bold mt-1">Dispatch</div>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div>
                  <div className="text-2xl font-display italic font-black text-orange-400">FMCSA</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-widest font-bold mt-1">Licensed</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Quick quote card */}
          <Reveal delay={300}>
            <div className="relative hidden lg:block">
              <div className="absolute -inset-3 bg-orange-400/15 blur-2xl rounded-2xl" />
              <div className="relative bg-brand-navy/95 backdrop-blur-2xl border border-orange-400/30 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-brand-navy/70 uppercase tracking-[0.15em] font-bold">Free Quote Engine</div>
                    <div className="font-display italic font-black text-xl text-brand-navy">30-Minute Response</div>
                    <div className="text-[9px] text-brand-navy/70 font-semibold mt-0.5">After hours? We'll respond first thing the next business day.</div>
                  </div>
                  <Phone className="w-7 h-7 text-brand-navy" />
                </div>
                <form action="/quote" className="p-6 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Origin</label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-orange-400" />
                        <input className="input !pl-9 !py-2.5 text-sm" placeholder="ZIP" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Destination</label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-orange-400" />
                        <input className="input !pl-9 !py-2.5 text-sm" placeholder="ZIP" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Freight Type</label>
                    <select className="select mt-1 !py-2.5 text-sm" defaultValue=""><option value="" disabled>Select equipment...</option><option>Full Truckload (FTL)</option><option>LTL</option><option>Reefer</option><option>Flatbed</option><option>Expedited</option></select>
                  </div>
                  <Link to="/quote" className="btn-primary w-full !py-3 text-sm">Get Free Quote <ArrowRight className="w-4 h-4" /></Link>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 2. MARQUEE ============ */}
      <CreativeMarquee />

      {/* ============ 3. WHO WE ARE (LIGHT SECTION) ============ */}
      <section className="section-light">
        <div className="container-x grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/10 border border-brand-navy/20 text-brand-navy text-xs font-bold uppercase tracking-[0.15em] mb-4">Who We Are</div>
              <h2 className="font-display italic font-black text-3xl lg:text-4xl mb-4 text-brand-navy">A freight broker that <span className="text-orange-500">actually drives.</span></h2>
              <div className="h-0.5 w-24 bg-gradient-to-r from-brand-navy to-transparent mb-4" />
              <p className="text-brand-navy/70 leading-relaxed mb-4">SFam Logistics LLC is a Washington-based freight brokerage built on over a decade of real road experience. We coordinate truckload, LTL, reefer, flatbed, and dedicated freight across the United States and North America — with the kind of clarity, fairness, and follow-through that the industry too often forgets.</p>
              <p className="text-brand-navy/70 leading-relaxed mb-6">We&apos;re not a faceless broker. We&apos;re drivers who became dispatchers, dispatchers who became brokers — and now agents and partners who all believe the same thing: <span className="text-orange-600 font-semibold">freight moves on trust.</span></p>
              <div className="flex flex-wrap gap-3">
                <Link to="/about" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-brand-navy/30 text-brand-navy text-sm font-bold uppercase tracking-wider hover:bg-brand-navy hover:text-white transition">Our Story <ArrowRight className="w-3.5 h-3.5" /></Link>
                <Link to="/services" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-brand-navy/70 text-sm font-bold uppercase tracking-wider hover:text-brand-navy transition">View Services</Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="grid grid-cols-2 gap-3 h-[380px]">
              <div className="rounded-2xl overflow-hidden border border-gray-200">
                <img src={IMG.truckRedWhite} alt="SFam truck" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200">
                  <img src={IMG.trailerLoaded} alt="Loaded trailer" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200 relative">
                  <img src={IMG.truckSnowRoad} alt="Road conditions" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 4. SERVICES GRID ============ */}
      <section className="section bg-gradient-to-b from-brand-navy via-brand-navy to-brand-navy">
        <div className="container-x relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="badge mb-3 mx-auto">Our Services</div>
              <h2 className="font-display italic font-black text-3xl sm:text-4xl">Every Lane.<br /><span className="text-orange-400">Every Load. Every Time.</span></h2>
              <div className="divider-glow w-24 mx-auto mt-4" />
              <p className="mt-4 text-white/70 text-sm">From a single LTL pallet to dedicated weekly truckload capacity — we&apos;ve got carriers, systems, and experience to move it.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || Truck
              const imgKeys = ['ftlTruck', 'ltlPallets', 'reeferTrailer', 'flatbedLoad', 'dedicatedFleet', 'expeditedVan']
              return (
                <Reveal key={s.slug} delay={i * 80}>
                  <Link to={`/services/${s.slug}`} className="group block relative overflow-hidden rounded-2xl border border-white/10 h-[300px] hover:border-orange-400/50 transition-all hover:-translate-y-1">
                    <img src={IMG[imgKeys[i]]} alt={s.name} className="absolute inset-0 w-full h-full object-cover zoom-img" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/85 to-brand-navy/40" />
                    <div className="relative h-full p-5 flex flex-col justify-end">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-3 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition"><Icon className="w-5 h-5 text-brand-navy" /></div>
                      <h3 className="font-display italic font-black text-lg mb-1">{s.name}</h3>
                      <p className="text-white/70 text-xs leading-relaxed mb-3">{s.short}</p>
                      <span className="inline-flex items-center gap-1.5 text-orange-400 text-[10px] font-bold uppercase tracking-widest">Learn more <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition" /></span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ 5. WHY US (WHITE SECTION) ============ */}
      <section className="section-white">
        <div className="container-x grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 aspect-[4/3]">
              <img src={IMG.whitePeterbilt} alt="Driver-built leadership" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">Built By Drivers</div>
                <div className="font-display italic font-black text-xl text-white">10+ Years Behind the Wheel</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/10 border border-brand-navy/20 text-brand-navy text-xs font-bold uppercase tracking-[0.15em] mb-3">Why Shippers Choose Us</div>
              <h2 className="font-display italic font-black text-3xl mb-4 text-brand-navy">Trusted From <br /><span className="text-orange-500">First Mile to Last.</span></h2>
              <div className="h-0.5 w-24 bg-gradient-to-r from-brand-navy to-transparent mb-4" />
              <p className="text-brand-navy/70 mb-6">Our owner spent over a decade behind the wheel before founding SFam. That perspective shows up in every load — realistic schedules, honest communication, fair carrier rates.</p>
              <div className="space-y-3">
                {[
                  { icon: ShieldCheck, t: 'Vetted Carrier Network', d: 'Every carrier verified for authority, insurance & safety scores.' },
                  { icon: Clock, t: '24/7 Dispatch Coverage', d: 'Hot loads, late-night pickups, weekend recoveries — we answer.' },
                  { icon: Award, t: 'Driver-First Mentality', d: 'Happy drivers deliver on time. We pay quickly, treat carriers like partners.' },
                  { icon: Users, t: 'Nationwide Coverage', d: 'Deep capacity across major U.S. freight corridors.' }
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t} className="flex gap-3 p-3 rounded-xl bg-brand-light border border-brand-light3 hover:border-orange-400/40 transition">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center"><Icon className="w-5 h-5 text-white" /></div>
                    <div>
                      <div className="font-display italic font-bold text-sm text-brand-navy">{t}</div>
                      <div className="text-xs text-brand-navy/60">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 6. CARRIER CONVERSION ============ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.truckSnowRoad} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/60" />
        </div>
        <div className="container-x relative grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="badge mb-3">Calling All Carriers</div>
            <h2 className="font-display italic font-black text-3xl lg:text-4xl mb-4 leading-[0.95]">
              Drive For A <br /><span className="text-orange-400">Broker That Pays Fast.</span>
            </h2>
            <div className="divider-glow w-24 mb-4" />
            <p className="text-white/85 text-base leading-relaxed mb-6">Stop chasing checks. Stop waiting on hold. SFam Logistics treats carriers the way drivers deserve — same-day pay options, fair rates, honest communication, and real respect.</p>
            <div className="space-y-2 mb-8">
              {[
                ['Same-day pay options', 'Get paid in days, not weeks.'],
                ['24/7 dispatch you can reach', 'A real human, every time.'],
                ['No detention disputes', 'We pay what we owe. Period.'],
                ['Long-term lane partnerships', 'Consistent freight, not random one-offs.']
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm">{t}</div>
                    <div className="text-xs text-white/60">{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/carrier-onboarding" className="btn-primary !px-7 !py-3">Sign Up as a Carrier <ArrowRight className="w-4 h-4" /></Link>
              <a href="tel:+18886985556" className="btn-ghost !px-7 !py-3"><Phone className="w-4 h-4" /> Call Dispatch</a>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative">
              <div className="relative bg-brand-navy/90 backdrop-blur-xl border border-orange-400/30 rounded-2xl p-6">
                <h3 className="font-display italic font-black text-xl mb-1">Quick Carrier Signup</h3>
                <p className="text-white/60 text-xs mb-4">Get approved in 24 hours.</p>
                <div className="space-y-3">
                  <input className="input !py-2.5 text-sm" placeholder="Company Name" />
                  <div className="grid grid-cols-2 gap-2">
                    <input className="input !py-2.5 text-sm" placeholder="MC #" />
                    <input className="input !py-2.5 text-sm" placeholder="DOT #" />
                  </div>
                  <input className="input !py-2.5 text-sm" placeholder="Contact Name" />
                  <input className="input !py-2.5 text-sm" placeholder="Email" />
                  <Link to="/carrier-onboarding" className="btn-primary w-full !py-3 text-sm">Complete Application <ArrowRight className="w-4 h-4" /></Link>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                  {[['24h', 'Approval'], ['$0', 'Setup Fee'], ['100%', 'Insured']].map(([n, l]) => (
                    <div key={l}>
                      <div className="text-lg font-display italic font-black text-orange-400">{n}</div>
                      <div className="text-[9px] text-white/50 uppercase tracking-widest">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 7. PROCESS TIMELINE (LIGHT) ============ */}
      <section className="section-light">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/10 border border-brand-navy/20 text-brand-navy text-xs font-bold uppercase tracking-[0.15em] mb-3 mx-auto">The Process</div>
              <h2 className="font-display italic font-black text-3xl sm:text-4xl text-brand-navy">From Quote to <span className="text-orange-500">Delivery</span></h2>
              <div className="h-0.5 w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-brand-navy to-transparent" />
            </div>
          </Reveal>
          <div className="relative">
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-orange-400/0 via-orange-400 to-orange-400/0" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {[
                { n: '01', i: Phone, t: 'Submit Request', d: 'Send origin, destination, and freight details — online or by phone.' },
                { n: '02', i: TrendingUp, t: 'Get a Quote', d: 'Receive a competitive rate within 30 minutes during business hours.' },
                { n: '03', i: Truck, t: 'We Dispatch', d: 'A vetted carrier is assigned, paperwork signed, pickup scheduled.' },
                { n: '04', i: CheckCircle2, t: 'Track & Deliver', d: 'Live updates from pickup to POD. No surprises, no silence.' }
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 120}>
                  <div className="text-center relative">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center shadow-lg shadow-orange-500/30 ring-4 ring-brand-light"><s.i className="w-7 h-7 text-white" /></div>
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-navy border-2 border-orange-400 grid place-items-center text-orange-400 font-display italic font-bold text-[10px]">{s.n}</div>
                    </div>
                    <h3 className="font-display italic font-black text-lg mb-2 text-brand-navy">{s.t}</h3>
                    <p className="text-brand-navy/60 text-xs leading-relaxed">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8. AGENT RECRUITMENT BANNER ============ */}
      <section className="section">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-2xl border border-orange-400/30">
            <div className="absolute inset-0">
              <img src={IMG.trailerLoaded} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/50" />
            </div>
            <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12 items-center">
              <div>
                <div className="badge mb-3">Now Recruiting</div>
                <h2 className="font-display italic font-black text-3xl mb-3">Join SFam as an<br /><span className="text-orange-400">Independent Freight Agent</span></h2>
                <p className="text-white/85 mb-6">Top commission splits, full back-office support, and the freedom to grow your book — backed by a leadership team that&apos;s been on the road.</p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/agent-opportunities" className="btn-primary !px-6 !py-3">Apply Now <ArrowRight className="w-4 h-4" /></Link>
                  <Link to="/agent-opportunities" className="btn-ghost !px-6 !py-3">Learn More</Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[['Up to 75%', 'Commissions'], ['Same-Day Pay', 'Available'], ['TMS Access', 'Included'], ['Territory', 'Open']].map(([k, v]) => (
                  <div key={v} className="bg-brand-navy/60 backdrop-blur-sm border border-orange-400/20 rounded-xl p-4 text-center">
                    <div className="text-lg font-display italic font-black text-orange-400">{k}</div>
                    <div className="text-[9px] text-white/60 uppercase tracking-widest mt-1 font-bold">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 9. FOUNDING PARTNERS ============ */}
      <section className="section-white pt-0">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="text-center">
              <h2 className="font-display italic font-black text-3xl mb-6 text-brand-navy">Building Our <span className="text-orange-500">Reputation</span></h2>
              <div className="bg-brand-light border border-brand-light3 rounded-2xl p-8 lg:p-12">
                <p className="text-brand-navy/80 text-lg leading-relaxed italic">&ldquo;We are just getting started — and we are building our reputation one load and one relationship at a time. Be one of our founding partners.&rdquo;</p>
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  <Link to="/quote" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-brand-navy font-bold text-sm uppercase tracking-wider hover:-translate-y-0.5 transition">Get a Quote <ArrowRight className="w-4 h-4" /></Link>
                  <Link to="/carrier-onboarding" className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-brand-navy/30 text-brand-navy text-sm font-bold uppercase tracking-wider hover:bg-brand-navy hover:text-white transition">Partner With Us</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 10. FINAL CTA ============ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="relative bg-gradient-to-br from-brand-navy3 to-brand-navy border border-orange-400/20 rounded-2xl overflow-hidden p-10 lg:p-14 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-orange-400/5" />
            <div className="relative">
              <div className="badge mb-4 mx-auto">Ready When You Are</div>
              <h2 className="font-display italic font-black text-3xl sm:text-4xl">Your Freight.<br /><span className="text-orange-400">Our Promise.</span></h2>
              <div className="divider-glow w-24 mx-auto my-5" />
              <p className="text-white/70 max-w-xl mx-auto mb-8">Whether you ship one load a month or one hundred, we&apos;d love to earn your business. Get a no-pressure quote in minutes.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/quote" className="btn-primary !px-8 !py-3.5">Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
                <a href="tel:+18886985556" className="btn-ghost !px-8 !py-3.5"><Phone className="w-4 h-4" /> 1 (888) 698-5556</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
