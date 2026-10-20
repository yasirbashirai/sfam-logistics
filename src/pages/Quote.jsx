import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowLeft, CheckCircle2, MapPin, Package, User, ShieldCheck, Clock, Phone, AlertCircle, ClipboardList, Loader2 } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import { useSubmissions } from '../context/SubmissionsContext.jsx'
import { breadcrumbLd } from '../data/seo.js'
import { company } from '../data/site.js'

const quoteJsonLd = [
  breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Request a Quote', path: '/quote' }]),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://sfamlogistics.com/quote',
    name: 'Request a Freight Quote',
    description: 'Request a spot quote or tell us about your recurring produce, refrigerated, or dry van freight needs.',
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

// Dropdown options (client-approved wording).
const REQUEST_TYPES = ['Spot Quote', 'Recurring Freight', 'Other']
const FREIGHT_TYPES = ['Produce', 'Refrigerated', 'Dry Van', 'Other']
const EQUIPMENT = ['Refrigerated (Reefer)', 'Dry Van', 'Other', 'Not Sure']
const REEFER = 'Refrigerated (Reefer)'

// The last step (Review) has no inputs; the steps before it are validated.
const STEPS = ['Request', 'Lane', 'Freight', 'Contact', 'Review']

export default function Quote() {
  const { add } = useSubmissions()
  const [params] = useSearchParams()

  // Preselect from links like /quote?type=spot or /quote?freight=Produce
  const initialRequestType = params.get('type') === 'spot' ? 'Spot Quote' : ''
  const freightParam = params.get('freight')
  const initialFreightType = FREIGHT_TYPES.includes(freightParam) ? freightParam : ''

  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    requestType: initialRequestType, freightType: initialFreightType, equipment: '', temp: '',
    pickupCity: '', pickupState: '', deliveryCity: '', deliveryState: '',
    pickupDate: '', deliveryDate: '',
    commodity: '', weight: '', pallets: '', palletDimensions: '',
    name: '', company: '', email: '', phone: '', notes: ''
  })
  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(p => ({ ...p, [k]: '' }))
  }
  const isReefer = form.equipment === REEFER

  const validateStep = (s) => {
    const e = {}
    const f = form
    if (s === 0) {
      if (!f.requestType) e.requestType = 'Select a request type'
      if (!f.freightType) e.freightType = 'Select a freight type'
      if (!f.equipment) e.equipment = 'Select the equipment needed'
      if (isReefer && !f.temp.trim()) e.temp = 'Required temperature is needed for refrigerated equipment'
    }
    if (s === 1) {
      if (!f.pickupCity.trim()) e.pickupCity = 'Pickup city is required'
      if (!f.pickupState.trim()) e.pickupState = 'Pickup state is required'
      if (!f.deliveryCity.trim()) e.deliveryCity = 'Delivery city is required'
      if (!f.deliveryState.trim()) e.deliveryState = 'Delivery state is required'
      if (!f.pickupDate) e.pickupDate = 'Pickup date is required'
    }
    if (s === 2) {
      if (!f.commodity.trim()) e.commodity = 'Product / commodity is required'
      if (!f.weight) e.weight = 'Total weight is required'
      else if (Number(f.weight) <= 0) e.weight = 'Weight must be greater than 0'
    }
    if (s === 3) {
      if (!f.name.trim()) e.name = 'Contact name is required'
      if (!f.company.trim()) e.company = 'Company name is required'
      if (!f.email.trim()) e.email = 'Email address is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid email address'
    }
    return e
  }

  const next = () => {
    const stepErrors = validateStep(step)
    if (Object.keys(stepErrors).length) { setErrors(stepErrors); return }
    setErrors({})
    setStep(s => Math.min(s + 1, STEPS.length - 1))
  }
  const prev = () => { setErrors({}); setStep(s => Math.max(s - 1, 0)) }

  const submit = async (e) => {
    e.preventDefault()
    if (step < STEPS.length - 1) return next()
    if (submitting) return
    // Re-validate every step before final submit; jump back to the first step with errors
    for (let s = 0; s < STEPS.length - 1; s++) {
      const stepErrors = validateStep(s)
      if (Object.keys(stepErrors).length) { setErrors(stepErrors); setStep(s); return }
    }
    setSubmitting(true)
    setSubmitError(false)

    const trimmed = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]))
    const payload = {
      ...trimmed,
      temp: isReefer ? trimmed.temp : '',
      // Lane summary used by the admin dashboard
      originCity: `${trimmed.pickupCity}, ${trimmed.pickupState}`,
      destCity: `${trimmed.deliveryCity}, ${trimmed.deliveryState}`
    }

    // Only treat the request as submitted if the server actually saved it.
    const row = await add('quotes', payload, { fallback: false })
    setSubmitting(false)
    if (!row) { setSubmitError(true); return }

    setDone(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Automated confirmation email to the customer (best effort)
    try {
      await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: payload.email, name: payload.name, type: 'quote' })
      })
    } catch {}
  }

  if (done) return <SuccessScreen />

  const inputCls = (k) => `input ${errors[k] ? 'border-red-500/60 focus:border-red-500' : ''}`
  const selectCls = (k) => `select ${errors[k] ? 'border-red-500/60 focus:border-red-500' : ''}`
  const today = new Date().toISOString().slice(0, 10)

  return (
    <>
      <PageMeta
        title="Request a Freight Quote | Spot & Recurring Freight"
        description="Request a freight quote from SFam Logistics. Spot quotes and recurring freight for produce, refrigerated, and dry van shipments, Pacific Northwest focus with nationwide support. Prefer email? quotes@sfamlogistics.com."
        keywords="freight quote, spot quote, spot rate, recurring freight, produce freight quote, refrigerated freight quote, reefer quote, dry van quote, Pacific Northwest freight broker, freight broker quote"
        path="/quote"
        type="website"
        jsonLd={quoteJsonLd}
      />
      <PageHero eyebrow="Request a Quote" title={<>Request a <span className="gradient-text">Freight Quote</span></>} subtitle="Request a spot quote or tell us about your recurring freight needs.">
        <p className="text-sm text-white/80">Prefer email? Send your shipment details to <a href={company.quoteEmailHref} className="font-semibold text-orange-400 hover:text-orange-300 whitespace-nowrap">{company.quoteEmail}</a>.</p>
      </PageHero>

      <section className="section pt-0">
        <Orbs />
        <div className="container-x relative grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 min-w-0">
            {/* Stepper */}
            <div className="flex items-center justify-between mb-8">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center flex-1 last:flex-initial">
                  <div className={`flex items-center gap-3 ${i <= step ? '' : 'opacity-40'}`}>
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full grid place-items-center font-bold text-sm ${i < step ? 'bg-emerald-500' : i === step ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 'bg-white/10'}`}>
                      {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                    </div>
                    <span className="hidden md:block text-sm font-semibold">{label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 sm:mx-3 ${i < step ? 'bg-emerald-500' : 'bg-white/10'}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={submit} className="glass-strong p-6 sm:p-7 lg:p-10" noValidate>
              {Object.values(errors).some(Boolean) && (
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
                  <h3 className="font-display italic font-black text-xl flex items-center gap-3"><ClipboardList className="w-6 h-6 text-orange-400" /> Request Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Request Type" required error={errors.requestType}>
                      <select className={selectCls('requestType')} value={form.requestType} onChange={e => set('requestType', e.target.value)}>
                        <option value="">Select…</option>
                        {REQUEST_TYPES.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field label="Freight Type" required error={errors.freightType}>
                      <select className={selectCls('freightType')} value={form.freightType} onChange={e => set('freightType', e.target.value)}>
                        <option value="">Select…</option>
                        {FREIGHT_TYPES.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field label="Equipment Needed" required error={errors.equipment}>
                      <select className={selectCls('equipment')} value={form.equipment} onChange={e => set('equipment', e.target.value)}>
                        <option value="">Select…</option>
                        {EQUIPMENT.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                    {isReefer && (
                      <Field label="Required Temperature" required error={errors.temp}>
                        <input className={inputCls('temp')} placeholder="e.g. 34°F" value={form.temp} onChange={e => set('temp', e.target.value)} />
                      </Field>
                    )}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="font-display italic font-black text-xl flex items-center gap-3"><MapPin className="w-6 h-6 text-orange-400" /> Lane Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Pickup City" required error={errors.pickupCity}>
                      <input className={inputCls('pickupCity')} placeholder="e.g. Yakima" value={form.pickupCity} onChange={e => set('pickupCity', e.target.value)} />
                    </Field>
                    <Field label="Pickup State" required error={errors.pickupState}>
                      <input className={inputCls('pickupState')} placeholder="e.g. WA" value={form.pickupState} onChange={e => set('pickupState', e.target.value)} />
                    </Field>
                    <Field label="Delivery City" required error={errors.deliveryCity}>
                      <input className={inputCls('deliveryCity')} placeholder="e.g. Portland" value={form.deliveryCity} onChange={e => set('deliveryCity', e.target.value)} />
                    </Field>
                    <Field label="Delivery State" required error={errors.deliveryState}>
                      <input className={inputCls('deliveryState')} placeholder="e.g. OR" value={form.deliveryState} onChange={e => set('deliveryState', e.target.value)} />
                    </Field>
                    <Field label="Pickup Date" required error={errors.pickupDate}>
                      <input type="date" min={today} className={inputCls('pickupDate')} value={form.pickupDate} onChange={e => set('pickupDate', e.target.value)} />
                    </Field>
                    <Field label="Delivery Date or Appointment">
                      <input className="input" placeholder="e.g. 10/24 or 8:00 AM appointment" value={form.deliveryDate} onChange={e => set('deliveryDate', e.target.value)} />
                    </Field>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="font-display italic font-black text-xl flex items-center gap-3"><Package className="w-6 h-6 text-orange-400" /> Freight Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Product / Commodity" required error={errors.commodity}>
                      <input className={inputCls('commodity')} placeholder="e.g. apples, frozen food, packaged goods" value={form.commodity} onChange={e => set('commodity', e.target.value)} />
                    </Field>
                    <Field label="Total Weight (lbs)" required error={errors.weight}>
                      <input type="number" min="1" inputMode="numeric" className={inputCls('weight')} placeholder="e.g. 40000" value={form.weight} onChange={e => set('weight', e.target.value)} />
                    </Field>
                    <Field label="Pallet Count">
                      <input type="number" min="0" inputMode="numeric" className="input" value={form.pallets} onChange={e => set('pallets', e.target.value)} />
                    </Field>
                    <Field label="Pallet Dimensions">
                      <input className="input" placeholder={'e.g. 48" x 40" x 60"'} value={form.palletDimensions} onChange={e => set('palletDimensions', e.target.value)} />
                    </Field>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="font-display italic font-black text-xl flex items-center gap-3"><User className="w-6 h-6 text-orange-400" /> Contact Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Contact Name" required error={errors.name}>
                      <input className={inputCls('name')} autoComplete="name" value={form.name} onChange={e => set('name', e.target.value)} />
                    </Field>
                    <Field label="Company Name" required error={errors.company}>
                      <input className={inputCls('company')} autoComplete="organization" value={form.company} onChange={e => set('company', e.target.value)} />
                    </Field>
                    <Field label="Email Address" required error={errors.email}>
                      <input type="email" autoComplete="email" className={inputCls('email')} value={form.email} onChange={e => set('email', e.target.value)} />
                    </Field>
                    <Field label="Phone Number">
                      <input type="tel" autoComplete="tel" className="input" value={form.phone} onChange={e => set('phone', e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Additional Details"><textarea className="textarea" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Special instructions, accessorials, recurring lane details, etc." /></Field>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="font-display italic font-black text-xl">Review &amp; Submit</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <Review label="Request Type" value={form.requestType} />
                    <Review label="Freight Type" value={form.freightType} />
                    <Review label="Equipment" value={isReefer ? `${form.equipment} • ${form.temp}` : form.equipment} />
                    <Review label="Pickup Date" value={form.pickupDate} />
                    <Review label="Pickup" value={`${form.pickupCity}, ${form.pickupState}`} />
                    <Review label="Delivery" value={`${form.deliveryCity}, ${form.deliveryState}`} />
                    <Review label="Commodity" value={form.commodity} />
                    <Review label="Weight" value={`${form.weight} lbs`} />
                    <Review label="Contact" value={`${form.name} • ${form.company}`} />
                    <Review label="Email" value={form.email} />
                  </div>
                  <p className="text-xs text-white/60">Pricing is confirmed by our brokerage team after we review your shipment details.</p>
                </div>
              )}

              {submitError && (
                <div role="alert" className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-200 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                  <p>Your request could not be submitted. Please try again or email <a href={company.quoteEmailHref} className="font-semibold text-orange-300 underline whitespace-nowrap">{company.quoteEmail}</a>.</p>
                </div>
              )}

              <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-white/10">
                <button type="button" onClick={prev} disabled={step === 0 || submitting} className="btn-ghost disabled:opacity-30"><ArrowLeft className="w-4 h-4" /> Back</button>
                {step < STEPS.length - 1 ? (
                  <button type="button" onClick={next} className="btn-primary">Continue <ArrowRight className="w-5 h-5" /></button>
                ) : (
                  <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
                    {submitting ? <>Submitting… <Loader2 className="w-5 h-5 animate-spin" /></> : <>Submit Quote Request <CheckCircle2 className="w-5 h-5" /></>}
                  </button>
                )}
              </div>
            </form>
          </div>

          <aside className="glass p-7 h-fit lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-orange-400" />
              <h3 className="font-display italic font-black text-lg">Real-Time Pricing</h3>
            </div>
            <p className="text-sm text-white/70 mb-5">We don&apos;t guess on rates. Every quote is priced by our brokerage team using live carrier capacity and current market data, never auto-generated estimates.</p>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                <Clock className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">30-Minute Response</div>
                  <div className="text-xs text-white/60">During business hours, Mon–Fri 7AM–5PM PT.</div>
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

            <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Prefer Email?</div>
                <a href={company.quoteEmailHref} className="text-orange-400 font-bold text-sm hover:text-orange-300 whitespace-nowrap">{company.quoteEmail}</a>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Need Pricing Faster?</div>
                <a href="tel:+18886985556" className="flex items-center gap-2 text-orange-400 font-bold text-sm hover:text-orange-300">
                  <Phone className="w-4 h-4" /> 1 (888) 698-5556
                </a>
              </div>
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
        {label}{required ? <span className="text-orange-400 ml-1">*</span> : <span className="normal-case tracking-normal text-white/35 ml-1">(optional)</span>}
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
      <div className="font-semibold break-words">{value || '—'}</div>
    </div>
  )
}
// Shown only after the server confirms the request was saved.
function SuccessScreen() {
  return (
    <section className="min-h-[80vh] flex items-center pt-32 pb-20 relative overflow-hidden">
      <Orbs />
      <div className="container-x relative max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 grid place-items-center mx-auto mb-5 shadow-2xl shadow-emerald-500/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="font-display italic font-black text-3xl mb-3">Quote Request Submitted</h1>
        <p className="text-white/80 mb-8 text-lg">Thank you. Your quote request has been submitted. We will review your shipment details and contact you.</p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </section>
  )
}
