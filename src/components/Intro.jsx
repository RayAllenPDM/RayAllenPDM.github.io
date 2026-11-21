import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import {
  playActivation, playGreeting, stopGreeting,
  playHover, playClick, playType, playWhoosh, unlockAudio,
} from '../sound.js'

// Edit the greeting here. These lines are also the English "subtitles"
// for the Japanese voice line in scripts/make-greeting.mjs.
const LINES = [
  'Notice.',
  'A visitor has been detected.',
  'You have entered the personal portfolio of Master Ray.',
  'Analysis complete. Access granted.',
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Intro({ onEnter }) {
  const instant = prefersReducedMotion()
  // idle → (activate) → typing → done → (enter) → leaving
  const [phase, setPhase] = useState('idle')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [flash, setFlash] = useState(0)
  const soundOn = useRef(false)
  const typing = phase === 'typing'
  const done = phase === 'done'

  // floating sparks
  const sparks = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        dur: 7 + Math.random() * 9,
        delay: -Math.random() * 16,
        drift: (Math.random() * 2 - 1) * 60,
        gold: i % 3 !== 0,
      })),
    []
  )

  const activate = useCallback(
    (withSound) => {
      if (phase !== 'idle') return
      soundOn.current = withSound
      if (withSound) {
        unlockAudio()
        playActivation()
        setTimeout(playGreeting, 700)
      }
      setFlash((f) => f + 1)
      if (instant) {
        setLineIdx(LINES.length)
        setPhase('done')
      } else {
        setTimeout(() => setPhase('typing'), 650)
      }
    },
    [phase, instant]
  )

  // Typewriter effect (with soft typing ticks when sound is on)
  useEffect(() => {
    if (!typing) return
    if (lineIdx >= LINES.length) {
      setPhase('done')
      if (soundOn.current) playClick()
      return
    }
    const line = LINES[lineIdx]
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        if (soundOn.current && charIdx % 2 === 0 && line[charIdx] !== ' ') playType()
        setCharIdx((c) => c + 1)
      }, 38)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1)
      setCharIdx(0)
    }, 520)
    return () => clearTimeout(t)
  }, [typing, lineIdx, charIdx])

  const enter = useCallback(() => {
    if (leaving) return
    if (soundOn.current) playWhoosh()
    setLeaving(true)
    setTimeout(() => {
      stopGreeting()
      onEnter()
    }, instant ? 0 : 900)
  }, [leaving, onEnter, instant])

  // Keyboard: Enter/Space activates first, then enters. Esc skips.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        enter()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (phase === 'idle') activate(true)
        else if (phase === 'done') enter()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, activate, enter])

  const hover = () => {
    if (soundOn.current) playHover()
  }

  return (
    <div
      className={`intro intro-${phase}${leaving ? ' intro-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Master Ray's portfolio"
    >
      <div className="intro-bg" aria-hidden="true" />
      <div className="intro-shade" aria-hidden="true" />

      {/* animated HUD layers */}
      <div className="intro-fx" aria-hidden="true">
        <div className="fx-ring fx-ring-1" />
        <div className="fx-ring fx-ring-2" />
        <div className="fx-ring fx-ring-3" />
        <div className="fx-pulse" />
        <div className="fx-pulse fx-pulse-2" />
        <div className="fx-scan" />
        {sparks.map((s, i) => (
          <span
            key={i}
            className={`fx-spark${s.gold ? '' : ' fx-spark-teal'}`}
            style={{
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
              '--drift': `${s.drift}px`,
            }}
          />
        ))}
      </div>

      {flash > 0 && <div key={flash} className="fx-flash" aria-hidden="true" />}
      {flash > 0 && <div key={`w${flash}`} className="fx-shock" aria-hidden="true" />}

      <button type="button" className="intro-skip mono" onClick={enter} onMouseEnter={hover}>
        Skip ›
      </button>

      <div className="intro-content">
        <p className="intro-tag mono">GREAT SAGE // VISITOR PROTOCOL</p>

        {phase === 'idle' ? (
          <div className="intro-gate">
            <p className="intro-line intro-highlight mono gate-line">
              &gt; Visitor detected. Awaiting activation<span className="gate-dots"><i>.</i><i>.</i><i>.</i></span>
            </p>
            <div className="pop-wrap">
              <span className="pop-halo" aria-hidden="true" />
              <button
                type="button"
                className="intro-enter pop-btn"
                onClick={() => activate(true)}
                onMouseEnter={hover}
                autoFocus
              >
                <span className="pop-label">Activate Great Sage</span>
              </button>
            </div>
            <button type="button" className="intro-quiet mono" onClick={() => activate(false)}>
              Continue without sound
            </button>
          </div>
        ) : (
          <>
            <div className="intro-lines mono" aria-live="polite">
              {LINES.map((line, i) => {
                if (i > lineIdx) return null
                const text = i < lineIdx || done ? line : line.slice(0, charIdx)
                return (
                  <p key={line} className={i === 2 ? 'intro-line intro-highlight' : 'intro-line'}>
                    <span className="intro-prompt">&gt; </span>
                    {text}
                    {i === lineIdx && typing && <span className="intro-caret">▍</span>}
                  </p>
                )
              })}
            </div>

            <div className={`intro-actions${done ? ' show' : ''}`}>
              <h1 className="intro-title">Welcome to Master Ray's Portfolio</h1>
              {done && (
                <div className="pop-wrap">
                  <span className="pop-halo" aria-hidden="true" />
                  <button
                    type="button"
                    className="intro-enter pop-btn"
                    onClick={() => {
                      if (soundOn.current) playClick()
                      enter()
                    }}
                    onMouseEnter={hover}
                    autoFocus
                  >
                    <span className="pop-label">Enter portfolio</span>
                  </button>
                </div>
              )}
              <p className="intro-hint mono">or press Enter</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
