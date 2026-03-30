'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CTASectionProps {
  image: string
  headline: string
  subtext: string
  actions: { label: string; href: string; primary?: boolean }[]
}

export default function CTASection({ image, headline, subtext, actions }: CTASectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const content = sectionRef.current.querySelector('.cta-content')
    if (!content) return

    gsap.from(content.children, {
      y: 50,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section className="cta-section" ref={sectionRef}>
      <div className="cta-bg">
        <img src={image} alt="" loading="lazy" />
      </div>
      <div className="cta-content">
        <h2 className="cta-headline">{headline}</h2>
        <p className="cta-sub">{subtext}</p>
        <div className="cta-buttons">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={action.primary ? 'btn-primary' : 'btn-outline'}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
