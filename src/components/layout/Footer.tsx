import { ArrowUp } from 'lucide-react'
import { navItems, profile } from '../../data/profile'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl tracking-tight">
            Chetanya Bansal<span className="text-clay">.</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {profile.role} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="transition-colors hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="flex size-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-ink"
          >
            <GitHubIcon size={18} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="flex size-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-ink"
          >
            <LinkedInIcon size={17} />
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            className="ml-2 flex size-10 items-center justify-center rounded-full border border-line bg-white transition-all hover:-translate-y-0.5 hover:shadow-soft"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Chetanya Bansal · Designed &amp; built with React, TypeScript, Tailwind CSS and Framer Motion.
      </p>
    </footer>
  )
}
