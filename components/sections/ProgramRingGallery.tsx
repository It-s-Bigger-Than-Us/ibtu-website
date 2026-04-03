'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

/* ═══════════════════════════════════════
   PROGRAM GRADIENT CAROUSEL — per program
   Bigger cards filling the section. Iridescent bg.
   Almost still — very slow auto-drift so user
   knows to click and drag.
═══════════════════════════════════════ */

const CARD_W = 300
const CARD_H = 380
const GAP = 12

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
      velRef.current *= 0.97
      // Almost still — barely drifting so user knows it's interactive
      if (Math.abs(velRef.current) < 0.05) velRef.current = -0.08
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
        height: CARD_H + 40,
        perspective: '800px',
        cursor: dragging ? 'grabbing' : 'grab',
        touchAction: 'pan-y',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
        background: 'var(--holo-gradient)',
        backgroundSize: '600% 600%',
        animation: 'holo-shift 20s ease infinite',
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {[0, 1, 2].map((copy) =>
        images.map((src, i) => {
          const baseX = copy * TOTAL_W + i * ITEM_W
          const containerW = containerRef.current?.offsetWidth || 600
          const x = mod(baseX + offset, TOTAL_W * 3) - TOTAL_W
          const center = containerW / 2
          const distFromCenter = (x + CARD_W / 2) - center
          const norm = Math.max(-1, Math.min(1, distFromCenter / (center * 1.1)))
          const ry = -norm * 18
          const tz = (1 - Math.abs(norm)) * 50
          const scale = 0.88 + (1 - Math.abs(norm)) * 0.12

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
                className="gallery-photo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(1.05) saturate(1.15)',
                  pointerEvents: 'none',
                }}
              />
              <style>{`
                .gallery-photo { transition: filter 0.3s; }
                div:hover > .gallery-photo {
                  filter: brightness(1.12) saturate(1.25);
                }
                div:hover {
                  box-shadow:
                    0 0 15px 2px #FFF4B8,
                    0 0 30px 4px #D4F0F8,
                    0 0 45px 6px #D4F5E8 !important;
                }
              `}</style>
            </div>
          )
        })
      )}
    </div>
  )
}
