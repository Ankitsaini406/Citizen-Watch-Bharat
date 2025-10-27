import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl.pathname;

    // 🔹 Get token or user info from cookies/localStorage (on server, use cookies)
    const token = req.cookies.get("refreshToken")?.value;

    // 🔹 1. Protect routes that require authentication
    const protectedRoutes = ["/profile"]; // add more if needed

    if (protectedRoutes.some((route) => url.startsWith(route))) {
        if (!token) {
            const loginUrl = new URL("/auth/login", req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 🔹 1. Handle old/deprecated URLs
    const oldPatterns = [
        "/archives",
        "/archives/category",
        "/archives/973",
        "/archives/971/feed",
        "/archives/969",
        "/archives/965",
        "/archives/963",
        "/archives/958",
        "/archives/956",
        "/archives/954",
        "/archives/953",
        "/archives/949",
        "/archives/937",
        "/archives/929",
        "/category",
        "/category/web-stories",
        "/category/sports",
        "/category/political",
        "/category/national",
        "/category/international",
        "/category/business",
        "/index.php",
        "/index.php/category/स्वास्थ्य/",
        "/index.php/category/तस्वीरें/",
        "/web-stories",
        "/career-with-us",
        "/careers",
        "/change",
        "/contact-info",
        "/terms-service",
        "/disclaimer",
        "/about-us",
    ];

    if (oldPatterns.some((pattern) => url === pattern || url.startsWith(`${pattern}/`))) {
        return new NextResponse("Gone", { status: 410 });
    }

    // 🔹 2. Handle invalid news URLs (with state slug)
    // Example: /news/national/uttarakhand/slug → should be 410
    const newsMatch = url.match(/^\/news\/national\/([^/]+)\/([^/]+)/);

    if (newsMatch) {
        return new NextResponse("Gone", { status: 410 });
    }

    // ✅ Otherwise, continue normally
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};
