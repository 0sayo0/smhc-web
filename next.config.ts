import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ========================================
  // IMAGE OPTIMIZATION
  // ========================================

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",

        pathname: "/images/b3yujr2g/production/**",
      },
    ],
  },

  // ========================================
  // SECURITY HEADERS
  // ========================================

  async headers() {
    return [
      {
        source: "/:path*",

        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
