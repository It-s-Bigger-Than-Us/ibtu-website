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
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Combine videos (first) + images into media array
  const media: HeroMedia[] = [
    ...(videos || []).map((v) => ({ src: v.src, alt: 'IBTU Community', type: 'video' as const })),
    ...images.map((img) => ({ ...img, type: (img.type || 'image') as 'image' | 'video' })),
  ]

  const words = headline.split(' ')

  // Auto-advance carousel
  useEffect(() => {
    if (media.length <= 1) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % media.length)
    }, 6000) // slightly longer for video clips
    return () => clearInterval(interval)
  }, [media.length])

  // GSAP entrance — cinematic char-level stagger
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Word-by-word entrance with stronger stagger
    const wordSpans = headlineRef.current?.querySelectorAll('.hero-word')
    if (wordSpans) {
      tl.fromTo(
        wordSpans,
        { opacity: 0, y: 60, rotateX: -15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.1 },
        0.3
      )
    }

    // Metadata slides in
    if (metadataRef.current) {
      tl.fromTo(
        metadataRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
    }

    // Scroll indicator fades in
    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      )
    }

    return () => { tl.kill() }
  }, [])

  return (
    <section className="hero" ref={sectionRef}>
      {/* Media slides — video + images */}
      <div className="hero-slides">
        {media.map((item, index) => (
          <div
            key={`${item.type}-${index}`}
            className={`hero-slide${index === activeIndex ? ' active' : ''}`}
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
              <img src={item.src} alt={item.alt} />
            )}
          </div>
        ))}
      </div>

      <div className="hero-scrim" />

      <div className="hero-content">
        <h1 className="hero-headline" ref={headlineRef}>
          {words.map((word, i) => (
            <span
              key={i}
              className="hero-word"
              style={{ opacity: 0, display: 'inline-block', perspective: '600px' }}
            >
              {word}{i < words.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>

        <div className="hero-metadata" ref={metadataRef} style={{ opacity: 0 }}>
          {metadata.map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '32px' }}>
              {i > 0 && <span className="sep" />}
              {item.label}: {item.value}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-scroll-indicator" ref={scrollIndicatorRef} style={{ opacity: 0 }}>
        <span>SCROLL</span>
        <div className="chevron" />
      </div>
    </section>
  )
}
