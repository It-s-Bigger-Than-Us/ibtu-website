'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface StackingGalleryProps {
  images: GalleryImage[]
  title?: string
}

/**
 * Stacking gallery — images slide in and stack on top of each other
 * as the user scrolls. Each image slightly offset and rotated.
 * Sticky container with scroll-driven animation.
 */
export default function StackingGallery({ images, title }: StackingGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !stackRef.current || images.length === 0) return

    const ctx = gsap.context(() => {
      const cards = stackRef.current!.querySelectorAll('.stack-card')

      // Pin the container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${images.length * 80}%`,
        pin: true,
        scrub: 1,
      })

      // Each card slides in from different directions and stacks
      cards.forEach((card, i) => {
        if (i === 0) return // First card is already visible

        const directions = [
          { x: 200, y: 40, rotation: 5 },
          { x: -180, y: 60, rotation: -4 },
          { x: 150, y: -30, rotation: 3 },
          { x: -120, y: 50, rotation: -6 },
          { x: 200, y: -20, rotation: 4 },
          { x: -160, y: 40, rotation: -3 },
        ]
        const dir = directions[i % directions.length]

        gsap.fromTo(card,
          {
            x: dir.x,
            y: dir.y,
            rotation: dir.rotation,
            opacity: 0,
            scale: 0.9,
          },
          {
            x: (i % 2 === 0 ? 1 : -1) * (i * 8),
            y: -(i * 6),
            rotation: (i % 2 === 0 ? 1 : -1) * (i * 1.5),
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${(i / images.length) * 80}% top`,
              end: `${((i + 0.6) / images.length) * 80}% top`,
              scrub: 1,
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [images])

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {title && (
        <div style={{
          position: 'absolute',
          top: '48px',
          left: 'clamp(32px, 5vw, 80px)',
          fontFamily: "var(--font-body)",
          fontSize: '10px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: 'var(--gold)',
          zIndex: 20,
        }}>
          {title}
        </div>
      )}

      {/* Stack of images */}
      <div
        ref={stackRef}
        style={{
          position: 'relative',
          width: 'clamp(300px, 50vw, 600px)',
          height: 'clamp(250px, 40vw, 500px)',
        }}
      >
        {images.slice(0, 8).map((img, i) => (
          <div
            key={i}
            className="stack-card"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
              zIndex: i,
              opacity: i === 0 ? 1 : 0,
              transform: i === 0 ? 'none' : undefined,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'saturate(1.15)',
              }}
            />
            {img.caption && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'var(--gold)',
                padding: '12px 20px',
                fontFamily: "var(--font-body)",
                fontSize: '12px',
                fontWeight: 700,
                color: '#000',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                {img.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
