'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ═══════════════════════════════════════
   3D CAROUSEL GALLERY — tympanus-inspired
   Yellow bg. Cards orbit in 3D ring.
   Iridescent card edges. Auto-rotate + drag.
   Reliable: uses CSS transforms, no GSAP for loop.
═══════════════════════════════════════ */

const IMAGES = [
  '/images/b2s/_D5A7392.jpg', '/images/coastal/IMG_4838.jpg', '/images/gallery/IMG_1311.jpg',
  '/images/school/IMG_5608.jpg', '/images/wellness/IMG_9922.jpg', '/images/b2s/_D5A5912.jpg',
  '/images/coastal/IMG_0267.jpg', '/images/gallery/IMG_4353.jpg', '/images/school/IMG_4674.jpg',
  '/images/b2s/_D5A7155.jpg', '/images/coastal/IMG_1778.jpg', '/images/gallery/IMG_4649.jpg',
]

const CARD_W = 380
const CARD_H = 480

export default function GalleryCarousel3D() {
  const [angle, setAngle] = useState(0)
  const [dragging, setDragging] = useState(false)
  const lastXRef = useRef(0)
  const velRef = useRef(0)
  const angleRef = useRef(0)
  const rafRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const count = IMAGES.length
  const theta = 360 / count
  const radius = Math.round((CARD_W + 40) / (2 * Math.tan(Math.PI / count)))

  // Animation loop
  const tick = useCallback(() => {
    if (!dragging) {
      velRef.current *= 0.96
      if (Math.abs(velRef.current) < 0.02) velRef.current = -0.15 // auto-spin
      angleRef.current += velRef.current
      setAngle(angleRef.current)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [dragging])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  // Pointer handlers
  const onDown = (e: React.PointerEvent) => {
    setDragging(true)
    lastXRef.current = e.clientX
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const dx = e.clientX - lastXRef.current
    lastXRef.current = e.clientX
    angleRef.current += dx * 0.3
    velRef.current = dx * 0.3
    setAngle(angleRef.current)
  }
  const onUp = () => setDragging(false)

  return (
    <section
      style={{
        background: '#FFC700',
        padding: 'clamp(60px, 8vw, 120px) 0',
        overflow: 'hidden',
      }}
    >
      <div
        ref={containerRef}
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
            transition: dragging ? 'none' : undefined,
          }}
        >
          {IMAGES.map((src, i) => (
            <div
              key={src}
              style={{
                position: 'absolute',
                width: CARD_W,
                height: CARD_H,
                transform: `rotateY(${i * theta}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 8px 32px -8px #000',
              }}
            >
              {/* Iridescent border */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 16,
                  padding: 3,
                  background: 'var(--holo-gradient)',
                  backgroundSize: '400% 400%',
                  animation: 'holo-shift 24s ease infinite',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude' as never,
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />
              {/* Card content */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#FFC700',
                  padding: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="IBTU community photo"
                  draggable={false}
                  loading={i < 4 ? 'eager' : 'lazy'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 8,
                    filter: 'brightness(1.08) saturate(1.2)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
