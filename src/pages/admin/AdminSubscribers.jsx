import { useState } from 'react'
import { Mail, Trash2, Download, Search } from 'lucide-react'
import { useSubmissions } from '../../context/SubmissionsContext.jsx'

export default function AdminSubscribers() {
  const { data, remove } = useSubmissions()
  const [search, setSearch] = useState('')
  const subs = data.subscribers || []

  const filtered = subs.filter(s =>
    !search || (s.email || '').toLowerCase().includes(search.toLowerCase())
  )

  const exportCsv = () => {
    const header = 'email,source,subscribed_at\n'
    const rows = filtered.map(s =>
      [
        s.email || '',
        s.source || '',
        s.created_at || s.createdAt || ''
      ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
    ).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sfam-subscribers-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const del = async (id) => {
    if (!confirm('Remove this subscriber?')) return
    await remove('subscribers', id)
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="label mb-2">Newsletter</div>
          <h1 className="font-display font-bold text-4xl">Subscribers</h1>
          <p className="text-white/60 mt-2">Email addresses captured from the &ldquo;Stay Informed&rdquo; footer form. New signups also forward to <a href="mailto:loads@sfamlogistics.com" className="text-orange-300 hover:underline">loads@sfamlogistics.com</a>.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input className="input !py-2 !pl-9 max-w-xs" placeholder="Search email..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button onClick={exportCsv} className="btn-primary !py-2 !px-5"><Download className="w-4 h-4" /> Export CSV</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-strong p-5">
          <Mail className="w-6 h-6 text-orange-400 mb-2" />
          <div className="text-3xl font-display font-bold gradient-text">{subs.length}</div>
          <div className="text-xs text-white/50 uppercase tracking-widest">Total Subscribers</div>
        </div>
        <div className="glass-strong p-5">
          <Mail className="w-6 h-6 text-emerald-400 mb-2" />
          <div className="text-3xl font-display font-bold gradient-text">{
            subs.filter(s => {
              const t = new Date(s.created_at || s.createdAt || 0).getTime()
              return Date.now() - t < 7 * 24 * 60 * 60 * 1000
            }).length
          }</div>
          <div className="text-xs text-white/50 uppercase tracking-widest">Last 7 Days</div>
        </div>
        <div className="glass-strong p-5">
          <Mail className="w-6 h-6 text-orange-300 mb-2" />
          <div className="text-3xl font-display font-bold gradient-text">{
            subs.filter(s => {
              const t = new Date(s.created_at || s.createdAt || 0).getTime()
              return Date.now() - t < 30 * 24 * 60 * 60 * 1000
            }).length
          }</div>
          <div className="text-xs text-white/50 uppercase tracking-widest">Last 30 Days</div>
        </div>
      </div>

      <div className="glass-strong overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-white/40">No subscribers yet. They&apos;ll appear here as visitors sign up from the footer form.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-white/50">
                <tr>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Source Page</th>
                  <th className="px-5 py-4">Subscribed</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(s => (
                  <tr key={s.id} className="hover:bg-white/[0.03]">
                    <td className="px-5 py-4 font-semibold">{s.email}</td>
                    <td className="px-5 py-4 text-white/60 font-mono text-xs">{s.source || '/'}</td>
                    <td className="px-5 py-4 text-white/60">{new Date(s.created_at || s.createdAt).toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 justify-end">
                        <a href={`mailto:${s.email}`} className="p-2 rounded-lg bg-white/5 hover:bg-orange-500/20 hover:text-orange-300" title="Email"><Mail className="w-4 h-4" /></a>
                        <button onClick={() => del(s.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-300" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
