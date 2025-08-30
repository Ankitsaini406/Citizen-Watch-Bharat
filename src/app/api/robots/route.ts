
export async function GET() {

    const baseUrl = 'https://citizenwatchbharat.com'

    const robots = `
        User-agent: *
        Allow: /
        Disallow: /api/
        Disallow: /bio
        Sitemap: ${baseUrl}/sitemap.xml
    `;

    return new Response(robots.trim(), {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}