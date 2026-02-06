import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  // Declaramos turbopack explícitamente para evitar conflicto
  turbopack: {},
};

export default nextConfig;
