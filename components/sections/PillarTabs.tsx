'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════
   PILLAR TABS — headline + tabbed text
   LOT headline, single animated underline,
   text content only (no photos).
   Stats moved to PillarCubes.
═══════════════════════════════════════ */

const PILLARS = [
  {
    label: 'Crisis & Disaster Stabilization',
    content: 'IBTU\u2019s crisis response infrastructure was battle-tested in January 2025 when the Palisades and Eaton fires displaced thousands of families. Within hours, IBTU transformed from a community programming organization into a fully operational disaster hub \u2014 mobilizing 1,800+ volunteers, delivering 10,560 meals to first responders in 14 days, and opening a permanent Relief Resource Hub at Baldwin Hills Crenshaw Plaza that now serves 324 active clients with an average of 23.4 visits per person. We stay ready so we don\u2019t have to get ready.',
  },
  {
    label: 'School & Youth Stability',
    content: 'In 2025, IBTU served 28,025 students \u2014 more than all prior years combined \u2014 across 34 school sites spanning LAUSD, Alliance College-Ready Public Schools, and Inglewood USD. Programming includes Lunchtime Takeovers, 8-week parent empowerment workshops, staff appreciation and healing experiences, resource fairs, and the Community Creators youth media program. IBTU has invested $721,660 in school-based contracts across 17 LAUSD campuses over four years. The flagship Back 2 School Festival expanded to three locations in 2025, distributing 5,000+ backpacks and 100 laptops.',
  },
  {
    label: 'Community Health & Resource Access',
    content: 'Since 2020, IBTU has distributed 875,500+ pounds of food across 389+ events, serving 130,116+ families. The 2025 program included the MegaFeast Thanksgiving distribution in partnership with One Church & The United Megacares Foundation (1,000 turkey boxes), monthly Coastal Care beach cleanups, wellness activations with lululemon, and two community baby showers supporting Black maternal health. The 6th Annual Giving Season closed the year with 11 events across Los Angeles, connecting families to essential resources during the holidays.',
  },
]

export default function PillarTabs() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const tab = tabRefs.current[active]
    if (tab) {
      const parent = tab.parentElement
      if (parent) {
        const parentRect = parent.getBoundingClientRect()
        const tabRect = tab.getBoundingClientRect()
        setLineStyle({ left: tabRect.left - parentRect.left, width: tabRect.width })
      }
    }
  }, [active])

  return (
    <section
      style={{
        background: 'transparent',
        padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)',
        paddingBottom: 'clamp(32px, 4vw, 48px)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        {/* Section headline — LOT display font */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 7vw, 110px)',
          lineHeight: 0.92,
          textTransform: 'uppercase',
          color: '#000',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          marginBottom: 'clamp(32px, 4vw, 48px)',
        }}>
          Our Impact Pillars
        </h2>

        {/* Tab buttons with single animated underline */}
        <div style={{ position: 'relative', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(16px, 3vw, 40px)',
            paddingBottom: 12,
            position: 'relative',
          }}>
            {PILLARS.map((pillar, i) => (
              <button
                key={pillar.label}
                ref={(el) => { tabRefs.current[i] = el }}
                onClick={() => setActive(i)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(12px, 1.3vw, 16px)',
                  fontWeight: active === i ? 800 : 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  color: '#000',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 0',
                  transition: 'font-weight 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {pillar.label}
              </button>
            ))}
            <motion.div
              animate={{ left: lineStyle.left, width: lineStyle.width }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{ position: 'absolute', bottom: 0, height: 3, background: '#000', borderRadius: 2 }}
            />
          </div>
        </div>

        {/* Tab text content — centered */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 800, margin: '0 auto' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-md)',
            lineHeight: 1.8,
            color: '#000',
            fontWeight: 700,
            textAlign: 'center',
          }}>
            {PILLARS[active].content}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
