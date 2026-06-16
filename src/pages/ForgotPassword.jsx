import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Truck } from 'lucide-react'
import { Orbs } from '../components/Section.jsx'
import PageMeta from '../components/PageMeta.jsx'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try {
      const r = await fetch('/api/admin/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (r.ok) setSent(true)
      else setErr('Something went wrong. Please try again.')
    } catch {
      setErr('Could not reach the server. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden">
      <PageMeta title="Reset Admin Password" description="Request a password reset link for the SFam Logistics admin portal." noindex />
      <Orbs />
      <div className="container-x relative max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mx-auto mb-4"><Truck className="w-8 h-8" /></div>
          <h1 className="font-display font-bold text-4xl">Forgot Password</h1>
          <p className="text-white/60 mt-2">We'll email you a secure reset link</p>
        </div>

        {sent ? (
          <div className="glass-strong p-8 text-center space-y-3">
            <Mail className="w-10 h-10 mx-auto text-orange-400" />
            <p className="text-white/80">If an admin account exists for <span className="font-semibold">{email}</span>, a reset link is on its way. The link is valid for 1 hour.</p>
            <p className="text-sm text-white/50">Check your inbox (and spam folder).</p>
          </div>
        ) : (
          <form onSubmit={submit} className="glass-strong p-8 space-y-4">
            <input className="input" type="email" placeholder="Admin email" value={email} onChange={e => setEmail(e.target.value)} required />
            {err && <div className="text-sm text-red-400">{err}</div>}
            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">{busy ? 'Sending…' : <>Send Reset Link <Mail className="w-5 h-5" /></>}</button>
          </form>
        )}

        <Link to="/login" className="block text-center text-sm text-white/50 hover:text-orange-300 mt-6">← Back to sign in</Link>
      </div>
    </section>
  )
}
