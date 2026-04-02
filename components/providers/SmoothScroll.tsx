'use client'

import { useEffect, useRef } from 'react'
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
═══════════════════════════════════════ */

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for the Lenis RAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Expose lenis globally for debugging
    if (typeof window !== 'undefined') {
      (window as unknown as Record<string, unknown>).__lenis = lenis
    }

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
