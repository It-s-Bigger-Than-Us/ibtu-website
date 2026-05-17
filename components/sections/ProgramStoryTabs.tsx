'use client'

import { useState } from 'react'

interface Tab {
  label: string
  heading: string
  body: string[]
  bullets?: string[]
}

interface Props {
  eyebrow: string
  title: string
  tabs: Tab[]
}

export default function ProgramStoryTabs({ eyebrow, title, tabs }: Props) {
  const [active, setActive] = useState(0)
  const current = tabs[active]

  return (
    <section
      style={{
        background: '#FFC700',
        padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
        borderTop: '2px solid #000',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#000',
            fontWeight: 700,
            display: 'block',
            marginBottom: 16,
          }}
        >
          {eyebrow}
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 7vw, 96px)',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            color: '#000',
            letterSpacing: '-0.02em',
            marginBottom: 'clamp(32px, 4vw, 56px)',
          }}
        >
          {title}
        </h2>

        {/* TAB BUTTONS */}
        <div
          className="story-tabs-row"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 'clamp(28px, 3vw, 40px)',
          }}
        >
          {tabs.map((tab, i) => {
            const isActive = i === active
            return (
              <button
                key={tab.label}
                onClick={() => setActive(i)}
                type="button"
                style={{
                  background: isActive ? '#000' : 'transparent',
                  color: isActive ? '#FFC700' : '#000',
                  border: '2px solid #000',
                  borderRadius: 999,
                  padding: '12px 24px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ACTIVE PANEL */}
        <div
          style={{
            background: '#000',
            borderRadius: 16,
            padding: 'clamp(32px, 4vw, 56px)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              lineHeight: 1,
              textTransform: 'uppercase',
              color: '#FFC700',
              letterSpacing: '-0.01em',
              marginBottom: 24,
            }}
          >
            {current.heading}
          </h3>
          {current.body.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                color: '#FFF',
                lineHeight: 1.75,
                fontWeight: 500,
                marginBottom: i === current.body.length - 1 && !current.bullets ? 0 : 20,
              }}
            >
              {p}
            </p>
          ))}
          {current.bullets && (
            <ul
              style={{
                marginTop: 16,
                paddingLeft: 0,
                listStyle: 'none',
                display: 'grid',
                gap: 12,
              }}
            >
              {current.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--body-sm)',
                    color: '#FFF',
                    lineHeight: 1.6,
                    fontWeight: 500,
                    paddingLeft: 24,
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      color: '#FFC700',
                      fontWeight: 900,
                    }}
                  >
                    →
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
