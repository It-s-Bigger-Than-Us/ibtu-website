'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

/* ═══════════════════════════════════════
   PROGRAM RING GALLERY — 3D Carousel
   Inspired by tympanus.net/Development/3DCarousel
   Images arranged in a rotating 3D ring.
   Auto-rotates, drag to spin.
   One per program on the /our-programs page.
═══════════════════════════════════════ */

const CARD_W = 240
const CARD_H = 320

export default function ProgramRingGallery({ images, title }: { images: string[]; title: string }) {
  const [angle, setAngle] = useState(0)
  const [dragging, setDragging] = useState(false)
  const lastXRef = useRef(0)
  const velRef = useRef(0)
  const angleRef = useRef(0)
  const rafRef = useRef<number>(0)

  const count = images.length || 1
  const theta = 360 / count
  const radius = Math.round((CARD_W + 20) / (2 * Math.tan(Math.PI / count)))

  const tick = useCallback(() => {
    if (!dragging) {
      velRef.current *= 0.96
      if (Math.abs(velRef.current) < 0.02) velRef.current = -0.2
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
    angleRef.current += dx * 0.3
    velRef.current = dx * 0.3
    setAngle(angleRef.current)
  }
  const onUp = () => setDragging(false)

  if (images.length === 0) return null

  return (
    <div
      style={{
        width: '100%',
        height: CARD_H + 40,
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
        {images.map((src, i) => (
          <div
            key={src}
            style={{
              position: 'absolute',
              width: CARD_W,
              height: CARD_H,
              transform: `rotateY(${i * theta}deg) translateZ(${radius}px)`,
              backfaceVisibility: 'hidden',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 4px 20px -4px #000',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} photo ${i + 1}`}
              draggable={false}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(1.05) saturate(1.15)',
                pointerEvents: 'none',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
