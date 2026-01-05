/** @type {import('next').NextConfig} */

// Allowed domains for iframing
const frameAncestors = [
  "https://framer.com",       // Framer editor
  "https://*.framer.app",  
  "https://kingermayank.com",    // Framer hosted sites / previews
  "https://*.framer.website", // sometimes used by Framer
  // "https://YOURCUSTOMDOMAIN.com", // add if you have one
].join(" ");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'www.dropbox.com',
        pathname: '/scl/fi/**',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion']
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              `frame-ancestors ${frameAncestors}`, // Allow iframing from specified domains
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig