// Advanced animated USA freight network map
// Features: pulsing hubs, animated route lines, moving truck markers, hover info, rotating compass
import { useState } from 'react'

const HQ = { x: 110, y: 130, name: 'Bothell, WA HQ', loads: '12K+' }
const hubs = [
  { x: 130, y: 220, name: 'Portland', loads: '847' },
  { x: 145, y: 290, name: 'Los Angeles', loads: '2.1K' },
  { x: 200, y: 320, name: 'Phoenix', loads: '634' },
  { x: 320, y: 320, name: 'Dallas', loads: '1.8K' },
  { x: 410, y: 320, name: 'Atlanta', loads: '1.3K' },
  { x: 460, y: 250, name: 'Charlotte', loads: '512' },
  { x: 480, y: 180, name: 'New York', loads: '1.5K' },
  { x: 380, y: 180, name: 'Chicago', loads: '1.9K' },
  { x: 280, y: 200, name: 'Denver', loads: '720' }
]

export default function USAMap() {
  const [hover, setHover] = useState(null)

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 600 420" className="w-full h-auto">
        <defs>
          <radialGradient id="hubGlow"><stop offset="0%" stopColor="#f5a623" stopOpacity="0.9" /><stop offset="100%" stopColor="#f5a623" stopOpacity="0" /></radialGradient>
          <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f5a623" stopOpacity="0" />
            <stop offset="50%" stopColor="#f5a623" stopOpacity="1" />
            <stop offset="100%" stopColor="#f5a623" stopOpacity="0" />
          </linearGradient>
          <filter id="blur"><feGaussianBlur stdDeviation="1.5" /></filter>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>

        {/* === DOT GRID FORMING USA === */}
        <g fill="rgba(245,166,35,0.2)">
          {Array.from({ length: 36 }).map((_, row) =>
            Array.from({ length: 56 }).map((_, col) => {
              const cx = 60 + col * 9
              const cy = 80 + row * 8
              const inShape =
                cx > 90 && cx < 540 && cy > 90 && cy < 340 &&
                !(cx < 150 && cy > 270) &&
                !(cx > 480 && cy < 130) &&
                !(cx < 130 && cy < 140) &&
                !(cx > 510 && cy > 290)
              if (!inShape) return null
              return <circle key={`${row}-${col}`} cx={cx} cy={cy} r="1.6" />
            })
          )}
        </g>

        {/* === ROUTE LINES + ANIMATED TRUCKS === */}
        {hubs.map((h, i) => {
          const id = `path-${i}`
          const d = `M${HQ.x},${HQ.y} Q${(HQ.x + h.x) / 2 + (i % 2 ? 30 : -30)},${(HQ.y + h.y) / 2} ${h.x},${h.y}`
          return (
            <g key={i}>
              <path id={id} d={d} stroke="url(#route)" strokeWidth="1.5" fill="none" strokeDasharray="4 5">
                <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2.5s" repeatCount="indefinite" />
              </path>
              {/* Moving truck dot */}
              <circle r="4" fill="#f5a623" filter="url(#glow)">
                <animateMotion dur={`${5 + (i % 3)}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          )
        })}

        {/* === HUBS === */}
        {hubs.map((h, i) => (
          <g key={i} onMouseEnter={() => setHover(h)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
            <circle cx={h.x} cy={h.y} r="14" fill="url(#hubGlow)" />
            <circle cx={h.x} cy={h.y} r="5" fill="#f5a623">
              <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx={h.x} cy={h.y} r="10" fill="none" stroke="#f5a623" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="r" from="5" to="20" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* === HQ === */}
        <g>
          <circle cx={HQ.x} cy={HQ.y} r="22" fill="url(#hubGlow)" />
          <circle cx={HQ.x} cy={HQ.y} r="9" fill="#f5a623" />
          <circle cx={HQ.x} cy={HQ.y} r="5" fill="#0d1b2e" />
          <circle cx={HQ.x} cy={HQ.y} r="14" fill="none" stroke="#f5a623" strokeWidth="2">
            <animate attributeName="r" from="14" to="32" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x={HQ.x + 18} y={HQ.y - 6} fill="#f5a623" fontSize="11" fontWeight="900" fontStyle="italic">SFAM HQ</text>
          <text x={HQ.x + 18} y={HQ.y + 8} fill="#fff" fontSize="9" opacity="0.7">Bothell, WA</text>
        </g>

        {/* === COMPASS === */}
        <g transform="translate(540, 360)">
          <circle r="22" fill="rgba(13,27,46,0.8)" stroke="#f5a623" strokeWidth="1.5" />
          <g className="spin-slow" style={{ transformOrigin: '540px 360px' }}>
            <path d="M0,-15 L4,0 L0,15 L-4,0 Z" fill="#f5a623" />
          </g>
          <text textAnchor="middle" y="-25" fill="#fff" fontSize="9" fontWeight="700">N</text>
        </g>
      </svg>

      {/* Hover info card */}
      {hover && (
        <div className="absolute top-4 right-4 glass-navy p-4 min-w-[180px] pointer-events-none">
          <div className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">Live Hub</div>
          <div className="font-display italic font-black text-lg text-white">{hover.name}</div>
          <div className="text-xs text-white/60 mt-1">{hover.loads} loads moved</div>
        </div>
      )}
    </div>
  )
}
