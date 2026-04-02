'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

/* ═══════════════════════════════════════
   HERO REVEAL — Text + Logo only
   1. "It's Bigger Than Us" — JUSTIFIED, each word SLAMS
      in with personality — scale, rotation, bounce
   2. Logo WIPES IN from center (clip-path from center)
      and grows dramatically
   3. Logo BUSTS out of the window to reveal gallery below
   Gallery is a separate component (GalleryCarousel3D)
═══════════════════════════════════════ */

export default function HeroReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current || !logoRef.current) return

    const words = textRef.current.querySelectorAll('.hero-word')
    const tl = gsap.timeline()

    // Phase 1: Each word SLAMS in with unique personality
    const entrances = [
      { y: 300, scale: 3, rotation: -8, ease: 'back.out(2.2)' },   // It's
      { y: -250, scale: 2.8, rotation: 5, ease: 'elastic.out(1, 0.5)' },   // Bigger
      { y: 200, scale: 2.5, rotation: -3, ease: 'back.out(1.8)' },  // Than
      { y: 350, scale: 3.5, rotation: 0, ease: 'expo.out' },         // Us
    ]

    words.forEach((word, i) => {
      const e = entrances[i]
      tl.fromTo(
        word,
        { opacity: 0, y: e.y, scale: e.scale, rotation: e.rotation },
        { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.7, ease: e.ease },
        i * 0.35,
      )
      // Impact bounce
      tl.to(word, { scale: 1.15, duration: 0.08, ease: 'power4.out' }, `>-0.05`)
      tl.to(word, { scale: 1, duration: 0.3, ease: 'power2.inOut' })
    })

    tl.to({}, { duration: 0.6 })

    // Phase 2: Text fades, logo wipes in FROM CENTER
    tl.to(textRef.current, { opacity: 0, scale: 0.5, duration: 0.4, ease: 'power3.in' })

    // Logo wipes in from center point outward
    tl.fromTo(
      logoRef.current,
      { opacity: 1, scale: 0.2, clipPath: 'circle(0% at 50% 50%)' },
      { scale: 1, clipPath: 'circle(100% at 50% 50%)', duration: 1.2, ease: 'expo.out' },
    )

    // Logo breathes once
    tl.to(logoRef.current, { scale: 1.1, duration: 0.35, ease: 'power2.out' })
    tl.to(logoRef.current, { scale: 1, duration: 0.25, ease: 'power2.in' })
    tl.to({}, { duration: 0.25 })

    // Phase 3: Logo grows DRAMATICALLY — busts out of the window
    tl.to(logoRef.current, {
      scale: 40,
      opacity: 0,
      duration: 1,
      ease: 'power4.in',
    })

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
      {/* Phase 1: Words — justified, fill width */}
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
            fontSize: 'clamp(72px, 20vw, 340px)',
            lineHeight: 0.82,
            textTransform: 'uppercase',
            color: '#000',
            letterSpacing: '-0.04em',
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
            <span key={i} className="hero-word" style={{
              display: 'inline-block',
              opacity: 0,
              transformOrigin: 'center bottom',
              willChange: 'transform, opacity',
            }}>
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
          width: 'clamp(180px, 25vw, 340px)',
          height: 'clamp(180px, 25vw, 340px)',
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image src="/images/ibtu-logo.svg" alt="IBTU Logo" fill style={{ objectFit: 'contain', filter: 'brightness(0)' }} priority />
        </div>
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #FFC700 0%, #FFD84D 15%, #FFF 30%, #000 50%, #FFC700 70%, #FFFBE6 85%, #FFC700 100%)',
            backgroundSize: '300% 300%',
            animation: 'iriLogoShift 4s ease-in-out infinite',
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
