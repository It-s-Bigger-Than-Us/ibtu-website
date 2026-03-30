'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  target: number
  suffix?: string
  label: string
}

interface StatsSectionProps {
  stats: Stat[]
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    // Counter animation on scroll
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter() {
        stats.forEach((stat, i) => {
          const el = numRefs.current[i]
          if (!el) return
          const obj = { val: 0 }
          gsap.to(obj, {
            val: stat.target,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate() {
              el.textContent =
                Math.floor(obj.val).toLocaleString() + (stat.suffix ?? '')
            },
          })
        })

        // Stagger card entrances
        const cards = sectionRef.current?.querySelectorAll('.stat-card')
        if (cards) {
          gsap.fromTo(cards,
            { opacity: 0, y: 48, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
          )
        }
      },
    })

    return () => { trigger.kill() }
  }, [stats])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000',
        padding: 'var(--section-pad) clamp(32px, 5vw, 80px)',
      }}
    >
      {/* Section label */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 48px' }}>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'clamp(10px, 0.8vw, 12px)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: 'var(--gold)',
        }}>
          (OUR IMPACT)({stats.length.toString().padStart(2, '0')})
        </span>
      </div>

      {/* Stats grid — gold cards with black type */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-card card-lift"
            style={{
              background: 'var(--gold)',
              borderRadius: '20px',
              padding: 'clamp(32px, 4vw, 56px)',
              opacity: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '200px',
            }}
          >
            <span
              ref={(el) => { numRefs.current[i] = el }}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 900,
                lineHeight: 1,
                color: '#000',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              0{stat.suffix ?? ''}
            </span>
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(12px, 1vw, 16px)',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#000',
                marginTop: '16px',
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
