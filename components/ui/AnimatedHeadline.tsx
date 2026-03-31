'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedHeadlineProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  style?: React.CSSProperties
  /** If true, triggers on scroll. If false, plays immediately on mount. */
  scrollTrigger?: boolean
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Color override for text */
  color?: string
  /** Size variant — maps to design tokens */
  size?: 'hero' | 'section' | 'card'
}

/**
 * Every word animates in individually — never a full line at once.
 * Used for all big display text across the site.
 */
const SIZE_MAP = {
  hero: 'var(--display-hero)',
  section: 'var(--display-section)',
  card: 'var(--display-card)',
}

export default function AnimatedHeadline({
  text,
  as: Tag = 'h2',
  className,
  style,
  scrollTrigger: useScrollTrigger = true,
  delay = 0,
  color,
  size,
}: AnimatedHeadlineProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const words = ref.current.querySelectorAll('.anim-word')
    if (!words?.length) return

    const ctx = gsap.context(() => {
      const fromVars = { opacity: 0, y: 60, rotateX: -15 }
      const config: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'expo.out',
        delay,
      }

      if (useScrollTrigger) {
        gsap.fromTo(words, fromVars, {
          ...config,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            once: true,
          },
        })
      } else {
        gsap.fromTo(words, fromVars, config)
      }
    }, ref)

    return () => ctx.revert()
  }, [useScrollTrigger, delay])

  const words = text.split(' ')

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: size ? SIZE_MAP[size] : undefined,
        lineHeight: 0.92,
        textTransform: 'uppercase' as const,
        letterSpacing: '-0.02em',
        color: color || undefined,
        perspective: '600px',
        ...style,
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="anim-word"
          style={{
            display: 'inline-block',
            opacity: 0,
          }}
        >
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
