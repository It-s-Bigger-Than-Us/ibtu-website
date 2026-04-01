'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   MISSION SPLIT — 50/50 sticky panel
   Left: mission text scrolls
   Right: pinned media swaps on scroll
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
  const leftRef = useRef<HTMLDivElement>(null)
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current || media.length === 0) return

    const ctx = gsap.context(() => {
      // Pin the section for multi-media swap
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${media.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Animate left text in
      const words = leftRef.current?.querySelectorAll('.mission-word')
      if (words) {
        tl.fromTo(
          words,
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.03,
            duration: 0.15,
            ease: 'expo.out',
          },
          0
        )
      }

      // Body text fade
      const bodyEl = leftRef.current?.querySelector('.mission-body')
      if (bodyEl) {
        tl.fromTo(
          bodyEl,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'expo.out' },
          0.1
        )
      }

      // Media panel swaps
      media.forEach((_, i) => {
        if (i === 0) return // First is already visible

        const enterDir = i % 3 === 1 ? 'right' : i % 3 === 2 ? 'left' : 'bottom'
        const el = mediaRefs.current[i]
        if (!el) return

        const progress = i / media.length

        if (enterDir === 'right') {
          tl.fromTo(el,
            { x: '100%', opacity: 0 },
            { x: '0%', opacity: 1, duration: 0.15, ease: 'expo.out' },
            progress
          )
        } else if (enterDir === 'left') {
          tl.fromTo(el,
            { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
            { clipPath: 'inset(0 0 0 0)', opacity: 1, duration: 0.15, ease: 'expo.out' },
            progress
          )
        } else {
          tl.fromTo(el,
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.15, ease: 'expo.out' },
            progress
          )
          // Slide back up
          if (i < media.length - 1) {
            tl.to(el,
              { y: '-100%', duration: 0.15, ease: 'expo.in' },
              progress + 0.2
            )
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [media])

  const headlineWords = headline.split(' ')

  return (
    <section
      ref={sectionRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Left panel — text */}
      <div
        ref={leftRef}
        style={{
          background: 'var(--ibtu-black)',
          padding: 'clamp(60px, 8vw, 120px) clamp(40px, 5vw, 80px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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
            perspective: '600px',
          }}
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="mission-word"
              style={{
                display: 'inline-block',
                marginRight: '0.25em',
              }}
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
            maxWidth: '480px',
          }}
        >
          {body}
        </p>
      </div>

      {/* Right panel — media swaps */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '100%', minHeight: '100vh' }}>
        {media.map((item, i) => (
          <div
            key={i}
            ref={el => { mediaRefs.current[i] = el }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: i + 1,
              opacity: i === 0 ? 1 : 0,
            }}
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                playsInline
                autoPlay
                muted
                loop
                preload="auto"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={item.src}
                alt={item.alt || 'IBTU mission'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'saturate(1.15) brightness(1.05)',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 768px) {
          section:has(.mission-word) {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
