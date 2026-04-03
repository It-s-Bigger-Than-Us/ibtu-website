'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

/**
 * GET INVOLVED HERO — iridescent background with horizontal
 * auto-scrolling photo strip and headline overlay.
 * Photos scroll continuously, speed up on hover.
 * Background transitions from gold → iridescent.
 */

interface GetInvolvedHeroProps {
  images: string[]
}

export default function GetInvolvedHero({ images }: GetInvolvedHeroProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const speedRef = useRef(1)
  const [hovered, setHovered] = useState(false)

  const scroll = useCallback(() => {
    if (!stripRef.current) {
      rafRef.current = requestAnimationFrame(scroll)
      return
    }

    const target = hovered ? 2.5 : 1
    speedRef.current += (target - speedRef.current) * 0.05
    stripRef.current.scrollLeft += speedRef.current

    // Seamless loop
    const maxScroll = stripRef.current.scrollWidth - stripRef.current.clientWidth
    if (stripRef.current.scrollLeft >= maxScroll - 1) {
      stripRef.current.scrollLeft = 0
    }

    rafRef.current = requestAnimationFrame(scroll)
  }, [hovered])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(rafRef.current)
  }, [scroll])

  // Triple images for seamless loop
  const loopImages = [...images, ...images, ...images]

  return (
    <section
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--holo-gradient)',
        backgroundSize: '600% 600%',
        animation: 'holo-shift 20s ease infinite',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Photo strip — auto-scrolling */}
      <div
        ref={stripRef}
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'hidden',
          padding: '24px 0',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '100%',
        }}
      >
        {loopImages.map((src, i) => (
          <div
            key={`${src}-${i}`}
            style={{
              flexShrink: 0,
              width: 'clamp(200px, 18vw, 280px)',
              height: 'clamp(260px, 24vw, 360px)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="IBTU community"
              loading={i < 6 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(1.05) saturate(1.15)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay for text legibility */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.5) 100%)',
        zIndex: 1,
      }} />

      {/* Content overlay */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(120px, 15vh, 200px) clamp(32px, 5vw, 80px) clamp(80px, 10vw, 140px)',
        maxWidth: 'var(--content-max)',
      }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#FFC700',
          fontWeight: 700,
          marginBottom: 20,
        }}>
          GET INVOLVED
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 10vw, 160px)',
          lineHeight: 0.88,
          textTransform: 'uppercase',
          color: '#FFF',
          letterSpacing: '-0.03em',
          marginBottom: 24,
        }}>
          There Is a Role for You Here
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(15px, 1.3vw, 20px)',
          color: '#FFF',
          lineHeight: 1.7,
          maxWidth: 600,
          fontWeight: 700,
          marginBottom: 40,
        }}>
          Behind every number is a neighbor who said yes. 7,500+ volunteers. 300+ partners. One city building together.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a
            href="#volunteer"
            style={{
              display: 'inline-block',
              background: '#FFC700',
              color: '#000',
              padding: '16px 40px',
              borderRadius: '4px',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Find Your Role
          </a>
          <a
            href="#donate"
            style={{
              display: 'inline-block',
              border: '2px solid #FFC700',
              color: '#FFC700',
              padding: '16px 40px',
              borderRadius: '4px',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Donate
          </a>
        </div>
      </div>
    </section>
  )
}
