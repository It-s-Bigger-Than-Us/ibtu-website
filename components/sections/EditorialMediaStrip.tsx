'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   EDITORIAL MEDIA STRIP
   Full-bleed cinematic gallery inspired by stacked
   editorial layout: ambient video → asymmetric pairs →
   centered hero → reversed pair → full-bleed closer.

   3519 patterns: edge-to-edge, no border-radius,
   asymmetric vertical offsets, generous whitespace,
   video as ambient media (autoplay muted loop).
═══════════════════════════════════════ */

interface EditorialMediaStripProps {
  images: string[]       // 6–8 images
  videoUrl?: string      // ambient autoplay video (Sanity CDN)
  sectionLabel?: string  // optional small label, e.g. "IN THE FIELD"
}

export default function EditorialMediaStrip({
  images,
  videoUrl,
  sectionLabel,
}: EditorialMediaStripProps) {
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!stripRef.current) return

    const ctx = gsap.context(() => {
      /* Reveal each media block on scroll */
      const blocks = stripRef.current!.querySelectorAll('.ems-block')
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              once: true,
            },
          },
        )
      })

      /* Subtle parallax on the offset columns */
      const offsets = stripRef.current!.querySelectorAll('.ems-offset')
      offsets.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60 },
          {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      })
    }, stripRef)

    return () => ctx.revert()
  }, [])

  if (images.length < 6) return null

  return (
    <section
      ref={stripRef}
      style={{ background: '#000', overflow: 'hidden' }}
    >
      {/* ── Section label ── */}
      {sectionLabel && (
        <div
          style={{
            padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px) 0',
            maxWidth: 'var(--content-max)',
            margin: '0 auto',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#FFC700',
              fontWeight: 700,
            }}
          >
            {sectionLabel}
          </span>
        </div>
      )}

      {/* ── 1. Full-bleed ambient video ── */}
      {videoUrl && (
        <div
          className="ems-block"
          style={{
            width: '100%',
            aspectRatio: '21 / 9',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      {/* ── 2. Asymmetric two-column pair ── */}
      <div
        className="ems-block"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 4,
          marginTop: 'clamp(40px, 6vw, 80px)',
        }}
      >
        {/* Left — flush top */}
        <div style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[0]}
            alt=""
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
        {/* Right — offset down (asymmetric stagger) */}
        <div
          className="ems-offset"
          style={{
            position: 'relative',
            aspectRatio: '3 / 4',
            overflow: 'hidden',
            marginTop: 'clamp(60px, 8vw, 120px)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[1]}
            alt=""
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* ── 3. Single centered hero image ── */}
      <div
        className="ems-block"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div
          style={{
            width: '75%',
            maxWidth: 1100,
            aspectRatio: '16 / 10',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[2]}
            alt=""
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* ── 4. Asymmetric two-column pair (reversed stagger) ── */}
      <div
        className="ems-block"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 4,
        }}
      >
        {/* Left — offset down */}
        <div
          className="ems-offset"
          style={{
            position: 'relative',
            aspectRatio: '4 / 3',
            overflow: 'hidden',
            marginTop: 'clamp(40px, 6vw, 100px)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[3]}
            alt=""
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
        {/* Right — flush top, taller */}
        <div style={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[4]}
            alt=""
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* ── 5. Full-bleed closing shot ── */}
      <div
        className="ems-block"
        style={{
          width: '100%',
          aspectRatio: '21 / 9',
          position: 'relative',
          overflow: 'hidden',
          marginTop: 'clamp(40px, 6vw, 80px)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[5]}
          alt=""
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'brightness(1.05) saturate(1.1)',
          }}
        />
      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 768px) {
          .ems-block[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          .ems-offset {
            margin-top: 4px !important;
          }
        }
      `}</style>
    </section>
  )
}
