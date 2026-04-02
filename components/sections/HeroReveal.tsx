'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

/* ═══════════════════════════════════════
   HERO REVEAL — Flat, no 3D
   Phase 1: "It's Bigger Than Us" words animate in separately on gold bg
   Phase 2: Text fades → flat IBTU logo fades in, one clean rotation
   Phase 3: Logo shrinks up → reveals scrollable gallery below

   Pure CSS + GSAP. No R3F, no Canvas, no Three.js.
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
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    if (!textRef.current || !logoRef.current || !galleryRef.current) return

    const words = textRef.current.querySelectorAll('.hero-word')
    const tl = gsap.timeline()

    // Phase 1: Each word animates in separately
    words.forEach((word, i) => {
      tl.fromTo(
        word,
        { opacity: 0, y: 60, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'expo.out' },
        i * 0.18,
      )
    })

    // Hold for a beat
    tl.to({}, { duration: 0.8 })

    // Phase 2: Text fades out
    tl.to(textRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.in',
    })

    // Logo fades in with one rotation
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 1.5, rotation: -360 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'expo.out' },
      '-=0.2',
    )

    // Hold logo
    tl.to({}, { duration: 0.6 })

    // Phase 3: Logo shrinks up, gallery reveals
    tl.to(logoRef.current, {
      scale: 0.3,
      y: '-30vh',
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => setShowGallery(true),
    })

    // Gallery cards stagger in
    tl.fromTo(
      '.gallery-card',
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'expo.out',
        stagger: { each: 0.04, from: 'center' },
      },
    )

    return () => { tl.kill() }
  }, [])

  return (
    <>
      {/* Hero section — gold bg, text + logo animation */}
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
              fontSize: 'clamp(56px, 14vw, 220px)',
              lineHeight: 0.9,
              textTransform: 'uppercase',
              color: '#000',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0 0.3em',
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

        {/* Phase 2: Flat logo */}
        <div
          ref={logoRef}
          style={{
            position: 'absolute',
            zIndex: 3,
            opacity: 0,
            width: 'clamp(180px, 25vw, 350px)',
            height: 'clamp(180px, 25vw, 350px)',
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
      </section>

      {/* Gallery — revealed after animation, lives BELOW the hero */}
      <section
        style={{
          background: '#FFC700',
          padding: '0 clamp(24px, 5vw, 80px) 80px',
          minHeight: showGallery ? 'auto' : 0,
          overflow: 'hidden',
        }}
      >
        <div
          ref={galleryRef}
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
