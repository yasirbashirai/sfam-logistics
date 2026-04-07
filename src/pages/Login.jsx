import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogIn, Truck } from 'lucide-react'
import { Orbs } from '../components/Section.jsx'

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  const submit = (e) => {
    e.preventDefault()
    // Demo credentials
    if (form.email === 'admin@sfamlogistics.com' && form.password === 'admin123') {
      localStorage.setItem('sfam_admin', '1')
      nav('/admin')
    } else {
      setErr('Invalid credentials. Demo: admin@sfamlogistics.com / admin123')
    }
  }
  return (
    <section className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden">
      <Orbs />
      <div className="container-x relative max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 grid place-items-center mx-auto mb-4"><Truck className="w-8 h-8" /></div>
          <h1 className="font-display font-bold text-4xl">Admin Portal</h1>
          <p className="text-white/60 mt-2">Sign in to manage submissions</p>
        </div>
        <form onSubmit={submit} className="glass-strong p-8 space-y-4">
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          {err && <div className="text-sm text-red-400">{err}</div>}
          <button type="submit" className="btn-primary w-full">Sign In <LogIn className="w-5 h-5" /></button>
          <div className="text-xs text-white/40 text-center pt-2">Demo: admin@sfamlogistics.com / admin123</div>
        </form>
        <Link to="/" className="block text-center text-sm text-white/50 hover:text-orange-300 mt-6">← Back to website</Link>
      </div>
    </section>
  )
}
