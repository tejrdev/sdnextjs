/**
 * @type {import('next').NextConfig}
 */

const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  staticPageGenerationTimeout: 30000,
  images: {
    unoptimized: true,
    /*domains: ['https://api.screendollars.com/'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.screendollars.com',
      },
      {
        protocol: 'https',
        hostname: 'www.api.screendollars.com',
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
        destination: '/movies/:path*/',
        permanent: true,
      },
      {
        source: '/film-detail/:path*',
        destination: '/movie/:path*/',
        permanent: true,
      },
      {
        source: '/talent',
        destination: '/celebrities/',
        permanent: true,
      },
      {
        source: '/biography/:path*',
        destination: '/celebrity/:path*/',
        permanent: true,
      },
      {
        source: '/movies/box-office-results/',
        destination: '/box-office-results/',
        permanent: true,
      },
      {
        source: '/movies/films-a-z/',
        destination: '/movies/a-z/ ',
        permanent: true,
      },
      {
        source: '/movie-reviews/',
        destination: '/movies/reviews/',
        permanent: true,
      },
      {
        source: '/movie-reviews/:path*',
        destination: '/movies/reviews/:path*/',
        permanent: true,
      },
      {
        source: '/top-10-g-rated-movies/',
        destination: '/top-g-rated-movies-all-time/',
        permanent: true,
      },
      {
        source: '/box-office-results/yearly-totals/',
        destination: '/box-office/highest-grossing-movies/',
        permanent: true,
      },
      {
        source: '/box-office-results/yearly-totals-by-rating/',
        destination: '/box-office/mpa-ratings/',
        permanent: true,
      },
      {
        source: '/box-office-results/highest-grossing-all-time/',
        destination: '/box-office/highest-grossing-movies/all-time/',
        permanent: true,
      },
      {
        source: '/box-office-results/:year(\\d{4})',
        destination: '/box-office/highest-grossing-movies/:year/',
        permanent: true,
      },
      {
        source: '/category/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      {
        source: '/category/screendollars-buzz/:path*',
        destination: '/blog/editorials/:path*',
        permanent: true,
      },
      {
        source: '/box-office-results/',
        destination: '/box-office/results/',
        permanent: true,
      },
      {
        source: '/box-office-results/:path*',
        destination: '/box-office/:path*',
        permanent: true,
      },
      {
        source: '/movies/release-calendar/',
        destination: '/movies/upcoming-movies/',
        permanent: true,
      },
      {
        source: '/blog/celeb-updates/:path*',
        destination: '/blog/celebrity-spotlight/:path*',
        permanent: true,
      },
      {
        source: '/news/dick-walshs-industry-update/project-hail-marys-strong-second-weekend-lifts-first-quarter-totals/',
        destination: '/news/dick-walshs-industry-update/project-hail-mary-q1-box-office-boost/',
        permanent: true,
      },
      {
        source: '/movie-genres/:path*',
        destination: '/movies/genres/:path*',
        permanent: true,
      },
      {
        source: '/film-festival/:path*',
        destination: '/film-festivals/:path*',
        permanent: true,
      },
      {
        source: '/studios-distributors/:path*',
        destination: '/distributors/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/news-category/:path*',
        destination: '/410',
      },
      {
        source: '/wp-content/:path*',
        destination: '/410',
      },
    ];
  },
};

module.exports = nextConfig;
