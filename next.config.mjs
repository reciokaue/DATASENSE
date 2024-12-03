import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'avatars.githubusercontent.com',
      'loremflickr.com',
      'picsum.photos',
      'ui-avatars.com',
    ],
  },
}

// export default withContentlayer(nextConfig)
export default nextConfig
