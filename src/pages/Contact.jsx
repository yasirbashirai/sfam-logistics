import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import { PageHero, Orbs } from '../components/Section.jsx'
import { useSubmissions } from '../context/SubmissionsContext.jsx'
import { company } from '../data/site.js'

export default function Contact() {
  const { add } = useSubmissions()
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    add('contacts', form)
    setDone(true)
  }

  return (
    <>
      <PageHero eyebrow="Contact Us" title={<>Let&apos;s <span className="gradient-text">Talk Freight</span></>} subtitle="Phone, email, or message form — we answer fast." />
      <section className="section pt-0">
        <Orbs />
        <div className="container-x relative grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            {[
              { i: Phone, t: 'Phone (Toll Free)', v: company.phone, href: company.phoneHref },
              { i: Mail, t: 'Email', v: company.email, href: `mailto:${company.email}` },
              { i: MapPin, t: 'Headquarters', v: company.address },
              { i: Clock, t: 'Hours', v: company.hours }
            ].map(({ i: Icon, t, v, href }) => (
              <div key={t} className="glass p-6 flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-orange-500 to-purple-600 grid place-items-center"><Icon className="w-6 h-6" /></div>
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mb-1">{t}</div>
                  {href ? <a href={href} className="font-semibold hover:text-orange-300">{v}</a> : <div className="font-semibold">{v}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 glass-strong p-8 lg:p-10">
            {done ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 grid place-items-center mx-auto mb-5"><CheckCircle2 className="w-10 h-10" /></div>
                <h3 className="font-display font-bold text-3xl mb-2">Message Sent!</h3>
                <p className="text-white/70">We&apos;ll be in touch shortly. For urgent freight needs, call {company.phone}.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h3 className="font-display font-bold text-2xl mb-4">Send Us a Message</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input className="input" placeholder="Name *" value={form.name} onChange={e => set('name', e.target.value)} required />
                  <input className="input" type="email" placeholder="Email *" value={form.email} onChange={e => set('email', e.target.value)} required />
                  <input className="input" placeholder="Phone" value={form.phone} onChange={e => set('phone', e.target.value)} />
                  <input className="input" placeholder="Subject" value={form.subject} onChange={e => set('subject', e.target.value)} />
                </div>
                <textarea className="textarea" placeholder="Message *" value={form.message} onChange={e => set('message', e.target.value)} required />
                <button type="submit" className="btn-primary w-full">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
