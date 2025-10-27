import { MetadataRoute } from "next";
import {Category, NewsArticle} from "@/types/type";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://citizenwatchbharat.com/";
    const baseApiUrl = "https://api.citizenwatchbharat.com/";

    try {
        // 🔹 Fetch categories and news data from NestJS API
        const res = await fetch(`${baseApiUrl}news/all-data`, {
            next: { revalidate: 300 }, // cache for 5 Min
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch from backend: ${res.status}`);
        }

        const data = await res.json();

        if (!data.success) {
            throw new Error("Backend returned unsuccessful response");
        }

        const categories = data.categories || [];
        const newsArticles = data.newsArticles || [];

        // 📰 News URLs
        const newsUrls: MetadataRoute.Sitemap = newsArticles.map((article: NewsArticle) => ({
            url: `${baseUrl}news/${article.category?.slug}/${article.slug}`,
            lastModified: article.createdAt ? new Date(article.createdAt) : new Date(),
            news: {
                publication: {
                    name: "Citizen Watch Bharat",
                    language: "en",
                },
                publicationDate: article.createdAt,
                title: article.title,
                keywords:
                    Array.isArray(article.tags) && article.tags.length > 0
                        ? article.tags.join(", ")
                        : "",
            },
        }));

        // 📂 Category + Subcategory URLs
        const categoryUrls: MetadataRoute.Sitemap = categories.flatMap(
            (category: Category) => [
                {
                    url: `${baseUrl}news/${category.slug}`,
                    lastModified: new Date(),
                    changeFrequency: "daily" as const,
                    priority: 0.8,
                },
                ...(category.subCategories || []).map((subCat: Category) => ({
                    url: `${baseUrl}news/${category.slug}/${subCat.slug}`,
                    lastModified: new Date(),
                    changeFrequency: "daily" as const,
                    priority: 0.9,
                })),
            ]
        );

        // 🧭 Static pages
        const staticUrls: MetadataRoute.Sitemap = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: "hourly",
                priority: 1.0,
            },
            { url: `${baseUrl}about`, lastModified: new Date(), changeFrequency: "monthly" },
            { url: `${baseUrl}contact`, lastModified: new Date(), changeFrequency: "monthly" },
            { url: `${baseUrl}career`, lastModified: new Date(), changeFrequency: "monthly" },
            { url: `${baseUrl}privacy-policy`, lastModified: new Date(), changeFrequency: "monthly" },
            { url: `${baseUrl}terms-of-service`, lastModified: new Date(), changeFrequency: "monthly" },
            { url: `${baseUrl}code-of-ethics`, lastModified: new Date(), changeFrequency: "monthly" },
            { url: `${baseUrl}auth/login`, lastModified: new Date(), changeFrequency: "monthly" },
            { url: `${baseUrl}auth/signup`, lastModified: new Date(), changeFrequency: "monthly" },
        ];

        // ✅ Combine everything
        return [...staticUrls, ...categoryUrls, ...newsUrls];
    } catch (error) {
        console.error("Sitemap generation error:", error);
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
            },
        ];
    }
}
