'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ═══════════════════════════════════════
   MISSION — each line slides up separately,
   "Our Mission" highlight sweeps in LAST.
   On hover: card → iridescent, highlight → yellow.
═══════════════════════════════════════ */

const MISSION_LINES = [
  "It's Bigger Than Us builds trusted, place-based programs",
  "that support youth, families, and neighborhoods",
  "through education, health access, and crisis response —",
  "designed with dignity, informed by community, and built to last.",
]

export default function MissionCard() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' })
  const [hovered, setHovered] = useState(false)

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--ibtu-black)',
        padding: 'clamp(80px, 10vh, 140px) clamp(32px, 5vw, 80px)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? undefined : 'var(--ibtu-gold)',
          backgroundImage: hovered ? 'var(--holo-gradient)' : undefined,
          backgroundSize: hovered ? '600% 600%' : undefined,
          animation: hovered ? 'holo-shift 20s ease infinite' : undefined,
          borderRadius: '16px',
          padding: 'clamp(48px, 6vw, 80px)',
          maxWidth: '900px',
          width: '100%',
          cursor: 'pointer',
          transition: 'background 0.5s',
        }}
      >
        {/* Mission text — each line slides up separately */}
        <div style={{ marginBottom: 32 }}>
          {MISSION_LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: [50, -4, 0], opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.4, 0.0, 0.2, 1],
                delay: 0.15 + i * 0.15,
              }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(22px, 3.2vw, 38px)',
                lineHeight: 1.35,
                color: 'var(--ibtu-black)',
                fontWeight: 700,
                maxWidth: '780px',
                margin: 0,
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* "Our Mission" label — highlight sweeps in LAST, after all lines */}
        <span style={{ display: 'inline-block', position: 'relative' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: 'var(--ibtu-black)',
              position: 'relative',
              zIndex: 1,
              padding: '6px 14px',
            }}
          >
            Our Mission
          </span>
          <motion.span
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15 + MISSION_LINES.length * 0.15 + 0.2,
            }}
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              height: '100%',
              borderRadius: '4px',
              backgroundImage: hovered
                ? 'linear-gradient(90deg, #FFC700, #FFC700)'
                : 'linear-gradient(90deg, #FFF4B8, #D4F0F8, #D4F5E8, #FFE4D6, #FFF4B8)',
              backgroundSize: hovered ? '100% 100%' : '300% 100%',
              animation: hovered ? 'none' : 'highlightShimmer 4s linear infinite',
              zIndex: 0,
              transition: 'background-image 0.4s',
            }}
          />
        </span>
      </motion.div>

      <style>{`
        @keyframes highlightShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </section>
  )
}
