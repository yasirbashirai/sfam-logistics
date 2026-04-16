import { useState } from 'react'
import { CheckCircle2, Upload, DollarSign, Briefcase, TrendingUp, Users, Award, Star, Phone, ArrowRight } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { useSubmissions, uploadFiles } from '../context/SubmissionsContext.jsx'
import IMG from '../data/images.js'

export default function AgentOpportunities() {
  const { add } = useSubmissions()
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
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
    setSubmitting(false); setDone(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (done) return (
    <section className="min-h-[80vh] flex items-center pt-32 pb-20 relative overflow-hidden">
      <Orbs />
      <div className="container-x relative max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 grid place-items-center mx-auto mb-6"><CheckCircle2 className="w-12 h-12" /></div>
        <h1 className="font-display italic font-black text-5xl mb-4">Application Received!</h1>
        <p className="text-white/70 text-lg mb-8">Thanks for your interest in joining SFam Logistics. Our recruiting team will review your application and reach out within 48 hours.</p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </section>
  )

  return (
    <>
      <PageMeta title="Independent Freight Agent Opportunities" description="Join SFam Logistics as an independent freight agent. 70/30+ commission splits, AscendTMS access, full back-office support, and same-day pay options through OTR Solutions." />
      <PageHero eyebrow="Join Our Team" title={<>Independent Freight <span className="text-orange-400">Agent Opportunities</span></>} subtitle="Own your book. Set your hours. Get the back-office support and tech you need to scale." image={IMG.teamMeeting} />

      {/* ===== 1. WHY SFAM ===== */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="badge mb-4 mx-auto">Why Top Agents Join Us</div>
              <h2 className="font-display italic font-black text-5xl">Build Your Book. <span className="text-orange-400">Grow Your Income.</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { i: DollarSign, t: 'Top Splits', d: 'Industry-leading commission splits — keep more of what you earn.' },
              { i: Briefcase, t: 'Full Back Office', d: 'Carrier vetting, billing, collections, claims — all handled for you.' },
              { i: TrendingUp, t: 'Modern Tech', d: 'TMS, load board access, automated rate confirmations.' },
              { i: Users, t: 'Real Support', d: 'Dedicated agent success team. You\'re never alone.' }
            ].map(({ i: Icon, t, d }, idx) => (
              <Reveal key={t} delay={idx * 100}>
                <div className="glass-strong p-7 hover:border-orange-400/40 hover:-translate-y-1 transition group h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-5 group-hover:rotate-6 transition shadow-lg shadow-orange-500/30"><Icon className="w-7 h-7 text-brand-navy" /></div>
                  <div className="font-display italic font-black text-xl mb-2">{t}</div>
                  <div className="text-sm text-white/60">{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. EARNINGS / IMAGE ===== */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/30 to-transparent">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 bg-orange-400/20 blur-3xl rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-orange-400/30 aspect-square">
                <img src={IMG.laptopMap} alt="Agent at work" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <div className="badge mb-4">Earn What You're Worth</div>
              <h2 className="font-display italic font-black text-5xl mb-6">No Cap. <span className="text-orange-400">No Territory Limits.</span></h2>
              <div className="divider-glow w-32 mb-6" />
              <p className="text-white/70 text-lg mb-8">Top SFam agents are earning six figures — and we're just getting started. Bring your book, your work ethic, and your relationships. We&apos;ll bring the carriers, the tech, and the back office.</p>
              <div className="grid grid-cols-2 gap-4">
                {[['70/30+', 'Commission Split'], ['Same-Day', 'Pay Available'], ['$0', 'Setup Cost'], ['Open', 'Territory']].map(([n, l]) => (
                  <div key={l} className="glass p-5">
                    <div className="text-3xl font-display italic font-black text-orange-400">{n}</div>
                    <div className="text-xs text-white/60 uppercase tracking-widest mt-1 font-bold">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 3. APPLICATION ===== */}
      <section className="section">
        <Orbs />
        <div className="container-x relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="badge mb-4 mx-auto">Application</div>
              <h2 className="font-display italic font-black text-5xl">Apply <span className="text-orange-400">In Minutes</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-8">
            <form onSubmit={submit} className="lg:col-span-2 glass-strong p-7 lg:p-10 space-y-8">
              <div>
                <h3 className="font-display italic font-black text-2xl mb-5">Contact Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name *"><input className="input" value={form.name} onChange={e => set('name', e.target.value)} required /></Field>
                  <Field label="Email *"><input type="email" className="input" value={form.email} onChange={e => set('email', e.target.value)} required /></Field>
                  <Field label="Phone *"><input className="input" value={form.phone} onChange={e => set('phone', e.target.value)} required /></Field>
                  <Field label="City"><input className="input" value={form.city} onChange={e => set('city', e.target.value)} /></Field>
                  <Field label="State"><input className="input" value={form.state} onChange={e => set('state', e.target.value)} /></Field>
                </div>
              </div>
              <div>
                <h3 className="font-display italic font-black text-2xl mb-5">Logistics Experience</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Years in Brokerage / Logistics">
                    <select className="select" value={form.yearsExperience} onChange={e => set('yearsExperience', e.target.value)}>
                      <option value="">Select...</option><option>Less than 1 year</option><option>1-3 years</option><option>3-5 years</option><option>5-10 years</option><option>10+ years</option>
                    </select>
                  </Field>
                  <Field label="Current / Previous Company"><input className="input" value={form.currentCompany} onChange={e => set('currentCompany', e.target.value)} /></Field>
                  <Field label="Book of Business">
                    <select className="select" value={form.bookOfBusiness} onChange={e => set('bookOfBusiness', e.target.value)}>
                      <option value="">Select...</option><option>None yet</option><option>Small (1-5 active accounts)</option><option>Medium (6-20 accounts)</option><option>Large (20+ accounts)</option>
                    </select>
                  </Field>
                  <Field label="Approx Monthly Revenue (USD)"><input className="input" placeholder="$" value={form.monthlyRevenue} onChange={e => set('monthlyRevenue', e.target.value)} /></Field>
                </div>
                <div className="mt-5">
                  <span className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3 block">Specialties</span>
                  <div className="flex flex-wrap gap-3">
                    {['Dry Van', 'Reefer', 'Flatbed', 'LTL', 'Expedited', 'Intermodal', 'Cross Border', 'Specialized'].map(s => (
                      <button type="button" key={s} onClick={() => toggleSpec(s)} className={`px-4 py-2 rounded-full border text-sm font-bold transition ${form.specialties.includes(s) ? 'bg-gradient-to-r from-orange-400 to-orange-600 border-transparent text-brand-navy' : 'border-white/15 text-white/70 hover:border-orange-400'}`}>
                        {form.specialties.includes(s) && '✓ '}{s}
                      </button>
                    ))}
                  </div>
                </div>
                <Field label="Why do you want to join SFam Logistics?" className="mt-5"><textarea className="textarea" value={form.whyJoin} onChange={e => set('whyJoin', e.target.value)} /></Field>
              </div>
              <div>
                <h3 className="font-display italic font-black text-2xl mb-5 flex items-center gap-3"><Upload className="w-6 h-6 text-orange-400" /> Resume / Documents</h3>
                <label className="block">
                  <div className="relative glass p-6 cursor-pointer hover:border-orange-400/60 transition">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => set('resume', e.target.files?.[0])} accept=".pdf,.doc,.docx" />
                    <div className="flex items-center gap-4">
                      <Upload className="w-8 h-8 text-orange-400" />
                      <div>
                        {form.resume ? (
                          <>
                            <div className="font-semibold">{form.resume.name}</div>
                            <div className="text-xs text-emerald-400">✓ Ready ({Math.round(form.resume.size / 1024)} KB)</div>
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
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">{submitting ? 'Submitting...' : <>Submit Application <CheckCircle2 className="w-5 h-5" /></>}</button>
              <p className="text-xs text-center text-white/40">By submitting, you confirm you are applying as an independent contractor — not an employee.</p>
            </form>

            <aside className="space-y-6">
              <div className="glass-strong p-7">
                <Award className="w-10 h-10 text-orange-400 mb-4" />
                <h3 className="font-display italic font-black text-xl mb-3">Why Choose SFam?</h3>
                <ul className="space-y-3 text-sm text-white/70">
                  {['Driver-built leadership', 'Same-day pay options', 'No territory restrictions', 'Carrier compliance handled', 'Full TMS access', 'Transparent commissions'].map(b => (
                    <li key={b} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" /> {b}</li>
                  ))}
                </ul>
              </div>
              <div className="glass p-7">
                <Phone className="w-8 h-8 text-orange-400 mb-3" />
                <div className="font-display italic font-black text-lg">Talk to Recruiting</div>
                <a href="tel:+18886985556" className="text-orange-400 font-bold text-xl">1 (888) 698-5556</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== 4. AGENT TESTIMONIALS ===== */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/30 to-transparent">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="badge mb-4 mx-auto">From Our Agents</div>
              <h2 className="font-display italic font-black text-5xl">Hear From <span className="text-orange-400">The Team</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: 'Rachel S.', r: 'Senior Agent, 6 yrs', q: 'I doubled my income within 12 months at SFam. The back office is real and the tech actually works.' },
              { n: 'Tom J.', r: 'Agent, 2 yrs', q: 'Best decision I made. Splits are top of market and dispatch never drops a load. Easy recommendation.' },
              { n: 'Linda K.', r: 'Senior Agent, 4 yrs', q: 'Coming from a big shop, the difference is night and day. They actually care about your book.' }
            ].map((t, i) => (
              <Reveal key={t.n} delay={i * 120}>
                <div className="glass-strong p-7 h-full">
                  <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />)}</div>
                  <p className="text-white/80 italic mb-5">&ldquo;{t.q}&rdquo;</p>
                  <div className="pt-4 border-t border-white/10">
                    <div className="font-display italic font-bold">{t.n}</div>
                    <div className="text-xs text-white/50">{t.r}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">{label}</span>
      {children}
    </label>
  )
}
