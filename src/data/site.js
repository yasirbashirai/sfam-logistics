export const company = {
  name: 'SFam Logistics LLC',
  tagline: 'We Know the Road — Because We\'ve Been On It.',
  phone: '1 (888) 698-5556',
  phoneHref: 'tel:+18886985556',
  email: 'info@sfamlogistics.com',
  address: '19125 North Creek Parkway Suite 120, Bothell, WA 98011 US',
  hours: 'Mon – Fri • 8:00 AM – 5:00 PM PST',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61576522389023',
    twitter: 'https://x.com/SFamlogistics',
    instagram: 'https://www.instagram.com/sfamlogistics/'
  }
}

export const services = [
  { slug: 'full-truckload', name: 'Full Truckload (FTL)', short: 'Dedicated trailers, faster transit, single-shipment focus.', icon: 'Truck',
    long: 'When your freight needs the entire trailer, FTL is the fastest, safest, and most cost-effective option. We coordinate dry van, reefer, and flatbed FTL shipments across all 48 contiguous states with vetted carriers and live communication from pickup to delivery.' },
  { slug: 'less-than-truckload', name: 'Less-Than-Truckload (LTL)', short: 'Pay for the space you use. Smart consolidation nationwide.', icon: 'Boxes',
    long: 'LTL is perfect for shipments between 150 and 15,000 lbs. We work with national LTL carriers to consolidate freight, reduce cost, and keep transit predictable — backed by tracking and proactive updates.' },
  { slug: 'reefer', name: 'Refrigerated (Reefer)', short: 'Temperature-controlled freight from -20°F to +70°F.', icon: 'Snowflake',
    long: 'Produce, pharma, frozen goods, and any temperature-sensitive load — moved with reefer-certified carriers, monitored temperatures, and clean-trailer protocols.' },
  { slug: 'flatbed', name: 'Flatbed & Open Deck', short: 'Steel, machinery, building materials, oversized loads.', icon: 'PackageOpen',
    long: 'Step decks, double drops, conestoga, and standard flatbeds — with experienced carriers who understand securement, tarping, and permitting.' },
  { slug: 'dedicated', name: 'Dedicated Freight', short: 'Recurring lanes, dedicated capacity, predictable cost.', icon: 'Route',
    long: 'High-volume shippers get dedicated capacity solutions: weekly lane commitments, round-trip planning, and fleet-style reliability without the asset cost.' },
  { slug: 'expedited', name: 'Expedited & Time-Critical', short: 'Hot loads, team drivers, mission-critical delivery.', icon: 'Zap',
    long: 'Sprinter vans, straight trucks, and team drivers for shipments that absolutely cannot be late. 24/7 dispatch coverage and live load tracking.' }
]

export const blogPosts = [
  { slug: 'how-to-choose-a-freight-broker', title: 'How to Choose the Right Freight Broker in 2026', date: '2026-03-22', readMin: 6, tag: 'Shippers',
    excerpt: 'Not all brokers are equal. Here are the seven things every shipper should verify before signing a load confirmation.',
    body: 'Choosing the right freight broker comes down to authority, insurance, communication, and accountability. Start by verifying MC and DOT numbers on the FMCSA SAFER website. Then check contingent cargo and broker liability limits — anything below $100K cargo and $1M liability should raise flags. Next, evaluate communication: how fast does the rep respond, do they have 24/7 dispatch, and will they share carrier names before pickup? Finally, look for brokers who specialize in your freight type and lanes. SFam Logistics is built by drivers who understand both sides — that perspective shows up in every load we move.' },
  { slug: 'ftl-vs-ltl', title: 'FTL vs LTL: Which One Actually Saves You Money?', date: '2026-03-12', readMin: 5, tag: 'Education',
    excerpt: 'A practical breakdown of when full truckload beats LTL — and when it absolutely does not.',
    body: 'The conventional wisdom says LTL is cheaper for smaller shipments and FTL is cheaper when you fill the trailer. The reality is more nuanced. Once you exceed 6 pallets or 8,000 lbs of dense freight, FTL pricing often beats LTL because LTL carriers reclassify, reweigh, and assess accessorials. Add liftgate, residential, inside delivery, and limited access fees and your "cheap" LTL quote balloons. We help shippers model both options on every quote.' },
  { slug: 'carrier-onboarding-checklist', title: 'The Carrier Onboarding Checklist Every Broker Should Use', date: '2026-02-28', readMin: 7, tag: 'Carriers',
    excerpt: 'A no-nonsense checklist for vetting carriers — built from years on the road.',
    body: 'A clean MC number is just the start. We verify authority age, safety scores, insurance certificates with broker named as additional insured, W-9, signed broker-carrier agreement, and a current photo of the truck. We also call the listed contact number — fraud rings clone MC numbers and a quick phone call kills most of them.' },
  { slug: 'becoming-a-freight-agent', title: 'Becoming an Independent Freight Agent: What to Expect', date: '2026-02-10', readMin: 8, tag: 'Agents',
    excerpt: 'Commission splits, book of business, tools, and the mindset that separates top agents from the rest.',
    body: 'Independent freight agents own their book and their schedule. The best agents bring 2-5 years of brokerage or sales experience, an existing book of business, and the discipline to prospect daily. SFam offers competitive splits, full back-office support, TMS access, carrier vetting, and same-day pay options.' }
]
