import { profile } from '../data.js'

const nav = [
  { href: '#profile', label: '01 PROFILE' },
  { href: '#skills', label: '02 SKILLS' },
  { href: '#certifications', label: '03 CERTIFICATIONS' },
  { href: '#projects', label: '04 PROJECTS' },
  { href: '#contact', label: '05 CONTACT' },
]

export default function Header() {
  return (
    <header className="header">
      <nav className="container nav" aria-label="Main">
        <a href="#top" className="brand">
          <span className="brand-dot" aria-hidden="true" />
          <span className="mono">{profile.name} // SAGE.OS</span>
        </a>
        <div className="nav-links mono">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
