'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ═══════════════════════════════════════
   TOP NAV — yellow floating pill
   Default state: only logo + hamburger + DONATE visible.
   Click hamburger → nav links expand horizontally between
   logo and hamburger. All ink is black. Donate stays iridescent.
═══════════════════════════════════════ */

const NAV_LINKS = [
  { l: 'About', href: '/about', external: false },
  { l: 'Programs', href: '/our-programs', external: false },
  { l: 'Impact', href: '/impact', external: false },
  { l: 'Events', href: '/events', external: false },
  {
    l: 'Volunteer',
    href: 'https://volunteer.bloomerang.co/volunteer/#/join-party?k=u9uiz8g1753qfr',
    external: true,
  },
  { l: 'Get Involved', href: '/get-involved', external: false },
  { l: 'Contact', href: '/contact', external: false },
] as const

export default function TopNav() {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio') ?? false
  const [menuOpen, setMenuOpen] = useState(false)

  // auto-collapse on scroll past 80px while open
  useEffect(() => {
    if (!menuOpen || isStudio) return
    let lastY = window.scrollY
    const onScroll = () => {
      if (Math.abs(window.scrollY - lastY) > 80) setMenuOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen, isStudio])

  if (isStudio) return null

  const stage: React.CSSProperties = {
    position: 'fixed',
    top: 22,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
  }
  const pill: React.CSSProperties = {
    pointerEvents: 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: 6,
    borderRadius: 100,
    background: '#FFC700',
    border: '1.5px solid #000',
    boxShadow: '0 12px 40px -14px rgba(0,0,0,.55)',
    transition: 'padding .4s cubic-bezier(.16,1,.3,1)',
  }
  const logoTile: React.CSSProperties = {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    background: 'transparent',
    border: 'none',
    padding: 0,
    marginLeft: 6,
  }
  const linksWrap: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    paddingLeft: menuOpen ? 8 : 0,
    paddingRight: menuOpen ? 8 : 0,
    maxWidth: menuOpen ? 720 : 0,
    opacity: menuOpen ? 1 : 0,
    overflow: 'hidden',
    transition:
      'max-width .55s cubic-bezier(.16,1,.3,1), opacity .35s ease, padding .4s ease',
  }
  const link: React.CSSProperties = {
    color: '#000',
    textDecoration: 'none',
    fontFamily: 'var(--font-body), Poppins, sans-serif',
    fontWeight: 800,
    fontSize: 10.5,
    letterSpacing: '.22em',
    textTransform: 'uppercase',
    padding: '10px 14px',
    borderRadius: 100,
    transition: 'background .2s ease, color .2s ease',
    whiteSpace: 'nowrap',
  }
  const ham: React.CSSProperties = {
    width: 40,
    height: 40,
    background: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 5,
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
  }
  const hamBar: React.CSSProperties = {
    width: 18,
    height: 2,
    background: '#000',
    display: 'block',
    transition: 'all .3s',
  }
  const donate: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '11px 18px 11px 20px',
    borderRadius: 100,
    color: '#000',
    fontFamily: 'var(--font-body), Poppins, sans-serif',
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: '.22em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    backgroundImage: "url('/about/iridescent-richer.png')",
    backgroundSize: '240% 240%',
    backgroundPosition: '30% 50%',
    boxShadow:
      'inset 0 1px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(0,0,0,.3), 0 6px 18px -6px rgba(0,0,0,.4)',
    flexShrink: 0,
    animation: 'tnDonatePan 9s ease-in-out infinite',
    border: '1.5px solid #000',
  }
  const donateArrow: React.CSSProperties = {
    fontFamily: "'LOT','Bebas Neue',sans-serif",
    fontSize: 15,
    lineHeight: 1,
  }

  return (
    <div style={stage}>
      <style>{`
        @keyframes tnDonatePan {
          0%   { background-position: 20% 40%; }
          50%  { background-position: 70% 60%; }
          100% { background-position: 20% 40%; }
        }
        .tn-link:hover {
          background-image: url('/about/iridescent-richer.png');
          background-size: 220% 220%;
          background-position: 30% 50%;
        }
      `}</style>
      <nav style={pill} aria-label="Primary">
        <Link href="/" style={logoTile} aria-label="IBTU home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ibtu-logo.svg"
            alt="IBTU"
            style={{ width: '100%', height: '100%', filter: 'brightness(0)' }}
          />
        </Link>

        <div style={linksWrap} aria-hidden={!menuOpen}>
          {NAV_LINKS.map(({ l, href, external }) =>
            external ? (
              <a
                key={l}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="tn-link"
                style={link}
                tabIndex={menuOpen ? 0 : -1}
              >
                {l}
              </a>
            ) : (
              <Link
                key={l}
                href={href}
                className="tn-link"
                style={link}
                tabIndex={menuOpen ? 0 : -1}
              >
                {l}
              </Link>
            )
          )}
        </div>

        <button
          type="button"
          style={ham}
          onClick={() => setMenuOpen((m) => !m)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            style={{
              ...hamBar,
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }}
          />
          <span style={{ ...hamBar, opacity: menuOpen ? 0 : 1 }} />
          <span
            style={{
              ...hamBar,
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>

        <a
          href="https://secure.qgiv.com/for/ibt/"
          target="_blank"
          rel="noopener noreferrer"
          style={donate}
        >
          Donate <span style={donateArrow}>→</span>
        </a>
      </nav>
    </div>
  )
}
