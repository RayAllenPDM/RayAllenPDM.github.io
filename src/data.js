// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: 'Ray Allen Castro',
  tagline: 'BS Information Technology student at PDM, building web apps and voice AI assistants.',
  bio: 'A responsible and fast learner in the field of Information Technology, eager to gain experience and develop new skills. I enjoy building things end to end, from web apps and databases to a voice AI assistant with a holographic interface.',
  photo: 'assets/ray-photo.jpg',
  resume: 'assets/Resume_Ray_Allen_Castro.pdf',
  details: [
    { label: 'NAME', value: 'Ray Allen Castro' },
    { label: 'COURSE', value: 'BS Information Technology · 2023–present' },
    { label: 'SCHOOL', value: 'Pambayang Dalubhasaan ng Marilao (PDM)' },
    { label: 'LOCATION', value: 'Marilao, Bulacan, Philippines' },
  ],
}

export const skills = [
  { group: 'PROGRAMMING', items: ['C', 'C#', 'Java', 'Python'] },
  { group: 'WEB DEVELOPMENT', items: ['HTML', 'CSS', 'JavaScript', 'React JS'] },
  { group: 'DATABASES & DEPLOYMENT', items: ['MySQL', 'MongoDB', 'GitHub', 'Render', 'Vercel', 'Hostinger'] },
  { group: 'AI & VOICE', items: ['Groq API', 'Fish Audio TTS', 'Wake-word & voice input', 'Streaming replies'] },
  { group: 'PRODUCTIVITY TOOLS', items: ['MS Word', 'Excel', 'PowerPoint', 'MS Access', 'Canva'] },
  { group: 'SOFT SKILLS', items: ['Leadership', 'Problem-solving', 'Filipino & English'] },
]

// Certificates: click a card on the site to view it.
// images = what shows in the viewer (several = the viewer gets ‹ › arrows)
// pdf    = optional original file for the "Open PDF" button
const C = 'assets/certs/'
export const certifications = [
  {
    org: 'CISCO',
    title: 'IT Customer Support Basics',
    date: 'Nov 18, 2026',
    thumb: C + 'cisco-it-customer-support-basics-thumb.jpg',
    images: [{ src: C + 'cisco-it-customer-support-basics.jpg', label: 'Certificate' }],
    pdf: C + 'cisco-it-customer-support-basics.pdf',
  },
  {
    org: 'AWS TRAINING',
    title: 'AWS Cloud Practitioner Essentials',
    date: 'Nov 1, 2025',
    thumb: C + 'aws-cloud-practitioner-essentials-thumb.jpg',
    images: [{ src: C + 'aws-cloud-practitioner-essentials.jpg', label: 'Certificate' }],
    pdf: C + 'aws-cloud-practitioner-essentials.pdf',
  },
  {
    org: 'CISCO',
    title: 'Operating Systems Basics',
    date: 'May 15, 2025',
    thumb: C + 'cisco-operating-systems-basics-credential-thumb.jpg',
    images: [
      { src: C + 'cisco-operating-systems-basics-credential.jpg', label: 'Course completion credential' },
      { src: C + 'cisco-operating-systems-basics.jpg', label: 'Certificate' },
    ],
    pdf: C + 'cisco-operating-systems-basics.pdf',
  },
  {
    org: 'TESDA',
    title: 'Introduction to CSS',
    date: 'Apr 20, 2025',
    thumb: C + 'tesda-introduction-to-css-thumb.jpg',
    images: [{ src: C + 'tesda-introduction-to-css.jpg', label: 'Certificate' }],
  },
  { org: 'SEMINAR', title: 'Capstone Forum — Certificate of Attendance', date: 'Jan 21, 2025' },
]

export const projects = [
  {
    log: 'LOG 001',
    status: 'STATUS: IN DEVELOPMENT',
    title: 'Great Sage Ciel — Voice AI Assistant',
    image: 'assets/great-sage-screenshot.jpg',
    imageAlt:
      "Great Sage Ciel interface: a glowing golden core inside rotating rune rings, with the subtitle 'Great Sage, activation complete. All systems are ready, Master.'",
    description:
      'A holographic desktop AI assistant that listens, thinks and answers out loud. It speaks with a Japanese voice, shows English subtitles, and replies in whatever language you speak to it.',
    features: [
      '"Hey Sage" wake word and push-to-talk',
      'Streaming replies with persistent memory',
      'Web search, PC commands and image analysis',
      'Boot animation and floating desktop hologram',
    ],
    tech: ['Groq', 'Fish Audio', 'VS Code'],
    // TODO: replace with your Great Sage repo link
    link: { label: 'Source code on GitHub →', href: 'https://github.com/RayAllenPDM' },
  },
]

export const contact = {
  email: 'allencastro808@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/RayAllenPDM' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ray-allen-castro-b4637a450/' },
  ],
}
