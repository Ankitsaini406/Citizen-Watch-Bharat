import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { NewsArticle } from '@/types/type';
import { baseApiUrl } from '@/utils/ApiUtils';

export interface NewsQueryOptions {
    category?: string;
    tags?: string[];
    exclude?: string;
    limit?: number;
}

export interface PaginatedNewsResponse {
    data: NewsArticle[];
    pagination: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
        hasMore: boolean;
    };
}

/** Unified paginated news hook */
export const useNewsQuery = (options: NewsQueryOptions = {}) => {
    const { category, tags, exclude, limit = 9 } = options;

    return useInfiniteQuery<PaginatedNewsResponse, Error>({
        queryKey: ['news', options],
        queryFn: async ({ pageParam = 1  }) => {
            const query = new URLSearchParams({
                page: pageParam.toString(),
                limit: limit.toString(),
            });

            if (category) query.append('category', category);
            if (tags?.length) query.append('tags', tags.join(','));
            if (exclude) query.append('exclude', exclude);

            const res = await fetch(`${baseApiUrl}news?${query.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch news');

            const json = await res.json();
            console.log(`This is json data : `, json);
            return json; // already has { data, pagination }
        },
        getNextPageParam: (lastPage) =>
            lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
        initialPageParam: 1,
    });
};

/** Single article hook */
export const useArticle = (slug: string) =>
    useQuery<NewsArticle, Error>({
        queryKey: ['article', slug],
        queryFn: async () => {
            if (!slug) throw new Error('Invalid slug');

            const res = await fetch(`${baseApiUrl}news/${slug}`);
            const json = await res.json();

            if (json.success && json.data) return json.data;
            throw new Error('Article not found');
        },
        enabled: !!slug,
    });

export const useCategoryNews = (category?: string, exclude?: string, limit?: number) =>
    useNewsQuery({ category, exclude, limit });

export const useRelatedNews = (slug: string, tags?: string[], limit = 6) =>
    useNewsQuery({ tags, exclude: slug, limit });

export const useSocialNews = (limit = 9) => useNewsQuery({ limit });
