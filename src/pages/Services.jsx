import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Boxes, Snowflake, PackageOpen, Route, Zap, ShieldCheck, Clock, Phone, CheckCircle2, Repeat } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { services, focusServices } from '../data/site.js'
import { FocusServiceGrid, QuoteEmailLink } from '../components/FocusServices.jsx'
import IMG from '../data/images.js'
import { breadcrumbLd, serviceLd } from '../data/seo.js'

const iconMap = { Truck, Boxes, Snowflake, PackageOpen, Route, Zap }

const servicesJsonLd = [
  breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
  ...focusServices.map(s => serviceLd({ name: s.name, description: s.text })),
  ...services.map(s => serviceLd({ name: s.name, description: s.long || s.short, slug: s.slug }))
]

export default function Services() {
  return (
    <>
      <PageMeta
        title="Produce, Refrigerated & Dry Van Freight Brokerage"
        description="SFam Logistics focuses on produce, refrigerated, and dry van freight in the Pacific Northwest, with nationwide shipping support. Request a spot quote or ask about recurring freight."
        keywords="produce freight broker, refrigerated freight broker, reefer freight, dry van freight broker, Pacific Northwest freight brokerage, PNW freight, spot quote, recurring freight, freight broker services, Washington freight broker"
        path="/services"
        image="/images/highway-mountains.jpg"
        jsonLd={servicesJsonLd}
      />
      <PageHero eyebrow="Logistics Services" title={<>Produce, Refrigerated &amp; Dry Van <span className="text-orange-400">Freight Brokerage</span></>} subtitle="We focus on produce, refrigerated, and dry van freight in the Pacific Northwest. We also support nationwide shipments and review other freight needs." image={IMG.heroHighway} />

      {/* ===== 1. MAIN SERVICES — produce, refrigerated, dry van, other ===== */}
      <section className="section">
        <Orbs />
        <div className="container-x relative">
          <FocusServiceGrid />

          {/* Existing service detail pages, kept as additional options */}
          <Reveal>
            <div className="text-center mt-16 mb-8">
              <div className="badge mb-3 mx-auto">More Freight Options</div>
              <h2 className="font-display italic font-black text-2xl">Service <span className="text-orange-400">Details</span></h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || Truck
              return (
                <Reveal key={s.slug} delay={i * 60}>
                  <Link to={`/services/${s.slug}`} className="group flex gap-4 items-start rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-orange-400/50 transition p-5 h-full">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center"><Icon className="w-5 h-5 text-white" /></div>
                    <div>
                      <h3 className="font-display italic font-black text-base mb-1">{s.name}</h3>
                      <p className="text-white/60 text-xs leading-relaxed mb-2">{s.short}</p>
                      <span className="inline-flex items-center gap-1.5 text-orange-400 text-[10px] font-bold uppercase tracking-widest">View details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" /></span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 2. WHY OUR SERVICES STAND OUT ===== */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/30 to-transparent">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="badge mb-4 mx-auto">The SFam Standard</div>
              <h2 className="font-display italic font-black text-3xl">Service That <span className="text-orange-400">Actually Shows Up.</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { i: ShieldCheck, t: 'Vetted Carriers', d: 'Authority, insurance & safety scores verified before every load.' },
              { i: Clock, t: '24/7 Dispatch', d: 'Real humans, every hour. No phone trees, no missed calls.' },
              { i: CheckCircle2, t: 'Live Tracking', d: 'Status updates from pickup to POD on every shipment.' },
              { i: Phone, t: 'Dedicated Reps', d: 'One point of contact per shipper. They know your freight.' }
            ].map(({ i: Icon, t, d }, idx) => (
              <Reveal key={t} delay={idx * 100}>
                <div className="glass p-6 hover:border-orange-400/40 hover:-translate-y-1 transition">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4"><Icon className="w-6 h-6 text-white" /></div>
                  <div className="font-display italic font-black text-xl mb-2">{t}</div>
                  <div className="text-sm text-white/60">{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. EQUIPMENT NETWORK ===== */}
      <section className="section-light">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/30 text-white text-xs font-bold uppercase tracking-[0.15em] mb-3 mx-auto">Equipment Network</div>
              <h2 className="font-display italic font-black text-3xl text-white">Right Equipment. <span className="text-orange-500">Right Lane.</span></h2>
              <div className="h-0.5 w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              {['Reefer', 'Dry Van', 'Flatbed', 'Step Deck', 'Sprinter Van', 'LTL Pallets', 'Power Only', 'Intermodal'].map(eq => (
                <div key={eq} className="flex items-center gap-2 py-2 border-b border-white/15">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-white/85 text-sm font-medium">{eq}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 4. CTA ===== */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="relative glass-strong neon-border p-12 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-400/20 blur-3xl rounded-full" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mx-auto mb-5"><Repeat className="w-7 h-7 text-white" /></div>
              <h2 className="font-display italic font-black text-3xl mb-4">Spot Quotes &amp; <span className="text-orange-400">Recurring Freight</span></h2>
              <p className="text-white/70 mb-6 max-w-xl mx-auto text-lg">Request a spot quote for a one-time shipment or contact us about recurring loads.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                <Link to="/quote" className="btn-primary flex-1 whitespace-nowrap">Request a Quote <ArrowRight className="w-5 h-5" /></Link>
                <a href="tel:+18886985556" className="btn-ghost flex-1"><Phone className="w-5 h-5" /> Call Us</a>
              </div>
              <div className="mt-6"><QuoteEmailLink /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
