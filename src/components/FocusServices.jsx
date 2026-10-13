// Shared building blocks for the four main freight services and the quote inbox link,
// so Home, Services and Shippers always show the same client-approved copy.
import { Link } from 'react-router-dom'
import { ArrowRight, Sprout, Snowflake, Truck, Boxes, Mail } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { focusServices, company } from '../data/site.js'

const iconMap = { Sprout, Snowflake, Truck, Boxes }

// Quote link for a given freight type — the quote form preselects it from the URL.
export const quoteLink = (freightType) => `/quote?freight=${encodeURIComponent(freightType)}`

// Clickable quote email (mailto:quotes@sfamlogistics.com).
export function QuoteEmailLink({ className = '', icon = true }) {
  return (
    <a href={company.quoteEmailHref} className={`inline-flex items-center gap-2 font-semibold text-orange-400 hover:text-orange-300 whitespace-nowrap ${className}`}>
      {icon && <Mail className="w-4 h-4 shrink-0" />}{company.quoteEmail}
    </a>
  )
}

// Four service cards in the approved order: Produce, Refrigerated, Dry Van, Other.
export function FocusServiceGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {focusServices.map((s, i) => {
        const Icon = iconMap[s.icon] || Truck
        return (
          <Reveal key={s.key} delay={i * 80}>
            <Link to={quoteLink(s.freightType)} className="group flex flex-col rounded-2xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-orange-400/50 transition-all hover:-translate-y-1 p-7 text-center h-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mx-auto mb-4 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition">
                <Icon className="w-7 h-7 text-brand-navy" />
              </div>
              <h3 className="font-display italic font-black text-lg mb-2">{s.name}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">{s.text}</p>
              <span className="mt-auto inline-flex items-center justify-center gap-1.5 text-orange-400 text-[10px] font-bold uppercase tracking-widest">Request a Quote <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition" /></span>
            </Link>
          </Reveal>
        )
      })}
    </div>
  )
}
