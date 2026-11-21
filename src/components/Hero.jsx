import { profile } from '../data.js'
import SageCore from './SageCore.jsx'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <div className="bootlog mono">
          <div className="line l1">&gt; Initializing analysis system…</div>
          <div className="line l2">&gt; Scanning individual…</div>
          <div className="line l3">
            &gt; Subject identified: <span className="accent">{profile.name}</span>
          </div>
          <div className="line l4">
            &gt; Analysis complete.<span className="caret accent"> ▍</span>
          </div>
        </div>
        <p className="mono accent notice">NOTICE</p>
        <h1>Hello, I'm {profile.name}.</h1>
        <p className="tagline">{profile.tagline}</p>
        <div className="actions">
          <a href="#projects" className="btn btn-primary">View project logs</a>
          <a href={profile.resume} download className="btn btn-ghost">Download resume</a>
        </div>
      </div>

      <div className="orb-wrap" aria-hidden="true">
        <SageCore />
      </div>
    </section>
  )
}
