import type { NextConfig } from 'next'
import { createSecurityHeaders } from './src/lib/security-headers'

const securityHeaders = createSecurityHeaders({
  development: process.env.NODE_ENV === 'development',
  frameSrc: ["https://www.google.com"],
})

const nextConfig: NextConfig = {
  // Every image is served as webp, whatever its source format.
  images: { formats: ['image/webp'] },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

export default nextConfig
