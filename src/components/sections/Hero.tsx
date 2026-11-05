import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowDown, ArrowRight, Download, MapPin } from 'lucide-react'
import type { MouseEvent } from 'react'
import { heroHighlights, profile } from '../../data/profile'
import { HeroVisual } from '../hero/HeroVisual'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { ButtonLink, IconLink } from '../ui/Button'

const ease = [0.22, 1, 0.36, 1] as const

function SplitWord({ word, delay, className = '' }: { word: string; delay: number; className?: string }) {
  return (
    // Extra right padding keeps italic overhangs from being clipped by the reveal mask.
    <span className={`-mr-[0.1em] inline-block overflow-hidden pr-[0.1em] pb-[0.12em] align-bottom ${className}`} aria-hidden="true">
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.035, ease }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

export function Hero() {
  const reduce = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 60, damping: 20 })
  const my = useSpring(rawY, { stiffness: 60, damping: 20 })

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section
      id="home"
      aria-label="Introduction"
      onMouseMove={onMove}
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 lg:min-h-[100svh] lg:pt-32 lg:pb-10"
    >
      {/* Backdrop */}
      <div className="bg-dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_60%_40%,black_20%,transparent_70%)]" />
      <div className="absolute -top-40 -left-32 -z-10 size-[520px] animate-drift rounded-full bg-teal-wash blur-3xl" />
      <div className="absolute top-1/3 -right-40 -z-10 size-[460px] animate-drift rounded-full bg-clay-wash blur-3xl [animation-delay:-6s]" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:min-h-[calc(100svh-10rem)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <motion.div {...fadeUp(0.15)} className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-white/70 px-3 py-1.5 text-xs font-semibold text-teal-ink backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-teal/60" />
                <span className="relative size-2 rounded-full bg-teal" />
              </span>
              Open to entry-level backend roles
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-xs font-medium text-muted">
              <MapPin size={13} /> {profile.location}
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(3.4rem,12vw,7.6rem)] leading-[0.92] font-light tracking-[-0.03em]">
            <span className="sr-only">{profile.name}</span>
            <SplitWord word={profile.firstName} delay={0.25} />
            <br />
            <SplitWord word={profile.lastName} delay={0.5} className="italic text-teal-ink" />
            <motion.span
              aria-hidden="true"
              className="inline-block text-clay"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.95, type: 'spring', stiffness: 300, damping: 14 }}
            >
              .
            </motion.span>
          </h1>

          <motion.p {...fadeUp(0.7)} className="mt-6 max-w-xl font-display text-2xl leading-snug text-balance text-ink sm:text-[1.7rem]">
            Java backend developer building <em className="text-clay-ink">secure</em>, well-structured services with Spring Boot.
          </motion.p>

          <motion.p {...fadeUp(0.82)} className="mt-4 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
            B.Tech CSE graduate with a 6-month software development internship. I build REST APIs, authentication flows and
            concurrent systems — and I care about the seams: clean layers, precise errors and code the next developer can read.
          </motion.p>

          <motion.div {...fadeUp(0.95)} className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects" icon={<ArrowRight size={16} />}>
              Explore My Work
            </ButtonLink>
            <ButtonLink
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              variant="secondary"
              icon={<Download size={16} />}
            >
              Download Resume
            </ButtonLink>
            <div className="flex gap-2 sm:ml-1">
              <IconLink href={profile.links.github} target="_blank" rel="noreferrer" label="GitHub profile">
                <GitHubIcon size={18} />
              </IconLink>
              <IconLink href={profile.links.linkedin} target="_blank" rel="noreferrer" label="LinkedIn profile">
                <LinkedInIcon size={17} />
              </IconLink>
            </div>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 1.1 } } }}
            className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6"
          >
            {heroHighlights.map((h) => (
              <motion.div
                key={h.value}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              >
                <dt className="sr-only">{h.label}</dt>
                <dd className="font-display text-2xl tracking-tight sm:text-3xl">{h.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{h.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <div className="relative">
          <HeroVisual mx={mx} my={my} />
        </div>
      </div>

      <motion.a
        href="#about"
        {...fadeUp(1.4)}
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase lg:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  )
}
