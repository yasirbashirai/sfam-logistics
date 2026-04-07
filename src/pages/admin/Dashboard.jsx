import { FileText, Truck, Users, MessageSquare, TrendingUp } from 'lucide-react'
import { useSubmissions } from '../../context/SubmissionsContext.jsx'

export default function Dashboard() {
  const { data } = useSubmissions()
  const stats = [
    { i: FileText, l: 'Quote Requests', n: data.quotes.length, c: 'from-orange-400 to-orange-600' },
    { i: Truck, l: 'Carriers', n: data.carriers.length, c: 'from-orange-400 to-orange-600' },
    { i: Users, l: 'Agents', n: data.agents.length, c: 'from-orange-400 to-orange-600' },
    { i: MessageSquare, l: 'Contacts', n: data.contacts.length, c: 'from-emerald-500 to-emerald-700' }
  ]
  const recent = [
    ...data.quotes.slice(0, 5).map(x => ({ ...x, type: 'Quote', label: `${x.originCity || '?'} → ${x.destCity || '?'}` })),
    ...data.carriers.slice(0, 5).map(x => ({ ...x, type: 'Carrier', label: x.company })),
    ...data.agents.slice(0, 5).map(x => ({ ...x, type: 'Agent', label: x.name }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8)

  return (
    <div>
      <div className="mb-8">
        <div className="label mb-2">Dashboard</div>
        <h1 className="font-display font-bold text-4xl">Welcome back 👋</h1>
        <p className="text-white/60 mt-2">Here&apos;s what&apos;s happening with SFam Logistics today.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(s => (
          <div key={s.l} className="glass-strong p-6 relative overflow-hidden">
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${s.c} rounded-full blur-2xl opacity-30`} />
            <s.i className="w-8 h-8 text-orange-400 mb-4 relative" />
            <div className="text-4xl font-display font-bold gradient-text relative">{s.n}</div>
            <div className="text-xs text-white/50 uppercase tracking-wider mt-1 relative">{s.l}</div>
          </div>
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
              <div key={r.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 shrink-0">{r.type}</span>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{r.label}</div>
                    <div className="text-xs text-white/50">{new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300">{r.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
