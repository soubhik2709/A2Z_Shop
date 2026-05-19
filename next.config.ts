import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      
    ],
  },
};

export default nextConfig;

/*
next.config.ts = global Next.js settings.
import type { NextConfig } from "next"; //import NextConfig type only.


1. Why use type keyword?
"Import ONLY the TypeScript type."No runtime JavaScript imported.

2. What is remotePatterns?
"Allow Next.js Image component to load images from this external website."Because Next.js blocks unknown external image URLs for security/performance.

*/