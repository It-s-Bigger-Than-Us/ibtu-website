'use client'

import Link from 'next/link'
import { useRef } from 'react'

/* ═══════════════════════════════════════
   FOOTER — Editorial, animated, black bg
   "Navigate" label removed.
   Address on one line, under the legal.
   "Community is the Infrastructure" on logo baseline.
═══════════════════════════════════════ */

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/our-programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Volunteer', href: 'https://volunteer.bloomerang.co/volunteer/#/join-party?k=u9uiz8g1753qfr' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
  { label: 'Donate', href: 'https://secure.qgiv.com/for/ibt/' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  return (
    <footer
      ref={footerRef}
      style={{
        background: 'var(--ibtu-black)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: 'clamp(60px, 8vw, 120px) clamp(32px, 5vw, 80px) 0' }}>
        {/* Footer content — 3-column grid */}
        <div
          style={{
            maxWidth: 'var(--content-max)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '48px',
            paddingTop: '48px',
            borderTop: '0.5px solid var(--ibtu-gold)',
            alignItems: 'start',
          }}
        >
          {/* Left — logo + tagline on same baseline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                height: '44px',
                color: '#FFC700',
                flexShrink: 0,
              }}
              dangerouslySetInnerHTML={{
                __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 995.67 995.67" height="44" fill="currentColor"><path d="M956.59,304.1c-37.83-89.38-100.82-165.25-180.43-219.09C696.76,31.39,600.93,0,497.83,0c-68.59,0-134.28,13.93-193.73,39.08-89.38,37.83-165.25,100.81-219.09,180.43C31.39,298.91,0,394.94,0,497.83c0,68.59,13.93,134.28,39.08,193.73,37.83,89.39,100.81,165.26,180.43,219.09,79.4,53.63,175.44,85.02,278.33,85.02,68.59,0,134.28-13.93,193.73-39.08,89.39-37.83,165.26-100.82,219.09-180.43,53.63-79.41,85.02-175.44,85.02-278.33,0-68.59-13.93-134.28-39.08-193.73ZM912.53,673.06c-34.09,80.65-91.26,149.46-163.18,198.1-71.92,48.43-158.39,76.91-251.52,76.91-62.15,0-121.39-12.68-175.23-35.33-80.65-34.09-149.45-91.26-198.09-163.18-48.43-71.92-76.91-158.39-76.91-251.52,0-62.15,12.68-121.39,35.34-175.23,34.09-80.65,91.25-149.45,163.17-198.09,71.92-48.43,158.4-76.91,251.52-76.91,62.15,0,121.4,12.68,175.23,35.34,80.65,34.09,149.46,91.25,198.1,163.17,48.43,71.92,76.91,158.39,76.91,251.52,0,62.15-12.68,121.4-35.33,175.23Z"/><path d="M799.24,228.65l-33.89-33.68-267.52,267.32L230.31,194.97l-33.67,33.68,267.52,267.52-267.52,267.52,33.67,33.67,267.52-267.31,267.52,267.31,33.89-33.67-267.53-267.52,267.53-267.52Z"/><path d="M182.92,369.79h57.79v254.22h-57.79v-254.22Z"/><path d="M409.28,84.6h108.71c46.15,0,79.2,30.56,79.2,72.34,0,19.33-9.35,36.79-24.32,49.47,20.79,11.85,34.51,31.18,34.51,55.5,0,42.2-33.05,76.91-82.11,76.91h-116.61l.83-254.22h-.21ZM513.84,186.66c15.59,0,27.23-11.22,27.23-26.82s-11.64-26.81-27.23-26.81h-51.14v53.84h51.14v-.21ZM518.2,290.59c19.33,0,32.43-13.1,32.43-29.1,0-17.46-13.09-29.1-32.43-29.1h-55.5v58.2h55.5Z"/><path d="M753.09,443.99h-68.39v-53.63h193.94v53.63h-68.18v200.59h-57.37v-200.59Z"/><path d="M386.42,800.28v-145.3h57.38v141.97c0,49.47,26.6,65.06,53.42,65.06s53.42-15.59,53.42-65.06v-141.97h57.37v145.3c0,82.52-45.94,115.16-110.79,115.16s-110.79-32.64-110.79-115.16Z"/></svg>`,
              }}
            />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--ibtu-gold)',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}>
              Community is the infrastructure.
            </span>
          </div>

          {/* Center — nav links (no "Navigate" label) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 16px' }}>
              {footerLinks.map((link) => {
                const isExternal = link.href.startsWith('http')
                const linkStyle = {
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: '#FFF',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.2s',
                  letterSpacing: '0.5px',
                } as const
                const hoverIn = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = 'var(--ibtu-gold)' }
                const hoverOut = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = '#FFF' }

                return isExternal ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={linkStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right — contact + social */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'right' }}>
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
                fontSize: '13px',
                color: '#FFF',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ibtu-gold)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#FFF' }}
            >
              info@itsbiggerthanusla.org
            </a>
            <a
              href="tel:+13232070221"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: '#FFF',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ibtu-gold)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#FFF' }}
            >
              (323) 207-0221
            </a>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
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

        {/* Copyright + address on one line below */}
        <div
          style={{
            maxWidth: 'var(--content-max)',
            margin: '0 auto',
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
          <p style={{ margin: '0 0 8px' }}>
            &copy; 2026 It&apos;s Bigger Than Us 501(c)(3). All rights reserved. EIN: 85-3136505
          </p>
          <p style={{ margin: 0, fontSize: '10px', fontWeight: 500, letterSpacing: '1.5px' }}>
            Baldwin Hills Crenshaw Plaza, Suite 224-226, 3650 W. Martin Luther King Jr. Blvd, Los Angeles, CA 90008
          </p>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 32px !important;
          }
          footer > div > div:first-child > div:first-child {
            flex-direction: column !important;
            align-items: center !important;
          }
          footer > div > div:first-child > div:nth-child(2) {
            align-items: center !important;
          }
          footer > div > div:first-child > div:nth-child(2) > div {
            justify-content: center !important;
            flex-wrap: wrap !important;
            gap: 10px 16px !important;
          }
          footer > div > div:first-child > div:last-child {
            text-align: center !important;
          }
          footer > div > div:first-child > div:last-child > div {
            justify-content: center !important;
          }
        }
      `}</style>
    </footer>
  )
}
