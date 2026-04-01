'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   FOOTER — Gold bg, sacred mantra in LOT,
   LA skyline silhouette, social icons,
   scroll-animated entrance
═══════════════════════════════════════ */

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/our-programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const mantraRef = useRef<HTMLDivElement>(null)

  const mantraLines = ['Community is the Infrastructure.']

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      // Mantra words stagger in
      const words = mantraRef.current?.querySelectorAll('.foot-mantra-word')
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{
        background: 'var(--ibtu-black)',
        paddingBottom: 0,
      }}
    >
      {/* LA Skyline — brand anchor element */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/skyline.svg"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '120px',
            objectFit: 'cover',
            objectPosition: 'center bottom',
            filter: 'invert(79%) sepia(98%) saturate(1000%) hue-rotate(3deg) brightness(103%)',
            opacity: 0.15,
          }}
        />
      </div>

      {/* Sacred mantra — big LOT text, left-aligned */}
      <div style={{ padding: 'clamp(60px, 8vw, 120px) clamp(32px, 5vw, 80px) 0' }}>
      <div
        ref={mantraRef}
        style={{ maxWidth: 'var(--content-max)', margin: '0 auto 80px' }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 10vw, 160px)',
            lineHeight: 0.92,
            textTransform: 'uppercase',
            color: 'var(--ibtu-gold)',
            letterSpacing: '-0.02em',
            perspective: '600px',
          }}
        >
          {mantraLines.map((line, i) => (
            <span
              key={i}
              className="foot-mantra-word gsap-reveal"
              style={{ display: 'block' }}
            >
              {line}
            </span>
          ))}
        </h2>
      </div>

      {/* Footer content grid */}
      <div
        style={{
          maxWidth: 'var(--content-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '48px',
          paddingTop: '48px',
          borderTop: '2px solid var(--ibtu-gold)',
        }}
      >
        {/* Left — logo + org info */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ibtu-logo.svg"
            alt="IBTU"
            style={{ height: '40px', filter: 'invert(79%) sepia(98%) saturate(1000%) hue-rotate(3deg) brightness(103%)', marginBottom: '16px' }}
          />
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--ibtu-gold)',
              lineHeight: 2,
              fontWeight: 500,
            }}
          >
            501(c)(3) &middot; EIN: 85-3136505
            <br />
            Baldwin Hills Crenshaw Plaza
            <br />
            Suite 224-226
            <br />
            Los Angeles, CA 90008
          </p>
        </div>

        {/* Center — nav links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--ibtu-gold)',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            Navigate
          </span>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--ibtu-gold)',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ibtu-white)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ibtu-gold)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right — contact + social */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'right' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--ibtu-gold)',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            Connect
          </span>
          <a
            href="mailto:info@itsbiggerthanusla.org"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--ibtu-gold)',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ibtu-white)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ibtu-gold)' }}
          >
            info@itsbiggerthanusla.org
          </a>
          <a
            href="tel:+13232070221"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--ibtu-gold)',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ibtu-white)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ibtu-gold)' }}
          >
            (323) 207-0221
          </a>

          {/* Social icons — black, hover → white */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '16px' }}>
            {[
              { href: 'https://instagram.com/itsbiggerthanus_', label: 'Instagram', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
              { href: 'https://www.facebook.com/itsbiggerthanus', label: 'Facebook', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              { href: 'https://www.tiktok.com/@itsbiggerthanus_', label: 'TikTok', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.81.11v-3.5a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.24 8.24 0 0 0 4.76 1.5V6.73a4.83 4.83 0 0 1-1-.04z"/></svg> },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid var(--ibtu-gold)',
                  color: 'var(--ibtu-gold)',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--ibtu-gold)'
                  e.currentTarget.style.color = 'var(--ibtu-black)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--ibtu-gold)'
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: 'var(--content-max)',
          margin: '48px auto 0',
          paddingTop: '24px',
          borderTop: '2px solid var(--ibtu-gold)',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--ibtu-gold)',
          fontWeight: 600,
          paddingBottom: '24px',
        }}
      >
        &copy; {new Date().getFullYear()} It&apos;s Bigger Than Us. All rights reserved.
      </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          footer > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          footer > div:nth-child(2) > div:last-child {
            text-align: center !important;
          }
          footer > div:nth-child(2) > div:last-child > div {
            justify-content: center !important;
          }
        }
      `}</style>
    </footer>
  )
}
