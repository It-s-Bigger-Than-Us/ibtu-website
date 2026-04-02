'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

/* ═══════════════════════════════════════
   PROGRAM CARDS — 3D Gradient Carousel
   Inspired by tympanus.net/Tutorials/3DGradientCarousel
   Cards slide horizontally with 3D depth + rotation.
   Auto-drifts, drag to spin. Gold bg.
   Each card = program photo + iridescent name bar.
═══════════════════════════════════════ */

interface Program {
  slug: string
  title: string
  pillar: string
  heroImage: string
  description?: string
}

const CARD_W = 300
const CARD_H = 400

export default function ProgramCarousel3D({ programs }: { programs: Program[] }) {
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const lastXRef = useRef(0)
  const velRef = useRef(0)
  const offsetRef = useRef(0)
  const rafRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const count = programs.length
  const GAP = 24
  const TOTAL_W = (CARD_W + GAP) * count

  const tick = useCallback(() => {
    if (!dragging) {
      velRef.current *= 0.96
      if (Math.abs(velRef.current) < 0.3) velRef.current = -0.5
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

  // Mod helper for infinite loop
  const mod = (n: number, m: number) => ((n % m) + m) % m

  return (
    <section style={{ background: '#000', padding: 'clamp(60px, 8vw, 100px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 clamp(32px, 5vw, 80px) clamp(24px, 3vw, 40px)' }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: '#FFC700',
          display: 'block',
          marginBottom: 16,
        }}>
          (Our Programs)({count})
        </span>
      </div>

      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: CARD_H + 40,
          perspective: '1200px',
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
        <div style={{
          display: 'flex',
          gap: GAP,
          position: 'absolute',
          top: 0,
          height: '100%',
          alignItems: 'center',
          willChange: 'transform',
        }}>
          {/* Render 3x for infinite loop */}
          {[0, 1, 2].map((copy) =>
            programs.map((prog, i) => {
              const baseX = copy * TOTAL_W + i * (CARD_W + GAP)
              const x = mod(baseX + offset, TOTAL_W * 3) - TOTAL_W
              const vw = typeof window !== 'undefined' ? window.innerWidth : 1400
              const center = vw / 2
              const distFromCenter = (x + CARD_W / 2) - center
              const norm = Math.max(-1, Math.min(1, distFromCenter / (center * 1.2)))
              const ry = -norm * 18
              const tz = (1 - Math.abs(norm)) * 80
              const scale = 0.9 + (1 - Math.abs(norm)) * 0.1

              return (
                <Link
                  key={`${copy}-${prog.slug}`}
                  href={`/our-programs/${prog.slug}`}
                  style={{
                    position: 'absolute',
                    left: 0,
                    width: CARD_W,
                    height: CARD_H,
                    transform: `translate3d(${x}px, 0, ${tz}px) rotateY(${ry}deg) scale(${scale})`,
                    transformStyle: 'preserve-3d',
                    borderRadius: 16,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    boxShadow: '0 8px 32px -8px #000',
                    backfaceVisibility: 'hidden',
                    zIndex: Math.round(tz),
                  }}
                >
                  {/* Photo */}
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
                  {/* Iridescent name bar */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'var(--holo-gradient)',
                    backgroundSize: '600% 600%',
                    padding: 'clamp(12px, 1.5vw, 20px)',
                  }}>
                    <h3 style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: '#000',
                      letterSpacing: '1px',
                      margin: 0,
                    }}>
                      {prog.title}
                    </h3>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: '#000',
                    }}>
                      {prog.pillar}
                    </span>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
