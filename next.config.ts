import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      {
        source: '/our-programs/back-to-school',
        destination: '/our-programs/back-2-school',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
