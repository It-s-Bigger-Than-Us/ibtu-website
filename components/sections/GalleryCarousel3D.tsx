'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

/* ═══════════════════════════════════════
   3D IMAGE GALLERY — inspired by 21st.dev
   Cards float in 3D space with depth, perspective.
   Yellow (#FFC700) background. Iridescent card edges
   with 3D raised effect. Photos centered on each card.
   Drag to spin, momentum, auto-drift.
   Cards are 50% larger than original.
═══════════════════════════════════════ */

// All gallery images — shuffled across categories
const IMAGES = [
  '/images/b2s/_D5A7392.jpg', '/images/coastal/IMG_4838.jpg', '/images/gallery/IMG_1311.jpg',
  '/images/school/IMG_5608.jpg', '/images/wellness/IMG_9922.jpg', '/images/b2s/_D5A5912.jpg',
  '/images/coastal/IMG_0267.jpg', '/images/gallery/IMG_4353.jpg', '/images/school/IMG_4674.jpg',
  '/images/b2s/_D5A7155.jpg', '/images/coastal/IMG_1778.jpg', '/images/gallery/IMG_4649.jpg',
  '/images/school/IMG_6134.jpg', '/images/wellness/IMG_0279.jpg', '/images/b2s/_D5A8212.jpg',
  '/images/coastal/IMG_4805.jpg', '/images/gallery/IMG_1673.jpg', '/images/school/IMG_7067.jpg',
  '/images/b2s/_D5A6099.jpg', '/images/coastal/IMG_4953.jpg', '/images/gallery/IMG_4907.jpg',
  '/images/school/IMG_5884.jpg', '/images/wellness/IMG_1610.jpg', '/images/b2s/_D5A7604.jpg',
  '/images/b2s/_D5A7530.jpg', '/images/coastal/IMG_0024.jpg', '/images/gallery/IMG_1848.jpg',
  '/images/school/IMG_7169.jpg', '/images/wellness/IMG_1554.jpg', '/images/b2s/_D5A7957.jpg',
  '/images/coastal/IMG_1796.jpg', '/images/gallery/IMG_4672.jpg', '/images/school/IMG_5843.jpg',
  '/images/b2s/_D5A8212.jpg', '/images/coastal/IMG_4775.jpg', '/images/gallery/IMG_4944.jpg',
  '/images/school/IMG_6273.jpg', '/images/wellness/IMG_9883.jpg', '/images/b2s/6D5A0765.jpg',
  '/images/coastal/IMG_5017.jpg', '/images/gallery/IMG_1790.jpg', '/images/school/IMG_6057.jpg',
  '/images/b2s/6D5A1246.jpg', '/images/coastal/IMG_5025.jpg', '/images/gallery/IMG_4687.jpg',
  '/images/school/IMG_5888.jpg', '/images/wellness/IMG_1614.jpg', '/images/b2s/6D5A0871.jpg',
  '/images/additional/_D5A7272.jpg', '/images/additional/_D5A8614.jpg',
]

// 50% larger cards
const CARD_W = 480
const CARD_H = 630
const CARD_PAD = 24
const CARD_GAP = 48
const ITEM_W = CARD_W + CARD_GAP
const MAX_ROTATION = 24
const MAX_DEPTH = 180
const MIN_SCALE = 0.88
const SCALE_RANGE = 0.14
const FRICTION = 0.94
const DRAG_SENS = 1.2

