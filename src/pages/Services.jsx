import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Boxes, Snowflake, PackageOpen, Route, Zap } from 'lucide-react'
import { PageHero, Orbs } from '../components/Section.jsx'
import { services } from '../data/site.js'

const iconMap = { Truck, Boxes, Snowflake, PackageOpen, Route, Zap }

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Our Services" title={<>Freight Solutions <span className="gradient-text">For Every Lane</span></>} subtitle="From a single LTL pallet to dedicated weekly truckload capacity, we coordinate it all — backed by vetted carriers and 24/7 communication." />

      <section className="section">
        <Orbs />
        <div className="container-x relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => {
              const Icon = iconMap[s.icon] || Truck
              return (
                <Link to={`/services/${s.slug}`} key={s.slug} className="group glass p-7 hover:border-orange-400/50 hover:-translate-y-1 transition relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-purple-600/0 rounded-full blur-2xl group-hover:from-orange-500/40 transition" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 grid place-items-center mb-5 group-hover:scale-110 transition"><Icon className="w-7 h-7" /></div>
                    <h3 className="font-display font-bold text-xl mb-2">{s.name}</h3>
                    <p className="text-white/60 text-sm mb-5">{s.short}</p>
                    <span className="inline-flex items-center gap-2 text-orange-300 text-sm font-semibold">View details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" /></span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
