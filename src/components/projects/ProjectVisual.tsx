import { Check } from 'lucide-react'
import type { Project } from '../../data/projects'

const methodTone: Record<string, string> = {
  GET: 'bg-teal-wash text-teal-ink',
  POST: 'bg-clay-wash text-clay-ink',
  PUT: 'bg-sand text-ink-soft',
  DELETE: 'bg-ink text-ivory',
}

interface ProjectVisualProps {
  project: Project
  size?: 'card' | 'large'
}

/**
 * Backend projects have no screenshots, so each one gets a small diagram of
 * what it actually does. Hover effects key off the parent card's `group`.
 */
export function ProjectVisual({ project, size = 'card' }: ProjectVisualProps) {
  const v = project.visual
  const large = size === 'large'
  const dot = project.accent === 'teal' ? 'bg-teal' : 'bg-clay'

  if (v.kind === 'checks') {
    return (
      <div className={`w-full ${large ? 'max-w-md' : 'max-w-sm'}`}>
        <p className="truncate rounded-xl border border-line bg-white px-3 py-2 font-mono text-[11px] text-ink-soft shadow-soft">
          <span className="text-clay-ink">→</span> {v.request}
        </p>
        <ul className="mt-3 space-y-2 pl-3">
          {v.checks.map((c, i) => (
            <li
              key={c}
              className="flex items-center gap-2.5 text-[12.5px] text-ink-soft transition-transform duration-500 group-hover:translate-x-1"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <Check size={11} strokeWidth={3} />
              </span>
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center gap-2 pl-3">
          <span className="h-px flex-1 bg-line" />
          <span className="rounded-full bg-ink px-3 py-1 font-mono text-[11px] font-medium tracking-wider text-ivory transition-colors duration-500 group-hover:bg-teal">
            {v.result}
          </span>
        </div>
      </div>
    )
  }

  if (v.kind === 'endpoints') {
    return (
      <ul className={`w-full space-y-1.5 ${large ? 'max-w-md' : 'max-w-sm'}`}>
        {v.lines.map((l, i) => (
          <li
            key={l.method + l.path}
            className="flex items-center gap-2.5 rounded-xl border border-line bg-white/90 px-2.5 py-1.5 transition-transform duration-500 group-hover:translate-x-1"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            <span className={`w-14 shrink-0 rounded-md py-0.5 text-center font-mono text-[10px] font-semibold ${methodTone[l.method]}`}>
              {l.method}
            </span>
            <span className="truncate font-mono text-[11.5px] text-ink-soft">{l.path}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ol className={`relative w-full space-y-2 ${large ? 'max-w-md' : 'max-w-sm'}`}>
      <span aria-hidden="true" className="absolute top-3 bottom-3 left-[7px] w-px bg-line" />
      <span
        aria-hidden="true"
        className={`absolute top-2 left-[4px] size-[7px] rounded-full ${dot} opacity-0 transition-all duration-[1400ms] ease-in-out group-hover:top-[calc(100%-14px)] group-hover:opacity-100`}
      />
      {v.nodes.map((n, i) => (
        <li key={n.label} className="relative flex items-center gap-3 pl-0">
          <span
            className={`relative z-10 size-[15px] shrink-0 rounded-full border-2 border-white shadow-soft ${
              i === 0 || i === v.nodes.length - 1 ? dot : 'bg-sand'
            }`}
          />
          <span className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-line bg-white/90 px-3 py-1.5">
            <span className="truncate text-[12.5px] font-semibold text-ink">{n.label}</span>
            {n.note && <span className="shrink-0 font-mono text-[10.5px] text-muted">{n.note}</span>}
          </span>
        </li>
      ))}
    </ol>
  )
}
