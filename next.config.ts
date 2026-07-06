import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    '*': ['./public/images/**', './public/videos/**'],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      // ── Short canonical URLs (for flyers). Old paths 301 → new short canonical. ──
      // Program pages (data-driven, /our-programs/<slug> → short)
      { source: '/our-programs/coastal-care', destination: '/coastal', permanent: true },
      { source: '/our-programs/wellness', destination: '/wellness', permanent: true },
      { source: '/our-programs/community-health', destination: '/food', permanent: true },
      // Program pages (bespoke — folder renamed to the short path)
      { source: '/our-programs/back-to-school', destination: '/b2s', permanent: true },
      { source: '/our-programs/back-2-school', destination: '/b2s', permanent: true },
      { source: '/back2school', destination: '/b2s', permanent: true },
      { source: '/our-programs/fire-relief', destination: '/fire', permanent: true },
      { source: '/fire-relief', destination: '/fire', permanent: true },
      { source: '/fire-relief/:path*', destination: '/fire/:path*', permanent: true },
      { source: '/school-program', destination: '/school', permanent: true },
      { source: '/hub', destination: '/fire', permanent: true },
      // Calendar consolidated into /events
      { source: '/calendar', destination: '/events', permanent: true },
      // B2S 2026 flyer/QR short URLs → anchored event blocks on /b2s (no per-event pages)
      { source: '/b2s/miami', destination: '/b2s#event-back-2-school-miami-2026', permanent: false },
      { source: '/b2s/bhcp', destination: '/b2s#event-back-2-school-south-central-2026', permanent: false },
      { source: '/b2s/expo', destination: '/b2s#event-back-2-school-alliance-2026', permanent: false },
      { source: '/b2s/venice', destination: '/b2s#event-back-2-school-venice-2026', permanent: false },
      // External giving (kept temporary, off-site)
      { source: '/gala', destination: 'https://secure.qgiv.com/for/itsbiggerthanus/event/gala/', permanent: false },
      { source: '/7years', destination: 'https://secure.qgiv.com/for/ibt/', permanent: false },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
