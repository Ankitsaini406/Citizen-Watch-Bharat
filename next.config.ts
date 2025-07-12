import type { NextConfig } from 'next';
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  images: {
    domains: ['citizenwatchbharat.com'],
  },

  env: {
    HOST_URL: process.env.NEXT_HOST_URL,
    LOCAL_URL: process.env.NEXT_LOCAL_URL,
  },

  // Add favicon configuration
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;