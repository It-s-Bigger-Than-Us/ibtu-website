'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ═══════════════════════════════════════
   MISSION — parallax slide-up + highlight
   Text slides up from baseline. "Our Mission"
   gets iridescent highlight sweep on scroll.
   On hover: card → iridescent, highlight → yellow.
═══════════════════════════════════════ */

const MISSION_TEXT = "It's Bigger Than Us builds trusted, place-based programs that support youth, families, and neighborhoods through education, health access, and crisis response — designed with dignity, informed by community, and built to last."

export default function MissionCard() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
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
        initial={{ y: 100, opacity: 0, scale: 0.96 }}
        animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
        {/* "Our Mission" with highlight sweep */}
        <span
          style={{
            display: 'inline-block',
            marginBottom: '24px',
            position: 'relative',
          }}
        >
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
          {/* Highlight sweep — iridescent by default, yellow on hover */}
          <motion.span
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
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

        {/* Mission text — slides up */}
        <motion.p
          initial={{ y: 60, opacity: 0 }}
          animate={isInView ? { y: [60, -8, 0], opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1], delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            lineHeight: 1.3,
            color: 'var(--ibtu-black)',
            fontWeight: 700,
            maxWidth: '780px',
            margin: 0,
          }}
        >
          {MISSION_TEXT}
        </motion.p>
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
