'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CTASectionProps {
  image?: string
  headline: string
  subtext: string
  actions: { label: string; href: string; primary?: boolean }[]
}

export default function CTASection({ image, headline, subtext, actions }: CTASectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate headline words
    const words = headlineRef.current?.querySelectorAll('.cta-word')
    if (words) {
      gsap.fromTo(words,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )
    }

    // Animate buttons
    const buttons = sectionRef.current.querySelectorAll('.cta-btn')
    gsap.fromTo(buttons,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        delay: 0.4,
      }
    )

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  const headlineWords = headline.split(' ')

  return (
    <section ref={sectionRef}>
      {/* Image block — separate, no text over it */}
      {image && (
        <div style={{
          width: '100%',
          height: 'clamp(300px, 40vw, 500px)',
          overflow: 'hidden',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="IBTU community in action"
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'saturate(1.15)',
            }}
          />
        </div>
      )}

      {/* CTA content — gold background, black type */}
      <div style={{
        background: 'var(--gold)',
        padding: 'clamp(80px, 10vw, 160px) clamp(32px, 5vw, 80px)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Big animated headline */}
          <h2
            ref={headlineRef}
            style={{
              fontFamily: "'LOT', 'Bebas Neue', sans-serif",
              fontSize: 'clamp(56px, 12vw, 200px)',
              lineHeight: 0.9,
              textTransform: 'uppercase',
              color: '#000',
              letterSpacing: '-0.02em',
              marginBottom: '32px',
            }}
          >
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className="cta-word"
                style={{ display: 'inline-block', opacity: 0 }}
              >
                {word}{i < headlineWords.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </h2>

          {/* Subtext */}
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(16px, 1.4vw, 22px)',
            lineHeight: 1.6,
            color: '#000',
            maxWidth: '680px',
            marginBottom: '48px',
            fontWeight: 500,
          }}>
            {subtext}
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="cta-btn"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '16px 36px',
                  borderRadius: '100px',
                  transition: 'background 0.3s, color 0.3s, transform 0.2s',
                  opacity: 0,
                  ...(action.primary
                    ? { background: '#000', color: '#fff' }
                    : { background: 'transparent', color: '#000', border: '2px solid #000' }
                  ),
                }}
                onMouseEnter={(e) => {
                  if (action.primary) {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.color = '#000';
                  } else {
                    e.currentTarget.style.background = '#000';
                    e.currentTarget.style.color = '#fff';
                  }
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  if (action.primary) {
                    e.currentTarget.style.background = '#000';
                    e.currentTarget.style.color = '#fff';
                  } else {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#000';
                  }
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
