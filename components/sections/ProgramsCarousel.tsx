'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   PROGRAMS INFINITY GALLERY — yellow bg
   "OUR PROGRAMS" big type shrinks + sticks at top.
   Program cards scroll infinitely in a grid.
   Iridescent-filled name box on each card.
   Hover reveals program info.
═══════════════════════════════════════ */

interface ProgramCard {
  slug: string
  title: string
  pillar: string
  tagline: string
  cardStat: string
  scheduleType: string
  image: string | null
}

const FALLBACK_IMAGES: Record<string, string> = {
  'fire-relief': '/images/school/IMG_5382.jpg',
  'back-2-school': '/images/b2s/_D5A7392.jpg',
  'coastal-care': '/images/coastal/IMG_0024.jpg',
  'wellness': '/images/wellness/IMG_0279.jpg',
  'youth-programming': '/images/school/IMG_5608.jpg',
  'community-builder-linkups': '/images/gallery/IMG_4353.jpg',
  'community-health': '/images/gallery/IMG_1311.jpg',
  'giving-season': '/images/gallery/IMG_4649.jpg',
}

export default function ProgramsCarousel({ programs }: { programs: ProgramCard[] }) {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!stickyRef.current || !headlineRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { fontSize: 'clamp(72px, 14vw, 240px)' },
        {
          fontSize: 'clamp(24px, 3vw, 40px)',
          ease: 'none',
          scrollTrigger: {
            trigger: stickyRef.current,
            start: 'top top',
            end: '+=200',
            scrub: true,
            pin: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <main style={{ background: '#FFC700', minHeight: '100vh' }}>
      {/* Sticky headline — shrinks on scroll */}
      <div
        ref={stickyRef}
        style={{
          background: '#FFC700',
          padding: 'clamp(100px, 12vh, 160px) clamp(32px, 5vw, 80px) clamp(32px, 4vh, 48px)',
        }}
      >
        <h1
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(72px, 14vw, 240px)',
            lineHeight: 0.88,
            textTransform: 'uppercase',
            color: '#000',
            letterSpacing: '-0.03em',
          }}
        >
          Our Programs
        </h1>
      </div>

      {/* Program cards — grid layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 0,
          padding: 0,
        }}
      >
        {programs.map((prog) => {
          const imgSrc = prog.image || FALLBACK_IMAGES[prog.slug] || '/images/gallery/IMG_1311.jpg'

          return (
            <Link
              key={prog.slug}
              href={`/our-programs/${prog.slug}`}
              className="program-infinity-card"
              style={{
                textDecoration: 'none',
                display: 'block',
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '3/4',
              }}
            >
              {/* Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgSrc}
                alt={`${prog.title} — IBTU program`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(1.05) saturate(1.15)',
                  transition: 'transform 0.6s var(--ease-out-expo)',
                }}
              />

              {/* Iridescent name box at bottom */}
              <div
                className="program-infinity-info"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'var(--holo-gradient)',
                  backgroundSize: '200% 100%',
                  animation: 'iridescent-shift 4s linear infinite',
                  padding: 'clamp(16px, 2vw, 24px)',
                  transition: 'max-height 0.5s var(--ease-out-expo)',
                }}
              >
                <h2 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(14px, 1.6vw, 20px)',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: '#000',
                  lineHeight: 1.2,
                  margin: 0,
                }}>
                  {prog.title}
                </h2>

                {/* Hover reveal */}
                <div className="program-infinity-details">
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: '#000',
                    display: 'block',
                    marginTop: 8,
                  }}>
                    {prog.pillar}
                  </span>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: '#000',
                    lineHeight: 1.5,
                    fontWeight: 500,
                    margin: '8px 0 0',
                  }}>
                    {prog.tagline}
                  </p>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#000',
                    display: 'inline-block',
                    marginTop: 10,
                    borderBottom: '2px solid #000',
                    paddingBottom: 2,
                  }}>
                    Learn More →
                  </span>
                </div>
              </div>

              <style>{`
                .program-infinity-card:hover img {
                  transform: scale(1.05);
                }
                .program-infinity-details {
                  max-height: 0;
                  overflow: hidden;
                  opacity: 0;
                  transition: max-height 0.5s var(--ease-out-expo), opacity 0.3s;
                }
                .program-infinity-card:hover .program-infinity-details {
                  max-height: 200px;
                  opacity: 1;
                }
              `}</style>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