export default function GalleryCarousel3D() {
  const stageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const scrollXRef = useRef(0)
  const velocityRef = useRef(0)
  const isDragging = useRef(false)
  const lastX = useRef(0)
  const lastDelta = useRef(0)
  const lastTime = useRef(0)
  const itemsRef = useRef<{ el: HTMLDivElement; baseX: number }[]>([])

  const TRACK = IMAGES.length * ITEM_W

  const mod = (n: number, m: number) => ((n % m) + m) % m

  const computeTransform = useCallback((screenX: number) => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1400
    const center = vw / 2
    const norm = Math.max(-1, Math.min(1, (screenX - center + CARD_W / 2) / (center * 1.2)))
    const invNorm = 1 - Math.abs(norm)
    const ry = -norm * MAX_ROTATION
    const tz = invNorm * MAX_DEPTH
    const scale = MIN_SCALE + invNorm * SCALE_RANGE
    return { ry, tz, scale }
  }, [])

  const tick = useCallback(() => {
    const now = performance.now()
    const dt = Math.min((now - (lastTime.current || now)) / 1000, 0.1)
    lastTime.current = now

    if (!isDragging.current) {
      velocityRef.current *= Math.pow(FRICTION, dt * 60)
      if (Math.abs(velocityRef.current) < 0.5) velocityRef.current = -25
      scrollXRef.current = mod(scrollXRef.current + velocityRef.current * dt, TRACK)
    }

    const half = TRACK / 2
    const items = itemsRef.current

    for (let i = 0; i < items.length; i++) {
      let pos = items[i].baseX - scrollXRef.current
      if (pos < -half) pos += TRACK
      if (pos > half) pos -= TRACK

      const { ry, tz, scale } = computeTransform(pos)
      const el = items[i].el
      el.style.transform = `translate3d(${pos}px, -50%, ${tz}px) rotateY(${ry}deg) scale(${scale})`
      el.style.zIndex = String(Math.round(tz))
      const blur = Math.max(0, (1 - (tz / MAX_DEPTH)) * 1.2)
      el.style.filter = blur > 0.3 ? `blur(${blur}px)` : 'none'
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [TRACK, computeTransform])

  useEffect(() => {
    const stage = stageRef.current
    const cards = cardsRef.current
    if (!stage || !cards) return

    const items: { el: HTMLDivElement; baseX: number }[] = []
    IMAGES.forEach((src, i) => {
      // Card container — iridescent edge + raised 3D feel
      const card = document.createElement('div')
      card.style.cssText = `
        position: absolute;
        top: 50%;
        left: 0;
        width: ${CARD_W}px;
        height: ${CARD_H}px;
        border-radius: 16px;
        overflow: hidden;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        will-change: transform, filter;
        cursor: grab;
        background: var(--holo-gradient);
        background-size: 400% 400%;
        animation: holo-shift 24s ease infinite;
        padding: 3px;
      `
      // Inner card with yellow bg + centered photo
      const inner = document.createElement('div')
      inner.style.cssText = `
        width: 100%;
        height: 100%;
        border-radius: 13px;
        overflow: hidden;
        background: #FFC700;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${CARD_PAD}px;
      `
      const img = document.createElement('img')
      img.src = src
      img.alt = ''
      img.draggable = false
      img.loading = i < 8 ? 'eager' : 'lazy'
      img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        border-radius: 8px;
        filter: brightness(1.08) saturate(1.2);
        pointer-events: none;
      `
      inner.appendChild(img)
      card.appendChild(inner)
      cards.appendChild(card)
      items.push({ el: card, baseX: i * ITEM_W })
    })
    itemsRef.current = items

    // Entry animation
    gsap.fromTo(
      items.map(i => i.el),
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.03, ease: 'expo.out', delay: 0.2 }
    )

    // Pointer events
    const onDown = (e: PointerEvent) => {
      isDragging.current = true
      lastX.current = e.clientX
      lastDelta.current = 0
      stage.style.cursor = 'grabbing'
      stage.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return
      const dx = e.clientX - lastX.current
      const dt = Math.max(1, e.timeStamp - (lastTime.current * 1000)) / 1000
      scrollXRef.current = mod(scrollXRef.current - dx * DRAG_SENS, TRACK)
      lastDelta.current = dx / Math.max(dt, 0.016)
      lastX.current = e.clientX
    }
    const onUp = () => {
      isDragging.current = false
      velocityRef.current = -lastDelta.current * DRAG_SENS
      stage.style.cursor = 'grab'
    }

    stage.addEventListener('pointerdown', onDown)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerup', onUp)
    stage.addEventListener('pointercancel', onUp)

    lastTime.current = performance.now()
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      stage.removeEventListener('pointerdown', onDown)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerup', onUp)
      stage.removeEventListener('pointercancel', onUp)
    }
  }, [tick, TRACK])

  return (
    <section
      style={{
        background: '#FFC700',
        padding: 'clamp(48px, 8vw, 100px) 0',
        overflow: 'hidden',
      }}
    >
      <div
        ref={stageRef}
        style={{
          position: 'relative',
          width: '100%',
          height: `${CARD_H + 100}px`,
          perspective: '2000px',
          cursor: 'grab',
          touchAction: 'pan-y',
        }}
      >
        <div
          ref={cardsRef}
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
          }}
        />
      </div>
    </section>
  )
}
