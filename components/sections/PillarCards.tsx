'use client'

import { useEffect, useRef } from 'react'
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
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.pillar-card')

    gsap.set(cards, { y: 60, opacity: 0 })

    gsap.to(cards, {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 75%',
        once: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      style={{
        background: '#000',
        paddingTop: 'var(--section-pad)',
        paddingBottom: 'var(--section-pad)',
        paddingLeft: 'clamp(32px, 5vw, 80px)',
        paddingRight: 'clamp(32px, 5vw, 80px)',
      }}
    >
      <SectionLabel label="OUR PILLARS" count={pillars.length} color="gold" />

      <div className="pillars-grid" ref={gridRef}>
        {pillars.map((pillar, i) => (
          <div className="pillar-card" key={i}>
            <span className="pillar-num">
              {String(i + 1).padStart(2, '0')}/
            </span>
            <h3 className="pillar-title">{pillar.title}</h3>
            {(pillar.tagline || pillar.description) && (
              <p className="pillar-desc">
                {pillar.tagline || pillar.description}
              </p>
            )}
            <span className="pillar-stat">{pillar.stat}</span>
            {pillar.image && (
              <img
                className="pillar-image"
                src={pillar.image}
                alt={pillar.title}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
