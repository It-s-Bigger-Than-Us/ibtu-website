'use client'

import { useEffect, useRef, useState } from 'react'

/* ═══════════════════════════════════════
   IRIDESCENT LOGO TRANSITION
   Inspired by codepen.io/filipz/full/JoGNQzm

   Holographic foil effect on the IBTU logo.
   Uses animated gradient overlay with mix-blend-mode
   to create a liquid glass / oilspill iridescent
   treatment. Gold/black/white palette.

   Use for section transitions or loading states.
═══════════════════════════════════════ */

interface IridescentLogoTransitionProps {
  size?: number
  duration?: number
  autoPlay?: boolean
  className?: string
}

export default function IridescentLogoTransition({
  size = 200,
  duration = 3,
  autoPlay = true,
  className = '',
}: IridescentLogoTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(autoPlay)

  useEffect(() => {
    if (autoPlay) setIsActive(true)
  }, [autoPlay])

  return (
    <div
      ref={containerRef}
      className={`iri-logo-container ${className}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => !autoPlay && setIsActive(false)}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {/* Base logo — black silhouette */}
      <div
        className="iri-logo-base"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ibtu-logo.svg"
          alt="IBTU"
          style={{
            width: '100%',
            height: '100%',
            filter: 'brightness(0)',
          }}
        />
      </div>

      {/* Iridescent overlay — masked to logo shape */}
      <div
        className="iri-logo-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            ${isActive ? '135deg' : '90deg'},
            #FFC700 0%,
            #FFD84D 12%,
            #FFFBE6 24%,
            #FFF 36%,
            #000 48%,
            #FFC700 60%,
            #FFFBE6 72%,
            #FFF 84%,
            #FFC700 100%
          )`,
          backgroundSize: '300% 300%',
          animation: isActive
            ? `iriLogoShift ${duration}s ease-in-out infinite`
            : 'none',
          WebkitMaskImage: 'url(/ibtu-logo.svg)',
          WebkitMaskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskImage: 'url(/ibtu-logo.svg)',
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          mixBlendMode: 'normal',
          transition: 'opacity 0.6s',
        }}
      />

      {/* Light refraction layer — subtle white sweep */}
      <div
        className="iri-logo-light"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            135deg,
            transparent 0%,
            transparent 30%,
            #FFF 45%,
            transparent 60%,
            transparent 100%
          )`,
          backgroundSize: '250% 250%',
          animation: isActive
            ? `iriLogoLight ${duration * 1.5}s ease-in-out infinite`
            : 'none',
          WebkitMaskImage: 'url(/ibtu-logo.svg)',
          WebkitMaskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskImage: 'url(/ibtu-logo.svg)',
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* Glow behind logo */}
      <div
        style={{
          position: 'absolute',
          inset: '-20%',
          borderRadius: '50%',
          background: isActive
            ? 'radial-gradient(circle, #FFC700 0%, transparent 70%)'
            : 'transparent',
          filter: 'blur(30px)',
          transition: 'background 0.8s',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      <style>{`
        @keyframes iriLogoShift {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 50% 100%; }
          75% { background-position: 0% 50%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes iriLogoLight {
          0% { background-position: -100% -100%; }
          50% { background-position: 200% 200%; }
          100% { background-position: -100% -100%; }
        }
        .iri-logo-container:hover .iri-logo-overlay {
          animation-duration: ${duration * 0.6}s !important;
        }
      `}</style>
    </div>
  )
}
