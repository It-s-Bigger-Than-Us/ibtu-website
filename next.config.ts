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
      // Consolidated program pages — old /our-programs/* URLs now redirect to standalone pages
      {
        source: '/our-programs/back-to-school',
        destination: '/back2school',
        permanent: true,
      },
      {
        source: '/our-programs/back-2-school',
        destination: '/back2school',
        permanent: true,
      },
      {
        source: '/our-programs/fire-relief',
        destination: '/fire-relief',
        permanent: true,
      },
      // Short URLs
      {
        source: '/b2s',
        destination: '/back2school',
        permanent: true,
      },
      {
        source: '/hub',
        destination: '/fire-relief',
        permanent: true,
      },
      {
        source: '/gala',
        destination: 'https://secure.qgiv.com/for/itsbiggerthanus/event/gala/',
        permanent: false,
      },
      {
        source: '/7years',
        destination: 'https://secure.qgiv.com/for/ibt/',
        permanent: false,
      },
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
