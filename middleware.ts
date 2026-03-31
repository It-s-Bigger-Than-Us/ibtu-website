import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/* ═══════════════════════════════════════
   MAINTENANCE MODE — gate the site
   Set MAINTENANCE_MODE=true to block public access.
   Remove this file or set to false when ready to go live.
═══════════════════════════════════════ */

const MAINTENANCE_MODE = true
const BYPASS_SECRET = 'ibtu2026' // Add ?access=ibtu2026 to bypass

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_MODE) return NextResponse.next()

  // Allow Sanity Studio, API routes, and static assets
  const path = request.nextUrl.pathname
  if (
    path.startsWith('/studio') ||
    path.startsWith('/api') ||
    path.startsWith('/_next') ||
    path.startsWith('/favicon') ||
    path.startsWith('/icon') ||
    path.startsWith('/robots') ||
    path.startsWith('/sitemap') ||
    path.endsWith('.svg') ||
    path.endsWith('.png') ||
    path.endsWith('.jpg') ||
    path.endsWith('.ico')
  ) {
    return NextResponse.next()
  }

  // Bypass with secret query param — sets a cookie
  const bypass = request.nextUrl.searchParams.get('access')
  if (bypass === BYPASS_SECRET) {
    const response = NextResponse.next()
    response.cookies.set('ibtu-access', 'granted', { maxAge: 60 * 60 * 24 })
    return response
  }

  // Check for bypass cookie
  if (request.cookies.get('ibtu-access')?.value === 'granted') {
    return NextResponse.next()
  }

  // Show maintenance page
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IBTU — Coming Soon</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #000;
      color: #fff;
      font-family: 'Poppins', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      padding: 40px;
    }
    .container { max-width: 600px; }
    h1 {
      font-size: clamp(48px, 10vw, 120px);
      font-weight: 900;
      color: #FFC700;
      line-height: 0.9;
      margin-bottom: 24px;
      text-transform: uppercase;
    }
    p {
      font-size: 16px;
      line-height: 1.7;
      color: #fff;
      margin-bottom: 32px;
    }
    a {
      display: inline-block;
      background: #FFC700;
      color: #000;
      padding: 14px 36px;
      text-decoration: none;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Coming Soon</h1>
    <p>We're building something bigger. The new IBTU website is launching soon.</p>
    <p style="font-size:12px; color:#FFC700; letter-spacing:3px; text-transform:uppercase;">Community is the infrastructure.</p>
    <a href="mailto:info@itsbiggerthanusla.org">Get in Touch</a>
  </div>
</body>
</html>`,
    {
      status: 503,
      headers: { 'Content-Type': 'text/html', 'Retry-After': '3600' },
    }
  )
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
