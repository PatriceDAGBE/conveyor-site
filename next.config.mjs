/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // ⬅️ Important pour générer un site statique

  basePath: "/conveyor-site", // ⬅️ À remplacer par le nom de ton repo GitHub
  assetPrefix: "/conveyor-site/",

  trailingSlash: true, // ⬅️ Nécessaire pour les chemins corrects avec export

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // ⬅️ pour éviter l'optimisation qui ne marche pas en static export
  },
}

export default nextConfig
