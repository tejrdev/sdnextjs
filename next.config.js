/**
 * @type {import('next').NextConfig}
 */

const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  staticPageGenerationTimeout: 10000,
  images: {
    unoptimized: true,
    /*domains: ['https://live.screendollars.com/'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'live.screendollars.com',
      },
      {
        protocol: 'https',
        hostname: 'www.live.screendollars.com',
      },
      {
        protocol: 'https',
        hostname: 'tejrdev.github.io',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],*/
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
        destination: '/movies/releases-6-weeks/',
        permanent: true,
      },
      {
        source: '/6-month-release-calendar/',
        destination: '/movies/releases-6-months/',
        permanent: true,
      },
      {
        source: '/trailers-clips/',
        destination: '/video/trailers-clips/',
        permanent: true,
      },
      {
        source: '/index/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/film-data/:path*',
        destination: '/movies/:path*',
        permanent: true,
      },
      {
        source: '/film-detail/:path*',
        destination: '/movie/:path*',
        permanent: true,
      },

      {
        source: '/talent',
        destination: '/celebrities ',
        permanent: true,
      },
      {
        source: '/biography/:path*',
        destination: '/celebrity/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
