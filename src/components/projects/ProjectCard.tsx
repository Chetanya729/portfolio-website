import { motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import { useRef, type MouseEvent } from 'react'
import { repoUrl, type Project } from '../../data/projects'
import { timeAgo, type GitHubRepo } from '../../lib/github'
import { GitHubIcon } from '../ui/BrandIcons'
import { staggerChild } from '../ui/Reveal'
import { ProjectVisual } from './ProjectVisual'

interface ProjectCardProps {
  project: Project
  live?: GitHubRepo
  featured?: boolean
  className?: string
  onOpen: (project: Project, trigger: HTMLElement) => void
}

export function ProjectCard({ project, live, featured, className = '', onOpen }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null)

  // Soft spotlight that follows the pointer.
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const shownTech = project.tech.slice(0, featured ? 6 : 4)
  const extra = project.tech.length - shownTech.length
  const wash = project.accent === 'teal' ? 'from-teal-wash to-cream' : 'from-clay-wash to-cream'

  return (
    <motion.article
      ref={ref}
      variants={staggerChild}
      onMouseMove={onMove}
      className={`group relative flex flex-col overflow-hidden rounded-[30px] border border-line bg-ivory transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-ink/15 hover:shadow-lift ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--mx) var(--my), rgb(71 125 120 / 0.08), transparent 60%)' }}
      />

      {/* Visual */}
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${wash} px-6 ${
          featured ? 'min-h-[260px] py-10 lg:flex-1' : 'min-h-[220px] py-8'
        }`}
      >
        <div aria-hidden="true" className="bg-dot-grid absolute inset-0 opacity-60" />
        <div className="relative w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] flex justify-center">
          <div className={`flex w-full justify-center ${featured ? 'lg:scale-[1.22]' : ''}`}>
            <ProjectVisual project={project} size={featured ? 'large' : 'card'} />
          </div>
        </div>
        {project.status && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-teal/20 bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-teal-ink backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-teal" />
            {project.status}
          </span>
        )}
        <span className="absolute top-4 right-4 flex size-10 translate-y-1 items-center justify-center rounded-full bg-ink text-ivory opacity-0 shadow-lift transition-all duration-500 group-hover:translate-y-0 group-hover:rotate-45 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
      </div>

      {/* Body */}
      <div className={`relative z-10 flex flex-col p-6 sm:p-7 ${featured ? '' : 'flex-1'}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-wide text-muted uppercase">
          {project.categories.map((c) => (
            <span key={c}>{c}</span>
          ))}
          {live && (
            <>
              <span aria-hidden="true">·</span>
              <span className="normal-case">Updated {timeAgo(live.pushed_at)}</span>
              {live.stargazers_count > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star size={11} /> {live.stargazers_count}
                </span>
              )}
            </>
          )}
        </div>

        <h3 className={`mt-3 font-display tracking-tight ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
          {/* Stretched button: the whole card opens the detail view. */}
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            className="text-left after:absolute after:inset-0 after:z-0 after:rounded-[30px] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-teal"
            aria-haspopup="dialog"
          >
            {project.title}
          </button>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted text-pretty">{featured ? project.summary : project.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {shownTech.map((t) => (
            <li
              key={t}
              className="relative z-10 rounded-full border border-line bg-white px-2.5 py-1 text-[11.5px] font-medium text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-teal/40 hover:text-teal-ink"
            >
              {t}
            </li>
          ))}
          {extra > 0 && <li className="rounded-full px-2 py-1 text-[11.5px] font-medium text-muted">+{extra}</li>}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-ink transition-colors group-hover:text-teal-ink">
            View project
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          {project.repo ? (
            <a
              href={repoUrl(project.repo)}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3 text-xs font-semibold text-ink-soft transition-colors hover:border-ink/25 hover:text-ink"
              aria-label={`${project.title} on GitHub`}
            >
              <GitHubIcon size={14} /> Code
            </a>
          ) : (
            project.repoNote && <span className="text-right text-xs font-medium text-muted">{project.repoNote}</span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
