'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   STICKY GRID SCROLL — codrops-inspired
   3-column grid of 12 images. Sticky wrapper.
   Columns slide in from alternating directions,
   grid expands, then text + CTA reveal.
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
  const wrapperRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLUListElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !wrapperRef.current || !gridRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      const items = gridRef.current!.querySelectorAll('.grid-item')
      const col1 = Array.from(items).filter((_, i) => i % 3 === 0)
      const col2 = Array.from(items).filter((_, i) => i % 3 === 1)
      const col3 = Array.from(items).filter((_, i) => i % 3 === 2)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      // Phase 1 (0-40%): Columns slide in from alternating directions
      tl.fromTo(col1, { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.3 }, 0)
      tl.fromTo(col2, { yPercent: -80, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.3 }, 0.05)
      tl.fromTo(col3, { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.3 }, 0.1)

      // Phase 2 (40-75%): Grid zooms in, columns spread apart
      tl.to(gridRef.current, { scale: 1.15, duration: 0.3 }, 0.4)
      tl.to(col1, { x: -40, duration: 0.3 }, 0.4)
      tl.to(col3, { x: 40, duration: 0.3 }, 0.4)
      tl.to(col2, { yPercent: -8, duration: 0.25 }, 0.45)

      // Phase 3 (75-100%): Grid fades slightly, content reveals
      tl.to(gridRef.current, { opacity: 0.3, scale: 1.25, duration: 0.25 }, 0.75)
      tl.fromTo(contentRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.25 },
        0.75
      )
    })

    return () => ctx.revert()
  }, [])

  // Split images into 3 columns (4 per column)
  const col1Images = images.filter((_, i) => i % 3 === 0)
  const col2Images = images.filter((_, i) => i % 3 === 1)
  const col3Images = images.filter((_, i) => i % 3 === 2)
  const columns = [col1Images, col2Images, col3Images]

  return (
    <section
      ref={sectionRef}
      style={{ height: '400vh', position: 'relative' }}
    >
      <div
        ref={wrapperRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
        }}
      >
        {/* Grid */}
        <ul
          ref={gridRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            padding: '12px',
            listStyle: 'none',
            margin: 0,
          }}
        >
          {columns.map((col, colIdx) => (
            col.map((src, rowIdx) => (
              <li
                key={`${colIdx}-${rowIdx}`}
                className="grid-item"
                style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  opacity: 0,
                  gridColumn: colIdx + 1,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="IBTU community"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'brightness(1.05) saturate(1.15)',
                  }}
                />
              </li>
            ))
          ))}
        </ul>

        {/* Content overlay — reveals after grid animation */}
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
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 12vw, 180px)',
              lineHeight: 0.88,
              textTransform: 'uppercase',
              color: '#FFC700',
              letterSpacing: '-0.03em',
              marginBottom: 'clamp(20px, 3vw, 40px)',
            }}
          >
            {headline}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-lg)',
              color: '#FFF',
              lineHeight: 1.7,
              maxWidth: '640px',
              margin: '0 auto clamp(24px, 3vw, 40px)',
              fontWeight: 400,
            }}
          >
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
