'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StorySlide {
  image: string
  alt: string
  label?: string
  headline: string
  body?: string
  stat?: string
  type?: 'image' | 'video'
}

interface StickyStorySectionProps {
  slides: StorySlide[]
  sectionLabel?: string
}

/**
 * Sticky scroll storytelling section.
 * Photos change and text animates for 3-4 scroll motions per section.
 * Images/videos on one side, animated text on the other.
 * No text over images — they sit side by side.
 */
export default function StickyStorySection({ slides, sectionLabel }: StickyStorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || slides.length === 0) return

    const panels = containerRef.current.querySelectorAll('.story-panel')

    // Pin the container for the full scroll duration
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${slides.length * 100}%`,
      pin: true,
      scrub: 1,
    })

    // Animate each panel in sequence
    panels.forEach((panel, i) => {
      if (i === 0) return // First panel is visible by default

      const image = panel.querySelector('.story-image')
      const text = panel.querySelector('.story-text')
      const words = panel.querySelectorAll('.story-word')

      // Timeline for each panel transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `${(i / slides.length) * 100}% top`,
          end: `${((i + 0.5) / slides.length) * 100}% top`,
          scrub: 1,
        },
      })

      // Previous panel fades out
      if (i > 0) {
        const prevPanel = panels[i - 1]
        tl.to(prevPanel, { opacity: 0, duration: 0.3 }, 0)
      }

      // Current panel fades in
      tl.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)

      // Image slides in
      if (image) {
        tl.fromTo(image,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4 },
          0.1
        )
      }

      // Words stagger in
      if (words.length) {
        tl.fromTo(words,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, stagger: 0.03, duration: 0.3 },
          0.15
        )
      }
    })

    return () => {
      trigger.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [slides])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* Section label */}
      {sectionLabel && (
        <div style={{
          position: 'absolute',
          top: '48px',
          left: 'clamp(32px, 5vw, 80px)',
          zIndex: 10,
          fontFamily: "var(--font-body)",
          fontSize: '10px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: 'var(--gold)',
        }}>
          {sectionLabel}
        </div>
      )}

      {/* Story panels — stacked, each with image left + text right */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="story-panel"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            opacity: i === 0 ? 1 : 0,
          }}
        >
          {/* Image/video side */}
          <div
            className="story-image"
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {slide.type === 'video' ? (
              <video
                src={slide.image}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'saturate(1.15)',
                }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slide.image}
                alt={slide.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'saturate(1.15)',
                }}
              />
            )}
          </div>

          {/* Text side — solid black background, no text over image */}
          <div
            className="story-text"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(48px, 5vw, 96px)',
              background: '#000',
            }}
          >
            {slide.label && (
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--gold)',
                marginBottom: '24px',
              }}>
                {slide.label}
              </span>
            )}

            {/* Headline — word by word animation */}
            <h3 style={{
              fontFamily: "'LOT', 'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              color: '#fff',
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}>
              {slide.headline.split(' ').map((word, wi) => (
                <span
                  key={wi}
                  className="story-word"
                  style={{ display: 'inline-block', opacity: i === 0 ? 1 : 0 }}
                >
                  {word}{wi < slide.headline.split(' ').length - 1 ? '\u00A0' : ''}
                </span>
              ))}
            </h3>

            {slide.body && (
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.7,
                color: '#fff',
                maxWidth: '500px',
                marginBottom: '24px',
              }}>
                {slide.body}
              </p>
            )}

            {slide.stat && (
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: 900,
                color: 'var(--gold)',
                lineHeight: 1,
              }}>
                {slide.stat}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Responsive override */}
      <style jsx>{`
        @media (max-width: 768px) {
          .story-panel {
            grid-template-columns: 1fr !important;
            grid-template-rows: 50vh auto !important;
          }
        }
      `}</style>
    </div>
  )
}
