import { PageHero } from '../components/Section.jsx'
import PageMeta from '../components/PageMeta.jsx'

export default function Privacy() {
  return (
    <>
      <PageMeta
        title="Privacy Policy"
        description="SFam Logistics LLC privacy policy — how we collect, use, store, and protect your personal information. FMCSA-authorized freight brokerage operating under MC 1810116 and USDOT 4555943."
        path="/privacy"
      />
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="How SFam Logistics LLC collects, uses, and protects your information." />
      <section className="section pt-0">
        <div className="container-x max-w-3xl space-y-6 text-white/70 leading-relaxed">
          <p><strong className="text-white">Effective Date:</strong> April 20, 2026</p>
          <p>SFam Logistics LLC (&ldquo;SFam,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy of all individuals and businesses that interact with our website and services. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website at <a href="https://www.sfamlogistics.com" className="text-orange-300 hover:text-orange-200">www.sfamlogistics.com</a> or engage our freight brokerage services.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-6">1. Information We Collect</h2>
          <p>We collect information you voluntarily provide through our website forms, including but not limited to our quote request, carrier onboarding, agent application, and contact forms. The information collected may include:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Full name and business name</li>
            <li>Email address and phone number</li>
            <li>Physical and mailing address</li>
            <li>Freight details and shipping requirements</li>
            <li>FMCSA MC and DOT numbers</li>
            <li>Insurance certificates and surety bond documentation</li>
            <li>W-9 and tax identification information</li>
            <li>Uploaded documents including authority, permits, and related files</li>
          </ul>
          <p>We do not collect sensitive financial information such as credit card or bank account numbers through our website forms.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-6">2. How We Use Your Information</h2>
          <p>We use the information we collect solely for the purpose of providing freight brokerage services and related business operations, including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Preparing and delivering freight quotes</li>
            <li>Carrier qualification, verification, and onboarding</li>
            <li>Load dispatching and shipment coordination</li>
            <li>Agent recruitment and onboarding</li>
            <li>Regulatory and compliance verification</li>
            <li>Ongoing business communication</li>
          </ul>
          <p>We do not sell, rent, trade, or otherwise transfer your personal information to third parties for marketing or commercial purposes.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-6">3. Document Storage and Security</h2>
          <p>Documents uploaded through our website or submitted directly to SFam — including insurance certificates, W-9 forms, MC authority documents, and related files — are stored securely through our transportation management and administrative systems. Access to stored documents is restricted exclusively to authorized SFam Logistics LLC personnel. We implement reasonable technical and administrative safeguards to protect your information against unauthorized access, disclosure, alteration, or destruction.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-6">4. Cookies and Analytics</h2>
          <p>Our website may use cookies and third-party analytics tools to understand how visitors interact with our site and to improve site performance and user experience. Cookies are small data files stored on your device. You may disable cookies through your browser settings; however, doing so may affect certain functionality of our website.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-6">5. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of any third-party sites. We encourage you to review the privacy policies of any external sites you visit.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-6">6. Retention of Information</h2>
          <p>We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with our legal and regulatory obligations, resolve disputes, and enforce our agreements. When information is no longer needed, we dispose of it in a secure manner.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-6">7. Your Rights</h2>
          <p>You have the right to request access to, correction of, or deletion of your personal information held by SFam Logistics LLC at any time. To exercise any of these rights, please contact us using the information below. We will respond to all verified requests within a reasonable timeframe and in accordance with applicable law.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-6">8. Changes to This Policy</h2>
          <p>SFam Logistics LLC reserves the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated effective date. Continued use of our website or services following the posting of changes constitutes your acceptance of the revised policy.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-6">9. Contact</h2>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
          <p>
            <strong className="text-white">SFam Logistics LLC</strong><br />
            19125 North Creek Parkway Suite 120, Bothell, WA 98011 USA<br />
            Email: <a href="mailto:info@sfamlogistics.com" className="text-orange-300 hover:text-orange-200">info@sfamlogistics.com</a><br />
            Phone: <a href="tel:+18886985556" className="text-orange-300 hover:text-orange-200">1 (888) 698-5556</a><br />
            <a href="https://www.sfamlogistics.com" className="text-orange-300 hover:text-orange-200">www.sfamlogistics.com</a>
          </p>
        </div>
      </section>
    </>
  )
}
