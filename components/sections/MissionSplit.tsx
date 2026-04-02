'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   WHY WE EXIST — type on black, left-aligned
   No big images. Just headline + body text.
═══════════════════════════════════════ */

interface MissionSplitProps {
  headline?: string
  body?: string
  media?: Array<{ type: 'image' | 'video'; src: string; alt?: string }>
}

export default function MissionSplit({
  headline = 'Why We Exist',
  body = 'Since 2020, IBTU has mobilized 62,475+ students, 300+ partners, and $4.5M in resources across Los Angeles — building systems rooted in dignity, access, and community-led design.',
}: MissionSplitProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Headline: words stagger up
      const words = headlineRef.current?.querySelectorAll('.why-word')
      if (words) {
        gsap.fromTo(words,
          { opacity: 0, y: 80, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.12,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }

      // Body text fades in
      if (bodyRef.current) {
        gsap.fromTo(bodyRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: bodyRef.current,
              start: 'top 80%',
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
    <div ref={sectionRef} style={{ background: 'var(--ibtu-black)' }}>
      {/* Headline — left-aligned, gold on black */}
      <div
        ref={headlineRef}
        style={{
          padding: 'clamp(80px, 12vh, 160px) clamp(40px, 5vw, 80px) clamp(32px, 4vh, 48px)',
          maxWidth: 'var(--content-max)',
          margin: '0 auto',
          perspective: '600px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 80px)',
            lineHeight: 0.92,
            textTransform: 'uppercase',
            color: 'var(--ibtu-gold)',
            letterSpacing: '-0.02em',
            textAlign: 'left',
          }}
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="why-word gsap-reveal"
              style={{
                display: 'inline-block',
                marginRight: '0.25em',
                opacity: 0,
              }}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* Body — left-aligned */}
      <div
        ref={bodyRef}
        className="gsap-reveal"
        style={{
          maxWidth: '800px',
          padding: '0 clamp(40px, 5vw, 80px) clamp(80px, 10vh, 140px)',
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-lg)',
            lineHeight: 1.8,
            color: 'var(--warm-white)',
            fontWeight: 400,
            textAlign: 'left',
          }}
        >
          {body}
        </p>
      </div>
    </div>
  )
}
