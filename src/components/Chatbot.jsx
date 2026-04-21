import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

const faqs = [
  { q: 'How do I get a quote?', a: 'Click "Get a Quote" in the menu or visit our quote page. Fill out the 4-step form with your origin, destination, freight type, and contact info. Most quotes are returned within 30 minutes during business hours (Mon–Fri, 8AM–5PM PST). After hours? We\'ll respond first thing the next business day.' },
  { q: 'How can I become a carrier?', a: 'Visit our Carrier Onboarding page to submit your application. You\'ll need your MC number, DOT number, Certificate of Insurance, W-9, and a photo of your truck. Our team verifies your authority and insurance, and most carriers are approved within 24 hours.' },
  { q: 'Do you hire freight agents?', a: 'Yes! We are actively recruiting independent freight agents. We offer competitive commission splits (up to 75%), full back-office support, TMS access through AscendTMS, and weekly commission pay. Visit our Agent Opportunities page to apply.' },
  { q: 'What areas do you cover?', a: 'We provide freight brokerage services across the United States and North America. We have deep capacity in the Pacific Northwest, California, Texas Triangle, Midwest lanes, Southeast, and Northeast corridors.' },
  { q: 'What freight types do you handle?', a: 'We coordinate Full Truckload (FTL), Less-Than-Truckload (LTL), Refrigerated (Reefer), Flatbed & Open Deck, Dedicated Freight, and Expedited & Time-Critical shipments. Whether it\'s dry goods, temperature-sensitive cargo, or oversized loads — we\'ve got you covered.' },
  { q: 'How fast do you pay carriers?', a: 'Standard payment is Net-30 from receipt of POD and invoice. We also offer quick-pay options — same-day or 48-hour funding through our factoring partner OTR Solutions for a small discount. We believe drivers deserve to be paid promptly.' },
  { q: 'What is your MC and USDOT number?', a: 'Our Docket/MC Number is 1810116 and our USDOT Number is 4555943. We are a fully licensed, FMCSA-authorized property broker with BMC-84 bond coverage.' },
  { q: 'Do you offer same-day pay?', a: 'Yes! We offer same-day pay options through our factoring partner OTR Solutions. Quick-pay is available on every load so carriers can get paid in days, not weeks.' },
  { q: 'What are your business hours?', a: 'Our office hours are Monday through Friday, 8:00 AM to 5:00 PM PST. However, our dispatch team is available 24/7 for active loads, hot loads, and emergency capacity needs. For urgent freight, call us at 1 (888) 698-5556.' },
  { q: 'Where are you located?', a: 'We have two locations: 19125 North Creek Parkway Suite 120, Bothell, WA 98011 and 10220 3rd Avenue SE, Everett, WA 98208. We serve shippers and carriers nationwide across the United States.' },
  { q: 'Do you offer cargo insurance?', a: 'Yes — all carriers in our network carry cargo insurance and we require a minimum of $100K cargo coverage and $1M auto liability. We name our shippers as additional insured on file for added protection.' },
  { q: 'How do I track my shipment?', a: 'Visit our Track Shipment page and enter your load reference number, BOL, or PO number. You\'ll get real-time status updates from pickup to delivery. You can also call our dispatch team for live updates at 1 (888) 698-5556.' },
  { q: 'I want to speak to a live agent', a: 'We\'d love to connect you with a live team member! Please enter your name and email below, and we\'ll have someone reach out to you shortly. You can also call us directly at 1 (888) 698-5556 or email info@sfamlogistics.com.' }
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I\'m the SFam assistant. Pick a question below or type your own — a real human follows up during business hours.' }
  ])
  const [input, setInput] = useState('')
  const [showAllQuestions, setShowAllQuestions] = useState(false)
  const [showLiveAgentForm, setShowLiveAgentForm] = useState(false)
  const [liveAgentName, setLiveAgentName] = useState('')
  const [liveAgentEmail, setLiveAgentEmail] = useState('')
  const [liveAgentSent, setLiveAgentSent] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const findBestMatch = (text) => {
    const lower = text.toLowerCase().trim()
    const exact = faqs.find(f => f.q.toLowerCase() === lower)
    if (exact) return { answer: exact.a, isLiveAgent: exact.q === 'I want to speak to a live agent' }

    const keywords = {
      'quote': 0, 'pricing': 0, 'price': 0, 'rate': 0, 'cost': 0,
      'carrier': 1, 'onboard': 1, 'sign up': 1, 'haul': 1, 'drive': 1,
      'agent': 2, 'recruit': 2, 'commission': 2, 'hiring': 2,
      'area': 3, 'cover': 3, 'state': 3, 'where': 3, 'location': 9, 'address': 9, 'office': 9,
      'freight type': 4, 'ltl': 4, 'ftl': 4, 'reefer': 4, 'flatbed': 4, 'expedited': 4, 'service': 4,
      'pay': 5, 'payment': 5, 'quick pay': 5, 'fast pay': 5, 'net-30': 5,
      'mc': 6, 'usdot': 6, 'dot number': 6, 'mc number': 6, 'license': 6, 'authority': 6, 'docket': 6,
      'same-day': 7, 'same day pay': 7, 'quick-pay': 7,
      'hours': 8, 'open': 8, 'business hours': 8, 'schedule': 8, 'when': 8,
      'insurance': 10, 'cargo': 10, 'liability': 10, 'bonded': 10,
      'track': 11, 'tracking': 11, 'shipment': 11, 'status': 11, 'where is my': 11,
      'live agent': 12, 'speak': 12, 'human': 12, 'person': 12, 'talk': 12, 'call': 12, 'phone': 12, 'live': 12, 'real person': 12, 'someone': 12
    }

    let bestIdx = -1
    let bestScore = 0
    const scores = new Map()
    for (const [keyword, idx] of Object.entries(keywords)) {
      if (lower.includes(keyword)) {
        const current = scores.get(idx) || 0
        scores.set(idx, current + 1)
      }
    }
    for (const [idx, score] of scores) {
      if (score > bestScore) { bestScore = score; bestIdx = idx }
    }

    if (bestIdx >= 0 && bestIdx < faqs.length) {
      return { answer: faqs[bestIdx].a, isLiveAgent: bestIdx === 12 }
    }
    return null
  }

  const requestLiveAgent = async () => {
    if (!liveAgentName.trim() || !liveAgentEmail.trim()) return
    setLiveAgentSent(true)
    setMessages(m => [...m, {
      from: 'bot',
      text: `Thanks ${liveAgentName}! We've sent a notification to our team. Someone will reach out to you at ${liveAgentEmail} shortly. For immediate assistance, call 1 (888) 698-5556.`
    }])
    setShowLiveAgentForm(false)

    // Send email notification to SFam team
    try {
      await fetch('/api/live-agent-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorName: liveAgentName,
          visitorEmail: liveAgentEmail,
          timestamp: new Date().toISOString()
        })
      })
    } catch {}
  }

  const send = (text) => {
    if (!text.trim()) return
    const result = findBestMatch(text)
    const answer = result?.answer || null
    const isLiveAgent = result?.isLiveAgent || false

    setMessages(m => [
      ...m,
      { from: 'user', text },
      { from: 'bot', text: answer || 'Thanks for your message! I don\'t have an exact answer for that, but a team member will follow up shortly. For urgent loads, call us at 1 (888) 698-5556 or email info@sfamlogistics.com.' }
    ])
    setInput('')
    setShowAllQuestions(false)

    if (isLiveAgent) {
      setShowLiveAgentForm(true)
    }
  }

  const displayedFaqs = showAllQuestions ? faqs : faqs.slice(0, 5)

  return (
    <>
      <button onClick={() => setOpen(o => !o)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center shadow-xl shadow-orange-500/40 hover:scale-110 transition" aria-label="Chat">
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-3rem)] bg-brand-navy/98 backdrop-blur-2xl border border-orange-400/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[480px]">
          <div className="p-3 border-b border-white/10 bg-gradient-to-r from-orange-400/20 to-orange-600/20 flex items-center gap-3">
            <div className="w-8 h-8 grid place-items-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600"><Bot className="w-4 h-4" /></div>
            <div>
              <div className="font-semibold text-sm">SFam Assistant</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} gap-1.5`}>
                {m.from === 'bot' && <div className="w-6 h-6 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center"><Bot className="w-3 h-3 text-brand-navy" /></div>}
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs ${m.from === 'user' ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 'bg-white/10'}`}>{m.text}</div>
                {m.from === 'user' && <div className="w-6 h-6 shrink-0 rounded-full bg-white/10 grid place-items-center"><User className="w-3 h-3" /></div>}
              </div>
            ))}

            {/* Live agent contact form */}
            {showLiveAgentForm && !liveAgentSent && (
              <div className="p-3 rounded-xl bg-orange-400/10 border border-orange-400/30 space-y-2">
                <div className="text-[10px] text-orange-300 font-bold uppercase tracking-wider">Connect with a live agent</div>
                <input
                  value={liveAgentName}
                  onChange={e => setLiveAgentName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-brand-navy/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-orange-400"
                />
                <input
                  value={liveAgentEmail}
                  onChange={e => setLiveAgentEmail(e.target.value)}
                  placeholder="Your email"
                  type="email"
                  className="w-full bg-brand-navy/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-orange-400"
                />
                <button
                  onClick={requestLiveAgent}
                  className="w-full py-1.5 rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 text-brand-navy text-xs font-bold hover:opacity-90 transition"
                >
                  Request Live Agent
                </button>
              </div>
            )}

            <div className="pt-1">
              <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1.5">Quick questions</div>
              <div className="flex flex-wrap gap-1.5">
                {displayedFaqs.map(f => (
                  <button key={f.q} onClick={() => send(f.q)} className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 hover:border-orange-400 hover:text-orange-300 transition text-left">{f.q}</button>
                ))}
              </div>
              {!showAllQuestions && (
                <button onClick={() => setShowAllQuestions(true)} className="text-[10px] text-orange-400 mt-1.5 hover:underline">Show more questions...</button>
              )}
            </div>

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={e => { e.preventDefault(); send(input) }} className="p-2.5 border-t border-white/10 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." className="input !py-2 text-xs" />
            <button type="submit" className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center shrink-0"><Send className="w-3.5 h-3.5" /></button>
          </form>
        </div>
      )}
    </>
  )
}
