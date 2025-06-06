import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL,
    BASE_URL_DEV: process.env.BASE_URL_DEV,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // wildcard untuk semua subdomain (Next.js 13.4+)
      },
    ],
  },
};

export default nextConfig;
