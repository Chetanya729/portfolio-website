import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in the reading zone (a band just below
 * the navbar) so the navigation can highlight it.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        }
        // Prefer the first section (in document order) that is in the zone.
        const next = ids.find((id) => visible.has(id))
        if (next) setActive(next)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01] },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
