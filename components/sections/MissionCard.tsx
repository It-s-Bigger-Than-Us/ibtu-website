'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TypingEffect from '@/components/ui/TypingEffect'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   MISSION — "Our Mission" label + typewriter
   Gold card on black bg. Mission statement
   types out character by character.
   Poppins font, larger size.
═══════════════════════════════════════ */

export default function MissionCard() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

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
      <div
        ref={cardRef}
        className="gsap-reveal"
        style={{
          background: 'var(--ibtu-gold)',
          borderRadius: '16px',
          padding: 'clamp(48px, 6vw, 80px)',
          maxWidth: '900px',
          width: '100%',
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
            display: 'block',
            marginBottom: '24px',
          }}
        >
          Our Mission
        </span>

        {/* Mission statement — typewriter effect */}
        <TypingEffect
          text="It's Bigger Than Us builds trusted, place-based programs that support youth, families, and neighborhoods through education, health access, and crisis response — designed with dignity, informed by community, and built to last."
          speed={20}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            lineHeight: 1.3,
            color: 'var(--ibtu-black)',
            fontWeight: 700,
            maxWidth: '780px',
          }}
        />
      </div>
    </section>
  )
}
