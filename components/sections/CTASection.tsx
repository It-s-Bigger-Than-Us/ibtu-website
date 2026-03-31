'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   CTA SECTION — gold bg, sparkle + holo buttons
   Word-by-word headline, fade-up entrance
═══════════════════════════════════════ */

interface CTASectionProps {
  headline?: string
  body?: string
}

export default function CTASection({
  headline = 'Join the Movement',
  body = 'Whether you volunteer, donate, partner, or sponsor — you become part of the foundation. Designed with dignity.',
}: CTASectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Section fade up
      gsap.fromTo(
        sectionRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Word-by-word headline
      const words = headlineRef.current?.querySelectorAll('.cta-word')
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineWords = headline.split(' ')

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--ibtu-gold)',
        padding: 'clamp(80px, 10vw, 160px) clamp(32px, 5vw, 80px)',
        opacity: 0,
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        {/* Big animated headline */}
        <h2
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--display-section)',
            lineHeight: 0.92,
            textTransform: 'uppercase',
            color: 'var(--ibtu-black)',
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            perspective: '600px',
          }}
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="cta-word"
              style={{ display: 'inline-block', opacity: 0, marginRight: '0.25em' }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-lg)',
            lineHeight: 1.6,
            color: 'var(--ibtu-black)',
            maxWidth: '680px',
            marginBottom: '48px',
            fontWeight: 500,
          }}
        >
          {body}
        </p>

        {/* Two buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {/* Donate — black bg, sparkle-stroke border */}
          <Link
            href="/donate"
            className="sparkle-stroke"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '16px 40px',
              borderRadius: '4px',
              background: 'var(--ibtu-black)',
              color: 'var(--ibtu-gold)',
              transition: 'background 0.3s var(--ease-out-expo), color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--ibtu-white)'
              e.currentTarget.style.color = 'var(--ibtu-black)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--ibtu-black)'
              e.currentTarget.style.color = 'var(--ibtu-gold)'
            }}
          >
            Donate
          </Link>

          {/* Volunteer — white bg, holo-glass border */}
          <Link
            href="/get-involved#volunteer"
            className="holo-glass"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '16px 40px',
              borderRadius: '4px',
              background: 'var(--ibtu-white)',
              color: 'var(--ibtu-black)',
              transition: 'background 0.3s var(--ease-out-expo), color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--ibtu-black)'
              e.currentTarget.style.color = 'var(--ibtu-white)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--ibtu-white)'
              e.currentTarget.style.color = 'var(--ibtu-black)'
            }}
          >
            Volunteer
          </Link>
        </div>
      </div>
    </section>
  )
}
