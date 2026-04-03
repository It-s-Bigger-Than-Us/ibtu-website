'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

/* ═══════════════════════════════════════
   PROGRAM GRADIENT CAROUSEL — per program
   Inspired by tympanus.net/Tutorials/3DGradientCarousel
   Cards slide horizontally with 3D depth + rotation.
   Auto-drifts, drag to spin. Fits in a column.
═══════════════════════════════════════ */

const CARD_W = 200
const CARD_H = 260
const GAP = 16

export default function ProgramRingGallery({ images, title }: { images: string[]; title: string }) {
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const lastXRef = useRef(0)
  const velRef = useRef(0)
  const offsetRef = useRef(0)
  const rafRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const count = images.length
  const ITEM_W = CARD_W + GAP
  const TOTAL_W = ITEM_W * count

  const mod = (n: number, m: number) => ((n % m) + m) % m

  const tick = useCallback(() => {
    if (!dragging) {
      velRef.current *= 0.96
      if (Math.abs(velRef.current) < 0.3) velRef.current = -0.4
      offsetRef.current += velRef.current
      setOffset(offsetRef.current)
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
    offsetRef.current += dx
    velRef.current = dx
    setOffset(offsetRef.current)
  }
  const onUp = () => setDragging(false)

  if (images.length === 0) return null

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: CARD_H + 20,
        perspective: '800px',
        cursor: dragging ? 'grabbing' : 'grab',
        touchAction: 'pan-y',
        position: 'relative',
        overflow: 'hidden',
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {/* Render 3 copies for infinite loop */}
      {[0, 1, 2].map((copy) =>
        images.map((src, i) => {
          const baseX = copy * TOTAL_W + i * ITEM_W
          const containerW = containerRef.current?.offsetWidth || 600
          const x = mod(baseX + offset, TOTAL_W * 3) - TOTAL_W
          const center = containerW / 2
          const distFromCenter = (x + CARD_W / 2) - center
          const norm = Math.max(-1, Math.min(1, distFromCenter / (center * 1.1)))
          const ry = -norm * 20
          const tz = (1 - Math.abs(norm)) * 60
          const scale = 0.85 + (1 - Math.abs(norm)) * 0.15

          return (
            <div
              key={`${copy}-${i}`}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                width: CARD_W,
                height: CARD_H,
                transform: `translate3d(${x}px, -50%, ${tz}px) rotateY(${ry}deg) scale(${scale})`,
                transformStyle: 'preserve-3d',
                borderRadius: 12,
                overflow: 'hidden',
                backfaceVisibility: 'hidden',
                boxShadow: '0 4px 20px -4px #000',
                zIndex: Math.round(tz),
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
          )
        })
      )}
    </div>
  )
}
