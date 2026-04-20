import { useState, useMemo } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle2, Calculator, MapPin, Package, User } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import { useSubmissions } from '../context/SubmissionsContext.jsx'
import { haversineMiles, lookupZip } from '../data/zips.js'

const STEPS = ['Lane', 'Freight', 'Contact', 'Review']

export default function Quote() {
  const { add } = useSubmissions()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    originCity: '', originZip: '', destCity: '', destZip: '',
    pickupDate: '', deliveryDate: '',
    freightType: 'Full Truckload (FTL)', equipment: 'Dry Van',
    weight: '', pallets: '', length: '', width: '', height: '',
    commodity: '', hazmat: false, temp: '',
    name: '', company: '', email: '', phone: '', notes: ''
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  // Real haversine-based estimate using ZIP centroid lookup
  const estimate = useMemo(() => {
    const w = parseFloat(form.weight) || 0
    const realDist = haversineMiles(form.originZip, form.destZip)
    const distance = realDist || 0
    const matched = realDist !== null
    const baseRate = form.freightType.includes('LTL') ? 0.55 : 2.45
    let total = form.freightType.includes('LTL') ? Math.max(150, w * 0.22) + distance * 0.65 : distance * baseRate + 250
    if (form.equipment === 'Reefer') total *= 1.18
    if (form.equipment === 'Flatbed') total *= 1.12
    if (form.equipment === 'Step Deck') total *= 1.15
    if (form.hazmat) total *= 1.15
    if (form.freightType === 'Expedited') total *= 1.35
    return {
      distance: Math.round(distance),
      low: Math.round(total * 0.92),
      high: Math.round(total * 1.12),
      matched,
      originName: lookupZip(form.originZip),
      destName: lookupZip(form.destZip)
    }
  }, [form])

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const prev = () => setStep(s => Math.max(s - 1, 0))

  const [showPopup, setShowPopup] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    add('quotes', { ...form, estimate })
    setDone(true)
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 5000)

    // Send automated confirmation email
    if (form.email) {
      try {
        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: form.email,
            name: form.name,
            type: 'quote'
          })
        })
      } catch {}
    }
  }

  if (done) return <SuccessScreen estimate={estimate} showPopup={showPopup} />

  return (
    <>
      <PageMeta title="Get a Free Freight Quote" description="Request a free freight quote from SFam Logistics. FTL, LTL, reefer, flatbed, and expedited shipping. 30-minute response during business hours. Live rate estimator included." />
      <PageHero eyebrow="Request a Quote" title={<>Get Pricing in <span className="gradient-text">Minutes</span></>} subtitle="A 4-step quote form with live rate estimator. Most quotes returned within 30 minutes during business hours. After hours? We'll respond first thing the next business day." />

      <section className="section pt-0">
        <Orbs />
        <div className="container-x relative grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Stepper */}
            <div className="flex items-center justify-between mb-8">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center flex-1 last:flex-initial">
                  <div className={`flex items-center gap-3 ${i <= step ? '' : 'opacity-40'}`}>
                    <div className={`w-10 h-10 rounded-full grid place-items-center font-bold text-sm ${i < step ? 'bg-emerald-500' : i === step ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 'bg-white/10'}`}>
                      {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                    </div>
                    <span className="hidden sm:block text-sm font-semibold">{label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-3 ${i < step ? 'bg-emerald-500' : 'bg-white/10'}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={submit} className="glass-strong p-7 lg:p-10">
              {step === 0 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-2xl flex items-center gap-3"><MapPin className="w-6 h-6 text-orange-400" /> Lane Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Origin City"><input className="input" value={form.originCity} onChange={e => set('originCity', e.target.value)} required /></Field>
                    <Field label="Origin ZIP"><input className="input" value={form.originZip} onChange={e => set('originZip', e.target.value)} required /></Field>
                    <Field label="Destination City"><input className="input" value={form.destCity} onChange={e => set('destCity', e.target.value)} required /></Field>
                    <Field label="Destination ZIP"><input className="input" value={form.destZip} onChange={e => set('destZip', e.target.value)} required /></Field>
                    <Field label="Pickup Date"><input type="date" className="input" value={form.pickupDate} onChange={e => set('pickupDate', e.target.value)} required /></Field>
                    <Field label="Delivery Date (optional)"><input type="date" className="input" value={form.deliveryDate} onChange={e => set('deliveryDate', e.target.value)} /></Field>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-2xl flex items-center gap-3"><Package className="w-6 h-6 text-orange-400" /> Freight Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Freight Type">
                      <select className="select" value={form.freightType} onChange={e => set('freightType', e.target.value)}>
                        <option>Full Truckload (FTL)</option><option>LTL</option><option>Partial Truckload</option><option>Expedited</option>
                      </select>
                    </Field>
                    <Field label="Equipment">
                      <select className="select" value={form.equipment} onChange={e => set('equipment', e.target.value)}>
                        <option>Dry Van</option><option>Reefer</option><option>Flatbed</option><option>Step Deck</option><option>Power Only</option>
                      </select>
                    </Field>
                    <Field label="Total Weight (lbs)"><input className="input" type="number" value={form.weight} onChange={e => set('weight', e.target.value)} required /></Field>
                    <Field label="Pallet Count"><input className="input" type="number" value={form.pallets} onChange={e => set('pallets', e.target.value)} /></Field>
                    <Field label="Commodity"><input className="input" placeholder="e.g. machinery, food grade, electronics" value={form.commodity} onChange={e => set('commodity', e.target.value)} /></Field>
                    <Field label="Temperature (if reefer)"><input className="input" placeholder="e.g. 34°F" value={form.temp} onChange={e => set('temp', e.target.value)} /></Field>
                  </div>
                  <label className="flex items-center gap-3 text-sm text-white/70">
                    <input type="checkbox" checked={form.hazmat} onChange={e => set('hazmat', e.target.checked)} className="w-5 h-5 accent-orange-500" />
                    Shipment contains hazardous materials
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-2xl flex items-center gap-3"><User className="w-6 h-6 text-orange-400" /> Contact Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name"><input className="input" value={form.name} onChange={e => set('name', e.target.value)} required /></Field>
                    <Field label="Company"><input className="input" value={form.company} onChange={e => set('company', e.target.value)} required /></Field>
                    <Field label="Email"><input type="email" className="input" value={form.email} onChange={e => set('email', e.target.value)} required /></Field>
                    <Field label="Phone"><input className="input" value={form.phone} onChange={e => set('phone', e.target.value)} required /></Field>
                  </div>
                  <Field label="Additional Notes"><textarea className="textarea" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Special instructions, accessorials, etc." /></Field>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-2xl">Review &amp; Submit</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <Review label="Origin" value={`${form.originCity}, ${form.originZip}`} />
                    <Review label="Destination" value={`${form.destCity}, ${form.destZip}`} />
                    <Review label="Pickup" value={form.pickupDate} />
                    <Review label="Freight" value={`${form.freightType} • ${form.equipment}`} />
                    <Review label="Weight" value={`${form.weight} lbs`} />
                    <Review label="Contact" value={`${form.name} • ${form.phone}`} />
                  </div>
                  <div className="glass p-5 border-orange-400/40">
                    <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Indicative Estimate</div>
                    <div className="text-3xl font-display font-bold gradient-text">${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}</div>
                    <div className="text-xs text-white/50 mt-1">~{estimate.distance} miles • Final pricing confirmed by our team</div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <button type="button" onClick={prev} disabled={step === 0} className="btn-ghost disabled:opacity-30"><ArrowLeft className="w-4 h-4" /> Back</button>
                {step < STEPS.length - 1 ? (
                  <button type="button" onClick={next} className="btn-primary">Continue <ArrowRight className="w-5 h-5" /></button>
                ) : (
                  <button type="submit" className="btn-primary">Submit Quote Request <CheckCircle2 className="w-5 h-5" /></button>
                )}
              </div>
            </form>
          </div>

          <aside className="glass p-7 h-fit lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <Calculator className="w-6 h-6 text-orange-400" />
              <h3 className="font-display font-bold text-xl">Live Estimate</h3>
            </div>
            <div className="text-4xl font-display font-bold gradient-text mb-2">${estimate.low.toLocaleString()}</div>
            <div className="text-sm text-white/50 mb-5">to ${estimate.high.toLocaleString()}</div>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex justify-between"><span className="text-white/50">Distance</span><span>{estimate.distance} mi</span></div>
              <div className="flex justify-between"><span className="text-white/50">Equipment</span><span>{form.equipment}</span></div>
              <div className="flex justify-between"><span className="text-white/50">Weight</span><span>{form.weight || 0} lbs</span></div>
            </div>
            <p className="text-xs text-white/40 mt-6">Estimate is indicative only. Final rate confirmed after review by our brokerage team.</p>
          </aside>
        </div>
      </section>
    </>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">{label}</span>
      {children}
    </label>
  )
}
function Review({ label, value }) {
  return (
    <div className="glass p-4">
      <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
      <div className="font-semibold">{value || '—'}</div>
    </div>
  )
}
function SuccessScreen({ estimate, showPopup }) {
  return (
    <section className="min-h-[80vh] flex items-center pt-32 pb-20 relative overflow-hidden">
      <Orbs />
      {showPopup && (
        <div className="fixed top-24 right-6 z-[100] bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-fade-up flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-semibold">Thank you for submitting your quote! A confirmation has been sent to your email.</span>
        </div>
      )}
      <div className="container-x relative max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 grid place-items-center mx-auto mb-5 shadow-2xl shadow-emerald-500/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="font-display font-bold text-4xl mb-3">Quote Submitted!</h1>
        <p className="text-white/70 mb-6">Thanks — we received your request and will respond within 30 minutes during business hours. A confirmation has been sent to your email.</p>
        <div className="glass-strong p-6 mb-6">
          <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Indicative Estimate</div>
          <div className="text-3xl font-display font-bold gradient-text">${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}</div>
        </div>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </section>
  )
}
