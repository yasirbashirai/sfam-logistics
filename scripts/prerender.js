// Real static pre-rendering for SEO (replaces the old route-flattening copy).
//
// Why this exists:
//   The app is a client-side React SPA. The built index.html ships an empty
//   <div id="root"></div> — so Googlebot (and any crawler that doesn't run JS
//   well) sees a blank page on EVERY route. The old version of this script just
//   copied that same empty shell into /about/index.html, /services/index.html,
//   etc. URLs resolved, but the HTML still had zero content. From an SEO
//   standpoint the whole site was invisible.
//
// What this does now:
//   1. Serves the freshly-built dist/ over a tiny local HTTP server (with SPA
//      fallback so client-side routes resolve).
//   2. Loads each PUBLIC route in real headless Chrome (Puppeteer), lets React
//      mount and PageMeta set the per-page <title>/meta/canonical, then captures
//      the fully-rendered DOM.
//   3. Writes that real HTML to dist/<route>/index.html. Crawlers now get the
//      actual page content, headings, copy, and per-page meta — while the JS
//      bundle still loads and takes over for real users.
//
//   Admin/login routes are NOT content-prerendered (they're noindex and need a
//   live backend); they get the clean empty shell so their URLs still resolve.
//
// Routes are derived from src/data/site.js so they never drift out of sync.

import fs from 'fs'
import path from 'path'
import http from 'http'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'
import { services, blogPosts } from '../src/data/site.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, '..', 'dist')
const PORT = 41789

// The pristine built shell — captured BEFORE we overwrite dist/index.html with
// the rendered home page, so shell routes get a clean empty root (not home copy).
const cleanTemplate = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')

// Public, indexable routes — these get REAL content rendered into their HTML.
const contentRoutes = [
  '/',
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
  // server rewrite (vercel.json / .htaccess / Express). Pre-rendering it here
  // would shadow that rewrite and serve the SPA shell instead of the PDF.
  ...services.map(s => `/services/${s.slug}`),
  ...blogPosts.map(p => `/blog/${p.slug}`)
]

// Routes that must merely resolve to the app (noindex / need live backend).
// They get the clean empty shell — no point rendering them for crawlers.
const shellRoutes = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/admin',
  '/admin/shipments',
  '/admin/chat',
  '/admin/quotes',
  '/admin/carriers',
  '/admin/agents',
  '/admin/contacts',
  '/admin/subscribers'
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml'
}

// Tiny static file server with SPA fallback. Real files (assets, images) are
// served directly; anything without a matching file falls back to index.html so
// React Router can resolve client-side routes during rendering.
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
      let filePath = path.join(DIST, urlPath)
      if (urlPath === '/' || !path.extname(filePath)) {
        filePath = path.join(DIST, 'index.html')
      }
      fs.readFile(filePath, (err, buf) => {
        if (err) {
          // Unknown path with no extension → SPA fallback. Missing asset → 404.
          if (!path.extname(filePath) || filePath.endsWith('index.html')) {
            const shell = fs.readFileSync(path.join(DIST, 'index.html'))
            res.writeHead(200, { 'Content-Type': MIME['.html'] })
            res.end(shell)
          } else {
            res.writeHead(404)
            res.end('not found')
          }
          return
        }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' })
        res.end(buf)
      })
    })
    server.listen(PORT, () => resolve(server))
  })
}

async function run() {
  const server = await startServer()
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  let rendered = 0
  for (const route of contentRoutes) {
    const page = await browser.newPage()
    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle2',
        timeout: 30000
      })
      // Wait until React has actually mounted content into #root.
      await page.waitForSelector('#root > *', { timeout: 15000 })
      // Give PageMeta's effects + any reveal animations a beat to settle.
      await new Promise(r => setTimeout(r, 400))

      const html = await page.content()

      // Sanity: make sure we captured real content, not an empty shell.
      const textLen = await page.evaluate(() => (document.getElementById('root')?.innerText || '').trim().length)
      if (textLen < 50) {
        console.warn(`⚠️  ${route} rendered only ${textLen} chars of text — keeping shell`)
      }

      const dir = route === '/' ? DIST : path.join(DIST, route)
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(path.join(dir, 'index.html'), html)
      rendered++
      console.log(`✅ ${route.padEnd(34)} ${textLen.toLocaleString()} chars`)
    } catch (e) {
      console.warn(`⚠️  ${route} failed (${e.message}) — leaving shell in place`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  server.close()

  // Shell routes: write the clean empty SPA shell so the URL resolves and the
  // app boots. (Captured up top, before dist/index.html was overwritten.)
  let shells = 0
  for (const route of shellRoutes) {
    const dir = path.join(DIST, route)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), cleanTemplate)
    shells++
  }

  // Catch-all 404 fallback — clean shell so unknown paths still boot the app.
  fs.writeFileSync(path.join(DIST, '404.html'), cleanTemplate)

  console.log(`\n✅ Pre-rendered ${rendered} content routes + ${shells} shell routes + 404.html`)
}

run().catch((e) => {
  console.error('Prerender failed:', e)
  process.exit(1)
})
