'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

/* ═══════════════════════════════════════
   PILLAR CUBES — 3D rotating cubes, one per pillar
   Hover to rotate. Each face: photo top, gold band bottom.
   Gold band stays fixed — only photo changes per face.
═══════════════════════════════════════ */

interface PillarData {
  name: string
  stat: string
  statLabel: string
  images: string[]
}

const PILLARS: PillarData[] = [
  {
    name: 'Crisis & Disaster',
    stat: '5,000+',
    statLabel: 'Families Stabilized',
    images: [
      '/images/pillars/crisis-1.jpg',
      '/images/pillars/crisis-2.jpg',
      '/images/pillars/crisis-1.jpg',
      '/images/pillars/crisis-2.jpg',
    ],
  },
  {
    name: 'School & Youth',
    stat: '62,475+',
    statLabel: 'Students Served',
    images: [
      '/images/pillars/school-1.jpg',
      '/images/pillars/school-2.jpg',
      '/images/pillars/school-1.jpg',
      '/images/pillars/school-2.jpg',
    ],
  },
  {
    name: 'Community Health',
    stat: '875,500+',
    statLabel: 'Lbs Food Distributed',
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
    <div ref={sceneRef} className="pillar-cube-scene">
      <div
        className="pillar-cube"
        style={{
          transform: isHovered ? 'rotateY(-90deg)' : 'rotateY(0deg)',
        }}
      >
        {FACES.map((face, fi) => (
          <div
            key={face}
            className="pillar-cube-face"
            style={{ transform: faceTransforms[face] }}
          >
            {/* Photo — top portion */}
            <div className="pillar-cube-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pillar.images[fi]}
                alt={`${pillar.name}`}
                draggable={false}
              />
            </div>

            {/* Gold info band — bottom portion */}
            <div className="pillar-cube-info">
              <span className="pillar-cube-name">{pillar.name}</span>
              <span className="pillar-cube-stat">{pillar.stat}</span>
              <span className="pillar-cube-label">{pillar.statLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PillarCubes() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      style={{
        background: 'var(--ibtu-black)',
        padding: 'var(--section-pad) clamp(32px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
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
        .pillar-cubes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--grid-gap);
        }

        .pillar-cube-wrapper {
          cursor: pointer;
        }

        .pillar-cube-scene {
          width: 100%;
          aspect-ratio: 3 / 4;
          perspective: 1200px;
        }

        .pillar-cube {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pillar-cube-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
          background: #000;
        }

        /* Photo area — top 60% */
        .pillar-cube-photo {
          flex: 0 0 60%;
          overflow: hidden;
        }
        .pillar-cube-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(1.15) brightness(1.05);
        }

        /* Gold info band — bottom 40% */
        .pillar-cube-info {
          flex: 0 0 40%;
          background: #FFC700;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(16px, 2vw, 28px);
        }

        .pillar-cube-name {
          font-family: var(--font-body);
          font-size: clamp(10px, 1.1vw, 14px);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #000;
          margin-bottom: 6px;
        }

        .pillar-cube-stat {
          font-family: var(--font-display);
          font-size: clamp(32px, 4.5vw, 56px);
          line-height: 1;
          color: #000;
          margin-bottom: 4px;
        }

        .pillar-cube-label {
          font-family: var(--font-body);
          font-size: clamp(9px, 0.85vw, 12px);
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #000;
        }

        @media (max-width: 768px) {
          .pillar-cubes-grid {
            grid-template-columns: 1fr;
            max-width: 360px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
