import { PageHero } from '../components/Section.jsx'
import PageMeta from '../components/PageMeta.jsx'
import { FileText, Download, ExternalLink } from 'lucide-react'
import { termsPdf } from '../data/site.js'

// Small helpers to keep the long legal document readable & consistently styled.
const H2 = ({ children }) => <h2 className="text-2xl font-display font-bold text-white mt-10">{children}</h2>
const H3 = ({ children }) => <h3 className="text-lg font-display font-bold text-white mt-6">{children}</h3>
const UL = ({ children }) => <ul className="list-disc pl-6 space-y-1">{children}</ul>

// Definitions (Section 1) rendered as a clean two-column table.
const definitions = [
  ['Agreement', 'These Terms and Conditions of Service, together with any Rate Confirmation, Carrier Agreement, Load Confirmation, or other written instrument executed between the parties, all incorporated herein by reference.'],
  ['Broker', 'SFam Logistics LLC, a federally licensed property broker (FMCSA registered), acting solely as arranging intermediary and never as a motor carrier.'],
  ['Carrier / Motor Carrier', 'Any federally or provincially authorized motor carrier, owner-operator, or transportation provider holding active FMCSA operating authority that accepts a load tender from Broker and undertakes physical transportation of freight under its own authority and at its own risk.'],
  ['Shipper', 'Any person, entity, company, or organization that tenders freight to Broker for transportation arrangement, including shippers, consignors, beneficial cargo owners, and third-party logistics providers acting on their behalf.'],
  ['Load', 'A single shipment of freight tendered by Shipper to Broker for transportation arrangement.'],
  ['Rate Confirmation', 'The written agreement issued by Broker to Carrier specifying the agreed-upon rate, origin, destination, load details, pickup and delivery appointments, and applicable charges.'],
  ['Bill of Lading (BOL)', 'The document issued by Carrier acknowledging receipt of freight and establishing the contract of carriage between Carrier and Shipper.'],
  ['Proof of Delivery (POD)', 'The signed document confirming delivery of freight to the Consignee in good order, noting any exceptions.'],
  ['Accessorial Charges', 'Charges in addition to base freight rate, including detention, layover, TONU, fuel surcharge, lumper fees, liftgate service, inside delivery, redelivery, and oversize/overweight permits.'],
  ['TONU', 'Truck Order Not Used — charge assessed when a Carrier has been dispatched and confirmed but the load is subsequently cancelled or made unavailable after truck dispatch.'],
  ['Detention', "Charge assessed when a Carrier's driver is required to wait at an origin or destination facility beyond the applicable free time allowance."],
  ['Layover', "Charge assessed when a Carrier is unable to load or deliver within the scheduled period due to circumstances at Shipper's or Consignee's facility."],
  ['Carmack Amendment', 'Federal statute codified at 49 U.S.C. § 14706, governing motor carrier liability for cargo loss and damage in interstate commerce.'],
  ['Force Majeure Event', 'Event beyond reasonable control of a party, including acts of God, war, terrorism, pandemic, government order, labor strike, natural disaster, or other unforeseeable circumstance.'],
]

const insurance = [
  ['Commercial General Liability', '$1,000,000'],
  ['Contingent Cargo Liability', '$100,000'],
  ['Freight Broker Professional Indemnity (E&O)', '$500,000'],
  ['Contingent Non-Owned Auto Liability', '$1,000,000'],
]

