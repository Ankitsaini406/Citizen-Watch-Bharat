import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const securityHeaders = [
    {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
    },
    {
        key: "Content-Security-Policy",
        value: "default-src 'self'; img-src * data: blob:; media-src *; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; connect-src *; font-src 'self' data:; frame-ancestors 'self';",
    },
    {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "Permissions-Policy",
        value: "geolocation=(), microphone=(), camera=()",
    },
];

const nextConfig: NextConfig = {
    poweredByHeader: false, // hides "x-powered-by: Next.js"

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "citizenwatchbharat.com",
            },
        ],
    },

    env: {
        JWT_SECRET: process.env.NEXT_JWT_SECRET,
        HOST_URL: process.env.NEXT_HOST_URL,
        LOCAL_URL: process.env.NEXT_LOCAL_URL,
    },

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;