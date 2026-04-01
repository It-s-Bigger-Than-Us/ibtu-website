'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HoloBg = dynamic(() => import('@/components/3d/HoloBg'), { ssr: false })

/* ═══════════════════════════════════════
   PILLAR CUBES — 3D hover-rotating cubes
   Square cubes, slightly angled at rest.
   Hover: rotate to next face + gold label
   slides up from bottom.
   Holographic animated gradient background.
═══════════════════════════════════════ */

interface PillarData {
  name: string
  images: string[]
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

              {/* Gold label — slides up on hover */}
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

      {/* Pillar name below cube — always visible */}
      <div className="pillar-cube-title">
        {pillar.name}
      </div>
    </div>
  )
}

export default function PillarCubes() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return

    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll('.pillar-head-word')
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }

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
              start: 'top 65%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineWords = ['Our', 'Impact', 'Pillars']

  return (
    <section ref={sectionRef} className="pillar-section">
      {/* Animated holographic background — Three.js WebGL */}
      <HoloBg />

      <div className="pillar-inner">
        {/* Headline */}
        <h2 ref={headlineRef} className="pillar-headline">
          {headlineWords.map((word, i) => (
            <span key={i} className="pillar-head-word">
              {word}
            </span>
          ))}
        </h2>

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
      </div>

      <style>{`
        .pillar-section {
          position: relative;
          padding: clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px);
          overflow: hidden;
          min-height: auto;
        }

        .pillar-inner {
          position: relative;
          z-index: 1;
          max-width: var(--content-max);
          margin: 0 auto;
        }

        /* ── Headline ── */
        .pillar-headline {
          font-family: var(--font-display);
          font-size: clamp(48px, 8vw, 120px);
          line-height: 0.92;
          text-transform: uppercase;
          color: var(--ibtu-white);
          letter-spacing: -0.02em;
          margin-bottom: clamp(32px, 4vw, 56px);
          display: flex;
          flex-wrap: wrap;
          gap: 0 0.25em;
        }

        .pillar-head-word {
          display: inline-block;
          opacity: 0;
        }

        /* ── Grid ── */
        .pillar-cubes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(32px, 5vw, 64px);
        }

        .pillar-cube-wrapper {
          cursor: pointer;
        }

        .pillar-cube-container {
          opacity: 0;
        }

        /* ── Cube scene ── */
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

        /* ── Gold label overlay — slides up from bottom on hover ── */
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

        /* ── Static label below cube ── */
        .pillar-cube-title {
          font-family: var(--font-body);
          font-size: clamp(10px, 1vw, 14px);
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ibtu-gold);
          text-align: center;
          margin-top: clamp(12px, 1.5vw, 20px);
        }

        @media (max-width: 768px) {
          .pillar-cubes-grid {
            grid-template-columns: 1fr;
            max-width: 320px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
