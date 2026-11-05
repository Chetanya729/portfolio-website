// Single source of truth for personal details. Everything here comes from
// the resume (Nov 2026) and the GitHub profile; edit this file to update the site.

export const profile = {
  name: 'Chetanya Bansal',
  firstName: 'Chetanya',
  lastName: 'Bansal',
  role: 'Java Backend Developer',
  roleSecondary: 'Spring Boot Developer',
  location: 'Gurugram, Haryana',
  email: 'chetanyabansal410@gmail.com',
  availability: 'Open to entry-level Java / Backend Developer roles',
  resumeUrl: './Chetanya_Bansal_Resume.pdf',
  resumeFileName: 'Chetanya_Bansal_Resume.pdf',
  githubUsername: 'Chetanya729',
  links: {
    github: 'https://github.com/Chetanya729',
    linkedin: 'https://www.linkedin.com/in/chetanya-javadev90/',
  },
} as const

export const heroHighlights = [
  { value: '6 mo', label: 'Software development internship' },
  { value: 'SIH', label: 'Smart India Hackathon national winner' },
  { value: '2FA', label: 'OAuth2, JWT & OTP auth flows built' },
] as const

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id'] | 'education'
