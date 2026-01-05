/** @type {import('next').NextConfig} */

// Allowed domains for iframing
const frameAncestors = [
  "'self'",
  
   // Your production site (parent where iframe lives)
   "https://kingermayank.com",
   "https://www.kingermayank.com",
 
   // Framer editor + app shells
   "https://framer.com",
   "https://www.framer.com",
   "https://*.framer.com",
   "https://*.framer.app",
 
   // Framer published domains (IMPORTANT: include bare + www + wildcard)
   "https://framer.website",
   "https://www.framer.website",
   "https://*.framer.website",
 
   // Framer asset/content hosting (sometimes involved in previews)
   "https://framerusercontent.com",
   "https://*.framerusercontent.com",

  // CodePen (for testing)
  "https://codepen.io",
  "https://cdpn.io",
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
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https",
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