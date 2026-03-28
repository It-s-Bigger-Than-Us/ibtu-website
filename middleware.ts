import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SITE_PASSWORD = "1369";

export function middleware(request: NextRequest) {
  // Skip password for Sanity Studio and API routes
  if (
    request.nextUrl.pathname.startsWith("/studio") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname === "/password"
  ) {
    return NextResponse.next();
  }

  const auth = request.cookies.get("site-auth")?.value;
  if (auth === SITE_PASSWORD) {
    return NextResponse.next();
  }

  // Check if password was submitted
  if (request.nextUrl.searchParams.get("pw") === SITE_PASSWORD) {
    const response = NextResponse.redirect(new URL(request.nextUrl.pathname, request.url));
    response.cookies.set("site-auth", SITE_PASSWORD, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    return response;
  }

  // Show password page
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>IBTU — Password Required</title>
<style>
body { margin: 0; background: #000; color: #fff; font-family: Poppins, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
.box { text-align: center; max-width: 400px; padding: 40px; }
h1 { font-size: 24px; color: #FFC700; margin-bottom: 8px; }
p { font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 32px; }
form { display: flex; gap: 8px; }
input { flex: 1; padding: 14px 18px; background: #111; border: 1px solid rgba(255,199,0,0.3); color: #fff; font-size: 16px; outline: none; }
input:focus { border-color: #FFC700; }
button { padding: 14px 28px; background: #FFC700; color: #000; border: none; font-weight: 700; font-size: 14px; cursor: pointer; text-transform: uppercase; letter-spacing: 2px; }
</style></head>
<body><div class="box">
<h1>IBTU</h1>
<p>This site is under development. Enter the password to continue.</p>
<form method="GET"><input type="password" name="pw" placeholder="Password" autofocus /><button type="submit">Enter</button></form>
</div></body></html>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
