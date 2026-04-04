'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   GET INVOLVED HERO — Codrops Sticky Grid Scroll
   Faithful port: parallax wrapper, column reveal
   from alternating top/bottom, zoom + split,
   content title stays centered, desc bumps it up.
   Mixed backgrounds: iridescent, blue sky, yellow.
═══════════════════════════════════════ */

const ITEM_BACKGROUNDS = [
  'var(--holo-gradient)',  // iridescent
  '#FFC700',              // yellow
  'none',                 // blue sky image
  '#FFC700',              // yellow
  'var(--holo-gradient)',  // iridescent
  'none',                 // blue sky image
  'none',                 // blue sky image
  'var(--holo-gradient)',  // iridescent
  '#FFC700',              // yellow
  'none',                 // blue sky image
  '#FFC700',              // yellow
  'var(--holo-gradient)',  // iridescent
]

interface GetInvolvedHeroProps {
  images: string[]
}

export default function GetInvolvedHero({ images }: GetInvolvedHeroProps) {
  const blockRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const gridRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const block = blockRef.current
    const wrapper = wrapperRef.current
    const content = contentRef.current
    const title = titleRef.current
    const desc = descRef.current
    const btn = btnRef.current
    const grid = gridRef.current
    if (!block || !wrapper || !content || !title || !desc || !btn || !grid) return

    const items = grid.querySelectorAll<HTMLElement>('.gi')
    const numColumns = 3
    const columns: HTMLElement[][] = Array.from({ length: numColumns }, () => [])
    items.forEach((item, i) => columns[i % numColumns].push(item))

    // Init: hide desc + btn, center title vertically
    gsap.set([desc, btn], { opacity: 0, pointerEvents: 'none' })
    const dy = (content.offsetHeight - title.offsetHeight) / 2
    const titleOffsetY = (dy / content.offsetHeight) * 100
    gsap.set(title, { yPercent: titleOffsetY })

    // 1. Parallax wrapper — slides up into view
    gsap.from(wrapper, {
      yPercent: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: block,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
    })

    // 2. Title fade in
    gsap.from(title, {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: block,
        start: 'top 57%',
        toggleActions: 'play none none reset',
      },
    })

    // 3. Main scroll timeline — grid reveal + zoom + content
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: 'top 25%',
        end: 'bottom bottom',
        scrub: true,
      },
    })

    // Grid reveal — columns slide in from alternating top/bottom
    const wh = window.innerHeight
    const gridDy = wh - (wh - grid.offsetHeight) / 2

    columns.forEach((column, colIndex) => {
      const fromTop = colIndex % 2 === 0
      tl.from(
        column,
        {
          y: gridDy * (fromTop ? -1 : 1),
          stagger: { each: 0.06, from: fromTop ? 'end' : 'start' },
          ease: 'power1.inOut',
        },
        'grid-reveal'
      )
    })

    // Grid zoom — scale up, lateral columns spread, center splits
    tl.to(grid, { scale: 2.05, duration: 1, ease: 'power3.inOut' })
    tl.to(columns[0], { xPercent: -40, duration: 1, ease: 'power3.inOut' }, '<')
    tl.to(columns[2], { xPercent: 40, duration: 1, ease: 'power3.inOut' }, '<')
    tl.to(columns[1], {
      yPercent: (_index: number, el: HTMLElement) => {
        const siblings = columns[1]
        const idx = siblings.indexOf(el)
        return (idx < Math.floor(siblings.length / 2) ? -1 : 1) * 40
      },
      duration: 0.5,
      ease: 'power1.inOut',
    }, '-=0.5')

    // Content toggle — title slides up, desc + btn fade in
    tl.to(title, { yPercent: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.32')
    tl.to([desc, btn], {
      opacity: 1,
      duration: 0.3,
      ease: 'power1.inOut',
      pointerEvents: 'all',
    }, '-=0.2')

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  // Pad to 12 images
  const displayImages = images.length >= 12
    ? images.slice(0, 12)
    : [...images, ...images, ...images].slice(0, 12)

  return (
    <section
      ref={blockRef}
      style={{ height: '425vh', background: '#000' }}
    >
      <div
        ref={wrapperRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          padding: 0,
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        {/* Content overlay — title + desc + CTA */}
        <div
          ref={contentRef}
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
            textAlign: 'center',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 10vw, 140px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#000',
              maxWidth: 900,
              pointerEvents: 'auto',
            }}
          >
            There Is a Role for You Here
          </h1>

          <p
            ref={descRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(13px, 1.1vw, 16px)',
              lineHeight: 1.5,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#000',
              maxWidth: 480,
              marginTop: 24,
              fontWeight: 700,
              pointerEvents: 'auto',
            }}
          >
            Behind every number is a neighbor who said yes. 7,500+ volunteers. 300+ partners. One city building together.
          </p>

          <a
            ref={btnRef}
            href="#volunteer"
            style={{
              display: 'inline-block',
              marginTop: 32,
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#FFC700',
              background: '#000',
              textDecoration: 'none',
              padding: '14px 36px',
              borderRadius: '16px',
              pointerEvents: 'auto',
            }}
          >
            Find Your Role
          </a>
        </div>

        {/* Gallery grid — 3 columns, fills viewport behind content */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
          width: 'min(900px, 80vw)',
        }}>
          <ul
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              columnGap: 'clamp(8px, 1.5vw, 20px)',
              rowGap: 'clamp(8px, 1.5vw, 20px)',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              willChange: 'transform',
            }}
          >
            {displayImages.map((src, i) => {
              const bg = ITEM_BACKGROUNDS[i] || '#FFC700'
              const isBlueSky = bg === 'none'
              const isHolo = bg.includes('holo')

              return (
                <li
                  key={i}
                  className="gi"
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    willChange: 'transform',
                    borderRadius: 12,
                    overflow: 'hidden',
                    position: 'relative',
                    background: isBlueSky ? undefined : isHolo ? undefined : bg,
                    backgroundImage: isHolo ? bg : undefined,
                    backgroundSize: isHolo ? '600% 600%' : undefined,
                    animation: isHolo ? 'holo-shift 20s ease infinite' : undefined,
                  }}
                >
                  {/* Blue sky background for designated items */}
                  {isBlueSky && (
                    <Image
                      src="/images/blue-sky.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 768px) 33vw, 300px"
                      style={{ objectFit: 'cover', position: 'absolute', inset: 0, zIndex: 0 }}
                    />
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`IBTU community ${i + 1}`}
                    loading={i < 6 ? 'eager' : 'lazy'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'brightness(1.05) saturate(1.15)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
