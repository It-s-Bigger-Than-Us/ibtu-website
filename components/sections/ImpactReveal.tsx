'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   IMPACT REVEAL — giant shrinking headline
   + 3 impact cards with video-on-hover
   + transition to 6 stat cards
═══════════════════════════════════════ */

interface Pillar {
  name: string
  stat: string
  statLabel: string
  videoSrc?: string
  imageSrc: string
}

interface StatItem {
  value: number
  suffix?: string
  label: string
}

interface ImpactRevealProps {
  pillars: Pillar[]
  stats: StatItem[]
}

export default function ImpactReveal({ pillars, stats }: ImpactRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const statsGridRef = useRef<HTMLDivElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Giant headline shrinks into position
      gsap.fromTo(
        headlineRef.current,
        { scale: 3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      )

      // Impact cards stagger in
      const cards = cardsRef.current?.querySelectorAll('.impact-card')
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }

      // Stat counter animation
      ScrollTrigger.create({
        trigger: statsGridRef.current,
        start: 'top 80%',
        once: true,
        onEnter() {
          stats.forEach((stat, i) => {
            const el = numRefs.current[i]
            if (!el) return
            const obj = { val: 0 }
            gsap.to(obj, {
              val: stat.value,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate() {
                el.textContent = Math.floor(obj.val).toLocaleString() + (stat.suffix ?? '')
              },
            })
          })

          // Stat cards stagger
          const statCards = statsGridRef.current?.querySelectorAll('.stat-card-new')
          if (statCards) {
            gsap.fromTo(statCards,
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.4)' }
            )
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [stats])

  const handleVideoHover = (e: React.MouseEvent, action: 'play' | 'pause') => {
    const card = e.currentTarget
    const video = card.querySelector('video')
    if (!video) return
    if (action === 'play') {
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--ibtu-black)',
        padding: 'var(--section-pad) clamp(32px, 5vw, 80px)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        {/* ── Giant headline ── */}
        <div
          ref={headlineRef}
          style={{
            marginBottom: 'clamp(48px, 6vw, 80px)',
            opacity: 0,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--display-hero)',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              color: 'var(--ibtu-white)',
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            Our Impact
          </h2>
        </div>

        {/* ── 3 Impact Cards ── */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--grid-gap)',
            marginBottom: 'clamp(60px, 8vw, 120px)',
          }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.name}
              className="impact-card holo-glass"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                opacity: 0,
                transition: 'transform 0.35s var(--ease-out-expo), box-shadow 0.35s',
              }}
              onMouseEnter={(e) => {
                handleVideoHover(e, 'play')
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={(e) => {
                handleVideoHover(e, 'pause')
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Media — 60% of card */}
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pillar.imageSrc}
                  alt={pillar.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'saturate(1.15)',
                  }}
                />
                {pillar.videoSrc && (
                  <video
                    src={pillar.videoSrc}
                    playsInline
                    muted
                    loop
                    preload="metadata"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0,
                      transition: 'opacity 0.4s',
                    }}
                    onPlay={(e) => { (e.target as HTMLVideoElement).style.opacity = '1' }}
                    onPause={(e) => { (e.target as HTMLVideoElement).style.opacity = '0' }}
                  />
                )}
              </div>

              {/* Info — gold block */}
              <div style={{
                background: 'var(--ibtu-gold)',
                padding: 'clamp(16px, 2vw, 24px)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--display-card)',
                  fontWeight: 900,
                  color: 'var(--ibtu-black)',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                }}>
                  {pillar.name}
                </h3>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(24px, 3vw, 40px)',
                  fontWeight: 900,
                  color: 'var(--ibtu-black)',
                  marginTop: '8px',
                }}>
                  {pillar.stat}
                </div>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-sm)',
                  fontWeight: 600,
                  color: 'var(--ibtu-black)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  {pillar.statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── 6 Stat Cards — 3×2 grid ── */}
        <div
          ref={statsGridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--grid-gap)',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card-new"
              style={{
                background: 'var(--ibtu-gold)',
                borderRadius: '16px',
                padding: 'clamp(24px, 3vw, 48px)',
                opacity: 0,
                cursor: 'pointer',
                transition: 'background 0.4s var(--ease-out-expo), color 0.4s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '160px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--ibtu-black)'
                const num = e.currentTarget.querySelector('.stat-num-new') as HTMLElement
                const label = e.currentTarget.querySelector('.stat-label-new') as HTMLElement
                if (num) num.style.color = 'var(--ibtu-gold)'
                if (label) label.style.color = 'var(--ibtu-gold)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--ibtu-gold)'
                const num = e.currentTarget.querySelector('.stat-num-new') as HTMLElement
                const label = e.currentTarget.querySelector('.stat-label-new') as HTMLElement
                if (num) num.style.color = 'var(--ibtu-black)'
                if (label) label.style.color = 'var(--ibtu-black)'
              }}
            >
              <span
                ref={el => { numRefs.current[i] = el }}
                className="stat-num-new"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(48px, 6vw, 80px)',
                  lineHeight: 1,
                  color: 'var(--ibtu-black)',
                  transition: 'color 0.4s var(--ease-out-expo)',
                }}
              >
                0{stat.suffix ?? ''}
              </span>
              <span
                className="stat-label-new"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-md)',
                  fontWeight: 600,
                  color: 'var(--ibtu-black)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '12px',
                  transition: 'color 0.4s var(--ease-out-expo)',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .impact-card { grid-column: span 1 !important; }
        }
        @media (max-width: 640px) {
          div:has(> .impact-card) { grid-template-columns: 1fr !important; }
          div:has(> .stat-card-new) { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
