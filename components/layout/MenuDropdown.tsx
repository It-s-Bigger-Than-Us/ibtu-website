'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/our-programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Events', href: '/events' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
  { label: 'Donate', href: '/donate' },
]

interface MenuDropdownProps {
  open: boolean
  onClose: () => void
}

export default function MenuDropdown({ open, onClose }: MenuDropdownProps) {
  const linksRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Animate links on open
  useEffect(() => {
    if (open && linksRef.current) {
      const links = linksRef.current.querySelectorAll('.menu-link')
      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'expo.out',
          delay: 0.15,
        }
      )
      // Move focus to first link
      setTimeout(() => firstLinkRef.current?.focus(), 300)
    }
  }, [open])

  // Escape key closes menu
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
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'var(--ibtu-gold)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(100px, 15vh, 200px) clamp(48px, 8vw, 120px)',
            overflow: 'auto',
          }}
        >
          <nav ref={linksRef} aria-label="Main navigation">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                ref={i === 0 ? firstLinkRef : undefined}
                className="menu-link"
                onClick={onClose}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  textTransform: 'uppercase',
                  color: 'var(--ibtu-black)',
                  textDecoration: 'none',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  padding: '4px 0',
                  opacity: 0,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--ibtu-white)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--ibtu-black)'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Sacred mantra at bottom */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 'clamp(32px, 5vh, 80px)',
              left: 'clamp(48px, 8vw, 120px)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 4vw, 40px)',
                lineHeight: 1.1,
                color: 'var(--ibtu-black)',
                textTransform: 'uppercase',
              }}
            >
              Community<br />
              is the<br />
              Infrastructure.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
