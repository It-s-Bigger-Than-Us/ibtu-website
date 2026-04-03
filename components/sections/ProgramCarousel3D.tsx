'use client'

import Link from 'next/link'

/* ═══════════════════════════════════════
   PROGRAM CARDS — Infinite scroll carousel
   CSS animation, no RAF/position math.
   Cards scroll left infinitely, pause on hover.
   Each card = program photo + iridescent name bar.
═══════════════════════════════════════ */

interface Program {
  slug: string
  title: string
  pillar: string
  heroImage: string
  description?: string
}

const CARD_W = 224
const CARD_H = 294
const GAP = 24

export default function ProgramCarousel3D({ programs }: { programs: Program[] }) {
  const count = programs.length
  const trackWidth = (CARD_W + GAP) * count

  return (
    <section style={{ background: '#000', padding: 'clamp(60px, 8vw, 100px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 clamp(32px, 5vw, 80px) clamp(24px, 3vw, 40px)' }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: '#FFC700',
          display: 'block',
          marginBottom: 16,
        }}>
          (Our Programs)({count})
        </span>
      </div>

      {/* Carousel track — CSS animation, duplicated for seamless loop */}
      <div
        className="program-carousel-track"
        style={{
          display: 'flex',
          gap: GAP,
          width: 'max-content',
          animation: `programScroll ${count * 12}s linear infinite`,
          cursor: 'grab',
        }}
      >
        {/* Render 3x for seamless infinite loop */}
        {[0, 1, 2].map((copy) =>
          programs.map((prog) => (
            <Link
              key={`${copy}-${prog.slug}`}
              href={`/our-programs/${prog.slug}`}
              className="program-carousel-card"
              style={{
                flex: `0 0 ${CARD_W}px`,
                height: CARD_H,
                borderRadius: 16,
                overflow: 'hidden',
                textDecoration: 'none',
                position: 'relative',
                display: 'block',
              }}
            >
              {/* Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prog.heroImage || '/images/gallery/IMG_1311.jpg'}
                alt={`${prog.title} — IBTU`}
                draggable={false}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(1.05) saturate(1.15)',
                  transition: 'transform 0.6s var(--ease-out-expo)',
                }}
              />
              {/* Iridescent name bar */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'var(--holo-gradient)',
                backgroundSize: '600% 600%',
                animation: 'holo-shift 20s ease infinite',
                padding: 'clamp(12px, 1.5vw, 20px)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#000',
                  letterSpacing: '1px',
                  margin: 0,
                }}>
                  {prog.title}
                </h3>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#000',
                }}>
                  {prog.pillar}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

      <style>{`
        @keyframes programScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${trackWidth}px); }
        }
        .program-carousel-track:hover {
          animation-play-state: paused;
        }
        .program-carousel-card:hover img {
          transform: scale(1.05);
          filter: brightness(0) !important;
        }
        .program-carousel-card:hover div[style*="holo-gradient"] {
          background: #000 !important;
        }
        .program-carousel-card:hover div[style*="holo-gradient"] h3,
        .program-carousel-card:hover div[style*="holo-gradient"] span {
          color: #FFC700 !important;
        }
        .program-carousel-card {
          box-shadow: 0 8px 32px -8px #000;
          transition: transform 0.35s var(--ease-out-expo), box-shadow 0.35s;
        }
        .program-carousel-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px -8px #000;
        }
      `}</style>
    </section>
  )
}
