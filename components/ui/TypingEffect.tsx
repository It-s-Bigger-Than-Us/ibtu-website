'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   TYPING EFFECT — typewriter animation
   Text types out character by character.
   Triggers on scroll into view.
   Blinking cursor at the end.
═══════════════════════════════════════ */

interface TypingEffectProps {
  text: string
  speed?: number
  className?: string
  style?: React.CSSProperties
}

export default function TypingEffect({ text, speed = 40, className, style }: TypingEffectProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)

  // Trigger on scroll into view
  useEffect(() => {
    if (!ref.current) return
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      once: true,
      onEnter: () => setStarted(true),
    })
    return () => trigger.kill()
  }, [])

  // Type characters
  useEffect(() => {
    if (!started) return
    indexRef.current = 0
    setDisplayed('')
    setDone(false)

    const interval = setInterval(() => {
      indexRef.current++
      if (indexRef.current >= text.length) {
        setDisplayed(text)
        setDone(true)
        clearInterval(interval)
      } else {
        setDisplayed(text.slice(0, indexRef.current))
      }
    }, speed)

    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <div ref={ref} className={className} style={style}>
      <span>{displayed}</span>
      <span
        style={{
          display: 'inline-block',
          width: '3px',
          height: '1em',
          background: 'currentColor',
          marginLeft: '4px',
          verticalAlign: 'text-bottom',
          animation: done ? 'cursorBlink 1s step-end infinite' : 'none',
          opacity: done ? 1 : 1,
        }}
      />
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
