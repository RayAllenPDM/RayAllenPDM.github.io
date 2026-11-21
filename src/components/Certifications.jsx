import { useEffect, useRef, useState, useCallback } from 'react'
import SectionTitle from './SectionTitle.jsx'
import { certifications } from '../data.js'

function CertViewer({ cert, onClose }) {
  const [page, setPage] = useState(0)
  const closeBtn = useRef(null)
  const total = cert.images.length
  const img = cert.images[page]

  const prev = useCallback(() => setPage((p) => (p - 1 + total) % total), [total])
  const next = useCallback(() => setPage((p) => (p + 1) % total), [total])

  useEffect(() => {
    closeBtn.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && total > 1) prev()
      else if (e.key === 'ArrowRight' && total > 1) next()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, prev, next, total])

  return (
    <div className="cv-backdrop" onClick={onClose}>
      <div
        className="cv-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${cert.title} certificate`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cv-head">
          <div className="cv-titles">
            <span className="mono label accent">{cert.org}</span>
            <h3>{cert.title}</h3>
            <span className="mono muted small">
              {cert.date}
              {total > 1 && ` · ${img.label} (${page + 1}/${total})`}
            </span>
          </div>
          <button ref={closeBtn} type="button" className="cv-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="cv-stage">
          {total > 1 && (
            <button type="button" className="cv-nav cv-prev" onClick={prev} aria-label="Previous image">‹</button>
          )}
          <img key={img.src} src={img.src} alt={`${cert.title} — ${img.label}`} className="cv-img" />
          {total > 1 && (
            <button type="button" className="cv-nav cv-next" onClick={next} aria-label="Next image">›</button>
          )}
        </div>

        <div className="cv-actions">
          {cert.pdf && (
            <a href={cert.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Open PDF ↗
            </a>
          )}
          <a href={img.src} download className="btn btn-ghost">Download image</a>
        </div>
      </div>
    </div>
  )
}

export default function Certifications() {
  const [open, setOpen] = useState(null)

  return (
    <section id="certifications" className="section">
      <SectionTitle number="03">Certifications &amp; training</SectionTitle>
      <div className="grid-3">
        {certifications.map((c) =>
          c.images ? (
            <button key={c.title} type="button" className="panel cert cert-clickable" onClick={() => setOpen(c)}>
              <span className="cert-thumb">
                <img src={c.thumb} alt="" loading="lazy" />
                <span className="cert-view mono">VIEW CERTIFICATE</span>
              </span>
              <span className="mono label accent">{c.org}</span>
              <span className="cert-title">{c.title}</span>
              <span className="mono muted small">{c.date}</span>
            </button>
          ) : (
            <div key={c.title} className="panel cert">
              <span className="mono label accent">{c.org}</span>
              <span className="cert-title">{c.title}</span>
              <span className="mono muted small">{c.date}</span>
            </div>
          )
        )}
      </div>
      {open && <CertViewer cert={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
