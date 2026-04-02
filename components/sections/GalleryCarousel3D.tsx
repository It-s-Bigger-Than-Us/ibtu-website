'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/* ═══════════════════════════════════════
   3D IMAGE GALLERY — inspired by 21st.dev
   Cards in 3D perspective space with depth.
   Yellow (#FFC700) background. Iridescent card edges.
   Drag to spin, momentum, auto-drift.
   Uses 20 images (not 48) for performance.
═══════════════════════════════════════ */

const IMAGES = [
  '/images/b2s/_D5A7392.jpg', '/images/coastal/IMG_4838.jpg', '/images/gallery/IMG_1311.jpg',
  '/images/school/IMG_5608.jpg', '/images/wellness/IMG_9922.jpg', '/images/b2s/_D5A5912.jpg',
  '/images/coastal/IMG_0267.jpg', '/images/gallery/IMG_4353.jpg', '/images/school/IMG_4674.jpg',
  '/images/b2s/_D5A7155.jpg', '/images/coastal/IMG_1778.jpg', '/images/gallery/IMG_4649.jpg',
  '/images/school/IMG_6134.jpg', '/images/wellness/IMG_0279.jpg', '/images/b2s/_D5A8212.jpg',
  '/images/coastal/IMG_4805.jpg', '/images/gallery/IMG_1673.jpg', '/images/school/IMG_7067.jpg',
  '/images/b2s/_D5A6099.jpg', '/images/coastal/IMG_4953.jpg',
]

const CARD_W = 420
const CARD_H = 540
const CARD_GAP = 40
const ITEM_W = CARD_W + CARD_GAP

export default function GalleryCarousel3D() {
  const stageRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const scrollXRef = useRef(0)
  const velocityRef = useRef(0)
  const isDragging = useRef(false)
  const lastX = useRef(0)
  const lastDelta = useRef(0)
  const lastTime = useRef(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [mounted, setMounted] = useState(false)

  const TRACK = IMAGES.length * ITEM_W
  const mod = (n: number, m: number) => ((n % m) + m) % m

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !stageRef.current) return

    const stage = stageRef.current
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (cards.length === 0) return

    // Entry animation
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'expo.out' }
    )

    const tick = () => {
      const now = performance.now()
      const dt = Math.min((now - (lastTime.current || now)) / 1000, 0.1)
      lastTime.current = now

      if (!isDragging.current) {
        velocityRef.current *= Math.pow(0.94, dt * 60)
        if (Math.abs(velocityRef.current) < 0.5) velocityRef.current = -25
        scrollXRef.current = mod(scrollXRef.current + velocityRef.current * dt, TRACK)
      }

      const half = TRACK / 2
      const vw = window.innerWidth
      const center = vw / 2

      for (let i = 0; i < cards.length; i++) {
        let pos = i * ITEM_W - scrollXRef.current
        if (pos < -half) pos += TRACK
        if (pos > half) pos -= TRACK

        const norm = Math.max(-1, Math.min(1, (pos - center + CARD_W / 2) / (center * 1.2)))
        const invNorm = 1 - Math.abs(norm)
        const ry = -norm * 24
        const tz = invNorm * 160
        const scale = 0.88 + invNorm * 0.14

        const el = cards[i]
        el.style.transform = `translate3d(${pos}px, -50%, ${tz}px) rotateY(${ry}deg) scale(${scale})`
        el.style.zIndex = String(Math.round(tz))
      }

      rafRef.current = requestAnimationFrame(tick)
    }

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
      scrollXRef.current = mod(scrollXRef.current - dx * 1.2, TRACK)
      lastDelta.current = dx
      lastX.current = e.clientX
    }
    const onUp = () => {
      isDragging.current = false
      velocityRef.current = -lastDelta.current * 1.2
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
  }, [mounted, TRACK])

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
          height: `${CARD_H + 80}px`,
          perspective: '2000px',
          cursor: 'grab',
          touchAction: 'pan-y',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
          }}
        >
          {IMAGES.map((src, i) => (
            <div
              key={src}
              ref={(el) => { cardRefs.current[i] = el }}
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: CARD_W,
                height: CARD_H,
                borderRadius: 16,
                overflow: 'hidden',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
                cursor: 'grab',
                opacity: 0,
                background: '#FFC700',
                boxShadow: '0 8px 40px -12px #000',
              }}
            >
              {/* Iridescent border effect */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 16,
                  padding: 3,
                  background: 'var(--holo-gradient)',
                  backgroundSize: '400% 400%',
                  animation: 'holo-shift 24s ease infinite',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude' as never,
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />
              {/* Yellow card with centered photo */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#FFC700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  draggable={false}
                  loading={i < 6 ? 'eager' : 'lazy'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: 8,
                    filter: 'brightness(1.08) saturate(1.2)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
