'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   STICKY GRID SCROLL — codrops-inspired
   3-column grid of 12 images. Sticky wrapper.
   Columns slide in, grid expands, text reveals.
═══════════════════════════════════════ */

interface StickyGridScrollProps {
  images: string[]
  headline: string
  subheadline: string
  ctaText: string
  ctaHref: string
}

export default function StickyGridScroll({
  images,
  headline,
  subheadline,
  ctaText,
  ctaHref,
}: StickyGridScrollProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const col3Ref = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Split into 3 columns of 4
  const col1 = images.filter((_, i) => i % 3 === 0)
  const col2 = images.filter((_, i) => i % 3 === 1)
  const col3 = images.filter((_, i) => i % 3 === 2)

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current || !contentRef.current) return
    if (!col1Ref.current || !col2Ref.current || !col3Ref.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      // Phase 1: Columns slide in from alternating directions
      tl.fromTo(col1Ref.current, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3 }, 0)
      tl.fromTo(col2Ref.current, { yPercent: -60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3 }, 0.05)
      tl.fromTo(col3Ref.current, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3 }, 0.1)

      // Phase 2: Grid zooms, columns spread
      tl.to(gridRef.current, { scale: 1.12, duration: 0.3 }, 0.35)
      tl.to(col1Ref.current, { x: -30, duration: 0.25 }, 0.4)
      tl.to(col3Ref.current, { x: 30, duration: 0.25 }, 0.4)

      // Phase 3: Grid dims, content reveals
      tl.to(gridRef.current, { opacity: 0.25, scale: 1.2, duration: 0.25 }, 0.7)
      tl.fromTo(contentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25 }, 0.7)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ height: '350vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
      }}>
        {/* 3-column grid */}
        <div
          ref={gridRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 8,
            padding: 8,
          }}
        >
          {/* Column 1 */}
          <div ref={col1Ref} style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: 0 }}>
            {col1.map((src, i) => (
              <div key={i} style={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="IBTU community" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(1.05) saturate(1.15)' }} />
              </div>
            ))}
          </div>
          {/* Column 2 */}
          <div ref={col2Ref} style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: 0 }}>
            {col2.map((src, i) => (
              <div key={i} style={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="IBTU community" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(1.05) saturate(1.15)' }} />
              </div>
            ))}
          </div>
          {/* Column 3 */}
          <div ref={col3Ref} style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: 0 }}>
            {col3.map((src, i) => (
              <div key={i} style={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="IBTU community" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(1.05) saturate(1.15)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Content overlay */}
        <div
          ref={contentRef}
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '0 clamp(32px, 5vw, 80px)',
            opacity: 0,
            maxWidth: '900px',
          }}
        >
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 12vw, 180px)',
            lineHeight: 0.88,
            textTransform: 'uppercase',
            color: '#FFC700',
            letterSpacing: '-0.03em',
            marginBottom: 'clamp(20px, 3vw, 40px)',
          }}>
            {headline}
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-lg)',
            color: '#FFF',
            lineHeight: 1.7,
            maxWidth: '640px',
            margin: '0 auto clamp(24px, 3vw, 40px)',
            fontWeight: 400,
          }}>
            {subheadline}
          </p>
          <a
            href={ctaHref}
            className="holo-glass"
            style={{
              display: 'inline-block',
              background: '#FFC700',
              color: '#000',
              padding: '16px 40px',
              borderRadius: '16px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  )
}
