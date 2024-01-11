/**
 * @type {import('next').NextConfig}
 */

const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: ['https://live.screendollars.com/'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. //
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  // basePath: process.env.NODE_ENV === 'production' ? '/projects/sdnext' : undefined,
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/projects/sdnext' : undefined,
  async redirects() {
    return [
      {
        source: '/videos',
        destination: '/video/',
        permanent: true,
      },
      {
        source: '/thefilmverdict',
        destination: '/critics-reviews/',
        permanent: true,
      },
      {
        source: '/articles',
        destination: '/news/',
        permanent: true,
      },
      {
        source: '/6-weeks',
        destination: '/film-data/releases-6-weeks/',
        permanent: true,
      },
      {
        source: '/6-month-release-calendar/',
        destination: '/film-data/releases-6-months/',
        permanent: true,
      },
      {
        source: '/trailers-clips/',
        destination: '/video/trailers-clips/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
