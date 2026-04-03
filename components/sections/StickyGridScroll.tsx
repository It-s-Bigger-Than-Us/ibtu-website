'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   STICKY GRID SCROLL — codrops-inspired
   Simple approach: images visible in grid,
   text overlays on top, scroll-driven zoom.
   No complex column offset math.
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
  const gridRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      // Grid zooms in slowly
      tl.fromTo(gridRef.current, { scale: 1 }, { scale: 1.6, duration: 1 }, 0)

      // Grid dims as content appears
      tl.to(gridRef.current, { opacity: 0.2, duration: 0.4 }, 0.6)

      // Content fades in
      tl.fromTo(contentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, 0.6)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
      }}>
        {/* Photo grid — 3 columns, 4 rows, fills viewport */}
        <div
          ref={gridRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(4, 1fr)',
            gap: 6,
            padding: 6,
          }}
        >
          {images.slice(0, 12).map((src, i) => (
            <div key={i} style={{ borderRadius: 6, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="IBTU community"
                loading={i < 6 ? 'eager' : 'lazy'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(1.05) saturate(1.15)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Content overlay */}
        <div
          ref={contentRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 clamp(32px, 5vw, 80px)',
            opacity: 0,
          }}
        >
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 8vw, 120px)',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            color: '#FFC700',
            letterSpacing: '-0.03em',
            textAlign: 'center',
          }}>
            {headline}
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: '#FFF',
            lineHeight: 1.7,
            maxWidth: '540px',
            textAlign: 'center',
            marginTop: 'clamp(12px, 2vw, 24px)',
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
              padding: '14px 32px',
              borderRadius: '16px',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              marginTop: 'clamp(12px, 2vw, 24px)',
            }}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  )
}
