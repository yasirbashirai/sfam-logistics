import { PageHero } from '../components/Section.jsx'
import PageMeta from '../components/PageMeta.jsx'
import { FileText } from 'lucide-react'

export default function Terms() {
  return (
    <>
      <PageMeta title="Terms" description="SFam Logistics LLC terms of use and terms of service." />
      <PageHero eyebrow="Legal" title="Terms" subtitle="Terms of use and terms of service for SFam Logistics LLC." />
      <section className="section pt-0">
        <div className="container-x max-w-3xl space-y-6 text-white/70 leading-relaxed">
          <p><strong className="text-white">Effective Date:</strong> April 2026</p>

          <h2 className="text-2xl font-display font-bold text-white mt-6">Terms of Use</h2>

          <h3 className="text-xl font-display font-bold text-white mt-4">1. Acceptance of Terms</h3>
          <p>By accessing or using the SFam Logistics LLC website, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you may not use this website.</p>

          <h3 className="text-xl font-display font-bold text-white mt-4">2. Brokerage Authority</h3>
          <p>SFam Logistics LLC operates as a licensed property broker under FMCSA authority. We arrange transportation but do not transport freight ourselves.</p>

          <h3 className="text-xl font-display font-bold text-white mt-4">3. Use of Website</h3>
          <p>This website is provided for informational purposes and to facilitate requests for freight brokerage services. You agree not to misuse this site, submit false information, or attempt to interfere with its functionality.</p>

          <h3 className="text-xl font-display font-bold text-white mt-4">4. Quotes &amp; Rates</h3>
          <p>All online estimates are indicative only and do not constitute a binding contract. Final rates are confirmed in writing on a load confirmation.</p>

          <h3 className="text-xl font-display font-bold text-white mt-4">5. Carrier Requirements</h3>
          <p>Carriers must maintain active FMCSA authority, current cargo and liability insurance, and a signed broker-carrier agreement before transporting freight on behalf of SFam Logistics.</p>

          <h3 className="text-xl font-display font-bold text-white mt-4">6. Independent Agents</h3>
          <p>Agents who join SFam Logistics do so as independent contractors — not employees. A separate agent agreement governs the commercial relationship.</p>

          <h3 className="text-xl font-display font-bold text-white mt-4">7. Limitation of Liability</h3>
          <p>SFam Logistics is not liable for indirect, incidental, or consequential damages arising from use of this website. Brokerage liability is governed by individual load confirmations and the broker-carrier agreement.</p>

          <h3 className="text-xl font-display font-bold text-white mt-4">8. Governing Law</h3>
          <p>These terms are governed by the laws of the State of Washington, USA.</p>

          <div className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-display font-bold text-white mb-4">Terms of Service</h2>
            <div className="glass-strong p-8 text-center">
              <FileText className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="font-display italic font-black text-xl mb-2">Terms of Service Document</h3>
              <p className="text-white/60 mb-6 text-sm">Our Terms of Service document is currently being reviewed by our legal team and will be available here shortly.</p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white/50 text-sm font-bold">
                <FileText className="w-4 h-4" /> Coming Soon — Under Legal Review
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
