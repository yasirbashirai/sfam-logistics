import { useState, useRef, useEffect, useMemo } from 'react'
import { MessageCircle, X, Send, Bot, User, Headphones } from 'lucide-react'

const faqs = [
  { q: 'How do I get a quote?', a: 'Click "Get a Quote" in the menu or visit our quote page. Fill out the 4-step form with your origin, destination, freight type, and contact info. Most quotes are returned within 30 minutes during business hours (Mon–Fri, 7AM–5PM PST). After hours? We\'ll respond first thing the next business day.' },
  { q: 'How can I become a carrier?', a: 'Visit our Carrier Onboarding page to submit your application. You\'ll need your MC number, DOT number, Certificate of Insurance, W-9, and a photo of your truck. Our team verifies your authority and insurance, and most carriers are approved within 24 hours.' },
  { q: 'Do you hire freight agents?', a: 'Yes! We are actively recruiting independent freight agents. We offer competitive commission splits (up to 75%), full back-office support, TMS access through AscendTMS, and weekly commission pay. Visit our Agent Opportunities page to apply.' },
  { q: 'What areas do you cover?', a: 'We provide freight brokerage services across the United States and North America. We have deep capacity in the Pacific Northwest, California, Texas Triangle, Midwest lanes, Southeast, and Northeast corridors.' },
  { q: 'What freight types do you handle?', a: 'We coordinate Full Truckload (FTL), Less-Than-Truckload (LTL), Refrigerated (Reefer), Flatbed & Open Deck, Dedicated Freight, and Expedited & Time-Critical shipments. Whether it\'s dry goods, temperature-sensitive cargo, or oversized loads — we\'ve got you covered.' },
  { q: 'How fast do you pay carriers?', a: 'Standard payment is Net-30 from receipt of POD and invoice. We also offer quick-pay options — same-day or 48-hour funding through our factoring partner OTR Solutions for a small discount. We believe drivers deserve to be paid promptly.' },
  { q: 'What is your MC and USDOT number?', a: 'Our Docket/MC Number is 1810116 and our USDOT Number is 4555943. We are a fully licensed, FMCSA-authorized property broker with BMC-84 bond coverage.' },
  { q: 'Do you offer same-day pay?', a: 'Yes! We offer same-day pay options through our factoring partner OTR Solutions. Quick-pay is available on every load so carriers can get paid in days, not weeks.' },
  { q: 'What are your business hours?', a: 'Our office hours are Monday through Friday, 7:00 AM to 5:00 PM PST. However, our dispatch team is available 24/7 for active loads, hot loads, and emergency capacity needs. For urgent freight, call us at 1 (888) 698-5556.' },
  { q: 'Where are you located?', a: 'We have two locations: 19125 North Creek Parkway Suite 120, Bothell, WA 98011 and 10220 3rd Avenue SE, Everett, WA 98208. We serve shippers and carriers nationwide across the United States.' },
  { q: 'Do you offer cargo insurance?', a: 'Yes — all carriers in our network carry cargo insurance and we require a minimum of $100K cargo coverage and $1M auto liability. We name our shippers as additional insured on file for added protection.' },
  { q: 'How do I track my shipment?', a: 'Visit our Track Shipment page and enter your load reference number, BOL, or PO number. You\'ll get real-time status updates from pickup to delivery. You can also call our dispatch team for live updates at 1 (888) 698-5556.' }
]

