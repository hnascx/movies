import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { hostname: "www.themoviedb.org" },
      { hostname: "image.tmdb.org" },
    ],
  },
}

export default nextConfig
