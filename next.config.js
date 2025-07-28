/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['openweathermap.org'],
  },
};

module.exports = nextConfig;