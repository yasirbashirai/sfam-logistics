import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { KeyRound, Truck, CheckCircle2 } from 'lucide-react'
import { Orbs } from '../components/Section.jsx'
import PageMeta from '../components/PageMeta.jsx'

export default function ResetPassword() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const token = params.get('token') || ''

  const [form, setForm] = useState({ password: '', confirm: '' })
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    if (form.password.length < 8) return setErr('Password must be at least 8 characters.')
    if (form.password !== form.confirm) return setErr('Passwords do not match.')
    setBusy(true)
    try {
      const r = await fetch('/api/admin/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: form.password })
      })
      const data = await r.json().catch(() => ({}))
      if (r.ok && data.ok) {
        setDone(true)
        setTimeout(() => nav('/login'), 2500)
      } else {
        setErr(data.error || 'Could not reset password.')
      }
    } catch {
      setErr('Could not reach the server. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden">
      <PageMeta title="Set New Password" description="Set a new password for the SFam Logistics admin portal." noindex />
      <Orbs />
      <div className="container-x relative max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mx-auto mb-4"><Truck className="w-8 h-8" /></div>
          <h1 className="font-display font-bold text-4xl">Set New Password</h1>
          <p className="text-white/60 mt-2">Choose a strong password you'll remember</p>
        </div>

        {done ? (
          <div className="glass-strong p-8 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 mx-auto text-green-400" />
            <p className="text-white/80">Your password has been updated. Redirecting you to sign in…</p>
          </div>
        ) : !token ? (
          <div className="glass-strong p-8 text-center space-y-3">
            <p className="text-red-400">This reset link is missing its token. Please request a new one.</p>
            <Link to="/forgot-password" className="btn-primary inline-flex mt-2">Request New Link</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="glass-strong p-8 space-y-4">
            <input className="input" type="password" placeholder="New password (min 8 characters)" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            <input className="input" type="password" placeholder="Confirm new password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required />
            {err && <div className="text-sm text-red-400">{err}</div>}
            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">{busy ? 'Saving…' : <>Update Password <KeyRound className="w-5 h-5" /></>}</button>
          </form>
        )}

        <Link to="/login" className="block text-center text-sm text-white/50 hover:text-orange-300 mt-6">← Back to sign in</Link>
      </div>
    </section>
  )
}
