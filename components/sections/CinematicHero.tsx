'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   CINEMATIC HERO — 4-phase scroll-driven intro
   Phase 1: Title reveal (word-by-word) on gold bg
   Phase 2: Logo zoom-out past camera
   Phase 3: Video reveal + center split
   Phase 4: Photo wipe transition to next section
═══════════════════════════════════════ */

interface CinematicHeroProps {
  videoSrc?: string
  photoLeft?: string
  photoRight?: string
}

export default function CinematicHero({
  videoSrc = '/videos/site-clips/homepage-hero/landscape/hero-venice-energy1.mp4',
  photoLeft = '/images/b2s/_D5A7392.jpg',
  photoRight = '/images/coastal/IMG_0024.jpg',
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const phase1Ref = useRef<HTMLDivElement>(null)
  const phase2LogoRef = useRef<HTMLDivElement>(null)
  const phase3Ref = useRef<HTMLDivElement>(null)
  const phase3VideoLeftRef = useRef<HTMLDivElement>(null)
  const phase3VideoRightRef = useRef<HTMLDivElement>(null)
  const phase3TextRef = useRef<HTMLDivElement>(null)
  const phase4LeftRef = useRef<HTMLDivElement>(null)
  const phase4RightRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      /* ── Phase 1: Title word-by-word reveal (0–25%) ── */
      const words = phase1Ref.current?.querySelectorAll('.hero-word')
      if (words) {
        tl.fromTo(
          words,
          { opacity: 0, y: 80, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: 'expo.out',
          },
          0
        )
      }

      /* Logo circular wipe in */
      tl.fromTo(
        phase2LogoRef.current,
        { clipPath: 'circle(0% at 50% 50%)', opacity: 1 },
        { clipPath: 'circle(35% at 50% 50%)', duration: 0.2, ease: 'power2.inOut' },
        0.15
      )

      /* ── Phase 2: Logo accelerates + zooms past camera (25–50%) ── */
      tl.to(phase1Ref.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.1,
      }, 0.25)

      tl.to(phase2LogoRef.current, {
        scale: 15,
        opacity: 0,
        duration: 0.25,
        ease: 'expo.in',
      }, 0.25)

      /* ── Phase 3: Video reveals, then splits (50–75%) ── */
      // Video fades in behind zooming logo
      tl.fromTo(
        phase3Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.05 },
        0.4
      )

      // Start playing video
      tl.call(() => {
        videoRef.current?.play().catch(() => {})
      }, [], 0.45)

      // Video splits down the center — left half slides left, right reveals and slides right
      tl.to(phase3VideoLeftRef.current, {
        clipPath: 'inset(0 50% 0 0)',
        duration: 0.15,
        ease: 'expo.inOut',
      }, 0.55)
      tl.fromTo(phase3VideoRightRef.current,
        { clipPath: 'inset(0 0 0 50%)' },
        { clipPath: 'inset(0 0 0 100%)', duration: 0.15, ease: 'expo.inOut' },
        0.55
      )

      // Sacred text reveals behind split
      const mantraWords = phase3TextRef.current?.querySelectorAll('.mantra-word')
      if (mantraWords) {
        tl.fromTo(
          mantraWords,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.04,
            duration: 0.15,
            ease: 'expo.out',
          },
          0.6
        )
      }

      /* ── Phase 4: Photos wipe in from edges (75–100%) ── */
      tl.fromTo(
        phase4LeftRef.current,
        { x: '-100%', clipPath: 'inset(0 100% 0 0)' },
        { x: '0%', clipPath: 'inset(0 0 0 0)', duration: 0.2, ease: 'expo.out' },
        0.78
      )
      tl.fromTo(
        phase4RightRef.current,
        { x: '100%', clipPath: 'inset(0 0 0 100%)' },
        { x: '0%', clipPath: 'inset(0 0 0 0)', duration: 0.2, ease: 'expo.out' },
        0.78
      )

      // Push sacred text off screen
      tl.to(phase3TextRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.1,
      }, 0.85)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const titleWords = ["It's", 'Bigger', 'Than', 'Us']
  const mantraLines = [
    { text: 'Community', block: true },
    { text: 'is the', block: true },
    { text: 'Infrastructure.', block: true },
  ]

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--ibtu-black)',
      }}
    >
      {/* ── PHASE 1: Gold bg + title ── */}
      <div
        ref={phase1Ref}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--ibtu-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 4,
          perspective: '800px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 12vw, 200px)',
            lineHeight: 0.92,
            textTransform: 'uppercase',
            color: 'var(--ibtu-black)',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0 0.25em',
            padding: '0 24px',
            maxWidth: '100%',
          }}
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              className="hero-word"
              style={{
                display: 'inline-block',
                opacity: 0,
                transformOrigin: 'center bottom',
              }}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>

      {/* ── PHASE 2: Logo zoom ── */}
      <div
        ref={phase2LogoRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
          clipPath: 'circle(0% at 50% 50%)',
          background: 'var(--ibtu-gold)',
          pointerEvents: 'none',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ibtu-logo.svg"
          alt=""
          style={{
            width: '40vh',
            height: '40vh',
            filter: 'brightness(0)',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* ── PHASE 3: Video + split + sacred text ── */}
      <div
        ref={phase3Ref}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          opacity: 0,
        }}
      >
        {/* Full-bleed video — starts full, splits on scroll */}
        <div
          ref={phase3VideoLeftRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'inset(0 0 0 0)',
            zIndex: 2,
          }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            crossOrigin="anonymous"
            playsInline
            autoPlay
            muted
            loop
            preload="auto"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
            }}
          />
        </div>

        {/* Right half clone — hidden initially, revealed during split */}
        <div
          ref={phase3VideoRightRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'inset(0 0 0 100%)',
            zIndex: 2,
          }}
        >
          <video
            src={videoSrc}
            crossOrigin="anonymous"
            playsInline
            autoPlay
            muted
            loop
            preload="auto"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
            }}
          />
        </div>

        {/* Sacred text behind the split */}
        <div
          ref={phase3TextRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            background: 'var(--ibtu-black)',
          }}
        >
          {mantraLines.map((line, i) => (
            <span
              key={i}
              className="mantra-word"
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 10vw, 180px)',
                lineHeight: 0.95,
                textTransform: 'uppercase',
                color: 'var(--ibtu-white)',
                textAlign: 'center',
                opacity: 0,
                padding: '0 16px',
              }}
            >
              {line.text}
            </span>
          ))}
        </div>
      </div>

      {/* ── PHASE 4: Photo wipe from edges ── */}
      <div
        ref={phase4LeftRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          zIndex: 6,
          overflow: 'hidden',
          transform: 'translateX(-100%)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoLeft}
          alt="IBTU community"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'saturate(1.15) brightness(1.05)',
          }}
        />
      </div>

      <div
        ref={phase4RightRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          zIndex: 6,
          overflow: 'hidden',
          transform: 'translateX(100%)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoRight}
          alt="IBTU in action"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'saturate(1.15) brightness(1.05)',
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '9px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--ibtu-gold)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRight: '1.5px solid var(--ibtu-gold)',
            borderBottom: '1.5px solid var(--ibtu-gold)',
            transform: 'rotate(45deg)',
            animation: 'scrollBounce 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
