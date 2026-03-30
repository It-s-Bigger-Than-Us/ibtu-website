'use client'

import { useState } from 'react'

interface SponsorCardProps {
  tierName: string
  priceDisplay: string
  deliverables?: string[]
  boothSize?: string
  featured?: boolean
  href: string
}

export default function SponsorCard({ tierName, priceDisplay, deliverables, boothSize, featured, href }: SponsorCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: featured ? '#FFC700' : '#141414',
        border: featured ? '2px solid #FFC700' : `1px solid ${hovered && !featured ? 'rgba(255,199,0,0.25)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 20,
        padding: '32px 28px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 320,
        textDecoration: 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? featured ? '0 16px 48px rgba(255,199,0,0.3)' : '0 16px 48px rgba(255,199,0,0.1)'
          : 'none',
        transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, box-shadow 0.25s',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {featured && (
        <span style={{
          position: 'absolute', top: 16, right: 16,
          background: '#000', color: '#FFC700',
          fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
          padding: '4px 12px', borderRadius: 100,
          fontFamily: 'Poppins, sans-serif',
        }}>
          Featured
        </span>
      )}

      <div>
        <div style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 'clamp(16px, 1.5vw, 20px)',
          fontWeight: 600,
          color: featured ? '#000' : '#fff',
          marginBottom: 8,
        }}>
          {tierName}
        </div>

        <div style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(28px, 3vw, 44px)',
          color: featured ? '#000' : '#FFC700',
          letterSpacing: -1,
          lineHeight: 1,
          marginBottom: 20,
        }}>
          {priceDisplay}
        </div>

        {boothSize && (
          <div style={{ fontSize: 12, color: featured ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.35)', marginBottom: 16, fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
            Booth: {boothSize}
          </div>
        )}

        {deliverables && deliverables.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {deliverables.map((d, i) => (
              <li key={i} style={{
                fontSize: 13,
                color: featured ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
                paddingLeft: 20,
                position: 'relative',
                fontFamily: 'Poppins, sans-serif',
              }}>
                <span style={{
                  position: 'absolute', left: 0,
                  color: featured ? '#000' : '#FFC700',
                  fontWeight: 700,
                }}>
                  ✓
                </span>
                {d}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{
        marginTop: 24,
        background: featured ? '#000' : '#FFC700',
        color: featured ? '#FFC700' : '#000',
        padding: '14px 28px',
        fontFamily: 'Poppins, sans-serif',
        fontSize: 12,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontWeight: 700,
        textAlign: 'center',
        borderRadius: 100,
      }}>
        Sponsor Now →
      </div>
    </a>
  )
}
