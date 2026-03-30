'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/our-programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
];

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate nav entrance
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  // Animate overlay links on open
  useEffect(() => {
    if (menuOpen && overlayRef.current) {
      const links = overlayRef.current.querySelectorAll('.nav-overlay-link');
      gsap.fromTo(links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav ref={navRef} className={`top-nav${scrolled ? ' scrolled' : ''}`} style={{ opacity: 0 }}>
        <Link href="/" className="nav-logo" aria-label="IBTU Home">
          <Image src="/ibtu-logo.svg" alt="IBTU" width={120} height={40} priority />
        </Link>

        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="reveal-line" style={{ position: 'relative' }}>
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/donate" className="nav-donate-desktop nav-donate">
          Donate
        </Link>

        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Full-screen overlay — editorial, LOT font, animated entrance */}
      <div
        className={`nav-overlay${menuOpen ? ' open' : ''}`}
        ref={overlayRef}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Navigation menu"
      >
        <div className="nav-overlay-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-overlay-link"
              onClick={closeMenu}
              style={{ opacity: 0 }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="nav-overlay-link"
            onClick={closeMenu}
            style={{
              opacity: 0,
              color: 'var(--gold)',
              marginTop: '16px',
            }}
          >
            Donate
          </Link>
        </div>

        {/* Bottom mantra */}
        <div style={{
          position: 'absolute',
          bottom: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '10px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          fontWeight: 700,
        }}>
          Community is the infrastructure.
        </div>
      </div>
    </>
  );
}
