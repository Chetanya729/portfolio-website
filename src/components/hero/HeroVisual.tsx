import { motion, useReducedMotion, type MotionValue, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

// A Spring request travelling through the layers — the kind of path every
// project on this site is built around.
const steps = [
  { label: 'HTTP request', detail: 'client', mono: true },
  { label: 'SecurityFilterChain', detail: 'JWT verified' },
  { label: 'AuthorizationManager', detail: 'role check' },
  { label: '@RestController', detail: '@Valid DTO' },
  { label: '@Service', detail: '@Transactional' },
  { label: 'Repository', detail: 'MySQL · Redis' },
  { label: '200 OK', detail: 'JSON response', mono: true },
]

const STEP_MS = 1100

interface HeroVisualProps {
  mx: MotionValue<number>
  my: MotionValue<number>
}

export function HeroVisual({ mx, my }: HeroVisualProps) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(reduce ? steps.length - 1 : 0)

  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(() => setActive((i) => (i + 1) % (steps.length + 2)), STEP_MS)
    return () => window.clearInterval(t)
  }, [reduce])

  const current = Math.min(active, steps.length - 1)

  // Layers drift at different depths for a gentle parallax.
  const cardX = useTransform(mx, (v) => v * 10)
  const cardY = useTransform(my, (v) => v * 10)
  const farX = useTransform(mx, (v) => v * -18)
  const farY = useTransform(my, (v) => v * -18)
  const nearX = useTransform(mx, (v) => v * 26)
  const nearY = useTransform(my, (v) => v * 26)

  return (
    <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[440px] lg:aspect-[4/5]" aria-hidden="true">
      {/* Orbit rings */}
      <motion.svg style={{ x: farX, y: farY }} viewBox="0 0 400 400" className="absolute inset-[-8%] size-[116%] text-line">
        <g className="origin-center animate-spin-slow">
          <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeDasharray="2 8" />
          <circle cx="200" cy="10" r="4" fill="var(--color-clay)" />
        </g>
        <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" />
        <g className="origin-center animate-spin-slow [animation-direction:reverse] [animation-duration:80s]">
          <circle cx="200" cy="200" r="110" fill="none" stroke="currentColor" strokeDasharray="1 6" />
          <circle cx="90" cy="200" r="3" fill="var(--color-teal)" />
        </g>
      </motion.svg>

      {/* Soft colour fields */}
      <motion.div style={{ x: farX, y: farY }} className="absolute top-[8%] left-[4%] size-48 rounded-full bg-teal/20 blur-3xl" />
      <motion.div style={{ x: nearX, y: nearY }} className="absolute right-[2%] bottom-[10%] size-40 rounded-full bg-clay/25 blur-3xl" />

      {/* Request trace card */}
      <motion.div
        style={{ x: cardX, y: cardY }}
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-[6%] top-1/2 -translate-y-1/2 rounded-[28px] border border-line bg-white/85 p-5 shadow-lift backdrop-blur-md sm:p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-clay/70" />
            <span className="size-2.5 rounded-full bg-sand" />
            <span className="size-2.5 rounded-full bg-teal/70" />
          </div>
          <span className="font-mono text-[11px] tracking-wide text-muted">request.trace</span>
        </div>

        <ol className="relative mt-5 space-y-[0.55rem]">
          <span className="absolute top-2 bottom-2 left-[9px] w-px bg-line" />
          <motion.span
            className="absolute top-2 left-[9px] w-px origin-top bg-teal"
            animate={{ height: `${(current / (steps.length - 1)) * 92}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          {steps.map((s, i) => {
            const done = i <= current
            const isNow = i === current && active < steps.length
            return (
              <li key={s.label} className="relative flex items-center gap-3 pl-0">
                <span
                  className={`relative z-10 flex size-[19px] shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                    done ? 'border-teal bg-teal text-white' : 'border-line bg-white text-transparent'
                  }`}
                >
                  <Check size={11} strokeWidth={3} />
                  {isNow && <span className="absolute inset-0 animate-ping rounded-full bg-teal/40" />}
                </span>
                <span
                  className={`flex min-w-0 flex-1 items-baseline justify-between gap-3 rounded-lg px-2 py-1 transition-colors duration-500 ${
                    isNow ? 'bg-teal-wash' : ''
                  }`}
                >
                  <span className={`truncate text-[13px] font-semibold ${s.mono ? 'font-mono' : ''} ${done ? 'text-ink' : 'text-muted'}`}>
                    {s.label}
                  </span>
                  <span className="shrink-0 font-mono text-[10.5px] text-muted">{s.detail}</span>
                </span>
              </li>
            )
          })}
        </ol>
      </motion.div>

      {/* Floating annotations */}
      <motion.div style={{ x: nearX, y: nearY }} className="absolute top-[6%] right-[0%] sm:right-[-4%]">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{ opacity: { delay: 1.1 }, scale: { delay: 1.1 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
          className="block rounded-2xl border border-line bg-ivory px-3.5 py-2 font-mono text-xs text-teal-ink shadow-soft"
        >
          deny-by-default
        </motion.span>
      </motion.div>
      <motion.div style={{ x: farX, y: farY }} className="absolute bottom-[7%] left-[-2%] sm:left-[-6%]">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.3 }, scale: { delay: 1.3 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
          className="flex items-center gap-2 rounded-2xl border border-line bg-ivory px-3.5 py-2 text-xs font-semibold shadow-soft"
        >
          <span className="size-2 rounded-full bg-clay" /> OAuth2 · OTP 2FA
        </motion.span>
      </motion.div>
      <motion.div style={{ x: nearX, y: nearY }} className="absolute right-[4%] bottom-[2%] hidden sm:block">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{ opacity: { delay: 1.5 }, scale: { delay: 1.5 }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
          className="block rounded-2xl bg-ink px-3.5 py-2 font-mono text-xs text-ivory shadow-lift"
        >
          ExecutorService
        </motion.span>
      </motion.div>
    </div>
  )
}
