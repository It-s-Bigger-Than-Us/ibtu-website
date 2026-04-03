'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   CONSTELLATION GALLERY — parallax photo grid
   with cursor-driven depth + hover expand
   Reliable CSS-based, no WebGL dependency
═══════════════════════════════════════ */

interface GalleryItem {
  src: string
  title?: string
  program?: string
}

interface ConstellationGalleryProps {
  items: GalleryItem[]
  title?: string
}

export default function ConstellationGallery({
  items,
  title = 'EXPLORE OUR IMPACT',
}: ConstellationGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Cursor-driven parallax on the grid
  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current || !sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      gsap.to(gridRef.current, {
        rotateY: x * 3,
        rotateX: -y * 2,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    sectionRef.current.addEventListener('mousemove', handleMouseMove)
    const ref = sectionRef.current
    return () => ref.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll-triggered stagger entrance
  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.constellation-card')
    if (!cards.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, scale: 0.8, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, gridRef)

    return () => ctx.revert()
  }, [items])

  // Use up to 18 items
  const displayItems = items.slice(0, 18)

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--ibtu-black)',
        padding: 'var(--section-pad) clamp(32px, 5vw, 80px)',
        overflow: 'hidden',
        perspective: '1200px',
      }}
    >
      {/* Section label */}
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto 48px' }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(10px, 0.8vw, 12px)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: 'var(--ibtu-gold)',
        }}>
          {title}
        </span>
      </div>

      {/* Parallax grid */}
      <div
        ref={gridRef}
        style={{
          maxWidth: 'var(--content-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '12px',
          transformStyle: 'preserve-3d',
        }}
      >
        {displayItems.map((item, i) => {
          const isHovered = hoveredIndex === i
          const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i

          return (
            <div
              key={i}
              className="constellation-card"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                aspectRatio: i % 5 === 0 ? '3/4' : '4/3',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                opacity: 0,
                transform: isHovered
                  ? 'scale(1.05) translateZ(30px)'
                  : isOtherHovered
                    ? 'scale(0.97) translateZ(-10px)'
                    : 'translateZ(0)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s, box-shadow 0.4s',
                boxShadow: isHovered
                  ? '0 20px 60px #FFC700, 0 0 0 2px var(--ibtu-gold)'
                  : '0 4px 20px #000',
                filter: isOtherHovered ? 'brightness(0.6)' : 'brightness(1)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.title || item.program || `IBTU photo ${i + 1}`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'saturate(1.15)',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                }}
              />

              {/* Gold info bar on hover */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'var(--ibtu-gold)',
                padding: '10px 14px',
                transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--ibtu-black)',
                }}>
                  {item.title || item.program || ''}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Screen reader list */}
      <div className="sr-only" role="list" aria-label="Photo gallery">
        {items.map((item, i) => (
          <div key={i} role="listitem">
            {item.title || item.program || `Photo ${i + 1}`}
          </div>
        ))}
      </div>
    </section>
  )
}
