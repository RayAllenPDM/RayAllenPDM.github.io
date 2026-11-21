export default function SectionTitle({ number, children }) {
  return (
    <div className="section-title">
      <span className="mono accent label">{number} //</span>
      <h2>{children}</h2>
    </div>
  )
}
