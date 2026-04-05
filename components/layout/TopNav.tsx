'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MenuDropdown from './MenuDropdown'

/* ═══════════════════════════════════════
   TOP NAV — Editorial, compact, animated
   Single row: Logo | Hamburger | Donate
   All left-aligned. Iridescent stroke → fill.
   NO dynamic CTA text.
   FIX: Balanced spacing (top = left = 24px)
   FIX: Body scroll lock when menu open
═══════════════════════════════════════ */

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [donateHovered, setDonateHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      // Also pause Lenis if available
      const lenis = (window as unknown as Record<string, { stop?: () => void; start?: () => void }>).__lenis
      lenis?.stop?.()
    } else {
      document.body.style.overflow = ''
      const lenis = (window as unknown as Record<string, { stop?: () => void; start?: () => void }>).__lenis
      lenis?.start?.()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const coinSize = scrolled ? 48 : 56
  const iconSize = scrolled ? 32 : 38
  // Balanced spacing: top matches left
  const edgeOffset = 24

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: `${scrolled ? 12 : edgeOffset}px`,
          left: `${edgeOffset}px`,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '8px',
          transition: 'top 0.3s var(--ease-out-expo)',
        }}
      >
        {/* Logo coin — iridescent border on hover */}
          <Link
            href="/"
            aria-label="IBTU Home"
            className="iridescent-border"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: `${coinSize}px`,
              height: `${coinSize}px`,
              background: 'var(--holo-gradient)',
              backgroundSize: '400% 400%',
              borderRadius: '12px',
              transition: 'width 0.3s var(--ease-out-expo), height 0.3s var(--ease-out-expo)',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
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

          {/* Hamburger — between logo and donate */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="iridescent-border"
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
              width: `${coinSize}px`,
              height: `${coinSize}px`,
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'width 0.3s var(--ease-out-expo), height 0.3s var(--ease-out-expo)',
            }}
          >
            <span style={{
              width: '20px',
              height: '2px',
              background: 'var(--ibtu-gold)',
              transition: 'transform 0.3s var(--ease-out-expo), opacity 0.3s',
              transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              width: '20px',
              height: '2px',
              background: 'var(--ibtu-gold)',
              transition: 'opacity 0.3s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              width: '20px',
              height: '2px',
              background: 'var(--ibtu-gold)',
              transition: 'transform 0.3s var(--ease-out-expo), opacity 0.3s',
              transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }} />
          </button>

          {/* Donate button — after hamburger */}
          <a
            href="https://secure.qgiv.com/for/ibt/"
            target="_blank"
            rel="noopener noreferrer"
            className="iridescent-border"
            onMouseEnter={() => setDonateHovered(true)}
            onMouseLeave={() => setDonateHovered(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: `${coinSize}px`,
              padding: '0 16px',
              background: 'var(--holo-gradient)',
              backgroundSize: '400% 400%',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'background 0.4s, height 0.3s var(--ease-out-expo)',
              cursor: 'pointer',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: donateHovered ? '#FFF' : 'var(--ibtu-black)',
              transition: 'color 0.3s',
              whiteSpace: 'nowrap',
            }}>
              Donate
            </span>
          </a>
      </div>

      <MenuDropdown open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
