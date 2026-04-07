import { Link } from 'react-router-dom'
import { Target, Eye, Heart, Award, Truck, Users, ArrowRight, CheckCircle2, Calendar, MapPin, Phone, Star } from 'lucide-react'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import CountUp from '../components/CountUp.jsx'
import IMG from '../data/images.js'

export default function About() {
  return (
    <>
      <PageHero eyebrow="About SFam Logistics" title={<>Built On The Road. <span className="text-orange-400">Powered By Trust.</span></>} subtitle="A Washington-based freight brokerage built on over 10 years of real experience behind the wheel and in the industry." image={IMG.heroDusk} />

      {/* ===== 1. STORY ===== */}
      <section className="section">
        <Orbs />
        <div className="container-x relative grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="badge mb-4">Our Story</div>
            <h2 className="font-display italic font-black text-5xl mb-6">From The Driver&apos;s Seat <br /><span className="text-orange-400">To Your Loading Dock</span></h2>
            <div className="divider-glow w-32 mb-6" />
            <div className="space-y-5 text-white/75 text-lg leading-relaxed">
              <p>SFam Logistics LLC was founded by a former truck driver who spent years on the road and saw firsthand how broken the brokerage industry can be. Bad communication, unrealistic schedules, surprise detention disputes, and brokers who didn&apos;t understand what it actually takes to deliver a load.</p>
              <p>We&apos;re different because we&apos;ve lived it. Every load we move is handled with a clear plan, direct communication, and respect for the people who actually drive the trucks.</p>
              <p>Headquartered in Bothell, Washington, we serve shippers and carriers across all 48 contiguous states — and we&apos;re growing through a network of independent freight agents who share our values.</p>
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
            { n: 500, suf: '+', l: 'Active Carriers' },
            { n: 12000, suf: '+', l: 'Loads Moved' },
            { n: 48, suf: '', l: 'States Covered' }
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 100}>
              <div className="text-5xl lg:text-6xl font-display italic font-black text-orange-400"><CountUp end={s.n} suffix={s.suf} /></div>
              <div className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-bold">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 3. MISSION VISION VALUES ===== */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="badge mb-4 mx-auto">What Drives Us</div>
              <h2 className="font-display italic font-black text-5xl">Mission. Vision. <span className="text-orange-400">Values.</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { i: Target, t: 'Our Mission', d: 'Move freight with accountability and respect — for both the shipper and the driver. Clear communication, realistic scheduling, and doing what we say we\'re going to do.' },
              { i: Eye, t: 'Our Vision', d: 'To be the freight broker that drivers actually want to haul for, and that shippers actually trust. Built one load — and one relationship — at a time.' },
              { i: Heart, t: 'Our Values', d: 'Honesty over hype. Communication over silence. Driver respect over rate cutting. Long-term partnerships over one-off transactions.' }
            ].map(({ i: Icon, t, d }, idx) => (
              <Reveal key={t} delay={idx * 120}>
                <div className="glass-strong p-8 h-full hover:border-orange-400/40 transition group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition shadow-lg shadow-orange-500/30"><Icon className="w-8 h-8 text-brand-navy" /></div>
                  <h3 className="font-display italic font-black text-2xl mb-3">{t}</h3>
                  <p className="text-white/70 leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. WHAT MAKES US DIFFERENT ===== */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/30 to-transparent">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 bg-orange-400/20 blur-3xl rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-orange-400/30 aspect-square">
                <img src={IMG.handshake} alt="Partnership" className="w-full h-full object-cover" />
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
                  { i: Award, t: 'Real Road Experience', d: 'A decade behind the wheel translates to better load planning and realistic schedules.' },
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

      {/* ===== 5. TIMELINE ===== */}
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

      {/* ===== 6. CTA ===== */}
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
