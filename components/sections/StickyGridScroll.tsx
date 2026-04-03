'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   STICKY GRID SCROLL — faithful port of
   github.com/theoplawinski/codrops-sticky-grid-scroll

   Section is tall (425vh). Wrapper is sticky.
   Grid items slide in by column (alternating directions).
   Grid zooms, columns spread. Content reveals.
═══════════════════════════════════════ */

interface StickyGridScrollProps {
  images: string[]
  headline: string
  subheadline: string
  ctaText: string
  ctaHref: string
}

export default function StickyGridScroll({
  images,
  headline,
  subheadline,
  ctaText,
  ctaHref,
}: StickyGridScrollProps) {
  const blockRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLUListElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const block = blockRef.current
    const wrapper = wrapperRef.current
    const grid = gridRef.current
    const title = titleRef.current
    const desc = descRef.current
    const btn = btnRef.current
    if (!block || !wrapper || !grid || !title || !desc || !btn) return

    const items = grid.querySelectorAll('.gallery__item')
    const numColumns = 3
    const columns: Element[][] = Array.from({ length: numColumns }, () => [])
    items.forEach((item, index) => {
      columns[index % numColumns].push(item)
    })

    // Init: hide description + button, center title
    gsap.set([desc, btn], { opacity: 0, pointerEvents: 'none' })
    const content = contentRef.current!
    const dy = (content.offsetHeight - title.offsetHeight) / 2
    const titleOffsetY = (dy / content.offsetHeight) * 100
    gsap.set(title, { yPercent: titleOffsetY })

    const ctx = gsap.context(() => {
      // 1. Parallax: wrapper slides up into view
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

      // 2. Title fades in
      gsap.from(title, {
        opacity: 0,
        duration: 0.7,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 57%',
          toggleActions: 'play none none reset',
        },
      })

      // 3. Main scroll-driven timeline
      const wh = window.innerHeight
      const gridDy = wh - (wh - grid.offsetHeight) / 2

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: 'top 25%',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      // Grid reveal: columns slide in from alternating directions
      columns.forEach((column, colIndex) => {
        const fromTop = colIndex % 2 === 0
        tl.from(column, {
          y: gridDy * (fromTop ? -1 : 1),
          stagger: { each: 0.06, from: fromTop ? 'end' : 'start' },
          ease: 'power1.inOut',
        }, 'grid-reveal')
      })

      // Grid zoom: scale up, side columns spread, center splits
      tl.to(grid, { scale: 2.05, duration: 1, ease: 'power3.inOut' })
      tl.to(columns[0], { xPercent: -40, duration: 1, ease: 'power3.inOut' }, '<')
      tl.to(columns[2], { xPercent: 40, duration: 1, ease: 'power3.inOut' }, '<')
      tl.to(columns[1], {
        yPercent: (index: number) => (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 40,
        duration: 0.5,
        ease: 'power1.inOut',
      }, '-=0.5')

      // Content toggle: title slides up, description + button fade in
      tl.add(() => {
        const isForward = tl.scrollTrigger!.direction === 1
        gsap.timeline({ defaults: { overwrite: true } })
          .to(title, { yPercent: isForward ? 0 : titleOffsetY, duration: 0.7, ease: 'power2.inOut' })
          .to([desc, btn], {
            opacity: isForward ? 1 : 0,
            duration: 0.4,
            ease: isForward ? 'power1.inOut' : 'power1.out',
            pointerEvents: isForward ? 'all' : 'none',
          }, isForward ? '-=90%' : '<')
      }, '-=0.32')
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={blockRef}
      style={{
        height: '425vh',
        position: 'relative',
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        {/* Content overlay */}
        <div
          ref={contentRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 clamp(32px, 5vw, 80px)',
            pointerEvents: 'none',
          }}
        >
          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 10vw, 160px)',
              lineHeight: 0.9,
              textTransform: 'uppercase',
              color: '#FFC700',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              pointerEvents: 'all',
            }}
          >
            {headline}
          </h1>
          <p
            ref={descRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-lg)',
              color: '#FFF',
              lineHeight: 1.7,
              maxWidth: '600px',
              textAlign: 'center',
              marginTop: 'clamp(16px, 2vw, 32px)',
              pointerEvents: 'all',
            }}
          >
            {subheadline}
          </p>
          <a
            ref={btnRef}
            href={ctaHref}
            className="holo-glass"
            style={{
              display: 'inline-block',
              background: '#FFC700',
              color: '#000',
              padding: '16px 40px',
              borderRadius: '16px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              marginTop: 'clamp(16px, 2vw, 32px)',
              pointerEvents: 'all',
            }}
          >
            {ctaText}
          </a>
        </div>

        {/* Image grid */}
        <ul
          ref={gridRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            padding: '1rem',
            listStyle: 'none',
            margin: 0,
          }}
        >
          {images.map((src, i) => (
            <li
              key={i}
              className="gallery__item"
              style={{ borderRadius: 8, overflow: 'hidden' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="IBTU community"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(1.05) saturate(1.15)',
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
