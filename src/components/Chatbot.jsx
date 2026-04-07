import { useState } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

const faqs = [
  { q: 'How do I get a quote?', a: 'Click "Get a Quote" in the menu or visit /quote. Most quotes return in under 30 minutes during business hours.' },
  { q: 'How can I become a carrier?', a: 'Visit our Carrier Onboarding page to upload your MC, insurance, W-9, and truck photo. Approval typically within 24 hours.' },
  { q: 'Do you hire freight agents?', a: 'Yes! We are actively recruiting independent freight agents. Visit our Agent Opportunities page to apply.' },
  { q: 'What areas do you cover?', a: 'We cover all 48 contiguous states with focus on Pacific Northwest, California, Texas, and Midwest corridors.' },
  { q: 'What freight types?', a: 'FTL, LTL, dry van, reefer, flatbed, dedicated, and expedited shipments.' }
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I\'m the SFam assistant. Pick a question below or type your own — a real human follows up during business hours.' }
  ])
  const [input, setInput] = useState('')

  const send = (text) => {
    if (!text.trim()) return
    const lower = text.toLowerCase()
    const match = faqs.find(f => lower.includes(f.q.toLowerCase().split(' ')[0]) || lower.includes(f.q.toLowerCase().split(' ')[2] || ''))
    setMessages(m => [...m, { from: 'user', text }, { from: 'bot', text: match?.a || 'Thanks! A team member will reach out shortly. For urgent loads call 1 (888) 698-5556.' }])
    setInput('')
  }

  return (
    <>
      <button onClick={() => setOpen(o => !o)} className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center shadow-2xl shadow-orange-500/50 hover:scale-110 transition" aria-label="Chat">
        {open ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </button>

      {open && (
        <div className="fixed bottom-28 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] glass-strong p-0 overflow-hidden flex flex-col h-[520px]">
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-orange-400/20 to-orange-600/20 flex items-center gap-3">
            <div className="w-10 h-10 grid place-items-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600"><Bot className="w-5 h-5" /></div>
            <div>
              <div className="font-semibold">SFam Assistant</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.from === 'user' ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 'bg-white/10'}`}>{m.text}</div>
              </div>
            ))}
            <div className="pt-2">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Quick questions</div>
              <div className="flex flex-wrap gap-2">
                {faqs.slice(0,4).map(f => (
                  <button key={f.q} onClick={() => send(f.q)} className="text-[11px] px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-orange-400 hover:text-orange-300">{f.q}</button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={e => { e.preventDefault(); send(input) }} className="p-3 border-t border-white/10 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." className="input !py-2.5 text-sm" />
            <button type="submit" className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center"><Send className="w-4 h-4" /></button>
          </form>
        </div>
      )}
    </>
  )
}
