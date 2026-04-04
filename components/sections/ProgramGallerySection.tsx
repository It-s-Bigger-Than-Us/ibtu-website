'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProgramRingGallery from './ProgramRingGallery'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   PROGRAMS PAGE — 2-column per program
   Left: pillar + title + tagline + CTA
   Right: 3D gradient carousel of program photos
   Parallax on every section for butter-smooth feel.
═══════════════════════════════════════ */

interface ProgramData {
  slug: string
  title: string
  pillar: string
  tagline: string
  cardStat: string
  heroImage: string | null
  galleryImages: string[]
}

export default function ProgramGallerySection({ programs }: { programs: ProgramData[] }) {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLElement[]>([])
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => {
    if (!stickyRef.current || !headlineRef.current) return
    const ctx = gsap.context(() => {
      // Headline shrinks on scroll
      gsap.to(headlineRef.current, {
        fontSize: 'clamp(20px, 2.5vw, 32px)',
        paddingTop: '80px',
        paddingBottom: '16px',
        ease: 'none',
        scrollTrigger: {
          trigger: stickyRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Slide-in parallax on each program section
      sectionsRef.current.forEach((section) => {
        if (!section) return
        const textCol = section.querySelector('.prog-text')
        const galleryCol = section.querySelector('.prog-gallery')

        // Text slides up from below
        if (textCol) {
          gsap.fromTo(textCol,
            { y: 80 },
            {
              y: -15,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          )
        }

        // Gallery slides at a different rate for depth
        if (galleryCol) {
          gsap.fromTo(galleryCol,
            { y: 120 },
            {
              y: -30,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          )
        }
      })
    })
    return () => ctx.revert()
  }, [programs])

  return (
    <main style={{ background: '#FFC700', minHeight: '100vh' }}>
      {/* Headline with iridescent bg */}
      <div
        ref={stickyRef}
        style={{
          background: 'var(--holo-gradient)',
          backgroundSize: '600% 600%',
          animation: 'holo-shift 20s ease infinite',
          padding: 'clamp(100px, 12vh, 140px) clamp(32px, 5vw, 80px) 0',
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

      {/* Each program — 2 columns with parallax */}
      {programs.map((prog, idx) => {
        const isBlack = idx % 2 !== 0
        const isHov = hoveredIdx === idx
        // Reverse colors on hover
        const textColor = isHov ? (isBlack ? '#000' : '#FFC700') : (isBlack ? '#FFC700' : '#000')
        const bodyColor = isHov ? (isBlack ? '#000' : '#FFF') : (isBlack ? '#FFF' : '#000')
        const bg = isHov ? (isBlack ? '#FFC700' : '#000') : (isBlack ? '#000' : '#FFC700')
        const btnBg = isHov ? (isBlack ? '#000' : '#FFC700') : (isBlack ? '#FFC700' : '#000')
        const btnColor = isHov ? (isBlack ? '#FFC700' : '#000') : (isBlack ? '#000' : '#FFC700')

        return (
          <section
            key={prog.slug}
            ref={(el) => { if (el) sectionsRef.current[idx] = el }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              background: bg,
              padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)',
              overflow: 'hidden',
              transition: 'background 0.5s, color 0.5s',
            }}
          >
            <div className="prog-inner" style={{
              maxWidth: 'var(--content-max)',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(32px, 4vw, 64px)',
              alignItems: 'center',
            }}>
              {/* Left column: text — parallax class */}
              <div className="prog-text" style={{ willChange: 'transform' }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: textColor,
                  display: 'block',
                  marginBottom: 12,
                }}>
                  {prog.pillar}
                </span>

                <Link href={`/our-programs/${prog.slug}`} style={{ textDecoration: 'none' }}>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 56px)',
                    lineHeight: 0.92,
                    textTransform: 'uppercase',
                    color: textColor,
                    letterSpacing: '-0.02em',
                    marginBottom: 16,
                  }}>
                    {prog.title}
                  </h2>
                </Link>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-sm)',
                  color: bodyColor,
                  lineHeight: 1.7,
                  fontWeight: 700,
                  marginBottom: 24,
                }}>
                  {prog.tagline}
                </p>

                {prog.cardStat && (
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: textColor,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 24,
                  }}>
                    {prog.cardStat}
                  </span>
                )}

                <Link
                  href={`/our-programs/${prog.slug}`}
                  style={{
                    display: 'inline-block',
                    background: btnBg,
                    color: btnColor,
                    padding: '12px 28px',
                    borderRadius: '16px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  See This Program →
                </Link>
              </div>

              {/* Right column: gallery — parallax class (moves faster) */}
              <div className="prog-gallery" style={{ willChange: 'transform' }}>
                {prog.galleryImages.length > 0 && (
                  <ProgramRingGallery images={prog.galleryImages} title={prog.title} />
                )}
              </div>
            </div>
          </section>
        )
      })}

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          section > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
