"use client";

import React, { useEffect, useMemo } from "react";
import { NewsGridWithInfiniteScroll } from "@/components/NewsGrid";
import { useNewsQuery, PaginatedNewsResponse } from "@/hooks/useNews";
import { useInView } from "@/hooks/useView";
import { NewsArticle } from "@/types/type";

const DEFAULT_PAGE_SIZE = 9;

interface CategoryNewsClientProps {
    category: string;
    exclude?: string;
}

export default function CategoryNewsClient({
                                               category,
                                               exclude,
                                           }: CategoryNewsClientProps) {
    const [ref, inView] = useInView();

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useNewsQuery({ category, exclude, limit: DEFAULT_PAGE_SIZE });

    // ✅ Flatten pages safely without using `any`
    const news: NewsArticle[] = useMemo(() => {
        if (!data?.pages) return [];

        // Cast pages to the union type we expect so flatMap callback receives the correct type
        return (data.pages as (PaginatedNewsResponse | NewsArticle[])[])
            .flatMap((page) => {
                if (Array.isArray(page)) return page;
                if (Array.isArray((page as PaginatedNewsResponse).data)) return (page as PaginatedNewsResponse).data;
                if ((page as { results?: NewsArticle[] }).results)
                    return (page as { results?: NewsArticle[] }).results;
                if ((page as { items?: NewsArticle[] }).items)
                    return (page as { items?: NewsArticle[] }).items;
                return [];
            })
            .filter((n): n is NewsArticle => n !== undefined && n !== null);
    }, [data]);

    const title = useMemo(
        () =>
            category
                ? `${category.charAt(0).toUpperCase()}${category.slice(1)} News`
                : "News",
        [category]
    );

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <>
            <NewsGridWithInfiniteScroll
                news={news}
                loading={isLoading}
                loadingMore={isFetchingNextPage}
                title={title}
                href={`/news/${category}`}
                PAGE_SIZE={DEFAULT_PAGE_SIZE}
            />

            <div
                ref={ref}
                className="h-10 flex items-center justify-center py-4"
                aria-live="polite"
            >
                {isFetchingNextPage && <p>Loading more news...</p>}
            </div>
        </>
    );
}
