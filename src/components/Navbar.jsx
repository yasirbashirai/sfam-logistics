import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail, MapPin, Clock, ShieldCheck, ChevronDown, Truck, Boxes, Snowflake, PackageOpen, Route, Zap, ArrowRight, Search } from 'lucide-react'
import { services } from '../data/site.js'

const iconMap = { Truck, Boxes, Snowflake, PackageOpen, Route, Zap }

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services', mega: true },
  { to: '/track', label: 'Track Load' },
  { to: '/carrier-onboarding', label: 'For Carriers' },
  { to: '/agent-opportunities', label: 'For Agents' },
  { to: '/blog', label: 'Insights' },
  { to: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [megaOpen, setMegaOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => { setOpen(false); setMegaOpen(false) }, [loc.pathname])
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* === ANNOUNCEMENT BAR === */}
      <div className="hidden md:block fixed top-0 inset-x-0 z-[60] bg-gradient-to-r from-brand-navy via-brand-navy3 to-brand-navy border-b border-orange-400/20 text-xs">
        <div className="container-x flex items-center justify-between h-10 text-white/70">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-orange-400" /> Bothell, WA</span>
            <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-orange-400" /> Mon–Fri • 8AM–5PM PST</span>
            <span className="flex items-center gap-2 text-orange-300 font-semibold"><ShieldCheck className="w-3 h-3" /> FMCSA Authorized • BMC-84 Bonded • USDOT Licensed</span>
          </div>
          <div className="flex gap-5 items-center">
            <a href="mailto:info@sfamlogistics.com" className="hover:text-orange-300 flex items-center gap-1.5"><Mail className="w-3 h-3" /> info@sfamlogistics.com</a>
            <span className="text-white/20">|</span>
            <a href="tel:+18886985556" className="hover:text-orange-300 font-bold text-orange-400 flex items-center gap-1.5"><Phone className="w-3 h-3" /> 1 (888) 698-5556</a>
            <Link to="/login" className="hover:text-orange-300 text-white/40">Admin</Link>
          </div>
        </div>
      </div>

      {/* === MAIN NAVBAR === */}
      <header className={`fixed md:top-10 top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-brand-navy/95 backdrop-blur-2xl border-b border-orange-400/30 shadow-2xl shadow-black/50' : 'bg-gradient-to-b from-brand-navy/80 to-transparent'}`}>
        <div className="container-x flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-orange-400/40 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <img src="/images/sfam-logo.jpg" alt="SFam Logistics" className="relative h-16 w-16 rounded-xl object-cover ring-2 ring-orange-400/30 group-hover:ring-orange-400 transition duration-300 group-hover:scale-105" />
            </div>
            <div className="leading-none">
              <div className="font-display italic font-black text-2xl text-white tracking-tight">SFam<span className="text-orange-400">.</span></div>
              <div className="text-[9px] text-orange-300 tracking-[0.25em] uppercase font-bold mt-1">Logistics LLC</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {links.map(l => (
              <div key={l.to} className="relative" onMouseEnter={() => l.mega && setMegaOpen(true)} onMouseLeave={() => l.mega && setMegaOpen(false)}>
                <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => `relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition flex items-center gap-1 ${isActive ? 'text-orange-400' : 'text-white/85 hover:text-orange-300'}`}>
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {l.mega && <ChevronDown className="w-3 h-3" />}
                      {isActive && <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-6 h-0.5 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50" />}
                    </>
                  )}
                </NavLink>
                {/* === MEGA MENU === */}
                {l.mega && megaOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[820px] z-50">
                    <div className="bg-brand-navy/98 backdrop-blur-2xl border border-orange-400/30 rounded-2xl shadow-2xl shadow-black/60 p-6 grid grid-cols-3 gap-3">
                      {services.map((s, i) => {
                        const Icon = iconMap[s.icon] || Truck
                        return (
                          <Link key={s.slug} to={`/services/${s.slug}`} className="group flex gap-3 p-3 rounded-xl hover:bg-orange-400/10 transition">
                            <div className="w-11 h-11 shrink-0 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center group-hover:scale-110 group-hover:rotate-3 transition"><Icon className="w-5 h-5 text-brand-navy" /></div>
                            <div>
                              <div className="font-bold text-sm text-white group-hover:text-orange-300 transition">{s.name}</div>
                              <div className="text-[11px] text-white/50 leading-snug mt-0.5">{s.short}</div>
                            </div>
                          </Link>
                        )
                      })}
                      <div className="col-span-3 mt-2 pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-white/50">Need a custom solution?</span>
                        <Link to="/quote" className="text-orange-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all">Get a quote <ArrowRight className="w-3 h-3" /></Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden xl:flex items-center gap-3">
            <Link to="/quote" className="btn-primary !px-7 !py-3 text-sm">Free Quote <ArrowRight className="w-4 h-4" /></Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(o => !o)} className="xl:hidden p-2 text-white">
            {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Scroll progress */}
        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/5">
          <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-150" style={{ width: `${progress}%` }} />
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="xl:hidden border-t border-orange-400/30 bg-brand-navy/98 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
            <div className="container-x py-6 flex flex-col gap-2">
              {links.map(l => (
                <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `px-4 py-3 rounded-xl font-bold uppercase tracking-wider text-sm ${isActive ? 'bg-orange-400/15 text-orange-300 border border-orange-400/30' : 'text-white/80'}`}>{l.label}</NavLink>
              ))}
              <a href="tel:+18886985556" className="flex items-center gap-2 px-4 py-3 text-orange-400 font-bold"><Phone className="w-4 h-4" /> 1 (888) 698-5556</a>
              <Link to="/quote" className="btn-primary mt-3">Get a Free Quote</Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
