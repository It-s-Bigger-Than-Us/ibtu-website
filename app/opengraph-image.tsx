import { ImageResponse } from 'next/og'

export const alt = "It's Bigger Than Us — Community is the infrastructure."
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: '#FFC700',
          padding: '80px',
        }}
      >
        {/* IBTU text logo */}
        <div
          style={{
            fontSize: '140px',
            fontWeight: 900,
            color: '#000',
            fontFamily: 'sans-serif',
            letterSpacing: '-6px',
            lineHeight: 0.9,
            marginBottom: '24px',
          }}
        >
          IBTU
        </div>

        {/* Full name */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#000',
            fontFamily: 'sans-serif',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          IT&apos;S BIGGER THAN US
        </div>

        {/* Mantra */}
        <div
          style={{
            fontSize: '24px',
            fontWeight: 500,
            color: '#000',
            fontFamily: 'sans-serif',
            letterSpacing: '2px',
          }}
        >
          Community is the infrastructure.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '80px',
            fontSize: '18px',
            fontWeight: 600,
            color: '#000',
            fontFamily: 'sans-serif',
            letterSpacing: '2px',
          }}
        >
          ibtu.la
        </div>
      </div>
    ),
    { ...size }
  )
}
