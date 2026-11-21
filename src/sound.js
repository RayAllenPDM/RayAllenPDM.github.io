// Sound for the welcome screen.
// - playActivation(): a short synthesized "system online" chime (no file needed).
// - playGreeting(): plays public/assets/greeting.mp3 (made with scripts/make-greeting.mjs).
//   If the file doesn't exist yet, it silently does nothing.

let ctx = null
const getCtx = () => {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

export function playActivation() {
  const ac = getCtx()
  if (!ac) return
  const now = ac.currentTime
  const master = ac.createGain()
  master.gain.setValueAtTime(0.0001, now)
  master.gain.exponentialRampToValueAtTime(0.22, now + 0.05)
  master.gain.exponentialRampToValueAtTime(0.0001, now + 2.4)
  master.connect(ac.destination)

  // rising sweep
  const sweep = ac.createOscillator()
  sweep.type = 'sine'
  sweep.frequency.setValueAtTime(180, now)
  sweep.frequency.exponentialRampToValueAtTime(720, now + 0.6)
  const sg = ac.createGain()
  sg.gain.setValueAtTime(0.5, now)
  sg.gain.exponentialRampToValueAtTime(0.0001, now + 0.8)
  sweep.connect(sg).connect(master)
  sweep.start(now)
  sweep.stop(now + 0.85)

  // shimmering chord
  ;[880, 1318.5, 1760, 2637].forEach((f, i) => {
    const o = ac.createOscillator()
    o.type = i % 2 ? 'triangle' : 'sine'
    o.frequency.setValueAtTime(f, now + 0.45 + i * 0.07)
    const gn = ac.createGain()
    const t0 = now + 0.45 + i * 0.07
    gn.gain.setValueAtTime(0.0001, t0)
    gn.gain.exponentialRampToValueAtTime(0.18 / (i + 1), t0 + 0.04)
    gn.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.8)
    o.connect(gn).connect(master)
    o.start(t0)
    o.stop(t0 + 1.9)
  })
}

let greeting = null
export function playGreeting() {
  try {
    greeting = new Audio(`${import.meta.env.BASE_URL}assets/greeting.mp3`)
    greeting.volume = 0.9
    const p = greeting.play()
    if (p && p.catch) p.catch(() => {})
  } catch {
    /* no audio support or file missing */
  }
}

export function stopGreeting() {
  if (greeting) {
    greeting.pause()
    greeting = null
  }
}

// ── Small UI sounds ─────────────────────────────────────
// Browsers only allow sound after the visitor's first click,
// so hover/typing sounds are silent until then (no errors).

function blip({ freq = 1200, to = null, dur = 0.08, type = 'sine', vol = 0.12, delay = 0 }) {
  const ac = getCtx()
  if (!ac || ac.state !== 'running') return
  const t = ac.currentTime + delay
  const o = ac.createOscillator()
  const g = ac.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, t)
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(vol, t + 0.008)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(ac.destination)
  o.start(t)
  o.stop(t + dur + 0.02)
}

export function unlockAudio() {
  getCtx()
}

export function playHover() {
  blip({ freq: 1800, dur: 0.05, vol: 0.05, type: 'triangle' })
}

export function playClick() {
  blip({ freq: 520, to: 1560, dur: 0.12, vol: 0.14, type: 'triangle' })
  blip({ freq: 2093, dur: 0.18, vol: 0.06, delay: 0.06 })
}

export function playType() {
  blip({ freq: 2400 + Math.random() * 600, dur: 0.025, vol: 0.025, type: 'square' })
}

export function playWhoosh() {
  const ac = getCtx()
  if (!ac || ac.state !== 'running') return
  const t = ac.currentTime
  const len = Math.floor(ac.sampleRate * 0.9)
  const buf = ac.createBuffer(1, len, ac.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len)
  const src = ac.createBufferSource()
  src.buffer = buf
  const f = ac.createBiquadFilter()
  f.type = 'bandpass'
  f.Q.value = 1.2
  f.frequency.setValueAtTime(300, t)
  f.frequency.exponentialRampToValueAtTime(4000, t + 0.7)
  const g = ac.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.25, t + 0.15)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.85)
  src.connect(f).connect(g).connect(ac.destination)
  src.start(t)
  blip({ freq: 196, to: 98, dur: 0.6, vol: 0.12, delay: 0.05 })
}
