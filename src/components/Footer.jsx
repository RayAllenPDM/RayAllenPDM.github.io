import { profile } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner mono">
        <span>&gt; Analysis complete. © {new Date().getFullYear()} {profile.name}</span>
        <span>SAGE.OS v1.0</span>
      </div>
    </footer>
  )
}
