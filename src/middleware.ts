import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl.pathname;

    // List of old URLs & patterns (all subroutes included)
    const oldPatterns = [
        '/archives',
        '/archives/category',
        '/archives/973',
        '/archives/971/feed',
        '/archives/969',
        '/archives/965',
        '/archives/963',
        '/archives/958',
        '/archives/956',
        '/archives/954',
        '/archives/953',
        '/archives/949',
        '/archives/937',
        '/archives/929',
        '/category',
        '/category/web-stories',
        '/category/sports',
        '/category/political',
        '/category/national',
        '/category/international',
        '/category/business',
        '/index.php',
        '/index.php/category/स्वास्थ्य/',
        '/index.php/category/तस्वीरें/',
        '/web-stories',
        '/career-with-us',
        '/careers',
        '/change',
        '/contact-info',
        '/terms-service',
        '/disclaimer',
        '/about-us',
    ];

    // Check if URL is exact or starts with any pattern + '/'
    if (oldPatterns.some((pattern) => url === pattern || url.startsWith(`${pattern}/`))) {
        return new NextResponse('Gone', { status: 410 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
    ],
};
