import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    globalNotFound: true,
  },
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./src/Lib/ImageLoader.ts",
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
