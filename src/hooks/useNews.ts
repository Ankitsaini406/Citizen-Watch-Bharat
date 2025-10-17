import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { NewsArticle } from '@/types/type';
import { baseApiUrl } from '@/utils/ApiUtils';

export interface NewsQueryOptions {
    category?: string;
    tags?: string[];
    exclude?: string;
    limit?: number;
}

export interface InfiniteNewsResponse {
    data: NewsArticle[];
    pagination: {
        total: number;
        page: number;
        pageSize: number;
        hasMore: boolean;
    };
}

/** Unified paginated news hook */
export const useNewsQuery = (options: NewsQueryOptions = {}) => {
    const { category, tags, exclude, limit = 9 } = options;

    return useInfiniteQuery<
        InfiniteNewsResponse,        // TData
        Error,                       // TError
        InfiniteNewsResponse,        // TQueryFnData
        ['news', NewsQueryOptions],  // TQueryKey
        number                       // TPageParam
    >({
        queryKey: ['news', options],
        queryFn: async ({ pageParam = 1 }) => {
            // pageParam is now typed as number
            const currentPage = pageParam;

            if (tags && tags.length === 0) {
                return {
                    data: [],
                    pagination: { total: 0, page: 1, pageSize: limit, hasMore: false },
                };
            }

            const query = new URLSearchParams({
                limit: limit.toString(),
                page: currentPage.toString(),
            });

            if (category) query.append('category', category);
            if (tags?.length) query.append('tags', tags.join(','));
            if (exclude) query.append('exclude', exclude);

            const res = await fetch(`${baseApiUrl}news?${query.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch news');

            const data = await res.json();
            return {
                data: data.data,
                pagination: { ...data.pagination, pageSize: limit },
            };
        },
        getNextPageParam: (lastPage) =>
            lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
        initialPageParam: 1,
    });
};

/** Single article hook */
export const useArticle = (slug: string) => {
    return useQuery<NewsArticle, Error>({
        queryKey: ['article', slug],
        queryFn: async () => {
            if (!slug) throw new Error('Invalid slug');

            const res = await fetch(`${baseApiUrl}news/${slug}`);
            const data = await res.json();

            if (data.success) return data.data.news;
            throw new Error('Article not found');
        },
        enabled: !!slug,
    });
};

/** Wrapper hooks for specific use cases */
export const useCategoryNews = (category?: string, exclude?: string, limit?: number) =>
    useNewsQuery({ category, exclude, limit });

export const useRelatedNews = (slug: string, tags?: string[], limit = 6) =>
    useNewsQuery({ tags, exclude: slug, limit });

export const useSocialNews = (limit = 9) => useNewsQuery({ limit });
