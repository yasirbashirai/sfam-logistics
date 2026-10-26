import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react'
import { useState } from 'react'
import { company, termsPdf } from '../data/site.js'
import { quoteLink } from './FocusServices.jsx'

// X (formerly Twitter) logo. lucide-react only ships the old bird icon.
const XLogo = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// Footer service list: the three main services first, then the other freight options.
const footerServices = [
  ['Produce Freight', quoteLink('Produce')],
  ['Refrigerated (Reefer)', '/services/reefer'],
  ['Dry Van', quoteLink('Dry Van')],
  ['Full Truckload (FTL)', '/services/full-truckload'],
  ['Flatbed', '/services/flatbed'],
  ['Expedited', '/services/expedited']
]
import { useSubmissions } from '../context/SubmissionsContext.jsx'
import Slogan from './Slogan'

export default function Footer() {
  const { add } = useSubmissions()
  const [email, setEmail] = useState('')
  const [subbed, setSubbed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const subscribe = async (e) => {
    e.preventDefault()
    if (!email || submitting) return
    setSubmitting(true)
    setError('')
    try {
      // fallback:false so we only confirm once the server has actually saved the email
      const row = await add('subscribers', { email, source: typeof window !== 'undefined' ? window.location.pathname : '/' }, { fallback: false })
      if (!row) {
        setError('We couldn\'t save your email right now. Please try again in a minute.')
        return
      }
      // Belt-and-braces: also fire the dedicated confirmation endpoint
      // (the POST handler also queues a welcome email, this is a no-op fallback)
      try {
        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: email, type: 'subscribe' })
        })
      } catch {}
      setSubbed(true)
      setEmail('')
    } finally {
      setSubmitting(false)
    }
  }

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
            <p className="text-white/60 mt-2 text-sm">Industry tips, rate trends, and SFam updates. No spam, ever.</p>
          </div>
          <form onSubmit={subscribe} className="flex gap-3">
            <input value={email} onChange={e => setEmail(e.target.value)} className="input flex-1" placeholder="your@email.com" type="email" required disabled={subbed} />
            <button type="submit" disabled={submitting || subbed} className="btn-primary !px-6 disabled:opacity-70">
              {subbed ? '✓ Subscribed' : submitting ? 'Submitting...' : <>Subscribe <Send className="w-4 h-4" /></>}
            </button>
          </form>
          {error && <p className="lg:col-start-2 -mt-4 text-sm text-red-300" role="alert">{error}</p>}
        </div>
      </div>

      <div className="container-x relative pt-16 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src="/images/sfam-logo.jpg" alt="SFam Logistics" className="w-14 h-14 rounded-xl ring-2 ring-orange-400/40" />
            </Link>
            {/* Company slogan + service focus, shown on every page */}
            <Slogan className="text-base mb-2" />
            <p className="text-white/70 text-sm leading-relaxed mb-3">{company.serviceText}</p>
            <p className="text-white/50 text-xs leading-relaxed italic">&ldquo;{company.tagline}&rdquo;</p>
            <div className="flex gap-3 mt-5">
              <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-orange-400 hover:border-orange-400 hover:text-brand-navy transition" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href={company.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-orange-400 hover:border-orange-400 hover:text-brand-navy transition" aria-label="X"><XLogo className="w-3.5 h-3.5" /></a>
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-orange-400 hover:border-orange-400 hover:text-brand-navy transition" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
              <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-orange-400 hover:border-orange-400 hover:text-brand-navy transition" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="label mb-5">Company</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              {[['/about', 'About Us'], ['/services', 'Logistics Services'], ['/safety-compliance', 'Safety & Compliance'], ['/shippers', 'Shippers'], ['/carrier-onboarding', 'Become a Carrier Partner'], ['/quote', 'Request a Quote'], ['/track', 'Track Shipment'], ['/blog', 'Blog & Insights'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}><Link to={to} className="hover:text-orange-300 inline-flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-orange-400" /> {label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label mb-5">Our Services</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              {footerServices.map(([label, to]) => (
                <li key={label}><Link to={to} className="hover:text-orange-300 inline-flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-orange-400" /> {label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label mb-5">Get In Touch</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><span>22722 29th Drive SE, Suite 100,<br />Bothell, WA 98021</span></li>
              <li className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><span>10220 3rd Avenue SE,<br />Everett, WA 98208</span></li>
              <li className="flex gap-3"><Phone className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><a href={company.phoneHref} className="hover:text-orange-300 font-semibold">{company.phone}</a></li>
              <li className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><a href={`mailto:${company.email}`} className="hover:text-orange-300">{company.email}</a></li>
              <li className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" /><span>Request a quote:<br /><a href={company.quoteEmailHref} className="text-orange-400 hover:text-orange-300 font-semibold whitespace-nowrap">{company.quoteEmail}</a></span></li>
              <li className="text-white/40 text-xs mt-2 pt-2 border-t border-white/5">{company.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} SFam Logistics LLC. All rights reserved. FMCSA Authorized Property Broker. MC 1810116 • USDOT 4555943</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            <Link to="/privacy" className="hover:text-orange-300">Privacy Policy</Link>
            <a href={termsPdf} target="_blank" rel="noopener noreferrer" className="hover:text-orange-300">Terms and Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
