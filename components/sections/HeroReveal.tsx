'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

/* ═══════════════════════════════════════
   HERO REVEAL — Homepage hero
   1. "IT'S BIGGER THAN US" wipes in on yellow
   2. Logo circle-wipes on iridescent bg
   3. Logo zooms through → reveals fullscreen video
   4. Video plays to completion
   5. Video fades out → volunteer section revealed
═══════════════════════════════════════ */

export default function HeroReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftTextRef = useRef<HTMLSpanElement>(null)
  const rightTextRef = useRef<HTMLSpanElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const iridBgRef = useRef<HTMLDivElement>(null)
  const videoLayerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const splitRef = useRef<HTMLDivElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  const handleVideoEnd = useCallback(() => {
    if (!videoLayerRef.current || !splitRef.current) return

    const tl = gsap.timeline()
    tl.to(videoLayerRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    })
    tl.to(
      splitRef.current,
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.6',
    )
  }, [])

  useEffect(() => {
    if (
      !leftTextRef.current ||
      !rightTextRef.current ||
      !textContainerRef.current ||
      !logoRef.current ||
      !iridBgRef.current ||
      !videoLayerRef.current ||
      !splitRef.current
    ) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Setup: hide layers
      gsap.set(logoRef.current!, { opacity: 0 })
      gsap.set(iridBgRef.current!, { opacity: 0 })
      gsap.set(videoLayerRef.current!, { opacity: 0 })
      gsap.set(splitRef.current!, { opacity: 0 })

      // ─── Phase 1: Text wipes in from both sides (yellow bg) ───
      tl.fromTo(
        leftTextRef.current!,
        { x: '-120%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.6, ease: 'power3.out' },
        0,
      )
      tl.fromTo(
        rightTextRef.current!,
        { x: '120%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.6, ease: 'power3.out' },
        0,
      )

      // Hold on the title
      tl.to({}, { duration: 0.4 })

      // ─── Phase 2: Text fades, iridescent bg, logo circle-wipe ───
      tl.to(textContainerRef.current!, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: 'power2.in',
      })

      tl.to(iridBgRef.current!, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })

      tl.set(logoRef.current!, { opacity: 1, scale: 0.05 })
      tl.fromTo(
        logoRef.current!,
        { clipPath: 'circle(0% at 50% 50%)', scale: 0.05 },
        {
          clipPath: 'circle(60% at 50% 50%)',
          scale: 1,
          duration: 0.7,
          ease: 'expo.out',
        },
      )

      // Hold on logo
      tl.to({}, { duration: 0.2 })

      // ─── Phase 3: Logo zooms through → video revealed ───
      // Bring video layer visible behind logo
      tl.to(videoLayerRef.current!, {
        opacity: 1,
        duration: 0.2,
      }, '-=0.1')

      tl.to(logoRef.current!, {
        scale: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.in',
      })

      tl.to(iridBgRef.current!, {
        opacity: 0,
        duration: 0.3,
      }, '-=0.4')

      // Start video playback once animation reveals it
      tl.call(() => {
        setVideoReady(true)
      })

      // Fade out the text container and yellow bg
      tl.to(textContainerRef.current!, {
        display: 'none',
        duration: 0,
      })
    })

    return () => ctx.revert()
  }, [])

  // Play video when ready
  useEffect(() => {
    if (videoReady && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — reveal volunteer section directly
        handleVideoEnd()
      })
    }
  }, [videoReady, handleVideoEnd])

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        background: '#FFC700',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ─── Phase 1: Text wipe (yellow bg shows through) ─── */}
      <div
        ref={textContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 12vw, 200px)',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            color: '#000',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            ref={leftTextRef}
            style={{
              display: 'block',
              opacity: 0,
              willChange: 'transform, opacity',
              whiteSpace: 'nowrap',
            }}
          >
            IT&apos;S BIGGER
          </span>
          <span
            ref={rightTextRef}
            style={{
              display: 'block',
              opacity: 0,
              willChange: 'transform, opacity',
              whiteSpace: 'nowrap',
            }}
          >
            THAN US
          </span>
        </h1>
      </div>

      {/* ─── Iridescent background (behind logo) ─── */}
      <div
        ref={iridBgRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 9,
          background: 'var(--holo-gradient)',
          backgroundSize: '600% 600%',
          animation: 'holo-shift 20s ease infinite',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ─── Phase 2: Logo circle-wipe ─── */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          zIndex: 11,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(200px, 30vw, 400px)',
          height: 'clamp(200px, 30vw, 400px)',
          opacity: 0,
          clipPath: 'circle(0% at 50% 50%)',
          transformOrigin: 'center center',
          willChange: 'transform, clip-path, opacity',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ibtu-logo.svg"
          alt="IBTU Logo"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* ─── Phase 3: Fullscreen video (plays after logo reveal) ─── */}
      <div
        ref={videoLayerRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          background: '#000',
          opacity: 0,
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="https://cdn.sanity.io/files/0m4ngfcw/production/260586a73e01013647f309c3cea587f3e934a1b3.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ─── Phase 4: Volunteer section (revealed when video ends) ─── */}
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
        {/* Left: Text content — yellow bg */}
        <div
          style={{
            width: '50%',
            background: '#FFC700',
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
              color: '#000',
              marginBottom: 20,
              display: 'block',
              fontWeight: 700,
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
              color: '#000',
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
              color: '#000',
              lineHeight: 1.7,
              fontWeight: 700,
              maxWidth: 520,
              marginBottom: 32,
            }}
          >
            Behind every backpack, every meal, every family who walks into the Hub and finds someone who listens — there is a volunteer who said yes. 7,500 people have built this alongside us, and every one of them changed what was possible for a neighbor they may never meet. That is what community infrastructure looks like. There is room for you.
          </p>

          <a
            href="https://volunteer.bloomerang.co/volunteer/#/join-party?k=u9uiz8g1753qfr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#000',
              color: '#FFC700',
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

        {/* Right: Coastal cleanup photo */}
        <div
          style={{
            width: '50%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/coastal/IMG_4926.jpg"
            alt="IBTU branded bucket during Coastal Care beach cleanup at Venice Beach"
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
