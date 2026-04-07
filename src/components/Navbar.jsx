import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Truck } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/carrier-onboarding', label: 'Carriers' },
  { to: '/agent-opportunities', label: 'Agents' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-ink/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="container-x flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition" />
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 grid place-items-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-lg">SFam <span className="gradient-text">Logistics</span></div>
            <div className="text-[10px] text-white/50 tracking-widest uppercase">Bothell, WA</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition ${isActive ? 'text-orange-300 bg-white/[0.06]' : 'text-white/70 hover:text-white hover:bg-white/[0.04]'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+18886985556" className="flex items-center gap-2 text-sm text-white/70 hover:text-orange-300">
            <Phone className="w-4 h-4" /> 1 (888) 698-5556
          </a>
          <Link to="/quote" className="btn-primary !px-5 !py-2.5 text-sm">Get a Quote</Link>
        </div>

        <button onClick={() => setOpen(o => !o)} className="lg:hidden p-2 text-white">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-brand-ink/95 backdrop-blur-xl">
          <div className="container-x py-6 flex flex-col gap-2">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `px-4 py-3 rounded-xl ${isActive ? 'bg-white/10 text-orange-300' : 'text-white/80'}`}>{l.label}</NavLink>
            ))}
            <Link to="/quote" className="btn-primary mt-3">Get a Quote</Link>
          </div>
        </div>
      )}
    </header>
  )
}
