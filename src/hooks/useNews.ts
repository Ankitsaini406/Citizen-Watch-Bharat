import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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

// useRelatedNews hook
export const useRelatedNews = (slug: string, tags?: string[]) => {
    return useInfiniteQuery({
        queryKey: ['related-news', slug, tags],
        queryFn: async ({ pageParam = 1 }) => {
            if (!tags || tags.length === 0) {
                return {
                    data: [],
                    pagination: {
                        total: 0,
                        page: 1,
                        pageSize: 6,
                        hasMore: false
                    }
                };
            }

            const res = await fetch(
                `/api/news/related?tags=${tags.join(",")}&exclude=${slug}&page=${pageParam}`
            );
            if (!res.ok) throw new Error('Failed to fetch related news');
            return res.json();
        },
        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined;
        },
        enabled: !!slug && !!tags && tags.length > 0,
        initialPageParam: 1,
    });
};

// useCategoryNews hook
export const useCategoryNews = (categorySlug?: string, excludeSlug?: string) => {
    return useInfiniteQuery({
        queryKey: ['category-news', categorySlug, excludeSlug],
        queryFn: async ({ pageParam = 1 }) => {
            if (!categorySlug) {
                return {
                    data: [],
                    pagination: {
                        total: 0,
                        page: 1,
                        pageSize: 6,
                        hasMore: false
                    }
                };
            }

            const res = await fetch(
                `/api/news/related/${categorySlug}?exclude=${excludeSlug}&page=${pageParam}`
            );
            if (!res.ok) throw new Error('Failed to fetch category news');
            return res.json();
        },
        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined;
        },
        enabled: !!categorySlug,
        initialPageParam: 1,
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