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
    ],
  },
}

export default withContentlayer(nextConfig)
