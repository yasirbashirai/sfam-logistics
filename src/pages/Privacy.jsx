import { PageHero } from '../components/Section.jsx'
import PageMeta from '../components/PageMeta.jsx'

export default function Privacy() {
  return (
    <>
      <PageMeta title="Privacy Policy" description="SFam Logistics LLC privacy policy — how we collect, use, and protect your personal information. FMCSA-authorized freight brokerage." />
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="How SFam Logistics LLC collects, uses, and protects your information." />
      <section className="section pt-0">
        <div className="container-x max-w-3xl space-y-6 text-white/70 leading-relaxed">
          <p><strong className="text-white">Effective Date:</strong> April 2026</p>
          <h2 className="text-2xl font-display font-bold text-white mt-6">1. Information We Collect</h2>
          <p>We collect information you provide via our quote, carrier onboarding, agent application, and contact forms. This may include name, business name, email, phone, address, freight details, MC/DOT numbers, insurance certificates, W-9, and uploaded documents.</p>
          <h2 className="text-2xl font-display font-bold text-white mt-6">2. How We Use It</h2>
          <p>We use the information solely to provide brokerage services — including quoting, dispatching, carrier verification, agent recruiting, and ongoing communication. We never sell your data.</p>
          <h2 className="text-2xl font-display font-bold text-white mt-6">3. Document Storage</h2>
          <p>Uploaded documents (insurance, W-9, MC authority, photos) are stored securely and accessible only to authorized SFam personnel through our admin dashboard.</p>
          <h2 className="text-2xl font-display font-bold text-white mt-6">4. Cookies &amp; Analytics</h2>
          <p>We may use cookies and basic analytics to understand site usage and improve performance.</p>
          <h2 className="text-2xl font-display font-bold text-white mt-6">5. Your Rights</h2>
          <p>You may request access, correction, or deletion of your personal information at any time by contacting info@sfamlogistics.com.</p>
          <h2 className="text-2xl font-display font-bold text-white mt-6">6. Contact</h2>
          <p>Questions about this policy? Email info@sfamlogistics.com or call 1 (888) 698-5556.</p>
        </div>
      </section>
    </>
  )
}
