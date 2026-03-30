'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

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

/**
 * 3D Orbital Gallery using CSS 3D transforms.
 * Images orbit around a center point in 3D space.
 * Hover: card turns gold with program name + link.
 * Drag to rotate the orbit manually.
 * Sky gradient background + scrolling ribbon.
 */
export default function OrbitalGallery({ items, title }: OrbitalGalleryProps) {
  const orbitRef = useRef<HTMLDivElement>(null)
  const [rotationY, setRotationY] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const rotationStart = useRef(0)
  const autoRotateRef = useRef<number>(0)

  const itemCount = items.length
  const angleStep = 360 / Math.max(itemCount, 1)
  const radius = Math.max(350, itemCount * 45) // Responsive radius

  // Auto-rotate when not dragging
  useEffect(() => {
    let animFrame: number
    const animate = () => {
      if (!isDragging) {
        autoRotateRef.current += 0.15
        setRotationY(autoRotateRef.current)
      }
      animFrame = requestAnimationFrame(animate)
    }
    animFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame)
  }, [isDragging])

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    dragStartX.current = e.clientX
    rotationStart.current = autoRotateRef.current
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const delta = (e.clientX - dragStartX.current) * 0.3
    autoRotateRef.current = rotationStart.current + delta
    setRotationY(autoRotateRef.current)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1a0800 0%, #0d0400 25%, #060200 50%, #000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Section label */}
      {title && (
        <div style={{
          position: 'absolute', top: '48px', left: 'clamp(32px, 5vw, 80px)', zIndex: 10,
          fontFamily: "'Poppins', sans-serif", fontSize: '10px', letterSpacing: '3px',
          textTransform: 'uppercase', fontWeight: 700, color: '#FFC700',
        }}>
          {title}
        </div>
      )}

      {/* 3D orbit container */}
      <div style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div
          ref={orbitRef}
          style={{
            position: 'relative',
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            transformStyle: 'preserve-3d',
            transform: `rotateX(-8deg) rotateY(${rotationY}deg)`,
            transition: isDragging ? 'none' : 'transform 0.05s linear',
          }}
        >
          {/* Gold center sphere */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '60px', height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #ffe066, #FFC700, #cc9e00)',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 40px rgba(255, 199, 0, 0.4)',
            zIndex: 1,
          }} />

          {/* Orbiting image cards */}
          {items.map((item, i) => {
            const angle = (angleStep * i) * (Math.PI / 180)
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius
            const rotY = -(angleStep * i)
            const isHovered = hoveredIndex === i

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: 'clamp(200px, 20vw, 300px)',
                  height: 'clamp(140px, 14vw, 200px)',
                  transformStyle: 'preserve-3d',
                  transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg)`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: isHovered
                    ? '0 0 30px rgba(255, 199, 0, 0.6)'
                    : '0 8px 32px rgba(0,0,0,0.5)',
                  transition: 'box-shadow 0.3s',
                  cursor: 'pointer',
                }}
              >
                {isHovered ? (
                  /* Hover state: gold with program info */
                  <Link
                    href={item.programSlug ? `/our-programs/${item.programSlug}` : '/our-programs'}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      background: '#FFC700',
                      textDecoration: 'none',
                      padding: '16px',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 'clamp(14px, 1.2vw, 18px)',
                      fontWeight: 800,
                      color: '#000',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}>
                      {item.title}
                    </span>
                    {item.program && (
                      <span style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#000',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        marginTop: '8px',
                      }}>
                        {item.program} →
                      </span>
                    )}
                  </Link>
                ) : (
                  /* Default state: photo */
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'saturate(1.15)',
                      display: 'block',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Scrolling ribbon — gold bg, black text, sacred phrases */}
      <div style={{
        position: 'absolute', bottom: '60px', left: 0, right: 0, zIndex: 10,
        background: '#FFC700', padding: '14px 0', overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', width: 'max-content',
          animation: 'tickerScroll 25s linear infinite',
          fontFamily: "'LOT', 'Bebas Neue', sans-serif",
          fontSize: 'clamp(16px, 2vw, 28px)', textTransform: 'uppercase',
          color: '#000', letterSpacing: '3px',
        }}>
          {Array(4).fill(null).map((_, i) => (
            <span key={i} style={{ padding: '0 40px', whiteSpace: 'nowrap' }}>
              Community is the Infrastructure &nbsp;/&nbsp; Designed with Dignity &nbsp;/&nbsp; We Listen, We Build, We Stay &nbsp;/&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Drag hint */}
      <div style={{
        position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 10,
        fontFamily: "'Poppins', sans-serif", fontSize: '10px', letterSpacing: '3px',
        textTransform: 'uppercase', color: '#FFC700', fontWeight: 600,
      }}>
        Drag to explore
      </div>
    </section>
  )
}
