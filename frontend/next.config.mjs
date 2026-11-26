/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [
      {
        source: '/:path*\\.(svg|ico|webp|avif|png|jpg|jpeg|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
  async rewrites() {
    const backendUrl = process.env.INTERNAL_BACKEND_URL || 'http://127.0.0.1:8080';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/actuator/:path*',
        destination: `${backendUrl}/actuator/:path*`,
      },
      {
        source: '/swagger-ui/:path*',
        destination: `${backendUrl}/swagger-ui/:path*`,
      },
      {
        source: '/v3/api-docs/:path*',
        destination: `${backendUrl}/v3/api-docs/:path*`,
      },
    ];
  },
};

export default nextConfig;

