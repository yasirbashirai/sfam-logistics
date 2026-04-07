import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Truck, Users, MessageSquare, LogOut, Truck as Logo } from 'lucide-react'

export default function AdminLayout() {
  const nav = useNavigate()
  if (!localStorage.getItem('sfam_admin')) return <Navigate to="/login" replace />

  const links = [
    { to: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
    { to: '/admin/quotes', icon: FileText, label: 'Quote Requests' },
    { to: '/admin/carriers', icon: Truck, label: 'Carriers' },
    { to: '/admin/agents', icon: Users, label: 'Agents' },
    { to: '/admin/contacts', icon: MessageSquare, label: 'Contact Forms' }
  ]
  const logout = () => { localStorage.removeItem('sfam_admin'); nav('/') }

  return (
    <div className="pt-20 min-h-screen flex bg-brand-ink2">
      <aside className="w-64 shrink-0 border-r border-white/10 bg-brand-ink/60 backdrop-blur-xl p-5 hidden lg:block sticky top-20 self-start h-[calc(100vh-5rem)]">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-purple-600 grid place-items-center"><Logo className="w-5 h-5" /></div>
          <div className="font-display font-bold">Admin</div>
        </div>
        <nav className="space-y-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${isActive ? 'bg-gradient-to-r from-orange-500/20 to-purple-600/20 text-orange-300 border border-orange-400/30' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
              <l.icon className="w-4 h-4" /> {l.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="mt-8 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-red-300 hover:bg-red-500/10">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6 lg:p-10">
        <Outlet />
      </main>
    </div>
  )
}
