import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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

interface InfiniteCategoryNewsResponse {
    data: NewsArticle[];
    pagination: {
        total: number;
        page: number;
        pageSize: number;
        hasMore: boolean;
    };
}

export const useNewsCategory = (category?: string) => {
    return useInfiniteQuery<InfiniteCategoryNewsResponse>({
        queryKey: ['categoryNews', category],
        queryFn: async ({ pageParam = 1 }) => {
            if (!category) {
                return {
                    data: [],
                    pagination: {
                        total: 0,
                        page: 1,
                        pageSize: 9,
                        hasMore: false
                    }
                };
            }

            const res = await fetch(`/api/news/category/${category}?page=${pageParam}&limit=9`);
            if (!res.ok) throw new Error('Failed to fetch category news');
            
            const data = await res.json();
            return {
                data: data.data,
                pagination: {
                    ...data.pagination,
                    pageSize: 9, 
                    hasMore: data.data.length >= 9
                }
            };
        },
        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined;
        },
        enabled: !!category,
        initialPageParam: 1,
    });
};

// useStateNews hook
export const useStateNews = (stateSlug?: string) => {
    return useInfiniteQuery({
        queryKey: ['state-news', stateSlug],
        queryFn: async ({ pageParam = 1 }) => {
            if (!stateSlug) {
                return {
                    data: [],
                    pagination: {
                        total: 0,
                        page: 1,
                        pageSize: 10,
                        hasMore: false
                    }
                };
            }

            const res = await fetch(
                `/api/news/state/${stateSlug}?page=${pageParam}`
            );
            if (!res.ok) throw new Error('Failed to fetch state news');
            return res.json();
        },
        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined;
        },
        enabled: !!stateSlug,
        initialPageParam: 1,
    });
};

export const useInfiniteNewsCategory = (category: string) => {
    return useInfiniteQuery({
        queryKey: ['category-news', category],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                const res = await fetch(`/api/news/state/${category}?page=${pageParam}`);
                
                if (!res.ok) {
                    throw new Error(`Failed to fetch news: ${res.statusText}`);
                }

                const data = await res.json();
                
                // Ensure consistent response structure
                return {
                    data: data.data || [],
                    pagination: data.pagination || {
                        total: 0,
                        page: pageParam,
                        pageSize: 10,
                        hasMore: false
                    }
                };
            } catch (error) {
                console.error('Error fetching news:', error);
                throw error;
            }
        },
        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined;
        },
        enabled: !!category,
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });
};