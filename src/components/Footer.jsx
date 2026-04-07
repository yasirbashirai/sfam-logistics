import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Truck } from 'lucide-react'
import { company, services } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-brand-ink to-black overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-orange-500/20 via-pink-500/10 to-purple-600/20 blur-3xl rounded-full" />
      <div className="container-x relative pt-20 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 grid place-items-center">
                <Truck className="w-6 h-6" />
              </div>
              <div className="font-display font-bold text-xl">SFam <span className="gradient-text">Logistics</span></div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{company.tagline}</p>
            <div className="flex gap-3 mt-5">
              <a href={company.social.facebook} className="w-10 h-10 grid place-items-center rounded-full bg-white/5 hover:bg-orange-500 transition" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href={company.social.twitter} className="w-10 h-10 grid place-items-center rounded-full bg-white/5 hover:bg-orange-500 transition" aria-label="X"><Twitter className="w-4 h-4" /></a>
              <a href={company.social.instagram} className="w-10 h-10 grid place-items-center rounded-full bg-white/5 hover:bg-orange-500 transition" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="label mb-4">Company</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link to="/about" className="hover:text-orange-300">About Us</Link></li>
              <li><Link to="/services" className="hover:text-orange-300">Services</Link></li>
              <li><Link to="/blog" className="hover:text-orange-300">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-orange-300">Contact</Link></li>
              <li><Link to="/login" className="hover:text-orange-300">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="label mb-4">Services</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              {services.slice(0,6).map(s => (
                <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-orange-300">{s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><span>{company.address}</span></li>
              <li className="flex gap-3"><Phone className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><a href={company.phoneHref} className="hover:text-orange-300">{company.phone}</a></li>
              <li className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><a href={`mailto:${company.email}`} className="hover:text-orange-300">{company.email}</a></li>
              <li className="text-white/50 text-xs mt-2">{company.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} SFam Logistics LLC. All rights reserved. MC / DOT authorized freight broker.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-orange-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-orange-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
