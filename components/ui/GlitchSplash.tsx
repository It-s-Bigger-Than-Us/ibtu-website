'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CSSProperties, useEffect, useState } from 'react'

import GlitchLogoMark from './GlitchLogoMark'

/* GlitchSplash
   Full-viewport route splash overlay. Replaces the "Glitch Holographic
   Splash Intro" .aet template natively. ~1.2s sequence:

     0.0–0.3s  iridescent gradient sweep in from left
     0.3–0.7s  GlitchLogoMark flash at center
     0.7–1.0s  sacred phrase wipes in (3 lines, LOT font)
     1.0–1.2s  black skyline rises from bottom, whole overlay fades out

   Sacred phrase is verbatim per ibtu-design-system.md:
       Community
       is the
       Infrastructure. */

interface GlitchSplashProps {
  /** When true, the overlay mounts and plays its sequence, then unmounts. */
  show: boolean
  onComplete?: () => void
  /** Override the sacred phrase (rarely needed). */
  lines?: [string, string, string]
}

const baseStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}

export default function GlitchSplash({
  show,
  onComplete,
  lines = ['Community', 'is the', 'Infrastructure.'],
}: GlitchSplashProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const totalDuration = reducedMotion ? 0.2 : 1.2

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          key="glitch-splash"
          aria-hidden
          style={baseStyle}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          {/* Iridescent sweep — beats 0.0–0.3s */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(105deg, #FFF 0%, #FFF4B8 12%, #D4F5E8 24%, #FFF 36%, #FFE4D6 48%, #FFF 60%, #D4F0F8 72%, #FFF4B8 84%, #FFF 100%)',
              backgroundSize: '300% 100%',
              backgroundPosition: '0% 0%',
            }}
            initial={{ backgroundPositionX: '-100%' }}
            animate={{ backgroundPositionX: '100%' }}
            transition={{
              duration: reducedMotion ? 0.2 : 0.6,
              ease: 'easeOut',
            }}
          />

          {/* GlitchLogoMark — beats 0.3–0.7s */}
          {!reducedMotion && (
            <motion.div
              style={{ position: 'relative', zIndex: 2 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.2 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <GlitchLogoMark size={220} flash triggerOnce cycleSeconds={0.6} />
            </motion.div>
          )}

          {/* Sacred phrase — beats 0.7–1.0s */}
          {!reducedMotion && (
            <motion.div
              style={{
                position: 'absolute',
                top: '60%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 3,
                color: '#000',
                fontFamily: 'var(--font-lot, "LOT", sans-serif)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1.1,
                textTransform: 'uppercase',
                letterSpacing: 4,
                textAlign: 'center',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3, ease: 'easeOut' }}
            >
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.08, duration: 0.25 }}
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Skyline — beats 1.0–1.2s */}
          {!reducedMotion && (
            <motion.div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '40%',
                zIndex: 4,
                background:
                  'url(/skyline.svg) bottom center / cover no-repeat',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 1.0, duration: 0.2, ease: 'easeIn' }}
            />
          )}

          {/* Auto-complete after totalDuration */}
          <SplashTimer ms={totalDuration * 1000} onDone={onComplete} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SplashTimer({ ms, onDone }: { ms: number; onDone?: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDone?.(), ms)
    return () => clearTimeout(t)
  }, [ms, onDone])
  return null
}
