import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://citizenwatchbharat.com'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/bio'], // ✅ disallow multiple paths
        },
        sitemap: [
            `${baseUrl}/sitemap.xml`,
        ],
        host: baseUrl.replace(/^https?:\/\//, ''),
    }
}
