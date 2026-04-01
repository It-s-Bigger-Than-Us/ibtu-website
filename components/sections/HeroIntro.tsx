'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ═══════════════════════════════════════
   HERO INTRO — "It's Bigger Than Us"
   Word-by-word entrance on page load.
   Gold bg, black text, LOT font.
═══════════════════════════════════════ */

export default function HeroIntro() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!wordsRef.current) return

    const words = wordsRef.current.querySelectorAll('.intro-word')
    if (!words.length) return

    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(
      words,
      { opacity: 0, y: 80, rotateX: -20 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'expo.out',
      }
    )

    return () => { tl.kill() }
  }, [])

  const titleWords = ["It's", 'Bigger', 'Than', 'Us']

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--ibtu-gold)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 clamp(24px, 5vw, 80px)',
        perspective: '800px',
      }}
    >
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
    </section>
  )
}
