import { Link } from 'react-router-dom'
import { ArrowRight, Truck, ShieldCheck, Award, TrendingUp, CheckCircle2, Phone, MapPinned } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { company } from '../data/site.js'
import { organizationLd, websiteLd, faqLd, breadcrumbLd } from '../data/seo.js'
import Reveal from '../components/Reveal.jsx'
import GoogleReviews from '../components/GoogleReviews.jsx'
import { FocusServiceGrid, QuoteEmailLink } from '../components/FocusServices.jsx'
import Slogan from '../components/Slogan'

const homeFaqs = [
  { q: 'What is SFam Logistics?', a: 'SFam Logistics LLC is an FMCSA-authorized freight brokerage headquartered in Bothell, Washington. We specialize in produce, refrigerated, and dry van freight, with a Pacific Northwest focus and nationwide shipping support.' },
  { q: 'How fast will I get a freight quote?', a: 'During business hours (Monday–Friday, 7AM–5PM PT) most quotes are returned within 30 minutes. Quotes submitted after hours are returned first thing the next business day. For urgent loads call 1 (888) 698-5556.' },
  { q: 'What is your MC number and USDOT number?', a: 'Our FMCSA Motor Carrier number is MC 1810116 and our USDOT number is 4555943. We are a fully licensed property broker with BMC-84 bond coverage.' },
  { q: 'Do you offer quick pay for carriers?', a: 'Yes. Quick pay is available on every load through our factoring partner OTR Solutions. The fee is shown on your rate confirmation. Standard pay is Net-30 from receipt of POD and invoice.' },
  { q: 'What areas do you cover?', a: 'Our main focus is the Pacific Northwest. We help move freight into, out of, and within the Pacific Northwest, and we also work with shippers on nationwide shipments.' },
  { q: 'Where are you located?', a: 'Our headquarters is at 22722 29th Drive SE, Suite 100, Bothell, WA 98021. We also operate from 10220 3rd Avenue SE, Everett, WA 98208.' }
]

const homeJsonLd = [
  organizationLd,
  websiteLd,
  faqLd(homeFaqs),
  breadcrumbLd([{ name: 'Home', path: '/' }])
]

