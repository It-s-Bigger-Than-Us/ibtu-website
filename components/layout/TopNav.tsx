'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import MenuDropdown from './MenuDropdown'
import DonateButton from './DonateButton'
import gsap from 'gsap'

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
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

  return (
    <>
      {/* ── Logo — fixed top-left, spinning black logo on gold ── */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          left: '24px',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Link
          href="/"
          aria-label="IBTU Home"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            background: 'var(--ibtu-gold)',
            borderRadius: '8px',
            perspective: '600px',
          }}
        >
          <div
            ref={logoRef}
            style={{
              width: '48px',
              height: '48px',
              transformStyle: 'preserve-3d',
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

        {/* Hamburger — below logo */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
            zIndex: 101,
          }}
        >
          <span style={{
            width: '24px',
            height: '2px',
            background: 'var(--ibtu-white)',
            transition: 'transform 0.3s var(--ease-out-expo), opacity 0.3s',
            transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            width: '24px',
            height: '2px',
            background: 'var(--ibtu-white)',
            transition: 'opacity 0.3s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            width: '24px',
            height: '2px',
            background: 'var(--ibtu-white)',
            transition: 'transform 0.3s var(--ease-out-expo), opacity 0.3s',
            transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </div>

      {/* ── Full-screen gold menu dropdown ── */}
      <MenuDropdown open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── Donate button — slides in from right on cursor proximity ── */}
      <DonateButton />
    </>
  )
}
