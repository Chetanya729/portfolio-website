export interface ExperienceEntry {
  organization: string
  role: string
  period: string
  type: string
  summary: string
  responsibilities: string[]
  tech: string[]
  /** One-line contributions surfaced as highlights */
  contributions?: string[]
  link?: { label: string; href: string }
}

export const experience: ExperienceEntry[] = [
  {
    organization: 'GreenChip Consulting',
    role: 'Software Development Intern',
    period: 'Jul 2023 – Jan 2024',
    type: 'Internship · 6 months',
    summary:
      'Developed and maintained backend modules using Core Java, JDBC and SQL within an Agile team, structuring code into layered domain, repository and service classes.',
    responsibilities: [
      'Built and validated data-access logic with SQL queries (joins, subqueries) for record checks and input/output validation.',
      'Wrote Stream API / Collectors utilities (groupingBy, partitioningBy) to parse, filter and summarise CSV data.',
      'Defined custom exception hierarchies with clear error messages and wrote JUnit tests for core service logic.',
      'Performed debugging and root-cause analysis; improved readability through modular refactoring and documentation.',
    ],
    contributions: [
      'Thread-safe handling of shared resources with ExecutorService, BlockingQueue and locks to prevent race conditions',
    ],
    tech: ['Core Java', 'JDBC', 'SQL', 'Stream API', 'ExecutorService', 'JUnit', 'Agile'],
  },
  {
    organization: 'Smart India Hackathon',
    role: 'National Winner · Team member',
    period: 'National hackathon',
    type: 'Achievement',
    summary: 'Co-built a solar tracking prototype designed to maximise energy capture.',
    responsibilities: ['Contributed the core tracking logic.'],
    tech: ['Hardware prototype', 'Tracking logic', 'Teamwork'],
  },
  {
    organization: 'Independent backend projects',
    role: 'Java Backend Developer',
    period: 'Ongoing',
    type: 'Self-directed',
    summary:
      'Building production-style Spring Boot services in the open — from authentication and SSO to a multi-tenant authorization engine with runtime RBAC.',
    responsibilities: [
      'Designing APIs with validation at the boundary and precise, typed error handling.',
      'Shipping security features: OAuth2 / OIDC, JWT, OTP two-factor and refresh-token rotation.',
      'Versioning schemas with Flyway, containerising with Docker and testing with JUnit, Mockito and Testcontainers.',
    ],
    tech: ['Spring Boot', 'Spring Security', 'PostgreSQL', 'MySQL', 'Redis', 'Docker'],
    link: { label: 'See the code on GitHub', href: 'https://github.com/Chetanya729' },
  },
]

export const education = [
  {
    degree: 'B.Tech, Computer Science and Engineering',
    institution: 'UIET, Kurukshetra',
    period: '2020 – 2024',
  },
  {
    degree: 'Senior Secondary Education (XII)',
    institution: 'Aggarsain Public School',
    period: '2018 – 2020',
  },
]

export const certifications = [
  { title: 'Advanced Java Developer', issuer: 'Coding Ninjas' },
  { title: 'Python Training', issuer: 'Internshala' },
  { title: 'Android App Development', issuer: 'Internshala' },
]

export const achievements = [
  {
    title: 'Smart India Hackathon — National Winner',
    body: 'Co-built a solar tracking prototype; contributed the core tracking logic.',
  },
]
