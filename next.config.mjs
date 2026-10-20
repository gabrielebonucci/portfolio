import path from "node:path"
import { fileURLToPath } from "node:url"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray lockfile in the user folder makes Next guess the wrong workspace root
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
  images: {
    unoptimized: true,
  },
  // Blog and workbench were removed in the October 2026 redesign
  async redirects() {
    return [
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:slug*", destination: "/", permanent: true },
      { source: "/workbench", destination: "/", permanent: true },
    ]
  },
}

export default nextConfig
