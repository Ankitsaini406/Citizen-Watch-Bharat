import { useInfiniteQuery, useQuery, QueryFunctionContext } from '@tanstack/react-query';
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

export interface NewsData {
    news: NewsArticle;
    views: number;
}

/** ✅ Unified paginated news hook */
export const useNewsQuery = (options: NewsQueryOptions = {}) => {
    const { category, tags, exclude, limit = 9 } = options;

    return useInfiniteQuery<PaginatedNewsResponse, Error>({
        queryKey: ['news', options],
        queryFn: async (
            context: QueryFunctionContext
        ): Promise<PaginatedNewsResponse> => {
            const page = Number(context.pageParam ?? 1);
            const query = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (category) query.append('category', category);
            if (tags?.length) query.append('tags', tags.join(','));
            if (exclude) query.append('exclude', exclude);

            const res = await fetch(`${baseApiUrl}news?${query.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch news');

            const json: PaginatedNewsResponse = await res.json();
            return json;
        },
        getNextPageParam: (lastPage) =>
            lastPage.pagination.hasMore
                ? lastPage.pagination.page + 1
                : undefined,
        initialPageParam: 1,
    });
};

/** ✅ Single article hook */
export const useArticle = (slug: string) =>
    useQuery<NewsData, Error>({
        queryKey: ['article', slug],
        queryFn: async () => {
            if (!slug) throw new Error('Invalid slug');

            const res = await fetch(`${baseApiUrl}news/${slug}`, {
                cache: "no-store",
                next: { revalidate: 300 } // revalidate every 5 min
            });
            if (!res.ok) throw new Error('Failed to fetch article');

            const json: { success: boolean; data?: NewsData } = await res.json();
            if (json.success && json.data) return json.data;

            throw new Error('Article not found');
        },
        enabled: !!slug,
        staleTime: 5 * 60 * 1000, // cache in React Query for 5 mins
    });

/** ✅ Category news hook */
export const useCategoryNews = (
    category?: string,
    exclude?: string,
    limit?: number
) => useNewsQuery({ category, exclude, limit });

/** ✅ Related news hook */
export const useRelatedNews = (slug: string, tags?: string[], limit = 6) =>
    useNewsQuery({ tags, exclude: slug, limit });

/** ✅ Social news hook */
export const useSocialNews = (limit = 9) => useNewsQuery({ limit });
