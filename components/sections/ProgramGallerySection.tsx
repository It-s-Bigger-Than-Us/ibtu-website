'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProgramRingGallery from './ProgramRingGallery'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   PROGRAMS PAGE — Scroll through programs
   "OUR PROGRAMS" big headline shrinks + sticks.
   Each program: title + 3D ring gallery + info.
   Yellow bg throughout.
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
      gsap.fromTo(headlineRef.current,
        { fontSize: 'clamp(72px, 14vw, 240px)' },
        {
          fontSize: 'clamp(20px, 2.5vw, 32px)',
          ease: 'none',
          scrollTrigger: {
            trigger: stickyRef.current,
            start: 'top top',
            end: '+=250',
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
      {/* Sticky headline */}
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

      {/* Each program — 3D ring gallery + info */}
      {programs.map((prog, idx) => (
        <section
          key={prog.slug}
          style={{
            background: idx % 2 === 0 ? '#FFC700' : '#000',
            padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)',
          }}
        >
          <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
            {/* Program header */}
            <div style={{ marginBottom: 'clamp(24px, 3vw, 40px)' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: idx % 2 === 0 ? '#000' : '#FFC700',
                display: 'block',
                marginBottom: 12,
              }}>
                {prog.pillar}
              </span>
              <Link
                href={`/our-programs/${prog.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 6vw, 80px)',
                  lineHeight: 0.92,
                  textTransform: 'uppercase',
                  color: idx % 2 === 0 ? '#000' : '#FFC700',
                  letterSpacing: '-0.02em',
                  marginBottom: 16,
                }}>
                  {prog.title}
                </h2>
              </Link>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                color: idx % 2 === 0 ? '#000' : '#FFF',
                lineHeight: 1.7,
                maxWidth: 600,
                fontWeight: 500,
              }}>
                {prog.tagline}
              </p>
            </div>

            {/* 3D Ring Gallery for this program */}
            {prog.galleryImages.length > 0 && (
              <ProgramRingGallery images={prog.galleryImages} title={prog.title} />
            )}

            {/* CTA link */}
            <div style={{ marginTop: 'clamp(24px, 3vw, 40px)', textAlign: 'center' }}>
              <Link
                href={`/our-programs/${prog.slug}`}
                className="iridescent-border"
                style={{
                  display: 'inline-block',
                  background: idx % 2 === 0 ? '#000' : '#FFC700',
                  color: idx % 2 === 0 ? '#FFC700' : '#000',
                  padding: '14px 36px',
                  borderRadius: '16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Learn More →
              </Link>
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
