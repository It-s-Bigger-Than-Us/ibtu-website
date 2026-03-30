'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface MosaicItem {
  src: string
  alt: string
  type?: 'image' | 'video'
  span?: 'tall' | 'wide' | 'default'
}

interface MissionMosaicProps {
  items: MosaicItem[]
  headline?: string
  body?: string
}

export default function MissionMosaic({
  items,
  headline = 'Community is the infrastructure.',
  body = 'We listen, we build, we stay. Since 2020, IBTU has mobilized 62,475+ students, 300+ partners, and $4.5M in resources across Los Angeles — building systems rooted in dignity, access, and community-led design.',
}: MissionMosaicProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Headline word stagger on scroll
    const words = headlineRef.current?.querySelectorAll('.mission-word')
    if (words) {
      gsap.fromTo(
        words,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Grid tiles stagger in
    const tiles = gridRef.current?.querySelectorAll('.mosaic-tile')
    if (tiles) {
      gsap.fromTo(
        tiles,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  const headlineWords = headline.split(' ')

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad) 48px',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {/* Editorial label */}
      <div className="section-label slide-left" style={{ color: 'var(--gold)' }}>
        <span>(OUR MISSION)</span>
      </div>

      {/* Big animated headline */}
      <h2
        ref={headlineRef}
        className="editorial-headline"
        style={{ marginBottom: '32px', maxWidth: '900px' }}
      >
        {headlineWords.map((word, i) => (
          <span
            key={i}
            className="mission-word"
            style={{ display: 'inline-block', opacity: 0 }}
          >
            {word}{i < headlineWords.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </h2>

      {/* Body text */}
      <p className="editorial-body" style={{ marginBottom: '64px' }}>
        {body}
      </p>

      {/* Editorial mosaic grid */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: '200px',
          gap: '12px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {items.slice(0, 8).map((item, i) => {
          // Editorial grid layout — varied sizes
          const spans = [
            { col: 'span 5', row: 'span 2' }, // large left
            { col: 'span 4', row: 'span 1' }, // top right small
            { col: 'span 3', row: 'span 1' }, // top right small
            { col: 'span 7', row: 'span 1' }, // wide middle
            { col: 'span 3', row: 'span 2' }, // tall right
            { col: 'span 4', row: 'span 1' }, // bottom left
            { col: 'span 5', row: 'span 1' }, // bottom center
            { col: 'span 4', row: 'span 1' }, // bottom right
          ]
          const span = spans[i] || { col: 'span 4', row: 'span 1' }

          return (
            <div
              key={i}
              className="mosaic-tile gallery-card"
              style={{
                gridColumn: span.col,
                gridRow: span.row,
              }}
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.15)' }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Responsive override */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr 1fr !important;
            grid-auto-rows: 180px !important;
          }
          .mosaic-tile {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
          .mosaic-tile:first-child {
            grid-column: span 2 !important;
            grid-row: span 2 !important;
          }
        }
      `}</style>
    </section>
  )
}
