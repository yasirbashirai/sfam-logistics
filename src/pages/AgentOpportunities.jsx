import { useState } from 'react'
import { CheckCircle2, Upload, DollarSign, Briefcase, TrendingUp, Users, Award } from 'lucide-react'
import { PageHero, Orbs } from '../components/Section.jsx'
import { useSubmissions } from '../context/SubmissionsContext.jsx'

export default function AgentOpportunities() {
  const { add } = useSubmissions()
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '', state: '',
    yearsExperience: '', currentCompany: '', bookOfBusiness: '', monthlyRevenue: '',
    specialties: [], whyJoin: '',
    resume: null
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleSpec = (s) => setForm(f => ({ ...f, specialties: f.specialties.includes(s) ? f.specialties.filter(x => x !== s) : [...f.specialties, s] }))
  const setResume = (file) => setForm(f => ({ ...f, resume: file ? { name: file.name, size: file.size } : null }))

  const submit = (e) => {
    e.preventDefault()
    add('agents', form)
    setDone(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (done) return (
    <section className="min-h-[80vh] flex items-center pt-32 pb-20 relative overflow-hidden">
      <Orbs />
      <div className="container-x relative max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 grid place-items-center mx-auto mb-6"><CheckCircle2 className="w-12 h-12" /></div>
        <h1 className="font-display font-bold text-5xl mb-4">Application Received!</h1>
        <p className="text-white/70 mb-8">Thanks for your interest in joining SFam Logistics as an independent freight agent. Our recruiting team will review your application and reach out within 48 hours.</p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </section>
  )

  return (
    <>
      <PageHero eyebrow="Join Our Team" title={<>Independent Freight <span className="gradient-text">Agent Opportunities</span></>} subtitle="Own your book. Set your hours. Get the back-office support and tech you need to scale. We're recruiting experienced agents nationwide." />

      <section className="section pt-0">
        <Orbs />
        <div className="container-x relative">
          <div className="grid md:grid-cols-4 gap-5 mb-14">
            {[
              { i: DollarSign, t: 'Top Splits', d: 'Industry-leading commission splits on every load you book.' },
              { i: Briefcase, t: 'Full Back Office', d: 'Carrier vetting, billing, collections, claims — all handled.' },
              { i: TrendingUp, t: 'Modern Tech', d: 'TMS, load board access, automated rate confirmations.' },
              { i: Users, t: 'Real Support', d: 'Dedicated agent success team. You\'re never alone.' }
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="glass p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-purple-600 grid place-items-center mb-4"><Icon className="w-6 h-6" /></div>
                <h4 className="font-display font-bold text-lg mb-1">{t}</h4>
                <p className="text-sm text-white/60">{d}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <form onSubmit={submit} className="lg:col-span-2 glass-strong p-7 lg:p-10 space-y-8">
              <div>
                <h3 className="font-display font-bold text-2xl mb-5">Contact Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name *"><input className="input" value={form.name} onChange={e => set('name', e.target.value)} required /></Field>
                  <Field label="Email *"><input type="email" className="input" value={form.email} onChange={e => set('email', e.target.value)} required /></Field>
                  <Field label="Phone *"><input className="input" value={form.phone} onChange={e => set('phone', e.target.value)} required /></Field>
                  <Field label="City"><input className="input" value={form.city} onChange={e => set('city', e.target.value)} /></Field>
                  <Field label="State"><input className="input" value={form.state} onChange={e => set('state', e.target.value)} /></Field>
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl mb-5">Logistics Experience</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Years in Brokerage / Logistics">
                    <select className="select" value={form.yearsExperience} onChange={e => set('yearsExperience', e.target.value)}>
                      <option value="">Select...</option><option>Less than 1 year</option><option>1-3 years</option><option>3-5 years</option><option>5-10 years</option><option>10+ years</option>
                    </select>
                  </Field>
                  <Field label="Current / Previous Company"><input className="input" value={form.currentCompany} onChange={e => set('currentCompany', e.target.value)} /></Field>
                  <Field label="Book of Business (optional)">
                    <select className="select" value={form.bookOfBusiness} onChange={e => set('bookOfBusiness', e.target.value)}>
                      <option value="">Select...</option><option>None yet</option><option>Small (1-5 active accounts)</option><option>Medium (6-20 accounts)</option><option>Large (20+ accounts)</option>
                    </select>
                  </Field>
                  <Field label="Approx Monthly Revenue (USD)"><input className="input" placeholder="$" value={form.monthlyRevenue} onChange={e => set('monthlyRevenue', e.target.value)} /></Field>
                </div>
                <div className="mt-5">
                  <span className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 block">Specialties</span>
                  <div className="flex flex-wrap gap-3">
                    {['Dry Van', 'Reefer', 'Flatbed', 'LTL', 'Expedited', 'Intermodal', 'Cross Border', 'Specialized'].map(s => (
                      <button type="button" key={s} onClick={() => toggleSpec(s)} className={`px-4 py-2 rounded-full border text-sm font-medium transition ${form.specialties.includes(s) ? 'bg-gradient-to-r from-orange-500 to-purple-600 border-transparent' : 'border-white/15 text-white/70 hover:border-orange-400'}`}>
                        {form.specialties.includes(s) && '✓ '}{s}
                      </button>
                    ))}
                  </div>
                </div>
                <Field label="Why do you want to join SFam Logistics?" className="mt-5"><textarea className="textarea" value={form.whyJoin} onChange={e => set('whyJoin', e.target.value)} /></Field>
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl mb-5 flex items-center gap-3"><Upload className="w-6 h-6 text-orange-400" /> Resume / Documents</h3>
                <label className="block">
                  <div className="relative glass p-6 cursor-pointer hover:border-orange-400/60 transition">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setResume(e.target.files?.[0])} accept=".pdf,.doc,.docx" />
                    <div className="flex items-center gap-4">
                      <Upload className="w-8 h-8 text-orange-400" />
                      <div>
                        {form.resume ? (
                          <>
                            <div className="font-semibold">{form.resume.name}</div>
                            <div className="text-xs text-emerald-400">✓ Ready to submit ({Math.round(form.resume.size / 1024)} KB)</div>
                          </>
                        ) : (
                          <>
                            <div className="font-semibold">Upload Resume</div>
                            <div className="text-xs text-white/50">PDF, DOC, DOCX</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              <button type="submit" className="btn-primary w-full">Submit Agent Application <CheckCircle2 className="w-5 h-5" /></button>
              <p className="text-xs text-center text-white/40">By submitting, you confirm you are applying as an independent contractor — not an employee.</p>
            </form>

            <aside className="glass p-7 h-fit lg:sticky lg:top-28">
              <Award className="w-10 h-10 text-orange-400 mb-4" />
              <h3 className="font-display font-bold text-xl mb-3">Why Choose SFam?</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Driver-built leadership team</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Same-day pay options on commissions</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> No territory restrictions</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Carrier compliance handled for you</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Full TMS &amp; load board access</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Transparent commission tracking</li>
              </ul>
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
      <span className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">{label}</span>
      {children}
    </label>
  )
}
