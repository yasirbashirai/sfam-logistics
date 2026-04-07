import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)
const KEY = 'sfam_submissions_v1'

const seed = {
  quotes: [],
  carriers: [],
  agents: [],
  contacts: []
}

export function SubmissionsProvider({ children }) {
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || seed } catch { return seed }
  })
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(data)) }, [data])

  const add = (bucket, payload) => setData(d => ({
    ...d,
    [bucket]: [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: 'new', ...payload }, ...d[bucket]]
  }))
  const remove = (bucket, id) => setData(d => ({ ...d, [bucket]: d[bucket].filter(x => x.id !== id) }))
  const update = (bucket, id, patch) => setData(d => ({ ...d, [bucket]: d[bucket].map(x => x.id === id ? { ...x, ...patch } : x) }))

  return <Ctx.Provider value={{ data, add, remove, update }}>{children}</Ctx.Provider>
}

export const useSubmissions = () => useContext(Ctx)
