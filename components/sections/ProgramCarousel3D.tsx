'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

/* ════════════���══════════════════════════
   PROGRAM CARDS — 3D Gradient Carousel
   Horizontal line — center card is largest + front.
   Cards recede with rotateY + translateZ + scale.
   Click-drag to spin. Hover auto-scrolls FAST.
   Iridescent section bg.

   FIXES:
   - Faster hover velocity (-4.0 vs -2.0)
   - IntersectionObserver to pause RAF when off-screen
   - Crisper velocity decay (0.92 vs 0.95)
══════════���════════════════════════════ */

interface Program {
  slug: string
  title: string
  pillar: string
  heroImage: string
  description?: string
}

const CARD_W = 340
const CARD_H = 440
const GAP = 20

export default function ProgramCarousel3D({ programs }: { programs: Program[] }) {
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [containerW, setContainerW] = useState(1200)
  const [isVisible, setIsVisible] = useState(false)
  const lastXRef = useRef(0)
  const velRef = useRef(0)
  const offsetRef = useRef(0)
  const rafRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const count = programs.length
  const ITEM_W = CARD_W + GAP
  const TOTAL_W = ITEM_W * count

  const mod = (n: number, m: number) => ((n % m) + m) % m

  // Measure container
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerW(containerRef.current.offsetWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // IntersectionObserver — only animate when visible
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Animation loop — ONLY runs when visible, faster on hover
  const tick = useCallback(() => {
    if (!isVisible) {
      rafRef.current = requestAnimationFrame(tick)
      return
    }
    if (!dragging) {
      velRef.current *= 0.92 // Crisper decay
      // Fast hover velocity for premium feel
      if (hovered && Math.abs(velRef.current) < 0.3) velRef.current = -6.0
      if (!hovered && Math.abs(velRef.current) < 0.05) velRef.current = 0
      offsetRef.current += velRef.current
      setOffset(offsetRef.current)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [dragging, hovered, isVisible])

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
    offsetRef.current += dx
    velRef.current = dx
    setOffset(offsetRef.current)
  }
  const onUp = () => setDragging(false)

  const center = containerW / 2

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--holo-gradient)',
        backgroundSize: '600% 600%',
        animation: 'holo-shift 20s ease infinite',
        padding: 'clamp(60px, 8vw, 100px) 0',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 clamp(32px, 5vw, 80px) clamp(24px, 3vw, 40px)' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 7vw, 110px)',
          lineHeight: 0.92,
          textTransform: 'uppercase',
          color: '#000',
          letterSpacing: '-0.02em',
          display: 'block',
          marginBottom: 'clamp(24px, 3vw, 40px)',
          textAlign: 'center',
        }}>
          Our Programs
        </h2>
      </div>

      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: CARD_H + 60,
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* 3 copies for infinite wrap */}
        {[0, 1, 2].map((copy) =>
          programs.map((prog, i) => {
            const baseX = copy * TOTAL_W + i * ITEM_W
            const x = mod(baseX + offset, TOTAL_W * 3) - TOTAL_W
            const distFromCenter = (x + CARD_W / 2) - center
            const norm = Math.max(-1, Math.min(1, distFromCenter / (center * 1.1)))
            const absNorm = Math.abs(norm)
            const ry = -norm * 22
            const tz = (1 - absNorm) * 100
            const s = 0.82 + (1 - absNorm) * 0.18
            const isCardHovered = hoveredIdx === i && copy === 1
            const finalScale = isCardHovered ? s * 1.08 : s
            const blur = absNorm > 0.7 ? (absNorm - 0.7) * 5 : 0

            return (
              <Link
                key={`${copy}-${prog.slug}`}
                href={`/our-programs/${prog.slug}`}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  width: CARD_W,
                  height: CARD_H,
                  transform: `translate3d(${x}px, -50%, ${tz}px) rotateY(${ry}deg) scale(${finalScale})`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  borderRadius: 16,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  background: '#FFC700',
                  zIndex: Math.round(tz),
                  transition: 'box-shadow 0.3s, filter 0.2s',
                  boxShadow: isCardHovered
                    ? '0 0 20px 3px rgba(255,244,184,0.15), 0 0 40px 6px rgba(212,240,248,0.15), 0 0 60px 8px rgba(212,245,232,0.15)'
                    : '0 12px 40px -10px rgba(0,0,0,0.15)',
                  filter: blur > 0.2 ? `blur(${blur}px)` : 'none',
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prog.heroImage || '/images/gallery/IMG_1790.jpg'}
                  alt={`${prog.title} — IBTU`}
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
                {/* Name bar */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: isCardHovered ? undefined : '#FFC700',
                  backgroundImage: isCardHovered ? 'var(--holo-gradient)' : undefined,
                  backgroundSize: isCardHovered ? '600% 600%' : undefined,
                  animation: isCardHovered ? 'holo-shift 20s ease infinite' : undefined,
                  padding: 'clamp(12px, 1.5vw, 18px)',
                  transition: 'background 0.3s',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(13px, 1.2vw, 16px)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#000',
                    letterSpacing: '1px',
                    margin: 0,
                    lineHeight: 1.3,
                    whiteSpace: 'normal',
                  }}>
                    {prog.title}
                  </h3>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </section>
  )
}
