/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    domains: [], // Tambahkan domain jika perlu load image dari external
    remotePatterns: [],
  },
  
  // Experimental features (optional)
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig