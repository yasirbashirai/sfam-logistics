import { useState, useMemo } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle2, MapPin, Package, User, ShieldCheck, Clock, Phone, AlertCircle } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import { useSubmissions } from '../context/SubmissionsContext.jsx'
import { haversineMiles, lookupZip } from '../data/zips.js'
import { breadcrumbLd } from '../data/seo.js'

const quoteJsonLd = [
  breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Get a Quote', path: '/quote' }]),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://sfamlogistics.com/quote',
    name: 'Get a Free Freight Quote',
    description: 'Free 4-step freight quote request form with live rate estimator. 30-minute response during business hours.',
    url: 'https://sfamlogistics.com/quote',
    isPartOf: { '@id': 'https://sfamlogistics.com/#website' },
    primaryImageOfPage: 'https://sfamlogistics.com/images/sfam-logo.jpg',
    potentialAction: {
      '@type': 'RequestQuoteAction',
      target: 'https://sfamlogistics.com/quote',
      object: { '@type': 'Service', name: 'Freight Brokerage Quote' }
    }
  }
]

const STEPS = ['Lane', 'Freight', 'Contact', 'Review']

export default function Quote() {
  const { add } = useSubmissions()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    origin: '', destination: '',
    pickupDate: '', deliveryDate: '',
    freightType: 'Full Truckload (FTL)', equipment: 'Dry Van',
    weight: '', pallets: '', length: '', width: '', height: '',
    commodity: '', hazmat: false, temp: '',
    name: '', company: '', email: '', phone: '', notes: ''
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  // Pull a 5-digit ZIP out of a free-text "City, State, Zip" address (if present)
  // so the lane distance/city lookup still works without a dedicated ZIP field.
  const extractZip = (s) => (String(s).match(/\b\d{5}\b/) || [])[0] || ''

  // Lane summary (distance + city names) — no fake price estimate.
  // Real-time pricing is confirmed by our brokerage team based on live carrier capacity.
  const estimate = useMemo(() => {
    const originZip = extractZip(form.origin)
    const destZip = extractZip(form.destination)
    const realDist = haversineMiles(originZip, destZip)
    const distance = realDist || 0
    return {
      distance: Math.round(distance),
      matched: realDist !== null,
      originName: lookupZip(originZip),
      destName: lookupZip(destZip)
    }
  }, [form.origin, form.destination])

  const [errors, setErrors] = useState({})

  const validateStep = (s) => {
    const e = {}
    if (s === 0) {
      if (!form.origin.trim()) e.origin = 'Origin address is required'
      if (!form.destination.trim()) e.destination = 'Destination address is required'
      if (!form.pickupDate) e.pickupDate = 'Pickup date is required'
    }
    if (s === 1) {
      if (!form.weight) e.weight = 'Total weight is required'
      else if (Number(form.weight) <= 0) e.weight = 'Weight must be greater than 0'
    }
    if (s === 2) {
      if (!form.name.trim()) e.name = 'Full name is required'
      if (!form.company.trim()) e.company = 'Company is required'
      if (!form.email.trim()) e.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address'
      if (!form.phone.trim()) e.phone = 'Phone is required'
      else if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid phone number'
    }
    return e
  }

  const next = () => {
    const stepErrors = validateStep(step)
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    setStep(s => Math.min(s + 1, STEPS.length - 1))
  }
  const prev = () => { setErrors({}); setStep(s => Math.max(s - 1, 0)) }

  const [showPopup, setShowPopup] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    // Re-validate every step before final submit
    const allErrors = { ...validateStep(0), ...validateStep(1), ...validateStep(2) }
    if (Object.keys(allErrors).length) {
      setErrors(allErrors)
      // Jump back to the first step that has errors
      if (Object.keys(validateStep(0)).length) setStep(0)
      else if (Object.keys(validateStep(1)).length) setStep(1)
      else setStep(2)
      return
    }
    add('quotes', { ...form, distanceMi: estimate.distance })
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

  if (done) return <SuccessScreen showPopup={showPopup} />

  return (
    <>
      <PageMeta
        title="Get a Free Freight Quote — 30-Minute Response"
        description="Request a free freight quote from SFam Logistics. FTL, LTL, reefer, flatbed, and expedited shipping rates. 30-minute response during business hours and a live rate estimator built into the form."
        keywords="freight quote, free freight quote, freight rates, truckload quote, LTL quote, reefer quote, flatbed quote, expedited freight quote, instant freight quote, freight rate calculator, freight broker quote"
        path="/quote"
        type="website"
        jsonLd={quoteJsonLd}
      />
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

            <form onSubmit={submit} className="glass-strong p-7 lg:p-10" noValidate>
              {Object.keys(errors).length > 0 && (
                <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-200">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                  <div className="text-sm">
                    <div className="font-bold mb-0.5">Please fix the highlighted fields before continuing.</div>
                    <div className="text-red-200/80 text-xs">All fields marked with <span className="text-orange-400">*</span> are required.</div>
                  </div>
                </div>
              )}
              {step === 0 && (
                <div className="space-y-5">
                  <h3 className="font-display italic font-black text-xl flex items-center gap-3"><MapPin className="w-6 h-6 text-orange-400" /> Lane Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Origin" required error={errors.origin}>
                      <input className={`input ${errors.origin ? 'border-red-500/60 focus:border-red-500' : ''}`} placeholder="City, State, Zip" value={form.origin} onChange={e => { set('origin', e.target.value); if (errors.origin) setErrors(p => ({ ...p, origin: '' })) }} />
                    </Field>
                    <Field label="Destination" required error={errors.destination}>
                      <input className={`input ${errors.destination ? 'border-red-500/60 focus:border-red-500' : ''}`} placeholder="City, State, Zip" value={form.destination} onChange={e => { set('destination', e.target.value); if (errors.destination) setErrors(p => ({ ...p, destination: '' })) }} />
                    </Field>
                    <Field label="Pickup Date" required error={errors.pickupDate}>
                      <input type="date" className={`input ${errors.pickupDate ? 'border-red-500/60 focus:border-red-500' : ''}`} value={form.pickupDate} onChange={e => { set('pickupDate', e.target.value); if (errors.pickupDate) setErrors(p => ({ ...p, pickupDate: '' })) }} />
                    </Field>
                    <Field label="Delivery Date (optional)"><input type="date" className="input" value={form.deliveryDate} onChange={e => set('deliveryDate', e.target.value)} /></Field>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="font-display italic font-black text-xl flex items-center gap-3"><Package className="w-6 h-6 text-orange-400" /> Freight Details</h3>
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
                    <Field label="Total Weight (lbs)" required error={errors.weight}>
                      <input className={`input ${errors.weight ? 'border-red-500/60 focus:border-red-500' : ''}`} type="number" value={form.weight} onChange={e => { set('weight', e.target.value); if (errors.weight) setErrors(p => ({ ...p, weight: '' })) }} />
                    </Field>
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
                  <h3 className="font-display italic font-black text-xl flex items-center gap-3"><User className="w-6 h-6 text-orange-400" /> Contact Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name" required error={errors.name}>
                      <input className={`input ${errors.name ? 'border-red-500/60 focus:border-red-500' : ''}`} value={form.name} onChange={e => { set('name', e.target.value); if (errors.name) setErrors(p => ({ ...p, name: '' })) }} />
                    </Field>
                    <Field label="Company" required error={errors.company}>
                      <input className={`input ${errors.company ? 'border-red-500/60 focus:border-red-500' : ''}`} value={form.company} onChange={e => { set('company', e.target.value); if (errors.company) setErrors(p => ({ ...p, company: '' })) }} />
                    </Field>
                    <Field label="Email" required error={errors.email}>
                      <input type="email" className={`input ${errors.email ? 'border-red-500/60 focus:border-red-500' : ''}`} value={form.email} onChange={e => { set('email', e.target.value); if (errors.email) setErrors(p => ({ ...p, email: '' })) }} />
                    </Field>
                    <Field label="Phone" required error={errors.phone}>
                      <input className={`input ${errors.phone ? 'border-red-500/60 focus:border-red-500' : ''}`} value={form.phone} onChange={e => { set('phone', e.target.value); if (errors.phone) setErrors(p => ({ ...p, phone: '' })) }} />
                    </Field>
                  </div>
                  <Field label="Additional Notes"><textarea className="textarea" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Special instructions, accessorials, etc." /></Field>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="font-display italic font-black text-xl">Review &amp; Submit</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <Review label="Origin" value={form.origin} />
                    <Review label="Destination" value={form.destination} />
                    <Review label="Pickup" value={form.pickupDate} />
                    <Review label="Freight" value={`${form.freightType} • ${form.equipment}`} />
                    <Review label="Weight" value={`${form.weight} lbs`} />
                    <Review label="Contact" value={`${form.name} • ${form.phone}`} />
                  </div>
                  <div className="glass p-5 border-orange-400/40">
                    <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Lane Summary</div>
                    <div className="text-2xl font-display font-bold gradient-text">~{estimate.distance} miles</div>
                    <div className="text-xs text-white/60 mt-2">Real-time pricing is confirmed by our brokerage team within 30 minutes during business hours, based on current carrier capacity and live market rates.</div>
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
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-orange-400" />
              <h3 className="font-display italic font-black text-lg">Real-Time Pricing</h3>
            </div>
            <p className="text-sm text-white/70 mb-5">We don&apos;t guess on rates. Every quote is priced by our brokerage team using live carrier capacity and current market data — never auto-generated estimates.</p>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                <Clock className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">30-Minute Response</div>
                  <div className="text-xs text-white/60">During business hours, Mon–Fri 7AM–5PM PST.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">All-In Pricing</div>
                  <div className="text-xs text-white/60">No surprises. Accessorial costs disclosed upfront.</div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Need Pricing Faster?</div>
              <a href="tel:+18886985556" className="flex items-center gap-2 text-orange-400 font-bold text-sm hover:text-orange-300">
                <Phone className="w-4 h-4" /> 1 (888) 698-5556
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

function Field({ label, children, required, error }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">
        {label}{required && <span className="text-orange-400 ml-1">*</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </span>
      )}
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
function SuccessScreen({ showPopup }) {
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
        <h1 className="font-display italic font-black text-3xl mb-3">Quote Submitted!</h1>
        <p className="text-white/70 mb-6">Thanks — we received your request and will respond with real-time pricing within 30 minutes during business hours. A confirmation has been sent to your email.</p>
        <div className="glass-strong p-6 mb-6">
          <p className="text-white/70 text-sm">Our brokerage team is sourcing live carrier capacity for your lane and will follow up with a firm rate as soon as it&apos;s confirmed.</p>
        </div>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </section>
  )
}
