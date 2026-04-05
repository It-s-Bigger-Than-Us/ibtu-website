'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   WHAT WE DO — narrative storytelling
   Left-aligned, editorial. Tells what IBTU
   actually does day-to-day across 3 pillars.
═══════════════════════════════════════ */

interface MissionSplitProps {
  headline?: string
  body?: string
  media?: Array<{ type: 'image' | 'video'; src: string; alt?: string }>
}

export default function MissionSplit({
  headline = 'What We Do',
}: MissionSplitProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const blocksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll('.why-word')
      if (words) {
        gsap.fromTo(words,
          { opacity: 0, y: 80, rotateX: -20 },
          {
            opacity: 1, y: 0, rotateX: 0,
            stagger: 0.12, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: headlineRef.current, start: 'top 75%', once: true },
          }
        )
      }

      const blocks = blocksRef.current?.querySelectorAll('.story-block')
      if (blocks) {
        gsap.fromTo(blocks,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            stagger: 0.15, duration: 0.8, ease: 'expo.out',
            scrollTrigger: { trigger: blocksRef.current, start: 'top 75%', once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineWords = headline.split(' ')

  const pillars = [
    {
      label: 'Crisis & Disaster Stabilization',
      text: 'When the Palisades and Eaton fires displaced thousands of families in January 2025, IBTU mobilized within 72 hours. Within 90 days we built a permanent Relief Resource Hub at Baldwin Hills Crenshaw Plaza — open five days a week, serving 324 active clients who return an average of 23 times each. Housing navigation, mental health counseling, dental care, and food assistance — all under one roof, all free, all dignified.',
    },
    {
      label: 'School & Youth Stability',
      text: 'Inside 34 school campuses across Los Angeles, IBTU runs Lunchtime Takeovers that transform cafeterias into spaces of belonging. We facilitate 8-week Parent Empowerment Workshops, host Staff Appreciation Days, and organize campus-wide Resource Fairs that bring 15+ partner organizations directly to families. In 2025 alone, 28,025 students were served — because when families face instability, students feel it first.',
    },
    {
      label: 'Community Health & Resource Access',
      text: 'Every month, IBTU distributes thousands of pounds of food to families across Los Angeles — 875,500 pounds since 2020. Our Coastal Care crews clean Venice Beach every second Saturday. The annual Back 2 School Festival has distributed 18,550 backpacks across 6 years. And our wellness programming with lululemon brings free yoga, health screenings, and dental care to the neighborhoods that need it most.',
    },
  ]

  return (
    <div ref={sectionRef} style={{ background: 'var(--ibtu-black)' }}>
      {/* Headline */}
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
              style={{ display: 'inline-block', marginRight: '0.25em', opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* Three pillars — narrative blocks */}
      <div
        ref={blocksRef}
        style={{
          maxWidth: 'var(--content-max)',
          padding: '0 clamp(40px, 5vw, 80px) clamp(80px, 10vh, 140px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(40px, 5vw, 64px)',
        }}
      >
        {pillars.map((pillar) => (
          <div key={pillar.label} className="story-block gsap-reveal" style={{ opacity: 0 }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--ibtu-gold)',
                display: 'block',
                marginBottom: 12,
              }}
            >
              {pillar.label}
            </span>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                lineHeight: 1.8,
                color: 'var(--warm-white)',
                maxWidth: '720px',
                fontWeight: 400,
              }}
            >
              {pillar.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
