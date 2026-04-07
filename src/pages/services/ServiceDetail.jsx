import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Truck, Boxes, Snowflake, PackageOpen, Route, Zap, ArrowLeft } from 'lucide-react'
import { PageHero, Orbs } from '../../components/Section.jsx'
import { services } from '../../data/site.js'

const iconMap = { Truck, Boxes, Snowflake, PackageOpen, Route, Zap }

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find(s => s.slug === slug)
  if (!service) return <Navigate to="/services" replace />
  const Icon = iconMap[service.icon] || Truck

  const features = [
    'Dedicated point of contact from quote to POD',
    'Vetted carriers with current insurance and authority',
    'Real-time load tracking and proactive updates',
    'Competitive market-based pricing',
    'Dedicated claims and detention support',
    '24/7 dispatch coverage for after-hours needs'
  ]

  return (
    <>
      <PageHero eyebrow="Service" title={service.name} subtitle={service.short}>
        <Link to="/quote" className="btn-primary">Request a Quote <ArrowRight className="w-5 h-5" /></Link>
        <Link to="/services" className="btn-ghost"><ArrowLeft className="w-4 h-4" /> All Services</Link>
      </PageHero>

      <section className="section">
        <Orbs />
        <div className="container-x relative grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 glass-strong p-8 lg:p-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 grid place-items-center mb-6"><Icon className="w-8 h-8" /></div>
            <h2 className="font-display font-bold text-3xl mb-5">About {service.name}</h2>
            <p className="text-white/70 leading-relaxed mb-8">{service.long}</p>
            <h3 className="font-display font-bold text-xl mb-4">What&apos;s Included</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {features.map(f => (
                <li key={f} className="flex gap-3 text-sm text-white/70"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> {f}</li>
              ))}
            </ul>
          </div>

          <aside className="glass p-7 h-fit sticky top-28">
            <h3 className="font-display font-bold text-xl mb-4">Get a Quote</h3>
            <p className="text-white/60 text-sm mb-5">Most quotes returned within 30 minutes during business hours.</p>
            <Link to="/quote" className="btn-primary w-full">Start Quote</Link>
            <div className="mt-6 pt-6 border-t border-white/10 text-sm text-white/60 space-y-2">
              <div>📞 1 (888) 698-5556</div>
              <div>✉️ info@sfamlogistics.com</div>
              <div className="text-xs text-white/40 mt-3">Mon–Fri • 8AM–5PM PST</div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="container-x">
          <div className="text-center mb-10">
            <div className="label mb-3">Other Services</div>
            <h2 className="font-display font-bold text-3xl">Explore More</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.filter(s => s.slug !== slug).slice(0,3).map(s => {
              const I = iconMap[s.icon] || Truck
              return (
                <Link key={s.slug} to={`/services/${s.slug}`} className="group glass p-6 hover:border-orange-400/50 transition">
                  <I className="w-8 h-8 text-orange-400 mb-3" />
                  <div className="font-semibold mb-1">{s.name}</div>
                  <div className="text-xs text-white/50">{s.short}</div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
