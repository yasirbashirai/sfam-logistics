import { Link } from 'react-router-dom'
import { Target, Eye, Heart, Award, Truck, Users, ArrowRight, CheckCircle2, ShieldCheck, Briefcase, Globe2 } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'

export default function About() {
  return (
    <>
      <PageMeta title="About Us — Our Story, Mission & Values" description="Learn about SFam Logistics LLC — founded on over a decade of Class A CDL experience. Our mission: deliver freight solutions with precision, accountability, and respect. FMCSA authorized, MC 1810116, USDOT 4555943." />
      <PageHero eyebrow="About Us" title={<>Built On Experience. <span className="text-orange-400">Designed For Excellence.</span></>} subtitle="SFAM Logistics LLC was founded with a clear purpose: to elevate the standard of freight brokerage." />

      {/* ===== 1. OUR STORY ===== */}
      <section className="section-light">
        <div className="container-x relative max-w-4xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/10 border border-brand-navy/20 text-brand-navy text-xs font-bold uppercase tracking-[0.15em] mb-4">Our Story</div>
            <h2 className="font-display italic font-black text-3xl mb-4 text-brand-navy">Built on Experience. <span className="text-orange-500">Designed for Excellence.</span></h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-brand-navy to-transparent mb-5" />
            <div className="space-y-4 text-brand-navy/75 leading-relaxed">
              <p>SFAM Logistics LLC was founded with a clear purpose: to elevate the standard of freight brokerage.</p>
              <p>Our foundation is built on over a decade of real-industry experience behind the wheel as a Class A CDL truck driver. This perspective provides a rare advantage in an industry where critical decisions are often made far from the realities of the road.</p>
              <p>SFAM Logistics LLC is a licensed, FMCSA-authorized freight brokerage serving clients across North America. We are a privately held organization, strategically structured for long-term growth, operational stability, and disciplined execution.</p>
              <p>We approach logistics with precision and intention. Every load, every lane, and every relationship is managed with a focus on reliability, efficiency, and accountability.</p>
              <p>Our model is built for the future — combining strong brokerage operations today with a clear path toward asset-based capabilities. The result is a logistics partner positioned to deliver consistency at scale without compromising service quality.</p>
              <p className="text-orange-600 font-semibold italic">What started in the cab of a truck is now building toward something much greater.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 2. FOR SHIPPERS ===== */}
      <section className="section">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div>
              <div className="badge mb-3">For Shippers</div>
              <h2 className="font-display italic font-black text-3xl mb-4">A Higher Standard of <span className="text-orange-400">Freight Management</span></h2>
              <div className="divider-glow w-24 mb-5" />
              <div className="space-y-3 text-white/75 leading-relaxed">
                <p>At SFAM Logistics LLC, we understand that your freight is more than a shipment — it is a critical component of your business performance.</p>
                <p>We provide tailored logistics solutions designed to ensure consistency, visibility, and execution at the highest level. Our approach prioritizes proactive communication, realistic scheduling, and disciplined carrier selection to minimize disruption and maximize reliability.</p>
                <p>What sets us apart is perspective. We understand how decisions made at the brokerage level impact real-world execution, and we manage every load accordingly — with precision and accountability.</p>
              </div>
              <div className="mt-6">
                <h3 className="font-display italic font-bold text-lg text-orange-400 mb-3">What You Can Expect</h3>
                <div className="space-y-2">
                  {[
                    'Strategic capacity sourcing through a vetted carrier network',
                    'Accurate scheduling and proactive issue resolution',
                    'Clear, consistent communication at every stage of transit',
                    'A long-term partnership approach focused on operational efficiency'
                  ].map(item => (
                    <div key={item} className="flex gap-2 items-start">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span className="text-white/75 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white/75 mt-5 font-semibold italic">We are not simply moving freight — we are protecting your timelines, your reputation, and your bottom line.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 3. FOR CARRIERS ===== */}
      <section className="section-white">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/10 border border-brand-navy/20 text-brand-navy text-xs font-bold uppercase tracking-[0.15em] mb-3">For Carriers</div>
              <h2 className="font-display italic font-black text-3xl mb-4 text-brand-navy">Built by a Driver. <span className="text-orange-500">Designed for Your Success.</span></h2>
              <div className="h-0.5 w-24 bg-gradient-to-r from-brand-navy to-transparent mb-5" />
              <div className="space-y-3 text-brand-navy/75 leading-relaxed">
                <p>SFAM Logistics LLC was built with a deep understanding of what it means to be on the road.</p>
                <p>We recognize the challenges carriers face because we have experienced them firsthand. That insight shapes how we operate — prioritizing fairness, transparency, and respect in every interaction.</p>
                <p>We work with carriers who value professionalism and consistency, and in return, we provide clear expectations, responsive communication, and dependable freight opportunities.</p>
              </div>
              <div className="mt-6">
                <h3 className="font-display italic font-bold text-lg text-orange-500 mb-3">What You Can Expect</h3>
                <div className="space-y-2">
                  {[
                    'Realistic pickup and delivery schedules',
                    'Transparent load details with no last-minute surprises',
                    'Prompt communication and professional support',
                    'Long-term working relationships — not transactional exchanges'
                  ].map(item => (
                    <div key={item} className="flex gap-2 items-start">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-brand-navy/75 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-brand-navy/75 mt-5 font-semibold italic">We do not view carriers as commodities. We view them as essential partners in delivering excellence.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 4. MISSION VISION VALUES ===== */}
      <section className="section">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div className="text-center mb-8">
              <div className="badge mb-3 mx-auto">What Drives Us</div>
              <h2 className="font-display italic font-black text-3xl">Mission. Vision. <span className="text-orange-400">Values.</span></h2>
              <div className="divider-glow w-24 mx-auto mt-4" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Reveal delay={100}>
              <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full hover:border-orange-400/40 transition">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4"><Target className="w-5 h-5 text-brand-navy" /></div>
                <h3 className="font-display italic font-black text-lg mb-2">Our Mission</h3>
                <p className="text-white/70 leading-relaxed text-sm">To deliver freight solutions with precision, accountability, and respect — setting a higher standard for service across the logistics industry.</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full hover:border-orange-400/40 transition">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4"><Eye className="w-5 h-5 text-brand-navy" /></div>
                <h3 className="font-display italic font-black text-lg mb-2">Our Vision</h3>
                <p className="text-white/70 leading-relaxed text-sm">To become a premier transportation and logistics partner across North America, known for operational excellence, trusted relationships, and scalable, long-term solutions.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-orange-400/40 transition">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4"><Heart className="w-5 h-5 text-brand-navy" /></div>
              <h3 className="font-display italic font-black text-lg mb-4">Our Values</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { t: 'Excellence in Execution', d: 'Every load is managed with discipline and attention to detail.' },
                  { t: 'Integrity Without Compromise', d: 'We do what we say, every time.' },
                  { t: 'Respect for the Industry', d: 'From dock to driver, every role matters.' },
                  { t: 'Partnership First', d: 'We build relationships that drive mutual, long-term success.' }
                ].map(v => (
                  <div key={v.t} className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-display italic font-bold text-sm text-white">{v.t}</div>
                      <div className="text-white/60 text-xs">{v.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 5. TIMELINE ===== */}
      <section className="section-light">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/10 border border-brand-navy/20 text-brand-navy text-xs font-bold uppercase tracking-[0.15em] mb-3 mx-auto">Our Journey</div>
              <h2 className="font-display italic font-black text-3xl text-brand-navy">Built <span className="text-orange-500">One Load At A Time</span></h2>
              <div className="h-0.5 w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-brand-navy to-transparent" />
            </div>
          </Reveal>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-orange-400/40 to-transparent" />
            {[
              { y: '2017', t: 'Started behind the wheel', d: 'Years on the road taught us how the industry really works — and where it falls short.' },
              { y: '2023', t: 'Moved into dispatch', d: 'Translated road experience into operations. Saw both sides of every load.' },
              { y: '2026', t: 'Founded SFam Logistics LLC', d: 'Launched a brokerage built on the values we wished existed when we drove.' }
            ].map((m, i) => (
              <Reveal key={m.y} delay={i * 120}>
                <div className="relative pl-20 pb-8 last:pb-0">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center text-white font-display italic font-black text-sm shadow-lg shadow-orange-500/30">{m.y}</div>
                  <h3 className="font-display italic font-black text-lg mb-1 text-brand-navy">{m.t}</h3>
                  <p className="text-brand-navy/70 text-sm">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. CREDENTIALS ===== */}
      <section className="section">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div className="text-center mb-10">
              <div className="badge mb-3 mx-auto">Credentials</div>
              <h2 className="font-display italic font-black text-3xl">Licensed. Bonded. <span className="text-orange-400">Insured.</span></h2>
              <div className="divider-glow w-24 mx-auto mt-4" />
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { i: ShieldCheck, t: 'FMCSA Authorized', d: 'Licensed property broker' },
              { i: Briefcase, t: 'MC 1810116', d: 'Docket Number' },
              { i: Globe2, t: 'USDOT 4555943', d: 'DOT Registration' },
              { i: Award, t: 'BMC-84 Bonded', d: 'Surety bond coverage' }
            ].map(({ i: Icon, t, d }, idx) => (
              <Reveal key={t} delay={idx * 100}>
                <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-xl p-5 text-center hover:border-orange-400/40 transition">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-3 mx-auto"><Icon className="w-5 h-5 text-brand-navy" /></div>
                  <div className="font-display italic font-black text-base mb-1">{t}</div>
                  <div className="text-xs text-white/60">{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. CTA ===== */}
      <section className="section-white pt-0">
        <div className="container-x max-w-3xl">
          <div className="bg-brand-light border border-brand-light3 rounded-2xl p-10 text-center">
            <h2 className="font-display italic font-black text-2xl mb-3 text-brand-navy">Want to <span className="text-orange-500">Work With Us?</span></h2>
            <p className="text-brand-navy/70 mb-6 max-w-xl mx-auto text-sm">Whether you&apos;re a shipper, carrier, or freight agent — we&apos;d love to hear from you.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/quote" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-brand-navy font-bold text-sm uppercase tracking-wider hover:-translate-y-0.5 transition">Get a Quote <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-brand-navy/30 text-brand-navy text-sm font-bold uppercase tracking-wider hover:bg-brand-navy hover:text-white transition">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
