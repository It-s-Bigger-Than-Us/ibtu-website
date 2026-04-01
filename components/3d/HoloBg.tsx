'use client'

import { useEffect, useRef } from 'react'

/* ═══════════════════════════════════════
   HOLO BG — animated holographic gradient
   Smooth iridescent mesh gradient via canvas.
   Matches CodePen terminel/wvYKVwL colors.
═══════════════════════════════════════ */

interface Orb {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

const COLORS = [
  'rgba(255, 107, 157, 0.6)',   // pink
  'rgba(107, 255, 184, 0.5)',   // mint/green
  'rgba(184, 169, 255, 0.55)',  // lavender/purple
  'rgba(255, 224, 102, 0.4)',   // gold
  'rgba(100, 220, 255, 0.5)',   // cyan
  'rgba(255, 140, 200, 0.45)',  // hot pink
  'rgba(130, 255, 220, 0.4)',   // teal
]

export default function HoloBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let w = 0
    let h = 0

    const orbs: Orb[] = COLORS.map((color) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.003,
      vy: (Math.random() - 0.5) * 0.003,
      radius: 0.3 + Math.random() * 0.25,
      color,
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      raf = requestAnimationFrame(draw)

      // Dark base
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)

      // Draw each orb as a large radial gradient
      for (const orb of orbs) {
        // Drift
        orb.x += orb.vx
        orb.y += orb.vy

        // Bounce off edges (soft)
        if (orb.x < -0.1 || orb.x > 1.1) orb.vx *= -1
        if (orb.y < -0.1 || orb.y > 1.1) orb.vy *= -1

        const cx = orb.x * w
        const cy = orb.y * h
        const r = orb.radius * Math.max(w, h)

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grad.addColorStop(0, orb.color)
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      ctx.globalCompositeOperation = 'source-over'
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'saturate(1.4) blur(60px)',
      }}
    />
  )
}
