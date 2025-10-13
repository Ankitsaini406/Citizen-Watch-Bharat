import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

// ✅ Secure Content Security Policy (no unsafe-inline / unsafe-eval)
const ContentSecurityPolicy = `
  default-src 'self';
  img-src 'self' data: blob: https://citizenwatchbharat.com;
  media-src 'self' blob:;
  script-src 'self' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  connect-src 'self' https://www.googletagmanager.com https://citizenwatchbharat.com;
  font-src 'self' data:;
  frame-ancestors 'self';
`;

const securityHeaders = [
    {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
    },
    {
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
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