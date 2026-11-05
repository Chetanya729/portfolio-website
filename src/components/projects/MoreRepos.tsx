import { motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import { profile } from '../../data/profile'
import { timeAgo, type GitHubRepo } from '../../lib/github'
import { GitHubIcon } from '../ui/BrandIcons'
import { Reveal, staggerChild, staggerParent } from '../ui/Reveal'

interface MoreReposProps {
  repos: GitHubRepo[]
  loading: boolean
  usingSnapshot: boolean
}

export function MoreRepos({ repos, loading, usingSnapshot }: MoreReposProps) {
  return (
    <div className="mt-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">More on GitHub</p>
          <h3 className="mt-2 font-display text-3xl tracking-tight">Practice, experiments & fundamentals</h3>
        </div>
        <a
          href={`${profile.links.github}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold transition-colors hover:border-ink/25"
        >
          <GitHubIcon size={16} /> All repositories
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>

      {usingSnapshot && (
        <p role="status" className="mt-4 text-sm text-muted">
          Live GitHub data is unavailable right now, so this list shows a saved snapshot.
        </p>
      )}

      {loading ? (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2" aria-busy="true" aria-label="Loading repositories">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="h-[108px] animate-pulse rounded-3xl border border-line bg-cream/70" />
          ))}
        </ul>
      ) : (
        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 grid gap-3 sm:grid-cols-2"
        >
          {repos.map((r) => (
            <motion.li key={r.name} variants={staggerChild}>
              <a
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-line bg-white/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/30 hover:bg-white hover:shadow-soft"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-mono text-sm font-medium text-ink">{r.name}</span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal-ink"
                  />
                </span>
                {r.description && <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{r.description}</span>}
                <span className="mt-auto flex items-center gap-4 pt-4 text-xs text-muted">
                  {r.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-clay" aria-hidden="true" /> {r.language}
                    </span>
                  )}
                  {r.stargazers_count > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Star size={12} aria-hidden="true" /> {r.stargazers_count}
                    </span>
                  )}
                  <span>Updated {timeAgo(r.pushed_at)}</span>
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  )
}
