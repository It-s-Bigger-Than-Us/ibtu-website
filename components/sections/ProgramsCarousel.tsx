'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   PROGRAMS 3D CAROUSEL — tympanus-inspired
   Yellow bg. "OUR PROGRAMS" shrinks + sticks.
   Cards orbit in 3D ring with iridescent name boxes.
   Hover reveals program info on the card.
═══════════════════════════════════════ */

interface ProgramCard {
  slug: string
  title: string
  pillar: string
  tagline: string
  cardStat: string
  scheduleType: string
  image: string | null
}

const CARD_W = 400
const CARD_H = 520
const FALLBACK_IMAGES: Record<string, string> = {
  'fire-relief': '/images/school/IMG_5382.jpg',
  'back-2-school': '/images/b2s/_D5A7392.jpg',
  'coastal-care': '/images/coastal/IMG_0024.jpg',
  'wellness': '/images/wellness/IMG_0279.jpg',
  'youth-programming': '/images/school/IMG_5608.jpg',
  'community-builder-linkups': '/images/gallery/IMG_4353.jpg',
  'community-health': '/images/gallery/IMG_1311.jpg',
  'giving-season': '/images/gallery/IMG_4649.jpg',
}

export default function ProgramsCarousel({ programs }: { programs: ProgramCard[] }) {
  const [angle, setAngle] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const lastXRef = useRef(0)
  const velRef = useRef(0)
  const angleRef = useRef(0)
  const rafRef = useRef<number>(0)

  const count = programs.length || 1
  const theta = 360 / count
  const radius = Math.round((CARD_W + 48) / (2 * Math.tan(Math.PI / count)))

  // Headline shrinks on scroll and sticks
  useEffect(() => {
    if (!headlineRef.current) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headlineRef.current,
        start: 'top top',
        end: '+=200',
        pin: true,
        scrub: true,
        onUpdate(self) {
          if (!headlineRef.current) return
          const scale = 1 - self.progress * 0.6
          const pad = 80 - self.progress * 56
          headlineRef.current.style.transform = `scale(${scale})`
          headlineRef.current.style.paddingTop = `${pad}px`
          headlineRef.current.style.paddingBottom = `${Math.max(16, 48 - self.progress * 32)}px`
        },
      })
    })
    return () => ctx.revert()
  }, [])

  // Carousel spin loop
  const tick = useCallback(() => {
    if (!dragging) {
      velRef.current *= 0.96
      if (Math.abs(velRef.current) < 0.02) velRef.current = -0.12
      angleRef.current += velRef.current
      setAngle(angleRef.current)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [dragging])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  const onDown = (e: React.PointerEvent) => {
    setDragging(true)
    lastXRef.current = e.clientX
  }
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const dx = e.clientX - lastXRef.current
    lastXRef.current = e.clientX
    angleRef.current += dx * 0.25
    velRef.current = dx * 0.25
    setAngle(angleRef.current)
  }
  const onUp = () => setDragging(false)

  return (
    <main style={{ background: '#FFC700', minHeight: '100vh' }}>
      {/* Headline — shrinks + sticks at top on scroll */}
      <div
        ref={headlineRef}
        style={{
          background: '#FFC700',
          paddingTop: '80px',
          paddingBottom: '48px',
          paddingLeft: 'clamp(32px, 5vw, 80px)',
          paddingRight: 'clamp(32px, 5vw, 80px)',
          transformOrigin: 'top left',
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(72px, 14vw, 240px)',
            lineHeight: 0.88,
            textTransform: 'uppercase',
            color: '#000',
            letterSpacing: '-0.03em',
          }}
        >
          Our Programs
        </h1>
      </div>

      {/* 3D Carousel */}
      <div
        style={{
          width: '100%',
          height: CARD_H + 80,
          perspective: '1200px',
          cursor: dragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 'clamp(60px, 8vw, 120px)',
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div
          style={{
            width: CARD_W,
            height: CARD_H,
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: `rotateY(${angle}deg)`,
          }}
        >
          {programs.map((prog, i) => {
            const imgSrc = prog.image || FALLBACK_IMAGES[prog.slug] || '/images/gallery/IMG_1311.jpg'
            const isHovered = hoveredIdx === i

            return (
              <Link
                key={prog.slug}
                href={`/our-programs/${prog.slug}`}
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: CARD_W,
                    height: CARD_H,
                    transform: `rotateY(${i * theta}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px -8px #000',
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  {/* Photo */}
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgSrc}
                      alt={`${prog.title} — IBTU program`}
                      draggable={false}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        filter: 'brightness(1.05) saturate(1.15)',
                      }}
                    />

                    {/* Program name — iridescent filled box */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: isHovered ? 0 : 0,
                        left: 0,
                        right: 0,
                        background: 'var(--holo-gradient)',
                        backgroundSize: '400% 400%',
                        animation: 'holo-shift 24s ease infinite',
                        padding: 'clamp(16px, 2vw, 24px)',
                        transition: 'max-height 0.5s var(--ease-out-expo)',
                        maxHeight: isHovered ? '300px' : '72px',
                        overflow: 'hidden',
                      }}
                    >
                      <h2 style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(16px, 1.8vw, 22px)',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: '#000',
                        lineHeight: 1.2,
                        margin: 0,
                      }}>
                        {prog.title}
                      </h2>

                      {/* Hover reveal: program info */}
                      <div style={{
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.3s 0.1s',
                        marginTop: 12,
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '10px',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          color: '#000',
                          display: 'block',
                          marginBottom: 8,
                        }}>
                          {prog.pillar}
                        </span>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          color: '#000',
                          lineHeight: 1.5,
                          fontWeight: 500,
                          margin: 0,
                        }}>
                          {prog.tagline}
                        </p>
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#000',
                          display: 'inline-block',
                          marginTop: 12,
                          borderBottom: '2px solid #000',
                          paddingBottom: 2,
                        }}>
                          Learn More →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
