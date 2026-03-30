'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/our-programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
  { label: 'Donate', href: '/donate' },
];

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spinning logo animation
  useEffect(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 12,
        ease: 'none',
        repeat: -1,
      });
    }
  }, []);

  // Animate dropdown links on open
  useEffect(() => {
    if (menuOpen && dropdownRef.current) {
      const links = dropdownRef.current.querySelectorAll('.dropdown-link');
      gsap.fromTo(links,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
      );
    }
  }, [menuOpen]);

  return (
    <>
      {/* ── Fixed nav area: gold background, top-left ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'var(--gold)',
          padding: '16px',
          borderBottomRightRadius: '16px',
          transition: 'box-shadow 0.3s',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {/* Spinning black logo — links home */}
        <Link href="/" aria-label="IBTU Home" style={{ display: 'block' }}>
          <div
            ref={logoRef}
            style={{
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ibtu-logo.svg"
              alt="IBTU"
              style={{
                width: '48px',
                height: '48px',
                filter: 'brightness(0)', // black logo on gold
              }}
            />
          </div>
        </Link>

        {/* Hamburger menu button — below spinning logo */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            marginTop: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
          }}
        >
          <span style={{
            width: '24px', height: '2px', background: '#000',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            width: '24px', height: '2px', background: '#000',
            transition: 'opacity 0.3s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            width: '24px', height: '2px', background: '#000',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </div>

      {/* ── Dropdown nav — drops from top-left ── */}
      <div
        ref={dropdownRef}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Navigation menu"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 999,
          background: 'var(--gold)',
          padding: menuOpen ? '120px 32px 40px' : '0 32px',
          maxHeight: menuOpen ? '100vh' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          minWidth: '280px',
          borderBottomRightRadius: '20px',
          boxShadow: menuOpen ? '0 24px 48px rgba(0,0,0,0.4)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="dropdown-link"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'LOT', 'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 6vw, 56px)',
              textTransform: 'uppercase',
              color: '#000',
              textDecoration: 'none',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              opacity: 0,
              display: 'block',
              padding: '4px 0',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#000'; }}
          >
            {link.label}
          </Link>
        ))}

        {/* Sacred mantra at bottom */}
        <div style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid #000',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '10px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#000',
          fontWeight: 700,
        }}>
          Community is the infrastructure.
        </div>
      </div>

      {/* ── Click outside to close ── */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 998,
            background: 'rgba(0,0,0,0.5)',
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
