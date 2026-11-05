import { motion } from 'framer-motion'
import { useCallback, useMemo, useRef, useState } from 'react'
import { profile } from '../../data/profile'
import { fallbackRepos, hiddenRepos, projects, type Project } from '../../data/projects'
import { useGitHubRepos } from '../../hooks/useGitHubRepos'
import type { GitHubRepo } from '../../lib/github'
import { MoreRepos } from '../projects/MoreRepos'
import { ProjectCard } from '../projects/ProjectCard'
import { ProjectModal } from '../projects/ProjectModal'
import { staggerParent } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const featuredNames = new Set(projects.map((p) => p.repo).filter(Boolean))

export function Projects() {
  const gh = useGitHubRepos(profile.githubUsername)
  const [open, setOpen] = useState<Project | null>(null)
  const trigger = useRef<HTMLElement | null>(null)

  const byName = useMemo(() => new Map(gh.repos.map((r) => [r.name, r])), [gh.repos])

  // Only meaningful repos: not featured, not forks/archived/empty, and with a description.
  const others = useMemo<GitHubRepo[]>(() => {
    if (gh.status !== 'ready') return fallbackRepos
    return gh.repos.filter(
      (r) =>
        !featuredNames.has(r.name) &&
        !hiddenRepos.includes(r.name) &&
        !r.fork &&
        !r.archived &&
        (r.size ?? 1) > 0 &&
        !!r.description?.trim(),
    )
  }, [gh])

  const openProject = useCallback((p: Project, el: HTMLElement) => {
    trigger.current = el
    setOpen(p)
  }, [])

  const close = useCallback(() => {
    setOpen(null)
    // Return focus to the card that opened the dialog.
    requestAnimationFrame(() => trigger.current?.focus())
  }, [])

  const [first, ...rest] = projects

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="03"
          eyebrow="Featured projects"
          id="projects-title"
          title={
            <>
              Things I have built, <span className="italic text-teal-ink">and why they are built that way</span>.
            </>
          }
          description="Each project focuses on a backend problem worth solving well — access control, authentication, failure handling and concurrency. Open any card for the design notes."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-5%' }}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <ProjectCard
            project={first}
            live={first.repo ? byName.get(first.repo) : undefined}
            featured
            onOpen={openProject}
            className="md:col-span-2 lg:row-span-2"
          />
          {rest.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              live={p.repo ? byName.get(p.repo) : undefined}
              onOpen={openProject}
              // Odd leftover on the two-column layout spans the full row.
              className={i === rest.length - 1 && rest.length % 2 === 1 ? 'md:col-span-2 lg:col-span-1' : ''}
            />
          ))}
        </motion.div>

        <MoreRepos repos={others} loading={gh.status === 'loading'} usingSnapshot={gh.status === 'error'} />
      </div>

      <ProjectModal project={open} live={open?.repo ? byName.get(open.repo) : undefined} onClose={close} />
    </section>
  )
}
