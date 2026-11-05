import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { experience } from '../../data/experience'
import { SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative bg-cream/60 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          id="experience-title"
          title={
            <>
              Where I have <span className="italic text-teal-ink">done the work</span>.
            </>
          }
        />

        <ol ref={listRef} className="relative mt-16 space-y-10 md:space-y-14">
          {/* Timeline rail that fills as you scroll */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-px bg-line md:left-[calc(30%+11px)]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-teal md:left-[calc(30%+11px)]"
          />

          {experience.map((e, i) => (
            <motion.li
              key={e.organization}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid gap-4 pl-10 md:grid-cols-[30%_1fr] md:gap-0 md:pl-0"
            >
              <span
                aria-hidden="true"
                className={`absolute top-1 left-0 flex size-[23px] items-center justify-center rounded-full border-4 border-cream md:left-[30%] ${
                  i === 0 ? 'bg-teal' : e.type === 'Achievement' ? 'bg-clay' : 'bg-ink'
                }`}
              />
              <div className="md:pr-12 md:text-right">
                <p className="font-mono text-xs tracking-[0.16em] text-clay-ink uppercase">{e.period}</p>
                <p className="mt-1 text-sm text-muted">{e.type}</p>
              </div>

              <article className="group rounded-[28px] border border-line bg-ivory p-6 transition-all duration-500 hover:shadow-lift sm:p-8 md:ml-12">
                <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{e.role}</h3>
                <p className="mt-1 font-semibold text-teal-ink">{e.organization}</p>
                <p className="mt-4 leading-relaxed text-ink-soft text-pretty">{e.summary}</p>

                <ul className="mt-5 space-y-2.5">
                  {e.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-clay" />
                      {r}
                    </li>
                  ))}
                </ul>

                {e.contributions && (
                  <div className="mt-6 rounded-2xl border border-teal/20 bg-teal-wash/70 p-4">
                    <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-teal-ink uppercase">
                      <Sparkles size={13} /> Key contribution
                    </p>
                    {e.contributions.map((c) => (
                      <p key={c} className="mt-1.5 text-[15px] leading-relaxed text-ink">
                        {c}
                      </p>
                    ))}
                  </div>
                )}

                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies used">
                  {e.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-teal/40 hover:text-teal-ink"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {e.link && (
                  <a
                    href={e.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-teal-ink"
                  >
                    {e.link.label}
                    <ArrowUpRight size={15} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                )}
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
