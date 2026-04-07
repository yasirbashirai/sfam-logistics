import { PageHero } from '../components/Section.jsx'

export default function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" subtitle="The terms that govern use of the SFam Logistics website and brokerage services." />
      <section className="section pt-0">
        <div className="container-x max-w-3xl space-y-6 text-white/70 leading-relaxed">
          <p><strong className="text-white">Effective Date:</strong> April 2026</p>
          <h2 className="text-2xl font-display font-bold text-white mt-6">1. Brokerage Authority</h2>
          <p>SFam Logistics LLC operates as a licensed property broker under FMCSA authority. We arrange transportation but do not transport freight ourselves.</p>
          <h2 className="text-2xl font-display font-bold text-white mt-6">2. Quotes &amp; Rates</h2>
          <p>All online estimates are indicative only and do not constitute a binding contract. Final rates are confirmed in writing on a load confirmation.</p>
          <h2 className="text-2xl font-display font-bold text-white mt-6">3. Carrier Requirements</h2>
          <p>Carriers must maintain active FMCSA authority, current cargo and liability insurance, and a signed broker-carrier agreement before transporting freight on behalf of SFam Logistics.</p>
          <h2 className="text-2xl font-display font-bold text-white mt-6">4. Independent Agents</h2>
          <p>Agents who join SFam Logistics do so as independent contractors — not employees. A separate agent agreement governs the commercial relationship.</p>
          <h2 className="text-2xl font-display font-bold text-white mt-6">5. Limitation of Liability</h2>
          <p>SFam Logistics is not liable for indirect, incidental, or consequential damages arising from use of this website. Brokerage liability is governed by individual load confirmations and the broker-carrier agreement.</p>
          <h2 className="text-2xl font-display font-bold text-white mt-6">6. Governing Law</h2>
          <p>These terms are governed by the laws of the State of Washington, USA.</p>
        </div>
      </section>
    </>
  )
}
