'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MenuDropdown from './MenuDropdown'

/* ═══════════════════════════════════════
   TOP NAV — Editorial, compact, animated
   Logo coin (gold bg, black IBTU)
   Hamburger below logo
   Iridescent stroke on hover → iridescent fill
   on both hamburger button and logo container.
   NO dynamic CTA text. NO orbital spin.
═══════════════════════════════════════ */

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)
  const [hamburgerHovered, setHamburgerHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

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
          flexDirection: 'column' as const,
          alignItems: 'center',
          gap: '8px',
          transition: 'top 0.3s var(--ease-out-expo)',
        }}
      >
        {/* Logo coin — iridescent stroke on hover, fill on active */}
        <Link
          href="/"
          aria-label="IBTU Home"
          className="iridescent-border"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: scrolled ? '48px' : '56px',
            height: scrolled ? '48px' : '56px',
            background: logoHovered
              ? 'linear-gradient(135deg, #FFC700, #FFF, #FFC700, #C8F0FF, #FFC700)'
              : 'var(--ibtu-gold)',
            backgroundSize: logoHovered ? '400% 400%' : undefined,
            animation: logoHovered ? 'holo-shift 3s ease infinite' : undefined,
            borderRadius: '12px',
            transition: 'width 0.3s var(--ease-out-expo), height 0.3s var(--ease-out-expo), background 0.4s',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: scrolled ? '32px' : '38px',
              height: scrolled ? '32px' : '38px',
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

        {/* Hamburger — iridescent stroke on hover, fill on active */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          onMouseEnter={() => setHamburgerHovered(true)}
          onMouseLeave={() => setHamburgerHovered(false)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="iridescent-border"
          style={{
            background: hamburgerHovered
              ? 'linear-gradient(135deg, #000, #1a1a1a, #000, #1a1a1a, #000)'
              : 'var(--ibtu-black)',
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
            background: hamburgerHovered
              ? 'var(--ibtu-gold)'
              : 'var(--ibtu-white)',
            transition: 'transform 0.3s var(--ease-out-expo), opacity 0.3s, background 0.3s',
            transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            width: '20px',
            height: '2px',
            background: hamburgerHovered
              ? 'var(--ibtu-gold)'
              : 'var(--ibtu-white)',
            transition: 'opacity 0.3s, background 0.3s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            width: '20px',
            height: '2px',
            background: hamburgerHovered
              ? 'var(--ibtu-gold)'
              : 'var(--ibtu-white)',
            transition: 'transform 0.3s var(--ease-out-expo), opacity 0.3s, background 0.3s',
            transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </div>

      {/* ── Full-screen gold menu dropdown ── */}
      <MenuDropdown open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
