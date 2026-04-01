'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ═══════════════════════════════════════
   HERO INTRO — "It's Bigger Than Us"
   Phase 1: Words animate in on load
   Phase 2: Logo wipes in, zooms past camera
═══════════════════════════════════════ */

export default function HeroIntro() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLHeadingElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wordsRef.current || !logoRef.current) return

    const words = wordsRef.current.querySelectorAll('.intro-word')
    if (!words.length) return

    const tl = gsap.timeline({ delay: 0.3 })

    // Phase 1: Words enter from alternating sides
    words.forEach((word, i) => {
      const fromLeft = i % 2 === 0
      tl.fromTo(
        word,
        { opacity: 0, x: fromLeft ? -200 : 200, rotateY: fromLeft ? -30 : 30 },
        { opacity: 1, x: 0, rotateY: 0, duration: 0.8, ease: 'expo.out' },
        i * 0.15,
      )
    })

    // Phase 2: Logo wipes in with circular clip-path
    tl.fromTo(
      logoRef.current,
      { clipPath: 'circle(0% at 50% 50%)', opacity: 1 },
      { clipPath: 'circle(35% at 50% 50%)', duration: 0.6, ease: 'power2.inOut' },
      '+=0.4'
    )

    // Words fade out behind the logo
    tl.to(
      wordsRef.current,
      { opacity: 0, scale: 0.8, duration: 0.3 },
      '<+=0.2'
    )

    // Logo zooms past camera
    tl.to(
      logoRef.current,
      { scale: 18, opacity: 0, duration: 0.8, ease: 'expo.in' },
      '+=0.1'
    )

    // Fade section to black after animation
    tl.to(
      sectionRef.current,
      { background: 'var(--ibtu-black)', duration: 0.01 },
    )

    return () => { tl.kill() }
  }, [])

  const titleWords = ["It's", 'Bigger', 'Than', 'Us']

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'var(--ibtu-gold)',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 clamp(24px, 5vw, 80px)',
        perspective: '800px',
        overflow: 'hidden',
      }}
    >
      {/* Title words */}
      <h1
        ref={wordsRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px, 14vw, 220px)',
          lineHeight: 0.92,
          textTransform: 'uppercase',
          color: 'var(--ibtu-black)',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 0.25em',
          maxWidth: '100%',
          zIndex: 1,
        }}
      >
        {titleWords.map((word, i) => (
          <span
            key={i}
            className="intro-word"
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

      {/* Logo overlay — wipes in then zooms past */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--ibtu-gold)',
          clipPath: 'circle(0% at 50% 50%)',
          zIndex: 2,
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
    </section>
  )
}
