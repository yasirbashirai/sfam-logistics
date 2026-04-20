import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react'
import { useState } from 'react'
import { company, services } from '../data/site.js'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subbed, setSubbed] = useState(false)

  return (
    <footer className="relative border-t border-orange-400/20 bg-gradient-to-b from-brand-navy to-black overflow-hidden">
      {/* Animated road line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-400/10 blur-3xl rounded-full" />

      {/* Newsletter strip */}
      <div className="relative border-b border-white/10">
        <div className="container-x py-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="label mb-2">Stay Informed</div>
            <h3 className="font-display font-bold text-3xl">Freight insights, straight to your inbox.</h3>
            <p className="text-white/60 mt-2 text-sm">Industry tips, rate trends, and SFam updates. No spam — ever.</p>
          </div>
          <form onSubmit={e => { e.preventDefault(); setSubbed(true); setEmail('') }} className="flex gap-3">
            <input value={email} onChange={e => setEmail(e.target.value)} className="input flex-1" placeholder="your@email.com" type="email" required />
            <button className="btn-primary !px-6">{subbed ? '✓ Subscribed' : <>Subscribe <Send className="w-4 h-4" /></>}</button>
          </form>
        </div>
      </div>

      <div className="container-x relative pt-16 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src="/images/sfam-logo.jpg" alt="SFam Logistics" className="w-14 h-14 rounded-xl ring-2 ring-orange-400/40" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed italic">&ldquo;{company.tagline}&rdquo;</p>
            <div className="flex gap-3 mt-5">
              <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-orange-400 hover:border-orange-400 hover:text-brand-navy transition" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href={company.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-orange-400 hover:border-orange-400 hover:text-brand-navy transition" aria-label="X"><Twitter className="w-4 h-4" /></a>
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-orange-400 hover:border-orange-400 hover:text-brand-navy transition" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="label mb-5">Company</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              {[['/about', 'About Us'], ['/services', 'Logistics Services'], ['/track', 'Track Shipment'], ['/blog', 'Blog & Insights'], ['/contact', 'Contact'], ['/login', 'Admin Login']].map(([to, label]) => (
                <li key={to}><Link to={to} className="hover:text-orange-300 inline-flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-orange-400" /> {label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label mb-5">Our Services</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              {services.slice(0,6).map(s => (
                <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-orange-300 inline-flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-orange-400" /> {s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label mb-5">Get In Touch</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><span>19125 North Creek Parkway Suite 120,<br />Bothell, WA 98011</span></li>
              <li className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><span>10220 3rd Avenue SE,<br />Everett, WA 98208</span></li>
              <li className="flex gap-3"><Phone className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><a href={company.phoneHref} className="hover:text-orange-300 font-semibold">{company.phone}</a></li>
              <li className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><a href={`mailto:${company.email}`} className="hover:text-orange-300">{company.email}</a></li>
              <li className="text-white/40 text-xs mt-2 pt-2 border-t border-white/5">{company.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} SFam Logistics LLC. All rights reserved. FMCSA Authorized Property Broker. MC 1810116 • USDOT 4555943</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-orange-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-orange-300">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
