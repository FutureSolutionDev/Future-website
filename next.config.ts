import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export - no server needed!
  output: 'export',

  // Enable React strict mode
  reactStrictMode: true,

  // Images must be unoptimized for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
