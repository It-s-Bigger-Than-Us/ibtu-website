'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   PROGRAMS GRID — image top + gold fold-out
   Holographic border on hover
   Scroll entrance with slight rotate
═══════════════════════════════════════ */

interface Program {
  slug: string
  title: string
  pillar: string
  heroImage: string
  cardStat?: string
  description?: string
  hoverVideo?: string
}

interface ProgramsGridProps {
  programs: Program[]
}

export default function ProgramsGrid({ programs }: ProgramsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.program-card-v2')
    if (!cards?.length) return

    gsap.fromTo(cards,
      { y: 80, rotateZ: 2, opacity: 0 },
      {
        y: 0,
        rotateZ: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    )
  }, [programs])

  return (
    <section
      style={{
        background: 'var(--ibtu-black)',
        padding: 'var(--section-pad) clamp(32px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <SectionLabel label="OUR PROGRAMS" count={programs.length} color="gold" />

        <div
          className="programs-grid"
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--grid-gap)',
          }}
        >
          {programs.map((program, index) => (
            <Link
              key={program.slug}
              href={`/our-programs/${program.slug}`}
              className="program-card-v2 gsap-reveal"
              style={{
                textDecoration: 'none',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--ibtu-gold)',
                display: 'block',
                position: 'relative',
                transition: 'transform 0.35s var(--ease-out-expo), box-shadow 0.35s',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Holo border — fades in on hover */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'inherit',
                  padding: '2px',
                  background: 'var(--holo-gradient)',
                  backgroundSize: '400% 400%',
                  animation: 'holo-shift 6s ease infinite',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude' as never,
                  pointerEvents: 'none',
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: 'opacity 0.4s',
                  zIndex: 2,
                }}
              />

              {/* Image */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  width: '100%',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={program.heroImage}
                  alt={`${program.title} — IBTU program`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'saturate(1.15)',
                    transition: 'transform 0.6s var(--ease-out-expo)',
                    transform: hoveredIndex === index ? 'scale(1.04)' : 'scale(1)',
                  }}
                />
                {/* Video on hover */}
                {program.hoverVideo && (
                  <video
                    src={program.hoverVideo}
                    playsInline
                    muted
                    loop
                    preload="metadata"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: hoveredIndex === index ? 1 : 0,
                      transition: 'opacity 0.4s',
                    }}
                    ref={(el) => {
                      if (!el) return
                      if (hoveredIndex === index) {
                        el.play().catch(() => {})
                      } else {
                        el.pause()
                        el.currentTime = 0
                      }
                    }}
                  />
                )}
              </div>

              {/* Gold info block with fold-out */}
              <div
                style={{
                  background: 'var(--ibtu-gold)',
                  padding: 'clamp(16px, 2vw, 24px)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '9px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'var(--ibtu-black)',
                    fontWeight: 700,
                    display: 'block',
                    maxHeight: hoveredIndex === index ? '30px' : '0',
                    opacity: hoveredIndex === index ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s var(--ease-out-expo), opacity 0.3s',
                    marginBottom: hoveredIndex === index ? '4px' : '0',
                  }}
                >
                  {program.pillar}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(16px, 1.8vw, 24px)',
                    textTransform: 'uppercase',
                    color: 'var(--ibtu-black)',
                    lineHeight: 1.1,
                    display: 'block',
                  }}
                >
                  {program.title}
                </span>

                {/* Fold-out content on hover */}
                <div
                  style={{
                    maxHeight: hoveredIndex === index ? '200px' : '0',
                    overflow: 'hidden',
                    opacity: hoveredIndex === index ? 1 : 0,
                    transition: 'max-height 0.5s var(--ease-out-expo), opacity 0.4s',
                  }}
                >
                  {program.description && (
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--body-sm)',
                        color: 'var(--ibtu-black)',
                        lineHeight: 1.5,
                        marginTop: '8px',
                      }}
                    >
                      {program.description}
                    </p>
                  )}
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--ibtu-black)',
                      marginTop: '8px',
                      display: 'inline-block',
                    }}
                  >
                    Learn More →
                  </span>
                </div>
              </div>

              {/* Card lift on hover */}
              <style>{`
                .program-card-v2:hover {
                  transform: translateY(-8px) !important;
                  box-shadow: 0 24px 48px #000 !important;
                }
              `}</style>
            </Link>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .programs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .programs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
