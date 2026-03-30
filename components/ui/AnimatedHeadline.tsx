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
}

/**
 * Every word animates in individually — never a full line at once.
 * Used for all big display text across the site.
 */
export default function AnimatedHeadline({
  text,
  as: Tag = 'h2',
  className,
  style,
  scrollTrigger: useScrollTrigger = true,
  delay = 0,
}: AnimatedHeadlineProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const words = ref.current?.querySelectorAll('.anim-word')
    if (!words?.length) return

    const config: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.07,
      ease: 'power3.out',
      delay,
    }

    if (useScrollTrigger) {
      gsap.fromTo(words,
        { opacity: 0, y: 48, rotateX: -10 },
        {
          ...config,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    } else {
      gsap.fromTo(words,
        { opacity: 0, y: 48, rotateX: -10 },
        config
      )
    }

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [useScrollTrigger, delay])

  const words = text.split(' ')

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{ ...style, perspective: '600px' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="anim-word"
          style={{
            display: 'inline-block',
            opacity: 0,
            willChange: 'opacity, transform',
          }}
        >
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
