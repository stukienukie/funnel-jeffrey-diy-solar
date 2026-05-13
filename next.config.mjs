/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'avalon-rv.com' },
      { protocol: 'https', hostname: 'b4306208.smushcdn.com' },
    ],
  },
}

export default nextConfig
