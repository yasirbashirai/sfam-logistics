import { useEffect } from 'react'

export default function PageMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = `${title} | SFam Logistics LLC`
    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', description)
    }
    return () => {
      document.title = 'SFam Logistics LLC — Nationwide Freight Brokerage | Bothell, WA'
    }
  }, [title, description])
  return null
}
