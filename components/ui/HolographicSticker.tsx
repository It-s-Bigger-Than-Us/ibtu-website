'use client'

import { CSSProperties, ReactNode, useId } from 'react'

/* HolographicSticker
   Iridescent sticker / badge component. Replaces the
   "Holographic Sticker" .aet template natively, using the design-system
   --holo-* palette and animation. Pure CSS + SVG — no Three.js.

   Design system rules honored:
   - NEVER yellow text on iridescent → default text is white
   - Slow animation (per Molly's iridescent correction)
   - 100% opacity on brand colors
   - LOT font is display-only; sticker body uses Poppins */

export type StickerShape = 'circle' | 'pill' | 'rounded'
export type StickerTone = 'light' | 'gold' | 'black'

interface HolographicStickerProps {
  children?: ReactNode
  shape?: StickerShape
  /** Background tone behind the iridescent overlay. */
  tone?: StickerTone
  /** Diameter (circle) or height (pill/rounded) in px. */
  size?: number
  /** Slow speed-up to 2s on hover for "alive" feel. Off for static stamps. */
  hoverShift?: boolean
  /** Rotation in deg (sticker-on-paper look). */
  rotate?: number
  className?: string
  style?: CSSProperties
  ariaLabel?: string
}

export default function HolographicSticker({
  children,
  shape = 'rounded',
  tone = 'light',
  size = 96,
  hoverShift = true,
  rotate = 0,
  className = '',
  style,
  ariaLabel,
}: HolographicStickerProps) {
  const id = useId()

  const radius = shape === 'circle' ? '50%' : shape === 'pill' ? size : 16

  const baseBg =
    tone === 'gold' ? '#FFC700' : tone === 'black' ? '#000' : '#FFFFFF'
  const baseText =
    tone === 'gold' ? '#000' : tone === 'black' ? '#FFFFFF' : '#000'

  const blendMode = tone === 'gold' ? 'screen' : tone === 'black' ? 'screen' : 'overlay'

  return (
    <div
      className={className}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: shape === 'circle' ? size : undefined,
        height: size,
        minWidth: shape === 'circle' ? size : size * 1.5,
        padding: shape === 'circle' ? 0 : `0 ${size * 0.32}px`,
        borderRadius: radius,
        background: baseBg,
        color: baseText,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontSize: size * 0.12,
        textAlign: 'center',
        lineHeight: 1.15,
        boxShadow: '0 10px 30px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.4)',
        transform: `rotate(${rotate}deg)`,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Iridescent foil layer */}
      <div
        aria-hidden
        className={`holo-sticker-foil-${id.replace(/:/g, '_')}`}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background:
            'linear-gradient(105deg, #FFF 0%, #FFF4B8 12%, #D4F5E8 24%, #FFF 36%, #FFE4D6 48%, #FFF 60%, #D4F0F8 72%, #FFF4B8 84%, #FFF 100%)',
          backgroundSize: '300% 300%',
          mixBlendMode: blendMode,
          animation: 'holo-sticker-shift 18s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      {/* Iridescent border */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: 1.5,
          background:
            'linear-gradient(105deg, #FFC700 0%, #FFF 18%, #D4F0F8 36%, #FFF 54%, #FFE4D6 72%, #FFC700 100%)',
          backgroundSize: '200% 100%',
          animation: 'holo-sticker-shift 18s linear infinite',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude' as never,
          pointerEvents: 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <style>{`
        @keyframes holo-sticker-shift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        ${
          hoverShift
            ? `.holo-sticker-foil-${id.replace(/:/g, '_')}:hover,
               *:hover > .holo-sticker-foil-${id.replace(/:/g, '_')} {
                 animation-duration: 8s !important;
               }`
            : ''
        }
      `}</style>
    </div>
  )
}
