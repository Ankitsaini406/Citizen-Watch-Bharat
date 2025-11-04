import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const isDev = process.env.NODE_ENV === "development";

const scriptSrc = [
    "'self'",
    "'unsafe-inline'", // needed for inline scripts (like GTM)
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    isDev ? "'unsafe-eval'" : "",
]
    .filter(Boolean)
    .join(" ");

const connectSrc = [
    "'self'",
    "https://api.citizenwatchbharat.com",
    "http://localhost:5007/",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com", // <--- ADD THIS
].join(" ");

const securityHeaders = [
    {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
    },
    {
        key: "Content-Security-Policy",
        value: `
      default-src 'self';
      img-src * data: blob:;
      media-src *;
      script-src ${scriptSrc};
      style-src 'self' 'unsafe-inline';
      connect-src ${connectSrc};
      font-src 'self' data:;
      frame-ancestors 'self';
    `.replace(/\s{2,}/g, " ").trim(),
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
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "citizenwatchbharat.com",
            },
        ],
        qualities: [75, 85],
    },

    env: {
        JWT_SECRET: process.env.NEXT_JWT_SECRET,
        HOST_URL: process.env.NEXT_HOST_URL,
        LOCAL_URL: process.env.NEXT_LOCAL_URL,
        HOST_API_URL: process.env.NEXT_HOST_API_URL,
        LOCAL_API_URL: process.env.NEXT_LOCAL_API_URL,
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
