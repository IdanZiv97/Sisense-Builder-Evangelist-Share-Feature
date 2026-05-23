import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const raw = process.env.NEXT_PUBLIC_SISENSE_URL ?? "";
    // Strip trailing slash so destination paths don't double-up
    const sisenseUrl = raw.endsWith("/") ? raw.slice(0, -1) : raw;
    if (!sisenseUrl) return [];
    return [
      {
        // Proxy ALL Sisense API calls through Next.js — avoids CORS entirely
        source: "/_sisense/:path*",
        destination: `${sisenseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
