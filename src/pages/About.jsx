import { Link } from 'react-router-dom'
import { Target, Eye, Heart, Award, Truck, Users, ArrowRight, CheckCircle2, Calendar, MapPin, Phone, Star, ShieldCheck, Briefcase, Globe2 } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import CountUp from '../components/CountUp.jsx'
import IMG from '../data/images.js'

export default function About() {
  return (
    <>
      <PageMeta title="About Us — Our Story, Mission & Values" description="Learn about SFam Logistics LLC — founded on over a decade of Class A CDL experience. Our mission: deliver freight solutions with precision, accountability, and respect. FMCSA authorized, MC 1810116, USDOT 4555943." />
      <PageHero eyebrow="About SFam Logistics" title={<>Built On Experience. <span className="text-orange-400">Designed For Excellence.</span></>} subtitle="SFAM Logistics LLC was founded with a clear purpose: to elevate the standard of freight brokerage." image={IMG.heroDusk} />

      {/* ===== 1. OUR STORY ===== */}
      <section className="section">
        <Orbs />
        <div className="container-x relative grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="badge mb-4">Our Story</div>
            <h2 className="font-display italic font-black text-5xl mb-6">Built on Experience. <br /><span className="text-orange-400">Designed for Excellence.</span></h2>
            <div className="divider-glow w-32 mb-6" />
            <div className="space-y-5 text-white/75 text-lg leading-relaxed">
              <p>SFAM Logistics LLC was founded with a clear purpose: to elevate the standard of freight brokerage.</p>
              <p>Our foundation is built on over a decade of real-industry experience behind the wheel of a Class A CDL truck. This perspective provides a rare advantage in an industry where critical decisions are often made far from the realities of the road.</p>
              <p>SFAM Logistics LLC is a licensed, FMCSA-authorized freight brokerage serving clients across North America. We are a privately held organization, strategically structured for long-term growth, operational stability, and disciplined execution.</p>
              <p>We approach logistics with precision and intention. Every load, every lane, and every relationship is managed with a focus on reliability, efficiency, and accountability.</p>
              <p>Our model is built for the future — combining strong brokerage operations today with a clear path toward asset-based capabilities. The result is a logistics partner positioned to deliver consistency at scale without compromising service quality.</p>
              <p className="text-orange-300 font-semibold italic">What started in the cab of a truck is now building toward something much greater.</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative">
              <div className="absolute -inset-6 bg-orange-400/20 blur-3xl rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-orange-400/30 aspect-[4/5]">
                <img src={IMG.cabInterior} alt="Inside the cab" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="badge mb-2">Where it started</div>
                  <div className="font-display italic font-black text-2xl">Inside the cab.</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 2. STATS BANNER ===== */}
      <section className="py-20 bg-brand-navy3/40 border-y border-orange-400/20">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { n: 10, suf: '+', l: 'Years on the Road' },
            { n: 48, suf: '', l: 'States Covered' },
            { n: 24, suf: '/7', l: 'Dispatch Coverage' },
            { n: 100, suf: '%', l: 'FMCSA Compliant' }
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 100}>
              <div className="text-5xl lg:text-6xl font-display italic font-black text-orange-400"><CountUp end={s.n} suffix={s.suf} /></div>
              <div className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-bold">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 3. FOR SHIPPERS ===== */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div>
              <div className="badge mb-4">For Shippers</div>
              <h2 className="font-display italic font-black text-5xl mb-6">A Higher Standard of <br /><span className="text-orange-400">Freight Management</span></h2>
              <div className="divider-glow w-32 mb-6" />
              <div className="space-y-4 text-white/75 text-lg leading-relaxed">
                <p>At SFAM Logistics LLC, we understand that your freight is more than a shipment — it is a critical component of your business performance.</p>
                <p>We provide tailored logistics solutions designed to ensure consistency, visibility, and execution at the highest level. Our approach prioritizes proactive communication, realistic scheduling, and disciplined carrier selection to minimize disruption and maximize reliability.</p>
                <p>What sets us apart is perspective. We understand how decisions made at the brokerage level impact real-world execution, and we manage every load accordingly — with precision and accountability.</p>
              </div>
              <div className="mt-8 space-y-3">
                <h3 className="font-display italic font-black text-xl text-orange-400 mb-3">What You Can Expect</h3>
                {[
                  'Strategic capacity sourcing through a vetted carrier network',
                  'Accurate scheduling and proactive issue resolution',
                  'Clear, consistent communication at every stage of transit',
                  'A long-term partnership approach focused on operational efficiency'
                ].map(item => (
                  <div key={item} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-white/75">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/75 text-lg mt-6 font-semibold italic">We are not simply moving freight — we are protecting your timelines, your reputation, and your bottom line.</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative">
              <div className="absolute -inset-6 bg-orange-400/20 blur-3xl rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-orange-400/30 aspect-square">
                <img src={IMG.dispatchDesk} alt="Dispatch operations" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 4. FOR CARRIERS ===== */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/30 to-transparent">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal delay={200}>
            <div className="relative">
              <div className="absolute -inset-6 bg-orange-400/20 blur-3xl rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-orange-400/30 aspect-square">
                <img src={IMG.handshake} alt="Driver partnership" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <div className="badge mb-4">For Carriers</div>
              <h2 className="font-display italic font-black text-5xl mb-6">Built by a Driver. <br /><span className="text-orange-400">Designed for Your Success.</span></h2>
              <div className="divider-glow w-32 mb-6" />
              <div className="space-y-4 text-white/75 text-lg leading-relaxed">
                <p>SFAM Logistics LLC was built with a deep understanding of what it means to be on the road.</p>
                <p>We recognize the challenges carriers face because we have experienced them firsthand. That insight shapes how we operate — prioritizing fairness, transparency, and respect in every interaction.</p>
                <p>We work with carriers who value professionalism and consistency, and in return, we provide clear expectations, responsive communication, and dependable freight opportunities.</p>
              </div>
              <div className="mt-8 space-y-3">
                <h3 className="font-display italic font-black text-xl text-orange-400 mb-3">What You Can Expect</h3>
                {[
                  'Realistic pickup and delivery schedules',
                  'Transparent load details with no last-minute surprises',
                  'Prompt communication and professional support',
                  'Long-term working relationships — not transactional exchanges'
                ].map(item => (
                  <div key={item} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-white/75">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/75 text-lg mt-6 font-semibold italic">We do not view carriers as commodities. We view them as essential partners in delivering excellence.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 5. MISSION VISION VALUES ===== */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-6">
              <div className="badge mb-4 mx-auto">What Drives Us</div>
              <h2 className="font-display italic font-black text-5xl">Mission. Vision. <span className="text-orange-400">Values.</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Reveal delay={100}>
              <div className="glass-strong p-8 h-full hover:border-orange-400/40 transition group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition shadow-lg shadow-orange-500/30"><Target className="w-8 h-8 text-brand-navy" /></div>
                <h3 className="font-display italic font-black text-2xl mb-3">Our Mission</h3>
                <p className="text-white/70 leading-relaxed text-lg">To deliver freight solutions with precision, accountability, and respect — setting a higher standard for service across the logistics industry.</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="glass-strong p-8 h-full hover:border-orange-400/40 transition group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition shadow-lg shadow-orange-500/30"><Eye className="w-8 h-8 text-brand-navy" /></div>
                <h3 className="font-display italic font-black text-2xl mb-3">Our Vision</h3>
                <p className="text-white/70 leading-relaxed text-lg">To become a premier transportation and logistics partner across North America, known for operational excellence, trusted relationships, and scalable, long-term solutions.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <div className="glass-strong p-8 hover:border-orange-400/40 transition group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition shadow-lg shadow-orange-500/30"><Heart className="w-8 h-8 text-brand-navy" /></div>
              <h3 className="font-display italic font-black text-2xl mb-5">Our Values</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { t: 'Excellence in Execution', d: 'Every load is managed with discipline and attention to detail.' },
                  { t: 'Integrity Without Compromise', d: 'We do what we say, every time.' },
                  { t: 'Respect for the Industry', d: 'From dock to driver, every role matters.' },
                  { t: 'Partnership First', d: 'We build relationships that drive mutual, long-term success.' }
                ].map(v => (
                  <div key={v.t} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-display italic font-bold text-lg text-white">{v.t}</div>
                      <div className="text-white/60 text-sm">{v.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 6. WHAT MAKES US DIFFERENT ===== */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/30 to-transparent">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 bg-orange-400/20 blur-3xl rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-orange-400/30 aspect-square">
                <img src={IMG.opsTablet} alt="Operations" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <div className="badge mb-4">The SFam Difference</div>
              <h2 className="font-display italic font-black text-5xl mb-6">More Than A Broker.<br /><span className="text-orange-400">A Partner.</span></h2>
              <div className="divider-glow w-32 mb-6" />
              <div className="space-y-4">
                {[
                  { i: Award, t: 'Real Road Experience', d: 'Over a decade behind the wheel translates to better load planning and realistic schedules.' },
                  { i: Users, t: 'True Relationships', d: 'We build long-term partnerships with shippers and carriers — not transactional one-offs.' },
                  { i: Truck, t: 'Driver Respect', d: 'Fast pay, fair rates, honest communication. Carriers haul for us because we earn it.' },
                  { i: Heart, t: 'Total Accountability', d: 'When we say it\'ll happen, it happens. When it doesn\'t, we own it and we fix it.' }
                ].map(({ i: Icon, t, d }) => (
                  <div key={t} className="flex gap-4 glass p-5 hover:border-orange-400/40 hover:translate-x-2 transition group">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center group-hover:rotate-6 transition"><Icon className="w-6 h-6 text-brand-navy" /></div>
                    <div>
                      <div className="font-display italic font-bold text-lg">{t}</div>
                      <div className="text-sm text-white/60">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 7. TIMELINE ===== */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="badge mb-4 mx-auto">Our Journey</div>
              <h2 className="font-display italic font-black text-5xl">Built <span className="text-orange-400">One Load At A Time</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 via-orange-400/40 to-transparent" />
            {[
              { y: '2014', t: 'Started behind the wheel', d: 'Years on the road taught us how the industry really works — and where it falls short.' },
              { y: '2020', t: 'Moved into dispatch', d: 'Translated road experience into operations. Saw both sides of every load.' },
              { y: '2024', t: 'Founded SFam Logistics LLC', d: 'Launched a brokerage built on the values we wished existed when we drove.' },
              { y: '2026', t: 'Growing nationwide', d: 'Now expanding through independent agents who share our driver-first values.' }
            ].map((m, i) => (
              <Reveal key={m.y} delay={i * 120}>
                <div className="relative pl-24 pb-10 last:pb-0">
                  <div className="absolute left-0 top-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center text-brand-navy font-display italic font-black shadow-lg shadow-orange-500/40">{m.y}</div>
                  <h3 className="font-display italic font-black text-2xl mb-2">{m.t}</h3>
                  <p className="text-white/70">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. CREDENTIALS ===== */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/30 to-transparent">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="badge mb-4 mx-auto">Credentials</div>
              <h2 className="font-display italic font-black text-5xl">Licensed. Bonded. <span className="text-orange-400">Insured.</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { i: ShieldCheck, t: 'FMCSA Authorized', d: 'Licensed property broker' },
              { i: Briefcase, t: 'MC 1810116', d: 'Docket Number' },
              { i: Globe2, t: 'USDOT 4555943', d: 'DOT Registration' },
              { i: Award, t: 'BMC-84 Bonded', d: 'Surety bond coverage' }
            ].map(({ i: Icon, t, d }, idx) => (
              <Reveal key={t} delay={idx * 100}>
                <div className="glass-strong p-6 text-center hover:border-orange-400/40 transition group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4 mx-auto group-hover:scale-110 transition"><Icon className="w-7 h-7 text-brand-navy" /></div>
                  <div className="font-display italic font-black text-xl mb-1">{t}</div>
                  <div className="text-sm text-white/60">{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. CTA ===== */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="relative glass-strong neon-border p-12 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-400/20 blur-3xl rounded-full" />
            <div className="relative">
              <h2 className="font-display italic font-black text-4xl mb-4">Want to <span className="text-orange-400">Work With Us?</span></h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">Whether you&apos;re a shipper, carrier, or freight agent — we&apos;d love to hear from you.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/quote" className="btn-primary">Get a Quote <ArrowRight className="w-5 h-5" /></Link>
                <Link to="/contact" className="btn-ghost">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
