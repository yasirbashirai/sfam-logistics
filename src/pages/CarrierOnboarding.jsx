import { useState } from 'react'
import { CheckCircle2, Upload, Truck, ShieldCheck, FileText, Camera } from 'lucide-react'
import { PageHero, Orbs } from '../components/Section.jsx'
import { useSubmissions } from '../context/SubmissionsContext.jsx'

export default function CarrierOnboarding() {
  const { add } = useSubmissions()
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    company: '', mc: '', dot: '', contactName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    fleetSize: '', equipmentTypes: [], lanes: '',
    files: { mc: null, insurance: null, w9: null, truck: null }
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setFile = (k, file) => setForm(f => ({ ...f, files: { ...f.files, [k]: file ? { name: file.name, size: file.size, type: file.type } : null } }))
  const toggleEq = (eq) => setForm(f => ({ ...f, equipmentTypes: f.equipmentTypes.includes(eq) ? f.equipmentTypes.filter(x => x !== eq) : [...f.equipmentTypes, eq] }))

  const submit = (e) => {
    e.preventDefault()
    add('carriers', form)
    setDone(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (done) return (
    <section className="min-h-[80vh] flex items-center pt-32 pb-20 relative overflow-hidden">
      <Orbs />
      <div className="container-x relative max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 grid place-items-center mx-auto mb-6"><CheckCircle2 className="w-12 h-12" /></div>
        <h1 className="font-display font-bold text-5xl mb-4">Welcome Aboard!</h1>
        <p className="text-white/70 mb-8">Your carrier application has been received. Our team will verify your authority and insurance and reach out within 24 hours.</p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </section>
  )

  return (
    <>
      <PageHero eyebrow="Carrier Onboarding" title={<>Haul For <span className="gradient-text">SFam Logistics</span></>} subtitle="Fast pay. Fair rates. Real respect. Complete the form below to join our vetted carrier network." />

      <section className="section pt-0">
        <Orbs />
        <div className="container-x relative grid lg:grid-cols-3 gap-8">
          <form onSubmit={submit} className="lg:col-span-2 glass-strong p-7 lg:p-10 space-y-8">
            <div>
              <h3 className="font-display font-bold text-2xl mb-5 flex items-center gap-3"><Truck className="w-6 h-6 text-orange-400" /> Company Information</h3>
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
              <h3 className="font-display font-bold text-2xl mb-5">Contact Details</h3>
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
              <h3 className="font-display font-bold text-2xl mb-5">Equipment Types</h3>
              <div className="flex flex-wrap gap-3">
                {['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Power Only', 'Hotshot', 'Sprinter', 'Tanker'].map(eq => (
                  <button type="button" key={eq} onClick={() => toggleEq(eq)} className={`px-4 py-2 rounded-full border text-sm font-medium transition ${form.equipmentTypes.includes(eq) ? 'bg-gradient-to-r from-orange-500 to-purple-600 border-transparent' : 'border-white/15 text-white/70 hover:border-orange-400'}`}>
                    {form.equipmentTypes.includes(eq) && '✓ '}{eq}
                  </button>
                ))}
              </div>
              <Field label="Preferred Lanes" className="mt-5"><textarea className="textarea" value={form.lanes} onChange={e => set('lanes', e.target.value)} placeholder="e.g. PNW to CA, TX to Midwest, OTR" /></Field>
            </div>

            <div>
              <h3 className="font-display font-bold text-2xl mb-5 flex items-center gap-3"><Upload className="w-6 h-6 text-orange-400" /> Required Documents</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <FileUpload icon={ShieldCheck} label="MC Authority" k="mc" file={form.files.mc} onChange={f => setFile('mc', f)} />
                <FileUpload icon={ShieldCheck} label="Certificate of Insurance" k="insurance" file={form.files.insurance} onChange={f => setFile('insurance', f)} />
                <FileUpload icon={FileText} label="W-9" k="w9" file={form.files.w9} onChange={f => setFile('w9', f)} />
                <FileUpload icon={Camera} label="Photo of Truck" k="truck" file={form.files.truck} onChange={f => setFile('truck', f)} />
              </div>
              <p className="text-xs text-white/40 mt-3">Documents are stored securely and only accessible from the admin dashboard.</p>
            </div>

            <button type="submit" className="btn-primary w-full">Submit Application <CheckCircle2 className="w-5 h-5" /></button>
          </form>

          <aside className="glass p-7 h-fit lg:sticky lg:top-28 space-y-5">
            <h3 className="font-display font-bold text-xl">Why Carriers Love Us</h3>
            {[
              ['Fast Pay Options', 'Quick pay available — get paid in days, not weeks.'],
              ['Fair Rates', 'We share market data and pay fair market rates.'],
              ['Driver Respect', 'No surprise detention disputes. We pay what we owe.'],
              ['Real Communication', '24/7 dispatch — we answer the phone.']
            ].map(([t, d]) => (
              <div key={t} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">{t}</div>
                  <div className="text-xs text-white/60">{d}</div>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-white/10 text-sm text-white/60">
              <div>📞 Carrier dispatch:</div>
              <a href="tel:+18886985556" className="text-orange-300 font-semibold">1 (888) 698-5556</a>
            </div>
          </aside>
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

function FileUpload({ icon: Icon, label, k, file, onChange }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">{label}</span>
      <div className="relative glass p-4 cursor-pointer hover:border-orange-400/60 transition">
        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => onChange(e.target.files?.[0])} accept=".pdf,.jpg,.jpeg,.png" />
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-orange-400 shrink-0" />
          <div className="min-w-0 flex-1">
            {file ? (
              <>
                <div className="text-sm font-semibold truncate">{file.name}</div>
                <div className="text-xs text-emerald-400">✓ Uploaded ({Math.round(file.size / 1024)} KB)</div>
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
