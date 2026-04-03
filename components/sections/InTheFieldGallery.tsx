'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

/**
 * IN THE FIELD — horizontal gallery strip that auto-scrolls on hover.
 * Scroll direction follows mouse position (left half = scroll left, right half = scroll right).
 * Gentle hover scale (1.02) with iridescent glow, clipped to container.
 */

interface InTheFieldGalleryProps {
  images: string[]
  programTitle: string
}

export default function InTheFieldGallery({ images, programTitle }: InTheFieldGalleryProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const speedRef = useRef(0)
  const [hovered, setHovered] = useState(false)
  const mouseXRef = useRef(0.5)

  const scroll = useCallback(() => {
    if (!stripRef.current || !containerRef.current) {
      rafRef.current = requestAnimationFrame(scroll)
      return
    }

    if (hovered) {
      // Mouse position determines direction and speed
      // Left side = scroll left (negative), right side = scroll right (positive)
      const direction = (mouseXRef.current - 0.5) * 2 // -1 to 1
      const targetSpeed = direction * 2.5 // max 2.5px/frame
      speedRef.current += (targetSpeed - speedRef.current) * 0.08
    } else {
      // Gentle auto-drift when not hovered
      speedRef.current += (0.4 - speedRef.current) * 0.05
    }

    stripRef.current.scrollLeft += speedRef.current

    // Loop: if we hit the end, wrap back
    const maxScroll = stripRef.current.scrollWidth - stripRef.current.clientWidth
    if (stripRef.current.scrollLeft >= maxScroll - 1) {
      stripRef.current.scrollLeft = 0
    } else if (stripRef.current.scrollLeft <= 0 && speedRef.current < 0) {
      stripRef.current.scrollLeft = maxScroll
    }

    rafRef.current = requestAnimationFrame(scroll)
  }, [hovered])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(rafRef.current)
  }, [scroll])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseXRef.current = (e.clientX - rect.left) / rect.width
  }, [])

  if (images.length === 0) return null

  // Double images for seamless loop
  const loopImages = [...images, ...images]

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); mouseXRef.current = 0.5 }}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
      }}
    >
      <div
        ref={stripRef}
        style={{
          display: 'flex',
          gap: 16,
          overflowX: 'hidden',
          scrollBehavior: 'auto',
          padding: '8px 0',
        }}
      >
        {loopImages.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="field-gallery-card"
            style={{
              flexShrink: 0,
              width: 'clamp(260px, 22vw, 340px)',
              aspectRatio: i % 3 === 0 ? '3/4' : '4/3',
              borderRadius: 12,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${programTitle} — photo ${(i % images.length) + 1}`}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'saturate(1.15) brightness(1.05)',
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .field-gallery-card {
          transition: transform 0.4s var(--ease-out-expo), box-shadow 0.4s;
        }
        .field-gallery-card:hover {
          transform: scale(1.02);
          box-shadow:
            0 0 8px 1px #FFF4B8,
            0 0 16px 2px #D4F0F8,
            0 0 24px 3px #D4F5E8;
        }
      `}</style>
    </div>
  )
}
