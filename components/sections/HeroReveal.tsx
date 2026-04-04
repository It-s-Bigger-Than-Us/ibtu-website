'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

/* ═══════════════════════════════════════
   HERO REVEAL — Full homepage hero
   1. "IT'S BIGGER THAN US" text wipes in from sides
   2. IBTU logo circle-wipes in from center
   3. Logo zooms forward to reveal split content
   Total animation: ~3 seconds
═══════════════════════════════════════ */

export default function HeroReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftTextRef = useRef<HTMLSpanElement>(null)
  const rightTextRef = useRef<HTMLSpanElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const splitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      !leftTextRef.current ||
      !rightTextRef.current ||
      !textContainerRef.current ||
      !logoRef.current ||
      !splitRef.current
    ) return

    const tl = gsap.timeline()

    // Setup: hide everything initially
    gsap.set(logoRef.current, { opacity: 0, scale: 0.15 })
    gsap.set(splitRef.current, { opacity: 0 })

    // ─── Phase 1: Text wipes in from both sides (~0.8s) ───
    tl.fromTo(
      leftTextRef.current,
      { x: '-110%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' },
      0,
    )
    tl.fromTo(
      rightTextRef.current,
      { x: '110%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' },
      0,
    )

    // Brief hold
    tl.to({}, { duration: 0.3 })

    // ─── Phase 2: Text fades, logo circle-wipes in (~0.8s) ───
    tl.to(textContainerRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 0.25,
      ease: 'power2.in',
    })

    tl.to(logoRef.current, { opacity: 1, duration: 0.01 })
    tl.fromTo(
      logoRef.current,
      {
        scale: 0.6,
        clipPath: 'circle(0% at 50% 50%)',
      },
      {
        scale: 1,
        clipPath: 'circle(55% at 50% 50%)',
        duration: 0.6,
        ease: 'expo.out',
      },
    )

    // Brief hold
    tl.to({}, { duration: 0.15 })

    // ─── Phase 3: Logo zooms forward, reveals split content (~0.8s) ───
    tl.to(logoRef.current, {
      scale: 25,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    })

    // Split content fades and slides in
    tl.fromTo(
      splitRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.2',
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ─── Phase 1: Text wipe ─── */}
      <div
        ref={textContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
          overflow: 'hidden',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 12vw, 200px)',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            color: '#FFC700',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            display: 'flex',
            gap: '0.15em',
          }}
        >
          <span
            ref={leftTextRef}
            style={{
              display: 'inline-block',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            IT&apos;S BIGGER
          </span>
          <span
            ref={rightTextRef}
            style={{
              display: 'inline-block',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            THAN US
          </span>
        </h1>
      </div>

      {/* ─── Phase 2: Logo circle-wipe ─── */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          zIndex: 4,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(200px, 30vw, 400px)',
          height: 'clamp(200px, 30vw, 400px)',
          opacity: 0,
          clipPath: 'circle(0% at 50% 50%)',
          transformOrigin: 'center center',
        }}
      >
        <Image
          src="/ibtu-logo.svg"
          alt="IBTU Logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      {/* ─── Phase 3: Split-screen content ─── */}
      <div
        ref={splitRef}
        data-hero-split=""
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          zIndex: 2,
          opacity: 0,
        }}
      >
        {/* Left: Text content */}
        <div
          style={{
            width: '50%',
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(32px, 5vw, 80px)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              color: '#FFC700',
              marginBottom: 20,
              display: 'block',
            }}
          >
            Find Your Role
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 64px)',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              color: '#FFF',
              letterSpacing: '-0.02em',
              marginBottom: 24,
            }}
          >
            This Work Does Not Happen Without You.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px, 1.2vw, 18px)',
              color: '#FFF',
              lineHeight: 1.7,
              fontWeight: 700,
              maxWidth: 520,
              marginBottom: 32,
            }}
          >
            Sort relief supplies at the Hub. Run resource stations at school
            festivals. Clean Venice Beach with Coastal Care crews. Distribute
            backpacks to thousands of students. There is room for you.
          </p>

          <a
            href="https://volunteer.bloomerang.co/volunteer/#/join-party?k=u9uiz8g1753qfr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#FFC700',
              color: '#000',
              padding: '16px 40px',
              borderRadius: '16px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
              width: 'fit-content',
            }}
          >
            Volunteer &rarr;
          </a>
        </div>

        {/* Right: Full-bleed photo */}
        <div
          style={{
            width: '50%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/coastal/IMG_4838.jpg"
            alt="IBTU Coastal Care volunteers cleaning Venice Beach"
            fill
            sizes="50vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'scale(1.1)',
            }}
            priority
          />
        </div>
      </div>

      {/* ─── Mobile: Stack vertically ─── */}
      <style>{`
        @media (max-width: 768px) {
          [data-hero-split] {
            flex-direction: column !important;
          }
          [data-hero-split] > div {
            width: 100% !important;
          }
          [data-hero-split] > div:first-child {
            min-height: 55vh;
          }
          [data-hero-split] > div:last-child {
            min-height: 45vh;
          }
        }
      `}</style>
    </section>
  )
}
