import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

export default function Carousel({ items, autoPlay = true, interval = 5000 }) {
  const [idx, setIdx] = useState(0)
  const next = () => setIdx(i => (i + 1) % items.length)
  const prev = () => setIdx(i => (i - 1 + items.length) % items.length)

  useEffect(() => {
    if (!autoPlay) return
    const t = setInterval(next, interval)
    return () => clearInterval(t)
  }, [idx, autoPlay, interval])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl">
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {items.map((t, i) => (
            <div key={i} className="w-full shrink-0 px-2">
              <div className="glass-strong p-10 lg:p-14 relative">
                <Quote className="absolute top-8 right-8 w-16 h-16 text-orange-400/20" />
                <div className="flex gap-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-orange-400 text-orange-400" />)}</div>
                <p className="text-white/90 text-2xl lg:text-3xl leading-relaxed mb-8 italic font-display font-light">&ldquo;{t.q}&rdquo;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center text-brand-navy font-display italic font-black text-2xl shadow-lg shadow-orange-500/40">{t.n[0]}</div>
                  <div>
                    <div className="font-display italic font-bold text-xl">{t.n}</div>
                    <div className="text-sm text-white/50">{t.r}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button onClick={prev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-navy/80 backdrop-blur border-2 border-orange-400/40 grid place-items-center hover:bg-orange-400 hover:text-brand-navy transition group z-10">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-navy/80 backdrop-blur border-2 border-orange-400/40 grid place-items-center hover:bg-orange-400 hover:text-brand-navy transition group z-10">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all ${i === idx ? 'w-12 bg-orange-400' : 'w-2 bg-white/20 hover:bg-white/40'}`} />
        ))}
      </div>
    </div>
  )
}
