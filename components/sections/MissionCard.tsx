'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   MISSION CARD — Gold card, storytelling.
   "Our Mission" + founding story + what we do.
═══════════════════════════════════════ */

export default function MissionCard() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--ibtu-black)',
        padding: 'clamp(80px, 10vh, 140px) clamp(32px, 5vw, 80px)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        ref={cardRef}
        className="gsap-reveal"
        style={{
          background: 'var(--ibtu-gold)',
          borderRadius: '16px',
          padding: 'clamp(48px, 6vw, 80px)',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--ibtu-black)',
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Our Mission
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: 'var(--ibtu-black)',
            letterSpacing: '-0.01em',
            marginBottom: '24px',
          }}
        >
          Building trusted, place-based infrastructure for the communities that need it most.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-md)',
              lineHeight: 1.7,
              color: 'var(--ibtu-black)',
              maxWidth: '680px',
              fontWeight: 500,
            }}
          >
            IBTU started in 2020 when a group of neighbors decided that the community response to a crisis should not disappear when the cameras leave. What began as a pandemic-era mutual aid effort has grown into a permanent operating system for Los Angeles — seven programs, 34 school campuses, a permanent Relief Hub, and a network of 300 partners who show up every week.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-md)',
              lineHeight: 1.7,
              color: 'var(--ibtu-black)',
              maxWidth: '680px',
              fontWeight: 500,
            }}
          >
            We run year-round programming inside schools, monthly beach cleanups on the coast, weekly resource distributions, and the only community-operated disaster relief hub in Baldwin Hills. Every program is designed with the people it serves — not for them.
          </p>
        </div>
      </div>
    </section>
  )
}
