'use client'

import { CSSProperties, useEffect, useId, useRef, useState } from 'react'

/* GlitchLogoMark
   IBTU logo with an RGB-split glitch flicker. Replaces the "Glitchy Logo"
   .aet template natively. Pure CSS — three layered tinted copies of the
   logo with offset transforms, plus a scanline overlay.

   Design system honored:
   - Gold base (no grey, no rainbow)
   - Glitch is rare (every 4–6s) — Molly's "slow down the animation" rule
   - Respects prefers-reduced-motion (renders static)
   - Flash patterns clamped well below 3 Hz seizure threshold */

interface GlitchLogoMarkProps {
  size?: number
  /** 0–1. Higher = more violent offset distances. Default 0.25. */
  intensity?: number
  /** Cycle length in seconds. Glitch beats happen in last ~5% of cycle. */
  cycleSeconds?: number
  /** Fire one glitch on mount/trigger, then stay still. */
  triggerOnce?: boolean
  /** Bump intensity to 0.6 for a short window when set true (used by GlitchSplash). */
  flash?: boolean
  className?: string
  style?: CSSProperties
}

export default function GlitchLogoMark({
  size = 200,
  intensity = 0.25,
  cycleSeconds = 5,
  triggerOnce = false,
  flash = false,
  className = '',
  style,
}: GlitchLogoMarkProps) {
  const rawId = useId()
  const id = rawId.replace(/:/g, '_')
  const containerRef = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(!triggerOnce)

  // Trigger-once: arm on first mount or external `flash` toggle.
  useEffect(() => {
    if (triggerOnce) {
      setArmed(true)
      const t = setTimeout(() => setArmed(false), cycleSeconds * 1000)
      return () => clearTimeout(t)
    }
  }, [triggerOnce, cycleSeconds, flash])

  const effectiveIntensity = flash ? 0.6 : intensity
  const offset = Math.round(2 + effectiveIntensity * 8) // px offset for RGB split

  const baseStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size,
        ...style,
      }}
      aria-label="IBTU"
      role="img"
    >
      {/* Gold base — always visible */}
      <img
        src="/ibtu-logo.svg"
        alt=""
        aria-hidden
        style={{
          ...baseStyle,
          filter: 'brightness(0) saturate(100%) invert(72%) sepia(98%) saturate(1080%) hue-rotate(2deg) brightness(105%) contrast(102%)',
        }}
      />
      {/* Red channel */}
      <img
        src="/ibtu-logo.svg"
        alt=""
        aria-hidden
        className={`glm-r-${id}`}
        style={{
          ...baseStyle,
          filter: 'brightness(0) saturate(100%) invert(20%) sepia(95%) saturate(7400%) hue-rotate(-3deg) brightness(95%) contrast(110%)',
          mixBlendMode: 'screen',
          opacity: armed ? 0.85 : 0,
        }}
      />
      {/* Cyan channel */}
      <img
        src="/ibtu-logo.svg"
        alt=""
        aria-hidden
        className={`glm-c-${id}`}
        style={{
          ...baseStyle,
          filter: 'brightness(0) saturate(100%) invert(80%) sepia(40%) saturate(700%) hue-rotate(150deg) brightness(105%) contrast(100%)',
          mixBlendMode: 'screen',
          opacity: armed ? 0.85 : 0,
        }}
      />
      {/* Scanline overlay */}
      <div
        aria-hidden
        className={`glm-s-${id}`}
        style={{
          ...baseStyle,
          background:
            'repeating-linear-gradient(to bottom, rgba(0,0,0,0.0) 0px, rgba(0,0,0,0.0) 2px, rgba(0,0,0,0.35) 2.5px, rgba(0,0,0,0.0) 3px)',
          mixBlendMode: 'overlay',
          opacity: armed ? 0.4 : 0,
          pointerEvents: 'none',
        }}
      />

      <style>{`
        .glm-r-${id} {
          animation: glm-shake-r-${id} ${cycleSeconds}s steps(1, end) infinite;
        }
        .glm-c-${id} {
          animation: glm-shake-c-${id} ${cycleSeconds}s steps(1, end) infinite;
        }
        .glm-s-${id} {
          animation: glm-scan-${id} ${cycleSeconds}s steps(1, end) infinite;
        }
        @keyframes glm-shake-r-${id} {
          0%, 90%, 100% { transform: translate(0, 0); opacity: ${armed ? 0.85 : 0}; }
          92% { transform: translate(-${offset}px, 1px); opacity: ${armed ? 0.95 : 0}; }
          94% { transform: translate(${Math.round(offset * 0.7)}px, -1px); opacity: ${armed ? 0.95 : 0}; }
          96% { transform: translate(-${Math.round(offset * 0.4)}px, 0); opacity: ${armed ? 0.95 : 0}; }
        }
        @keyframes glm-shake-c-${id} {
          0%, 90%, 100% { transform: translate(0, 0); opacity: ${armed ? 0.85 : 0}; }
          92% { transform: translate(${offset}px, -1px); opacity: ${armed ? 0.95 : 0}; }
          94% { transform: translate(-${Math.round(offset * 0.7)}px, 1px); opacity: ${armed ? 0.95 : 0}; }
          96% { transform: translate(${Math.round(offset * 0.4)}px, 0); opacity: ${armed ? 0.95 : 0}; }
        }
        @keyframes glm-scan-${id} {
          0%, 90%, 100% { opacity: 0; }
          92%, 96% { opacity: ${armed ? 0.5 : 0}; }
        }
        @media (prefers-reduced-motion: reduce) {
          .glm-r-${id}, .glm-c-${id}, .glm-s-${id} {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
