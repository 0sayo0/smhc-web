import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  webpack(config) {
    config.externals = config.externals || [];
    config.externals.push("@sanity/vision");
    return config;
  },
};

export default nextConfig;
