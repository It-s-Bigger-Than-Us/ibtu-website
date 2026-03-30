'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

interface HeroSectionProps {
  images: { src: string; alt: string }[]
  headline: string
  metadata: { label: string; value: string }[]
}

export default function HeroSection({ images, headline, metadata }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const metadataRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  const words = headline.split(' ')

  // Auto-advance carousel
  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  // GSAP entrance animation
  useEffect(() => {
    const wordSpans = headlineRef.current?.querySelectorAll('span')
    if (wordSpans) {
      gsap.fromTo(
        wordSpans,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
        }
      )
    }

    if (metadataRef.current) {
      gsap.fromTo(
        metadataRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: 'power3.out' }
      )
    }

    if (scrollIndicatorRef.current) {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 1.2 }
      )
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero-slides">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`hero-slide${index === activeIndex ? ' active' : ''}`}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>

      <div className="hero-scrim" />

      <div className="hero-content">
        <h1 className="hero-headline" ref={headlineRef}>
          {words.map((word, i) => (
            <span key={i} style={{ opacity: 0 }}>
              {word}{i < words.length - 1 ? ' ' : ''}
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
