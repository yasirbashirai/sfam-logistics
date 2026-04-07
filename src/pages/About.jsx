import { Link } from 'react-router-dom'
import { Target, Eye, Heart, Award, Truck, Users } from 'lucide-react'
import { PageHero, Orbs } from '../components/Section.jsx'

export default function About() {
  return (
    <>
      <PageHero eyebrow="About SFam Logistics" title={<>Built On The Road. <span className="gradient-text">Powered By Trust.</span></>} subtitle="A Washington-based freight brokerage built on over 10 years of real experience behind the wheel and in the industry." />

      <section className="section">
        <Orbs />
        <div className="container-x relative grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="label mb-3">Our Story</div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6">From The Driver&apos;s Seat <span className="gradient-text">To Your Loading Dock</span></h2>
            <div className="space-y-4 text-white/70">
              <p>SFam Logistics LLC was founded by a former truck driver who spent years on the road and saw firsthand how broken the brokerage industry can be. Bad communication, unrealistic schedules, surprise detention disputes, and brokers who didn&apos;t understand what it actually takes to deliver a load.</p>
              <p>We&apos;re different because we&apos;ve lived it. Every load we move is handled with a clear plan, direct communication, and respect for the people who actually drive the trucks.</p>
              <p>Headquartered in Bothell, Washington, we serve shippers and carriers across all 48 contiguous states — and we&apos;re growing through a network of independent freight agents who share our values.</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/30 via-pink-500/20 to-purple-600/30 blur-3xl rounded-3xl" />
            <div className="relative glass-strong neon-border p-8 grid grid-cols-2 gap-5">
              {[['10+', 'Years on the Road'], ['500+', 'Carriers'], ['12K+', 'Loads Moved'], ['48', 'States']].map(([n, l]) => (
                <div key={l} className="text-center p-5 rounded-2xl bg-white/[0.04]">
                  <div className="text-3xl font-display font-bold gradient-text">{n}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { i: Target, t: 'Our Mission', d: 'Move freight with accountability and respect — for both the shipper and the driver. Clear communication, realistic scheduling, and doing what we say we\'re going to do.' },
              { i: Eye, t: 'Our Vision', d: 'To be the freight broker that drivers actually want to haul for, and that shippers actually trust. Built one load — and one relationship — at a time.' },
              { i: Heart, t: 'Our Values', d: 'Honesty over hype. Communication over silence. Driver respect over rate cutting. Long-term partnerships over one-off transactions.' }
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="glass p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 grid place-items-center mb-5"><Icon className="w-7 h-7" /></div>
                <h3 className="font-display font-bold text-2xl mb-3">{t}</h3>
                <p className="text-white/60">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <Orbs />
        <div className="container-x relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="label mb-3">What We Stand For</div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl">The <span className="gradient-text">SFam Difference</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { i: Award, t: 'Experience', d: 'A decade behind the wheel translates to better load planning and realistic schedules.' },
              { i: Users, t: 'Relationships', d: 'We build long-term partnerships, not transactional one-offs.' },
              { i: Truck, t: 'Driver Respect', d: 'Fast pay, fair rates, honest communication.' },
              { i: Heart, t: 'Accountability', d: 'When we say it\'ll happen, it happens. When it doesn\'t, we own it.' }
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="glass p-6">
                <Icon className="w-10 h-10 text-orange-400 mb-4" />
                <h4 className="font-display font-bold text-lg mb-2">{t}</h4>
                <p className="text-sm text-white/60">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="glass-strong neon-border p-12 text-center">
            <h2 className="font-display font-bold text-4xl mb-4">Want to <span className="gradient-text">Work With Us?</span></h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">Whether you&apos;re a shipper, carrier, or freight agent — we&apos;d love to hear from you.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/quote" className="btn-primary">Get a Quote</Link>
              <Link to="/contact" className="btn-ghost">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
