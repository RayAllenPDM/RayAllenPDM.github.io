import SectionTitle from './SectionTitle.jsx'
import { skills } from '../data.js'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionTitle number="02">Acquired skills</SectionTitle>
      <div className="grid-3">
        {skills.map((s) => (
          <div key={s.group} className="panel card">
            <span className="mono label accent">{s.group}</span>
            <div className="chips">
              {s.items.map((i) => (
                <span key={i} className="chip">{i}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
