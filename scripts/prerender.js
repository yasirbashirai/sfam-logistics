// Pre-render / route-flattening for static hosting (nginx, LiteSpeed, S3, etc.)
//
// Why this exists:
//   The app uses BrowserRouter (clean URLs) for SEO. On hosts that DON'T honor
//   .htaccess (e.g. Hostinger's nginx/OpenResty stack), a request for /login has
//   no real file, so the server returns 404 "No input file specified." instead of
//   letting React Router handle it.
//
// The fix:
//   Copy the built index.html into a real file at every route path
//   (dist/login/index.html, dist/about/index.html, ...). Now the server serves a
//   real file for each URL, the SPA boots, and React Router renders the right page.
//   Also writes dist/404.html as a catch-all safety net for unknown paths.
//
// Routes are derived from src/data/site.js so they never drift out of sync.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { services, blogPosts } from '../src/data/site.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, '..', 'dist')
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')

// Static public routes
const staticRoutes = [
  '/about',
  '/services',
  '/quote',
  '/track',
  '/carrier-onboarding',
  '/agent-opportunities',
  '/blog',
  '/contact',
  '/privacy',
  // NOTE: /terms is intentionally omitted — it is served as the Terms PDF via a
  // server rewrite (vercel.json / .htaccess / Express). Pre-rendering a static
  // dist/terms/index.html here would shadow that rewrite and serve the SPA shell.
  '/login',
  // Admin (noindex, but the URLs must still resolve to the app)
  '/admin',
  '/admin/shipments',
  '/admin/chat',
  '/admin/quotes',
  '/admin/carriers',
  '/admin/agents',
  '/admin/contacts',
  '/admin/subscribers'
]

// Dynamic routes from site data
const dynamicRoutes = [
  ...services.map(s => `/services/${s.slug}`),
  ...blogPosts.map(p => `/blog/${p.slug}`)
]

const routes = [...staticRoutes, ...dynamicRoutes]

let count = 0
for (const route of routes) {
  const dir = path.join(DIST, route)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), template)
  count++
}

// Catch-all 404 fallback (same SPA shell) for any path we didn't pre-render.
fs.writeFileSync(path.join(DIST, '404.html'), template)

console.log(`✅ Pre-rendered ${count} route files + 404.html into dist/`)
