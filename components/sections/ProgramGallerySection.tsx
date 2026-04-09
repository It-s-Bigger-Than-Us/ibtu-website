'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
/* ProgramRingGallery removed — replaced with full-bleed image column */

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   PROGRAMS PAGE — full-width sections
   Each section fills the screen edge-to-edge.
   Iridescent transition strips between sections.
   Fire Relief title breaks: "Fire Relief" / "& The Hub"
   Description boxes: half-width.
   Coming Soon label for select programs.
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

const COMING_SOON_SLUGS = ['community-builder-linkups', 'community-health', 'wellness']

function formatTitle(title: string) {
  // Fire Relief & The Hub → two lines
  if (title.includes('Fire Relief')) {
    return <>Fire Relief<br />&amp; The Hub</>
  }
  return title
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

      // Parallax SLIDE on each program section
      sectionsRef.current.forEach((section, idx) => {
        if (!section) return
        const textCol = section.querySelector('.prog-text')
        const galleryCol = section.querySelector('.prog-gallery')
        const fromLeft = idx % 2 === 0

        if (textCol) {
          gsap.fromTo(textCol,
            { x: fromLeft ? -120 : 120, y: 40 },
            {
              x: 0,
              y: -10,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'center center',
                scrub: 0.3,
              },
            }
          )
        }

        if (galleryCol) {
          gsap.fromTo(galleryCol,
            { x: fromLeft ? 100 : -100, y: 60 },
            {
              x: 0,
              y: -15,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'center center',
                scrub: 0.3,
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
      {/* Headline with sky bg — gold type */}
      <div
        ref={stickyRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(100px, 12vh, 140px) clamp(32px, 5vw, 80px) clamp(40px, 5vh, 60px)',
        }}
      >
        {/* Sky background with cloud panning */}
        <img
          src="/images/blue-sky.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '110%',
            height: '120%',
            objectFit: 'cover',
            top: '-10%',
            left: '-5%',
            zIndex: 0,
            animation: 'skyPan 60s linear infinite',
          }}
        />
        <h1
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(72px, 14vw, 240px)',
            lineHeight: 0.88,
            textTransform: 'uppercase',
            color: '#FFC700',
            letterSpacing: '-0.03em',
            position: 'relative',
            zIndex: 1,
            textShadow: '0 2px 20px rgba(0,0,0,0.15)',
          }}
        >
          Our Programs
        </h1>
      </div>

      {/* Each program — full-width with iridescent transitions */}
      {programs.map((prog, idx) => {
        const isBlack = idx % 2 !== 0
        const isHov = hoveredIdx === idx
        const textColor = isHov ? (isBlack ? '#000' : '#FFC700') : (isBlack ? '#FFC700' : '#000')
        const bodyColor = isHov ? (isBlack ? '#000' : '#FFF') : (isBlack ? '#FFF' : '#000')
        const bg = isHov ? (isBlack ? '#FFC700' : '#000') : (isBlack ? '#000' : '#FFC700')
        const btnBg = isHov ? (isBlack ? '#000' : '#FFC700') : (isBlack ? '#FFC700' : '#000')
        const btnColor = isHov ? (isBlack ? '#FFC700' : '#000') : (isBlack ? '#000' : '#FFC700')
        const isComingSoon = COMING_SOON_SLUGS.includes(prog.slug)

        return (
          <div key={prog.slug}>
            {/* Iridescent transition strip between sections */}
            <div
              style={{
                height: 'clamp(4px, 0.5vw, 8px)',
                background: 'var(--holo-gradient)',
                backgroundSize: '600% 600%',
                animation: 'holo-shift 20s ease infinite',
                width: '100%',
              }}
            />

            <section
              ref={(el) => { if (el) sectionsRef.current[idx] = el }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                background: bg,
                overflow: 'hidden',
                transition: 'background 0.5s, color 0.5s',
                width: '100%',
              }}
            >
              <div className="prog-inner" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'stretch',
                gap: 0,
                minHeight: 'clamp(400px, 50vh, 600px)',
              }}>
                {/* Left column: text — padded, half-width description */}
                <div className="prog-text" style={{
                  willChange: 'transform',
                  maxWidth: '480px',
                  padding: 'clamp(60px, 8vw, 100px) 0 clamp(60px, 8vw, 100px) clamp(24px, 4vw, 64px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: textColor,
                    display: 'block',
                    marginBottom: 12,
                    transition: 'color 0.5s',
                  }}>
                    {prog.pillar}
                  </span>

                  {isComingSoon ? (
                    <h2 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(28px, 4vw, 56px)',
                      lineHeight: 0.92,
                      textTransform: 'uppercase',
                      color: textColor,
                      letterSpacing: '-0.02em',
                      marginBottom: 16,
                      transition: 'color 0.5s',
                    }}>
                      {formatTitle(prog.title)}
                    </h2>
                  ) : (
                    <Link href={`/our-programs/${prog.slug}`} style={{ textDecoration: 'none' }}>
                      <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(28px, 4vw, 56px)',
                        lineHeight: 0.92,
                        textTransform: 'uppercase',
                        color: textColor,
                        letterSpacing: '-0.02em',
                        marginBottom: 16,
                        transition: 'color 0.5s',
                      }}>
                        {formatTitle(prog.title)}
                      </h2>
                    </Link>
                  )}

                  {isComingSoon && (
                    <span style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color: isBlack ? '#FFC700' : '#000',
                      background: isBlack ? '#000' : '#FFC700',
                      border: `1px solid ${isBlack ? '#FFC700' : '#000'}`,
                      padding: '6px 16px',
                      borderRadius: '16px',
                      marginBottom: 16,
                    }}>
                      Coming Soon
                    </span>
                  )}

                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--body-sm)',
                    color: bodyColor,
                    lineHeight: 1.7,
                    fontWeight: 700,
                    marginBottom: 24,
                    maxWidth: '360px',
                    transition: 'color 0.5s',
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
                      transition: 'color 0.5s',
                    }}>
                      {prog.cardStat}
                    </span>
                  )}

                  {isComingSoon ? (
                    <span
                      style={{
                        display: 'inline-block',
                        background: 'transparent',
                        color: textColor,
                        padding: '12px 28px',
                        borderRadius: '16px',
                        border: `1px solid ${textColor}`,
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        transition: 'color 0.5s, border-color 0.5s',
                      }}
                    >
                      Coming Soon
                    </span>
                  ) : (
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
                        transition: 'background 0.3s, color 0.3s, transform 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      See This Program →
                    </Link>
                  )}
                </div>

                {/* Right column: full-bleed stacked images */}
                <div className="prog-gallery" style={{
                  willChange: 'transform',
                  position: 'relative',
                  minHeight: '100%',
                  margin: 0,
                  padding: 0,
                  lineHeight: 0,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridAutoRows: 'minmax(200px, 1fr)',
                  gap: 0,
                }}>
                  {prog.galleryImages.slice(0, 6).map((img, imgIdx) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={imgIdx}
                      src={img}
                      alt=""
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        gridColumn: imgIdx === 0 ? 'span 2' : undefined,
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        )
      })}

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .prog-inner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
