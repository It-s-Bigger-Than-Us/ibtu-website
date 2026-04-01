'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   MISSION SECTION — full-bleed photo with
   text overlay. No scroll pinning.
═══════════════════════════════════════ */

interface MissionSplitProps {
  headline?: string
  body?: string
  media: Array<{
    type: 'image' | 'video'
    src: string
    alt?: string
  }>
}

export default function MissionSplit({
  headline = 'Why We Exist',
  body = 'Since 2020, IBTU has mobilized 62,475+ students, 300+ partners, and $4.5M in resources across Los Angeles — building systems rooted in dignity, access, and community-led design.',
  media,
}: MissionSplitProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Text animates in on scroll
      const words = textRef.current?.querySelectorAll('.mission-word')
      if (words) {
        gsap.fromTo(words,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            stagger: 0.06,
            duration: 0.8,
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
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineWords = headline.split(' ')
  const bgImage = media[0]?.src || ''

  return (
    <>
      {/* Hero photo with text overlay */}
      <section
        ref={sectionRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgImage}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'saturate(1.15) brightness(1.05)',
          }}
        />

        {/* Gradient scrim */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          }}
        />

        {/* Text */}
        <div
          ref={textRef}
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(60px, 8vw, 120px) clamp(40px, 5vw, 80px)',
            maxWidth: '650px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--display-section)',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              color: 'var(--ibtu-white)',
              marginBottom: '32px',
            }}
          >
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className="mission-word"
                style={{ display: 'inline-block', marginRight: '0.25em', opacity: 0 }}
              >
                {word}
              </span>
            ))}
          </h2>
          <p
            className="mission-body"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-lg)',
              lineHeight: 1.7,
              color: 'var(--ibtu-white)',
              opacity: 0,
            }}
          >
            {body}
          </p>
        </div>
      </section>

      {/* Remaining photos as full-bleed strips */}
      {media.slice(1).map((item, i) => (
        <section
          key={i}
          style={{
            width: '100%',
            height: '60vh',
            minHeight: '400px',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.alt || 'IBTU'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'saturate(1.15) brightness(1.05)',
            }}
          />
        </section>
      ))}
    </>
  )
}
