'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

interface Pillar {
  title: string
  tagline?: string
  description?: string
  stat: string
  image?: string
}

interface PillarCardsProps {
  pillars: Pillar[]
}

export default function PillarCards({ pillars }: PillarCardsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const rows = sectionRef.current.querySelectorAll('.pillar-row')
    gsap.fromTo(rows,
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0, duration: 0.9, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      }
    )

    const nums = sectionRef.current.querySelectorAll('.pillar-big-num')
    gsap.fromTo(nums,
      { opacity: 0, scale: 0.7 },
      {
        opacity: 1, scale: 1, duration: 0.7, stagger: 0.2, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      }
    )

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000',
        paddingTop: 'var(--section-pad)',
        paddingBottom: 'var(--section-pad)',
        paddingLeft: 'clamp(32px, 5vw, 80px)',
        paddingRight: 'clamp(32px, 5vw, 80px)',
      }}
    >
      <SectionLabel label="OUR PILLARS" count={pillars.length} color="gold" />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {pillars.map((pillar, i) => (
          <div
            key={i}
            className="pillar-row"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              display: 'grid',
              gridTemplateColumns: hoveredIndex === i && pillar.image ? 'clamp(60px, 8vw, 120px) 1fr 1fr' : 'clamp(60px, 8vw, 120px) 1fr auto',
              alignItems: 'center',
              gap: 'clamp(24px, 3vw, 48px)',
              padding: 'clamp(32px, 4vw, 56px) 0',
              borderBottom: '2px solid var(--gold)',
              cursor: 'pointer',
              opacity: 0,
              transition: 'grid-template-columns 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Big number */}
            <div
              className="pillar-big-num"
              style={{
                fontFamily: "'LOT', 'Bebas Neue', sans-serif",
                fontSize: 'clamp(36px, 6vw, 80px)',
                lineHeight: 1,
                color: 'var(--gold)',
                opacity: 0,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Title + description */}
            <div>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(24px, 4vw, 56px)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: hoveredIndex === i ? 'var(--gold)' : '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.3s',
                }}
              >
                {pillar.title}
              </h3>
              {(pillar.tagline || pillar.description) && (
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(14px, 1.2vw, 18px)',
                  color: '#fff',
                  marginTop: '12px',
                  lineHeight: 1.5,
                  maxWidth: '600px',
                  maxHeight: hoveredIndex === i ? '200px' : '0',
                  overflow: 'hidden',
                  opacity: hoveredIndex === i ? 1 : 0,
                  transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                }}>
                  {pillar.tagline || pillar.description}
                </p>
              )}
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(12px, 1vw, 16px)',
                fontWeight: 700,
                color: 'var(--gold)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginTop: '8px',
              }}>
                {pillar.stat}
              </div>
            </div>

            {/* Image — SEPARATE column, only shows on hover, NO text over it */}
            {hoveredIndex === i && pillar.image ? (
              <div style={{
                width: '100%',
                height: 'clamp(200px, 20vw, 300px)',
                borderRadius: '12px',
                overflow: 'hidden',
                opacity: 1,
                transition: 'opacity 0.4s ease',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pillar.image}
                  alt={`${pillar.title} — IBTU pillar`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'saturate(1.15)',
                  }}
                />
              </div>
            ) : (
              !pillar.image ? null : <div />
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .pillar-row {
            grid-template-columns: 60px 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
