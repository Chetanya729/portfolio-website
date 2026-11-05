import { motion } from 'framer-motion'
import { Reveal, staggerChild, staggerParent } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const principles = [
  {
    n: '01',
    title: 'Draw the seams first',
    body: 'Controller, service and repository each own one job. DTOs guard the API boundary and services depend on interfaces, so storage can change without a rewrite.',
  },
  {
    n: '02',
    title: 'Fail precisely',
    body: 'A custom exception taxonomy mapped to the right HTTP status tells a client — and an on-call engineer — exactly what went wrong.',
  },
  {
    n: '03',
    title: 'Secure by default',
    body: 'Deny unless allowed. Hash with BCrypt, keep tokens short-lived, rotate refresh tokens and guard file paths against traversal.',
  },
  {
    n: '04',
    title: 'Be honest about trade-offs',
    body: 'Every README lists what is still left to do. Knowing the limits of a design is part of the design.',
  },
]

const journey = [
  { period: '2018 – 2020', title: 'Senior Secondary (XII)', place: 'Aggarsain Public School, Kurukshetra' },
  { period: '2020 – 2024', title: 'B.Tech, Computer Science & Engineering', place: 'UIET, Kurukshetra' },
  { period: 'During B.Tech', title: 'Smart India Hackathon — National Winner', place: 'Solar tracking prototype', accent: true },
  { period: 'Jul 2023 – Jan 2024', title: 'Software Development Intern', place: 'GreenChip Consulting' },
  { period: 'Now', title: 'Building production-style Spring Boot services', place: 'Auth, RBAC, multi-tenancy', now: true },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div>
          <SectionHeading
            index="01"
            eyebrow="About"
            id="about-title"
            title={
              <>
                Backend engineering, <span className="italic text-teal-ink">one careful layer</span> at a time.
              </>
            }
          />
          <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft text-pretty">
            <p>
              I studied Computer Science and Engineering at UIET, Kurukshetra, and spent six months as a software development
              intern at GreenChip Consulting — writing Core Java, JDBC and SQL modules, untangling race conditions with{' '}
              <code className="rounded bg-cream px-1.5 py-0.5 font-mono text-[0.85em]">ExecutorService</code> and locks, and
              learning how much a clear exception message saves during debugging.
            </p>
            <p>
              Since then I have gone deep on the Spring ecosystem: how Spring Security authenticates a request and decides
              whether it is allowed, how to model data with JPA and Flyway, and where Redis earns its place. My recent work is a
              multi-tenant authorization engine where roles and permissions change at runtime without a restart.
            </p>
            <p>
              I am looking for an entry-level Java or backend role where I can work on real production services, learn from
              experienced engineers and grow into owning systems end to end.
            </p>
          </Reveal>

          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
            className="mt-12 grid gap-4 sm:grid-cols-2"
          >
            {principles.map((p) => (
              <motion.li
                key={p.n}
                variants={staggerChild}
                className="group rounded-3xl border border-line bg-white/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-teal/30 hover:bg-white hover:shadow-soft"
              >
                <span className="font-mono text-xs text-clay-ink">{p.n}</span>
                <h3 className="mt-3 font-display text-xl tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <Reveal delay={0.15} className="lg:pt-24">
          <div className="sticky top-28 rounded-[32px] border border-line bg-cream/70 p-6 sm:p-8">
            <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">The journey so far</p>
            <ol className="relative mt-8 space-y-7">
              <motion.span
                aria-hidden="true"
                className="absolute top-1.5 bottom-1.5 left-[5px] w-px origin-top bg-gradient-to-b from-line via-teal/50 to-teal"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
              {journey.map((j, i) => (
                <motion.li
                  key={j.title}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                  className="relative pl-8"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-1.5 left-0 size-[11px] rounded-full border-2 ${
                      j.now ? 'border-teal bg-teal' : j.accent ? 'border-clay bg-clay' : 'border-ink/30 bg-ivory'
                    }`}
                  >
                    {j.now && <span className="absolute inset-[-4px] animate-ping rounded-full bg-teal/30" />}
                  </span>
                  <p className="font-mono text-[11px] tracking-wide text-muted uppercase">{j.period}</p>
                  <p className="mt-1 font-display text-lg leading-snug tracking-tight">{j.title}</p>
                  <p className="text-sm text-muted">{j.place}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
