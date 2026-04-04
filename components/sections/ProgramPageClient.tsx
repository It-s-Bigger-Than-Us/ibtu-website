'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import type { ProgramContent } from '@/lib/data/program-content'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   PROGRAM PAGE CLIENT — full program layout
   2-col parallax everything, GSAP scroll-triggered,
   iridescent borders, split-screen images.
   Durations: 0.4–0.6s. Staggers: 0.08–0.12s.
═══════════════════════════════════════ */

interface ProgramPageClientProps {
  program: ProgramContent
  heroImageUrl: string | null
  pastEvents: Array<{
    _id: string
    title: string
    year: number
    dateStart?: string
    location?: string
    shortDescription?: string
    proofStats?: string
  }>
}

/* ── Highlight helper — wraps matching phrases in iridescent spans ── */
function renderHighlightedText(text: string, highlights: string[]) {
  if (!highlights.length) return text

  // Build regex that matches any highlight phrase
  const escaped = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, i) => {
    const isHighlight = highlights.some(
      h => h.toLowerCase() === part.toLowerCase()
    )
    if (isHighlight) {
      return (
        <span
          key={i}
          className="program-highlight"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #FFF4B8, #D4F0F8, #D4F5E8, #FFE4D6, #FFF4B8)',
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'highlightShimmer 4s linear infinite',
          }}
        >
          {part}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

/* ── Number counter helper ── */
function parseStatNumber(val: string): { prefix: string; num: number; suffix: string } {
  const match = val.match(/^([^0-9]*)([0-9,.]+)(.*)$/)
  if (!match) return { prefix: '', num: 0, suffix: val }
  return {
    prefix: match[1],
    num: parseFloat(match[2].replace(/,/g, '')),
    suffix: match[3],
  }
}

function formatNumber(n: number, original: string): string {
  const hasCommas = original.includes(',')
  const hasDecimal = original.includes('.')
  if (hasDecimal) {
    const decimals = original.split('.')[1]?.replace(/[^0-9]/g, '').length || 0
    const formatted = n.toFixed(decimals)
    if (hasCommas) {
      const [intPart, decPart] = formatted.split('.')
      return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + decPart
    }
    return formatted
  }
  const rounded = Math.round(n)
  if (hasCommas) return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return rounded.toString()
}

export default function ProgramPageClient({
  program,
  heroImageUrl,
  // pastEvents reserved for future event timeline section
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pastEvents,
}: ProgramPageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      /* ── Hero text parallax ── */
      gsap.fromTo(
        '.pp-hero-pillar',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', delay: 0.1 }
      )
      gsap.fromTo(
        '.pp-hero-title',
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'expo.out', delay: 0.2 }
      )
      gsap.fromTo(
        '.pp-hero-tagline',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', delay: 0.35 }
      )

      /* ── Overview section ── */
      gsap.fromTo(
        '.pp-overview-text',
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 0.5, ease: 'expo.out',
          scrollTrigger: { trigger: '.pp-overview', start: 'top 75%', once: true },
        }
      )
      gsap.fromTo(
        '.pp-overview-image',
        { opacity: 0, x: 80 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: 'expo.out',
          scrollTrigger: { trigger: '.pp-overview', start: 'top 75%', once: true },
        }
      )

      /* ── Stats counter ── */
      const statCards = containerRef.current?.querySelectorAll('.pp-stat-card')
      if (statCards) {
        gsap.fromTo(
          statCards,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1, scale: 1, y: 0,
            stagger: 0.1, duration: 0.5, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: '.pp-stats', start: 'top 75%', once: true },
          }
        )

        // Count up numbers
        statCards.forEach((card) => {
          const numEl = card.querySelector('.pp-stat-num') as HTMLElement
          if (!numEl) return
          const original = numEl.dataset.value || ''
          const parsed = parseStatNumber(original)
          if (parsed.num === 0) return

          const counter = { val: 0 }
          gsap.to(counter, {
            val: parsed.num,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 80%', once: true },
            onUpdate: () => {
              numEl.textContent = parsed.prefix + formatNumber(counter.val, original) + parsed.suffix
            },
          })
        })
      }

      /* ── Content sections ── */
      const contentSections = containerRef.current?.querySelectorAll('.pp-content-section')
      if (contentSections) {
        contentSections.forEach((sec, i) => {
          const isLeft = i % 2 === 0
          const img = sec.querySelector('.pp-content-image')
          const text = sec.querySelector('.pp-content-text')
          const heading = sec.querySelector('.pp-content-heading')
          const body = sec.querySelector('.pp-content-body')

          if (img) {
            gsap.fromTo(
              img,
              { opacity: 0, x: isLeft ? -80 : 80 },
              {
                opacity: 1, x: 0, duration: 0.6, ease: 'expo.out',
                scrollTrigger: { trigger: sec, start: 'top 75%', once: true },
              }
            )
          }
          if (heading) {
            gsap.fromTo(
              heading,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0, duration: 0.4, ease: 'expo.out',
                scrollTrigger: { trigger: sec, start: 'top 70%', once: true },
                delay: 0.15,
              }
            )
          }
          if (body) {
            gsap.fromTo(
              body,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0, duration: 0.4, ease: 'expo.out',
                scrollTrigger: { trigger: sec, start: 'top 70%', once: true },
                delay: 0.25,
              }
            )
          }
          if (text) {
            gsap.fromTo(
              text,
              { opacity: 0, x: isLeft ? 60 : -60 },
              {
                opacity: 1, x: 0, duration: 0.5, ease: 'expo.out',
                scrollTrigger: { trigger: sec, start: 'top 75%', once: true },
                delay: 0.1,
              }
            )
          }
        })
      }

      /* ── Who We Serve ── */
      const serveItems = containerRef.current?.querySelectorAll('.pp-serve-item')
      if (serveItems) {
        gsap.fromTo(
          '.pp-serve-headline',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: 'expo.out',
            scrollTrigger: { trigger: '.pp-serve', start: 'top 75%', once: true },
          }
        )
        gsap.fromTo(
          serveItems,
          { opacity: 0, x: 40, y: 20 },
          {
            opacity: 1, x: 0, y: 0,
            stagger: 0.1, duration: 0.5, ease: 'expo.out',
            scrollTrigger: { trigger: '.pp-serve', start: 'top 70%', once: true },
            delay: 0.15,
          }
        )
      }

      /* ── Image gallery ── */
      const galleryImgs = containerRef.current?.querySelectorAll('.pp-gallery-img')
      if (galleryImgs) {
        galleryImgs.forEach((img, i) => {
          gsap.fromTo(
            img,
            { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 30 },
            {
              opacity: 1, x: 0, y: 0, duration: 0.5, ease: 'expo.out',
              scrollTrigger: { trigger: img, start: 'top 80%', once: true },
            }
          )
        })
      }

      /* ── CTA section ── */
      gsap.fromTo(
        '.pp-cta-text',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'expo.out',
          scrollTrigger: { trigger: '.pp-cta', start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(
        '.pp-cta-buttons',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.4, ease: 'expo.out',
          scrollTrigger: { trigger: '.pp-cta', start: 'top 75%', once: true },
          delay: 0.2,
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Use first image from program data for overview
  const overviewImage = heroImageUrl || program.images[0] || ''
  // Remaining images for gallery (skip first if used as overview)
  const galleryImages = program.images.slice(heroImageUrl ? 0 : 1, 8)

  return (
    <div ref={containerRef}>
      {/* ═══════════════════════════════════════
          1. HERO — blue sky background, LOT title
      ═══════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/blue-sky.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '120%',
            objectFit: 'cover',
            top: '-10%',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(120px, 15vh, 200px) clamp(32px, 5vw, 80px) clamp(60px, 8vh, 120px)',
            maxWidth: 'var(--content-max)',
            width: '100%',
          }}
        >
          <div
            className="pp-hero-pillar"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#FFF',
              fontWeight: 700,
              marginBottom: 24,
              opacity: 0,
            }}
          >
            {program.pillar}
          </div>
          <h1
            className="pp-hero-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 10vw, 160px)',
              lineHeight: 0.95,
              color: '#FFF',
              textTransform: 'uppercase',
              margin: '0 0 24px',
              opacity: 0,
            }}
          >
            {program.heroTitle}
          </h1>
          <p
            className="pp-hero-tagline"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-lg)',
              color: '#FFF',
              fontWeight: 700,
              maxWidth: 700,
              margin: '0 auto',
              lineHeight: 1.6,
              opacity: 0,
            }}
          >
            {program.tagline}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. OVERVIEW — 2-col: text left, image right
      ═══════════════════════════════════════ */}
      <section
        className="pp-overview"
        style={{
          background: '#000',
          padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--content-max)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
          className="pp-overview-grid"
        >
          <div className="pp-overview-text" style={{ opacity: 0 }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#FFC700',
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              OVERVIEW
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-lg)',
                color: '#FFF',
                lineHeight: 1.8,
                fontWeight: 500,
              }}
            >
              {renderHighlightedText(program.overview, program.overviewHighlights)}
            </p>
          </div>
          <div
            className="pp-overview-image"
            style={{ opacity: 0, position: 'relative' }}
          >
            {overviewImage && (
              <div className="holo-glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={overviewImage}
                  alt={`${program.heroTitle} — overview`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: 16,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. STATS — grid, black bg, gold numbers count up
      ═══════════════════════════════════════ */}
      {program.stats.length > 0 && (
        <section
          className="pp-stats"
          style={{
            background: '#000',
            padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)',
          }}
        >
          <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#FFC700',
                fontWeight: 700,
                marginBottom: 32,
              }}
            >
              BY THE NUMBERS
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(program.stats.length, 3)}, 1fr)`,
                gap: 'var(--grid-gap)',
              }}
            >
              {program.stats.map((stat, i) => (
                <div
                  key={i}
                  className="pp-stat-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 'clamp(20px, 3vw, 40px)',
                    background: '#000',
                    border: '0.5px solid #FFC700',
                    borderRadius: 16,
                    opacity: 0,
                  }}
                >
                  <span
                    className="pp-stat-num"
                    data-value={stat.value}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 900,
                      fontSize: 'clamp(32px, 5vw, 64px)',
                      color: '#FFC700',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--body-sm)',
                      fontWeight: 700,
                      color: '#FFF',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginTop: 8,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          4. CONTENT SECTIONS — alternating 2-col splits
      ═══════════════════════════════════════ */}
      {program.sections.map((section, i) => {
        const imgLeft = section.imagePosition === 'left'
        return (
          <section
            key={i}
            className="pp-content-section"
            style={{
              background: i % 2 === 0 ? '#FFC700' : '#000',
              padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
            }}
          >
            <div
              style={{
                maxWidth: 'var(--content-max)',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(32px, 5vw, 80px)',
                alignItems: 'center',
              }}
              className="pp-content-grid"
            >
              {/* Image column */}
              <div
                className="pp-content-image"
                style={{
                  order: imgLeft ? 0 : 1,
                  opacity: 0,
                }}
              >
                <div className="holo-glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: 16,
                    }}
                  />
                </div>
              </div>

              {/* Text column */}
              <div
                className="pp-content-text"
                style={{
                  order: imgLeft ? 1 : 0,
                  opacity: 0,
                }}
              >
                <h2
                  className="pp-content-heading"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(36px, 5vw, 72px)',
                    lineHeight: 0.95,
                    color: i % 2 === 0 ? '#000' : '#FFC700',
                    textTransform: 'uppercase',
                    marginBottom: 24,
                    opacity: 0,
                  }}
                >
                  {section.heading}
                </h2>
                <div
                  className="pp-content-body"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--body-md)',
                    color: i % 2 === 0 ? '#000' : '#FFF',
                    lineHeight: 1.8,
                    fontWeight: 500,
                    opacity: 0,
                  }}
                >
                  {section.body.split('\n\n').map((para, pi) => (
                    <p key={pi} style={{ marginBottom: pi < section.body.split('\n\n').length - 1 ? 20 : 0 }}>
                      {i % 2 === 0
                        ? para  /* Gold bg sections — no shimmer text (contrast) */
                        : renderHighlightedText(para, section.highlights || [])
                      }
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ═══════════════════════════════════════
          5. WHO WE SERVE — 2-col, numbered list
      ═══════════════════════════════════════ */}
      {program.whoWeServe.length > 0 && (
        <section
          className="pp-serve"
          style={{
            background: '#000',
            padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--content-max)',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(32px, 5vw, 80px)',
              alignItems: 'start',
            }}
            className="pp-serve-grid"
          >
            <div className="pp-serve-headline" style={{ opacity: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: '#FFC700',
                  fontWeight: 700,
                  marginBottom: 24,
                }}
              >
                WHO WE SERVE
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--display-section)',
                  lineHeight: 0.95,
                  color: '#FFC700',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                DESIGNED FOR THE COMMUNITY
              </h2>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                paddingTop: 12,
              }}
            >
              {program.whoWeServe.map((item, i) => (
                <div
                  key={i}
                  className="pp-serve-item holo-glass"
                  style={{
                    background: '#000',
                    border: '0.5px solid #FFC700',
                    borderRadius: 16,
                    padding: 'clamp(16px, 2vw, 24px) clamp(20px, 2.5vw, 32px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    opacity: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 900,
                      fontSize: 'clamp(28px, 3vw, 40px)',
                      color: '#FFC700',
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--body-md)',
                      color: '#FFF',
                      fontWeight: 700,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          6. IMAGE GALLERY — 2-col grid, iridescent borders
      ═══════════════════════════════════════ */}
      {galleryImages.length > 0 && (
        <section
          style={{
            background: '#000',
            padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
          }}
        >
          <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#FFC700',
                fontWeight: 700,
                marginBottom: 32,
              }}
            >
              IN THE FIELD
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--grid-gap)',
              }}
              className="pp-gallery-grid"
            >
              {galleryImages.map((src, i) => (
                <div
                  key={i}
                  className="pp-gallery-img"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="holo-glass"
                    style={{ borderRadius: 16, overflow: 'hidden' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${program.heroTitle} — photo ${i + 1}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: 16,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          7. CTA — gold background, program-specific
      ═══════════════════════════════════════ */}
      <section
        className="pp-cta"
        style={{
          background: '#FFC700',
          padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--content-max)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
          className="pp-cta-grid"
        >
          <div className="pp-cta-text" style={{ opacity: 0 }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 80px)',
                lineHeight: 0.95,
                color: '#000',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              {program.ctaText}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                color: '#000',
                fontWeight: 700,
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              {program.ctaBody}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-sm)',
                color: '#000',
                fontWeight: 700,
                fontStyle: 'italic',
              }}
            >
              We listen, we build, we stay.
            </p>
          </div>
          <div
            className="pp-cta-buttons"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              alignItems: 'flex-start',
              opacity: 0,
            }}
          >
            {program.volunteerUrl && (
              <a
                href={program.volunteerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sparkle-stroke"
                style={{
                  display: 'inline-block',
                  background: '#000',
                  color: '#FFC700',
                  padding: '16px 40px',
                  borderRadius: 16,
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Volunteer &rarr;
              </a>
            )}
            <a
              href={program.donateUrl || 'https://secure.qgiv.com/for/ibt/'}
              target="_blank"
              rel="noopener noreferrer"
              className="sparkle-stroke"
              style={{
                display: 'inline-block',
                border: '0.5px solid #000',
                color: '#000',
                padding: '16px 40px',
                borderRadius: 16,
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Donate &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Inline styles for responsive + shimmer
      ═══════════════════════════════════════ */}
      <style>{`
        @keyframes highlightShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        @media (max-width: 768px) {
          .pp-overview-grid,
          .pp-content-grid,
          .pp-serve-grid,
          .pp-gallery-grid,
          .pp-cta-grid {
            grid-template-columns: 1fr !important;
          }
          .pp-content-image {
            order: 0 !important;
          }
          .pp-content-text {
            order: 1 !important;
          }
          .pp-stat-card {
            min-width: 0;
          }
        }
        @media (max-width: 768px) {
          .pp-stats .pp-stat-card {
            min-width: 0;
          }
          section.pp-stats > div > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
