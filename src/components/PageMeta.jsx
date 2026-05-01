import { useEffect } from 'react'

const SITE_URL = 'https://sfamlogistics.com'
const SITE_NAME = 'SFam Logistics LLC'
const DEFAULT_IMAGE = SITE_URL + '/images/sfam-logo.jpg'
const TWITTER_HANDLE = '@sfamlogistics'
const DEFAULT_TITLE_SUFFIX = ' | ' + SITE_NAME

// Sets or creates a <meta> tag and tags it with data-pm so we can clean up on unmount.
function setMeta(attr, attrValue, content) {
  if (!content) return null
  let el = document.head.querySelector('meta[' + attr + '="' + attrValue + '"]')
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, attrValue)
    el.setAttribute('data-pm', '1')
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

function setLink(rel, href) {
  if (!href) return null
  let el = document.head.querySelector('link[rel="' + rel + '"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    el.setAttribute('data-pm', '1')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  return el
}

function injectJsonLd(id, payload) {
  if (!payload) return
  const existing = document.head.querySelector('script[data-pm-jsonld="' + id + '"]')
  if (existing) existing.remove()
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-pm-jsonld', id)
  script.textContent = JSON.stringify(payload)
  document.head.appendChild(script)
}

export default function PageMeta({
  title,
  description,
  keywords,
  path,           // e.g. "/services" — defaults to current location
  image,          // absolute URL or path; relative paths get the site URL prepended
  type = 'website',
  noindex = false,
  jsonLd          // object | array of objects | undefined
}) {
  useEffect(() => {
    const fullTitle = title ? title + DEFAULT_TITLE_SUFFIX : SITE_NAME + ' — Nationwide Freight Brokerage | Bothell, WA'
    document.title = fullTitle

    const url = SITE_URL + (path || (typeof window !== 'undefined' ? window.location.pathname : '/'))
    const ogImage = image
      ? (image.startsWith('http') ? image : SITE_URL + (image.startsWith('/') ? image : '/' + image))
      : DEFAULT_IMAGE

    // Standard meta
    setMeta('name', 'description', description)
    setMeta('name', 'keywords', keywords)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMeta('name', 'googlebot', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')

    // Canonical
    setLink('canonical', url)

    // Open Graph
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'en_US')
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:image:secure_url', ogImage)
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('property', 'og:image:alt', title || SITE_NAME)

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:site', TWITTER_HANDLE)
    setMeta('name', 'twitter:creator', TWITTER_HANDLE)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)
    setMeta('name', 'twitter:image:alt', title || SITE_NAME)

    // Per-page JSON-LD (id-stamped so it can be replaced on navigation)
    if (jsonLd) {
      const arr = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      arr.forEach((p, i) => injectJsonLd('page-' + i, p))
    }

    return () => {
      // Cleanup per-page JSON-LD so it doesn't bleed into the next page
      document.head.querySelectorAll('script[data-pm-jsonld]').forEach(n => n.remove())
    }
  }, [title, description, keywords, path, image, type, noindex, jsonLd])

  return null
}
