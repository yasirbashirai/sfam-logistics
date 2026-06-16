import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogIn, Truck } from 'lucide-react'
import { Orbs } from '../components/Section.jsx'
import PageMeta from '../components/PageMeta.jsx'

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      })
      const data = await r.json().catch(() => ({}))
      if (r.ok && data.ok) {
        localStorage.setItem('sfam_admin', '1')
        nav('/admin')
      } else {
        setErr(data.error || 'Invalid email or password.')
      }
    } catch {
      setErr('Could not reach the server. Please try again.')
    } finally {
      setBusy(false)
    }
  }
  return (
    <section className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden">
      <PageMeta title="Admin Sign In" description="Internal admin sign-in for SFam Logistics LLC staff." noindex />
      <Orbs />
      <div className="container-x relative max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mx-auto mb-4"><Truck className="w-8 h-8" /></div>
          <h1 className="font-display font-bold text-4xl">Admin Portal</h1>
          <p className="text-white/60 mt-2">Sign in to manage submissions</p>
        </div>
        <form onSubmit={submit} className="glass-strong p-8 space-y-4">
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          {err && <div className="text-sm text-red-400">{err}</div>}
          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">{busy ? 'Signing in…' : <>Sign In <LogIn className="w-5 h-5" /></>}</button>
          <Link to="/forgot-password" className="block text-center text-sm text-white/50 hover:text-orange-300 pt-1">Forgot password?</Link>
        </form>
        <Link to="/" className="block text-center text-sm text-white/50 hover:text-orange-300 mt-6">← Back to website</Link>
      </div>
    </section>
  )
}
