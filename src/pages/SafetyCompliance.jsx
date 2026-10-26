import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, UserCheck, PhoneOff, ShieldAlert, PackageCheck, Thermometer, Satellite, ClipboardList, Handshake } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import Slogan from '../components/Slogan'
import IMG from '../data/images.js'
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
  { i: UserCheck, t: 'Experienced Drivers', d: 'SFam Logistics requires a minimum of two years of commercial driving experience for drivers assigned to shipments arranged through our brokerage.' },
  { i: PhoneOff, t: 'No Calls While Driving', d: 'Driver safety comes first. We do not expect drivers to answer calls, respond to messages, or provide updates while operating a commercial vehicle. Communication should take place when the driver is safely parked.' },
  { i: ShieldAlert, t: 'Freight Fraud Prevention', d: 'We take measures to verify carrier identities, prevent unauthorized load transfers, and identify potential double-brokering activity.' },
  { i: PackageCheck, t: 'Cargo Protection', d: 'We review carrier insurance requirements and communicate shipment-specific handling instructions to help protect customer freight.' },
  { i: Thermometer, t: 'Refrigerated Freight Management', d: 'For temperature-sensitive shipments, we communicate required temperature settings, equipment expectations, and handling instructions to participating carriers.' },
  { i: Satellite, t: 'ELD-Based Shipment Tracking', d: 'Where supported and authorized by the carrier, SFam Logistics uses ELD-connected tracking or other approved tracking methods to monitor shipment progress, improve visibility, and identify potential delays. Tracking is used for freight coordination and does not replace the carrier’s responsibility for driver safety or hours-of-service compliance.' },
  { i: ClipboardList, t: 'Incident Reporting', d: 'We expect prompt reporting of accidents, cargo damage, theft, temperature deviations, and other shipment-related incidents so appropriate action can be taken.' }
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
      <PageHero eyebrow="Safety & Compliance" title={<>Safety &amp; <span className="text-orange-400">Compliance</span></>} subtitle="Safety, accountability, and responsible freight management in every shipment." image={IMG.highwayMountains}>
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

      {/* ===== 2. EIGHT SAFETY STANDARDS ===== */}
      <section id="standards" className="section scroll-mt-40">
        <Orbs />
        <div className="container-x relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="badge mb-3 mx-auto">Our Safety Standards</div>
              <h2 className="font-display italic font-black text-3xl sm:text-4xl">Our Safety <span className="text-orange-400">Standards</span></h2>
              <div className="divider-glow w-24 mx-auto mt-4" />
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {standards.map(({ i: Icon, t, d }, idx) => (
              <Reveal key={t} delay={(idx % 4) * 80}>
                <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full hover:border-orange-400/40 transition">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4"><Icon className="w-5 h-5 text-white" /></div>
                  <h3 className="font-display italic font-black text-lg mb-2 text-white">{t}</h3>
                  <p className="text-white/75 leading-relaxed text-[15px]">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. OUR COMMITMENT ===== */}
      <section className="section-white">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="bg-white/[0.05] border border-orange-400/30 rounded-2xl p-8 sm:p-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mx-auto mb-5"><Handshake className="w-7 h-7 text-white" /></div>
              <h2 className="font-display italic font-black text-3xl mb-4 text-white">Our <span className="text-orange-500">Commitment</span></h2>
              <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-5 text-base sm:text-lg">At SFam Logistics, safety is a shared responsibility. We are committed to working with shippers and carriers who value professionalism, accountability, and responsible transportation practices.</p>
              <div className="flex flex-wrap items-baseline justify-center gap-x-2 text-lg sm:text-xl mb-7">
                <span className="font-display italic font-black text-white">SFam -</span>
                <Slogan />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/quote" className="btn-primary">Request a Quote <ArrowRight className="w-4 h-4" /></Link>
                <Link to="/carrier-onboarding" className="btn-ghost">Become a Carrier Partner</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
