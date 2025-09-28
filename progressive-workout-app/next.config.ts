// next.config.js

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
});

const nextConfig = {
  // Your regular Next.js config options here
};

module.exports = withPWA(nextConfig);