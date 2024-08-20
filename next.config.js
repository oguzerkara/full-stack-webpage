const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true, // Disable Next.js image optimization
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
});
