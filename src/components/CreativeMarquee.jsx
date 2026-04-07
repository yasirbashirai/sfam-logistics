// 3-row 3D marquee with depth, gradient masks, and orange accent dots
import { ShieldCheck, Award, Zap, Truck, Clock, DollarSign, Star, Globe, Phone, FileCheck, Gauge, Heart } from 'lucide-react'

const items = [
  { i: ShieldCheck, t: 'FMCSA Licensed' },
  { i: FileCheck, t: 'BMC-84 Bonded' },
  { i: Award, t: 'Cargo Insured' },
  { i: Zap, t: '24/7 Dispatch' },
  { i: Truck, t: 'Driver Built' },
  { i: DollarSign, t: 'Same-Day Pay' },
  { i: Star, t: '4.9★ Rated' },
  { i: Globe, t: '48 States' },
  { i: Clock, t: '10+ Years' },
  { i: Heart, t: 'Driver First' },
  { i: Gauge, t: '98% On-Time' },
  { i: Phone, t: 'Real Humans' }
]

const Row = ({ reverse, speed }) => (
  <div className={`flex gap-6 ${reverse ? 'marquee-reverse' : 'marquee'} ${speed === 'fast' ? 'marquee-fast' : ''} whitespace-nowrap`}>
    {[...Array(3)].map((_, dup) => (
      <div key={dup} className="flex gap-6 shrink-0">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-orange-400/50 transition group shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center group-hover:rotate-12 transition shadow-lg shadow-orange-500/30">
              <it.i className="w-4 h-4 text-brand-navy" />
            </div>
            <span className="font-bold text-white/85 uppercase text-xs tracking-[0.15em]">{it.t}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_#f5a623]" />
          </div>
        ))}
      </div>
    ))}
  </div>
)

export default function CreativeMarquee() {
  return (
    <section className="relative py-12 bg-brand-navy2 border-y border-orange-400/20 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-30" />
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-brand-navy2 to-transparent z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-brand-navy2 to-transparent z-10" />
      <div className="space-y-4 marquee-3d">
        <div className="marquee-3d-track"><Row /></div>
        <div className="marquee-3d-track"><Row reverse /></div>
        <div className="marquee-3d-track"><Row speed="fast" /></div>
      </div>
    </section>
  )
}
