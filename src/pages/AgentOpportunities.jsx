import { useState } from 'react'
import { CheckCircle2, Upload, DollarSign, Briefcase, TrendingUp, Users, Award, Phone, ArrowRight } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { useSubmissions, uploadFiles } from '../context/SubmissionsContext.jsx'

export default function AgentOpportunities() {
  const { add } = useSubmissions()
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '', state: '',
    yearsExperience: '', currentCompany: '', bookOfBusiness: '', monthlyRevenue: '',
    specialties: [], whyJoin: '', resume: null
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleSpec = (s) => setForm(f => ({ ...f, specialties: f.specialties.includes(s) ? f.specialties.filter(x => x !== s) : [...f.specialties, s] }))

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const uploaded = form.resume ? await uploadFiles([form.resume]) : []
    await add('agents', { ...form, resumeFile: uploaded[0] || null, resume: undefined })
    setSubmitting(false)
    setDone(true)
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 5000)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Send automated email response
    if (form.email) {
      try {
        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: form.email,
            name: form.name,
            type: 'agent-application'
          })
        })
      } catch {}
    }
  }

  if (done) return (
    <section className="min-h-[80vh] flex items-center pt-32 pb-20 relative overflow-hidden">
      <Orbs />
      {showPopup && (
        <div className="fixed top-24 right-6 z-[100] bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-fade-up flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-semibold">Your application has been received!</span>
        </div>
      )}
      <div className="container-x relative max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 grid place-items-center mx-auto mb-5"><CheckCircle2 className="w-10 h-10" /></div>
        <h1 className="font-display italic font-black text-4xl mb-3">Application Received!</h1>
        <p className="text-white/70 mb-6">Thanks for your interest in joining SFam Logistics. A confirmation has been sent to your email. Our recruiting team will review your application and reach out within 48 hours.</p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </section>
  )

  return (
    <>
      <PageMeta title="Independent Freight Agent Opportunities" description="Join SFam Logistics as an independent freight agent. Up to 75% commission splits, weekly pay, AscendTMS access, full back-office support." />
      <PageHero eyebrow="Join Our Team" title={<>Independent Freight <span className="text-orange-400">Agent Opportunities</span></>} subtitle="Own your book. Set your hours. Get the back-office support and tech you need to scale." />

      {/* ===== 1. COMMISSION HIGHLIGHT ===== */}
      <section className="section-light">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/10 border border-brand-navy/20 text-brand-navy text-xs font-bold uppercase tracking-[0.15em] mb-3 mx-auto">Why Top Agents Join Us</div>
              <h2 className="font-display italic font-black text-3xl text-brand-navy">Build Your Book. <span className="text-orange-500">Grow Your Income.</span></h2>
              <div className="h-0.5 w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-brand-navy to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="text-center mb-10">
              <div className="inline-block bg-gradient-to-r from-orange-400 to-orange-500 text-brand-navy rounded-2xl px-10 py-6">
                <div className="text-4xl font-display italic font-black">Up to 75%</div>
                <div className="text-lg font-bold uppercase tracking-wider">Commissions</div>
              </div>
              <p className="text-brand-navy/70 mt-4 text-sm max-w-lg mx-auto">We pay commissions weekly even if your customer doesn&apos;t pay us.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { i: DollarSign, t: 'Top Splits', d: 'Industry-leading commission splits — keep more of what you earn.' },
              { i: Briefcase, t: 'Full Back Office', d: 'Carrier vetting, billing, collections, claims — all handled for you.' },
              { i: TrendingUp, t: 'Modern Tech', d: 'TMS, load board access, automated rate confirmations.' },
              { i: Users, t: 'Real Support', d: 'Dedicated agent success team. You\'re never alone.' }
            ].map(({ i: Icon, t, d }, idx) => (
              <Reveal key={t} delay={idx * 80}>
                <div className="bg-white border border-brand-light3 rounded-xl p-5 hover:border-orange-400/40 transition h-full">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-3"><Icon className="w-5 h-5 text-white" /></div>
                  <div className="font-display italic font-black text-base mb-1 text-brand-navy">{t}</div>
                  <div className="text-xs text-brand-navy/60">{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. EARNINGS INFO ===== */}
      <section className="section">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div>
              <div className="badge mb-3">Earn What You&apos;re Worth</div>
              <h2 className="font-display italic font-black text-3xl mb-4">No Cap. <span className="text-orange-400">No Territory Limits.</span></h2>
              <div className="divider-glow w-24 mb-4" />
              <p className="text-white/70 mb-6">Top SFam agents are earning six figures — and we&apos;re just getting started. Bring your book, your work ethic, and your relationships. We&apos;ll bring the carriers, the tech, and the back office.</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[['Up to 75%', 'Commission Split'], ['Weekly', 'Pay Guaranteed'], ['$0', 'Setup Cost'], ['Open', 'Territory']].map(([n, l]) => (
                  <div key={l} className="bg-white/[0.06] border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-xl font-display italic font-black text-orange-400">{n}</div>
                    <div className="text-[9px] text-white/60 uppercase tracking-widest mt-1 font-bold">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 3. APPLICATION ===== */}
      <section className="section-white">
        <div className="container-x relative max-w-4xl">
          <Reveal>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/10 border border-brand-navy/20 text-brand-navy text-xs font-bold uppercase tracking-[0.15em] mb-3 mx-auto">Application</div>
              <h2 className="font-display italic font-black text-3xl text-brand-navy">Apply <span className="text-orange-500">In Minutes</span></h2>
              <div className="h-0.5 w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-brand-navy to-transparent" />
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-6">
            <form onSubmit={submit} className="lg:col-span-2 bg-white border border-brand-light3 rounded-2xl p-6 lg:p-8 space-y-6">
              <div>
                <h3 className="font-display italic font-black text-xl mb-4 text-brand-navy">Contact Information</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Full Name *"><input className="input-light" value={form.name} onChange={e => set('name', e.target.value)} required /></Field>
                  <Field label="Email *"><input type="email" className="input-light" value={form.email} onChange={e => set('email', e.target.value)} required /></Field>
                  <Field label="Phone *"><input className="input-light" value={form.phone} onChange={e => set('phone', e.target.value)} required /></Field>
                  <Field label="City"><input className="input-light" value={form.city} onChange={e => set('city', e.target.value)} /></Field>
                  <Field label="State"><input className="input-light" value={form.state} onChange={e => set('state', e.target.value)} /></Field>
                </div>
              </div>
              <div>
                <h3 className="font-display italic font-black text-xl mb-4 text-brand-navy">Logistics Experience</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Years in Brokerage / Logistics">
                    <select className="input-light" value={form.yearsExperience} onChange={e => set('yearsExperience', e.target.value)}>
                      <option value="">Select...</option><option>Less than 1 year</option><option>1-3 years</option><option>3-5 years</option><option>5-10 years</option><option>10+ years</option>
                    </select>
                  </Field>
                  <Field label="Current / Previous Company"><input className="input-light" value={form.currentCompany} onChange={e => set('currentCompany', e.target.value)} /></Field>
                  <Field label="Book of Business">
                    <select className="input-light" value={form.bookOfBusiness} onChange={e => set('bookOfBusiness', e.target.value)}>
                      <option value="">Select...</option><option>None yet</option><option>Small (1-5 active accounts)</option><option>Medium (6-20 accounts)</option><option>Large (20+ accounts)</option>
                    </select>
                  </Field>
                  <Field label="Approx Monthly Revenue (USD)"><input className="input-light" placeholder="$" value={form.monthlyRevenue} onChange={e => set('monthlyRevenue', e.target.value)} /></Field>
                </div>
                <div className="mt-4">
                  <span className="text-xs font-bold text-brand-navy/60 uppercase tracking-wider mb-2 block">Specialties</span>
                  <div className="flex flex-wrap gap-2">
                    {['Dry Van', 'Reefer', 'Flatbed', 'LTL', 'Expedited', 'Intermodal', 'Cross Border', 'Specialized'].map(s => (
                      <button type="button" key={s} onClick={() => toggleSpec(s)} className={`px-3 py-1.5 rounded-full border text-xs font-bold transition ${form.specialties.includes(s) ? 'bg-gradient-to-r from-orange-400 to-orange-600 border-transparent text-white' : 'border-brand-light3 text-brand-navy/70 hover:border-orange-400'}`}>
                        {form.specialties.includes(s) && '✓ '}{s}
                      </button>
                    ))}
                  </div>
                </div>
                <Field label="Why do you want to join SFam Logistics?" className="mt-4"><textarea className="input-light min-h-[80px]" value={form.whyJoin} onChange={e => set('whyJoin', e.target.value)} /></Field>
              </div>
              <div>
                <h3 className="font-display italic font-black text-xl mb-4 text-brand-navy flex items-center gap-2"><Upload className="w-5 h-5 text-orange-500" /> Resume / Documents</h3>
                <label className="block">
                  <div className="relative bg-brand-light border border-brand-light3 rounded-xl p-4 cursor-pointer hover:border-orange-400/60 transition">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => set('resume', e.target.files?.[0])} accept=".pdf,.doc,.docx" />
                    <div className="flex items-center gap-3">
                      <Upload className="w-6 h-6 text-orange-500" />
                      <div>
                        {form.resume ? (
                          <>
                            <div className="text-sm font-semibold text-brand-navy">{form.resume.name}</div>
                            <div className="text-xs text-emerald-600">Ready ({Math.round(form.resume.size / 1024)} KB)</div>
                          </>
                        ) : (
                          <>
                            <div className="text-sm text-brand-navy">Upload Resume</div>
                            <div className="text-xs text-brand-navy/50">PDF, DOC, DOCX</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              <button type="submit" disabled={submitting} className="w-full py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-brand-navy font-bold text-sm uppercase tracking-wider hover:-translate-y-0.5 transition disabled:opacity-50">{submitting ? 'Submitting...' : <>Submit Application</>}</button>
              <p className="text-xs text-center text-brand-navy/40">By submitting, you confirm you are applying as an independent contractor — not an employee.</p>
            </form>

            <aside className="space-y-4">
              <div className="bg-white border border-brand-light3 rounded-xl p-5">
                <Award className="w-8 h-8 text-orange-500 mb-3" />
                <h3 className="font-display italic font-black text-base mb-3 text-brand-navy">Why Choose SFam?</h3>
                <ul className="space-y-2 text-xs text-brand-navy/70">
                  {['Driver-built leadership', 'Weekly commission pay', 'No territory restrictions', 'Carrier compliance handled', 'Full TMS access', 'Transparent commissions'].map(b => (
                    <li key={b} className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" /> {b}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-light border border-brand-light3 rounded-xl p-5">
                <Phone className="w-6 h-6 text-orange-500 mb-2" />
                <div className="font-display italic font-black text-sm text-brand-navy">Talk to Recruiting</div>
                <a href="tel:+18886985556" className="text-orange-500 font-bold text-lg">1 (888) 698-5556</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-bold text-brand-navy/60 uppercase tracking-wider mb-1 block">{label}</span>
      {children}
    </label>
  )
}
