import { useQuery } from '@tanstack/react-query';
import { NewsArticle } from '@/types/type';
import { NewsItem, PaginationProps } from "@/components/NewsGridWithPagination";

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

interface CategoryNewsResponse {
    data: NewsItem[];
    pagination: PaginationProps;
}

export const useNewsCategory = (category: string, page: number) => {
    return useQuery<CategoryNewsResponse>({
        queryKey: ['categoryNews', category, page],
        queryFn: async () => {
            const res = await fetch(`/api/news/category/${category}?page=${page}`);
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Failed to fetch category news');
            }
            return {
                data: data.data.slice(0, 10), // Keep your PAGE_SIZE logic
                pagination: data.pagination
            };
        },
        enabled: !!category,
        placeholderData: (previousData) => previousData, // This replaces keepPreviousData
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};