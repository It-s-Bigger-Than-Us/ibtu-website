'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   PILLAR CUBES + STATS — blue sky bg
   Shrinking headline, 3D cubes, stat cards.
   Uses Next/Image for blue-sky.jpg optimization.
   Full pillar names. All 5 pillars.
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
    name: 'Crisis & Disaster Stabilization',
    images: [
      '/images/fire-relief/IMG_5909.jpg',
      '/images/fire-relief/IMG_9804.jpg',
      '/images/fire-relief/IMG_8047.jpg',
      '/images/additional/IMG_0339.jpg',
    ],
  },
  {
    name: 'School & Youth Stability',
    images: [
      '/images/school/IMG_5406.jpg',
      '/images/pillars/school-2.jpg',
      '/images/school/IMG_5382.jpg',
      '/images/school/IMG_6057.jpg',
    ],
  },
  {
    name: 'Community Health & Resource Access',
    images: [
      '/images/pillars/community-food-distribution.jpg',
      '/images/additional/IMG_0418.jpg',
      '/images/additional/IMG_5680.jpg',
      '/images/additional/IMG_5824.jpg',
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
      <div ref={sceneRef} className="pillar-cube-scene">
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
      // Headline: scale entrance on scroll
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { scale: 1.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
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
        {/* Iridescent backdrop behind cubes */}
        <div className="pillar-cubes-backdrop">
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
        </div>

        {/* Headline — "By the Numbers" between cubes and stats */}
        <div
          ref={headlineRef}
          className="gsap-reveal"
          style={{ margin: 'clamp(48px, 6vw, 80px) 0 clamp(40px, 5vw, 64px)' }}
        >
          <h2 className="pillar-headline">By the Numbers</h2>
        </div>

        {/* Stats grid — last in section */}
        {stats.length > 0 && (
          <div
            ref={statsGridRef}
            className="stats-grid"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-card gsap-reveal holo-glass"
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
          padding: clamp(32px, 4vw, 48px) clamp(32px, 5vw, 80px) clamp(60px, 8vw, 100px);
          overflow: visible;
          background: transparent;
        }

        .pillar-inner {
          position: relative;
          max-width: var(--content-max);
          margin: 0 auto;
        }

        .pillar-headline {
          font-family: var(--font-display);
          font-size: clamp(40px, 7vw, 110px);
          line-height: 0.92;
          text-transform: uppercase;
          color: var(--ibtu-gold);
          letter-spacing: -0.02em;
          text-align: center;
        }

        .pillar-cubes-backdrop {
          background-image: var(--holo-gradient);
          background-size: 600% 600%;
          animation: holo-shift 20s ease infinite;
          border-radius: 24px;
          padding: clamp(32px, 4vw, 56px) clamp(24px, 3vw, 48px);
        }

        .pillar-cubes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 3vw, 40px);
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
          width: 65%;
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
          padding: clamp(12px, 1.5vw, 20px);
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.4s ease;
          border-radius: 0 0 12px 12px;
        }
        .pillar-cube-label::after {
          content: '';
          position: absolute;
          inset: -0.5px;
          border-radius: 0 0 12px 12px;
          padding: 0.5px;
          background: var(--holo-gradient);
          background-size: 600% 600%;
          animation: holo-shift 20s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .pillar-cube-name {
          font-family: var(--font-body);
          font-size: clamp(12px, 1.2vw, 17px);
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          line-height: 1.3;
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
          transition: background 0.4s var(--ease-out-expo);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 140px;
        }
        .stat-card:hover {
          background: var(--ibtu-black);
        }
        .stat-card:hover .stat-num,
        .stat-card:hover .stat-label {
          color: var(--ibtu-gold);
        }

        .stat-num {
          font-family: var(--font-body);
          font-weight: 900;
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

        @media (max-width: 1024px) {
          .pillar-cubes-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .pillar-cubes-grid {
            grid-template-columns: 1fr 1fr;
            max-width: 480px;
            margin: 0 auto;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .pillar-cubes-grid {
            grid-template-columns: 1fr;
            max-width: 280px;
          }
        }
      `}</style>
    </section>
  )
}
