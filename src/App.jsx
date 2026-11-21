import { useEffect, useState } from 'react'
import Intro from './components/Intro.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Profile from './components/Profile.jsx'
import Skills from './components/Skills.jsx'
import Certifications from './components/Certifications.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

// The welcome screen shows once per browser tab session.
const SEEN_KEY = 'gs-intro-seen'
const readSeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => !readSeen())

  // Lock page scrolling while the welcome screen is open
  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showIntro])

  const handleEnter = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* storage unavailable: intro will just show again next visit */
    }
    setShowIntro(false)
  }

  return (
    <>
      {showIntro && <Intro onEnter={handleEnter} />}
      <div className="app scanlines" aria-hidden={showIntro ? 'true' : undefined}>
        <Header />
        <main id="top" className="container">
          <Hero key={showIntro ? 'waiting' : 'ready'} />
          <Profile />
          <Skills />
          <Certifications />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
