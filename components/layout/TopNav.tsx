'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import MenuDropdown from './MenuDropdown'
import gsap from 'gsap'

/* ═══════════════════════════════════════
   TOP NAV — Editorial, compact, animated
   Logo coin (gold bg, black IBTU, spinning)
   Hamburger below logo
   Iridescent donate button slides from logo on hover
   Changes messaging while scrolling
═══════════════════════════════════════ */

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docH > 0 ? Math.min(y / docH, 1) : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Spin the logo continuously
  useEffect(() => {
    if (!logoRef.current) return
    gsap.to(logoRef.current, {
      rotateY: 360,
      duration: 8,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Dynamic CTA text based on scroll position
  const ctaText = scrollProgress < 0.3 ? 'Donate' : scrollProgress < 0.7 ? 'Get Involved' : 'Join Us'
  const ctaHref = scrollProgress < 0.3 ? '/donate' : scrollProgress < 0.7 ? '/get-involved' : '/get-involved#volunteer'

  return (
    <>
      {/* ── Logo + Hamburger — fixed top-left ── */}
      <div
        style={{
          position: 'fixed',
          top: scrolled ? '12px' : '24px',
          left: '24px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          transition: 'top 0.3s var(--ease-out-expo)',
        }}
      >
        {/* Logo coin */}
        <div
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link
            href="/"
            aria-label="IBTU Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: scrolled ? '48px' : '56px',
              height: scrolled ? '48px' : '56px',
              background: 'var(--ibtu-gold)',
              borderRadius: '12px',
              perspective: '600px',
              transition: 'width 0.3s var(--ease-out-expo), height 0.3s var(--ease-out-expo)',
              flexShrink: 0,
            }}
          >
            <div
              ref={logoRef}
              style={{
                width: scrolled ? '32px' : '38px',
                height: scrolled ? '32px' : '38px',
                transformStyle: 'preserve-3d',
                transition: 'width 0.3s, height 0.3s',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ibtu-logo.svg"
                alt="IBTU"
                style={{
                  width: '100%',
                  height: '100%',
                  filter: 'brightness(0)',
                }}
              />
            </div>
          </Link>

          {/* Iridescent donate button — slides out from logo on hover */}
          <Link
            href={ctaHref}
            style={{
              position: 'absolute',
              left: scrolled ? '48px' : '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: scrolled ? '48px' : '56px',
              padding: '0 20px',
              background: '#000',
              borderRadius: '0 12px 12px 0',
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#FFC700',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: logoHovered ? '200px' : '0',
              opacity: logoHovered ? 1 : 0,
              transition: 'max-width 0.5s var(--ease-out-expo), opacity 0.3s, padding 0.5s var(--ease-out-expo)',
              ...(logoHovered ? {} : { padding: '0 0' }),
            }}
            className="iridescent-border"
          >
            {ctaText} &rarr;
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            background: 'var(--ibtu-black)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            padding: '12px',
            borderRadius: '12px',
            zIndex: 101,
            width: scrolled ? '48px' : '56px',
            height: scrolled ? '48px' : '56px',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'width 0.3s var(--ease-out-expo), height 0.3s var(--ease-out-expo)',
          }}
        >
          <span style={{
            width: '20px',
            height: '2px',
            background: 'var(--ibtu-white)',
            transition: 'transform 0.3s var(--ease-out-expo), opacity 0.3s',
            transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            width: '20px',
            height: '2px',
            background: 'var(--ibtu-white)',
            transition: 'opacity 0.3s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            width: '20px',
            height: '2px',
            background: 'var(--ibtu-white)',
            transition: 'transform 0.3s var(--ease-out-expo), opacity 0.3s',
            transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </div>

      {/* ── Full-screen gold menu dropdown ── */}
      <MenuDropdown open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
