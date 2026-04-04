'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   PILLAR TABS + CUBES + STATS
   Combined section on yellow bg.
   Hover: yellow → iridescent (like mission card).
   Tabs, 3D cubes, and stat counters all in one.
═══════════════════════════════════════ */

const PILLARS = [
  {
    label: 'Crisis & Disaster Stabilization',
    content: 'When the Palisades and Eaton fires displaced thousands of families in January 2025, IBTU mobilized within 72 hours. Within 90 days we built a permanent Relief Resource Hub at Baldwin Hills Crenshaw Plaza — open five days a week, serving 324 active clients who return an average of 23 times each. Housing navigation, mental health counseling, dental care, food assistance, and immigration support — all under one roof, all free, all dignified.',
    images: ['/images/pillars/crisis-1.jpg', '/images/pillars/crisis-2.jpg', '/images/pillars/crisis-1.jpg', '/images/pillars/crisis-2.jpg'],
  },
  {
    label: 'School & Youth Stability',
    content: 'Inside 34 school campuses across Los Angeles, IBTU runs Lunchtime Takeovers that transform cafeterias into spaces of belonging. We facilitate 8-week Parent Empowerment Workshops, host Staff Appreciation Days, and organize campus-wide Resource Fairs that bring 15+ partner organizations directly to families. In 2025 alone, 28,025 students were served — because when families face instability, students feel it first.',
    images: ['/images/pillars/school-1.jpg', '/images/pillars/school-2.jpg', '/images/pillars/school-1.jpg', '/images/pillars/school-2.jpg'],
  },
  {
    label: 'Community Health & Resource Access',
    content: 'Every month, IBTU distributes thousands of pounds of food to families across Los Angeles — 875,500 pounds since 2020. Our Coastal Care crews clean Venice Beach every second Saturday. The annual Back 2 School Festival has distributed 18,550 backpacks across 6 years. And our wellness programming with lululemon brings free yoga, health screenings, and dental care to neighborhoods across Los Angeles.',
    images: ['/images/pillars/community-1.jpg', '/images/pillars/community-2.jpg', '/images/pillars/community-1.jpg', '/images/pillars/community-2.jpg'],
  },
]

const FACES = ['front', 'right', 'back', 'left'] as const

function CubeCard({ pillar, isActive }: { pillar: typeof PILLARS[0]; isActive: boolean }) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [halfW, setHalfW] = useState(0)

  const measure = useCallback(() => {
    if (sceneRef.current) setHalfW(sceneRef.current.offsetWidth / 2)
  }, [])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (sceneRef.current) ro.observe(sceneRef.current)
    return () => ro.disconnect()
  }, [measure])

  const faceTransforms: Record<string, string> = {
    front: `rotateY(0deg) translateZ(${halfW}px)`,
    right: `rotateY(90deg) translateZ(${halfW}px)`,
    back: `rotateY(180deg) translateZ(${halfW}px)`,
    left: `rotateY(-90deg) translateZ(${halfW}px)`,
  }

  return (
    <div style={{ width: '65%', aspectRatio: '1', perspective: 1000, margin: '0 auto' }}>
      <div
        ref={sceneRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isActive ? 'rotateY(-90deg)' : 'rotateY(-18deg) rotateX(8deg)',
        }}
      >
        {FACES.map((face, fi) => (
          <div
            key={face}
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              borderRadius: 12,
              overflow: 'hidden',
              transform: faceTransforms[face],
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pillar.images[fi]}
              alt={pillar.label}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(1.15) brightness(1.05)' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

interface StatItem {
  value: number
  suffix?: string
  label: string
}

export default function PillarTabs({ stats = [] }: { stats?: StatItem[] }) {
  const [active, setActive] = useState(0)
  const [sectionHovered, setSectionHovered] = useState(false)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 })
  const statsGridRef = useRef<HTMLDivElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

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

  // Stat counter animation
  useEffect(() => {
    if (!statsGridRef.current || stats.length === 0) return
    const trigger = ScrollTrigger.create({
      trigger: statsGridRef.current,
      start: 'top 80%',
      once: true,
      onEnter() {
        stats.forEach((stat, i) => {
          const el = numRefs.current[i]
          if (!el) return
          const obj = { val: 0 }
          gsap.to(obj, {
            val: stat.value,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate() { el.textContent = Math.floor(obj.val).toLocaleString() + (stat.suffix ?? '') },
          })
        })
      },
    })
    return () => trigger.kill()
  }, [stats])

  return (
    <section
      onMouseEnter={() => setSectionHovered(true)}
      onMouseLeave={() => setSectionHovered(false)}
      style={{
        background: sectionHovered ? undefined : '#FFC700',
        backgroundImage: sectionHovered ? 'var(--holo-gradient)' : undefined,
        backgroundSize: sectionHovered ? '600% 600%' : undefined,
        animation: sectionHovered ? 'holo-shift 20s ease infinite' : undefined,
        padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)',
        transition: 'background 0.5s',
        cursor: 'pointer',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
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
          textAlign: 'center',
        }}>
          Our Impact Pillars
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
            <motion.div
              animate={{ left: lineStyle.left, width: lineStyle.width }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{ position: 'absolute', bottom: -2, height: 3, background: '#000', borderRadius: 2 }}
            />
          </div>
        </div>

        {/* Tab content + cube side by side */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px, 4vw, 64px)',
          alignItems: 'center',
          marginBottom: 'clamp(48px, 6vw, 80px)',
        }}>
          {/* Text */}
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
              fontWeight: 700,
            }}>
              {PILLARS[active].content}
            </p>
          </motion.div>

          {/* 3D Cube */}
          <CubeCard pillar={PILLARS[active]} isActive={true} />
        </div>

        {/* Stats grid */}
        {stats.length > 0 && (
          <div
            ref={statsGridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, 1fr)`,
              gap: 'var(--grid-gap)',
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="holo-glass"
                style={{
                  background: '#000',
                  borderRadius: 16,
                  padding: 'clamp(20px, 2.5vw, 40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 140,
                  transition: 'background 0.4s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FFC700'
                  const num = e.currentTarget.querySelector('.sn') as HTMLElement
                  const label = e.currentTarget.querySelector('.sl') as HTMLElement
                  if (num) num.style.color = '#000'
                  if (label) label.style.color = '#000'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#000'
                  const num = e.currentTarget.querySelector('.sn') as HTMLElement
                  const label = e.currentTarget.querySelector('.sl') as HTMLElement
                  if (num) num.style.color = '#FFC700'
                  if (label) label.style.color = '#FFC700'
                }}
              >
                <span
                  ref={el => { numRefs.current[i] = el }}
                  className="sn"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 900,
                    fontSize: 'clamp(36px, 5vw, 72px)',
                    lineHeight: 1,
                    color: '#FFC700',
                    transition: 'color 0.4s',
                  }}
                >
                  0{stat.suffix ?? ''}
                </span>
                <span
                  className="sl"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--body-sm)',
                    fontWeight: 700,
                    color: '#FFC700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginTop: 8,
                    transition: 'color 0.4s',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
