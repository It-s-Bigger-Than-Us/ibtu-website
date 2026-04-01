'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   MISSION SECTION — black bg, gold text.
   No photos. No text over images.
   Clean typographic statement.
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
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.mission-word')
      if (words) {
        gsap.fromTo(words,
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1, y: 0, rotateX: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        )
      }

      const bodyEl = textRef.current?.querySelector('.mission-body')
      if (bodyEl) {
        gsap.fromTo(bodyEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
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
        background: 'var(--ibtu-black)',
        padding: 'clamp(100px, 15vh, 200px) clamp(40px, 5vw, 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
      }}
    >
      <div
        ref={textRef}
        style={{
          maxWidth: 'var(--content-max)',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--display-section)',
            lineHeight: 0.95,
            textTransform: 'uppercase',
            color: 'var(--ibtu-gold)',
            letterSpacing: '-0.02em',
            marginBottom: '40px',
            perspective: '600px',
          }}
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="mission-word gsap-reveal"
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </span>
          ))}
        </h2>
        <p
          className="mission-body gsap-reveal"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-lg)',
            lineHeight: 1.8,
            color: 'var(--ibtu-white)',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {body}
        </p>
      </div>
    </section>
  )
}
