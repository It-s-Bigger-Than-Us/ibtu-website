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
      // ── Vendors: ibtu.la/vendors IS the Airtable application form — nothing else
      // lives at this path (Molly 7/6). Temporary redirect so the target can change.
      {
        source: '/vendors',
        destination:
          process.env.NEXT_PUBLIC_VENDOR_FORM_URL ||
          'https://airtable.com/appxak9slpO0Okjwb/pagYRMjtQWQVupz98/form',
        permanent: false,
      },
      // ── Docs: ibtu.la/docs → Airtable form (Molly 7/16). Temporary so target can change.
      {
        source: '/docs',
        destination:
          process.env.NEXT_PUBLIC_DOCS_FORM_URL ||
          'https://airtable.com/appxak9slpO0Okjwb/pagxoRnLtn7OMYnIA/form',
        permanent: false,
      },
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
