import type { NextConfig } from 'next';
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'citizenwatchbharat.com',
      },
    ],
  },

  env: {
      JWT_SECRET: process.env.NEXT_JWT_SECRET,
    HOST_URL: process.env.NEXT_HOST_URL,
    LOCAL_URL: process.env.NEXT_LOCAL_URL,
  },
};

export default nextConfig;