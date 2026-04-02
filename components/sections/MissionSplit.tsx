'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   WHY WE EXIST — cinematic 3-part section
   1. Full-bleed photo
   2. "Why We Exist" headline animates on scroll
   3. Second image pushes in with body text below
═══════════════════════════════════════ */

interface MissionSplitProps {
  headline?: string
  body?: string
  media?: Array<{ type: 'image' | 'video'; src: string; alt?: string }>
}

export default function MissionSplit({
  headline = 'Why We Exist',
  body = 'Since 2020, IBTU has mobilized 62,475+ students, 300+ partners, and $4.5M in resources across Los Angeles — building systems rooted in dignity, access, and community-led design.',
  media = [],
}: MissionSplitProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const photo1Ref = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const photo2Ref = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const photo1Src = media[0]?.src || '/images/landscape/_D5A8515.jpg'
  const photo1Alt = media[0]?.alt || 'IBTU community'
  const photo2Src = media[1]?.src || '/images/landscape/IMG_5943.jpg'
  const photo2Alt = media[1]?.alt || 'IBTU in action'

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Photo 1: subtle parallax zoom on scroll
      const img1 = photo1Ref.current?.querySelector('img')
      if (img1) {
        gsap.fromTo(img1,
          { scale: 1.1 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: photo1Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }

      // Headline: words stagger up from bottom
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

      // Photo 2: slides up from below (push effect)
      if (photo2Ref.current) {
        gsap.fromTo(photo2Ref.current,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: photo2Ref.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      // Body text fades in after photo 2
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
    <div ref={sectionRef}>
      {/* ── Part 1: Full-bleed photo ── */}
      <div
        ref={photo1Ref}
        style={{
          width: '100%',
          height: '75vh',
          minHeight: '400px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo1Src}
          alt={photo1Alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'saturate(1.15) brightness(1.05)',
          }}
        />
      </div>

      {/* ── Part 2: Headline on black ── */}
      <div
        ref={headlineRef}
        style={{
          background: 'var(--ibtu-black)',
          padding: 'clamp(80px, 12vh, 160px) clamp(40px, 5vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '600px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--display-hero)',
            lineHeight: 0.92,
            textTransform: 'uppercase',
            color: 'var(--ibtu-gold)',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            maxWidth: 'var(--content-max)',
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

      {/* ── Part 3: Second photo pushes in + body text ── */}
      <div style={{ background: 'var(--ibtu-black)' }}>
        <div
          ref={photo2Ref}
          className="gsap-reveal"
          style={{
            width: '100%',
            maxWidth: 'var(--content-max)',
            margin: '0 auto',
            padding: '0 clamp(40px, 5vw, 80px)',
            opacity: 0,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '50vh',
              minHeight: '300px',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo2Src}
              alt={photo2Alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'saturate(1.15) brightness(1.05)',
              }}
            />
          </div>
        </div>

        <div
          ref={bodyRef}
          className="gsap-reveal"
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: 'clamp(40px, 5vw, 64px) clamp(40px, 5vw, 80px) clamp(80px, 10vh, 140px)',
            textAlign: 'center',
            opacity: 0,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-lg)',
              lineHeight: 1.8,
              color: 'var(--ibtu-white)',
              fontWeight: 400,
            }}
          >
            {body}
          </p>
        </div>
      </div>
    </div>
  )
}
