import { contact, profile } from '../data.js'

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="contact">
        <span className="mono accent label">05 // CONTACT CHANNEL</span>
        <h2>Shall we begin?</h2>
        <p className="tagline">Open to collaborations, freelance work and internship opportunities.</p>
        <div className="actions center mono">
          <a href={`mailto:${contact.email}`} className="btn btn-primary">{contact.email}</a>
          <a href={profile.resume} download className="btn btn-ghost">Download resume</a>
          {contact.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
