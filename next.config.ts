import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["www.themoviedb.org"],
  },
};

export default nextConfig;
