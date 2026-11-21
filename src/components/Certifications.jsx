import SectionTitle from './SectionTitle.jsx'
import { certifications } from '../data.js'

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <SectionTitle number="03">Certifications &amp; training</SectionTitle>
      <div className="grid-3">
        {certifications.map((c) => (
          <div key={c.title} className="panel cert">
            <span className="mono label accent">{c.org}</span>
            <span className="cert-title">{c.title}</span>
            <span className="mono muted small">{c.date}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