export default function Terms() {
  return (
    <>
      <PageMeta
        title="Terms of Service"
        description="SFam Logistics LLC Terms of Service — the legally binding terms governing all freight brokerage arrangements between SFam Logistics LLC and Shippers, Carriers, and all other parties. FMCSA Licensed Property Broker MC 1810116 · DOT 4555943."
        path="/terms"
      />
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="The terms governing all freight brokerage arrangements between SFam Logistics LLC and Shippers, Carriers, and all other parties."
      />

      <section className="section pt-0">
        <div className="container-x max-w-3xl text-white/70 leading-relaxed">

          {/* View / download the official PDF */}
          <div className="glass-strong p-8 text-center mb-12">
            <FileText className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="font-display italic font-black text-xl mb-2">SFam Logistics LLC — Terms &amp; Conditions of Service</h3>
            <p className="text-white/60 mb-6 text-sm">Our complete Terms &amp; Conditions of Service govern all freight brokerage arrangements between SFam Logistics LLC and Shippers, Carriers, and all other parties. View or download the official signed document below, or read the full text on this page.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={termsPdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-brand-navy text-sm font-bold hover:opacity-90 transition">
                <ExternalLink className="w-4 h-4" /> View PDF
              </a>
              <a href={termsPdf} download="SFam-Logistics-Terms-and-Conditions-of-Service.pdf" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/15 transition">
                <Download className="w-4 h-4" /> Download PDF
              </a>
            </div>
            <p className="text-white/40 text-xs mt-5">FMCSA Licensed Property Broker · MC 1810116 · DOT 4555943 · Effective April 20, 2026</p>
          </div>

          <div className="space-y-4">
            <p className="text-white/50 text-sm">FMCSA Licensed Property Broker | MC# 1810116 | DOT# 4555943 | 10220 3rd Ave SE, Everett, Washington 98208. Telephone: 1 (888) 698-5556 | Email: info@sfamlogistics.com | www.sfamlogistics.com</p>
            <p><strong className="text-white">Effective Date:</strong> April 20, 2026</p>

            <H2>Important Legal Notice</H2>
            <p>These Terms and Conditions of Service constitute a legally binding agreement between SFam Logistics LLC (&ldquo;Broker&rdquo;) and any Shipper, Carrier, or other party that engages SFam Logistics LLC for freight brokerage services. By tendering a shipment, accepting a Rate Confirmation, dispatching equipment, entering into any written agreement, or engaging services in any form — written, verbal, or electronic — all parties agree to be bound by every term contained herein.</p>
            <p>Please read this document carefully before engaging our services.</p>

            <H2>Preamble</H2>
            <p>SFam Logistics LLC is a licensed freight broker registered with the Federal Motor Carrier Safety Administration (&ldquo;FMCSA&rdquo;) under Property Broker Authority MC-1810116 and DOT# 4555943, authorized to operate pursuant to 49 U.S.C. § 13904. Broker acts solely as a broker of freight transportation services, arranging for the transportation of property by authorized motor carriers. Broker does not own, operate, control, or provide any vehicles used in freight transportation and does not act as a motor carrier at any time. Broker acts exclusively as an intermediary arranging transportation between Shippers and independent FMCSA-authorized Motor Carriers.</p>
            <p>These Terms and Conditions of Service govern all freight brokerage arrangements entered into by Broker with Shippers, Carriers, and all other parties and supersede all prior agreements, understandings, and representations.</p>

            <H2>Section 1: Definitions</H2>
            <p>As used in these Terms and Conditions of Service, the following terms shall have the meanings set forth below:</p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left text-white font-bold py-2 pr-4 align-top w-1/3">Term</th>
                    <th className="text-left text-white font-bold py-2 align-top">Definition</th>
                  </tr>
                </thead>
                <tbody>
                  {definitions.map(([term, def]) => (
                    <tr key={term} className="border-b border-white/10 align-top">
                      <td className="py-3 pr-4 text-white font-semibold">{term}</td>
                      <td className="py-3">{def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <H2>Section 2: Scope of Services</H2>
            <H3>2.1 Broker Status — Property Broker Only</H3>
            <p>SFam Logistics LLC is a licensed property freight broker operating solely in that capacity. Broker arranges for transportation of freight by contracting with independent, FMCSA authorized motor carriers. Broker does not own or operate any trucks, trailers, or transportation equipment. Broker does not employ drivers. Broker does not take physical possession of any freight at any time.</p>
            <p>Under no circumstances shall Broker be deemed a motor carrier, co-carrier, carrier of last resort, or assume any carrier liability, regardless of the form or content of any Bill of Lading, communication, or document.</p>
            <H3>2.2 Services Provided</H3>
            <p>Broker&apos;s Services consist solely of:</p>
            <UL>
              <li>Arranging transportation services by contracting with FMCSA-authorized Motor Carriers</li>
              <li>Serving as Shipper&apos;s arranging intermediary and agent for procuring Motor Carrier services</li>
              <li>Managing load bookings, carrier assignments, and document storage via Transportation Management System (TMS)</li>
              <li>Related administrative functions only</li>
            </UL>
            <p>Broker does not provide physical transportation, take possession of freight, or provide cargo insurance as part of base brokerage services unless expressly agreed in a separate written addendum signed by an authorized officer of Broker.</p>
            <H3>2.3 No Carrier Liability</H3>
            <p>Broker&apos;s sole function is to arrange transportation between Shippers and Carriers. All physical transportation services are performed exclusively by Carriers operating under their own FMCSA authority, their own insurance, and their own operational control. Broker shall have no liability whatsoever for any act, omission, negligence, misconduct, delay, loss, or damage arising from or related to the actual physical transportation of freight.</p>
            <H3>2.4 No Agency Relationship with Carriers</H3>
            <p>Nothing in this Agreement creates an agency, employment, partnership, joint venture, or fiduciary relationship between Broker and any Carrier. Carriers are independent contractors. Broker does not direct, control, or supervise the means, methods, routes, or manner of transportation employed by Carriers.</p>
            <H3>2.5 Limitations on Services</H3>
            <p>Broker reserves the right, in its sole discretion, to decline to arrange transportation for any Load at any time and for any reason, including concerns regarding freight type, shipper creditworthiness, route feasibility, regulatory compliance, or carrier availability. Broker&apos;s acceptance of a Load tender does not guarantee transportation completion if circumstances beyond Broker&apos;s control prevent carrier procurement.</p>
            <H3>2.6 Non-Exclusivity</H3>
            <p>Shipper is not required to tender any minimum volume of freight to SFam Logistics LLC and may, at any time, utilize other licensed freight brokers, freight forwarders, third-party logistics providers, or motor carriers without obligation to SFam Logistics LLC.</p>
            <p>SFam Logistics LLC is similarly not restricted from providing transportation brokerage services to other shippers, consignors, consignees, or third parties. The arrangement of any specific Load pursuant to an accepted Load Confirmation does not create an exclusive relationship or future obligation between the Parties beyond that specific shipment.</p>

            <H2>Section 3: Shipper Obligations &amp; Responsibilities</H2>
            <H3>3.1 Shipper&apos;s Authority</H3>
            <p>Shipper expressly authorizes Broker to enter into contracts of carriage with FMCSA-authorized Motor Carriers on Shipper&apos;s behalf. Any contract of carriage so entered constitutes a direct agreement between Shipper and the Motor Carrier, with Broker acting solely as Shipper&apos;s arranging intermediary.</p>
            <H3>3.2 Written Shipping Instructions</H3>
            <p>Shipper shall provide Broker with complete, accurate, and timely shipping instructions for each shipment, including:</p>
            <UL>
              <li>Full and accurate commodity descriptions, NMFC classifications, and nature of goods</li>
              <li>All applicable hazardous materials identifications, UN/NA numbers, packing groups, and placarding requirements</li>
              <li>Temperature control requirements, pre-cooling specifications, and sanitation protocols</li>
              <li>Any special handling, oversize, overweight, or restricted commodity requirements</li>
              <li>Any seal, padlock, or equipment security requirements</li>
            </UL>
            <p>Shipper shall not tender any hazardous materials, overweight or oversize freight, temperature-sensitive goods, coiled or rolled products, or any commodity requiring special handling or equipment, without providing prior written disclosure to SFam Logistics LLC and making all necessary advance arrangements.</p>
            <p>For Food Shipments governed by applicable Food Safety Laws, Shipper must specify the applicable statutes and regulations on the face of the governing Bill of Lading. At or before the time of booking, and prior to loading, Shipper must provide all required written instructions necessary to maintain the safety of the food, including:</p>
            <UL>
              <li>Required operating temperatures for transportation and, where applicable, the pre-cooling phase;</li>
              <li>All sanitation requirements and documentation requirements for the Motor Carrier&apos;s vehicle and transportation equipment; and</li>
              <li>All design specifications and cleaning procedures applicable to the shipment.</li>
            </UL>
            <p>SFam Logistics LLC will relay all such written instructions from Shipper to the Motor Carrier. Shipper further warrants that it will not directly or indirectly interfere with or attempt to influence the Motor Carrier&apos;s safe operation of equipment or compliance with federal hours-of-service regulations.</p>
            <H3>3.3 Loading Obligations</H3>
            <p>Shipper is solely responsible for ensuring that all freight is properly and safely loaded, supported, blocked, braced, and secured in accordance with all applicable regulations and sound transportation practices. Shipper shall be liable for all costs, expenses, and claims arising from load shift, cargo damage, or loss resulting from improper or insufficient loading by Shipper or its agents.</p>
            <p>Shipper is responsible for inspecting empty containers or trailers before loading and must reject any equipment not in suitable condition to protect the freight. Shipper&apos;s acceptance of equipment constitutes acknowledgment that it was inspected and deemed satisfactory.</p>
            <p>Where Shipper is loading Food Shipments, Shipper is additionally responsible for ensuring that the Motor Carrier&apos;s vehicle and transportation equipment satisfy the requirements set forth in Shipper&apos;s written instructions and are in an appropriate sanitary condition prior to loading. Shipper must verify that any mechanically refrigerated compartments or containers are adequately prepared and, where required, properly pre-cooled before loading.</p>
            <p>Unless Shipper has specifically requested driver-assisted count services and the Motor Carrier has performed such services, Shipper is responsible for accurately counting and recording all pieces transported and applying appropriate seals to the loaded equipment.</p>
            <H3>3.4 Dropped Trailers — Custody &amp; Control</H3>
            <p>If Shipper requests Broker to arrange for a Motor Carrier to drop transportation equipment at Shipper&apos;s facility for Shipper&apos;s convenience, and such equipment is left unattended, Shipper assumes full responsibility for the care, custody, and control of the equipment during the period in Shipper&apos;s possession. Shipper shall be fully responsible for all costs and losses arising from any damage to or misuse of the equipment occurring during such custody.</p>
            <H3>3.5 Compliance with Laws</H3>
            <p>Shipper represents and warrants that it is and shall remain in full compliance with all applicable federal, state, and local laws, regulations, and ordinances governing the transportation of freight, including without limitation the Food Safety Modernization Act, Sanitary Food Transportation Act, hazardous materials regulations, homeland security, trade compliance, and export controls.</p>
            <p><strong className="text-white">3.5.1 Food Safety Compliance:</strong> Where Shipper tenders food products intended for human or animal consumption (&ldquo;Food Shipments&rdquo;), Shipper shall comply with all applicable federal, state, and local laws and regulations governing the safe and secure transportation of such products, including without limitation:</p>
            <UL>
              <li>The Food Safety Modernization Act, 21 U.S.C. § 2201 et seq.;</li>
              <li>The Federal Food, Drug and Cosmetic Act, 21 U.S.C. § 341 et seq.;</li>
              <li>The Sanitary Food Transportation Act, 49 U.S.C. § 5701 et seq.;</li>
              <li>The FDA Final Rule on Sanitary Transportation of Human and Animal Food, 21 C.F.R. § 1.900 et seq.; and</li>
              <li>All applicable USDA and FSIS regulations (collectively, the &ldquo;Food Safety Laws&rdquo;).</li>
            </UL>
            <p>Shipper is solely responsible for all recordkeeping obligations imposed upon a &ldquo;Shipper&rdquo; under the Food Safety Laws. Shipper represents and warrants that all Food Shipments tendered are in safe condition for human or animal consumption as applicable.</p>
            <p><strong className="text-white">3.5.2 Additional Compliance:</strong> Shipper shall additionally comply with all applicable homeland security, customs, export controls, trade compliance, anti-terrorism, and anti-money laundering laws and regulations applicable to its role and activities under this Agreement.</p>
            <H3>3.6 Recordkeeping</H3>
            <p>Shipper is responsible for establishing and maintaining all records required of a &ldquo;Shipper&rdquo; under applicable Food Safety Laws and any other applicable federal, state, or local law governing the transportation of Shipper&apos;s freight. Such records shall be maintained for the minimum period required by applicable law and shall be made available to SFam Logistics LLC or any regulatory authority upon written request.</p>

            <H2>Section 4: Carrier Selection, Vetting &amp; Compliance</H2>
            <H3>4.1 Carrier Selection Standard</H3>
            <p>Broker shall use commercially reasonable efforts to select Carriers that hold active FMCSA operating authority, maintain required insurance coverage, and are not subject to an Unsatisfactory or Conditional safety rating at the time of dispatch. However, Broker does not guarantee the conduct, performance, reliability, safety record, or financial solvency of any Carrier.</p>
            <H3>4.2 Minimum Carrier Qualification Requirements</H3>
            <p>All Carriers engaged by Broker must, at the time of each load dispatch, satisfy the following minimum requirements:</p>
            <UL>
              <li>Active, unrestricted FMCSA operating authority for the applicable cargo type</li>
              <li>Automobile liability insurance of not less than $1,000,000 per occurrence</li>
              <li>Cargo insurance of not less than $100,000 per occurrence</li>
              <li>Workers&apos; compensation insurance as required by applicable state law</li>
              <li>Satisfactory or Not Rated safety rating in FMCSA SAFER system</li>
              <li>Executed Broker-Carrier Agreement incorporating these Terms and Conditions</li>
              <li>No active, unresolved out-of-service orders at time of dispatch</li>
            </UL>
            <H3>4.3 Broker Not Liable for Carrier Actions</H3>
            <p>Shipper expressly acknowledges and agrees that Broker is not responsible or liable for any act, omission, negligence, willful misconduct, violation of law, accident, cargo loss or damage, personal injury, property damage, delayed delivery, or any other harm caused by or attributable to any Carrier, its drivers, employees, agents, or subcontractors.</p>
            <p>Shipper&apos;s sole recourse for cargo loss, damage, or delay is against the Carrier responsible for the transportation, pursuant to the Carmack Amendment and applicable common law.</p>
            <H3>4.4 Prohibition on Double Brokering</H3>
            <p>Broker&apos;s agreements with Carriers expressly prohibit re-brokering, co-brokering, subcontracting, trip leasing, or transferring any Load to any other person or entity without Broker&apos;s prior written authorization. In the event a Carrier violates this prohibition, Broker shall not be liable to Shipper or any third party for any resulting loss, damage, or delay.</p>
            <H3>4.5 Carrier Insurance Requirements</H3>
            <p>Carriers must carry and maintain the following minimum coverage throughout the term of this Agreement:</p>
            <UL>
              <li>Commercial Auto / Cargo Liability: $1,000,000 per occurrence (minimum); $5,000,000 for hazardous materials shipments;</li>
              <li>Cargo Loss and Damage Insurance: $100,000 per occurrence (higher limits may apply as specified in the Load Confirmation);</li>
              <li>Workers&apos; Compensation: As required by applicable state or provincial law; and</li>
              <li>General Liability: $1,000,000 per occurrence.</li>
            </UL>
            <p>For services performed in Canada: General Liability not less than $2,000,000; Cargo insurance not less than $100,000 with a deductible no greater than $5,000; Auto/Truckers liability not less than $2,000,000.</p>
            <p>All policies must be issued by carriers rated &lsquo;B+&rsquo; or better by A.M. Best. Carrier must provide Broker with current Certificates of Insurance, name Broker as additional insured and loss payee, and provide 30 days&apos; advance notice of cancellation or material change. Scheduled Auto certificates are not acceptable unless expressly agreed in writing.</p>

            <H2>Section 5: Rate Confirmations &amp; Load Agreements</H2>
            <H3>5.1 Binding Effect of Rate Confirmation</H3>
            <p>Each Rate Confirmation issued by Broker to Carrier constitutes a binding written agreement for the specific Load described therein. Upon Carrier&apos;s acceptance — whether by electronic signature, email confirmation, verbal acceptance recorded by Broker, or physical pickup of freight — Carrier shall be bound by all rates, charges, terms, and conditions stated in the Rate Confirmation.</p>
            <p>No modification to an executed Rate Confirmation shall be valid unless made in writing and signed by an authorized representative of Broker.</p>
            <H3>5.2 Rate Confirmation Governs Over Other Documents</H3>
            <p>In the event of any conflict or inconsistency between a Rate Confirmation and any Bill of Lading, carrier tariff, or other document, the Rate Confirmation shall control and govern. Carrier&apos;s stamped terms, tariff provisions, and limitations of liability are expressly superseded by the Rate Confirmation and this Agreement.</p>
            <H3>5.3 Accessorial Charges — Pre-Authorization Required</H3>
            <p>All accessorial charges not expressly included in the original Rate Confirmation must be pre-authorized in writing by an authorized Broker representative before they are incurred. Broker shall not be obligated to pay, and Shipper shall not be obligated to reimburse, any accessorial charge that was not pre-authorized in writing. Unauthorized accessorial charges shall be the sole responsibility of the Carrier that incurred them.</p>
            <H3>5.4 Detention Charges</H3>
            <p>Detention time shall begin to accrue when Carrier&apos;s driver has remained at the origin or destination facility for more than two (2) consecutive hours beyond the scheduled appointment time, provided the delay was not caused by Carrier. Any detention charges must be approved in advance by Broker and documented with signed in/out times. Unless otherwise stated in the applicable Rate Confirmation, no detention charges shall apply unless agreed to in writing by Broker. Carrier must notify Broker&apos;s dispatch team in real time when the two-hour free period expires. Detention charges not reported to Broker within twenty-four (24) hours of occurrence shall be deemed waived.</p>
            <H3>5.5 Truck Order Not Used (TONU)</H3>
            <p>If Shipper cancels a shipment after Broker has secured transportation capacity or dispatched a Carrier, Shipper shall be responsible for all applicable cancellation charges, including TONU charges, incurred by Broker in connection with the shipment. Unless otherwise agreed in writing, such charges shall be determined by Broker in its reasonable discretion based on the status of the shipment, Carrier commitments, equipment allocation, and related operational costs. TONU charges may be waived only if Shipper provides written notice of cancellation at least four (4) hours prior to the scheduled pickup appointment time.</p>
            <H3>5.6 Layover Charges</H3>
            <p>In the event a Carrier&apos;s driver is required to remain at or near a facility for a period exceeding twelve (12) consecutive hours beyond the scheduled appointment due to circumstances within Shipper&apos;s or Consignee&apos;s control, a layover charge shall apply at the rate specified in the Rate Confirmation. All layover charges require pre-authorization from Broker. Carrier must provide documentation of the layover, including timestamped driver logs or ELD records, as a condition of payment.</p>
            <H3>5.7 Fuel Surcharge</H3>
            <p>A fuel surcharge may be applied to freight charges based on current diesel fuel price indices as published by the U.S. Department of Energy. The applicable fuel surcharge percentage shall be set forth in the Rate Confirmation or in Broker&apos;s then-current fuel surcharge schedule provided to Shipper upon request.</p>
            <H3>5.8 Receipts and Bills of Lading</H3>
            <p>Upon Shipper&apos;s written request, SFam Logistics LLC will provide proof of pickup and delivery of shipments in the form of a signed Bill of Lading or Proof of Delivery, delivered by mail, courier, email, or electronic means.</p>
            <p>Any insertion of SFam Logistics LLC&apos;s name on a Bill of Lading by Shipper or any other party is for administrative convenience only and does not alter SFam Logistics LLC&apos;s status as a licensed property broker and arranging intermediary. All Bills of Lading associated with shipments arranged by SFam Logistics LLC serve solely as evidence of the condition of cargo at the time of signing and do not constitute a contract of carriage between SFam Logistics LLC and Shipper or any Motor Carrier.</p>
            <p>The terms and conditions of any freight documentation, carrier tariff, Bill of Lading, or shipping form used by SFam Logistics LLC or by any Motor Carrier may not supplement, alter, or otherwise modify the terms of this Agreement. In the event of any conflict between any such document and this Agreement, this Agreement shall govern and control in all respects.</p>

            <H2>Section 6: Payment Terms</H2>
            <H3>6.1 Shipper Payment Obligations</H3>
            <p>Shipper agrees to pay Broker all freight charges, accessorial charges, and other amounts due under the applicable Rate Confirmation and these Terms and Conditions as PREPAID and payable by the Shipper prior to Broker arranging transportation services or within thirty (30) calendar days of the date Broker&apos;s invoice is issued following delivery of the Load and receipt of complete and legible shipping documentation, including a signed Proof of Delivery (&ldquo;Net-30 Terms&rdquo;), unless alternative payment terms are expressly agreed upon in a separate written instrument signed by an authorized officer of Broker.</p>
            <p>All rates negotiated between the Parties must be confirmed in writing to be binding on Shipper. Shipper agrees to pay SFam Logistics LLC&apos;s invoices in full — prepaid or within thirty calendar days of the invoice date, without deduction, offset, or withholding of any kind, unless a specific invoice dispute has been submitted in writing within fifteen calendar days of invoice receipt.</p>
            <p>Unless the Parties otherwise agree in a signed written addendum, SFam Logistics LLC will apply each payment received to the specific invoice identified by Shipper, regardless of the existence of any earlier outstanding invoices.</p>
            <H3>6.2 Invoice Documentation &amp; Dispute Notice</H3>
            <p>Broker will issue invoices upon receipt of a signed POD and complete shipping documentation. Shipper must notify Broker in writing of any invoice dispute within ten (10) business days of receipt of the invoice. Failure to provide timely written notice of dispute shall be deemed acceptance of the invoice in full.</p>
            <UL>
              <li>Disputed portions not affecting undisputed charges shall be paid within the standard Net 30 period.</li>
            </UL>
            <H3>6.3 Late Payment Penalties</H3>
            <p>Any amount not paid in full by the due date shall accrue interest at the rate of one and one-half percent (1.5%) per month (18% per annum), or the maximum rate permitted by applicable law, whichever is less, calculated from the due date until the date of actual payment in full.</p>
            <H3>6.4 Collection Costs</H3>
            <p>In the event Broker is required to institute legal proceedings or engage a collection agency to recover unpaid amounts, Shipper shall be liable for all reasonable attorneys&apos; fees, court costs, collection costs, and other expenses incurred by Broker in connection with such collection efforts, in addition to the outstanding principal and accrued interest.</p>
            <H3>6.5 Right to Suspend Services</H3>
            <p>Broker reserves the right, in its sole discretion, to suspend or terminate freight brokerage services to any Shipper with outstanding unpaid invoices that are more than fifteen (15) days past due, without notice and without liability to Shipper for any resulting business interruption or consequential damages.</p>
            <H3>6.6 Carrier Payment</H3>
            <p>Broker shall remit payment to Carriers in accordance with the payment terms set forth in the applicable Rate Confirmation, which shall be no less favorable than the terms expressly agreed upon in writing.</p>
            <UL>
              <li>Carrier payment is conditioned upon Broker&apos;s receipt of a complete and legible invoice, signed BOL, signed POD, and all other documentation required by the Rate Confirmation.</li>
              <li>Broker&apos;s payment obligation to Carrier is contingent upon Broker&apos;s receipt of payment from Shipper only to the extent expressly agreed in writing between Broker and Carrier. Absent such express agreement, Broker shall remain obligated to pay Carrier within the agreed terms regardless of Shipper payment status.</li>
            </UL>
            <H3>6.7 Disputed Charges — Offset</H3>
            <p>Broker reserves the right to offset against any amounts due to Carrier any undisputed amounts owed by Carrier to Broker, including amounts related to cargo claims, cover charges arising from Carrier&apos;s failure to perform, or any breach of Carrier&apos;s obligations under the Rate Confirmation or Carrier Agreement.</p>

            <H2>Section 7: Claims, Cargo Loss &amp; Liability</H2>
            <H3>7.1 Broker Not Liable for Cargo Loss or Damage</H3>
            <p>SFam Logistics LLC, as a licensed property broker, does not take physical possession of freight and does not issue bills of lading in its own name as a carrier. Accordingly, Broker is not liable for any cargo loss, damage, delay, shortage, misdelivery, or theft arising during transportation.</p>
            <UL>
              <li>All claims for cargo loss or damage must be filed directly and exclusively with the Carrier responsible for the transportation of the affected shipment.</li>
            </UL>
            <p>Neither SFam Logistics LLC nor the Motor Carrier is responsible or liable for loss or damage caused by Shipper&apos;s packaging errors, improper labeling, loading failures, or inaccurate shipping information.</p>
            <H3>7.2 Carmack Amendment</H3>
            <p>Carrier liability for cargo loss and damage in interstate commerce is governed by the Carmack Amendment, 49 U.S.C. § 14706. Shipper acknowledges that Broker is not subject to Carmack Amendment liability as a broker. Shipper&apos;s rights and remedies for cargo loss or damage are those provided under the Carmack Amendment as against the responsible Carrier, and not against Broker.</p>
            <H3>7.3 Claim Filing Procedure</H3>
            <p>Shipper must file written notice of any cargo loss or damage claim with the responsible Carrier within nine (9) months of the delivery date (or in the case of non-delivery, within nine (9) months from the date delivery was reasonably expected), as required under 49 C.F.R. § 370.3. Written notice to Broker is also required within these timeframes:</p>
            <UL>
              <li>Visible loss or damage: noted on the delivery receipt at time of delivery;</li>
              <li>Concealed loss or damage: written notice within 15 days of delivery;</li>
              <li>OS&amp;D (Overage, Shortage, Damage): written notice within 9 months of delivery; and</li>
              <li>Claims against Broker directly: within 6 months of the delivery date (or 6 months from scheduled delivery if not delivered).</li>
            </UL>
            <p>Shipper must file legal action against Carrier within two (2) years of the date Carrier provides written denial of the claim. Failure to comply with these deadlines may result in the permanent waiver of Shipper&apos;s right to recovery.</p>
            <H3>7.4 Broker Assistance with Claims</H3>
            <p>Upon written request, Broker will provide reasonable assistance to Shipper in identifying the responsible Carrier and providing available documentation to support the filing of a cargo claim. Such assistance shall not be construed as an assumption of liability by Broker and shall not waive any of Broker&apos;s defenses under this Agreement.</p>
            <H3>7.5 Concealed Damage</H3>
            <p>In the event of concealed damage not noted on the delivery receipt at the time of delivery, Shipper or Consignee must provide written notice of such damage to Carrier within fifteen (15) days of delivery. Failure to provide timely notice may limit or eliminate Carrier&apos;s liability under applicable law and will not create any liability on the part of Broker.</p>
            <H3>7.6 Shipper&apos;s Duty to Mitigate</H3>
            <p>Shipper shall have an obligation to take all commercially reasonable steps to mitigate any loss or damage. Shipper&apos;s failure to mitigate shall reduce any recoverable damages proportionally, whether claimed against Carrier or any other party.</p>
            <H3>7.7 Maximum Broker Liability</H3>
            <p>To the fullest extent permitted by applicable law, Broker&apos;s total aggregate liability arising out of or relating to this Agreement, the services provided, or any load arranged hereunder, regardless of the cause of action or legal theory asserted, shall be limited to the total brokerage service fee actually earned by Broker for the specific load giving rise to the claim. This limitation shall not apply to claims arising from Broker&apos;s gross negligence, willful misconduct, fraud, or obligations that cannot be limited under applicable law.</p>
            <H3>7.8 Exceptions to Liability Limitation</H3>
            <p>The limitation of liability in Section 7.7 shall not apply to: (a) Broker&apos;s indemnification obligations arising from Broker&apos;s own gross negligence or willful misconduct; or (b) any liability that cannot be limited as a matter of applicable law.</p>
            <H3>7.9 No Consequential Damages Against Broker</H3>
            <p>In no event shall Broker be liable to any party for any indirect, special, incidental, consequential, exemplary, or punitive damages of any kind, including lost profits, loss of business opportunity, loss of use, or cover costs, arising out of or related to this Agreement or the services provided hereunder, even if Broker has been advised of the possibility of such damages.</p>
            <H3>7.10 Food Shipment Inspection Protocol</H3>
            <p>For the purposes of this Agreement, the definition of &ldquo;adulterated&rdquo; as applied to Food Shipments shall be that set forth in the Federal Food, Drug and Cosmetic Act, 21 U.S.C. §§ 342(a)(i)(4) and 342(i). In the event of apparent adulteration of any portion of a Food Shipment, Shipper must require its consignee to accept the complete shipment and retain the apparently adulterated portion for expert inspection. Shipper warrants that it will promptly arrange, at its own expense, for inspection of the affected portion by a qualified independent expert following delivery.</p>
            <p>Shipper acknowledges that the Motor Carrier will not bear liability for Food Shipments wrongfully refused without a timely and documented determination of adulteration by a qualified expert. Shipper further acknowledges that if Shipper fails to provide the required written instructions prior to the shipment, the Motor Carrier will not be liable for any resulting loss or damage to the Food Shipment.</p>

            <H2>Section 8: Insurance</H2>
            <H3>8.1 Broker Does Not Provide Cargo Insurance</H3>
            <p>SFam Logistics LLC does not provide cargo insurance or freight insurance as part of its brokerage services unless expressly agreed in a separate written addendum signed by an authorized officer of Broker. Broker&apos;s arrangement of transportation services does not include any insurance coverage for Shipper&apos;s cargo.</p>
            <UL>
              <li>Shipper is solely responsible for obtaining and maintaining adequate insurance coverage for its goods during transportation.</li>
            </UL>
            <H3>8.2 Shipper&apos;s Insurance Responsibility</H3>
            <p>Shipper is solely responsible for determining the adequacy of insurance coverage for its freight, including the value of goods, specialized coverage requirements, and any exclusions that may apply. Broker strongly recommends that Shipper obtain all-risk cargo insurance and consult with an insurance professional to assess coverage needs prior to tendering freight.</p>
            <H3>8.3 Declared Value Limitation</H3>
            <p>Unless Shipper provides written notice to Broker of the declared value of freight and Broker confirms in writing that a Carrier with coverage adequate to that declared value has been engaged, Carrier&apos;s cargo liability shall be limited to the released valuation stated in Carrier&apos;s tariff or the applicable minimum under the Carmack Amendment, which may be substantially less than the actual value of the goods.</p>
            <H3>8.4 Broker&apos;s Insurance</H3>
            <p>Broker maintains the following minimum insurance coverages as required by applicable law and good industry practice:</p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left text-white font-bold py-2 pr-4 align-top">Coverage Type</th>
                    <th className="text-left text-white font-bold py-2 align-top">Minimum Limit</th>
                  </tr>
                </thead>
                <tbody>
                  {insurance.map(([type, limit]) => (
                    <tr key={type} className="border-b border-white/10 align-top">
                      <td className="py-3 pr-4 text-white font-semibold">{type}</td>
                      <td className="py-3">{limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">Certificates of insurance evidencing current coverage will be furnished to Shipper upon written request. The existence of Broker&apos;s insurance coverage does not expand Broker&apos;s liability beyond the limitations expressly stated in this Agreement.</p>
            <H3>8.5 Surety Bond</H3>
            <p>SFam Logistics LLC maintains a freight broker surety bond or trust fund agreement on file with the Federal Motor Carrier Safety Administration in an amount not less than $75,000, or such greater amount as may be required by applicable federal regulation. Written proof of the current surety bond will be provided to Shipper upon reasonable written request.</p>
            <H3>8.6 Additional Cargo Insurance Referral</H3>
            <p>At Shipper&apos;s written request, SFam Logistics LLC may refer Shipper to independent third-party insurance providers for the procurement of additional cargo coverage on high-value shipments. In facilitating such a referral, SFam Logistics LLC acts solely as a referral source and is not acting as a licensed insurance agent, insurance producer, insurance broker, or insurance carrier.</p>
            <p>SFam Logistics LLC makes no representations regarding the terms, coverage, rates, exclusions, or claims handling of any third-party insurance policy. SFam Logistics LLC assumes no liability in connection with any insurance policy procured through or in connection with any referral under this Section. Shipper is solely responsible for evaluating whether any such insurance satisfies Shipper&apos;s needs and risk tolerance, and is under no obligation to utilize any particular provider or policy in connection with this Agreement.</p>

            <H2>Section 9: Indemnification</H2>
            <H3>9.1 Shipper Indemnification of Broker</H3>
            <p>Shipper shall defend, indemnify, and hold harmless SFam Logistics LLC and its members, managers, officers, employees, agents, successors, and assigns (collectively, &ldquo;Broker Indemnitees&rdquo;) from and against any and all claims, demands, suits, actions, proceedings, losses, damages, liabilities, costs, and expenses, including reasonable attorneys&apos; fees, arising out of or related to:</p>
            <UL>
              <li>Any inaccuracy, misrepresentation, or omission in information provided by Shipper to Broker</li>
              <li>The nature, condition, labeling, packaging, or hazardous character of Shipper&apos;s freight</li>
              <li>Shipper&apos;s violation of any applicable law, regulation, or order</li>
              <li>Any claim by a third party arising from Shipper&apos;s acts or omissions</li>
              <li>Any breach by Shipper of this Agreement</li>
            </UL>
            <H3>9.2 Carrier Indemnification of Broker</H3>
            <p>Carrier shall defend, indemnify, and hold harmless Broker Indemnitees from and against any and all claims, demands, suits, actions, proceedings, losses, damages, liabilities, costs, and expenses, including reasonable attorneys&apos; fees, arising out of or related to:</p>
            <UL>
              <li>Carrier&apos;s performance or failure to perform any transportation services</li>
              <li>Any cargo loss, damage, delay, or theft occurring during transportation</li>
              <li>Any accident, personal injury, death, or property damage caused by Carrier or its employees, agents, drivers, or subcontractors</li>
              <li>Carrier&apos;s violation of any law, regulation, or permit requirement</li>
              <li>Carrier&apos;s re-brokering, subcontracting, or unauthorized transfer of any Load</li>
              <li>Any breach by Carrier of this Agreement or any Rate Confirmation</li>
            </UL>
            <H3>9.3 Survival of Indemnification</H3>
            <p>The indemnification obligations set forth in this Section 9 shall survive the expiration or termination of this Agreement and shall remain in full force and effect with respect to any claims arising from events that occurred during the term of this Agreement.</p>

            <H2>Section 10: Force Majeure</H2>
            <H3>10.1 Force Majeure Events</H3>
            <p>Neither party shall be in breach of this Agreement or liable to the other party for any delay or failure to perform its obligations under this Agreement to the extent such delay or failure is caused by a Force Majeure Event, provided that the affected party: (a) promptly notifies the other party in writing of the nature and expected duration of the Force Majeure Event; (b) uses commercially reasonable efforts to mitigate the effects of the Force Majeure Event; and (c) resumes performance as soon as reasonably practicable after the cessation of the Force Majeure Event.</p>
            <H3>10.2 Force Majeure Examples</H3>
            <p>Force Majeure Events include, without limitation: acts of God; floods, hurricanes, tornadoes, earthquakes, or other natural disasters; declared states of emergency; acts of war, terrorism, or civil unrest; government-imposed restrictions, embargoes, or quarantines; pandemic or epidemic declared by the World Health Organization or relevant government authority; labor strikes or work stoppages not involving the affected party; or any other cause beyond the reasonable control of the affected party that could not have been foreseen or prevented by reasonable precautions.</p>
            <p>Financial hardship, market fluctuations, equipment unavailability, and any event that was reasonably foreseeable at the time of signing do not constitute Force Majeure Events. Performance obligations of the Parties may be extended by mutual written agreement for the duration of a qualifying Force Majeure Event. If a Force Majeure Event continues for more than thirty consecutive calendar days, either Party may terminate this Agreement upon written notice without further liability, except that all payment obligations accrued prior to termination remain due and payable.</p>
            <H3>10.3 Payment Obligations Not Excused</H3>
            <p>Notwithstanding the foregoing, Force Majeure shall not excuse any payment obligation that has already accrued under this Agreement prior to the occurrence of the Force Majeure Event.</p>

            <H2>Section 11: Dispute Resolution, Governing Law &amp; Venue</H2>
            <H3>11.1 Governing Law</H3>
            <p>This Agreement shall be governed by, construed, and enforced in accordance with the laws of the State of Washington, without regard to its conflict of laws principles, except to the extent that federal transportation law, including the Interstate Commerce Commission Termination Act of 1995 and regulations promulgated thereunder, preempts state law.</p>
            <H3>11.2 Mandatory Pre-Dispute Notice</H3>
            <p>Prior to initiating any formal legal proceeding or arbitration, the aggrieved party shall provide written notice to the other party identifying the nature of the dispute and the relief sought. The parties shall have thirty (30) days following receipt of such notice to attempt to resolve the dispute through good-faith negotiation between senior representatives of each party. This pre-dispute notice requirement is a condition precedent to any formal proceeding.</p>
            <H3>11.3 Arbitration</H3>
            <p>If the parties are unable to resolve a dispute through negotiation within the thirty (30) day period, either party may elect to submit the dispute to binding arbitration administered by the American Arbitration Association (&ldquo;AAA&rdquo;) under its Commercial Arbitration Rules, with one (1) neutral arbitrator appointed in accordance with AAA procedures. The arbitration shall be conducted in King County, Washington. The arbitrator&apos;s award shall be final and binding and may be entered as a judgment in any court of competent jurisdiction. Each party shall bear its own attorneys&apos; fees and costs in connection with arbitration, unless the arbitrator awards otherwise for claims found to be frivolous or pursued in bad faith.</p>
            <H3>11.4 Litigation Venue</H3>
            <p>Notwithstanding the arbitration provision, either party shall have the right to seek emergency or preliminary injunctive relief in any court of competent jurisdiction to prevent irreparable harm pending resolution of a dispute. For all non-arbitrable disputes and for enforcement of arbitration awards, the parties irrevocably consent to the exclusive jurisdiction of the state and federal courts located in King County, Washington, and waive any objection based on improper venue or forum non conveniens.</p>
            <H3>11.5 Waiver of Jury Trial</H3>
            <p>To the fullest extent permitted by applicable law, each party knowingly and voluntarily waives any right to a trial by jury in any action or proceeding arising out of or relating to this Agreement.</p>
            <H3>11.6 Time Limitation on Claims</H3>
            <p>Any claim, demand, or cause of action against Broker must be filed within six (6) months of the date the cause of action accrues, or the date the claimant knew or reasonably should have known of the facts giving rise to the claim, whichever is earlier. Any claim not filed within this period shall be forever barred, regardless of any applicable statute of limitations.</p>

            <H2>Section 12: Confidentiality &amp; Non-Circumvention</H2>
            <H3>12.1 Confidential Information</H3>
            <p>Each party acknowledges that in connection with this Agreement it may receive or have access to information of the other party that is confidential or proprietary in nature, including without limitation: freight rates, carrier identities and contact information, shipper identities and shipping requirements, pricing structures, business strategies, customer lists, financial information, and operational methods (collectively, &ldquo;Confidential Information&rdquo;).</p>
            <p>Each party agrees to hold all Confidential Information of the other party in strict confidence, to use it solely for the purpose of performing obligations under this Agreement, and to disclose it only to those employees or contractors who have a need to know such information and are bound by confidentiality obligations no less protective than those set forth herein.</p>
            <p>Except as required by applicable law, legal process, or regulatory obligation, neither Party shall use the other Party&apos;s name, identity, or branding in any advertising or promotional communication without the other Party&apos;s prior written consent.</p>
            <H3>12.2 Non-Circumvention — Carriers</H3>
            <p>Shipper agrees that during the term of this Agreement and for a period of twenty-four (24) months following its termination or expiration, Shipper shall not, directly or indirectly, contact, solicit, engage, or contract with any Carrier introduced to or identified by Shipper through its relationship with Broker for the purpose of obtaining freight transportation services, without the prior written consent of Broker. This restriction applies to all Carriers with whom Broker arranged transportation for Shipper&apos;s benefit at any time during the two (2) years preceding the date of the alleged circumvention.</p>
            <H3>12.3 Non-Circumvention — Shippers</H3>
            <p>Carrier agrees that during the term of this Agreement and for a period of twenty-four (24) months following its termination or expiration, Carrier shall not, directly or indirectly, contact, solicit, or contract with any Shipper introduced to or identified by Carrier through its relationship with Broker for the purpose of providing transportation services without Broker&apos;s involvement, without the prior written consent of Broker.</p>
            <H3>12.4 Liquidated Damages for Circumvention</H3>
            <p>The parties acknowledge that actual damages from a circumvention violation would be difficult to ascertain and that the following liquidated damages represent a reasonable estimate of Broker&apos;s losses. In the event of a proven circumvention violation, the violating party agrees to pay Broker liquidated damages equal to the total brokerage fees earned on all loads arranged by Broker for the relevant shipper-carrier relationship during the twelve (12) months preceding the circumvention, plus reasonable attorneys&apos; fees and costs incurred by Broker in enforcing this provision.</p>
            <H3>12.5 Waiver of Rate Information</H3>
            <p>Carrier expressly waives any right under 49 CFR § 371.3 to inspect, review, or audit Broker&apos;s financial records, customer rates, margins, or agreement with shippers, unless such waiver is prohibited by applicable law.</p>
            <H3>12.6 Injunctive Relief</H3>
            <p>Each Party acknowledges that a breach of the confidentiality obligations in this Section 12 would cause immediate and irreparable harm to the other Party for which monetary damages would be an inadequate remedy. Accordingly, in the event of any such breach or threatened breach, the non-breaching Party shall be entitled, in addition to all other available legal and equitable remedies, to seek emergency injunctive or other equitable relief without posting bond and without being required to prove actual damages. The prevailing Party in any enforcement action under this Section shall be entitled to recover all reasonable attorneys&apos; fees and costs incurred.</p>

            <H2>Section 13: Electronic Communications &amp; Electronic Signatures</H2>
            <H3>13.1 Acceptance by Electronic Means</H3>
            <p>The parties agree that any acceptance, confirmation, or agreement transmitted by electronic means — including email, electronic signature platform, TMS system message, text message, or EDI transmission — shall constitute a legally binding agreement with the same force and effect as a written signature on a paper document.</p>
            <p>Shipper&apos;s tender of a Load to Broker and Carrier&apos;s acceptance of a Rate Confirmation by any electronic means shall constitute binding acceptance of all terms contained in such document and in this Agreement.</p>
            <H3>13.2 E-SIGN Compliance</H3>
            <p>This Agreement and all transactions conducted hereunder comply with the Electronic Signatures in Global and National Commerce Act (E-SIGN Act), 15 U.S.C. § 7001 et seq., and the Washington State Electronic Authentication Act, RCW Chapter 19.34. Electronic signatures and electronic records have the same legal validity and enforceability as traditional handwritten signatures and paper records.</p>
            <H3>13.3 Recording of Verbal Agreements</H3>
            <p>Broker may, at its discretion, record telephone conversations with Carriers and Shippers for the purpose of confirming verbal rate agreements, load details, and other business communications. Such recordings shall be deemed admissible evidence of the parties&apos; agreement and may be introduced in any arbitration or legal proceeding arising from this Agreement.</p>
            <H3>13.4 Notice by Email</H3>
            <p>Any notice required or permitted under this Agreement may be provided by email to the email addresses designated by the parties. Email notices shall be deemed received on the business day following transmission, provided no delivery failure notification is received. Broker&apos;s designated notice email address is: info@sfamlogistics.com.</p>

            <H2>Section 14: Termination of Services</H2>
            <H3>14.1 Termination at Will</H3>
            <p>Either party may terminate this Agreement or discontinue the use of Broker&apos;s services at any time, with or without cause, upon written notice to the other party. Termination shall not affect any obligation that has accrued prior to the effective date of termination, including without limitation any Load in transit, any outstanding payment obligation, or any pending cargo claim.</p>
            <H3>14.2 Immediate Termination by Broker</H3>
            <p>Broker may terminate this Agreement immediately, without prior notice, upon the occurrence of any of the following events:</p>
            <UL>
              <li>Shipper or Carrier fails to make any payment when due</li>
              <li>Shipper or Carrier breaches any material provision and fails to cure within five (5) business days of written notice</li>
              <li>Carrier loses or has suspended its FMCSA operating authority</li>
              <li>Carrier&apos;s required insurance lapses, is cancelled, or falls below required minimums</li>
              <li>Shipper or Carrier engages in fraud, misrepresentation, or criminal conduct</li>
              <li>Carrier engages in double brokering or unauthorized subcontracting</li>
              <li>Either party becomes insolvent, makes a general assignment for the benefit of creditors, or has a petition in bankruptcy filed against it</li>
            </UL>
            <H3>14.3 Effect of Termination</H3>
            <p>Upon termination of this Agreement for any reason:</p>
            <UL>
              <li>All outstanding payment obligations shall become immediately due and payable</li>
              <li>Shipper shall not tender additional Loads to Broker</li>
              <li>Carrier shall not accept additional Load tenders from Broker</li>
              <li>All surviving provisions, including Sections 9 (Indemnification), 7 (Claims &amp; Liability), 11 (Dispute Resolution), 12 (Confidentiality), and all payment and claims provisions shall remain in full force and effect</li>
            </UL>

            <H2>Section 15: General Provisions</H2>
            <H3>15.1 Entire Agreement</H3>
            <p>This Agreement, together with any Rate Confirmation, Carrier Packet, or written addendum expressly incorporated herein, constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior and contemporaneous agreements, representations, warranties, understandings, negotiations, and communications, whether written or oral. No prior drafts shall be used in the interpretation of this Agreement.</p>
            <H3>15.2 Amendment</H3>
            <p>Broker reserves the right to modify these Terms and Conditions of Service at any time. Broker shall post the updated Terms on its website and shall provide notice to active Shippers and Carriers by email. Continued use of Broker&apos;s services following the effective date of any amendment shall constitute acceptance of the amended Terms. Amendments shall not apply retroactively to Loads in transit at the time of amendment.</p>
            <H3>15.3 Assignment</H3>
            <p>Neither Shipper nor Carrier may assign this Agreement or any of their rights or obligations hereunder without the prior written consent of Broker. Broker may assign this Agreement, in whole or in part, without the consent of any other party, to any affiliate, successor entity, or acquirer of all or substantially all of Broker&apos;s assets or business. Any purported assignment in violation of this provision shall be null and void.</p>
            <H3>15.4 Severability</H3>
            <p>If any provision of this Agreement is found by a court or arbitrator of competent jurisdiction to be invalid, illegal, or unenforceable under applicable law, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, and the validity, legality, and enforceability of the remaining provisions of this Agreement shall not in any way be affected or impaired thereby.</p>
            <H3>15.5 Waiver</H3>
            <p>No failure or delay by either party in exercising any right, power, or remedy under this Agreement shall operate as a waiver thereof. No single or partial exercise of any right, power, or remedy shall preclude any other or further exercise thereof or the exercise of any other right, power, or remedy. No waiver of any breach shall be construed as a waiver of any subsequent breach. All waivers must be in writing and signed by an authorized representative of the waiving party to be effective.</p>
            <H3>15.6 Headings</H3>
            <p>Section headings in this Agreement are included for convenience of reference only and shall not affect the interpretation or construction of any provision.</p>
            <H3>15.7 Counterparts</H3>
            <p>This Agreement may be executed in one or more counterparts, each of which shall be deemed an original and all of which together shall constitute one and the same instrument. Electronic signatures, scanned copies, and facsimile signatures shall be deemed original signatures for all purposes.</p>
            <H3>15.8 Third-Party Beneficiaries</H3>
            <p>This Agreement is entered into solely for the benefit of the parties hereto and their permitted successors and assigns. Nothing in this Agreement shall create or be construed to create any right, benefit, or obligation in any third party, including but not limited to Consignees, insurance companies, or government agencies.</p>
            <H3>15.9 Independent Contractor Status</H3>
            <p>All Carriers engaged through Broker are independent contractors. Nothing in this Agreement shall be construed to create an employment, partnership, agency, or joint venture relationship between Broker and any Carrier, or between Broker and any Shipper. Each party is responsible for its own taxes, employees, benefits, and operational expenses.</p>
            <H3>15.10 Compliance with Laws</H3>
            <p>Each party represents and warrants that it is and shall remain in full compliance with all applicable federal, state, and local laws, regulations, rules, and ordinances pertaining to its activities under this Agreement, including without limitation the Federal Motor Carrier Safety Regulations, FMCSA licensing and insurance requirements, U.S. Department of Transportation regulations, the Interstate Commerce Commission Termination Act of 1995, Surface Transportation Board regulations, applicable state transportation laws, and all applicable employment, tax, and environmental laws.</p>
            <H3>15.11 Hazardous Materials</H3>
            <p>If any freight transported under this Agreement constitutes hazardous materials as defined under 49 C.F.R. § 172.800 or applicable law, Shipper shall notify Broker in writing prior to tendering such freight. Shipper shall ensure proper classification, labeling, placarding, and documentation in compliance with all applicable regulations and shall be solely responsible for compliance with all hazardous materials transportation requirements. Carrier engaged to transport hazardous materials must hold all required FMCSA permits and endorsements.</p>
            <p>Shipper agrees to defend, indemnify, and hold SFam Logistics LLC harmless from and against any and all penalties, fines, regulatory assessments, clean-up costs, liabilities, damages, and reasonable attorneys&apos; fees arising from or attributable to Shipper&apos;s failure to comply with applicable hazardous materials laws and regulations, or Shipper&apos;s failure to properly identify, disclose, classify, package, label, or document any hazardous materials shipment.</p>
            <H3>15.12 FMCSA Regulations</H3>
            <p>Carrier shall at all times comply with all applicable FMCSA regulations, including but not limited to hours of service regulations, electronic logging device requirements, drug and alcohol testing requirements, vehicle inspection and maintenance, and driver qualification standards.</p>
            <H3>15.13 Formal Notices</H3>
            <p>All formal notices required under this Agreement shall be in writing and delivered by: (a) certified U.S. mail, return receipt requested; (b) overnight courier with delivery confirmation; or (c) email with electronic delivery confirmation, to the following addresses:</p>
            <p><strong className="text-white">For Broker:</strong> SFam Logistics LLC, 19125 North Creek Parkway, Suite 120, Bothell, Washington 98011, Attn: Operations Manager, Email: ops@sfamlogistics.com</p>
            <p><strong className="text-white">For Shipper or Carrier:</strong> the address or email on file with Broker at the time of notice.</p>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-white font-display font-bold uppercase tracking-wide text-center leading-relaxed">By tendering freight, accepting any Load Confirmation, or engaging SFam Logistics LLC for transportation arrangement services, all parties acknowledge that they have read, understood, and agree to be legally bound by all Terms and Conditions of this Agreement.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
