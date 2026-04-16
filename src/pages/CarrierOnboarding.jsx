import { useState } from 'react'
import { CheckCircle2, Upload, Truck, ShieldCheck, FileText, Camera, DollarSign, Phone, Clock, Heart, Star, ArrowRight, Wallet, Headphones } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { useSubmissions, uploadFiles } from '../context/SubmissionsContext.jsx'
import IMG from '../data/images.js'

export default function CarrierOnboarding() {
  const { add } = useSubmissions()
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    company: '', mc: '', dot: '', contactName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    fleetSize: '', equipmentTypes: [], lanes: '',
    files: { mc: null, insurance: null, w9: null, truck: null }
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setFile = (k, file) => setForm(f => ({ ...f, files: { ...f.files, [k]: file } }))
  const toggleEq = (eq) => setForm(f => ({ ...f, equipmentTypes: f.equipmentTypes.includes(eq) ? f.equipmentTypes.filter(x => x !== eq) : [...f.equipmentTypes, eq] }))

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const filesToUpload = Object.values(form.files).filter(Boolean)
    const uploaded = filesToUpload.length ? await uploadFiles(filesToUpload) : []
    await add('carriers', { ...form, uploadedFiles: uploaded, files: undefined })
    setSubmitting(false); setDone(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (done) return (
    <section className="min-h-[80vh] flex items-center pt-32 pb-20 relative overflow-hidden">
      <Orbs />
      <div className="container-x relative max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 grid place-items-center mx-auto mb-6"><CheckCircle2 className="w-12 h-12" /></div>
        <h1 className="font-display italic font-black text-5xl mb-4">Welcome Aboard!</h1>
        <p className="text-white/70 text-lg mb-8">Your carrier application has been received. Our team will verify your authority and insurance and reach out within 24 hours.</p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </section>
  )

  return (
    <>
      <PageMeta title="Carrier Onboarding — Haul for SFam Logistics" description="Join SFam Logistics carrier network. Same-day pay options through OTR Solutions, fair market rates, 24/7 dispatch, and driver respect. Apply and get approved in 24 hours." />
      <PageHero eyebrow="Carrier Onboarding" title={<>Haul For <span className="text-orange-400">SFam Logistics</span></>} subtitle="Fast pay. Fair rates. Real respect. Join our vetted carrier network in 24 hours." image={IMG.heroFleet} />

      {/* ===== 1. WHY HAUL FOR SFAM ===== */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="badge mb-4 mx-auto">Why Drivers Love Us</div>
              <h2 className="font-display italic font-black text-5xl">A Broker That <span className="text-orange-400">Pays Fast.</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
              <p className="mt-6 text-white/70 text-lg">Stop chasing checks. Stop waiting on hold. We treat carriers like the partners they are.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { i: Wallet, t: 'Same-Day Pay Options', d: 'Quick-pay available on every load. Get paid in days, not weeks.' },
              { i: DollarSign, t: 'Fair Market Rates', d: 'We share market data and pay competitive rates — no lowballing.' },
              { i: Headphones, t: '24/7 Real Dispatch', d: 'A real human, every time. No phone trees, no missed calls.' },
              { i: Heart, t: 'Driver Respect', d: 'No surprise detention disputes. We pay what we owe — period.' }
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

      {/* ===== 2. APPLICATION FORM ===== */}
      <section className="section pt-0">
        <Orbs />
        <div className="container-x relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="badge mb-4 mx-auto">Application</div>
              <h2 className="font-display italic font-black text-5xl">Sign Up <span className="text-orange-400">In Minutes</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-8">
            <form onSubmit={submit} className="lg:col-span-2 glass-strong p-7 lg:p-10 space-y-8">
              <div>
                <h3 className="font-display italic font-black text-2xl mb-5 flex items-center gap-3"><Truck className="w-6 h-6 text-orange-400" /> Company Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Legal Company Name *"><input className="input" value={form.company} onChange={e => set('company', e.target.value)} required /></Field>
                  <Field label="MC Number *"><input className="input" value={form.mc} onChange={e => set('mc', e.target.value)} required /></Field>
                  <Field label="DOT Number *"><input className="input" value={form.dot} onChange={e => set('dot', e.target.value)} required /></Field>
                  <Field label="Fleet Size">
                    <select className="select" value={form.fleetSize} onChange={e => set('fleetSize', e.target.value)}>
                      <option value="">Select...</option><option>1 truck</option><option>2-5 trucks</option><option>6-15 trucks</option><option>16-50 trucks</option><option>50+ trucks</option>
                    </select>
                  </Field>
                </div>
              </div>

              <div>
                <h3 className="font-display italic font-black text-2xl mb-5">Contact Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Contact Name *"><input className="input" value={form.contactName} onChange={e => set('contactName', e.target.value)} required /></Field>
                  <Field label="Email *"><input type="email" className="input" value={form.email} onChange={e => set('email', e.target.value)} required /></Field>
                  <Field label="Phone *"><input className="input" value={form.phone} onChange={e => set('phone', e.target.value)} required /></Field>
                  <Field label="Street Address"><input className="input" value={form.address} onChange={e => set('address', e.target.value)} /></Field>
                  <Field label="City"><input className="input" value={form.city} onChange={e => set('city', e.target.value)} /></Field>
                  <Field label="State"><input className="input" value={form.state} onChange={e => set('state', e.target.value)} /></Field>
                  <Field label="ZIP"><input className="input" value={form.zip} onChange={e => set('zip', e.target.value)} /></Field>
                </div>
              </div>

              <div>
                <h3 className="font-display italic font-black text-2xl mb-5">Equipment Types</h3>
                <div className="flex flex-wrap gap-3">
                  {['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Power Only', 'Hotshot', 'Sprinter', 'Tanker'].map(eq => (
                    <button type="button" key={eq} onClick={() => toggleEq(eq)} className={`px-4 py-2 rounded-full border text-sm font-bold transition ${form.equipmentTypes.includes(eq) ? 'bg-gradient-to-r from-orange-400 to-orange-600 border-transparent text-brand-navy' : 'border-white/15 text-white/70 hover:border-orange-400'}`}>
                      {form.equipmentTypes.includes(eq) && '✓ '}{eq}
                    </button>
                  ))}
                </div>
                <Field label="Preferred Lanes" className="mt-5"><textarea className="textarea" value={form.lanes} onChange={e => set('lanes', e.target.value)} placeholder="e.g. PNW to CA, TX to Midwest, OTR" /></Field>
              </div>

              <div>
                <h3 className="font-display italic font-black text-2xl mb-5 flex items-center gap-3"><Upload className="w-6 h-6 text-orange-400" /> Required Documents</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <FileUpload icon={ShieldCheck} label="MC Authority" file={form.files.mc} onChange={f => setFile('mc', f)} />
                  <FileUpload icon={ShieldCheck} label="Certificate of Insurance" file={form.files.insurance} onChange={f => setFile('insurance', f)} />
                  <FileUpload icon={FileText} label="W-9" file={form.files.w9} onChange={f => setFile('w9', f)} />
                  <FileUpload icon={Camera} label="Photo of Truck" file={form.files.truck} onChange={f => setFile('truck', f)} />
                </div>
                <p className="text-xs text-white/40 mt-3">Documents are stored securely and only accessible from the admin dashboard.</p>
              </div>

              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">{submitting ? 'Submitting...' : <>Submit Application <CheckCircle2 className="w-5 h-5" /></>}</button>
            </form>

            <aside className="space-y-6">
              <div className="glass-strong p-7">
                <h3 className="font-display italic font-black text-2xl mb-4">Approved In <span className="text-orange-400">24 Hours</span></h3>
                <div className="space-y-3 text-sm text-white/70">
                  {['Submit your application', 'We verify MC, DOT, insurance', 'Sign carrier-broker agreement', 'Start hauling SFam loads'].map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-orange-400/20 border border-orange-400 grid place-items-center text-orange-400 font-bold text-xs shrink-0">{i + 1}</div>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass p-7">
                <Phone className="w-8 h-8 text-orange-400 mb-3" />
                <div className="font-display italic font-black text-lg">Carrier Dispatch</div>
                <a href="tel:+18886985556" className="text-orange-400 font-bold text-xl">1 (888) 698-5556</a>
                <div className="text-xs text-white/50 mt-2">Available 24/7 for active carriers</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== 3. FOUNDING PARTNERS MESSAGE ===== */}
      <section className="section bg-gradient-to-b from-transparent via-brand-navy3/30 to-transparent">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="glass-strong neon-border p-10 lg:p-14 text-center">
              <div className="text-5xl mb-6">🤝</div>
              <h2 className="font-display italic font-black text-3xl mb-6">Join Our <span className="text-orange-400">Growing Network</span></h2>
              <p className="text-white/80 text-xl italic leading-relaxed">&ldquo;We are just getting started — and we are building our reputation one load and one relationship at a time. Be one of our founding partners.&rdquo;</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 4. FAQ ===== */}
      <section className="section">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="text-center mb-10">
              <div className="badge mb-3 mx-auto">FAQ</div>
              <h2 className="font-display italic font-black text-5xl">Carrier <span className="text-orange-400">Questions</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="space-y-4">
            {[
              { q: 'How fast do you pay?', a: 'Standard pay is Net-30 from receipt of POD/invoice. Quick-pay is available for a small discount — same-day or 48-hour funding.' },
              { q: 'What insurance do you require?', a: 'Active MC authority, $1M auto liability, $100K cargo minimum, and current W-9. We name SFam Logistics as additional insured.' },
              { q: 'Do you offer dedicated lanes?', a: 'Yes — we have weekly and monthly dedicated lanes available for carriers who maintain consistent service.' },
              { q: 'How do I get loads after I sign up?', a: 'You\'ll be added to our preferred carrier network and contacted directly for matching loads, plus invited to view our load board.' }
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

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">{label}</span>
      {children}
    </label>
  )
}

function FileUpload({ icon: Icon, label, file, onChange }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2 block">{label}</span>
      <div className="relative glass p-4 cursor-pointer hover:border-orange-400/60 transition">
        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => onChange(e.target.files?.[0])} accept=".pdf,.jpg,.jpeg,.png" />
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-orange-400 shrink-0" />
          <div className="min-w-0 flex-1">
            {file ? (
              <>
                <div className="text-sm font-semibold truncate">{file.name}</div>
                <div className="text-xs text-emerald-400">✓ Ready ({Math.round(file.size / 1024)} KB)</div>
              </>
            ) : (
              <>
                <div className="text-sm">Click to upload</div>
                <div className="text-xs text-white/40">PDF, JPG, PNG</div>
              </>
            )}
          </div>
        </div>
      </div>
    </label>
  )
}
