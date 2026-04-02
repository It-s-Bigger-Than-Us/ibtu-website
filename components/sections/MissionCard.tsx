'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   MISSION CARD — Gold card with skyline,
   "Our Mission" heading + statement.
   Sits before "Why We Exist" section.
═══════════════════════════════════════ */

export default function MissionCard() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Skyline at bottom of card */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/skyline.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: 'auto',
            maxHeight: '80px',
            objectFit: 'cover',
            objectPosition: 'center bottom',
            opacity: 0.08,
          }}
        />

        {/* Label */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--ibtu-black)',
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Our Mission
        </span>

        {/* Mission statement */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: 'var(--ibtu-black)',
            letterSpacing: '-0.01em',
            marginBottom: '24px',
          }}
        >
          Building trusted, place-based infrastructure for the communities that need it most.
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-md)',
            lineHeight: 1.7,
            color: 'var(--ibtu-black)',
            maxWidth: '680px',
            fontWeight: 500,
          }}
        >
          It&apos;s Bigger Than Us (IBTU) designs and operates community programs across Los Angeles — from crisis response and school stability to food access and coastal stewardship. Every program is built with the people it serves.
        </p>
      </div>
    </section>
  )
}
