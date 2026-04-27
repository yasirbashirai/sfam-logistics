import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MessageSquare, Send, ArrowLeft, User, Headphones, Bot, Circle } from 'lucide-react'

export default function AdminChat() {
  const { id } = useParams()
  if (id) return <ChatThread id={id} />
  return <ConversationList />
}

function ConversationList() {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()

  const load = async () => {
    try {
      const r = await fetch('/api/chat/conversations')
      if (r.ok) setConversations(await r.json())
    } catch {}
    setLoading(false)
  }

  useEffect(() => {
    load()
    const t = setInterval(load, 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <div>
      <div className="mb-8">
        <div className="label mb-2">Live Chat</div>
        <h1 className="font-display font-bold text-4xl">Conversations</h1>
        <p className="text-white/60 mt-2">Visitor messages from the website chatbot. Click a conversation to join.</p>
      </div>

      <div className="glass-strong overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-white/40">Loading conversations...</div>
        ) : conversations.length === 0 ? (
          <div className="p-12 text-center text-white/40">No chat conversations yet. They'll appear here as soon as visitors start chatting.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {conversations.map(c => (
              <button
                key={c.id}
                onClick={() => nav(`/admin/chat/${c.id}`)}
                className="w-full text-left p-5 flex items-center gap-4 hover:bg-white/[0.04] transition"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-brand-navy" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{c.visitor_name || 'Anonymous visitor'}</span>
                    {c.status === 'awaiting-agent' && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 flex items-center gap-1">
                        <Circle className="w-2 h-2 fill-orange-400 text-orange-400 animate-pulse" /> Needs agent
                      </span>
                    )}
                    {c.status === 'closed' && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/50">Closed</span>
                    )}
                  </div>
                  <div className="text-xs text-white/50 truncate">{c.visitor_email || 'No email provided'} • {c.message_count} message{c.message_count === 1 ? '' : 's'} • {c.page}</div>
                </div>
                <div className="text-xs text-white/40 shrink-0">{new Date(c.last_message_at).toLocaleString()}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ChatThread({ id }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [convo, setConvo] = useState(null)
  const lastIdRef = useRef(null)
  const endRef = useRef(null)

  const loadConvo = async () => {
    try {
      const r = await fetch('/api/chat/conversations')
      if (r.ok) {
        const all = await r.json()
        const found = all.find(c => c.id === id)
        if (found) setConvo(found)
      }
    } catch {}
  }

  const loadMessages = async () => {
    try {
      const r = await fetch(`/api/chat/${id}/messages${lastIdRef.current ? `?since=${lastIdRef.current}` : ''}`)
      if (!r.ok) return
      const newMsgs = await r.json()
      if (Array.isArray(newMsgs) && newMsgs.length) {
        setMessages(prev => lastIdRef.current ? [...prev, ...newMsgs] : newMsgs)
        lastIdRef.current = newMsgs[newMsgs.length - 1].id
      }
    } catch {}
  }

  useEffect(() => {
    loadConvo()
    loadMessages()
    const t = setInterval(loadMessages, 3000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = async (e) => {
    e?.preventDefault()
    const text = input.trim()
    if (!text) return
    setInput('')
    await fetch(`/api/chat/${id}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: 'agent', text })
    })
    loadMessages()
  }

  const close = async () => {
    if (!confirm('Mark this conversation as closed?')) return
    await fetch(`/api/chat/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'closed' })
    })
    loadConvo()
  }

  return (
    <div className="max-w-4xl">
      <Link to="/admin/chat" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-orange-300 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to all conversations
      </Link>

      <div className="glass-strong overflow-hidden flex flex-col h-[70vh]">
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-orange-400/10 to-orange-600/10 flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold">{convo?.visitor_name || 'Anonymous visitor'}</div>
            <div className="text-xs text-white/50">{convo?.visitor_email || 'No email provided'} • Started {convo ? new Date(convo.created_at).toLocaleString() : ''}</div>
          </div>
          {convo?.status !== 'closed' && (
            <button onClick={close} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-300">Close conversation</button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-white/40 py-12 text-sm">No messages yet.</div>
          )}
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.sender === 'visitor' ? 'justify-start' : 'justify-end'} gap-2`}>
              {m.sender === 'visitor' && (
                <div className="w-7 h-7 shrink-0 rounded-full bg-white/10 grid place-items-center"><User className="w-4 h-4" /></div>
              )}
              <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.sender === 'visitor' ? 'bg-white/10' : m.sender === 'agent' ? 'bg-emerald-500/15 border border-emerald-400/30' : 'bg-orange-400/10 border border-orange-400/30'}`}>
                <div className="text-[9px] uppercase tracking-wider opacity-60 mb-1">{m.sender}</div>
                {m.text}
              </div>
              {m.sender === 'agent' && (
                <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center"><Headphones className="w-4 h-4 text-brand-navy" /></div>
              )}
              {m.sender === 'bot' && (
                <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center"><Bot className="w-4 h-4 text-brand-navy" /></div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {convo?.status !== 'closed' && (
          <form onSubmit={send} className="p-3 border-t border-white/10 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Reply as live agent..." className="input !py-2.5 text-sm" autoFocus />
            <button type="submit" className="px-4 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center text-brand-navy"><Send className="w-4 h-4" /></button>
          </form>
        )}
      </div>
    </div>
  )
}
