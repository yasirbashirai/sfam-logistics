// Central API origin config.
// When the backend runs on a different host than the static frontend (e.g. the
// Express API on Render while the site is served from the client's FTP host),
// VITE_API_URL is set at build time to that backend's origin. When empty
// (local dev / same-origin), everything stays relative and behaves as before.
export const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

// Resolve a server-relative path to an absolute URL against the backend origin.
// Used for things the fetch() interceptor can't catch — e.g. <a href> / <img src>
// pointing at uploaded files (/uploads/...). Absolute URLs and '#' pass through.
export const resolveUrl = (u) => {
  if (!u || u === '#') return u || '#'
  if (/^https?:\/\//.test(u)) return u
  if (u.startsWith('/uploads') || u.startsWith('/api')) return API_BASE + u
  return u
}
