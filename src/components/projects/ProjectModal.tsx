import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, BookOpen, Check, ExternalLink, GitFork, Star, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { repoUrl, type Project } from '../../data/projects'
import { timeAgo, type GitHubRepo } from '../../lib/github'
import { GitHubIcon } from '../ui/BrandIcons'
import { ButtonLink } from '../ui/Button'
import { ProjectVisual } from './ProjectVisual'

interface ProjectModalProps {
  project: Project | null
  live?: GitHubRepo
  onClose: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function ProjectModal({ project, live, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!project) return
    const panel = panelRef.current
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbar}px`
    panel?.querySelector<HTMLElement>('[data-autofocus]')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !panel) return
      // Keep keyboard focus inside the dialog.
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[32px] border border-line bg-ivory shadow-lift sm:rounded-[32px]"
          >
            <button
              type="button"
              onClick={onClose}
              data-autofocus
              aria-label="Close project details"
              className="absolute top-4 right-4 z-20 flex size-11 items-center justify-center rounded-full border border-line bg-white/90 text-ink backdrop-blur transition-all hover:rotate-90 hover:bg-white"
            >
              <X size={18} />
            </button>

            <div className="overflow-y-auto overscroll-contain">
              <div
                className={`group relative flex items-center justify-center bg-gradient-to-br px-6 py-12 sm:py-14 ${
                  project.accent === 'teal' ? 'from-teal-wash to-cream' : 'from-clay-wash to-cream'
                }`}
              >
                <div aria-hidden="true" className="bg-dot-grid absolute inset-0 opacity-60" />
                <div className="relative flex w-full justify-center">
                  <ProjectVisual project={project} size="large" />
                </div>
              </div>

              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  {project.categories.map((c) => (
                    <span key={c} className="rounded-full bg-cream px-3 py-1 font-mono text-[11px] tracking-wide text-ink-soft uppercase">
                      {c}
                    </span>
                  ))}
                  {project.status && (
                    <span className="rounded-full border border-teal/25 bg-teal-wash px-3 py-1 text-[11px] font-semibold text-teal-ink">
                      {project.status}
                    </span>
                  )}
                </div>

                <h2 id="project-dialog-title" className="mt-4 font-display text-3xl tracking-tight text-balance sm:text-5xl">
                  {project.title}
                </h2>
                <p className="mt-2 font-display text-lg text-clay-ink italic sm:text-xl">{project.tagline}</p>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft text-pretty sm:text-lg">{project.summary}</p>

                {live && (
                  <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                    {live.language && (
                      <div className="flex items-center gap-1.5">
                        <dt className="sr-only">Language</dt>
                        <span className="size-2.5 rounded-full bg-clay" aria-hidden="true" />
                        <dd>{live.language}</dd>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Stars</dt>
                      <Star size={14} aria-hidden="true" />
                      <dd>{live.stargazers_count} stars</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Forks</dt>
                      <GitFork size={14} aria-hidden="true" />
                      <dd>{live.forks_count} forks</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Last updated</dt>
                      <dd>Updated {timeAgo(live.pushed_at)}</dd>
                    </div>
                  </dl>
                )}

                <div className="mt-10 grid gap-10 md:grid-cols-[1.25fr_1fr]">
                  <div>
                    <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Key features</h3>
                    <ul className="mt-4 space-y-3">
                      {project.features.map((f) => (
                        <li key={f} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                          <span className="mt-1 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-teal-wash text-teal-ink">
                            <Check size={11} strokeWidth={3} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Design notes</h3>
                    <div className="mt-4 space-y-3">
                      {project.highlights.map((h) => (
                        <div key={h.title} className="rounded-2xl border border-line bg-white/70 p-4">
                          <p className="font-display text-lg tracking-tight">{h.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted">{h.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="mt-10 font-mono text-xs tracking-[0.2em] text-muted uppercase">Built with</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li key={t} className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-soft">
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-8">
                  {project.repo ? (
                    <>
                      <ButtonLink href={repoUrl(project.repo)} target="_blank" rel="noreferrer" icon={<ArrowUpRight size={16} />}>
                        <span className="inline-flex items-center gap-2">
                          <GitHubIcon size={16} /> View repository
                        </span>
                      </ButtonLink>
                      <ButtonLink
                        href={`${repoUrl(project.repo)}#readme`}
                        target="_blank"
                        rel="noreferrer"
                        variant="secondary"
                        icon={<BookOpen size={16} />}
                      >
                        Read the README
                      </ButtonLink>
                    </>
                  ) : (
                    <p className="text-sm text-muted">
                      {project.repoNote} —{' '}
                      <a href="#contact" onClick={onClose} className="font-semibold text-teal-ink underline underline-offset-4">
                        get in touch
                      </a>
                      .
                    </p>
                  )}
                  {project.liveUrl && (
                    <ButtonLink href={project.liveUrl} target="_blank" rel="noreferrer" variant="secondary" icon={<ExternalLink size={16} />}>
                      Live demo
                    </ButtonLink>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
