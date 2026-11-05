import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navItems, profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'

const ids = navItems.map((n) => n.id)

export function Navbar() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  // Close the mobile menu on Escape and lock page scroll while it is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-teal via-teal to-clay"
        style={{ scaleX: progress }}
      />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
        <motion.nav
          aria-label="Primary"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-[background-color,border-color,box-shadow] duration-500 sm:px-4 ${
            scrolled || open
              ? 'border-line/80 bg-ivory/80 shadow-soft backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <a href="#home" className="group flex items-center gap-2.5 rounded-full pr-2" aria-label={`${profile.name} — back to top`}>
            <span className="flex size-9 items-center justify-center rounded-full bg-ink font-display text-base italic text-ivory transition-transform duration-500 group-hover:rotate-[-8deg]">
              cb
            </span>
            <span className="hidden font-display text-lg tracking-tight sm:inline">
              Chetanya<span className="text-clay">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-line bg-white shadow-soft"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="hidden size-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-ink lg:flex"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="hidden size-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-ink lg:flex"
            >
              <LinkedInIcon size={17} />
            </a>
            <a
              href="#contact"
              className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold whitespace-nowrap text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal sm:inline-flex md:hidden lg:inline-flex"
            >
              Let’s talk
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex size-11 items-center justify-center rounded-full border border-line bg-white/70 text-ink md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-line bg-ivory/95 p-3 shadow-lift backdrop-blur-xl md:hidden"
            >
              <ul className="grid gap-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl tracking-tight ${
                        active === item.id ? 'bg-white text-ink shadow-soft' : 'text-ink-soft'
                      }`}
                    >
                      {item.label}
                      <ArrowRight size={18} className="text-muted" aria-hidden="true" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-3 flex gap-2 border-t border-line px-1 pt-3">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-white text-sm font-semibold"
                >
                  <GitHubIcon size={16} /> GitHub
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-white text-sm font-semibold"
                >
                  <LinkedInIcon size={15} /> LinkedIn
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
