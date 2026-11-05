// Curated featured projects. Descriptions come from the resume and each
// repository's README. `repo` is the GitHub repository name; live stars,
// language and last-updated date are merged in at runtime from the GitHub API.

export type ProjectCategory = 'Security' | 'APIs' | 'Concurrency'

export type ProjectVisual =
  | { kind: 'flow'; nodes: { label: string; note?: string }[] }
  | { kind: 'endpoints'; lines: { method: 'GET' | 'POST' | 'PUT' | 'DELETE'; path: string }[] }
  | { kind: 'checks'; request: string; checks: string[]; result: string }

export interface Project {
  slug: string
  title: string
  tagline: string
  summary: string
  status?: string
  categories: ProjectCategory[]
  tech: string[]
  features: string[]
  /** Short design notes shown in the detail view */
  highlights: { title: string; body: string }[]
  visual: ProjectVisual
  accent: 'teal' | 'clay'
  repo?: string
  liveUrl?: string
  /** Shown instead of a repository link when the code is not public */
  repoNote?: string
}

export const projects: Project[] = [
  {
    slug: 'multi-tenant-authorization-engine',
    title: 'Multi-Tenant Authorization Engine',
    tagline: 'Dynamic RBAC for many organisations sharing one backend.',
    summary:
      'A Spring Boot backend that lets many organisations share one application safely. It controls who can do what, keeps each organisation’s data separate, and lets admins change roles and permissions at runtime — no code changes or restarts.',
    status: 'In active development',
    categories: ['Security', 'APIs'],
    tech: ['Java 17', 'Spring Boot 4', 'Spring Security', 'PostgreSQL', 'Flyway', 'Redis', 'JUnit 5', 'Testcontainers'],
    features: [
      'Create permissions and roles and assign them through APIs; changes apply on the next request',
      'Tenant isolation — each organisation sees only its own users, roles and records',
      'Two-level control: the platform entitles organisations, organisations grant their users',
      'Deny by default — anything not explicitly allowed is refused',
      'BCrypt passwords, short-lived access tokens, rotating refresh tokens with theft detection',
      'Audit log recording who changed what, and when',
    ],
    highlights: [
      {
        title: 'Three-part access decision',
        body: 'An action is allowed only if the permission is active in the catalogue, the user’s organisation is entitled to it, and one of the user’s roles contains it.',
      },
      {
        title: 'Leak-proof errors',
        body: 'Records that belong to another organisation return 404 rather than 403, so the API never confirms they exist.',
      },
      {
        title: 'Permission format',
        body: 'Lowercase resource:action strings such as transfer:approve or user:create keep the catalogue predictable.',
      },
    ],
    visual: {
      kind: 'checks',
      request: 'approve transfer · /api/transfers',
      checks: ['permission active in catalogue', 'tenant entitled to transfer:approve', 'role grants transfer:approve'],
      result: 'ALLOW',
    },
    accent: 'teal',
    repo: 'Multi-Tenant-Authorization-Engine',
  },
  {
    slug: 'secure-auth-sso',
    title: 'Secure Authentication & SSO Service',
    tagline: 'Form login, social sign-in and OTP two-factor in one service.',
    summary:
      'A Spring Security 6 authentication service with BCrypt form login, OAuth2 / OIDC social sign-in (Google, GitHub, Facebook), role-based access control and remember-me tokens — hardened with email OTP two-factor authentication and a token-based password reset.',
    categories: ['Security'],
    tech: ['Spring Boot', 'Spring Security', 'OAuth2 / OIDC', 'MySQL', 'Redis', 'Flyway', 'Docker', 'JUnit', 'Mockito'],
    features: [
      'OAuth2 / OIDC sign-in with Google, GitHub and Facebook alongside BCrypt form login',
      'Email OTP two-factor authentication with expiry, attempt limits and resend cooldown in Redis',
      'Token-based password-reset flow over email',
      'USER / ADMIN role-based access control with protected Thymeleaf views',
      'Redis-cached user lookups with TTL; MySQL schema versioned with Flyway',
      'Multi-stage Docker build and Docker Compose; services unit-tested with JUnit and Mockito',
    ],
    highlights: [
      {
        title: 'OTP state that expires itself',
        body: 'OTPs live in Redis with a TTL, so expiry, attempt limits and resend cooldowns are enforced without cleanup jobs.',
      },
      {
        title: 'One identity, many providers',
        body: 'Social and form logins converge on the same user model, so authorization rules stay in one place.',
      },
    ],
    visual: {
      kind: 'flow',
      nodes: [
        { label: 'Sign in', note: 'form · Google · GitHub' },
        { label: 'Verify', note: 'BCrypt / OIDC' },
        { label: 'Email OTP', note: 'Redis · TTL' },
        { label: 'Session', note: 'USER / ADMIN' },
      ],
    },
    accent: 'clay',
    repo: 'UserLogin-SSO',
  },
  {
    slug: 'email-sender-service',
    title: 'Email Sender Service',
    tagline: 'A small problem, with careful seams.',
    summary:
      'A Spring Boot REST + Thymeleaf email service with separate endpoints for plain, attachment and resource-based emails. The interesting work is everything around sending: validation at the boundary, a real exception taxonomy, and guarded file I/O.',
    categories: ['APIs'],
    tech: ['Spring Boot', 'Spring Mail', 'Thymeleaf', 'Bean Validation', 'Maven'],
    features: [
      'Three endpoints modelled around distinct payload shapes instead of one catch-all',
      'Bean validation (@Valid, @Email, nested attachment validation) pushes errors to the boundary',
      'Custom exceptions for auth, network, oversized and unsupported attachments, mapped to precise HTTP statuses with @RestControllerAdvice',
      'Externalised config via @ConfigurationProperties — allowlists and size caps in one place',
      'Attachment size caps enforced after decoding, plus a path-traversal guard on server-side resources',
      'Compose and sent pages built with Spring MVC + Thymeleaf',
    ],
    highlights: [
      {
        title: 'Failure-mode analysis',
        body: 'Mail errors are unwrapped down the cause chain to tell authentication failures from network failures, so alerts can be routed correctly.',
      },
      {
        title: 'Shared internals',
        body: 'Every send path funnels through one deliver(...) helper that owns templating, MIME construction and error translation.',
      },
    ],
    visual: {
      kind: 'flow',
      nodes: [
        { label: 'plain · attachments · resources', note: '3 endpoints' },
        { label: '@Valid', note: 'boundary checks' },
        { label: 'deliver(…)', note: 'template + MIME' },
        { label: 'SMTP', note: 'typed errors → HTTP' },
      ],
    },
    accent: 'teal',
    repo: 'Emailsender',
  },
  {
    slug: 'restaurant-order-system',
    title: 'Restaurant Order Management',
    tagline: 'A concurrent producer–consumer system in plain Java.',
    summary:
      'A multithreading project that simulates a restaurant: ten customers place orders, three chefs cook concurrently and two waiters deliver — with VIP orders prioritised and a thread-safe shared inventory.',
    categories: ['Concurrency'],
    tech: ['Java', 'ExecutorService', 'PriorityBlockingQueue', 'BlockingQueue', 'ReentrantLock'],
    features: [
      'Each customer runs on its own thread and places an order',
      'VIP orders served first via a PriorityBlockingQueue',
      'Synchronised check-and-deduct on the shared inventory prevents race conditions',
      'Completed orders handed to waiter threads through a BlockingQueue',
      'Graceful shutdown once every order is delivered',
    ],
    highlights: [
      {
        title: 'Deadlock prevention',
        body: 'No unnecessary nested locks, small synchronised sections, a consistent lock order and concurrent collections where possible.',
      },
    ],
    visual: {
      kind: 'flow',
      nodes: [
        { label: 'Customers ×10', note: 'threads' },
        { label: 'Priority queue', note: 'VIP first' },
        { label: 'Chefs ×3', note: 'locked inventory' },
        { label: 'Waiters ×2', note: 'delivery' },
      ],
    },
    accent: 'clay',
    repo: 'Restaurant_Service',
  },
  {
    slug: 'task-manager-api',
    title: 'Task Manager API',
    tagline: 'A layered REST API that shows its design choices.',
    summary:
      'A task-management REST API with CRUD, status / priority / due-date tracking, filtering and input validation, built around a clean controller → service → repository split and tested in Postman.',
    categories: ['APIs'],
    tech: ['Spring Boot', 'MongoDB', 'REST', 'Bean Validation', 'Lombok'],
    features: [
      'Full CRUD on tasks with status filtering',
      'Status, priority and due-date tracking',
      'Validation errors returned as clear, consistent JSON',
      'Centralised exception handling with a single @RestControllerAdvice',
      'DTOs at the API boundary keep the domain model private',
    ],
    highlights: [
      {
        title: 'Dependency inversion',
        body: 'The service depends on a repository interface, so storage can be swapped without touching service or controller code.',
      },
      {
        title: 'Thread-safe by default',
        body: 'ConcurrentHashMap and AtomicLong keep the in-memory store correct under concurrent requests.',
      },
    ],
    visual: {
      kind: 'endpoints',
      lines: [
        { method: 'POST', path: '/tasks' },
        { method: 'GET', path: '/tasks?status=todo' },
        { method: 'GET', path: '/tasks/{id}' },
        { method: 'PUT', path: '/tasks/{id}' },
        { method: 'DELETE', path: '/tasks/{id}' },
      ],
    },
    accent: 'teal',
    repo: 'task-manager',
  },
  {
    slug: 'ecommerce-backend',
    title: 'E-Commerce Backend API',
    tagline: 'Auth, catalogue, cart and orders behind stateless JWT.',
    summary:
      'A RESTful e-commerce backend with modules for user authentication, product catalogue, cart and order management, modelled with Spring Data JPA / Hibernate in a layered architecture.',
    categories: ['APIs', 'Security'],
    tech: ['Spring Boot', 'Spring Security', 'JWT', 'MySQL', 'Spring Data JPA', 'Hibernate'],
    features: [
      'Modules for authentication, product catalogue, cart and orders',
      'Role-based authorization with Spring Security and stateless JWT',
      'MySQL data model via Spring Data JPA / Hibernate',
      'Layered architecture with centralised exception handling',
    ],
    highlights: [
      {
        title: 'Stateless by design',
        body: 'JWT-based authentication keeps the API horizontally scalable — no server-side session to share.',
      },
    ],
    visual: {
      kind: 'flow',
      nodes: [
        { label: 'Auth', note: 'JWT' },
        { label: 'Catalogue', note: 'products' },
        { label: 'Cart', note: 'per user' },
        { label: 'Orders', note: 'MySQL' },
      ],
    },
    accent: 'clay',
    // TODO: add `repo: '<repository-name>'` once this repository is public.
    repoNote: 'Code on request',
  },
]

