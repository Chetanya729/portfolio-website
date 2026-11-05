import { motion } from 'framer-motion'
import { Award, GraduationCap, Trophy } from 'lucide-react'
import { achievements, certifications, education } from '../../data/experience'
import { staggerChild, staggerParent } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="05"
          eyebrow="Education & achievements"
          id="education-title"
          title={
            <>
              The <span className="italic text-teal-ink">foundation</span>.
            </>
          }
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8%' }}
          className="mt-14 grid gap-4 lg:grid-cols-3"
        >
          {/* Degrees */}
          <motion.div variants={staggerChild} className="rounded-[28px] border border-line bg-ivory p-6 sm:p-8 lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-teal-wash text-teal-ink">
                <GraduationCap size={20} strokeWidth={1.75} />
              </span>
              <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Education</h3>
            </div>
            <ul className="mt-6 divide-y divide-line">
              {education.map((e) => (
                <li key={e.degree} className="flex flex-col gap-1 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div>
                    <p className="font-display text-xl tracking-tight sm:text-2xl">{e.degree}</p>
                    <p className="mt-1 text-sm text-muted">{e.institution}</p>
                  </div>
                  <p className="shrink-0 font-mono text-xs tracking-wide text-clay-ink">{e.period}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Achievement */}
          {achievements.map((a) => (
            <motion.div
              key={a.title}
              variants={staggerChild}
              className="group relative overflow-hidden rounded-[28px] bg-ink p-6 text-ivory sm:p-8"
            >
              <div
                aria-hidden="true"
                className="absolute -right-10 -bottom-10 size-48 rounded-full bg-clay/40 blur-3xl transition-transform duration-700 group-hover:scale-125"
              />
              <span className="relative flex size-10 items-center justify-center rounded-2xl bg-white/10 text-clay">
                <Trophy size={20} strokeWidth={1.75} />
              </span>
              <p className="relative mt-6 font-mono text-[11px] tracking-[0.2em] text-ivory/60 uppercase">Achievement</p>
              <p className="relative mt-2 font-display text-2xl leading-snug tracking-tight">{a.title}</p>
              <p className="relative mt-3 text-sm leading-relaxed text-ivory/70">{a.body}</p>
            </motion.div>
          ))}

          {/* Certifications */}
          <motion.div variants={staggerChild} className="rounded-[28px] border border-line bg-cream/60 p-6 sm:p-8 lg:col-span-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-clay-wash text-clay-ink">
                <Award size={20} strokeWidth={1.75} />
              </span>
              <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Certifications</h3>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {certifications.map((c) => (
                <li
                  key={c.title}
                  className="rounded-2xl border border-line bg-ivory p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <p className="font-display text-lg tracking-tight">{c.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
