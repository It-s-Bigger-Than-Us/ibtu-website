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

  const half = Math.ceil(items.length / 2)
  const ring1Items = items.slice(0, half)
  const ring2Items = items.slice(half)
  const ring1Angle = 360 / Math.max(ring1Items.length, 1)
  const ring2Angle = 360 / Math.max(ring2Items.length, 1)

  useEffect(() => {
    let frame: number
    const animate = () => {
      if (!isDragging) {
        autoRotateRef.current += 0.1
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

  const renderCard = (item: GalleryItem, i: number, globalIdx: number) => {
    const isHovered = hoveredIndex === globalIdx
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src} alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.15)', opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: '#FFC700', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '12px',
          opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s',
        }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', fontWeight: 800, color: '#000', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', lineHeight: 1.2 }}>
            {item.title}
          </span>
          {item.program && (
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '9px', fontWeight: 700, color: '#000', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '6px' }}>
              {item.program} →
            </span>
          )}
        </div>
      </>
    )
  }

  return (
    <section
      style={{
        position: 'relative', height: '100vh', minHeight: '700px',
        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none',
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

      {/* IBTU logo — STAYS STILL, does not rotate */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80px', height: '80px', borderRadius: '50%',
        background: '#FFC700',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 15,
        /* No border, no stroke */
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ibtu-logo.svg" alt="IBTU" style={{ width: '50px', height: '50px', filter: 'brightness(0)' }} />
      </div>

      {/* 3D orbit container — rings rotate, logo stays */}
      <div style={{ perspective: '1000px', perspectiveOrigin: '50% 45%' }}>
        <div style={{
          position: 'relative',
          width: '700px', height: '700px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(-10deg) rotateY(${rotationY}deg)`,
        }}>
          {/* Ring 1 — horizontal orbit */}
          {ring1Items.map((item, i) => {
            const rad = (ring1Angle * i) * (Math.PI / 180)
            const x = Math.cos(rad) * 300
            const z = Math.sin(rad) * 300
            const isHovered = hoveredIndex === i

            return (
              <div
                key={`r1-${i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: '240px', height: '160px',
                  transformStyle: 'preserve-3d',
                  transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${-(ring1Angle * i)}deg)`,
                  borderRadius: '12px', overflow: 'hidden',
                  boxShadow: isHovered ? '0 0 30px rgba(255,199,0,0.5)' : '0 8px 32px rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                }}
              >
                {renderCard(item, i, i)}
              </div>
            )
          })}

          {/* Ring 2 — vertical meridian orbit (images upright, ring rotated 90deg) */}
          <div style={{
            position: 'absolute', inset: 0,
            transformStyle: 'preserve-3d',
            transform: 'rotateZ(90deg)',
          }}>
            {ring2Items.map((item, i) => {
              const rad = (ring2Angle * i) * (Math.PI / 180)
              const x = Math.cos(rad) * 220
              const z = Math.sin(rad) * 220
              const globalIdx = ring1Items.length + i
              const isHovered = hoveredIndex === globalIdx

              return (
                <div
                  key={`r2-${i}`}
                  onMouseEnter={() => setHoveredIndex(globalIdx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: '200px', height: '140px',
                    transformStyle: 'preserve-3d',
                    transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${-(ring2Angle * i)}deg) rotateZ(-90deg)`,
                    borderRadius: '10px', overflow: 'hidden',
                    boxShadow: isHovered ? '0 0 24px rgba(255,199,0,0.5)' : '0 6px 24px rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                  }}
                >
                  {renderCard(item, i, globalIdx)}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 3D RIBBON — flows in and out with wave animation */}
      <div style={{
        position: 'absolute', bottom: '80px', left: '-5%', right: '-5%', zIndex: 20,
        background: '#FFC700', padding: '14px 0', overflow: 'hidden',
        transform: 'perspective(600px) rotateX(3deg)',
        animation: 'ribbonWave 4s ease-in-out infinite',
      }}>
        <div
          className="ribbon-track"
          style={{
            fontFamily: "'LOT', 'Bebas Neue', sans-serif",
            fontSize: 'clamp(16px, 2vw, 28px)', textTransform: 'uppercase',
            color: '#000', letterSpacing: '3px',
          }}
        >
          {Array(6).fill(null).map((_, i) => (
            <span key={i} style={{ padding: '0 40px', whiteSpace: 'nowrap' }}>
              Community is the Infrastructure &nbsp;/&nbsp; Designed with Dignity &nbsp;/&nbsp; We Listen, We Build, We Stay &nbsp;/&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 20,
        fontFamily: "'Poppins', sans-serif", fontSize: '10px', letterSpacing: '3px',
        textTransform: 'uppercase', color: '#000', fontWeight: 700,
      }}>
        Drag to explore
      </div>

      {/* Ribbon wave keyframe */}
      <style jsx>{`
        @keyframes ribbonWave {
          0%, 100% { transform: perspective(600px) rotateX(3deg) translateY(0px); }
          25% { transform: perspective(600px) rotateX(-2deg) translateY(-4px); }
          50% { transform: perspective(600px) rotateX(4deg) translateY(2px); }
          75% { transform: perspective(600px) rotateX(-1deg) translateY(-2px); }
        }
      `}</style>
    </section>
  )
}
