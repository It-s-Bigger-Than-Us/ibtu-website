'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

/* ═══════════════════════════════════════
   HERO REVEAL — Text + Logo only
   1. "It's Bigger Than Us" — justified, each word SLAMS in
   2. Logo wipes in from center and grows dramatically
   3. Logo bursts out of the window
   Gallery is now a separate component (GalleryCarousel3D)
═══════════════════════════════════════ */

export default function HeroReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current || !logoRef.current) return

    const words = textRef.current.querySelectorAll('.hero-word')
    const tl = gsap.timeline()

    // Phase 1: Words SLAM in — justified, each hits hard
    words.forEach((word, i) => {
      tl.fromTo(
        word,
        { opacity: 0, y: 200, scale: 2.5, rotateX: -45 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.6, ease: 'back.out(1.7)' },
        i * 0.4,
      )
      tl.to(word, { scale: 1.12, letterSpacing: '0.05em', duration: 0.1, ease: 'power4.out' }, `>-0.05`)
      tl.to(word, { scale: 1, letterSpacing: '-0.03em', duration: 0.25, ease: 'power2.inOut' })
    })

    tl.to({}, { duration: 0.8 })

    // Phase 2: Text fades, logo wipes in from center
    tl.to(textRef.current, { opacity: 0, scale: 0.6, duration: 0.5, ease: 'power3.in' })

    tl.fromTo(
      logoRef.current,
      { opacity: 1, scale: 0.3, clipPath: 'inset(50% 50% 50% 50%)' },
      { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'expo.out' },
    )

    // Logo breathes
    tl.to(logoRef.current, { scale: 1.08, duration: 0.4, ease: 'power2.out' })
    tl.to(logoRef.current, { scale: 1, duration: 0.3, ease: 'power2.in' })
    tl.to({}, { duration: 0.3 })

    // Phase 3: Logo grows dramatically — bursts out of the window
    tl.to(logoRef.current, { scale: 30, opacity: 0, duration: 0.8, ease: 'power3.in' })

    return () => { tl.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        background: '#FFC700',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Phase 1: Words */}
      <div
        ref={textRef}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2, padding: '0 clamp(24px, 5vw, 80px)', perspective: '800px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(64px, 18vw, 300px)',
            lineHeight: 0.85,
            textTransform: 'uppercase',
            color: '#000',
            letterSpacing: '-0.03em',
            textAlign: 'justify',
            textAlignLast: 'justify',
            width: '100%',
            maxWidth: 'var(--content-max)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {["It's", 'Bigger', 'Than', 'Us'].map((word, i) => (
            <span key={i} className="hero-word" style={{ display: 'inline-block', opacity: 0, transformOrigin: 'center bottom' }}>
              {word}
            </span>
          ))}
        </h1>
      </div>

      {/* Phase 2: Logo with iridescent overlay */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute', zIndex: 3, opacity: 0,
          width: 'clamp(160px, 22vw, 300px)',
          height: 'clamp(160px, 22vw, 300px)',
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image src="/images/ibtu-logo.svg" alt="IBTU Logo" fill style={{ objectFit: 'contain', filter: 'brightness(0)' }} priority />
        </div>
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(120deg, #FFC700 0%, #FFF 20%, #000 35%, #FFC700 50%, #FFF 65%, #000 80%, #FFC700 100%)',
            backgroundSize: '300% 300%',
            animation: 'iriLogoShift 3s ease-in-out infinite',
            WebkitMaskImage: 'url(/images/ibtu-logo.svg)', WebkitMaskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat',
            maskImage: 'url(/images/ibtu-logo.svg)', maskSize: '100% 100%', maskRepeat: 'no-repeat',
            pointerEvents: 'none',
          }}
        />
      </div>

      <style>{`
        @keyframes iriLogoShift {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 50% 100%; }
          75% { background-position: 0% 50%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
    </section>
  )
}
