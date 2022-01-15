// Analyse bundle
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// @ts-check

/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Cache images
    minimumCacheTTL: 2678400,
    domains: [
      'api.nasa.gov',
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
