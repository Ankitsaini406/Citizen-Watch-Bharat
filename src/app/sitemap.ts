// app/sitemap.ts
import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://citizenwatchbharat.com/'

    try {
        const categories = await prisma.category.findMany({
            select: {
                slug: true,
                subCategories: {
                    select: {
                        slug: true
                    }
                }
            },
            orderBy: { name: 'asc' },
        })

        const newsArticles = await prisma.news.findMany({
            where: {
                isPublish: true,
                isDeleted: false
            },
            select: {
                slug: true,
                createdAt: true,
                title: true,
                tags: true,
                category: {
                    select: {
                        slug: true
                    }
                },
                subCategory: {
                    select: {
                        slug: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        // News URLs
        const newsUrls: MetadataRoute.Sitemap = newsArticles.map((article) => ({
            url: `${baseUrl}news/${article.category.slug}/${article.slug}`,
            lastModified: article.createdAt,
            news: {
                publication: {
                    name: "Citizen Watch Bharat",
                    language: "en",
                },
                publicationDate: article.createdAt,
                title: article.title,
                keywords: Array.isArray(article.tags) && article.tags.length > 0
                    ? article.tags.join(", ")
                    : ""
            }
        }))

        // Category + Subcategory URLs
        const categoryUrls: MetadataRoute.Sitemap = categories.flatMap((category) => [
            {
                url: `${baseUrl}news/${category.slug}`,
                lastModified: new Date(),
                changeFrequency: 'daily' as const,
                priority: 0.8
            },
            ...(category.subCategories.map(subCat => ({
                url: `${baseUrl}news/${category.slug}/${subCat.slug}`,
                lastModified: new Date(),
                changeFrequency: 'daily' as const,
                priority: 0.7
            })))
        ])

        // Static pages
        const staticUrls: MetadataRoute.Sitemap = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'hourly' as const,
                priority: 1.0
            },
            {
                url: `${baseUrl}about`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const
            },
            {
                url: `${baseUrl}contact`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const
            },
            {
                url: `${baseUrl}career`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const
            },
            {
                url: `${baseUrl}privacy-policy`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const
            },
            {
                url: `${baseUrl}terms-of-service`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const
            },
            {
                url: `${baseUrl}code-of-ethics`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const
            },
            {
                url: `${baseUrl}auth/login`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const
            },
            {
                url: `${baseUrl}auth/signup`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const
            },
        ]

        return [
            ...staticUrls,
            ...categoryUrls,
            ...newsUrls
        ]

    } catch (error) {
        console.error('Sitemap generation error:', error)
        return [
            {
                url: baseUrl || 'https://citizenwatchbharat.com',
                lastModified: new Date()
            }
        ]
    }
}