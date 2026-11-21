import SectionTitle from './SectionTitle.jsx'
import { projects } from '../data.js'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionTitle number="04">Project logs</SectionTitle>
      {projects.map((p) => (
        <article key={p.log} className="project">
          <div className="project-media">
            <img src={p.image} alt={p.imageAlt} />
          </div>
          <div className="project-body">
            <div className="mono label meta">
              <span className="accent">{p.log}</span>
              <span className="muted">{p.status}</span>
            </div>
            <h3>{p.title}</h3>
            <p className="desc">{p.description}</p>
            <ul className="features">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="tech mono">
              {p.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <a href={p.link.href} target="_blank" rel="noopener noreferrer">
              {p.link.label}
            </a>
          </div>
        </article>
      ))}
    </section>
  )
}
