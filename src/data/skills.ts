import type { LucideIcon } from 'lucide-react'
import { CodeXml, Cpu, Database, LockKeyhole, Server, Wrench } from 'lucide-react'

export interface SkillGroup {
  title: string
  blurb: string
  icon: LucideIcon
  /** Items rendered with emphasis — the stack used day to day. */
  primary: string[]
  secondary: string[]
  /** Grid span on large screens */
  wide?: boolean
}

// Taken verbatim from the resume's Technical Skills section.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Backend & Frameworks',
    blurb: 'Layered Spring services with clean boundaries between web, domain and data.',
    icon: Server,
    primary: ['Spring Boot', 'Spring MVC', 'Spring Data JPA', 'Hibernate', 'REST APIs'],
    secondary: ['Apache Kafka', 'Thymeleaf', 'MapStruct', 'Microservices (Basic)'],
    wide: true,
  },
  {
    title: 'Security & Auth',
    blurb: 'Authentication and authorization designed deny-by-default.',
    icon: LockKeyhole,
    primary: ['Spring Security', 'OAuth2 / OIDC', 'JWT Authentication'],
    secondary: ['OTP-based 2FA', 'Role-based access control', 'BCrypt'],
  },
  {
    title: 'Languages',
    blurb: 'Java first, with the SQL and web fundamentals around it.',
    icon: CodeXml,
    primary: ['Java', 'SQL'],
    secondary: ['Python (Basic)', 'C', 'C++', 'HTML', 'CSS', 'JavaScript', 'XML'],
  },
  {
    title: 'Core Java',
    blurb: 'The fundamentals every backend leans on.',
    icon: Cpu,
    primary: ['OOP', 'Collections', 'Stream API', 'Multithreading & Concurrency'],
    secondary: ['Exception Handling', 'File Handling', 'DSA'],
    wide: true,
  },
  {
    title: 'Databases & Caching',
    blurb: 'Relational modelling, document stores and Redis for speed and expiry.',
    icon: Database,
    primary: ['MySQL', 'MongoDB', 'Redis'],
    secondary: ['JDBC', 'Flyway', 'Joins', 'Subqueries', 'Indexing', 'Schema Design'],
    wide: true,
  },
  {
    title: 'Tools & Practices',
    blurb: 'Build, test, ship and debug.',
    icon: Wrench,
    primary: ['Git', 'Maven', 'Docker', 'JUnit', 'Postman'],
    secondary: ['Gradle', 'GitHub', 'IntelliJ IDEA', 'Mockito', 'SDLC', 'Agile', 'Debugging'],
  },
]

export const marqueeSkills = [
  'Java',
  'Spring Boot',
  'Spring Security',
  'Spring Data JPA',
  'Hibernate',
  'REST APIs',
  'OAuth2 / OIDC',
  'JWT',
  'MySQL',
  'MongoDB',
  'Redis',
  'Flyway',
  'Docker',
  'JUnit',
  'Mockito',
  'Multithreading',
  'Stream API',
]
