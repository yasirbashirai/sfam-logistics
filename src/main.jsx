import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { SubmissionsProvider } from './context/SubmissionsContext.jsx'

// --- Cross-origin backend support ---
// The frontend (static files on the client's host) and the backend (Node/Express
// on a separate host like Render) usually live on different domains. All app code
// calls relative paths like fetch('/api/...') and fetch('/uploads/...'). When
// VITE_API_URL is set at build time, we transparently rewrite those to the backend
// origin here — so no component code needs to change. Left empty (dev / same-origin),
// requests stay relative and behave exactly as before.
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
if (API_BASE) {
  const nativeFetch = window.fetch.bind(window)
  window.fetch = (input, init) => {
    if (typeof input === 'string' && (input.startsWith('/api') || input.startsWith('/uploads'))) {
      input = API_BASE + input
    }
    return nativeFetch(input, init)
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SubmissionsProvider>
        <App />
      </SubmissionsProvider>
    </BrowserRouter>
  </React.StrictMode>
)
