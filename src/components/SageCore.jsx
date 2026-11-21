import { useMemo } from 'react'

// Animated Great Sage core: golden burst, glowing ring, rotating rune rings, teal HUD ticks.
// Runes are Elder Futhark (public domain), rendered with the Noto Sans Runic font.
const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ'
const C = 250 // centre of the 500×500 viewBox

const circlePath = (r) =>
  `M ${C} ${C - r} a ${r} ${r} 0 1 1 0 ${2 * r} a ${r} ${r} 0 1 1 0 ${-2 * r}`

function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const polar = (r, a) => [C + r * Math.cos(a), C + r * Math.sin(a)]

export default function SageCore() {
  const g = useMemo(() => {
    const rnd = seeded(7)
    const ticks = Array.from({ length: 120 }, (_, i) => {
      const a = (i / 120) * Math.PI * 2
      const long = i % 10 === 0
      const [x1, y1] = polar(214, a)
      const [x2, y2] = polar(long ? 228 : 220, a)
      return { x1, y1, x2, y2, long }
    })
    const burst = Array.from({ length: 36 }, () => {
      const a = rnd() * Math.PI * 2
      const [x2, y2] = polar(25 + rnd() * 70, a)
      return { x2, y2, w: 0.4 + rnd() * 1.2, o: 0.35 + rnd() * 0.6 }
    })
    const beams = Array.from({ length: 9 }, () => {
      const a = rnd() * Math.PI
      const [x1, y1] = polar(245, a)
      const [x2, y2] = polar(245, a + Math.PI)
      return { x1, y1, x2, y2, o: 0.08 + rnd() * 0.14 }
    })
    const sparks = Array.from({ length: 46 }, () => {
      const a = rnd() * Math.PI * 2
      const [cx, cy] = polar(rnd() * 88, a)
      return { cx, cy, r: 0.5 + rnd() * 1.5, o: 0.4 + rnd() * 0.6 }
    })
    const dots = Array.from({ length: 56 }, (_, i) => {
      const [cx, cy] = polar(112, (i / 56) * Math.PI * 2)
      return { cx, cy, r: i % 4 === 0 ? 2.2 : 1.2 }
    })
    const ring = Array.from({ length: 12 }, (_, i) => polar(100, (i / 12) * Math.PI * 2 + Math.PI / 12).join(',')).join(' ')
    return { ticks, burst, beams, sparks, dots, ring }
  }, [])

  const outerRunes = RUNES.repeat(2)
  const innerRunes = RUNES.repeat(4)

  return (
    <div className="sage-core">
      <div className="sc-bokeh sc-b1" />
      <div className="sc-bokeh sc-b2" />
      <div className="sc-bokeh sc-b3" />
      <div className="sc-bokeh sc-b4" />

      <svg viewBox="0 0 500 500" className="sc-svg" aria-hidden="true">
        <defs>
          <radialGradient id="sc-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffdf2" />
            <stop offset="10%" stopColor="#ffe9a8" />
            <stop offset="35%" stopColor="#d99a3a" />
            <stop offset="70%" stopColor="#6b3f10" />
            <stop offset="100%" stopColor="#2a1704" />
          </radialGradient>
          <radialGradient id="sc-flare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="30%" stopColor="#fff3c4" stopOpacity=".85" />
            <stop offset="100%" stopColor="#ffd36a" stopOpacity="0" />
          </radialGradient>
          <filter id="sc-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="sc-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path id="sc-path-outer" d={circlePath(172)} />
          <path id="sc-path-inner" d={circlePath(130)} />
        </defs>

        {/* faint light beams across the whole circle */}
        <g className="sc-spin-slow">
          {g.beams.map((b, i) => (
            <line key={i} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} stroke="#bfe6ff" strokeWidth=".7" opacity={b.o} />
          ))}
        </g>

        {/* outer HUD: thin circle + ticks */}
        <circle cx={C} cy={C} r="242" fill="none" stroke="rgba(120,190,220,.22)" strokeWidth="1" />
        <g className="sc-spin-rev-slow">
          {g.ticks.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={t.long ? 'rgba(150,210,235,.7)' : 'rgba(120,180,210,.35)'} strokeWidth={t.long ? 1.4 : 0.8} />
          ))}
        </g>

        {/* teal arc segments */}
        <g className="sc-spin-mid">
          <circle cx={C} cy={C} r="200" fill="none" stroke="rgba(70,150,185,.75)" strokeWidth="6"
            strokeDasharray="70 38 22 64 110 46 30 88 50 70" />
        </g>
        <g className="sc-spin-rev">
          <circle cx={C} cy={C} r="190" fill="none" stroke="rgba(70,160,140,.35)" strokeWidth="2"
            strokeDasharray="4 10" />
        </g>

        {/* outer rune ring */}
        <circle cx={C} cy={C} r="190" fill="none" stroke="rgba(255,180,80,.45)" strokeWidth="1" />
        <circle cx={C} cy={C} r="153" fill="none" stroke="rgba(255,180,80,.45)" strokeWidth="1" />
        <g className="sc-spin" filter="url(#sc-glow)">
          <text className="sc-runes" fontSize="26" fill="#ffad42">
            <textPath href="#sc-path-outer" textLength={2 * Math.PI * 172 - 4} lengthAdjust="spacing">
              {outerRunes}
            </textPath>
          </text>
        </g>

        {/* inner rune ring */}
        <g className="sc-spin-rev" filter="url(#sc-glow)">
          <text className="sc-runes" fontSize="12" fill="#ffd27a" opacity=".9">
            <textPath href="#sc-path-inner" textLength={2 * Math.PI * 130 - 4} lengthAdjust="spacing">
              {innerRunes}
            </textPath>
          </text>
        </g>
        <circle cx={C} cy={C} r="120" fill="none" stroke="rgba(120,220,170,.35)" strokeWidth="1.2" />

        {/* dotted ring */}
        <g className="sc-spin">
          {g.dots.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="#fff6d8" opacity=".85" />
          ))}
        </g>

        {/* core */}
        <circle cx={C} cy={C} r="98" fill="url(#sc-core)" />
        <g className="sc-burst">
          {g.burst.map((b, i) => (
            <line key={i} x1={C} y1={C} x2={b.x2} y2={b.y2} stroke="#fff4cf" strokeWidth={b.w} opacity={b.o} />
          ))}
          {g.sparks.map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#fffbe6" opacity={s.o} />
          ))}
        </g>
        <circle className="sc-flare" cx={C} cy={C} r="34" fill="url(#sc-flare)" />

        {/* glowing 12-sided ring */}
        <polygon className="sc-ring" points={g.ring} fill="none" stroke="#ffe08a" strokeWidth="9"
          strokeLinejoin="round" filter="url(#sc-glow-strong)" />
        <polygon points={g.ring} fill="none" stroke="#fffbea" strokeWidth="3" strokeLinejoin="round" />
      </svg>

      <div className="sc-status mono">
        <span><i className="sc-dot" /> GREAT SAGE</span>
        <span>STATUS: <b>ONLINE</b></span>
        <span>LANG: AUTO</span>
      </div>
    </div>
  )
}
