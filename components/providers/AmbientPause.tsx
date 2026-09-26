'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/* AmbientPause
   Pauses every ambient decorative loop (.ibtu-ambient, .holo-glass,
   .sparkle-stroke, .iridescent-text, plus the CSS-class-only loops in
   PillarCubes) once it scrolls out of view, and restarts it — from its
   first frame — once it scrolls back in (finding 09).

   Uses a data-offscreen attribute (see the CSS rule in globals.css) rather
   than animation-play-state: paused. A paused CSS animation still counts
   in document.getAnimations(), which is exactly the metric the design
   audit reads, so pausing would not move the number; animation:none does. */

const AMBIENT_SELECTOR =
  '.ibtu-ambient, .holo-glass, .sparkle-stroke, .iridescent-text, .pillar-cubes-backdrop, .pillar-cube-label'

export default function AmbientPause() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.removeAttribute('data-offscreen')
          } else {
            el.setAttribute('data-offscreen', 'true')
          }
        }
      },
      { rootMargin: '10%' },
    )

    const seen = new Set<Element>()
    const scan = () => {
      document.querySelectorAll(AMBIENT_SELECTOR).forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        observer.observe(el)
      })
    }

    scan()

    // Re-scan when nodes are added (route change, lazy-mounted sections,
    // dynamic imports), debounced so a burst of DOM writes is one scan.
    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    const mutationObserver = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(scan, 200)
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      if (debounceTimer) clearTimeout(debounceTimer)
      seen.clear()
    }
    // Re-run the whole setup on route change so the new page's ambient
    // elements get observed from a clean slate.
  }, [pathname])

  return null
}
