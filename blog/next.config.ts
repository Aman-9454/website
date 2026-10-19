import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  // This folder sits inside the marketing repo, which has its own lockfile; keep Turbopack rooted here.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
