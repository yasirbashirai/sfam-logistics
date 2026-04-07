import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, CheckCircle2, MessageSquare, Truck, Users, ArrowRight } from 'lucide-react'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { useSubmissions } from '../context/SubmissionsContext.jsx'
import { company } from '../data/site.js'
import IMG from '../data/images.js'

export default function Contact() {
  const { add } = useSubmissions()
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const submit = (e) => { e.preventDefault(); add('contacts', form); setDone(true) }

  return (
    <>
      <PageHero eyebrow="Contact Us" title={<>Let&apos;s <span className="text-orange-400">Talk Freight</span></>} subtitle="Phone, email, or message form — we answer fast." image={IMG.dispatchDesk} />

      {/* ===== 1. CONTACT INFO + FORM ===== */}
      <section className="section">
        <Orbs />
        <div className="container-x relative grid lg:grid-cols-3 gap-8">
          <Reveal className="space-y-4">
            {[
              { i: Phone, t: 'Phone (Toll Free)', v: company.phone, href: company.phoneHref },
              { i: Mail, t: 'Email', v: company.email, href: `mailto:${company.email}` },
              { i: MapPin, t: 'Headquarters', v: company.address },
              { i: Clock, t: 'Hours', v: company.hours }
            ].map(({ i: Icon, t, v, href }) => (
              <div key={t} className="glass-strong p-6 flex gap-4 hover:border-orange-400/40 transition group">
                <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center group-hover:rotate-6 transition"><Icon className="w-6 h-6 text-brand-navy" /></div>
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-widest mb-1 font-bold">{t}</div>
                  {href ? <a href={href} className="font-display italic font-bold hover:text-orange-300">{v}</a> : <div className="font-display italic font-bold">{v}</div>}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={150} className="lg:col-span-2">
            <div className="glass-strong p-8 lg:p-10 h-full">
              {done ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 grid place-items-center mx-auto mb-5"><CheckCircle2 className="w-10 h-10" /></div>
                  <h3 className="font-display italic font-black text-3xl mb-2">Message Sent!</h3>
                  <p className="text-white/70">We&apos;ll be in touch shortly. For urgent freight needs, call {company.phone}.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <h3 className="font-display italic font-black text-3xl mb-2">Send Us A Message</h3>
                  <p className="text-white/60 mb-6">We respond within 1 business hour.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input className="input" placeholder="Name *" value={form.name} onChange={e => set('name', e.target.value)} required />
                    <input className="input" type="email" placeholder="Email *" value={form.email} onChange={e => set('email', e.target.value)} required />
                    <input className="input" placeholder="Phone" value={form.phone} onChange={e => set('phone', e.target.value)} />
                    <input className="input" placeholder="Subject" value={form.subject} onChange={e => set('subject', e.target.value)} />
                  </div>
                  <textarea className="textarea" placeholder="Message *" value={form.message} onChange={e => set('message', e.target.value)} required />
                  <button type="submit" className="btn-primary w-full">Send Message <ArrowRight className="w-5 h-5" /></button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 2. WHO TO CONTACT ===== */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/30 to-transparent">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="badge mb-4 mx-auto">Reach The Right Team</div>
              <h2 className="font-display italic font-black text-5xl">Who Are You <span className="text-orange-400">Trying To Reach?</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { i: Truck, t: 'Shipping a Load?', d: 'Get an instant quote or talk to our quoting team.', cta: 'Get a Quote', to: '/quote' },
              { i: Users, t: 'Want to Haul?', d: 'Carrier signup or carrier dispatch support.', cta: 'Become a Carrier', to: '/carrier-onboarding' },
              { i: MessageSquare, t: 'Join as Agent?', d: 'Speak with our recruiting team about agent opportunities.', cta: 'Apply Now', to: '/agent-opportunities' }
            ].map(({ i: Icon, t, d, cta, to }, idx) => (
              <Reveal key={t} delay={idx * 120}>
                <a href={to} className="glass-strong p-8 hover:border-orange-400/50 hover:-translate-y-1 transition group block h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-5 group-hover:rotate-6 transition"><Icon className="w-7 h-7 text-brand-navy" /></div>
                  <h3 className="font-display italic font-black text-2xl mb-2">{t}</h3>
                  <p className="text-white/60 mb-5">{d}</p>
                  <span className="inline-flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-xs">{cta} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" /></span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. MAP ===== */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="badge mb-3 mx-auto">Visit Us</div>
              <h2 className="font-display italic font-black text-4xl">Our <span className="text-orange-400">Headquarters</span></h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-3xl overflow-hidden border border-orange-400/30 aspect-[16/7]">
              <iframe
                title="SFam Logistics HQ"
                src="https://maps.google.com/maps?q=19125+North+Creek+Parkway,+Bothell,+WA+98011&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 4. FAQ ===== */}
      <section className="section pt-0">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="text-center mb-10">
              <div className="badge mb-3 mx-auto">FAQ</div>
              <h2 className="font-display italic font-black text-4xl">Quick <span className="text-orange-400">Answers</span></h2>
            </div>
          </Reveal>
          <div className="space-y-4">
            {[
              { q: 'How fast do you respond?', a: 'During business hours (Mon–Fri, 8AM–5PM PST), we respond to web inquiries within one hour. Phone calls are answered immediately.' },
              { q: 'Do you operate after hours?', a: 'Yes — our dispatch team is available 24/7 for active loads, hot loads, and emergency capacity needs.' },
              { q: 'Where can I reach you in person?', a: 'Our headquarters is at 19125 North Creek Parkway Suite 120, Bothell, WA 98011. Visits by appointment.' }
            ].map((f, i) => (
              <Reveal key={f.q} delay={i * 80}>
                <details className="glass p-6 group cursor-pointer hover:border-orange-400/40 transition">
                  <summary className="flex items-center justify-between font-display italic font-bold text-lg list-none">
                    {f.q}
                    <span className="text-orange-400 text-2xl group-open:rotate-45 transition">+</span>
                  </summary>
                  <p className="text-white/70 mt-4 leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
