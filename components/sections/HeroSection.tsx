'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

interface HeroMedia {
  src: string
  alt: string
  type?: 'image' | 'video'
}

interface HeroSectionProps {
  images: HeroMedia[]
  headline: string
  metadata: { label: string; value: string }[]
  videos?: { src: string; poster?: string }[]
}

export default function HeroSection({ images, headline, metadata, videos }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const metadataRef = useRef<HTMLDivElement>(null)

  // Combine videos + images
  const media: HeroMedia[] = [
    ...(videos || []).map((v) => ({ src: v.src, alt: 'IBTU Community', type: 'video' as const })),
    ...images.map((img) => ({ ...img, type: (img.type || 'image') as 'image' | 'video' })),
  ]

  // Auto-advance carousel
  useEffect(() => {
    if (media.length <= 1) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % media.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [media.length])

  // GSAP word-by-word entrance
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    const wordSpans = headlineRef.current?.querySelectorAll('.hero-word')
    if (wordSpans) {
      tl.fromTo(wordSpans,
        { opacity: 0, y: 60, rotateX: -15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.1 },
        0.3
      )
    }

    if (metadataRef.current) {
      tl.fromTo(metadataRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
    }

    return () => { tl.kill() }
  }, [])

  // Break headline into lines: "Community" / "is the" / "Infrastructure"
  const headlineLines = headline.includes('Infrastructure')
    ? ['Community', 'is the', 'Infrastructure']
    : headline.split(' ')

  return (
    <section>
      {/* ── Image/Video carousel — full-bleed, NO text overlay ── */}
      <div style={{
        position: 'relative',
        height: '70vh',
        minHeight: '400px',
        overflow: 'hidden',
      }}>
        {media.map((item, index) => (
          <div
            key={`${item.type}-${index}`}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: index === activeIndex ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
            }}
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.alt}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  filter: 'saturate(1.15)',
                }}
              />
            )}
          </div>
        ))}

        {/* Carousel dots */}
        {media.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 2,
          }}>
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === activeIndex ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === activeIndex ? '#FFC700' : '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'width 0.3s, background 0.3s',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Headline + metadata — on solid black, NO text over image ── */}
      <div style={{
        background: '#000',
        padding: 'clamp(60px, 8vw, 120px) clamp(32px, 5vw, 80px)',
      }}>
        <h1
          ref={headlineRef}
          style={{
            fontFamily: "'LOT', 'Bebas Neue', sans-serif",
            fontSize: 'clamp(64px, 14vw, 240px)',
            lineHeight: 0.88,
            textTransform: 'uppercase',
            color: '#fff',
            letterSpacing: '-0.03em',
            marginBottom: '32px',
            perspective: '600px',
          }}
        >
          {headlineLines.map((line, i) => (
            <span
              key={i}
              className="hero-word"
              style={{
                display: 'block',
                opacity: 0,
              }}
            >
              {line}
            </span>
          ))}
        </h1>

        <div ref={metadataRef} style={{ opacity: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(10px, 1vw, 13px)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontWeight: 700,
            flexWrap: 'wrap',
          }}>
            {metadata.map((item, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '32px' }}>
                {i > 0 && <span style={{ width: '24px', height: '2px', background: 'var(--gold)' }} />}
                {item.label}: {item.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
