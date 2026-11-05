import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({ index, eyebrow, title, description, align = 'left', id }: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <Reveal className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      <p className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-teal-ink ${centered ? 'justify-center' : ''}`}>
        <span className="text-clay-ink">{index}</span>
        <span className="h-px w-8 bg-line" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 font-display text-4xl leading-[1.05] font-normal tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-muted text-pretty sm:text-lg">{description}</p>}
    </Reveal>
  )
}
