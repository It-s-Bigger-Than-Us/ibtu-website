'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProgramRingGallery from './ProgramRingGallery'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   PROGRAMS PAGE — 2-column per program
   Left: pillar + title + tagline + CTA
   Right: 3D gradient carousel of program photos
   "OUR PROGRAMS" shrinks + sticks at top.
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

  useEffect(() => {
    if (!stickyRef.current || !headlineRef.current) return
    const ctx = gsap.context(() => {
      // Shrink headline on scroll — no pin, content flows up naturally
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
    })
    return () => ctx.revert()
  }, [])

  return (
    <main style={{ background: '#FFC700', minHeight: '100vh' }}>
      {/* Sticky headline */}
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

      {/* Each program — 2 columns: text left, gallery right */}
      {programs.map((prog, idx) => {
        const isBlack = idx % 2 !== 0
        const textColor = isBlack ? '#FFC700' : '#000'
        const bodyColor = isBlack ? '#FFF' : '#000'
        const bg = isBlack ? '#000' : '#FFC700'
        const btnBg = isBlack ? '#FFC700' : '#000'
        const btnColor = isBlack ? '#000' : '#FFC700'

        return (
          <section
            key={prog.slug}
            style={{
              background: bg,
              padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)',
            }}
          >
            <div style={{
              maxWidth: 'var(--content-max)',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(32px, 4vw, 64px)',
              alignItems: 'center',
            }}>
              {/* Left column: text */}
              <div>
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
                  fontWeight: 500,
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
                  className="iridescent-border"
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
                  Learn More →
                </Link>
              </div>

              {/* Right column: 3D gradient carousel */}
              <div>
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
