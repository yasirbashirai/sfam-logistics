// Single minimal marquee line — clean, professional, one row
import { ShieldCheck, FileCheck, Award, Clock, Truck, Star, Globe, DollarSign, Heart, Gauge } from 'lucide-react'

const items = [
  { i: ShieldCheck, t: 'FMCSA Licensed' },
  { i: FileCheck, t: 'BMC-84 Bonded' },
  { i: Award, t: 'Cargo Insured' },
  { i: Clock, t: '24/7 Dispatch' },
  { i: Truck, t: 'Driver Built' },
  { i: DollarSign, t: 'Same-Day Pay' },
  { i: Star, t: '4.9★ Rated' },
  { i: Globe, t: '48 States' },
  { i: Gauge, t: '98% On-Time' },
  { i: Heart, t: '10+ Years on the Road' }
]

export default function CreativeMarquee() {
  return (
    <section className="relative py-6 bg-brand-navy2 border-y border-orange-400/20 overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-brand-navy2 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-brand-navy2 to-transparent z-10 pointer-events-none" />
      <div className="flex marquee whitespace-nowrap gap-12">
        {[...Array(3)].map((_, dup) => (
          <div key={dup} className="flex gap-12 shrink-0 items-center">
            {items.map((it, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                <it.i className="w-4 h-4 text-orange-400" />
                <span className="text-xs sm:text-sm font-bold text-white/70 uppercase tracking-[0.2em]">{it.t}</span>
                <span className="w-1 h-1 rounded-full bg-orange-400/60" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
