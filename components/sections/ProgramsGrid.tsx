'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

interface Program {
  slug: string
  title: string
  pillar: string
  heroImage: string
  cardStat?: string
  description?: string
}

interface ProgramsGridProps {
  programs: Program[]
}

export default function ProgramsGrid({ programs }: ProgramsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.program-card')
    if (!cards?.length) return

    gsap.from(cards, {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 75%',
        once: true,
      },
    })
  }, [programs])

  return (
    <div
      style={{
        background: '#000',
        paddingTop: 'var(--section-pad)',
        paddingBottom: 'var(--section-pad)',
        paddingLeft: 'clamp(32px, 5vw, 80px)',
        paddingRight: 'clamp(32px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionLabel label="OUR PROGRAMS" count={programs.length} color="gold" />

        <div className="programs-grid" ref={gridRef}>
          {programs.map((program) => (
            <Link
              key={program.slug}
              href={`/our-programs/${program.slug}`}
              className="program-card fold-trigger card-lift"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={program.heroImage} alt={program.title} />

              <div className="program-card-overlay">
                <span className="program-card-tag">{program.pillar}</span>
                <span className="program-card-name">{program.title}</span>
                {program.cardStat && (
                  <span className="program-card-stat">{program.cardStat}</span>
                )}
                {/* Fold-out description on hover */}
                {program.description && (
                  <div className="fold-content" style={{
                    marginTop: '8px',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    color: '#fff',
                  }}>
                    {program.description}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
