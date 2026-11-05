import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Download, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../../data/profile'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Reveal } from '../ui/Reveal'

export function Contact() {
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle')

  useEffect(() => {
    if (copied === 'idle') return
    const t = window.setTimeout(() => setCopied('idle'), 2200)
    return () => window.clearTimeout(t)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied('ok')
    } catch {
      setCopied('fail')
    }
  }

  const channels = [
    { label: 'LinkedIn', sub: 'Connect professionally', href: profile.links.linkedin, icon: <LinkedInIcon size={20} />, external: true },
    { label: 'GitHub', sub: '@' + profile.githubUsername, href: profile.links.github, icon: <GitHubIcon size={20} />, external: true },
    { label: 'Resume', sub: 'PDF · 1 page', href: profile.resumeUrl, icon: <Download size={20} />, download: profile.resumeFileName },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-line bg-ink px-6 py-16 text-ivory sm:px-12 sm:py-20 lg:px-16">
        {/* Animated background */}
        <div aria-hidden="true" className="absolute inset-0 -z-0">
          <div className="absolute -top-32 -left-24 size-[420px] animate-drift rounded-full bg-teal/35 blur-[100px]" />
          <div className="absolute -right-24 -bottom-40 size-[460px] animate-drift rounded-full bg-clay/30 blur-[110px] [animation-delay:-9s]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgb(250_249_246/0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <svg className="absolute top-1/2 right-[-10%] hidden h-[140%] -translate-y-1/2 text-ivory/10 lg:block" viewBox="0 0 400 400" fill="none">
            <g className="origin-center animate-spin-slow">
              <circle cx="200" cy="200" r="190" stroke="currentColor" strokeDasharray="2 10" />
            </g>
            <circle cx="200" cy="200" r="140" stroke="currentColor" />
          </svg>
        </div>

        <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-clay uppercase">
              06 <span className="h-px w-8 bg-ivory/20" aria-hidden="true" /> Contact
            </p>
            <h2 id="contact-title" className="mt-5 font-display text-4xl leading-[1.05] font-light tracking-tight text-balance sm:text-6xl">
              Have an interesting opportunity? <span className="italic text-[#9cc5bf]">Let’s build something meaningful.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/70">
              I am open to entry-level Java and backend developer roles. The fastest way to reach me is email.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent('Opportunity for Chetanya')}`}
                className="group relative inline-flex min-h-12 items-center gap-2.5 overflow-hidden rounded-full bg-ivory px-6 py-3 font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-15px_rgb(0_0_0/0.5)]"
              >
                <Mail size={18} />
                Email me
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-ivory/20 px-5 py-3 font-mono text-sm text-ivory/85 transition-colors hover:border-ivory/50 hover:text-ivory"
                aria-label={`Copy email address ${profile.email}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2.5"
                  >
                    {copied === 'ok' ? <Check size={16} className="text-[#9cc5bf]" /> : <Copy size={16} />}
                    {copied === 'ok' ? 'Copied to clipboard' : copied === 'fail' ? 'Copy failed — select it' : profile.email}
                  </motion.span>
                </AnimatePresence>
              </button>
              <span role="status" className="sr-only">
                {copied === 'ok' ? 'Email address copied' : ''}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="grid gap-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    {...(c.download ? { download: c.download } : {})}
                    className="group flex items-center gap-4 rounded-3xl border border-ivory/10 bg-ivory/[0.04] p-4 backdrop-blur transition-all duration-300 hover:border-ivory/25 hover:bg-ivory/[0.08] sm:p-5"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ivory/10 text-ivory transition-all duration-500 group-hover:rotate-[-6deg] group-hover:bg-ivory group-hover:text-ink">
                      {c.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl tracking-tight">{c.label}</span>
                      <span className="block truncate text-sm text-ivory/60">{c.sub}</span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-ivory/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ivory"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
