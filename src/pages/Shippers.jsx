import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MapPinned } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { FocusServiceGrid } from '../components/FocusServices.jsx'
import { company } from '../data/site.js'
import IMG from '../data/images.js'
import { breadcrumbLd } from '../data/seo.js'

const shippersJsonLd = [
  breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Shippers', path: '/shippers' }]),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://sfamlogistics.com/shippers',
    name: 'Freight Solutions for Shippers',
    description: 'We help shippers move produce, refrigerated, and dry van freight in the Pacific Northwest and nationwide.',
    url: 'https://sfamlogistics.com/shippers',
    isPartOf: { '@id': 'https://sfamlogistics.com/#website' },
    about: { '@id': 'https://sfamlogistics.com/#organization' }
  }
]

export default function Shippers() {
  return (
    <>
      <PageMeta
        title="Freight Solutions for Shippers — Produce, Reefer & Dry Van"
        description="We help shippers move produce, refrigerated, and dry van freight in the Pacific Northwest and nationwide. Request a spot quote or ask about recurring loads."
        keywords="freight broker for shippers, produce shipping, refrigerated shipping, dry van shipping, Pacific Northwest freight, spot quote, recurring freight, Washington freight broker"
        path="/shippers"
        jsonLd={shippersJsonLd}
      />
      <PageHero eyebrow="For Shippers" title={<>Freight Solutions <span className="text-orange-400">for Shippers</span></>} subtitle="We help shippers move produce, refrigerated, and dry van freight in the Pacific Northwest and nationwide." image={IMG.heroHighway}>
        <Link to="/quote" className="btn-primary">Request a Quote <ArrowRight className="w-4 h-4" /></Link>
        <a href={company.quoteEmailHref} className="btn-ghost"><Mail className="w-4 h-4" /> Email a Quote Request</a>
      </PageHero>

      {/* ===== 1. MAIN SERVICES ===== */}
      <section className="section">
        <Orbs />
        <div className="container-x relative">
          <FocusServiceGrid />
        </div>
      </section>

      {/* ===== 2. QUOTE REQUEST ===== */}
      <section className="section pt-0">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div className="glass-strong neon-border p-8 sm:p-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mx-auto mb-5"><MapPinned className="w-7 h-7 text-white" /></div>
              <h2 className="font-display italic font-black text-3xl mb-4">Spot Quotes &amp; <span className="text-orange-400">Recurring Loads</span></h2>
              <p className="text-white/75 max-w-2xl mx-auto mb-7">Need a spot quote or help with recurring loads? Send us your pickup and delivery locations, shipping date, product, weight, and equipment needs.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/quote" className="btn-primary">Request a Quote <ArrowRight className="w-4 h-4" /></Link>
                <a href={company.quoteEmailHref} className="btn-ghost"><Mail className="w-4 h-4" /> Email a Quote Request</a>
              </div>
              <p className="mt-5 text-sm text-white/60">Email: <a href={company.quoteEmailHref} className="font-semibold text-orange-400 hover:text-orange-300 whitespace-nowrap">{company.quoteEmail}</a></p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
