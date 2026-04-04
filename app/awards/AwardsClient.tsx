'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Award {
  title: string
  presentedBy: string
  year: number
  context: string
  level?: string
  notes?: string
}

interface MediaPlacement {
  outlet: string
  type: string
  year: number
  description: string
  featured?: boolean
}

interface AwardsClientProps {
  awards: Award[]
  media: MediaPlacement[]
}

// Award level badge colors
const LEVEL_COLORS: Record<string, string> = {
  Federal: '#FFC700',
  State: '#FFC700',
  City: '#FFC700',
  Institutional: 'var(--gold)',
}

export default function AwardsClient({ awards, media }: AwardsClientProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const awardsRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero entrance
    const heroWords = heroRef.current?.querySelectorAll('.award-hero-word')
    if (heroWords) {
      gsap.fromTo(heroWords,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      )
    }

    // Awards stagger in on scroll
    const awardRows = awardsRef.current?.querySelectorAll('.award-row')
    if (awardRows) {
      gsap.fromTo(awardRows,
        { opacity: 0, x: -32 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: awardsRef.current, start: 'top 75%', once: true },
        }
      )
    }

    // Media cards stagger in
    const mediaCards = mediaRef.current?.querySelectorAll('.media-card')
    if (mediaCards) {
      gsap.fromTo(mediaCards,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: mediaRef.current, start: 'top 75%', once: true },
        }
      )
    }

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  // Group awards by year
  const years = [...new Set(awards.map((a: Award) => a.year))].sort((a, b) => b - a)

  const heroText = 'RECOGNIZED BY THE PEOPLE WE SERVE AND THE INSTITUTIONS THAT WATCH'

  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>
      {/* ── HERO ── */}
      <div
        ref={heroRef}
        style={{
          background: 'var(--gold)',
          padding: 'clamp(120px, 15vw, 200px) clamp(32px, 5vw, 80px) clamp(80px, 10vw, 140px)',
        }}
      >
        <span className="editorial-label" style={{ color: '#000', marginBottom: '20px', display: 'block' }}>
          AWARDS & RECOGNITION
        </span>
        <h1 style={{
          fontFamily: "var(--font-body)",
          fontSize: 'clamp(36px, 6vw, 96px)',
          lineHeight: 0.92,
          color: '#000',
          maxWidth: '1000px',
          fontWeight: 900,
        }}>
          {heroText.split(' ').map((word, i) => (
            <span key={i} className="award-hero-word" style={{ display: 'inline-block', opacity: 0 }}>
              {word}{i < heroText.split(' ').length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>
        <p style={{
          fontSize: 'clamp(15px, 1.3vw, 20px)',
          color: '#000',
          maxWidth: '600px',
          lineHeight: 1.7,
          marginTop: '32px',
        }}>
          23 awards from Congress, the California Legislature, the City of Los Angeles,
          and community partners — each one earned in the field.
        </p>
      </div>

      {/* ── AWARDS LIST ── */}
      <div ref={awardsRef} style={{ padding: 'var(--section-pad) clamp(32px, 5vw, 80px)' }}>
        {years.map(year => {
          const yearAwards = awards.filter((a: Award) => a.year === year)
          return (
            <div key={year} style={{ marginBottom: '80px' }}>
              <h2 className="editorial-stat" style={{ marginBottom: '40px' }}>
                {year}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {yearAwards.map((award: Award, i: number) => (
                  <div
                    key={i}
                    className="award-row fold-trigger"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr',
                      gap: '28px',
                      padding: '28px 0',
                      borderBottom: '1px solid #FFC700',
                      alignItems: 'start',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <span style={{
                        display: 'inline-block',
                        background: LEVEL_COLORS[award.level || 'Institutional'] || 'var(--gold)',
                        color: '#000',
                        fontFamily: "var(--font-body)",
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '5px 10px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        borderRadius: '4px',
                      }}>
                        {award.level || award.year}
                      </span>
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 'clamp(16px, 1.6vw, 22px)',
                        color: '#fff',
                        fontWeight: 800,
                        lineHeight: 1.2,
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        {award.title}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#fff',
                        lineHeight: 1.5,
                        marginBottom: '4px',
                      }}>
                        {award.presentedBy}
                      </p>
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--gold)',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}>
                        {award.context}
                      </span>
                      {/* Fold-out notes on hover */}
                      {award.notes && (
                        <div className="fold-content" style={{
                          marginTop: '10px',
                          fontSize: '13px',
                          color: '#fff',
                          lineHeight: 1.6,
                        }}>
                          {award.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── MEDIA & NEWS ── */}
      <div style={{
        padding: 'var(--section-pad) clamp(32px, 5vw, 80px)',
        borderTop: '1px solid #FFC700',
      }}>
        <span className="editorial-label" style={{ marginBottom: '20px', display: 'block' }}>
          MEDIA & PRESS
        </span>
        <h2 className="editorial-headline" style={{ marginBottom: '48px', maxWidth: '800px' }}>
          THE WORK SPEAKS. THE MEDIA LISTENS.
        </h2>

        {/* Featured media — Jennifer Hudson */}
        {media.filter(m => m.featured).map((item, i) => (
          <div key={i} style={{
            background: '#000',
            borderRadius: '20px',
            padding: 'clamp(40px, 5vw, 80px)',
            marginBottom: '48px',
            border: '1px solid #FFC700',
          }}>
            <span className="editorial-label">{item.type}</span>
            <h3 style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 900,
              color: 'var(--gold)',
              marginTop: '12px',
              marginBottom: '16px',
              lineHeight: 1,
            }}>
              {item.outlet.toUpperCase()}
            </h3>
            <p className="editorial-body">{item.description}</p>
          </div>
        ))}

        {/* Media grid */}
        <div
          ref={mediaRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {media.filter(m => !m.featured).map((item, i) => (
            <div
              key={i}
              className="media-card card-lift"
              style={{
                background: '#000',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid #FFC700',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}>
                <span style={{
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  fontWeight: 700,
                  fontFamily: "var(--font-body)",
                }}>
                  {item.type}
                </span>
                <span style={{
                  fontSize: '12px',
                  color: 'var(--gold)',
                  fontFamily: "var(--font-body)",
                }}>
                  {item.year}
                </span>
              </div>
              <h4 style={{
                fontFamily: "var(--font-body)",
                fontSize: '18px',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                {item.outlet}
              </h4>
              <p style={{
                fontSize: '13px',
                color: '#fff',
                lineHeight: 1.6,
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(32px, 5vw, 80px)',
          marginTop: '80px',
          flexWrap: 'wrap',
        }}>
          {[
            { value: '75+', label: 'Media Placements' },
            { value: '2.47M', label: 'Instagram Reach' },
            { value: '74,678', label: 'Website Visits (2025)' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div className="editorial-stat" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                marginTop: '8px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