// keyword → faqs index. Lower number = higher priority.
const KEYWORDS = {
  'quote': 0, 'pricing': 0, 'price': 0, 'rate': 0, 'cost': 0, 'estimate': 0,
  'carrier': 1, 'onboard': 1, 'sign up': 1, 'haul': 1, 'drive for': 1, 'driver application': 1,
  'agent': 2, 'recruit': 2, 'commission': 2, 'hiring': 2, 'job': 2,
  'area': 3, 'cover': 3, 'state': 3, 'region': 3, 'corridor': 3, 'nationwide': 3,
  'freight type': 4, 'ltl': 4, 'ftl': 4, 'reefer': 4, 'flatbed': 4, 'expedited': 4, 'service': 4, 'equipment': 4,
  'pay': 5, 'payment': 5, 'net-30': 5, 'net 30': 5, 'invoice': 5, 'how fast pay': 5,
  'mc': 6, 'usdot': 6, 'dot number': 6, 'mc number': 6, 'license': 6, 'authority': 6, 'docket': 6,
  'same-day': 7, 'same day pay': 7, 'quick-pay': 7, 'quickpay': 7, 'factoring': 7,
  'hours': 8, 'open': 8, 'business hours': 8, 'schedule': 8, 'when': 8, 'timing': 8,
  'location': 9, 'address': 9, 'office': 9, 'where are you': 9, 'bothell': 9, 'everett': 9,
  'insurance': 10, 'cargo': 10, 'liability': 10, 'bonded': 10, 'bmc': 10,
  'track': 11, 'tracking': 11, 'shipment': 11, 'status': 11, 'where is my': 11, 'pod': 11
}

function findMatch(text) {
  const lower = text.toLowerCase().trim()
  if (!lower) return null
  const exact = faqs.find(f => f.q.toLowerCase() === lower)
  if (exact) return faqs.indexOf(exact)
  const scores = new Map()
  for (const [k, idx] of Object.entries(KEYWORDS)) {
    if (lower.includes(k)) scores.set(idx, (scores.get(idx) || 0) + k.length)
  }
  let bestIdx = -1, bestScore = 0
  for (const [idx, sc] of scores) if (sc > bestScore) { bestScore = sc; bestIdx = idx }
  return bestIdx >= 0 ? bestIdx : null
}

const CHAT_STORAGE_KEY = 'sfam_chat_v1'

const loadChatState = () => {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Drop sessions older than 24h so visitors don't get stuck on a stale convo
    if (Date.now() - (parsed.savedAt || 0) > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(CHAT_STORAGE_KEY)
      return null
    }
    return parsed
  } catch { return null }
}

const saveChatState = (state) => {
  try { localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify({ ...state, savedAt: Date.now() })) } catch {}
}

