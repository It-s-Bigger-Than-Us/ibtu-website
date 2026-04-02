'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

/* ═══════════════════════════════════════
   HERO REVEAL
   1. "It's Bigger Than Us" — one word at a time, BIG personality
   2. Logo orbital wipe in (spins around, lands center)
   3. Logo becomes a window — zoom THROUGH it
   4. Cuts to photo gallery below

   Pure CSS + GSAP. No R3F.
═══════════════════════════════════════ */

const GALLERY_IMAGES = [
  { src: '/images/b2s/_D5A7392.jpg', alt: 'Back 2 School' },
  { src: '/images/coastal/IMG_4838.jpg', alt: 'Coastal Care' },
  { src: '/images/gallery/IMG_1311.jpg', alt: 'Community' },
  { src: '/images/school/IMG_5608.jpg', alt: 'School Program' },
  { src: '/images/wellness/IMG_9922.jpg', alt: 'Wellness' },
  { src: '/images/b2s/_D5A5912.jpg', alt: 'Back 2 School' },
  { src: '/images/coastal/IMG_0267.jpg', alt: 'Coastal Care' },
  { src: '/images/gallery/IMG_4353.jpg', alt: 'Gallery' },
  { src: '/images/school/IMG_4674.jpg', alt: 'School Program' },
  { src: '/images/b2s/_D5A7155.jpg', alt: 'Back 2 School' },
  { src: '/images/coastal/IMG_1778.jpg', alt: 'Coastal Care' },
  { src: '/images/gallery/IMG_4649.jpg', alt: 'Gallery' },
  { src: '/images/school/IMG_6134.jpg', alt: 'School Program' },
  { src: '/images/wellness/IMG_0279.jpg', alt: 'Wellness' },
  { src: '/images/b2s/_D5A8212.jpg', alt: 'Back 2 School' },
  { src: '/images/coastal/IMG_4805.jpg', alt: 'Coastal Care' },
  { src: '/images/gallery/IMG_1673.jpg', alt: 'Gallery' },
  { src: '/images/school/IMG_7067.jpg', alt: 'School Program' },
  { src: '/images/b2s/_D5A6099.jpg', alt: 'Back 2 School' },
  { src: '/images/coastal/IMG_4953.jpg', alt: 'Coastal Care' },
  { src: '/images/gallery/IMG_4907.jpg', alt: 'Gallery' },
  { src: '/images/school/IMG_5884.jpg', alt: 'School Program' },
  { src: '/images/wellness/IMG_1610.jpg', alt: 'Wellness' },
  { src: '/images/b2s/_D5A7604.jpg', alt: 'Back 2 School' },
]

export default function HeroReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const logoWindowRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current || !logoRef.current || !logoWindowRef.current || !galleryRef.current) return

    const words = textRef.current.querySelectorAll('.hero-word')
    const cards = galleryRef.current.querySelectorAll('.gallery-card')
    const tl = gsap.timeline()

    // ── Phase 1: Words animate in one at a time with PERSONALITY ──
    words.forEach((word, i) => {
      // Each word slams in from below with overshoot
      tl.fromTo(
        word,
        {
          opacity: 0,
          y: 120,
          scale: 1.4,
          rotateZ: i % 2 === 0 ? -8 : 8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateZ: 0,
          duration: 0.5,
          ease: 'back.out(2)',
        },
        i * 0.35, // deliberate pause between each word
      )
      // Quick emphasis pulse on each word after landing
      tl.to(word, {
        scale: 1.05,
        duration: 0.15,
        ease: 'power2.out',
      }, `>-0.1`)
      tl.to(word, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.in',
      })
    })

    // Hold — let it breathe
    tl.to({}, { duration: 0.6 })

    // ── Phase 2: Text fades, logo orbital wipe in ──
    tl.to(textRef.current, {
      opacity: 0,
      scale: 0.7,
      duration: 0.4,
      ease: 'power3.in',
    })

    // Logo enters with orbital spin (like it's flying in from far away, orbiting around)
    tl.fromTo(
      logoRef.current,
      {
        opacity: 0,
        scale: 0.1,
        rotation: -720, // 2 full spins
        x: 300,
        y: -200,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'expo.out',
      },
    )

    // Hold logo
    tl.to({}, { duration: 0.4 })

    // ── Phase 3: Zoom THROUGH the logo like a window ──
    // Logo scales up massively (we fly through it)
    tl.to(logoRef.current, {
      scale: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.in',
    })

    // Simultaneously: gallery section fades in (we've "arrived" through the window)
    tl.fromTo(
      galleryRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      '-=0.3',
    )

    // Gallery cards stagger in from center outward
    tl.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'expo.out',
        stagger: { each: 0.04, from: 'center' },
      },
    )

    return () => { tl.kill() }
  }, [])

  return (
    <>
      {/* Hero — gold bg, text + logo animation */}
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
        {/* Phase 1: Words — one at a time */}
        <div
          ref={textRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            padding: '0 clamp(24px, 5vw, 80px)',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px, 16vw, 260px)',
              lineHeight: 0.85,
              textTransform: 'uppercase',
              color: '#000',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0 0.25em',
            }}
          >
            {["It's", 'Bigger', 'Than', 'Us'].map((word, i) => (
              <span
                key={i}
                className="hero-word"
                style={{ display: 'inline-block', opacity: 0 }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Phase 2: Logo — orbital entry + becomes window */}
        <div
          ref={logoRef}
          style={{
            position: 'absolute',
            zIndex: 3,
            opacity: 0,
            width: 'clamp(160px, 22vw, 300px)',
            height: 'clamp(160px, 22vw, 300px)',
          }}
        >
          {/* Logo window frame */}
          <div
            ref={logoWindowRef}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            <Image
              src="/images/ibtu-logo.svg"
              alt="IBTU Logo"
              fill
              style={{ objectFit: 'contain', filter: 'brightness(0)' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Gallery — revealed after flying through the logo */}
      <section
        ref={galleryRef}
        style={{
          background: '#FFC700',
          padding: '0 clamp(24px, 5vw, 80px) 80px',
          opacity: 0,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="gallery-card"
              style={{
                opacity: 0,
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                position: 'relative',
                background: '#000',
                boxShadow: '0 4px 24px -4px #000',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = 'scale(1.03) translateY(-4px)'
                el.style.boxShadow = '0 12px 40px -8px #000'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = ''
                el.style.boxShadow = '0 4px 24px -4px #000'
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{
                  objectFit: 'cover',
                  filter: 'brightness(1.1) saturate(1.2)',
                }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
