'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

/* ═══════════════════════════════════════
   MENU DROPDOWN — CSS transitions only
   Replaced Framer Motion with pure CSS for
   one fewer motion system in the bundle.
   Slides from left, gold bg, iridescent border.
═══════════════════════════════════════ */

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/our-programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Events', href: '/events' },
  { label: 'Volunteer', href: 'https://volunteer.bloomerang.co/volunteer/#/join-party?k=u9uiz8g1753qfr' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
  { label: 'Donate', href: 'https://secure.qgiv.com/for/ibt/' },
]

interface MenuDropdownProps {
  open: boolean
  onClose: () => void
}

export default function MenuDropdown({ open, onClose }: MenuDropdownProps) {
  const linksRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (open && linksRef.current) {
      const links = linksRef.current.querySelectorAll('.menu-link')
      gsap.fromTo(
        links,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'expo.out',
          delay: 0.2,
        }
      )
      setTimeout(() => firstLinkRef.current?.focus(), 300)
    }
  }, [open])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, handleKeyDown])

  return (
    <>
      {/* Clickable backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 98,
          background: 'rgba(0,0,0,0.25)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Menu panel — slides from left via CSS transform */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: 'clamp(80px, 10vh, 120px)',
          left: 'clamp(16px, 3vw, 32px)',
          zIndex: 99,
          background: 'var(--ibtu-gold)',
          borderRadius: '16px',
          padding: 'clamp(32px, 4vw, 48px) clamp(32px, 5vw, 56px)',
          overflow: 'hidden',
          transform: open ? 'translateX(0)' : 'translateX(calc(-100% - 40px))',
          opacity: open ? 1 : 0,
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {/* Iridescent border via pseudo-element */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          padding: '0.5px',
          background: 'var(--holo-gradient)',
          backgroundSize: '600% 600%',
          animation: 'holo-shift 20s ease infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude' as never,
          pointerEvents: 'none',
        }} />

        <nav ref={linksRef} aria-label="Main navigation" style={{ position: 'relative', zIndex: 1 }}>
          {navLinks.map((link, i) => {
            const isExternal = link.href.startsWith('http')
            const linkStyle = {
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              textTransform: 'uppercase' as const,
              color: 'var(--ibtu-black)',
              textDecoration: 'none',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              padding: '4px 0',
              opacity: 0,
              transition: 'color 0.2s',
              whiteSpace: 'normal' as const,
            }
            const hoverIn = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = 'var(--ibtu-white)' }
            const hoverOut = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = 'var(--ibtu-black)' }

            return isExternal ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="menu-link"
                onClick={onClose}
                style={linkStyle}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                ref={i === 0 ? firstLinkRef : undefined}
                className="menu-link"
                onClick={onClose}
                style={linkStyle}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
