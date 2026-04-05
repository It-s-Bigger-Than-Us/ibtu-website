'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   GET INVOLVED HERO — Sky Background
   Darkened sky with panning cloud animation.
   Gold (#FFC700) type on darkened sky.
   Grid visible on load, zooms/splits on scroll.
═══════════════════════════════════════ */

const ITEM_BACKGROUNDS = [
  'var(--holo-gradient)',
  '#FFC700',
  'none',
  '#FFC700',
  'var(--holo-gradient)',
  'none',
  'none',
  'var(--holo-gradient)',
  '#FFC700',
  'none',
  '#FFC700',
  'var(--holo-gradient)',
]

interface GetInvolvedHeroProps {
  images: string[]
}

export default function GetInvolvedHero({ images }: GetInvolvedHeroProps) {
  const blockRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const gridRef = useRef<HTMLUListElement>(null)
  const triggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    const block = blockRef.current
    const title = titleRef.current
    const desc = descRef.current
    const btn = btnRef.current
    const grid = gridRef.current
    if (!block || !title || !desc || !btn || !grid) return

    const items = grid.querySelectorAll<HTMLElement>('.gi')
    const numColumns = 3
    const columns: HTMLElement[][] = Array.from({ length: numColumns }, () => [])
    items.forEach((item, i) => columns[i % numColumns].push(item))

    gsap.set([desc, btn], { opacity: 0, pointerEvents: 'none' })

    const tl = gsap.timeline()

    tl.to(grid, { scale: 2.2, duration: 1, ease: 'power3.inOut' })
    tl.to(columns[0], { xPercent: -50, duration: 1, ease: 'power3.inOut' }, '<')
    tl.to(columns[2], { xPercent: 50, duration: 1, ease: 'power3.inOut' }, '<')
    tl.to(columns[1], {
      yPercent: (_index: number, el: HTMLElement) => {
        const siblings = columns[1]
        const idx = siblings.indexOf(el)
        return (idx < Math.floor(siblings.length / 2) ? -1 : 1) * 50
      },
      duration: 0.6,
      ease: 'power1.inOut',
    }, '-=0.4')
    tl.to([desc, btn], {
      opacity: 1,
      duration: 0.3,
      ease: 'power1.inOut',
      pointerEvents: 'all',
    }, '-=0.3')

    const st = ScrollTrigger.create({
      trigger: block,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      animation: tl,
    })
    triggersRef.current.push(st)

    return () => {
      triggersRef.current.forEach(t => t.kill())
      triggersRef.current = []
      tl.kill()
    }
  }, [])

  const displayImages = images.length >= 12
    ? images.slice(0, 12)
    : [...images, ...images, ...images].slice(0, 12)

  return (
    <section
      ref={blockRef}
      style={{ height: '300vh', background: '#000', position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Sky background — darkened with cloud panning */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}>
          <Image
            src="/images/blue-sky.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            style={{
              objectFit: 'cover',
              filter: 'brightness(0.7)',
              animation: 'skyPan 60s linear infinite',
              transform: 'scale(1.2)',
            }}
          />
        </div>

        {/* Content overlay */}
        <div
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
              color: '#FFC700',
              maxWidth: 900,
              pointerEvents: 'auto',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
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
              color: '#FFC700',
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
              color: '#000',
              background: '#FFC700',
              textDecoration: 'none',
              padding: '14px 36px',
              borderRadius: '16px',
              pointerEvents: 'auto',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,199,0,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Find Your Role
          </a>
        </div>

        {/* Gallery grid */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
          width: 'min(900px, 85vw)',
          zIndex: 1,
        }}>
          <ul
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              columnGap: 'clamp(8px, 1.5vw, 16px)',
              rowGap: 'clamp(8px, 1.5vw, 16px)',
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
                    borderRadius: 12,
                    overflow: 'hidden',
                    position: 'relative',
                    background: isBlueSky ? undefined : isHolo ? undefined : bg,
                    backgroundImage: isHolo ? bg : undefined,
                    backgroundSize: isHolo ? '600% 600%' : undefined,
                    animation: isHolo ? 'holo-shift 20s ease infinite' : undefined,
                  }}
                >
                  {isBlueSky && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.15)',
                      zIndex: 0,
                    }} />
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

      {/* Cloud panning animation */}
      <style>{`
        @keyframes skyPan {
          0% { transform: scale(1.2) translateX(0); }
          50% { transform: scale(1.2) translateX(-3%); }
          100% { transform: scale(1.2) translateX(0); }
        }
      `}</style>
    </section>
  )
}
