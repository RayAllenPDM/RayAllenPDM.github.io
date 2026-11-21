import SectionTitle from './SectionTitle.jsx'
import { profile } from '../data.js'

export default function Profile() {
  return (
    <section id="profile" className="section">
      <SectionTitle number="01">Individual analysis</SectionTitle>
      <div className="profile">
        <div className="photo-wrap">
          <img src={profile.photo} alt={`Portrait of ${profile.name}`} className="photo" />
        </div>
        <div className="panel profile-panel">
          <p className="bio">{profile.bio}</p>
          <div className="details">
            {profile.details.map((d) => (
              <div key={d.label} className="detail">
                <span className="mono label muted">{d.label}</span>
                <span>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
