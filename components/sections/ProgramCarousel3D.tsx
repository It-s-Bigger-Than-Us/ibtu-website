'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

/* ═══════════════════════════════════════
   PROGRAM CARDS — 3D Ring Carousel
   Cards arranged in a 3D ring (rotateY + translateZ).
   Click-and-drag to spin. Hover grows card.
   Iridescent section bg. Yellow cards with glow.
═══════════════════════════════════════ */

interface Program {
  slug: string
  title: string
  pillar: string
  heroImage: string
  description?: string
}

const CARD_W = 240
const CARD_H = 320

export default function ProgramCarousel3D({ programs }: { programs: Program[] }) {
  const [angle, setAngle] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const lastXRef = useRef(0)
  const velRef = useRef(0)
  const angleRef = useRef(0)
  const rafRef = useRef<number>(0)

  const count = programs.length || 1
  const theta = 360 / count
  const radius = Math.round((CARD_W + 32) / (2 * Math.tan(Math.PI / count)))

  const tick = useCallback(() => {
    if (!dragging) {
      velRef.current *= 0.97
      if (Math.abs(velRef.current) < 0.02) velRef.current = -0.08
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
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
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
    <section style={{
      background: 'var(--holo-gradient)',
      backgroundSize: '600% 600%',
      animation: 'holo-shift 20s ease infinite',
      padding: 'clamp(60px, 8vw, 100px) 0',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 clamp(32px, 5vw, 80px) clamp(24px, 3vw, 40px)' }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: '#000',
          display: 'block',
          marginBottom: 16,
        }}>
          (Our Programs)({count})
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: CARD_H + 60,
          perspective: '1000px',
          cursor: dragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            const isHovered = hoveredIdx === i
            return (
              <Link
                key={prog.slug}
                href={`/our-programs/${prog.slug}`}
                style={{
                  position: 'absolute',
                  width: CARD_W,
                  height: CARD_H,
                  transform: `rotateY(${i * theta}deg) translateZ(${radius}px) scale(${isHovered ? 1.12 : 1})`,
                  backfaceVisibility: 'hidden',
                  borderRadius: 16,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  background: '#FFC700',
                  transition: 'transform 0.4s var(--ease-out-expo), box-shadow 0.4s',
                  boxShadow: isHovered
                    ? '0 0 15px 2px #FFF4B8, 0 0 30px 4px #D4F0F8, 0 0 45px 6px #D4F5E8'
                    : '0 8px 32px -8px #000',
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prog.heroImage || '/images/gallery/IMG_1311.jpg'}
                  alt={`${prog.title} — IBTU`}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'brightness(1.05) saturate(1.15)',
                    pointerEvents: 'none',
                  }}
                />
                {/* Name bar */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: '#FFC700',
                  padding: 'clamp(10px, 1.2vw, 16px)',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#000',
                    letterSpacing: '1px',
                    margin: 0,
                    lineHeight: 1.3,
                  }}>
                    {prog.title}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
