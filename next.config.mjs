/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  transpilePackages: ['lucide-react'],
  images: {
    domains: ['encrypted-tbn0.gstatic.com'],
  },
}

export default nextConfig