export default function Home() {
  return (
    <>
      <PageMeta
        fullTitle="Pacific Northwest Freight Brokerage | SFam Logistics"
        description="Produce, refrigerated, and dry van freight brokerage with a Pacific Northwest focus and nationwide support. Request a spot quote."
        keywords="Pacific Northwest freight broker, PNW freight brokerage, produce freight broker, refrigerated freight broker, reefer broker, dry van freight broker, spot quote, freight quote, Washington freight broker, Bothell WA freight broker, Seattle freight broker, nationwide freight shipping, FMCSA broker, MC 1810116, USDOT 4555943"
        path="/"
        image="/images/hero-home.jpg"
        type="website"
        jsonLd={homeJsonLd}
      />

      {/* ============ 1. HERO: CENTERED TAGLINE + DUAL BUTTONS ============ */}
      {/* Height = visible viewport below the fixed header + marquee, so the text sits centered in the photo */}
      <section className="relative min-h-[70vh] md:min-h-[calc(100vh-13rem)] flex items-center py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-home.jpg" alt="SFam Logistics, freight on the open road" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/55 via-brand-navy/40 to-brand-navy/75 sm:from-brand-navy/65 sm:via-brand-navy/50 sm:to-brand-navy/80" />
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-transparent" />

        <div className="container-x relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6 justify-center">
              <div className="h-px w-10 bg-orange-400" />
              <span className="text-xs uppercase tracking-[0.25em] text-white font-bold">Pacific Northwest Freight Brokerage</span>
              <div className="h-px w-10 bg-orange-400" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            {/* One straight line on tablet/desktop, large like the original live headline */}
            <h1 className="font-display italic font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight mx-auto md:whitespace-nowrap">
              <span className="text-white">Your Freight.</span>{' '}
              <span className="text-orange-400">Our Focus.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <div className="divider-glow w-24 mx-auto my-6" />
            <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">Specializing in produce, refrigerated, and dry van freight, with a Pacific Northwest focus and nationwide shipping support.</p>
          </Reveal>
          <Reveal delay={300}>
            {/* Company slogan, kept separate from the headline */}
            <Slogan className="mt-5 text-lg sm:text-xl tracking-wide" />
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
              <Link to="/quote" className="btn-primary whitespace-nowrap w-full max-w-[18rem] sm:w-auto">Request a Quote <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/carrier-onboarding" className="btn-ghost whitespace-nowrap w-full max-w-[18rem] sm:w-auto">Become a Carrier Partner <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 2. WHO WE ARE: text left, tagline text right ============ */}
      <section className="section-light">
        <div className="container-x grid lg:grid-cols-2 gap-10 lg:items-stretch">
          <Reveal className="h-full">
            <div className="text-center lg:text-left flex flex-col h-full">
              <div className="self-center lg:self-start inline-flex items-center gap-2 pl-3.5 pr-2.5 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-[0.1em] mb-4">Who We Are</div>
              <h2 className="font-display italic font-black text-3xl lg:text-4xl mb-3">A driver-founded <span className="text-orange-400">freight broker.</span></h2>
              <Slogan className="text-lg mb-4" />
              <div className="h-0.5 w-24 bg-gradient-to-r from-orange-400 to-transparent mb-4 mx-auto lg:mx-0" />
              <p className="text-white/80 leading-relaxed mb-4">SFam Logistics LLC is a Washington-based freight brokerage built on a decade of real road experience. We focus on produce, refrigerated, and dry van freight in the Pacific Northwest, with nationwide shipping support, and the kind of clarity, fairness, and follow-through that the industry too often forgets.</p>
              <p className="text-white/80 leading-relaxed mb-6">We are not a faceless broker. SFam was founded by a driver who knows both sides of every load, and the agents and partners who join us share one belief: <span className="text-orange-400 font-semibold">freight moves on trust.</span></p>
              <div className="flex flex-row gap-3 mt-auto justify-center lg:justify-start w-full">
                <Link to="/about" className="btn-ghost !px-4 sm:!px-5 flex-1 min-w-0 max-w-44 sm:flex-none sm:w-44">Our Story <ArrowRight className="w-4 h-4" /></Link>
                <Link to="/services" className="btn-ghost !px-4 sm:!px-5 flex-1 min-w-0 max-w-44 sm:flex-none sm:w-44">View Services</Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200} className="h-full">
            <div className="text-center lg:text-left flex flex-col h-full">
              <div className="self-center lg:self-start inline-flex items-center gap-2 pl-3.5 pr-2.5 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-[0.1em] mb-4">Built By Drivers</div>
              <h2 className="font-display italic font-black text-3xl lg:text-4xl mb-4">Real road experience. <span className="text-orange-400">Honest brokerage.</span></h2>
              <div className="h-0.5 w-24 bg-gradient-to-r from-orange-400 to-transparent mb-4 mx-auto lg:mx-0" />
              <p className="text-white/80 leading-relaxed mb-4">SFam Logistics LLC is a freight brokerage founded by a Class A CDL driver. We help shippers move produce, refrigerated, and dry van freight in the Pacific Northwest and nationwide, with the kind of communication that comes from carrier-side experience.</p>
              <p className="text-white/80 leading-relaxed mb-6">Our founder brings 10 years of carrier-side experience to SFam. That perspective shows up in every load: <span className="text-orange-400 font-semibold">realistic schedules, honest communication, fair carrier rates.</span></p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-auto">
                <Link to="/agent-opportunities" className="btn-ghost">Become an Agent <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 3. SERVICES: the four main freight services ============ */}
      <section className="section !pb-4 sm:!pb-6">
        <div className="container-x relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="badge mb-3 mx-auto">Our Services</div>
              <h2 className="font-display italic font-black text-3xl sm:text-4xl">Freight Solutions for <span className="text-orange-400">Your Next Shipment</span></h2>
              <div className="divider-glow w-24 mx-auto mt-4" />
            </div>
          </Reveal>
          <FocusServiceGrid />
        </div>
      </section>

      {/* ============ 3a. SAFETY FIRST: short teaser linking to /safety-compliance ============ */}
      <section className="section !pt-4 sm:!pt-6">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div className="relative rounded-2xl border border-orange-400/30 bg-white/[0.04] p-8 sm:p-10 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-orange-400/5 pointer-events-none" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mx-auto mb-5"><ShieldCheck className="w-7 h-7 text-white" /></div>
                <h2 className="font-display italic font-black text-3xl sm:text-4xl">Safety First. <span className="text-orange-400">Every Shipment.</span></h2>
                <div className="divider-glow w-24 mx-auto my-5" />
                <p className="text-white/80 max-w-2xl mx-auto mb-7 leading-relaxed">At SFam Logistics, safety begins with responsible carrier selection, clear communication, and respect for professional drivers. From carrier verification to freight fraud prevention, we take practical measures to support safe and accountable freight transportation.</p>
                <Link to="/safety-compliance" className="btn-primary">Our Safety Standards <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 3b. REGIONAL FOCUS ============ */}
      <section className="section-light !pt-6 sm:!pt-8">
        <div className="container-x max-w-3xl text-center">
          <Reveal>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mx-auto mb-5 shadow-lg shadow-orange-500/30">
              <MapPinned className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-display italic font-black text-3xl sm:text-4xl">Pacific Northwest Focus. <span className="text-orange-500">Nationwide Connections.</span></h2>
            <div className="h-0.5 w-24 mx-auto my-5 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
            <p className="text-white/85 text-base sm:text-lg leading-relaxed">We help move freight into, out of, and within the Pacific Northwest. We also work with shippers on nationwide shipments.</p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-8 rounded-2xl overflow-hidden border border-orange-400/30 shadow-2xl shadow-black/40 max-w-2xl mx-auto">
              <img src="/images/pnw-focus-map.jpg" alt="Map of freight lanes from the Pacific Northwest across the United States" className="w-full h-auto block" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 3c. SPOT RATE ============ */}
      <section className="section">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div className="relative rounded-2xl border border-orange-400/30 bg-brand-navy p-8 sm:p-10 text-center overflow-hidden">
              {/* Produce photo background with a dark navy overlay so the text stays readable */}
              <img src="/images/spot-quote-background.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-brand-navy/85 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-orange-400/5 pointer-events-none" />
              <div className="relative">
                <div className="badge mb-4 mx-auto">Spot Quotes</div>
                <h2 className="font-display italic font-black text-3xl sm:text-4xl">Need a <span className="text-orange-400">Spot Rate?</span></h2>
                <div className="divider-glow w-24 mx-auto my-5" />
                <p className="text-white/80 max-w-2xl mx-auto mb-7">Need a quote for a one-time shipment? Send us your pickup location, delivery location, shipment date, and freight details.</p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <Link to="/quote?type=spot" className="btn-primary whitespace-nowrap">Request a Spot Quote <ArrowRight className="w-4 h-4" /></Link>
                  <QuoteEmailLink className="text-sm" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 4. WHY SHIPPERS CHOOSE US: text/boxes left, image right ============ */}
      <section className="section-white">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-10 lg:items-stretch">
            <div>
              <Reveal>
                <div className="mb-8">
                  <div className="badge mb-3">Why Shippers Choose Us</div>
                  <h2 className="font-display italic font-black text-3xl lg:text-4xl">Trusted From <span className="text-orange-400">First Mile to Last.</span></h2>
                  <div className="h-0.5 w-24 bg-gradient-to-r from-orange-400 to-transparent my-4" />
                  <p className="text-white/80 text-base leading-relaxed">Our founder brings 10 years of carrier-side experience to SFam. That perspective shows up in every load: realistic schedules, honest communication, fair carrier rates.</p>
                </div>
              </Reveal>
              <div className="grid sm:grid-cols-1 gap-4">
                {[
                  { icon: ShieldCheck, t: 'Vetted Carrier Network', d: 'Every carrier verified for authority, insurance & safety scores.' },
                  { icon: Award, t: 'Driver-First Mentality', d: 'Happy drivers deliver on time. We pay quickly, treat carriers like partners.' },
                  { icon: MapPinned, t: 'Pacific Northwest Focus', d: 'Freight into, out of, and within the PNW, with nationwide shipping support.' }
                ].map(({ icon: Icon, t, d }, i) => (
                  <Reveal key={t} delay={i * 100}>
                    <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/15 hover:border-orange-400/40 transition">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center">
                        <Icon className="w-6 h-6 text-brand-navy" />
                      </div>
                      <div>
                        <div className="font-display italic font-bold text-lg mb-1">{t}</div>
                        <div className="text-sm text-white/70">{d}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={200} className="h-full flex items-center">
              {/* Use the image's native aspect ratio with object-contain so the full truck
                  is always visible end-to-end, no cropping on any breakpoint. */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-orange-400/30 shadow-2xl shadow-black/40 bg-brand-navy aspect-[1600/1203]">
                <img
                  src="/images/sfam-truck-peterbilt.jpg"
                  alt="SFam Logistics white Peterbilt sleeper tractor"
                  className="absolute inset-0 w-full h-full object-contain object-center"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <span className="inline-block px-4 py-2 rounded-full bg-orange-400/95 text-brand-navy font-display italic font-black uppercase tracking-wider text-sm sm:text-base shadow-lg shadow-black/30">
                    10 Years Carrier-Side Experience
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 5. CALLING ALL CARRIERS: headline + sign-up button only, centered ============ */}
      <section className="section">
        <div className="container-x relative text-center max-w-3xl">
          <Reveal>
            <div className="badge mb-4 mx-auto">Calling All Carriers</div>
            <h2 className="font-display italic font-black text-3xl lg:text-5xl mb-4 leading-[0.95]">
              Become a <span className="text-orange-400">Carrier Partner</span>
            </h2>
            <div className="divider-glow w-24 mx-auto my-5" />
            <p className="text-white/80 max-w-xl mx-auto">Work with SFam Logistics on freight opportunities that match your equipment and preferred lanes.</p>
            <div className="mt-8 flex justify-center">
              <Link to="/carrier-onboarding" className="btn-primary">Become a Carrier Partner <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 6. PROCESS TIMELINE: centered ============ */}
      <section className="section-light">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="badge mb-3 mx-auto">The Process</div>
              <h2 className="font-display italic font-black text-3xl sm:text-4xl">From Quote to <span className="text-orange-400">Delivery</span></h2>
              <div className="divider-glow w-24 mx-auto my-4" />
              <p className="text-white/70 text-sm">Four simple steps from first call to proof of delivery.</p>
            </div>
          </Reveal>
          <div className="relative">
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-orange-400/0 via-orange-400 to-orange-400/0" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {[
                { n: '01', i: Phone, t: 'Submit Request', d: 'Send origin, destination, and freight details, online or by phone.' },
                { n: '02', i: TrendingUp, t: 'Get a Quote', d: 'Receive a competitive rate within 30 minutes.' },
                { n: '03', i: Truck, t: 'We Dispatch', d: 'A vetted carrier is assigned, paperwork signed, pickup scheduled.' },
                { n: '04', i: CheckCircle2, t: 'Track & Deliver', d: 'Live updates from pickup to POD. No surprises, no silence.' }
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 120}>
                  <div className="text-center relative">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center shadow-lg shadow-orange-500/30 ring-4 ring-brand-navy"><s.i className="w-7 h-7 text-white" /></div>
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-navy border-2 border-orange-400 grid place-items-center text-orange-400 font-display italic font-bold text-[10px]">{s.n}</div>
                    </div>
                    <h3 className="font-display italic font-black text-lg mb-2">{s.t}</h3>
                    <p className="text-white/70 text-xs leading-relaxed">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. AGENT RECRUITMENT: image left, text right ============ */}
      <section className="section">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden border border-orange-400/30 shadow-2xl shadow-black/40">
                <img src="/images/recruiting-snowy-highway.png" alt="Trucks on a snowy mountain highway" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="text-center lg:text-left">
                <div className="badge mb-3">Now Recruiting</div>
                <h2 className="font-display italic font-black text-3xl lg:text-4xl mb-3">Join SFam as an<br /><span className="text-orange-400">Independent Freight Agent</span></h2>
                <div className="h-0.5 w-24 bg-gradient-to-r from-orange-400 to-transparent my-4 mx-auto lg:mx-0" />
                <p className="text-white/85 mb-6">Top commission splits, full back-office support, and the freedom to grow your book, backed by leadership with real carrier-side experience.</p>
                <div className="flex justify-center lg:justify-start">
                  <Link to="/agent-opportunities" className="btn-primary">Apply Now <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 8. GOOGLE REVIEWS ============ */}
      <GoogleReviews />

      {/* ============ 9. FINAL CTA: centered ============ */}
      <section className="section">
        <div className="container-x">
          <div className="relative bg-gradient-to-br from-brand-navy3 to-brand-navy border border-orange-400/20 rounded-2xl overflow-hidden p-10 lg:p-14 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-orange-400/5" />
            <div className="relative">
              <div className="badge mb-4 mx-auto">Ready When You Are</div>
              <h2 className="font-display italic font-black text-3xl sm:text-4xl">Let&rsquo;s Move <span className="text-orange-400">Your Next Load.</span></h2>
              <div className="divider-glow w-24 mx-auto my-5" />
              <p className="text-white/80 max-w-xl mx-auto mb-8">Request a quote online or email <a href={company.quoteEmailHref} className="font-semibold text-orange-400 hover:text-orange-300 whitespace-nowrap">{company.quoteEmail}</a>.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Link to="/quote" className="btn-primary flex-1">Request a Quote <ArrowRight className="w-4 h-4" /></Link>
                <a href="tel:+18886985556" className="btn-ghost flex-1"><Phone className="w-4 h-4" /> 1 (888) 698-5556</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
