import { useState } from 'react'
import { FileText, Truck, Users, MessageSquare, TrendingUp, Eye, X, Download } from 'lucide-react'
import { useSubmissions } from '../../context/SubmissionsContext.jsx'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { data } = useSubmissions()
  const [view, setView] = useState(null)

  const stats = [
    { i: FileText, l: 'Quote Requests', n: data.quotes.length, c: 'from-orange-400 to-orange-600', link: '/admin/quotes' },
    { i: Truck, l: 'Carriers', n: data.carriers.length, c: 'from-orange-400 to-orange-600', link: '/admin/carriers' },
    { i: Users, l: 'Agents', n: data.agents.length, c: 'from-orange-400 to-orange-600', link: '/admin/agents' },
    { i: MessageSquare, l: 'Contacts', n: data.contacts.length, c: 'from-emerald-500 to-emerald-700', link: '/admin/contacts' }
  ]
  const recent = [
    ...data.quotes.slice(0, 5).map(x => ({ ...x, type: 'Quote', label: `${x.originCity || '?'} → ${x.destCity || '?'}` })),
    ...data.carriers.slice(0, 5).map(x => ({ ...x, type: 'Carrier', label: x.company })),
    ...data.agents.slice(0, 5).map(x => ({ ...x, type: 'Agent', label: x.name })),
    ...data.contacts.slice(0, 5).map(x => ({ ...x, type: 'Contact', label: x.name || x.email }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8)

  const exportPdf = (row) => {
    const w = window.open('', '_blank')
    w.document.write(`<html><head><title>SFam Logistics — Submission</title><style>body{font-family:system-ui;padding:40px;color:#111}h1{color:#ff7a18}table{width:100%;border-collapse:collapse;margin-top:20px}td{padding:8px;border-bottom:1px solid #eee}td:first-child{font-weight:600;width:200px;color:#666}</style></head><body><h1>SFam Logistics — Submission Details</h1><table>${Object.entries(row).filter(([, v]) => v != null && v !== '' && typeof v !== 'object').map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table></body></html>`)
    w.document.close(); w.print()
  }

  return (
    <div>
      <div className="mb-8">
        <div className="label mb-2">Dashboard</div>
        <h1 className="font-display font-bold text-4xl">Welcome back</h1>
        <p className="text-white/60 mt-2">Here&apos;s what&apos;s happening with SFam Logistics today.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(s => (
          <Link to={s.link} key={s.l} className="glass-strong p-6 relative overflow-hidden hover:border-orange-400/40 transition group cursor-pointer">
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${s.c} rounded-full blur-2xl opacity-30`} />
            <s.i className="w-8 h-8 text-orange-400 mb-4 relative" />
            <div className="text-4xl font-display font-bold gradient-text relative">{s.n}</div>
            <div className="text-xs text-white/50 uppercase tracking-wider mt-1 relative">{s.l}</div>
          </Link>
        ))}
      </div>

      <div className="glass-strong p-6 lg:p-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-2xl flex items-center gap-3"><TrendingUp className="w-6 h-6 text-orange-400" /> Recent Activity</h2>
        </div>
        {recent.length === 0 ? (
          <div className="text-center py-12 text-white/40">No submissions yet. Submit a test from the public site to see them here.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {recent.map(r => (
              <div key={r.id} className="py-4 flex items-center justify-between gap-4 hover:bg-white/[0.03] rounded-lg px-2 -mx-2 transition">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 shrink-0">{r.type}</span>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{r.label}</div>
                    <div className="text-xs text-white/50">{new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300">{r.status}</span>
                  <button onClick={() => setView(r)} className="p-2 rounded-lg bg-white/5 hover:bg-orange-500/20 hover:text-orange-300 transition" title="View details"><Eye className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {view && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setView(null)}>
          <div className="glass-strong max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setView(null)} className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-red-500/20"><X className="w-4 h-4" /></button>
            <h2 className="font-display font-bold text-2xl mb-6">Submission Details</h2>
            <dl className="space-y-3">
              {Object.entries(view).map(([k, v]) => {
                if (v == null || v === '' || k === 'label') return null
                if (typeof v === 'object' && !Array.isArray(v)) {
                  return (
                    <div key={k} className="grid grid-cols-3 gap-4 py-2 border-b border-white/5">
                      <dt className="text-xs uppercase tracking-wider text-white/50">{k}</dt>
                      <dd className="col-span-2 text-sm break-words whitespace-pre-wrap">{JSON.stringify(v, null, 2)}</dd>
                    </div>
                  )
                }
                if ((k === 'uploadedFiles' || k === 'resumeFile') && v) {
                  const files = Array.isArray(v) ? v : [v]
                  return (
                    <div key={k} className="py-2 border-b border-white/5">
                      <dt className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-2">{k === 'resumeFile' ? 'Resume' : 'Uploaded Documents'}</dt>
                      <div className="space-y-2">
                        {files.map((f, i) => f && (
                          <a key={i} href={f.url || '#'} target="_blank" rel="noopener" className="flex items-center gap-3 p-3 rounded-xl bg-orange-400/10 border border-orange-400/30 hover:bg-orange-400/20 transition">
                            <Download className="w-4 h-4 text-orange-400" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold truncate">{f.name}</div>
                              <div className="text-xs text-white/50">{Math.round((f.size || 0) / 1024)} KB</div>
                            </div>
                            <span className="text-xs text-orange-300 font-bold">DOWNLOAD</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )
                }
                return (
                  <div key={k} className="grid grid-cols-3 gap-4 py-2 border-b border-white/5">
                    <dt className="text-xs uppercase tracking-wider text-white/50">{k}</dt>
                    <dd className="col-span-2 text-sm break-words">{String(v)}</dd>
                  </div>
                )
              })}
            </dl>
            <button onClick={() => exportPdf(view)} className="btn-primary mt-6"><Download className="w-4 h-4" /> Export as PDF</button>
          </div>
        </div>
      )}
    </div>
  )
}
