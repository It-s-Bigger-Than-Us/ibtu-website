'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════
   PILLAR TABS — "What We Do" with animated underline
   Yellow bg, black text. 3 tabs for 3 pillars.
   Animated line slides to active tab.
   Content swaps with fade transition.
   Sits above PillarCubes on sky background.
═══════════════════════════════════════ */

const PILLARS = [
  {
    label: 'Crisis & Disaster',
    content: 'When the Palisades and Eaton fires displaced thousands of families in January 2025, IBTU mobilized within 72 hours. Within 90 days we built a permanent Relief Resource Hub at Baldwin Hills Crenshaw Plaza — open five days a week, serving 324 active clients who return an average of 23 times each. Housing navigation, mental health counseling, dental care, food assistance, and immigration support — all under one roof, all free, all dignified.',
  },
  {
    label: 'School & Youth',
    content: 'Inside 34 school campuses across Los Angeles, IBTU runs Lunchtime Takeovers that transform cafeterias into spaces of belonging. We facilitate 8-week Parent Empowerment Workshops, host Staff Appreciation Days, and organize campus-wide Resource Fairs that bring 15+ partner organizations directly to families. In 2025 alone, 28,025 students were served — because when families face instability, students feel it first.',
  },
  {
    label: 'Community Health',
    content: 'Every month, IBTU distributes thousands of pounds of food to families across Los Angeles — 875,500 pounds since 2020. Our Coastal Care crews clean Venice Beach every second Saturday. The annual Back 2 School Festival has distributed 18,550 backpacks across 6 years. And our wellness programming with lululemon brings free yoga, health screenings, and dental care to the neighborhoods that need it most.',
  },
]

export default function PillarTabs() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 })

  // Measure active tab for underline position
  useEffect(() => {
    const tab = tabRefs.current[active]
    if (tab) {
      const parent = tab.parentElement
      if (parent) {
        const parentRect = parent.getBoundingClientRect()
        const tabRect = tab.getBoundingClientRect()
        setLineStyle({
          left: tabRect.left - parentRect.left,
          width: tabRect.width,
        })
      }
    }
  }, [active])

  return (
    <section style={{
      background: '#FFC700',
      padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)',
    }}>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', textAlign: 'center' }}>
        {/* Section label */}
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: '#000',
          display: 'block',
          marginBottom: 24,
        }}>
          (Our Impact Pillars)
        </span>

        {/* Tab buttons with animated underline */}
        <div style={{ position: 'relative', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(16px, 3vw, 40px)',
            borderBottom: '2px solid #000',
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

            {/* Animated underline */}
            <motion.div
              animate={{ left: lineStyle.left, width: lineStyle.width }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                position: 'absolute',
                bottom: -2,
                height: 3,
                background: '#000',
                borderRadius: 2,
              }}
            />
          </div>
        </div>

        {/* Tab content — fades on switch */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-md)',
            lineHeight: 1.8,
            color: '#000',
            maxWidth: '720px',
          margin: '0 auto',
            fontWeight: 500,
          }}>
            {PILLARS[active].content}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
