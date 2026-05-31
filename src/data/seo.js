// Centralised SEO + business data — used to build JSON-LD payloads on every page.

export const SITE_URL = 'https://sfamlogistics.com'
export const SITE_NAME = 'SFam Logistics LLC'
export const SITE_DESCRIPTION = 'SFam Logistics LLC is an FMCSA-authorized nationwide freight brokerage in Bothell, WA. We coordinate FTL, LTL, reefer, flatbed, dedicated, and expedited freight across the United States and North America. MC 1810116 • USDOT 4555943.'
export const PHONE = '+1-888-698-5556'
export const EMAIL = 'info@sfamlogistics.com'
export const MC_NUMBER = '1810116'
export const DOT_NUMBER = '4555943'

export const PRIMARY_LOCATION = {
  '@type': 'PostalAddress',
  streetAddress: '19125 North Creek Parkway, Suite 120',
  addressLocality: 'Bothell',
  addressRegion: 'WA',
  postalCode: '98011',
  addressCountry: 'US'
}

export const SECONDARY_LOCATION = {
  '@type': 'PostalAddress',
  streetAddress: '10220 3rd Avenue SE',
  addressLocality: 'Everett',
  addressRegion: 'WA',
  postalCode: '98208',
  addressCountry: 'US'
}

const SOCIAL = [
  'https://www.facebook.com/profile.php?id=61576522389023',
  'https://www.linkedin.com/company/sfam-logistics-llc/',
  'https://www.instagram.com/sfamlogistics/',
  'https://x.com/SFamlogistics'
]

// === Organization / LocalBusiness — site-wide ===
export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'MovingCompany'],
  '@id': SITE_URL + '/#organization',
  name: SITE_NAME,
  legalName: 'SFam Logistics LLC',
  alternateName: 'SFam',
  url: SITE_URL,
  logo: SITE_URL + '/images/sfam-logo.jpg',
  image: SITE_URL + '/images/sfam-logo.jpg',
  description: SITE_DESCRIPTION,
  telephone: PHONE,
  email: EMAIL,
  priceRange: '$$',
  address: PRIMARY_LOCATION,
  location: [
    { '@type': 'Place', name: 'SFam Logistics — Bothell HQ', address: PRIMARY_LOCATION },
    { '@type': 'Place', name: 'SFam Logistics — Everett Office', address: SECONDARY_LOCATION }
  ],
  geo: { '@type': 'GeoCoordinates', latitude: 47.7623, longitude: -122.2054 },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'Mexico' }
  ],
  serviceArea: { '@type': 'AdministrativeArea', name: 'Continental United States and North America' },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '17:00' }
  ],
  sameAs: SOCIAL,
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'customer service', telephone: PHONE, email: EMAIL, areaServed: 'US', availableLanguage: ['English'] },
    { '@type': 'ContactPoint', contactType: 'sales', telephone: PHONE, email: EMAIL, areaServed: 'US', availableLanguage: ['English'] },
    { '@type': 'ContactPoint', contactType: 'dispatch', telephone: PHONE, email: EMAIL, areaServed: 'US', availableLanguage: ['English'] }
  ],
  identifier: [
    { '@type': 'PropertyValue', propertyID: 'MC', name: 'FMCSA Motor Carrier Number', value: MC_NUMBER },
    { '@type': 'PropertyValue', propertyID: 'USDOT', name: 'USDOT Number', value: DOT_NUMBER }
  ],
  knowsAbout: ['Freight Brokerage','Full Truckload (FTL)','Less-than-Truckload (LTL)','Refrigerated Freight','Flatbed Freight','Dedicated Freight','Expedited Freight','Cross-Border Shipping','Carrier Dispatch','Logistics Consulting'],
  slogan: 'Reliable Freight, Delivered With Honest Hands.'
}

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_URL + '/#website',
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': SITE_URL + '/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: SITE_URL + '/blog?q={search_term_string}' },
    'query-input': 'required name=search_term_string'
  },
  inLanguage: 'en-US'
}

// === Helpers ===
export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: SITE_URL + it.path
    }))
  }
}

export function serviceLd({ name, description, slug }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    url: SITE_URL + (slug ? '/services#' + slug : '/services'),
    provider: { '@id': SITE_URL + '/#organization' },
    areaServed: [{ '@type': 'Country', name: 'United States' }, { '@type': 'Country', name: 'Canada' }, { '@type': 'Country', name: 'Mexico' }]
  }
}

export function faqLd(qa) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  }
}
