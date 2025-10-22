/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimize images for better performance and SEO
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // SEO: 301 Redirects for www/non-www canonical domain
  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'www.bakstunden.se',
          },
        ],
        destination: 'https://bakstunden.se/:path*',
        permanent: true, // 301 redirect
      },
    ];
  },

  // SEO: Canonical headers for additional protection
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value: '<https://bakstunden.se/:path*>; rel="canonical"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