export default function Chatbot() {
  const persisted = typeof window !== 'undefined' ? loadChatState() : null
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(persisted?.messages || [
    { from: 'bot', text: 'Hi! I\'m the SFam assistant. Ask me anything — type a topic like "quote", "carrier", "tracking", or "live agent" to get started.' }
  ])
  const [input, setInput] = useState('')
  const [conversationId, setConversationId] = useState(persisted?.conversationId || null)
  const [showLiveAgentForm, setShowLiveAgentForm] = useState(false)
  const [agentJoined, setAgentJoined] = useState(persisted?.agentJoined || false)
  const [liveAgentName, setLiveAgentName] = useState(persisted?.name || '')
  const [liveAgentEmail, setLiveAgentEmail] = useState(persisted?.email || '')
  const messagesEndRef = useRef(null)
  const lastMsgIdRef = useRef(persisted?.lastMsgId || null)

  // Persist state across page refreshes so the agent's replies keep flowing
  useEffect(() => {
    if (conversationId) {
      saveChatState({
        conversationId,
        messages,
        agentJoined,
        name: liveAgentName,
        email: liveAgentEmail,
        lastMsgId: lastMsgIdRef.current
      })
    }
  }, [conversationId, messages, agentJoined, liveAgentName, liveAgentEmail])

  // 3 starter chips that show until the visitor sends their first message.
  // The rest of the FAQ stays "hidden" — surfaced only as placeholder hints
  // once the user starts typing a matching keyword.
  const QUICK_STARTERS = [0, 11, 1] // Quote, Track, Carrier
  const showStarters = messages.length === 1 && !showLiveAgentForm && !agentJoined

  // Dynamic placeholder hint based on what user is typing
  const placeholder = useMemo(() => {
    if (!input.trim()) return 'Type a topic to get started...'
    const idx = findMatch(input)
    if (idx === null) return 'Type your question or "live agent"...'
    if (input.toLowerCase().includes('live') || input.toLowerCase().includes('agent') || input.toLowerCase().includes('human')) {
      return 'Press enter to request a live agent'
    }
    return faqs[idx].q
  }, [input])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Poll backend for agent replies and conversation status once a conversation has started.
  // Detects three things:
  //   1. New agent messages → push into the visitor's chat
  //   2. Conversation status flipped to "closed" → notify visitor
  //   3. Status flipped to "joined" / first agent reply → show "Agent connected"
  useEffect(() => {
    if (!conversationId) return
    const poll = async () => {
      try {
        // Pull new messages
        const r = await fetch(`/api/chat/${conversationId}/messages${lastMsgIdRef.current ? `?since=${lastMsgIdRef.current}` : ''}`)
        if (r.ok) {
          const newMsgs = await r.json()
          if (Array.isArray(newMsgs) && newMsgs.length) {
            const agentMsgs = newMsgs.filter(m => m.sender === 'agent')
            if (agentMsgs.length) {
              setAgentJoined(prev => {
                if (!prev) {
                  // Add a system "joined" notice the first time an agent replies
                  setMessages(m => [...m, { from: 'system', text: '✓ A live agent has joined the chat.' }])
                }
                return true
              })
              setMessages(prev => [...prev, ...agentMsgs.map(m => ({ from: 'agent', text: m.text }))])
            }
            lastMsgIdRef.current = newMsgs[newMsgs.length - 1].id
          }
        }
      } catch {}
    }
    poll()
    const id = setInterval(poll, 4000)
    return () => clearInterval(id)
  }, [conversationId])

  const startConversationIfNeeded = async (firstMessage) => {
    if (conversationId) return conversationId
    try {
      const r = await fetch('/api/chat/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstMessage,
          visitorName: liveAgentName || null,
          visitorEmail: liveAgentEmail || null,
          page: typeof window !== 'undefined' ? window.location.pathname : '/'
        })
      })
      if (r.ok) {
        const data = await r.json()
        setConversationId(data.id)
        return data.id
      }
    } catch {}
    return null
  }

  const sendToBackend = async (text) => {
    const cid = await startConversationIfNeeded(text)
    if (!cid) return
    try {
      await fetch(`/api/chat/${cid}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: 'visitor', text })
      })
    } catch {}
  }

  const send = async (text) => {
    const t = text.trim()
    if (!t) return
    setMessages(m => [...m, { from: 'user', text: t }])
    setInput('')
    sendToBackend(t)

    const lower = t.toLowerCase()
    const wantsLive = ['live agent', 'human', 'real person', 'speak to', 'talk to', 'call me', 'live support'].some(k => lower.includes(k))

    if (wantsLive) {
      setMessages(m => [...m, { from: 'bot', text: 'I can connect you with a live agent. Please share your name and email so we can reach back out — and a team member will join this chat shortly.' }])
      setShowLiveAgentForm(true)
      return
    }

    const idx = findMatch(t)
    if (idx !== null) {
      setMessages(m => [...m, { from: 'bot', text: faqs[idx].a }])
    } else {
      setMessages(m => [...m, { from: 'bot', text: 'I don\'t have an exact answer for that yet. A live team member can help — type "live agent" to request one, call 1 (888) 698-5556, or email info@sfamlogistics.com.' }])
    }
  }

  const requestLiveAgent = async () => {
    if (!liveAgentName.trim() || !liveAgentEmail.trim()) return
    const cid = await startConversationIfNeeded('Live agent requested')
    let ok = false
    try {
      const r = await fetch('/api/live-agent-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorName: liveAgentName,
          visitorEmail: liveAgentEmail,
          conversationId: cid,
          timestamp: new Date().toISOString()
        })
      })
      ok = r.ok
    } catch {}

    if (ok && cid) {
      setMessages(m => [
        ...m,
        { from: 'system', text: '⏳ Connecting you to a live agent...' },
        { from: 'bot', text: `Thanks, ${liveAgentName}! Our Operations Team has been notified, and a team member will join this chat shortly. If you close this window, we'll also reach out to you at ${liveAgentEmail}.` }
      ])
    } else {
      // Backend unreachable — give the visitor a direct path
      setMessages(m => [
        ...m,
        { from: 'bot', text: `Thanks ${liveAgentName}! We had trouble notifying our team automatically. Please call us directly at 1 (888) 698-5556 or email support@sfamlogistics.com — we'll respond within one business hour.` }
      ])
    }
    setShowLiveAgentForm(false)
  }

  return (
    <>
      <button onClick={() => setOpen(o => !o)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center shadow-xl shadow-orange-500/40 hover:scale-110 transition" aria-label="Chat">
        {open ? <X className="w-6 h-6 text-brand-navy" /> : <MessageCircle className="w-6 h-6 text-brand-navy" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-brand-navy/98 backdrop-blur-2xl border border-orange-400/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px]">
          <div className="p-3 border-b border-white/10 bg-gradient-to-r from-orange-400/20 to-orange-600/20 flex items-center gap-3">
            <div className="w-8 h-8 grid place-items-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
              {agentJoined ? <Headphones className="w-4 h-4 text-brand-navy" /> : <Bot className="w-4 h-4 text-brand-navy" />}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{agentJoined ? 'Live Support Agent' : 'SFam Assistant'}</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {agentJoined ? 'Agent connected' : 'Online'}
              </div>
            </div>
            {!agentJoined && !showLiveAgentForm && (
              <button onClick={() => setShowLiveAgentForm(true)} className="text-[10px] uppercase tracking-wider text-orange-300 hover:text-orange-200 font-bold border border-orange-400/40 rounded-full px-2 py-1">
                Live agent
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => {
              if (m.from === 'system') {
                return (
                  <div key={i} className="flex justify-center my-1">
                    <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] uppercase tracking-wider font-bold">
                      {m.text}
                    </div>
                  </div>
                )
              }
              return (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} gap-1.5`}>
                  {m.from !== 'user' && (
                    <div className="w-6 h-6 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center">
                      {m.from === 'agent' ? <Headphones className="w-3 h-3 text-brand-navy" /> : <Bot className="w-3 h-3 text-brand-navy" />}
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${m.from === 'user' ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-brand-navy font-semibold' : m.from === 'agent' ? 'bg-emerald-500/15 border border-emerald-400/30' : 'bg-white/10'}`}>
                    {m.text}
                  </div>
                  {m.from === 'user' && <div className="w-6 h-6 shrink-0 rounded-full bg-white/10 grid place-items-center"><User className="w-3 h-3" /></div>}
                </div>
              )
            })}

            {showStarters && (
              <div className="pt-1 space-y-1.5">
                <div className="text-[9px] uppercase tracking-widest text-orange-300/70 font-bold pl-8">Quick start</div>
                {QUICK_STARTERS.map(idx => (
                  <button
                    key={idx}
                    onClick={() => send(faqs[idx].q)}
                    className="w-full text-left text-xs px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-orange-400/15 border border-white/10 hover:border-orange-400/40 transition"
                  >
                    {faqs[idx].q}
                  </button>
                ))}
                <div className="text-[10px] text-white/40 pl-8 pt-1">Or type a topic — I&apos;ll suggest more as you go.</div>
              </div>
            )}

            {showLiveAgentForm && (
              <div className="p-3 rounded-xl bg-orange-400/10 border border-orange-400/30 space-y-2">
                <div className="text-[10px] text-orange-300 font-bold uppercase tracking-wider">Connect with a live agent</div>
                <input value={liveAgentName} onChange={e => setLiveAgentName(e.target.value)} placeholder="Your name" className="w-full bg-brand-navy/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-orange-400" />
                <input value={liveAgentEmail} onChange={e => setLiveAgentEmail(e.target.value)} placeholder="Your email" type="email" className="w-full bg-brand-navy/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-orange-400" />
                <div className="flex gap-2">
                  <button onClick={requestLiveAgent} className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 text-brand-navy text-xs font-bold hover:opacity-90 transition">Request</button>
                  <button onClick={() => setShowLiveAgentForm(false)} className="px-3 py-1.5 rounded-lg bg-white/5 text-white/70 text-xs hover:bg-white/10">Cancel</button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={e => { e.preventDefault(); send(input) }} className="p-2.5 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={placeholder}
              className="input !py-2 text-xs"
              autoComplete="off"
            />
            <button type="submit" className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center shrink-0">
              <Send className="w-3.5 h-3.5 text-brand-navy" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
