'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   SKYLINE TRANSITION — Black skyline parallax
   between sections. Can be flipped (upside down).
   Extends/grows on scroll for parallax depth.
═══════════════════════════════════════ */

interface SkylineTransitionProps {
  /** Flip the skyline upside down */
  flip?: boolean
  /** Background color behind the skyline */
  bg?: 'black' | 'gold'
  /** Parallax speed multiplier (default 0.3) */
  speed?: number
}

export default function SkylineTransition({
  flip = false,
  bg = 'black',
  speed = 0.3,
}: SkylineTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const skylineRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!containerRef.current || !skylineRef.current) return

    const ctx = gsap.context(() => {
      // Parallax: skyline moves slower than scroll
      gsap.fromTo(
        skylineRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: speed,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [speed])

  const bgColor = bg === 'gold' ? '#FFC700' : '#000'
  const skylineFilter = bg === 'gold'
    ? 'brightness(0)' // Black skyline on gold bg
    : 'brightness(0) saturate(100%) invert(79%) sepia(98%) saturate(1000%) hue-rotate(3deg) brightness(103%)' // Gold skyline on black bg

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        background: bgColor,
        position: 'relative',
        height: 'clamp(60px, 8vw, 120px)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={skylineRef}
        src="/skyline.svg"
        alt=""
        aria-hidden="true"
        style={{
          width: '100%',
          height: 'auto',
          minHeight: '100%',
          objectFit: 'cover',
          objectPosition: 'center bottom',
          filter: skylineFilter,
          transform: flip ? 'scaleY(-1)' : 'none',
          position: 'absolute',
          bottom: flip ? 'auto' : 0,
          top: flip ? 0 : 'auto',
          left: 0,
        }}
      />
    </div>
  )
}
