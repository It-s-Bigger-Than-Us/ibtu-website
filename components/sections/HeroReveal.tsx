'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

/* ═══════════════════════════════════════
   HERO REVEAL
   1. "It's Bigger Than Us" — justified, each word SLAMS in
   2. Logo wipes in from center and grows (NO orbital spin)
   3. Logo becomes a window — zoom THROUGH it
   4. Cuts to 3D perspective card gallery below

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
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current || !logoRef.current || !galleryRef.current) return

    const words = textRef.current.querySelectorAll('.hero-word')
    const cards = galleryRef.current.querySelectorAll('.gallery-card')
    const tl = gsap.timeline()

    // ── Phase 1: Words SLAM in — justified, each hits hard ──
    words.forEach((word, i) => {
      // Each word crashes in from below with massive scale + overshoot
      tl.fromTo(
        word,
        {
          opacity: 0,
          y: 200,
          scale: 2.5,
          rotateX: -45,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        i * 0.4, // deliberate pause — let each word breathe
      )
      // HARD impact pulse
      tl.to(word, {
        scale: 1.12,
        letterSpacing: '0.05em',
        duration: 0.1,
        ease: 'power4.out',
      }, `>-0.05`)
      tl.to(word, {
        scale: 1,
        letterSpacing: '-0.03em',
        duration: 0.25,
        ease: 'power2.inOut',
      })
    })

    // Hold — let it sink in
    tl.to({}, { duration: 0.8 })

    // ── Phase 2: Text fades, logo WIPES IN from center ──
    tl.to(textRef.current, {
      opacity: 0,
      scale: 0.6,
      duration: 0.5,
      ease: 'power3.in',
    })

    // Logo wipes in from center — clip-path reveal + grows
    tl.fromTo(
      logoRef.current,
      {
        opacity: 1,
        scale: 0.3,
        clipPath: 'inset(50% 50% 50% 50%)',
      },
      {
        scale: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.0,
        ease: 'expo.out',
      },
    )

    // Logo grows slightly — breathing
    tl.to(logoRef.current, {
      scale: 1.08,
      duration: 0.4,
      ease: 'power2.out',
    })
    tl.to(logoRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.in',
    })

    // Hold logo
    tl.to({}, { duration: 0.3 })

    // ── Phase 3: Zoom THROUGH the logo like a window ──
    tl.to(logoRef.current, {
      scale: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.in',
    })

    // Simultaneously: gallery section fades in
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
        {/* Phase 1: Words — one at a time, JUSTIFIED to fill width */}
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
            perspective: '800px',
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
              <span
                key={i}
                className="hero-word"
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  transformOrigin: 'center bottom',
                }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Phase 2: Logo — wipes in from center, grows (NO spin) */}
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
          <div
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

      {/* Gallery — 3D perspective card gallery */}
      <section
        ref={galleryRef}
        style={{
          background: '#FFC700',
          padding: '0 clamp(24px, 5vw, 80px) 80px',
          opacity: 0,
          perspective: '1200px',
        }}
      >
        <div
          className="hero-gallery-3d"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
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
                boxShadow: '0 8px 32px -8px #000',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s var(--ease-out-expo), box-shadow 0.5s var(--ease-out-expo)',
                transform: `rotateY(${(i % 5 - 2) * 3}deg) rotateX(${(i % 3 - 1) * 2}deg)`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                const rect = el.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width - 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5
                el.style.transform = `perspective(800px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.05) translateZ(30px)`
                el.style.boxShadow = '0 20px 60px -12px #000'
              }}
              onMouseMove={(e) => {
                const el = e.currentTarget
                const rect = el.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width - 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5
                el.style.transform = `perspective(800px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.05) translateZ(30px)`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = `rotateY(${(i % 5 - 2) * 3}deg) rotateX(${(i % 3 - 1) * 2}deg)`
                el.style.boxShadow = '0 8px 32px -8px #000'
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
