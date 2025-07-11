/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: '/conveyor-site',        // ← important pour GitHub Pages
  assetPrefix: '/conveyor-site/',    // ← important aussi
}

export default nextConfig

