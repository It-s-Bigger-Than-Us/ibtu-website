'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   MISSION SECTION — full-screen photo transitions
   Each photo pushes in from a different direction
   on scroll. Text overlaid on first frame.
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

type Direction = 'right' | 'left' | 'bottom' | 'top'
const DIRECTIONS: Direction[] = ['right', 'bottom', 'left', 'top', 'right', 'bottom']

const enterProps = (dir: Direction) => {
  switch (dir) {
    case 'right': return { x: '100%', y: '0%' }
    case 'left': return { x: '-100%', y: '0%' }
    case 'bottom': return { y: '100%', x: '0%' }
    case 'top': return { y: '-100%', x: '0%' }
  }
}

export default function MissionSplit({
  headline = 'Why We Exist',
  body = 'Since 2020, IBTU has mobilized 62,475+ students, 300+ partners, and $4.5M in resources across Los Angeles — building systems rooted in dignity, access, and community-led design.',
  media,
}: MissionSplitProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current || media.length === 0) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${media.length * 80}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Text fades in
      if (textRef.current) {
        const words = textRef.current.querySelectorAll('.mission-word')
        if (words.length) {
          tl.fromTo(words,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.02, duration: 0.1, ease: 'expo.out' },
            0
          )
        }
        const bodyEl = textRef.current.querySelector('.mission-body')
        if (bodyEl) {
          tl.fromTo(bodyEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.1, ease: 'expo.out' },
            0.05
          )
        }
        // Text fades out before second photo
        tl.to(textRef.current,
          { opacity: 0, duration: 0.08 },
          0.12
        )
      }

      // Each photo pushes in from a different direction
      media.forEach((_, i) => {
        if (i === 0) return
        const el = mediaRefs.current[i]
        if (!el) return

        const dir = DIRECTIONS[(i - 1) % DIRECTIONS.length]
        const from = enterProps(dir)
        const progress = i / media.length

        tl.fromTo(el,
          { ...from, opacity: 1 },
          { x: '0%', y: '0%', opacity: 1, duration: 0.15, ease: 'expo.out' },
          progress
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [media])

  const headlineWords = headline.split(' ')

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--ibtu-black)',
      }}
    >
      {/* Stacked full-bleed photos */}
      {media.map((item, i) => (
        <div
          key={i}
          ref={el => { mediaRefs.current[i] = el }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: i + 1,
            ...(i === 0 ? {} : { transform: `${enterProps(DIRECTIONS[(i - 1) % DIRECTIONS.length]).x !== '0%' ? `translateX(${enterProps(DIRECTIONS[(i - 1) % DIRECTIONS.length]).x})` : `translateY(${enterProps(DIRECTIONS[(i - 1) % DIRECTIONS.length]).y})`}` }),
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
        </div>
      ))}

      {/* Text overlay — visible on first photo only */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: media.length + 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(60px, 8vw, 120px) clamp(40px, 5vw, 80px)',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
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
            maxWidth: '600px',
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
            maxWidth: '520px',
            opacity: 0,
          }}
        >
          {body}
        </p>
      </div>
    </section>
  )
}
