/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true, // I ran out of my image optimization quotas in vercel
    remotePatterns: [
      {
        hostname: "*.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
