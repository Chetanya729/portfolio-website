import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
}

const base =
  'group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out active:scale-[0.98]'

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-ivory shadow-soft hover:-translate-y-0.5 hover:shadow-lift before:absolute before:inset-0 before:-translate-x-full before:bg-teal before:transition-transform before:duration-500 before:ease-out hover:before:translate-x-0',
  secondary:
    'border border-line bg-white/70 text-ink backdrop-blur hover:-translate-y-0.5 hover:border-ink/25 hover:bg-white hover:shadow-soft',
  ghost: 'text-ink hover:bg-cream',
}

/** Anchor styled as a button — every CTA on the site is a real link. */
export function ButtonLink({ variant = 'primary', icon, iconPosition = 'end', className = '', children, ...rest }: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {icon && iconPosition === 'start' && <span className="relative transition-transform duration-300">{icon}</span>}
      <span className="relative">{children}</span>
      {icon && iconPosition === 'end' && (
        <span className="relative transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>
      )}
    </a>
  )
}

interface IconLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string
  children: ReactNode
}

export function IconLink({ label, children, className = '', ...rest }: IconLinkProps) {
  return (
    <a
      aria-label={label}
      title={label}
      className={`inline-flex size-11 items-center justify-center rounded-full border border-line bg-white/60 text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:bg-white hover:text-teal-ink hover:shadow-soft ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
