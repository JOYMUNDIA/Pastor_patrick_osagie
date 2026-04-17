import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // Keep React compiler optimizations
  images: {
    // Use remotePatterns instead of domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // Allow all paths under this domain
      },
    ],
  },
  reactStrictMode: true, // Recommended for catching bugs early
};

export default nextConfig;