import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Boxes, Snowflake, PackageOpen, Route, Zap, ShieldCheck, Clock, Phone, CheckCircle2 } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { services } from '../data/site.js'
import IMG from '../data/images.js'

const iconMap = { Truck, Boxes, Snowflake, PackageOpen, Route, Zap }
const imageKeys = ['ftlTruck', 'ltlPallets', 'reeferTrailer', 'flatbedLoad', 'dedicatedFleet', 'expeditedVan']

export default function Services() {
  return (
    <>
      <PageMeta title="Freight Services — FTL, LTL, Reefer, Flatbed, Dedicated" description="SFam Logistics offers Full Truckload, LTL, Refrigerated, Flatbed, Dedicated Freight, and Expedited shipping services across 48 states. Vetted carriers, 24/7 dispatch, live tracking." />
      <PageHero eyebrow="Our Services" title={<>Freight Solutions <span className="text-orange-400">For Every Lane</span></>} subtitle="From a single LTL pallet to dedicated weekly truckload capacity, we coordinate it all — backed by vetted carriers and 24/7 communication." image={IMG.heroHighway} />

      {/* ===== 1. SERVICES GRID WITH IMAGES ===== */}
      <section className="section">
        <Orbs />
        <div className="container-x relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || Truck
              return (
                <Reveal key={s.slug} delay={i * 80}>
                  <Link to={`/services/${s.slug}`} className="group block relative overflow-hidden rounded-3xl border border-white/10 h-[420px] hover:border-orange-400/50 transition-all hover:-translate-y-2">
                    <img src={IMG[imageKeys[i]]} alt={s.name} className="absolute inset-0 w-full h-full object-cover zoom-img" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/85 to-brand-navy/40" />
                    <div className="absolute top-4 right-4 text-7xl font-display italic font-black text-orange-400/30">{String(i + 1).padStart(2, '0')}</div>
                    <div className="relative h-full p-7 flex flex-col justify-end">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4 shadow-lg shadow-orange-500/40 group-hover:scale-110 transition"><Icon className="w-7 h-7 text-brand-navy" /></div>
                      <h3 className="font-display italic font-black text-2xl mb-2">{s.name}</h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">{s.short}</p>
                      <span className="inline-flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest">View details <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition" /></span>
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
              <h2 className="font-display italic font-black text-5xl">Service That <span className="text-orange-400">Actually Shows Up.</span></h2>
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4"><Icon className="w-6 h-6 text-brand-navy" /></div>
                  <div className="font-display italic font-black text-xl mb-2">{t}</div>
                  <div className="text-sm text-white/60">{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. EQUIPMENT GALLERY ===== */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="badge mb-4 mx-auto">Equipment Network</div>
              <h2 className="font-display italic font-black text-5xl">Right Equipment. <span className="text-orange-400">Right Lane.</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: IMG.ftlTruck, t: 'Dry Van' },
              { img: IMG.reeferTrailer, t: 'Reefer' },
              { img: IMG.flatbedLoad, t: 'Flatbed' },
              { img: IMG.dedicatedFleet, t: 'Step Deck' },
              { img: IMG.expeditedVan, t: 'Sprinter Van' },
              { img: IMG.ltlPallets, t: 'LTL Pallets' },
              { img: IMG.warehouseLoad, t: 'Power Only' },
              { img: IMG.shippingPort, t: 'Intermodal' }
            ].map((e, i) => (
              <Reveal key={e.t} delay={i * 60}>
                <div className="relative aspect-square rounded-2xl overflow-hidden group border border-white/10 hover:border-orange-400/50 transition">
                  <img src={e.img} alt={e.t} className="w-full h-full object-cover zoom-img" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="font-display italic font-black text-lg">{e.t}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. CTA ===== */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="relative glass-strong neon-border p-12 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-400/20 blur-3xl rounded-full" />
            <div className="relative">
              <h2 className="font-display italic font-black text-5xl mb-4">Need A <span className="text-orange-400">Custom Solution?</span></h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-lg">Tell us about your freight. We&apos;ll build the right plan and quote it in under 30 minutes.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/quote" className="btn-primary !px-9 !py-4">Request a Quote <ArrowRight className="w-5 h-5" /></Link>
                <a href="tel:+18886985556" className="btn-ghost !px-9 !py-4"><Phone className="w-5 h-5" /> Call Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
