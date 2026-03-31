'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import MenuDropdown from './MenuDropdown'
import DonateButton from './DonateButton'

const NavCoin = dynamic(() => import('./NavCoin'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: 64,
      height: 64,
      background: 'var(--ibtu-gold)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/ibtu-logo.svg" alt="IBTU" style={{ width: 40, height: 40, filter: 'brightness(0)' }} />
    </div>
  ),
})

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [coinHovered, setCoinHovered] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
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
      {/* ── Logo coin — fixed top-left ── */}
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
        onMouseEnter={() => setCoinHovered(true)}
        onMouseLeave={() => setCoinHovered(false)}
      >
        <Link href="/" aria-label="IBTU Home" style={{ display: 'block' }}>
          <Suspense fallback={
            <div style={{
              width: 64, height: 64,
              background: 'var(--ibtu-gold)',
              borderRadius: '8px',
            }} />
          }>
            <NavCoin size={64} hovered={coinHovered} />
          </Suspense>
        </Link>

        {/* Hamburger — below coin */}
        <button
          ref={hamburgerRef}
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
            background: scrolled || menuOpen ? 'var(--ibtu-white)' : 'var(--ibtu-white)',
            transition: 'transform 0.3s var(--ease-out-expo), opacity 0.3s',
            transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            width: '24px',
            height: '2px',
            background: scrolled || menuOpen ? 'var(--ibtu-white)' : 'var(--ibtu-white)',
            transition: 'opacity 0.3s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            width: '24px',
            height: '2px',
            background: scrolled || menuOpen ? 'var(--ibtu-white)' : 'var(--ibtu-white)',
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
