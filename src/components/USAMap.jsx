// Stylized USA coverage map (decorative SVG, not geographically exact)
export default function USAMap() {
  const hubs = [
    { x: 110, y: 130, name: 'Seattle / Bothell HQ', primary: true },
    { x: 130, y: 220, name: 'Portland' },
    { x: 145, y: 290, name: 'Los Angeles' },
    { x: 200, y: 320, name: 'Phoenix' },
    { x: 320, y: 320, name: 'Dallas' },
    { x: 410, y: 320, name: 'Atlanta' },
    { x: 460, y: 250, name: 'Charlotte' },
    { x: 480, y: 180, name: 'New York' },
    { x: 380, y: 180, name: 'Chicago' },
    { x: 280, y: 200, name: 'Denver' }
  ]
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 600 400" className="w-full h-auto">
        <defs>
          <radialGradient id="glow">
            <stop offset="0%" stopColor="#f5a623" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f5a623" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f5a623" stopOpacity="0" />
            <stop offset="50%" stopColor="#f5a623" stopOpacity="1" />
            <stop offset="100%" stopColor="#f5a623" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* dots grid backdrop forming USA-like shape */}
        <g fill="rgba(245,166,35,0.18)">
          {Array.from({ length: 36 }).map((_, row) => (
            Array.from({ length: 56 }).map((_, col) => {
              const cx = 60 + col * 9
              const cy = 80 + row * 8
              // Rough mask for USA shape
              const inShape =
                (cx > 90 && cx < 540 && cy > 90 && cy < 340) &&
                !(cx < 150 && cy > 270) &&
                !(cx > 480 && cy < 130) &&
                !(cx < 130 && cy < 140) &&
                !(cx > 510 && cy > 290)
              if (!inShape) return null
              return <circle key={`${row}-${col}`} cx={cx} cy={cy} r="1.6" />
            })
          ))}
        </g>

        {/* routes from HQ */}
        {hubs.slice(1).map((h, i) => (
          <line key={i} x1={hubs[0].x} y1={hubs[0].y} x2={h.x} y2={h.y} stroke="url(#route)" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.6">
            <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2s" repeatCount="indefinite" />
          </line>
        ))}

        {/* hubs */}
        {hubs.map((h, i) => (
          <g key={i}>
            <circle cx={h.x} cy={h.y} r={h.primary ? 18 : 12} fill="url(#glow)" />
            <circle cx={h.x} cy={h.y} r={h.primary ? 6 : 4} fill="#f5a623">
              <animate attributeName="r" values={`${h.primary ? 6 : 4};${h.primary ? 9 : 6};${h.primary ? 6 : 4}`} dur="2s" repeatCount="indefinite" />
            </circle>
            {h.primary && (
              <>
                <circle cx={h.x} cy={h.y} r="8" fill="none" stroke="#f5a623" strokeWidth="1">
                  <animate attributeName="r" from="8" to="22" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x={h.x + 14} y={h.y + 4} fill="#fff" fontSize="11" fontWeight="700">HQ</text>
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
