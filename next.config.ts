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
    async redirects() {
        return [
            // Redirect specific pages to homepage
            {
                source: '/register',
                destination: '/',
                permanent: true,
            },
            {
                source: '/disclaimer',
                destination: '/',
                permanent: true,
            },
            {
                source: '/careers',
                destination: '/career',
                permanent: true,
            },
            {
                source: '/terms-service',
                destination: '/terms-of-service',
                permanent: true,
            },
            {
                source: '/change',
                destination: '/',
                permanent: true,
            },
            {
                source: '/contact-info',
                destination: '/contact',
                permanent: true,
            },
            {
                source: '/profile',
                destination: '/',
                permanent: true,
            },
            {
                source: '/profile/citizenwatchbharat',
                destination: '/',
                permanent: true,
            },
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
            {
                source: '/$',
                destination: '/',
                permanent: true,
            },
            // Redirect archive numeric IDs
            {
                source: '/archives/:id(\\d+)',
                destination: '/',
                permanent: true,
            },
            // Redirect feed URLs
            {
                source: '/archives/:id/feed',
                destination: '/',
                permanent: true,
            },
            // Redirect category pages
            {
                source: '/archives/category/:category*',
                destination: '/',
                permanent: true,
            },
            {
                source: '/category/:category*',
                destination: '/',
                permanent: true,
            },
            {
                source: '/index.php/category/:category*',
                destination: '/',
                permanent: true,
            },
            {
                source: '/news/category/:category*',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;