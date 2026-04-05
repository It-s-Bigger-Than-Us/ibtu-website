'use client'

import Image from 'next/image'

/* ═══════════════════════════════════════
   GET INVOLVED HERO — Simple full-bleed tiled gallery
   Sky background, gold type, photos tiled edge-to-edge
   with no gaps, no animation complexity.
═══════════════════════════════════════ */

interface GetInvolvedHeroProps {
  images: string[]
}

export default function GetInvolvedHero({ images }: GetInvolvedHeroProps) {
  const displayImages = images.length >= 12
    ? images.slice(0, 12)
    : [...images, ...images, ...images].slice(0, 12)

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Sky background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <Image
          src="/images/blue-sky.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          style={{
            objectFit: 'cover',
            animation: 'skyPan 60s linear infinite',
            transform: 'scale(1.2)',
          }}
        />
      </div>

      {/* Title overlay */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: 'clamp(120px, 15vh, 180px) clamp(32px, 5vw, 80px) clamp(40px, 5vh, 60px)',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 10vw, 140px)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#FFC700',
          textShadow: '0 2px 20px rgba(0,0,0,0.15)',
        }}>
          There Is a Role for You Here
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(13px, 1.1vw, 16px)',
          lineHeight: 1.5,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: '#FFC700',
          maxWidth: 480,
          margin: '24px auto 0',
          fontWeight: 700,
        }}>
          Behind every number is a neighbor who said yes. 7,500+ volunteers. 300+ partners. One city building together.
        </p>
      </div>

      {/* Full-bleed tiled photo grid — no gaps */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        width: '100%',
        aspectRatio: '16 / 9',
      }}>
        {displayImages.map((src, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={i}
            src={src}
            alt={`IBTU community ${i + 1}`}
            loading={i < 8 ? 'eager' : 'lazy'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'brightness(1.05) saturate(1.15)',
            }}
          />
        ))}
      </div>

      {/* Responsive: 3 cols on tablet, 2 on mobile */}
      <style>{`
        @media (max-width: 768px) {
          section > div:last-of-type {
            grid-template-columns: repeat(3, 1fr) !important;
            aspect-ratio: 4 / 3 !important;
          }
        }
        @media (max-width: 480px) {
          section > div:last-of-type {
            grid-template-columns: repeat(2, 1fr) !important;
            aspect-ratio: 1 / 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
