import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Boxes, Snowflake, PackageOpen, Route, Zap, ShieldCheck, Clock, Award, Globe2, Users, TrendingUp, CheckCircle2, Star, Phone } from 'lucide-react'
import { Orbs } from '../components/Section.jsx'
import { services } from '../data/site.js'

const iconMap = { Truck, Boxes, Snowflake, PackageOpen, Route, Zap }

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-24 overflow-hidden min-h-[100vh] flex items-center">
        <div className="absolute inset-0 grid-bg" />
        <Orbs />
        <div className="container-x relative grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-white/80">Nationwide Freight Brokerage • MC / DOT Authorized</span>
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
              Freight That <span className="gradient-text">Moves</span><br />
              People Who <span className="gradient-text">Care</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl">
              SFam Logistics is built by drivers, trusted by shippers. We coordinate truckload, LTL, reefer, flatbed, and dedicated freight across all 48 states — with the kind of communication that only comes from people who&apos;ve actually been on the road.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/quote" className="btn-primary">Get an Instant Quote <ArrowRight className="w-5 h-5" /></Link>
              <Link to="/carrier-onboarding" className="btn-ghost">Join as a Carrier</Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[['10+', 'Years on the Road'], ['48', 'States Covered'], ['24/7', 'Dispatch']].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-display font-bold gradient-text">{n}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK QUOTE CARD */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/30 via-pink-500/20 to-purple-600/30 blur-3xl rounded-3xl" />
            <div className="relative glass-strong neon-border p-8">
              <div className="label mb-2">Quick Quote</div>
              <h3 className="font-display font-bold text-2xl mb-6">Get Pricing in Under 30 Minutes</h3>
              <form action="/quote" className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input className="input" placeholder="Origin ZIP" name="origin" />
                  <input className="input" placeholder="Destination ZIP" name="destination" />
                </div>
                <select className="select" name="type" defaultValue="">
                  <option value="" disabled>Freight Type</option>
                  <option>Full Truckload (FTL)</option>
                  <option>LTL</option>
                  <option>Reefer</option>
                  <option>Flatbed</option>
                  <option>Expedited</option>
                </select>
                <input className="input" placeholder="Estimated Weight (lbs)" name="weight" />
                <Link to="/quote" className="btn-primary w-full">Continue to Full Quote <ArrowRight className="w-5 h-5" /></Link>
              </form>
              <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-orange-400" /> Or call <a href="tel:+18886985556" className="text-orange-300 font-semibold">1 (888) 698-5556</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-10 border-y border-white/10 bg-white/[0.02]">
        <div className="container-x flex flex-wrap items-center justify-around gap-6 text-white/40 text-sm">
          {['FMCSA Licensed', 'BMC-84 Bonded', 'Cargo Insured', 'BOC-3 Filed', 'USDOT Authorized', '10+ Years Experience'].map(t => (
            <div key={t} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t}</div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <Orbs />
        <div className="container-x relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="label mb-3">What We Move</div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl">Every Lane. Every Load. <span className="gradient-text">Every Time.</span></h2>
            <p className="mt-5 text-white/60">From a single LTL pallet to dedicated weekly truckload capacity, we&apos;ve got the carriers, the systems, and the experience to keep your freight moving.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || Truck
              return (
                <Link to={`/services/${s.slug}`} key={s.slug} className="group glass p-7 hover:border-orange-400/50 transition-all hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-purple-600/0 rounded-full blur-2xl group-hover:from-orange-500/40 transition" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 grid place-items-center mb-5 group-hover:scale-110 transition">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2">{s.name}</h3>
                    <p className="text-white/60 text-sm mb-5">{s.short}</p>
                    <span className="inline-flex items-center gap-2 text-orange-300 text-sm font-semibold">Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" /></span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="label mb-3">Why Shippers Choose Us</div>
              <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6">Built by Drivers. <br /><span className="gradient-text">Trusted by Shippers.</span></h2>
              <p className="text-white/70 mb-8">Our owner spent over a decade behind the wheel before starting SFam Logistics. That perspective shows up in every load — from realistic schedules to honest communication and fair carrier rates.</p>
              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, t: 'Vetted Carrier Network', d: 'Every carrier is verified for authority, insurance, and safety scores before they ever touch your freight.' },
                  { icon: Clock, t: '24/7 Dispatch Coverage', d: 'Hot loads, late-night pickups, weekend recoveries — we answer the phone when others won\'t.' },
                  { icon: Award, t: 'Driver-First Mentality', d: 'Happy drivers deliver on time. We pay quickly, communicate clearly, and treat carriers like partners.' },
                  { icon: Globe2, t: 'Nationwide Coverage', d: 'All 48 contiguous states with deep capacity in PNW, California, Texas, and Midwest corridors.' }
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t} className="flex gap-4 glass p-5">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-orange-500 to-purple-600 grid place-items-center"><Icon className="w-6 h-6" /></div>
                    <div>
                      <div className="font-semibold mb-1">{t}</div>
                      <div className="text-sm text-white/60">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/30 via-pink-500/20 to-purple-600/30 blur-3xl rounded-3xl" />
              <div className="relative glass-strong neon-border p-8 grid grid-cols-2 gap-6">
                {[
                  { i: TrendingUp, n: '98%', l: 'On-Time Delivery' },
                  { i: Users, n: '500+', l: 'Active Carriers' },
                  { i: Star, n: '4.9/5', l: 'Customer Rating' },
                  { i: Truck, n: '12K+', l: 'Loads Moved' }
                ].map(({ i: Icon, n, l }) => (
                  <div key={l} className="text-center p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                    <div className="text-3xl font-display font-bold gradient-text">{n}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <Orbs />
        <div className="container-x relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="label mb-3">How It Works</div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl">From Quote to <span className="gradient-text">Delivery</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: '01', t: 'Submit Request', d: 'Send us your origin, destination, and freight details — online or by phone.' },
              { n: '02', t: 'Get a Quote', d: 'Receive a competitive rate within 30 minutes during business hours.' },
              { n: '03', t: 'We Dispatch', d: 'A vetted carrier is assigned, paperwork signed, and pickup scheduled.' },
              { n: '04', t: 'Track & Deliver', d: 'Live updates from pickup to POD. No surprises, no silence.' }
            ].map(s => (
              <div key={s.n} className="relative glass p-6">
                <div className="text-5xl font-display font-bold gradient-text mb-3">{s.n}</div>
                <div className="font-semibold text-lg mb-2">{s.t}</div>
                <div className="text-sm text-white/60">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="label mb-3">What Partners Say</div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl">Real People. <span className="gradient-text">Real Loads.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: 'Marcus T.', r: 'Owner-Operator', q: 'SFam pays fast and they communicate. As a driver, that\'s all I ask. Best broker I\'ve worked with this year.' },
              { n: 'Jennifer L.', r: 'Logistics Manager', q: 'They actually answer the phone at 6am. We\'ve moved 40+ loads with them and zero issues.' },
              { n: 'David K.', r: 'Manufacturer', q: 'Their rates are fair, the trucks show up on time, and the team treats our freight like it\'s theirs. Highly recommend.' }
            ].map(t => (
              <div key={t.n} className="glass p-7">
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />)}</div>
                <p className="text-white/80 italic mb-5">&ldquo;{t.q}&rdquo;</p>
                <div>
                  <div className="font-semibold">{t.n}</div>
                  <div className="text-xs text-white/50">{t.r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-x">
          <div className="relative glass-strong neon-border overflow-hidden p-12 lg:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-purple-600/20" />
            <div className="relative">
              <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl">Ready to Move <span className="gradient-text">Your Freight?</span></h2>
              <p className="mt-5 text-white/70 max-w-xl mx-auto">Whether you ship one load a month or one hundred, we&apos;d love to earn your business. Get a no-pressure quote in minutes.</p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Link to="/quote" className="btn-primary">Get a Quote</Link>
                <Link to="/agent-opportunities" className="btn-ghost">Become an Agent</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
