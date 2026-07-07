'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   LENIS SMOOTH SCROLL PROVIDER
   Foundation for all scroll animations.
   Syncs Lenis with GSAP ScrollTrigger.

   IMPORTANT: globals.css must NOT have
   scroll-behavior: smooth on html — it
   conflicts with Lenis and makes it invisible.

   FIXES:
   - Scroll-to-top on route change (fixes hero skip)
   - Snappier lerp (0.1 vs 0.08) for crisper feel
   - Proper cleanup of GSAP ticker
═══════════════════════════════════════ */

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio') ?? false

  useEffect(() => {
    if (isStudio) return
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for the Lenis RAF loop
    const tickFn = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickFn)
    gsap.ticker.lagSmoothing(0)

    // Expose lenis globally for debugging
    if (typeof window !== 'undefined') {
      (window as unknown as Record<string, unknown>).__lenis = lenis
    }

    return () => {
      gsap.ticker.remove(tickFn)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [isStudio])

  // Scroll to top on route change — fixes hero skip bug
  useEffect(() => {
    if (isStudio) return
    const lenis = lenisRef.current
    if (!lenis) return

    // Immediate scroll to top — no animation, just reset
    lenis.scrollTo(0, { immediate: true })

    // Also refresh ScrollTrigger positions after route change
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }, [pathname])

  return <>{children}</>
}
