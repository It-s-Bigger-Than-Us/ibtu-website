'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'

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
  const gridRef = useRef<HTMLDivElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!gridRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 80%',
      once: true,
      onEnter() {
        stats.forEach((stat, i) => {
          const el = numRefs.current[i]
          if (!el) return
          const obj = { val: 0 }
          gsap.to(obj, {
            val: stat.target,
            duration: 2,
            ease: 'power2.out',
            onUpdate() {
              el.textContent =
                Math.floor(obj.val).toLocaleString() + (stat.suffix ?? '')
            },
          })
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [stats])

  return (
    <div className="stats-section" style={{ paddingTop: 'var(--section-pad)', paddingBottom: 'var(--section-pad)' }}>
      <div style={{ maxWidth: 'var(--max-w, 1440px)', margin: '0 auto', padding: '0 var(--page-pad, 2rem)' }}>
        <SectionLabel label="OUR IMPACT" color="black" />
      </div>
      <div className="stats-grid" ref={gridRef}>
        {stats.map((stat, i) => (
          <div className="stat-item" key={stat.label}>
            <span
              className="stat-num"
              ref={(el) => { numRefs.current[i] = el }}
            >
              0{stat.suffix ?? ''}
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
