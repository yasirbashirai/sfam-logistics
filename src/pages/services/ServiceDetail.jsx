import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Truck, Boxes, Snowflake, PackageOpen, Route, Zap, ArrowLeft, Phone, ShieldCheck, Clock, Award, Star } from 'lucide-react'
import PageMeta from '../../components/PageMeta.jsx'
import { PageHero, Orbs } from '../../components/Section.jsx'
import Reveal from '../../components/Reveal.jsx'
import { services } from '../../data/site.js'
import IMG from '../../data/images.js'

const iconMap = { Truck, Boxes, Snowflake, PackageOpen, Route, Zap }
const imgKeys = { 'full-truckload': 'ftlTruck', 'less-than-truckload': 'ltlPallets', 'reefer': 'reeferTrailer', 'flatbed': 'flatbedLoad', 'dedicated': 'dedicatedFleet', 'expedited': 'expeditedVan' }

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find(s => s.slug === slug)
  if (!service) return <Navigate to="/services" replace />
  const Icon = iconMap[service.icon] || Truck
  const heroImg = IMG[imgKeys[slug]] || IMG.ftlTruck

  const features = [
    'Dedicated point of contact from quote to POD',
    'Vetted carriers with current insurance and authority',
    'Real-time load tracking and proactive updates',
    'Competitive market-based pricing',
    'Dedicated claims and detention support',
    '24/7 dispatch coverage for after-hours needs'
  ]

  const faqs = [
    { q: `How fast can I get a ${service.name} quote?`, a: 'Most quotes return within 30 minutes during business hours. Urgent loads can be priced within 10 minutes by phone.' },
    { q: 'Do you offer cargo insurance?', a: 'Yes — all our carriers carry cargo insurance and we name our shippers as additional insured on file.' },
    { q: 'What lanes do you cover?', a: 'Nationwide coverage across the United States with deep capacity in PNW, California, Texas, Midwest, and Southeast corridors.' },
    { q: 'Are there any hidden fees?', a: 'Never. Our quotes are all-in. Any accessorial costs are disclosed upfront before you confirm.' }
  ]

  return (
    <>
      <PageMeta title={`${service.name} — Freight Services`} description={`${service.long} SFam Logistics — FMCSA authorized freight broker, MC 1810116, USDOT 4555943.`} />
      <PageHero eyebrow="Service" title={service.name} subtitle={service.short} image={heroImg}>
        <Link to="/quote" className="btn-primary">Request a Quote <ArrowRight className="w-5 h-5" /></Link>
        <Link to="/services" className="btn-ghost"><ArrowLeft className="w-4 h-4" /> All Services</Link>
      </PageHero>

      {/* ===== 1. OVERVIEW + IMAGE ===== */}
      <section className="section">
        <Orbs />
        <div className="container-x relative grid lg:grid-cols-3 gap-10">
          <Reveal className="lg:col-span-2">
            <div className="glass-strong p-8 lg:p-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-6"><Icon className="w-8 h-8 text-brand-navy" /></div>
              <h2 className="font-display italic font-black text-4xl mb-5">About {service.name}</h2>
              <div className="divider-glow w-32 mb-6" />
              <p className="text-white/75 leading-relaxed text-lg mb-8">{service.long}</p>
              <h3 className="font-display italic font-black text-2xl mb-4">What&apos;s Included</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {features.map(f => (
                  <li key={f} className="flex gap-3 text-sm text-white/75"><CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" /> {f}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <aside className="glass p-7 h-fit lg:sticky lg:top-32">
            <h3 className="font-display italic font-black text-xl mb-4">Get a Quote</h3>
            <p className="text-white/60 text-sm mb-5">Most quotes returned within 30 minutes during business hours.</p>
            <Link to="/quote" className="btn-primary w-full">Start Quote</Link>
            <div className="mt-6 pt-6 border-t border-white/10 text-sm text-white/60 space-y-2">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-orange-400" /> <a href="tel:+18886985556" className="hover:text-orange-300">1 (888) 698-5556</a></div>
              <div>✉️ info@sfamlogistics.com</div>
              <div className="text-xs text-white/40 mt-3">Mon–Fri • 8AM–5PM PST</div>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== 2. BENEFITS ===== */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/30 to-transparent">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="badge mb-4 mx-auto">Why Choose SFam</div>
              <h2 className="font-display italic font-black text-3xl">The Benefits Of <span className="text-orange-400">{service.name}</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { i: ShieldCheck, t: 'Fully Insured', d: 'Cargo and liability coverage on every shipment.' },
              { i: Clock, t: 'On-Time Focus', d: 'Realistic scheduling and proactive issue resolution.' },
              { i: Award, t: 'Driver-Vetted', d: 'Only the best carriers — vetted by people who drove.' },
              { i: Star, t: 'FMCSA Licensed', d: 'Fully authorized property broker with BMC-84 bond.' }
            ].map(({ i: Icon, t, d }, idx) => (
              <Reveal key={t} delay={idx * 100}>
                <div className="glass p-6 hover:border-orange-400/40 hover:-translate-y-1 transition group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4 group-hover:rotate-6 transition"><Icon className="w-6 h-6 text-brand-navy" /></div>
                  <div className="font-display italic font-black text-lg mb-1">{t}</div>
                  <div className="text-sm text-white/60">{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. PROCESS ===== */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="badge mb-4 mx-auto">How It Works</div>
              <h2 className="font-display italic font-black text-3xl">Simple. Fast. <span className="text-orange-400">Reliable.</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: '01', t: 'Submit', d: 'Send freight details online or by phone.' },
              { n: '02', t: 'Quote', d: 'Get pricing within 30 minutes.' },
              { n: '03', t: 'Dispatch', d: 'Vetted carrier assigned and confirmed.' },
              { n: '04', t: 'Deliver', d: 'Live updates from pickup to POD.' }
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="glass p-6 relative">
                  <div className="text-6xl font-display italic font-black text-orange-400/20 absolute top-2 right-4">{s.n}</div>
                  <div className="font-display italic font-black text-2xl mb-2 relative">{s.t}</div>
                  <div className="text-sm text-white/60 relative">{s.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. FAQ ===== */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/30 to-transparent">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="text-center mb-12">
              <div className="badge mb-4 mx-auto">FAQ</div>
              <h2 className="font-display italic font-black text-3xl">Common <span className="text-orange-400">Questions</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 80}>
                <details className="glass p-6 group cursor-pointer hover:border-orange-400/40 transition">
                  <summary className="flex items-center justify-between font-display italic font-bold text-lg list-none">
                    {f.q}
                    <span className="text-orange-400 text-2xl group-open:rotate-45 transition">+</span>
                  </summary>
                  <p className="text-white/70 mt-4 leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. RELATED + CTA ===== */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="text-center mb-10">
              <div className="badge mb-3 mx-auto">More Services</div>
              <h2 className="font-display italic font-black text-4xl">Explore Other <span className="text-orange-400">Solutions</span></h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {services.filter(s => s.slug !== slug).slice(0,3).map(s => {
              const I = iconMap[s.icon] || Truck
              return (
                <Link key={s.slug} to={`/services/${s.slug}`} className="group glass p-6 hover:border-orange-400/50 transition">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4"><I className="w-6 h-6 text-brand-navy" /></div>
                  <div className="font-display italic font-black text-lg mb-1">{s.name}</div>
                  <div className="text-xs text-white/50">{s.short}</div>
                </Link>
              )
            })}
          </div>
          <div className="relative glass-strong neon-border p-12 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-400/20 blur-3xl rounded-full" />
            <div className="relative">
              <h2 className="font-display italic font-black text-4xl mb-4">Ready to Move <span className="text-orange-400">{service.name}?</span></h2>
              <Link to="/quote" className="btn-primary !px-8 !py-4 mt-4">Get a Quote Now <ArrowRight className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
