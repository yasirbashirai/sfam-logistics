import { useState } from 'react'
import { Trash2, Eye, Download, X, Plus, Save } from 'lucide-react'
import { useSubmissions } from '../../context/SubmissionsContext.jsx'

export default function SubmissionTable({ bucket, title, columns, formFields = [] }) {
  const { data, remove, update, add } = useSubmissions()
  const rows = data[bucket]
  const [view, setView] = useState(null)
  const [search, setSearch] = useState('')
  const [creating, setCreating] = useState(null) // form payload while creating

  const filtered = rows.filter(r => JSON.stringify(r).toLowerCase().includes(search.toLowerCase()))

  const startCreate = () => {
    const blank = {}
    formFields.forEach(f => { blank[f.key] = '' })
    setCreating(blank)
  }

  const saveCreate = async () => {
    if (!creating) return
    // Require at least one field to be filled to avoid empty submissions
    const hasAny = Object.values(creating).some(v => v && String(v).trim())
    if (!hasAny) { alert('Please fill in at least one field.'); return }
    await add(bucket, creating)
    setCreating(null)
  }

  const exportCsv = () => {
    if (!rows.length) return
    const keys = Object.keys(rows[0]).filter(k => typeof rows[0][k] !== 'object')
    const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${String(r[k] ?? '').replace(/"/g, '""')}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `${bucket}-${Date.now()}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  const exportPdf = (row) => {
    // Simple printable view (browser print-to-PDF)
    const w = window.open('', '_blank')
    w.document.write(`<html><head><title>${title}</title><style>body{font-family:system-ui;padding:40px;color:#111}h1{color:#ff7a18}table{width:100%;border-collapse:collapse;margin-top:20px}td{padding:8px;border-bottom:1px solid #eee}td:first-child{font-weight:600;width:200px;color:#666}</style></head><body><h1>SFam Logistics — ${title}</h1><table>${Object.entries(row).filter(([, v]) => typeof v !== 'object').map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table></body></html>`)
    w.document.close(); w.print()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <div className="label mb-1">{bucket}</div>
          <h1 className="font-display font-bold text-3xl">{title}</h1>
        </div>
        <div className="flex gap-3">
          <input className="input !py-2 max-w-xs" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          <button onClick={exportCsv} className="btn-ghost !py-2 text-sm"><Download className="w-4 h-4" /> CSV</button>
          {formFields.length > 0 && (
            <button onClick={startCreate} className="btn-primary !py-2 !px-5 text-sm"><Plus className="w-4 h-4" /> New</button>
          )}
        </div>
      </div>

      <div className="glass-strong overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 text-center text-white/40">No submissions yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-white/50">
                <tr>
                  {columns.map(c => <th key={c.key} className="px-5 py-4">{c.label}</th>)}
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(r => (
                  <tr key={r.id} className="hover:bg-white/[0.03]">
                    {columns.map(c => <td key={c.key} className="px-5 py-4">{c.render ? c.render(r) : r[c.key] || '—'}</td>)}
                    <td className="px-5 py-4 text-white/50 text-xs">{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <select value={r.status} onChange={e => update(bucket, r.id, { status: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs">
                        <option>new</option><option>contacted</option><option>approved</option><option>rejected</option><option>archived</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setView(r)} className="p-2 rounded-lg bg-white/5 hover:bg-orange-500/20 hover:text-orange-300"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => exportPdf(r)} className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300"><Download className="w-4 h-4" /></button>
                        <button onClick={() => confirm('Delete this submission?') && remove(bucket, r.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {creating && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setCreating(null)}>
          <div className="glass-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setCreating(null)} className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-red-500/20"><X className="w-4 h-4" /></button>
            <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-3"><Plus className="w-6 h-6 text-orange-400" /> New {title.replace(/s$/, '')}</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {formFields.map(f => (
                <label key={f.key} className={f.full ? 'sm:col-span-2 block' : 'block'}>
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{f.label}</span>
                  {f.type === 'textarea' ? (
                    <textarea
                      value={creating[f.key] || ''}
                      onChange={e => setCreating({ ...creating, [f.key]: e.target.value })}
                      placeholder={f.placeholder || ''}
                      rows={4}
                      className="input mt-1 !py-2 text-sm"
                    />
                  ) : f.type === 'select' ? (
                    <select
                      value={creating[f.key] || ''}
                      onChange={e => setCreating({ ...creating, [f.key]: e.target.value })}
                      className="select mt-1 !py-2 text-sm"
                    >
                      <option value="">— select —</option>
                      {(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={f.type || 'text'}
                      value={creating[f.key] || ''}
                      onChange={e => setCreating({ ...creating, [f.key]: e.target.value })}
                      placeholder={f.placeholder || ''}
                      className="input mt-1 !py-2 text-sm"
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={saveCreate} className="btn-primary !py-2.5"><Save className="w-4 h-4" /> Save</button>
              <button onClick={() => setCreating(null)} className="btn-ghost !py-2.5">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {view && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setView(null)}>
          <div className="glass-strong max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setView(null)} className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-red-500/20"><X className="w-4 h-4" /></button>
            <h2 className="font-display font-bold text-2xl mb-6">Submission Details</h2>
            <dl className="space-y-3">
              {Object.entries(view).map(([k, v]) => {
                if (v == null || v === '') return null
                // Render uploaded files / resume as download links
                if ((k === 'uploadedFiles' || k === 'resumeFile') && v) {
                  const files = Array.isArray(v) ? v : [v]
                  return (
                    <div key={k} className="py-2 border-b border-white/5">
                      <dt className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-2">📎 {k === 'resumeFile' ? 'Resume' : 'Uploaded Documents'}</dt>
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
                    <dd className="col-span-2 text-sm break-words">{typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v)}</dd>
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
