import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ShieldCheck, UserRound, PhoneOff, ShieldAlert, Package, Thermometer, MapPin, ClipboardList, Handshake, AlertTriangle } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import Slogan from '../components/Slogan'
import IMG from '../data/images.js'
import { company } from '../data/site.js'
import { breadcrumbLd } from '../data/seo.js'

const DESCRIPTION = 'Learn how SFam Logistics approaches carrier verification, ELD-based tracking, driver safety, freight fraud prevention, cargo protection, and responsible freight brokerage operations.'

const safetyJsonLd = [
  breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Safety & Compliance', path: '/safety-compliance' }]),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://sfamlogistics.com/safety-compliance',
    name: 'Safety & Compliance',
    description: DESCRIPTION,
    url: 'https://sfamlogistics.com/safety-compliance',
    isPartOf: { '@id': 'https://sfamlogistics.com/#website' },
    about: { '@id': 'https://sfamlogistics.com/#organization' }
  }
]

// The eight safety standards, wording exactly as provided by the client.
const standards = [
  { i: ShieldCheck, t: 'Carrier Verification', d: 'We review carrier operating authority, insurance information, and available safety records as part of our carrier onboarding and selection process.' },
  { i: UserRound, t: 'Experienced Drivers', d: 'SFam Logistics requires a minimum of two years of commercial driving experience for drivers assigned to shipments arranged through our brokerage.' },
  { i: PhoneOff, t: 'No Calls While Driving', d: 'Driver safety comes first. We do not expect drivers to answer calls, respond to messages, or provide updates while operating a commercial vehicle. Communication should take place when the driver is safely parked.' },
  { i: ShieldAlert, t: 'Freight Fraud Prevention', d: 'We take measures to verify carrier identities, prevent unauthorized load transfers, and identify potential double-brokering activity.' },
  { i: Package, t: 'Cargo Protection', d: 'We review carrier insurance requirements and communicate shipment-specific handling instructions to help protect customer freight.' },
  { i: Thermometer, t: 'Refrigerated Freight Management', d: 'For temperature-sensitive shipments, we communicate required temperature settings, equipment expectations, and handling instructions to participating carriers.' },
  { i: MapPin, t: 'ELD-Based Shipment Tracking', d: 'Where supported and authorized by the carrier, SFam Logistics uses ELD-connected tracking or other approved tracking methods to monitor shipment progress, improve visibility, and identify potential delays. Tracking is used for freight coordination and does not replace the carrier’s responsibility for driver safety or hours-of-service compliance.' },
  { i: AlertTriangle, t: 'Incident Reporting', d: 'We expect prompt reporting of accidents, cargo damage, theft, temperature deviations, and other shipment-related incidents so appropriate action can be taken.' }
]

