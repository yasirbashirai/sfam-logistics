import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Boxes, Snowflake, PackageOpen, Route, Zap, ShieldCheck, Award, Users, TrendingUp, CheckCircle2, Phone } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { services } from '../data/site.js'
import IMG from '../data/images.js'
import Reveal from '../components/Reveal.jsx'

const iconMap = { Truck, Boxes, Snowflake, PackageOpen, Route, Zap }

export default function Home() {
  return (
    <>
      <PageMeta title="Nationwide Freight Brokerage" description="SFam Logistics LLC — FMCSA-authorized freight brokerage in Bothell, WA. FTL, LTL, reefer, flatbed, dedicated, and expedited freight across the United States and North America. MC 1810116 • USDOT 4555943. Built by drivers, trusted by shippers." />

      {/* ============ 1. HERO — CENTERED TAGLINE + SINGLE BUTTON ============ */}
      <section className="relative min-h-[78vh] flex items-center pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.highwayMountains} alt="SFam Logistics — freight on the open road" className="w-full h-full object-cover" />
          {/* Lighter overlay so the photo stays visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-brand-navy/55 to-brand-navy/85" />
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
            <div className="mt-8 flex justify-center">
              <Link to="/quote" className="btn-primary !px-10 !py-4">Request a Quote <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 2. WHO WE ARE — text left, tagline text right ============ */}
      <section className="section-light">
        <div className="container-x grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-[0.15em] mb-4">Who We Are</div>
              <h2 className="font-display italic font-black text-3xl lg:text-4xl mb-4">A freight broker that <span className="text-orange-400">actually drives.</span></h2>
              <div className="h-0.5 w-24 bg-gradient-to-r from-orange-400 to-transparent mb-4 mx-auto lg:mx-0" />
              <p className="text-white/80 leading-relaxed mb-4">SFam Logistics LLC is a Washington-based freight brokerage built on over a decade of real road experience. We coordinate truckload, LTL, reefer, flatbed, and dedicated freight across the United States and North America &mdash; with the kind of clarity, fairness, and follow-through that the industry too often forgets.</p>
              <p className="text-white/80 leading-relaxed mb-6">We&apos;re not a faceless broker. We&apos;re drivers who became dispatchers, dispatchers who became brokers &mdash; and now agents and partners who all believe the same thing: <span className="text-orange-400 font-semibold">freight moves on trust.</span></p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link to="/about" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/30 text-white text-sm font-bold uppercase tracking-wider hover:bg-orange-400 hover:border-orange-400 hover:text-brand-navy transition">Our Story <ArrowRight className="w-3.5 h-3.5" /></Link>
                <Link to="/services" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white/80 text-sm font-bold uppercase tracking-wider hover:text-orange-300 transition">View Services</Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-[0.15em] mb-4">Built By Drivers</div>
              <h3 className="font-display italic font-black text-2xl lg:text-3xl mb-4 leading-tight">
                <span className="text-orange-400">Real road experience.</span><br />
                <span className="text-white">Honest brokerage.</span>
              </h3>
              <div className="h-0.5 w-24 bg-gradient-to-r from-orange-400 to-transparent mb-4 mx-auto lg:mx-0" />
              <p className="text-white/80 leading-relaxed text-lg">SFam Logistics LLC is a freight brokerage built by drivers. We coordinate FTL, LTL, reefer, flatbed, and dedicated freight across the United States and North America &mdash; with the kind of communication only real road experience teaches.</p>
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

      {/* ============ 4. WHY SHIPPERS CHOOSE US — centered, no left image ============ */}
      <section className="section-white">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="badge mb-3 mx-auto">Why Shippers Choose Us</div>
              <h2 className="font-display italic font-black text-3xl lg:text-4xl">Trusted From <span className="text-orange-400">First Mile to Last.</span></h2>
              <div className="divider-glow w-24 mx-auto my-4" />
              <p className="text-white/80 text-base leading-relaxed">Our owner spent over a decade behind the wheel before founding SFam. That perspective shows up in every load &mdash; realistic schedules, honest communication, fair carrier rates.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: ShieldCheck, t: 'Vetted Carrier Network', d: 'Every carrier verified for authority, insurance & safety scores.' },
              { icon: Award, t: 'Driver-First Mentality', d: 'Happy drivers deliver on time. We pay quickly, treat carriers like partners.' },
              { icon: Users, t: 'Nationwide Coverage', d: 'Deep capacity across major U.S. freight corridors.' }
            ].map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 100}>
                <div className="text-center p-6 rounded-2xl bg-white/[0.05] border border-white/15 hover:border-orange-400/40 transition h-full">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4">
                    <Icon className="w-6 h-6 text-brand-navy" />
                  </div>
                  <div className="font-display italic font-bold text-lg mb-2">{t}</div>
                  <div className="text-sm text-white/70">{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. CALLING ALL CARRIERS — headline + sign-up button only, centered ============ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.truckSnowRoad} alt="" className="w-full h-full object-cover" />
          {/* Lighter overlay so the photo is visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/55 via-brand-navy/45 to-brand-navy/75" />
        </div>
        <div className="container-x relative text-center max-w-3xl">
          <Reveal>
            <div className="badge mb-4 mx-auto">Calling All Carriers</div>
            <h2 className="font-display italic font-black text-3xl lg:text-5xl mb-4 leading-[0.95]">
              Drive For A <br /><span className="text-orange-400">Broker That Pays Fast.</span>
            </h2>
            <div className="divider-glow w-24 mx-auto my-5" />
            <div className="mt-8 flex justify-center">
              <Link to="/carrier-onboarding" className="btn-primary !px-10 !py-4">Sign Up as a Carrier <ArrowRight className="w-4 h-4" /></Link>
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

      {/* ============ 7. AGENT RECRUITMENT BANNER — centered ============ */}
      <section className="section">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-2xl border border-orange-400/30">
            <div className="absolute inset-0">
              <img src={IMG.trailerLoaded} alt="" className="w-full h-full object-cover" />
              {/* Lighter overlay so the photo is visible */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/55 via-brand-navy/45 to-brand-navy/75" />
            </div>
            <div className="relative p-8 lg:p-14 text-center max-w-3xl mx-auto">
              <div className="badge mb-3 mx-auto">Now Recruiting</div>
              <h2 className="font-display italic font-black text-3xl lg:text-4xl mb-3">Join SFam as an<br /><span className="text-orange-400">Independent Freight Agent</span></h2>
              <div className="divider-glow w-24 mx-auto my-4" />
              <p className="text-white/85 mb-6 max-w-xl mx-auto">Top commission splits, full back-office support, and the freedom to grow your book &mdash; backed by a leadership team that&apos;s been on the road.</p>
              <div className="flex justify-center">
                <Link to="/agent-opportunities" className="btn-primary !px-8 !py-3.5">Apply Now <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8. FINAL CTA — centered ============ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="relative bg-gradient-to-br from-brand-navy3 to-brand-navy border border-orange-400/20 rounded-2xl overflow-hidden p-10 lg:p-14 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-orange-400/5" />
            <div className="relative">
              <div className="badge mb-4 mx-auto">Ready When You Are</div>
              <h2 className="font-display italic font-black text-3xl sm:text-4xl">Your Freight.<br /><span className="text-orange-400">Our Promise.</span></h2>
              <div className="divider-glow w-24 mx-auto my-5" />
              <p className="text-white/80 max-w-xl mx-auto mb-8">Whether you ship one load a month or one hundred, we&apos;d love to earn your business. Get a no-pressure quote in minutes.</p>
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