/** Public repositories never shown under “More on GitHub”. */
export const hiddenRepos = ['Chetanya729', 'chetanyabansal-dev', 'food-delivery-app']

/**
 * Snapshot used when the GitHub API is unavailable (offline, rate-limited).
 * Mirrors the shape the live request returns.
 */
export const fallbackRepos = [
  {
    name: 'LibraryManagementSystem',
    description: 'Console library system in plain Java — librarian and student roles, borrowing limits, CSV and MySQL data stores.',
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Chetanya729/LibraryManagementSystem',
    pushed_at: '2026-09-21T11:07:37Z',
  },
  {
    name: 'Stream-API-Practice',
    description: 'Questions for practice stream APIs in Java - Easy to hard - List of 50 Questions',
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Chetanya729/Stream-API-Practice',
    pushed_at: '2026-09-14T05:51:41Z',
  },
  {
    name: 'DataHandling',
    description: 'File readed and data is filtered according to choice. Basic use of Stream APIs',
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Chetanya729/DataHandling',
    pushed_at: '2026-08-31T13:01:06Z',
  },
  {
    name: 'EmployeeDirectory-',
    description: 'Use of mappers',
    language: 'Java',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Chetanya729/EmployeeDirectory-',
    pushed_at: '2026-08-18T10:47:05Z',
  },
]

export const repoUrl = (repo: string) => `https://github.com/Chetanya729/${repo}`
