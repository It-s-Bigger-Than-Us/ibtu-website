'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface GalleryItem {
  src: string
  title: string
  program?: string
  programSlug?: string
}

interface OrbitalGalleryProps {
  items: GalleryItem[]
  title?: string
}

export default function OrbitalGallery({ items, title }: OrbitalGalleryProps) {
  const [rotationY, setRotationY] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const rotationStart = useRef(0)
  const autoRotateRef = useRef(0)

  // Split items into two rings
  const half = Math.ceil(items.length / 2)
  const ring1Items = items.slice(0, half)
  const ring2Items = items.slice(half)

  const ring1Angle = 360 / Math.max(ring1Items.length, 1)
  const ring2Angle = 360 / Math.max(ring2Items.length, 1)
  const ring1Radius = 280
  const ring2Radius = 180

  // Auto-rotate
  useEffect(() => {
    let frame: number
    const animate = () => {
      if (!isDragging) {
        autoRotateRef.current += 0.12
        setRotationY(autoRotateRef.current)
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isDragging])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    dragStartX.current = e.clientX
    rotationStart.current = autoRotateRef.current
  }
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    autoRotateRef.current = rotationStart.current + (e.clientX - dragStartX.current) * 0.3
    setRotationY(autoRotateRef.current)
  }
  const handlePointerUp = () => setIsDragging(false)

  const renderCard = (item: GalleryItem, i: number, angle: number, radius: number, ringOffset: number) => {
    const rad = (angle * i) * (Math.PI / 180)
    const x = Math.cos(rad) * radius
    const z = Math.sin(rad) * radius
    const globalIndex = ringOffset + i
    const isHovered = hoveredIndex === globalIndex

    return (
      <div
        key={`${ringOffset}-${i}`}
        onMouseEnter={() => setHoveredIndex(globalIndex)}
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '200px', height: '140px',
          transformStyle: 'preserve-3d',
          transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${-(angle * i)}deg)`,
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: isHovered ? '0 0 24px rgba(255,199,0,0.6)' : '0 6px 24px rgba(0,0,0,0.6)',
          transition: 'box-shadow 0.3s',
          cursor: 'pointer',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'saturate(1.15)', display: 'block',
            opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s',
          }}
        />
        <Link
          href={item.programSlug ? `/our-programs/${item.programSlug}` : '/our-programs'}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#FFC700', textDecoration: 'none', padding: '12px',
            opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s',
            transform: `rotateY(${angle * i}deg)`,
          }}
        >
          <span style={{
            fontFamily: "'Poppins', sans-serif", fontSize: '13px',
            fontWeight: 800, color: '#000', textTransform: 'uppercase',
            letterSpacing: '1px', textAlign: 'center', lineHeight: 1.2,
          }}>
            {item.title}
          </span>
          {item.program && (
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '9px',
              fontWeight: 700, color: '#000', letterSpacing: '3px',
              textTransform: 'uppercase', marginTop: '6px',
            }}>
              {item.program} →
            </span>
          )}
        </Link>
      </div>
    )
  }

  return (
    <section
      style={{
        position: 'relative', height: '100vh', minHeight: '700px',
        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none',
        /* BLUE SKY background */
        background: 'linear-gradient(180deg, #0a1628 0%, #1a3a5c 20%, #2d6a9f 40%, #4a90c4 55%, #7bb8d9 70%, #a8d4ea 85%, #FFC700 100%)',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {title && (
        <div style={{
          position: 'absolute', top: '48px', left: 'clamp(32px, 5vw, 80px)', zIndex: 10,
          fontFamily: "'Poppins', sans-serif", fontSize: '10px', letterSpacing: '3px',
          textTransform: 'uppercase', fontWeight: 700, color: '#FFC700',
        }}>
          {title}
        </div>
      )}

      {/* 3D perspective container */}
      <div style={{ perspective: '1000px', perspectiveOrigin: '50% 45%' }}>
        {/* Single rotating container — logo + both rings welded together */}
        <div style={{
          position: 'relative',
          width: `${ring1Radius * 2 + 100}px`,
          height: `${ring1Radius * 2 + 100}px`,
          transformStyle: 'preserve-3d',
          transform: `rotateX(-12deg) rotateY(${rotationY}deg)`,
          transition: isDragging ? 'none' : 'transform 0.05s linear',
        }}>
          {/* IBTU logo + gold circle — welded to the orbit, spins WITH it */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '90px', height: '90px', borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #ffe680, #FFC700, #b38600)',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 50px rgba(255,199,0,0.5), inset 0 -3px 10px rgba(0,0,0,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '3px solid rgba(255,230,128,0.8)',
            zIndex: 5,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ibtu-logo.svg" alt="IBTU"
              style={{ width: '55px', height: '55px', filter: 'brightness(0)' }}
            />
          </div>

          {/* Ring 1 — outer, bigger */}
          {ring1Items.map((item, i) => renderCard(item, i, ring1Angle, ring1Radius, 0))}

          {/* Ring 2 — inner, slightly offset vertically */}
          <div style={{
            position: 'absolute', inset: 0,
            transformStyle: 'preserve-3d',
            transform: 'translateY(20px)',
          }}>
            {ring2Items.map((item, i) => renderCard(item, i, ring2Angle, ring2Radius, ring1Items.length))}
          </div>
        </div>
      </div>

      {/* RIBBON — gold bg, black text, scrolling sacred phrases */}
      <div style={{
        position: 'absolute', bottom: '60px', left: 0, right: 0, zIndex: 20,
        background: '#FFC700', padding: '14px 0', overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', width: 'max-content',
          animation: 'tickerScroll 25s linear infinite',
          fontFamily: "'LOT', 'Bebas Neue', sans-serif",
          fontSize: 'clamp(16px, 2vw, 28px)', textTransform: 'uppercase',
          color: '#000', letterSpacing: '3px',
        }}>
          {Array(6).fill(null).map((_, i) => (
            <span key={i} style={{ padding: '0 40px', whiteSpace: 'nowrap' }}>
              Community is the Infrastructure &nbsp;/&nbsp; Designed with Dignity &nbsp;/&nbsp; We Listen, We Build, We Stay &nbsp;/&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 20,
        fontFamily: "'Poppins', sans-serif", fontSize: '10px', letterSpacing: '3px',
        textTransform: 'uppercase', color: '#000', fontWeight: 700,
      }}>
        Drag to explore
      </div>
    </section>
  )
}
