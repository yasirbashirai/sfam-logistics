import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)
const KEY = 'sfam_submissions_v2'
const seed = { quotes: [], carriers: [], agents: [], contacts: [] }

// Backend API helper. Falls back gracefully to localStorage if API is offline.
const api = {
  base: '/api',
  async tryFetch(path, opts) {
    try {
      const r = await fetch(this.base + path, { headers: { 'Content-Type': 'application/json' }, ...opts })
      if (!r.ok) throw new Error('bad status')
      return await r.json()
    } catch { return null }
  }
}

export function SubmissionsProvider({ children }) {
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || seed } catch { return seed }
  })
  const [online, setOnline] = useState(false)

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(data)) }, [data])

  // On mount, attempt to sync from backend
  useEffect(() => {
    (async () => {
      const health = await api.tryFetch('/health')
      if (!health) return
      setOnline(true)
      const [quotes, carriers, agents, contacts] = await Promise.all([
        api.tryFetch('/quotes'), api.tryFetch('/carriers'),
        api.tryFetch('/agents'), api.tryFetch('/contacts')
      ])
      setData({
        quotes: quotes || [], carriers: carriers || [],
        agents: agents || [], contacts: contacts || []
      })
    })()
  }, [])

  const add = async (bucket, payload) => {
    if (online) {
      const row = await api.tryFetch(`/${bucket}`, { method: 'POST', body: JSON.stringify(payload) })
      if (row) { setData(d => ({ ...d, [bucket]: [row, ...d[bucket]] })); return row }
    }
    const local = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: 'new', ...payload }
    setData(d => ({ ...d, [bucket]: [local, ...d[bucket]] }))
    return local
  }

  const update = async (bucket, id, patch) => {
    if (online && patch.status) await api.tryFetch(`/${bucket}/${id}`, { method: 'PATCH', body: JSON.stringify(patch) })
    setData(d => ({ ...d, [bucket]: d[bucket].map(x => x.id === id ? { ...x, ...patch } : x) }))
  }

  const remove = async (bucket, id) => {
    if (online) await api.tryFetch(`/${bucket}/${id}`, { method: 'DELETE' })
    setData(d => ({ ...d, [bucket]: d[bucket].filter(x => x.id !== id) }))
  }

  return <Ctx.Provider value={{ data, add, update, remove, online }}>{children}</Ctx.Provider>
}

export const useSubmissions = () => useContext(Ctx)

export async function uploadFiles(files) {
  const fd = new FormData()
  files.forEach(f => fd.append('files', f))
  try {
    const r = await fetch('/api/upload', { method: 'POST', body: fd })
    if (!r.ok) throw new Error()
    return (await r.json()).files
  } catch {
    // Offline fallback: return file metadata only
    return files.map(f => ({ name: f.name, size: f.size, url: null }))
  }
}