export default function SafetyCompliance() {
  return (
    <>
      <PageMeta
        title="Safety & Compliance"
        fullTitle="Safety & Compliance | SFam Logistics"
        description={DESCRIPTION}
        keywords="freight broker safety, carrier verification, freight fraud prevention, double brokering prevention, ELD tracking, cargo protection, refrigerated freight, driver safety, FMCSA broker compliance, SFam Logistics"
        path="/safety-compliance"
        jsonLd={safetyJsonLd}
      />
      <PageHero eyebrow="Safety & Compliance" title={<>Safety &amp; <span className="text-orange-400">Compliance</span></>} subtitle="Responsible freight management, from carrier selection through delivery." image={IMG.highwayMountains}>
        <a href="#standards" className="btn-primary">Our Safety Standards <ArrowRight className="w-4 h-4" /></a>
      </PageHero>

      {/* ===== 1. INTRO ===== */}
      <section className="section-light">
        <div className="container-x relative max-w-4xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/30 text-white text-xs font-bold uppercase tracking-[0.15em] mb-4">Safety &amp; Compliance</div>
            <h2 className="font-display italic font-black text-3xl mb-4 text-white">Safety Is Part of <span className="text-orange-500">Every Shipment</span></h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-orange-400 to-transparent mb-5" />
            <div className="space-y-4 text-white/80 leading-relaxed text-base sm:text-lg">
              <p className="text-white/90 font-medium">At SFam Logistics, safety, accountability, and responsible freight management are essential to how we operate.</p>
              <p>We believe reliable transportation begins with properly vetted carriers, clear communication, and respect for the professional drivers who keep freight moving.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 2. EIGHT SAFETY STANDARDS =====
          Light band + 2-column white cards with line icons, matched to the client's ChatGPT mock. */}
      <section id="standards" className="py-14 sm:py-20 bg-[#f4f3ef] text-brand-navy scroll-mt-40">
        <div className="container-x max-w-6xl">
          <Reveal>
            <div className="mb-10 sm:mb-12">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a5a1c] mb-3">Our Safety Standards</div>
              <h2 className="font-display font-black text-3xl sm:text-5xl leading-tight text-brand-navy">Practical standards.<br />Shared responsibility.</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {standards.map(({ i: Icon, t, d }, idx) => (
              <Reveal key={t} delay={(idx % 2) * 80}>
                <article className="bg-white border border-black/10 p-7 sm:p-8 h-full transition hover:border-[#8a5a1c]/40 hover:shadow-lg">
                  <Icon className="w-8 h-8 text-[#8a5a1c] mb-6" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="font-sans not-italic font-bold text-xl sm:text-2xl tracking-normal mb-4 text-brand-navy">{t}</h3>
                  <p className="text-slate-700 leading-[1.8] text-base">{d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. OUR COMMITMENT + REPORT A CONCERN (two-column, per client's ChatGPT mock) ===== */}
      <section className="section-white">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Left: commitment statement + slogan */}
            <Reveal>
              <div className="bg-white/[0.05] border border-orange-400/30 rounded-2xl p-8 sm:p-10 h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-5"><Handshake className="w-7 h-7 text-white" /></div>
                <div className="badge mb-3">Our Commitment</div>
                <h2 className="font-display italic font-black text-3xl mb-4 text-white">Safety is a <span className="text-orange-500">shared responsibility.</span></h2>
                <p className="text-white/80 leading-relaxed mb-6 text-base sm:text-lg">At SFam Logistics, safety is a shared responsibility. We are committed to working with shippers and carriers who value professionalism, accountability, and responsible transportation practices.</p>
                <div className="flex flex-wrap items-baseline gap-x-2 text-lg sm:text-xl mb-7">
                  <span className="font-display italic font-black text-white">SFam -</span>
                  <Slogan />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/quote" className="btn-primary">Request a Quote <ArrowRight className="w-4 h-4" /></Link>
                  <Link to="/carrier-onboarding" className="btn-ghost">Become a Carrier Partner</Link>
                </div>
              </div>
            </Reveal>

            {/* Right: report a safety concern (routes to the Contact form, which saves to the admin dashboard) */}
            <Reveal delay={120}>
              <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-8 sm:p-10 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-orange-400/40 grid place-items-center mb-5"><AlertTriangle className="w-7 h-7 text-orange-400" /></div>
                <h3 className="font-display italic font-black text-2xl mb-4 text-white">Report a safety concern</h3>
                <p className="text-white/80 leading-relaxed mb-4 text-base sm:text-lg">Use our contact form to report incidents, service concerns or suspected misconduct. Please include the load number, date, location and a short description of what happened.</p>
                <p className="text-white/70 leading-relaxed mb-7 text-[15px]"><strong className="text-white">Immediate danger or emergency?</strong> Call 911 or your local emergency service first. Drivers, please park safely before contacting us.</p>
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <Link to="/contact" className="btn-primary">Report a Concern <ArrowUpRight className="w-4 h-4" /></Link>
                  <a href={company.phoneHref} className="btn-ghost">Call {company.phone}</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
