import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

// Live countdown image for email. Referenced as <img src="https://ibtu.la/email/countdown?to=2026-12-01">
// Renders "NN DAYS" in LOT on IBTU gold, refreshed hourly so every open shows the current count.
export const runtime = 'nodejs'
export const revalidate = 3600

const GOLD = '#FFC700'
const BLACK = '#000000'

function daysUntil(iso: string): number {
  // Count calendar days in America/Los_Angeles.
  const now = new Date()
  const laNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
  const today = Date.UTC(laNow.getFullYear(), laNow.getMonth(), laNow.getDate())
  const [y, m, d] = iso.split('-').map(Number)
  const target = Date.UTC(y, m - 1, d)
  return Math.max(0, Math.round((target - today) / 86400000))
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const to = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get('to') ?? '') ? (url.searchParams.get('to') as string) : '2026-12-01'
  const label = (url.searchParams.get('label') ?? 'TO A CITY UNITED · DEC 1').slice(0, 48)
  const n = daysUntil(to)
  const big = n === 0 ? 'TONIGHT' : `${n} ${n === 1 ? 'DAY' : 'DAYS'}`

  const lot = await readFile(path.join(process.cwd(), 'public', 'fonts', 'LOT-Regular.otf'))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: GOLD,
          padding: '0 64px',
        }}
      >
        <div style={{ fontFamily: 'LOT', fontSize: 168, lineHeight: 1, color: BLACK, letterSpacing: -2 }}>{big}</div>
        <div style={{ fontFamily: 'LOT', fontSize: 44, lineHeight: 1.1, color: BLACK, marginTop: 20 }}>{label}</div>
      </div>
    ),
    {
      width: 1200,
      height: 360,
      fonts: [{ name: 'LOT', data: lot, style: 'normal', weight: 400 }],
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    },
  )
}
