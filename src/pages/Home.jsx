import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Boxes, Snowflake, PackageOpen, Route, Zap, ShieldCheck, Award, Users, TrendingUp, CheckCircle2, Phone } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { services } from '../data/site.js'
import Reveal from '../components/Reveal.jsx'

const iconMap = { Truck, Boxes, Snowflake, PackageOpen, Route, Zap }

export default function Home() {
  return (
    <>
      <PageMeta title="Nationwide Freight Brokerage" description="SFam Logistics LLC — FMCSA-authorized freight brokerage in Bothell, WA. FTL, LTL, reefer, flatbed, dedicated, and expedited freight across the United States and North America. MC 1810116 • USDOT 4555943. Built by drivers, trusted by shippers." />

      {/* ============ 1. HERO — CENTERED TAGLINE + DUAL BUTTONS ============ */}
      <section className="relative min-h-[78vh] lg:min-h-[110vh] flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-home.jpg" alt="SFam Logistics — freight on the open road" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/55 via-brand-navy/40 to-brand-navy/75 sm:from-brand-navy/65 sm:via-brand-navy/50 sm:to-brand-navy/80" />
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-transparent" />

        <div className="container-x relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6 justify-center">
              <div className="h-px w-10 bg-orange-400" />
              <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-bold">Nationwide Freight Brokerage</span>
              <div className="h-px w-10 bg-orange-400" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display italic font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-4xl mx-auto">
              <span className="text-white block">Reliable Freight, Delivered With</span>
              <span className="text-orange-400 block">Honest Hands.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <div className="divider-glow w-24 mx-auto my-6" />
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <Link to="/quote" className="btn-primary flex-1">Request a Quote <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/carrier-onboarding" className="btn-ghost flex-1">Haul For Us <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 2. WHO WE ARE — text left, tagline text right ============ */}
      <section className="section-light">
        <div className="container-x grid lg:grid-cols-2 gap-10 lg:items-stretch">
          <Reveal className="h-full">
            <div className="text-center lg:text-left flex flex-col h-full">
              <div className="self-center lg:self-start inline-flex items-center gap-2 pl-3.5 pr-2.5 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-[0.1em] mb-4">Who We Are</div>
              <h2 className="font-display italic font-black text-3xl lg:text-4xl mb-4">A freight broker that <span className="text-orange-400">actually drives.</span></h2>
              <div className="h-0.5 w-24 bg-gradient-to-r from-orange-400 to-transparent mb-4 mx-auto lg:mx-0" />
              <p className="text-white/80 leading-relaxed mb-4">SFam Logistics LLC is a Washington-based freight brokerage built on over a decade of real road experience. We coordinate truckload, LTL, reefer, flatbed, and dedicated freight across the United States and North America &mdash; with the kind of clarity, fairness, and follow-through that the industry too often forgets.</p>
              <p className="text-white/80 leading-relaxed mb-6">We&apos;re not a faceless broker. We&apos;re drivers who became dispatchers, dispatchers who became brokers &mdash; and now agents and partners who all believe the same thing: <span className="text-orange-400 font-semibold">freight moves on trust.</span></p>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto max-w-md mx-auto lg:mx-0 w-full">
                <Link to="/about" className="btn-ghost flex-1">Our Story <ArrowRight className="w-4 h-4" /></Link>
                <Link to="/services" className="btn-ghost flex-1">View Services</Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200} className="h-full">
            <div className="text-center lg:text-left flex flex-col h-full">
              <div className="self-center lg:self-start inline-flex items-center gap-2 pl-3.5 pr-2.5 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-[0.1em] mb-4">Built By Drivers</div>
              <h2 className="font-display italic font-black text-3xl lg:text-4xl mb-4">Real road experience. <span className="text-orange-400">Honest brokerage.</span></h2>
              <div className="h-0.5 w-24 bg-gradient-to-r from-orange-400 to-transparent mb-4 mx-auto lg:mx-0" />
              <p className="text-white/80 leading-relaxed mb-4">SFam Logistics LLC is a freight brokerage built by drivers. We coordinate FTL, LTL, reefer, flatbed, and dedicated freight across the United States and North America &mdash; with the kind of communication only real road experience teaches.</p>
              <p className="text-white/80 leading-relaxed mb-6">Our owner spent over a decade behind the wheel before founding SFam. That perspective shows up in every load &mdash; <span className="text-orange-400 font-semibold">realistic schedules, honest communication, fair carrier rates.</span></p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-auto">
                <Link to="/agent-opportunities" className="btn-ghost">Become an Agent <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 3. SERVICES — icon + name + short text only, centered ============ */}
      <section className="section">
        <div className="container-x relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="badge mb-3 mx-auto">Our Services</div>
              <h2 className="font-display italic font-black text-3xl sm:text-4xl">Every Lane.<br /><span className="text-orange-400">Every Load. Every Time.</span></h2>
              <div className="divider-glow w-24 mx-auto mt-4" />
              <p className="mt-4 text-white/70 text-sm">From a single LTL pallet to dedicated weekly truckload capacity &mdash; we&apos;ve got carriers, systems, and experience to move it.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || Truck
              return (
                <Reveal key={s.slug} delay={i * 80}>
                  <Link to={`/services/${s.slug}`} className="group block rounded-2xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-orange-400/50 transition-all hover:-translate-y-1 p-7 text-center h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mx-auto mb-4 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition">
                      <Icon className="w-7 h-7 text-brand-navy" />
                    </div>
                    <h3 className="font-display italic font-black text-lg mb-2">{s.name}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{s.short}</p>
                    <span className="inline-flex items-center gap-1.5 text-orange-400 text-[10px] font-bold uppercase tracking-widest">Learn more <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition" /></span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ 4. WHY SHIPPERS CHOOSE US — text/boxes left, image right ============ */}
      <section className="section-white">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="mb-8">
                  <div className="badge mb-3">Why Shippers Choose Us</div>
                  <h2 className="font-display italic font-black text-3xl lg:text-4xl">Trusted From <span className="text-orange-400">First Mile to Last.</span></h2>
                  <div className="h-0.5 w-24 bg-gradient-to-r from-orange-400 to-transparent my-4" />
                  <p className="text-white/80 text-base leading-relaxed">Our owner spent over a decade behind the wheel before founding SFam. That perspective shows up in every load &mdash; realistic schedules, honest communication, fair carrier rates.</p>
                </div>
              </Reveal>
              <div className="grid sm:grid-cols-1 gap-4">
                {[
                  { icon: ShieldCheck, t: 'Vetted Carrier Network', d: 'Every carrier verified for authority, insurance & safety scores.' },
                  { icon: Award, t: 'Driver-First Mentality', d: 'Happy drivers deliver on time. We pay quickly, treat carriers like partners.' },
                  { icon: Users, t: 'Nationwide Coverage', d: 'Deep capacity across major U.S. freight corridors.' }
                ].map(({ icon: Icon, t, d }, i) => (
                  <Reveal key={t} delay={i * 100}>
                    <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/15 hover:border-orange-400/40 transition">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center">
                        <Icon className="w-6 h-6 text-brand-navy" />
                      </div>
                      <div>
                        <div className="font-display italic font-bold text-lg mb-1">{t}</div>
                        <div className="text-sm text-white/70">{d}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={200}>
              <div className="relative rounded-2xl overflow-hidden border border-orange-400/30 shadow-2xl shadow-black/40">
                <img src="/images/why-shippers-choose-us.jpeg" alt="Why shippers choose SFam Logistics" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                  <span className="inline-block px-4 py-2 rounded-full bg-orange-400/95 text-brand-navy font-display italic font-black uppercase tracking-wider text-sm sm:text-base shadow-lg shadow-black/30">
                    10+ years on the road
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 5. CALLING ALL CARRIERS — headline + sign-up button only, centered ============ */}
      <section className="section">
        <div className="container-x relative text-center max-w-3xl">
          <Reveal>
            <div className="badge mb-4 mx-auto">Calling All Carriers</div>
            <h2 className="font-display italic font-black text-3xl lg:text-5xl mb-4 leading-[0.95]">
              Drive For A <br /><span className="text-orange-400">Broker That Pays Fast.</span>
            </h2>
            <div className="divider-glow w-24 mx-auto my-5" />
            <div className="mt-8 flex justify-center">
              <Link to="/carrier-onboarding" className="btn-primary">Sign Up as a Carrier <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 6. PROCESS TIMELINE — centered ============ */}
      <section className="section-light">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="badge mb-3 mx-auto">The Process</div>
              <h2 className="font-display italic font-black text-3xl sm:text-4xl">From Quote to <span className="text-orange-400">Delivery</span></h2>
              <div className="divider-glow w-24 mx-auto my-4" />
              <p className="text-white/70 text-sm">Four simple steps from first call to proof of delivery.</p>
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
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center shadow-lg shadow-orange-500/30 ring-4 ring-brand-navy"><s.i className="w-7 h-7 text-white" /></div>
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-navy border-2 border-orange-400 grid place-items-center text-orange-400 font-display italic font-bold text-[10px]">{s.n}</div>
                    </div>
                    <h3 className="font-display italic font-black text-lg mb-2">{s.t}</h3>
                    <p className="text-white/70 text-xs leading-relaxed">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. AGENT RECRUITMENT — image left, text right ============ */}
      <section className="section">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden border border-orange-400/30 shadow-2xl shadow-black/40">
                <img src="/images/recruiting-snowy-highway.png" alt="Trucks on a snowy mountain highway" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="text-center lg:text-left">
                <div className="badge mb-3">Now Recruiting</div>
                <h2 className="font-display italic font-black text-3xl lg:text-4xl mb-3">Join SFam as an<br /><span className="text-orange-400">Independent Freight Agent</span></h2>
                <div className="h-0.5 w-24 bg-gradient-to-r from-orange-400 to-transparent my-4 mx-auto lg:mx-0" />
                <p className="text-white/85 mb-6">Top commission splits, full back-office support, and the freedom to grow your book &mdash; backed by a leadership team that&apos;s been on the road.</p>
                <div className="flex justify-center lg:justify-start">
                  <Link to="/agent-opportunities" className="btn-primary">Apply Now <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 8. FINAL CTA — centered ============ */}
      <section className="section">
        <div className="container-x">
          <div className="relative bg-gradient-to-br from-brand-navy3 to-brand-navy border border-orange-400/20 rounded-2xl overflow-hidden p-10 lg:p-14 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-orange-400/5" />
            <div className="relative">
              <div className="badge mb-4 mx-auto">Ready When You Are</div>
              <h2 className="font-display italic font-black text-3xl sm:text-4xl">Your Freight.<br /><span className="text-orange-400">Our Promise.</span></h2>
              <div className="divider-glow w-24 mx-auto my-5" />
              <p className="text-white/80 max-w-xl mx-auto mb-8">Whether you ship one load a month or one hundred, we&apos;d love to earn your business. Get a no-pressure quote in minutes.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Link to="/quote" className="btn-primary flex-1">Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
                <a href="tel:+18886985556" className="btn-ghost flex-1"><Phone className="w-4 h-4" /> 1 (888) 698-5556</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
