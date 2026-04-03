'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

/* ═══════════════════════════════════════
   HERO GALLERY — 3D photo carousel
   Sits right after HeroReveal. Yellow bg.
   Photos of IBTU community in a 3D ring.
   Auto-spins slowly, drag to interact.
   This is what the logo zoom "reveals."
═══════════════════════════════════════ */

const IMAGES = [
  '/images/b2s/_D5A7392.jpg',
  '/images/coastal/IMG_4838.jpg',
  '/images/gallery/IMG_1311.jpg',
  '/images/school/IMG_5608.jpg',
  '/images/wellness/IMG_9922.jpg',
  '/images/b2s/_D5A5912.jpg',
  '/images/coastal/IMG_0267.jpg',
  '/images/gallery/IMG_4353.jpg',
  '/images/school/IMG_4674.jpg',
  '/images/b2s/_D5A7155.jpg',
  '/images/coastal/IMG_1778.jpg',
  '/images/wellness/IMG_0279.jpg',
]

const CARD_W = 300
const CARD_H = 400

export default function HeroGallery() {
  const [angle, setAngle] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const lastXRef = useRef(0)
  const velRef = useRef(0)
  const angleRef = useRef(0)
  const rafRef = useRef<number>(0)

  const count = IMAGES.length
  const theta = 360 / count
  const radius = Math.round((CARD_W + 28) / (2 * Math.tan(Math.PI / count)))

  const tick = useCallback(() => {
    if (!dragging) {
      velRef.current *= 0.97
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
    <section style={{
      background: '#FFC700',
      padding: 'clamp(48px, 6vw, 80px) 0',
      overflow: 'hidden',
    }}>
      <div
        style={{
          width: '100%',
          height: CARD_H + 60,
          perspective: '1200px',
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
          {IMAGES.map((src, i) => {
            const isHovered = hoveredIdx === i
            return (
              <div
                key={src}
                style={{
                  position: 'absolute',
                  width: CARD_W,
                  height: CARD_H,
                  transform: `rotateY(${i * theta}deg) translateZ(${radius}px)${isHovered ? ' scale(1.06)' : ''}`,
                  backfaceVisibility: 'hidden',
                  borderRadius: 12,
                  overflow: 'hidden',
                  transition: 'transform 0.4s var(--ease-out-expo), box-shadow 0.4s',
                  boxShadow: isHovered
                    ? '0 0 20px 3px #FFF4B8, 0 0 40px 6px #D4F0F8'
                    : '0 8px 32px -8px #000',
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="IBTU community"
                  draggable={false}
                  loading={i < 4 ? 'eager' : 'lazy'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'brightness(1.08) saturate(1.2)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
