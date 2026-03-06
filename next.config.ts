import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // El pase de tus productos
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // ¡El nuevo pase VIP para Pexels!
      },
    ],
  },
};

export default nextConfig;
