'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   PILLAR CUBES + STATS — blue sky bg
   Shrinking headline, 3D cubes, stat cards.
   All on a bright blue sky background.
═══════════════════════════════════════ */

interface PillarData {
  name: string
  images: string[]
}

interface StatItem {
  value: number
  suffix?: string
  label: string
}

const PILLARS: PillarData[] = [
  {
    name: 'Crisis & Disaster',
    images: [
      '/images/pillars/crisis-1.jpg',
      '/images/pillars/crisis-2.jpg',
      '/images/pillars/crisis-1.jpg',
      '/images/pillars/crisis-2.jpg',
    ],
  },
  {
    name: 'School & Youth',
    images: [
      '/images/pillars/school-1.jpg',
      '/images/pillars/school-2.jpg',
      '/images/pillars/school-1.jpg',
      '/images/pillars/school-2.jpg',
    ],
  },
  {
    name: 'Community Health',
    images: [
      '/images/pillars/community-1.jpg',
      '/images/pillars/community-2.jpg',
      '/images/pillars/community-1.jpg',
      '/images/pillars/community-2.jpg',
    ],
  },
]

const FACES = ['front', 'right', 'back', 'left'] as const

function CubeCard({ pillar, isHovered }: { pillar: PillarData; isHovered: boolean }) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [halfW, setHalfW] = useState(0)

  const measure = useCallback(() => {
    if (sceneRef.current) {
      setHalfW(sceneRef.current.offsetWidth / 2)
    }
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
    <div className="pillar-cube-container">
      <div ref={sceneRef} className="pillar-cube-scene iridescent-border">
        <div
          className="pillar-cube"
          style={{
            transform: isHovered
              ? 'rotateY(-90deg) rotateX(0deg)'
              : 'rotateY(-18deg) rotateX(8deg)',
          }}
        >
          {FACES.map((face, fi) => (
            <div
              key={face}
              className="pillar-cube-face"
              style={{ transform: faceTransforms[face] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pillar.images[fi]}
                alt={pillar.name}
                draggable={false}
              />
              <div
                className="pillar-cube-label"
                style={{
                  transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                  opacity: isHovered ? 1 : 0,
                }}
              >
                <span className="pillar-cube-name">{pillar.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface PillarCubesProps {
  stats?: StatItem[]
}

export default function PillarCubes({ stats = [] }: PillarCubesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const statsGridRef = useRef<HTMLDivElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Headline: shrinks from 3x into position on scroll (like ImpactReveal)
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { scale: 3, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        )
      }

      // Cubes stagger in
      const cubes = sectionRef.current?.querySelectorAll('.pillar-cube-container')
      if (cubes) {
        gsap.fromTo(
          cubes,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              once: true,
            },
          }
        )
      }

      // Stat counter animation on scroll
      if (statsGridRef.current && stats.length > 0) {
        ScrollTrigger.create({
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
                onUpdate() {
                  el.textContent = Math.floor(obj.val).toLocaleString() + (stat.suffix ?? '')
                },
              })
            })

            const statCards = statsGridRef.current?.querySelectorAll('.stat-card')
            if (statCards) {
              gsap.fromTo(statCards,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.4)' }
              )
            }
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [stats])

  return (
    <section ref={sectionRef} className="pillar-section">
      <div className="pillar-inner">
        {/* Headline — shrinks from giant on scroll */}
        <div
          ref={headlineRef}
          className="gsap-reveal"
          style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}
        >
          <h2 className="pillar-headline">Our Impact Pillars</h2>
        </div>

        {/* Cubes grid */}
        <div className="pillar-cubes-grid">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.name}
              className="pillar-cube-wrapper"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CubeCard pillar={pillar} isHovered={hoveredIndex === i} />
            </div>
          ))}
        </div>

        {/* Stats grid — animates in on scroll after cubes */}
        {stats.length > 0 && (
          <div
            ref={statsGridRef}
            className="stats-grid"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-card gsap-reveal holo-glass"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--ibtu-black)'
                  const num = e.currentTarget.querySelector('.stat-num') as HTMLElement
                  const label = e.currentTarget.querySelector('.stat-label') as HTMLElement
                  if (num) num.style.color = 'var(--ibtu-gold)'
                  if (label) label.style.color = 'var(--ibtu-gold)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--ibtu-gold)'
                  const num = e.currentTarget.querySelector('.stat-num') as HTMLElement
                  const label = e.currentTarget.querySelector('.stat-label') as HTMLElement
                  if (num) num.style.color = 'var(--ibtu-black)'
                  if (label) label.style.color = 'var(--ibtu-black)'
                }}
              >
                <span
                  ref={el => { numRefs.current[i] = el }}
                  className="stat-num"
                >
                  0{stat.suffix ?? ''}
                </span>
                <span className="stat-label">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .pillar-section {
          position: relative;
          padding: clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px);
          overflow: hidden;
          background: url('/images/blue-sky.jpg') center/cover no-repeat fixed;
        }

        .pillar-inner {
          position: relative;
          z-index: 1;
          max-width: var(--content-max);
          margin: 0 auto;
        }

        .pillar-headline {
          font-family: var(--font-display);
          font-size: var(--display-hero);
          line-height: 0.92;
          text-transform: uppercase;
          color: var(--ibtu-black);
          letter-spacing: -0.02em;
          text-align: center;
        }

        .pillar-cubes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(32px, 5vw, 64px);
        }

        .pillar-cube-wrapper {
          cursor: pointer;
        }

        .pillar-cube-container {
          opacity: 0; /* GSAP animates to 1 on scroll */
        }
        .pillar-cube-container.gsap-visible {
          opacity: 1;
        }

        .pillar-cube-wrapper {
          transition: transform 0.4s var(--ease-out-expo);
        }
        .pillar-cube-wrapper:hover {
          transform: translateY(-4px);
        }

        .pillar-cube-scene {
          width: 70%;
          aspect-ratio: 1 / 1;
          perspective: 1000px;
          margin: 0 auto;
        }

        .pillar-cube {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pillar-cube-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          border-radius: 12px;
          overflow: hidden;
        }

        .pillar-cube-face img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(1.15) brightness(1.05);
        }

        .pillar-cube-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: #FFC700;
          padding: clamp(14px, 2vw, 24px);
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.4s ease;
        }

        .pillar-cube-name {
          font-family: var(--font-body);
          font-size: clamp(12px, 1.3vw, 18px);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #000;
          display: block;
          text-align: center;
        }

        /* ── Stats grid — 3x2 ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--grid-gap);
          margin-top: clamp(48px, 6vw, 80px);
        }

        .stat-card {
          background: var(--ibtu-gold);
          border-radius: 16px;
          padding: clamp(20px, 2.5vw, 40px);
          cursor: pointer;
          transition: background 0.4s var(--ease-out-expo), color 0.4s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 140px;
        }

        .stat-num {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 72px);
          line-height: 1;
          color: var(--ibtu-black);
          transition: color 0.4s var(--ease-out-expo);
        }

        .stat-label {
          font-family: var(--font-body);
          font-size: var(--body-sm);
          font-weight: 600;
          color: var(--ibtu-black);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 8px;
          transition: color 0.4s var(--ease-out-expo);
        }

        @media (max-width: 768px) {
          .pillar-cubes-grid {
            grid-template-columns: 1fr;
            max-width: 320px;
            margin: 0 auto;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
