import { motion } from 'framer-motion'
import { marqueeSkills, skillGroups } from '../../data/skills'
import { staggerChild, staggerParent } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden bg-cream/60 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          id="skills-title"
          title={
            <>
              A toolkit built around <span className="italic text-teal-ink">Java &amp; Spring</span>.
            </>
          }
          description="Grouped by how I use them. Highlighted items are the ones I reach for day to day."
        />

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8%' }}
          className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((g) => {
            const Icon = g.icon
            return (
              <motion.li
                key={g.title}
                variants={staggerChild}
                className={`group relative overflow-hidden rounded-[28px] border border-line bg-ivory p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-7 ${
                  g.wide ? 'lg:col-span-2' : ''
                }`}
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 size-40 rounded-full bg-teal-wash opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                />
                <div className="relative flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-line bg-white text-teal-ink transition-all duration-500 group-hover:rotate-[-6deg] group-hover:border-teal/30 group-hover:bg-teal group-hover:text-white">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl tracking-tight">{g.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{g.blurb}</p>
                  </div>
                </div>
                <ul className="relative mt-6 flex flex-wrap gap-2" aria-label={`${g.title} skills`}>
                  {g.primary.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-ink/10 bg-ink px-3 py-1.5 text-xs font-semibold text-ivory transition-colors duration-200 hover:bg-teal"
                    >
                      {s}
                    </li>
                  ))}
                  {g.secondary.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors duration-200 hover:border-teal/40 hover:text-teal-ink"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>

      {/* Slow marquee of the core stack; duplicated once for a seamless loop. */}
      <div
        aria-hidden="true"
        className="group relative mt-16 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex shrink-0 animate-marquee gap-10 pr-10 group-hover:[animation-play-state:paused]">
          {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-3xl whitespace-nowrap text-ink/25 italic sm:text-4xl">
              {s}
              <span className="size-1.5 rounded-full bg-clay/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
