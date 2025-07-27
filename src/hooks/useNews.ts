import { useQuery } from '@tanstack/react-query';
import { NewsArticle } from '@/types/type';

// Fetch single article by slug
export const useArticle = (slug: string) => {
    return useQuery({
        queryKey: ['article', slug],
        queryFn: async (): Promise<NewsArticle> => {
            const res = await fetch(`/api/news/${slug}`);
            const data = await res.json();
            if (data.success) {
                return data.data.news;
            } else {
                throw new Error("Article not found");
            }
        },
        enabled: !!slug,
    });
};

// Fetch related news by tags
export const useRelatedNews = (slug: string, tags?: string[]) => {
    return useQuery({
        queryKey: ['related-news', slug, tags],
        queryFn: async (): Promise<NewsArticle[]> => {
            if (!tags || tags.length === 0) return [];

            const res = await fetch(`/api/news/related?tags=${tags.join(",")}&exclude=${slug}`);
            const data = await res.json();
            return data.success ? data.data || [] : [];
        },
        enabled: !!slug && !!tags && tags.length > 0,
    });
};

// Fetch category news
export const useCategoryNews = (slug: string) => {
    return useQuery({
        queryKey: ['category-news', slug],
        queryFn: async (): Promise<NewsArticle[]> => {
            const res = await fetch(`/api/news/sports?exclude=${slug}`);
            const data = await res.json();
            return data.success ? data.data || [] : [];
        },
        enabled: !!slug,
    });
}; 