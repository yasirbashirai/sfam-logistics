import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Serve the Terms & Conditions PDF at the clean, extension-less URL /terms.
// Mirrors the production rewrite in public/.htaccess and the Express route in
// server/index.js so the URL behaves identically in dev and prod.
function termsPdfRoute() {
  return {
    name: 'terms-pdf-route',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0]
        if (url === '/terms' || url === '/terms/') {
          const file = path.join(__dirname, 'public', 'terms.pdf')
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader('Content-Disposition', 'inline; filename="SFam-Logistics-Terms-and-Conditions-of-Service.pdf"')
          fs.createReadStream(file).pipe(res)
          return
        }
        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), termsPdfRoute()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': 'http://localhost:4000',
      '/uploads': 'http://localhost:4000'
    }
  }
})
