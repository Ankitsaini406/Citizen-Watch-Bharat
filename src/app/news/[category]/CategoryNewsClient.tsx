"use client";

import React, { useEffect, useMemo } from "react";
import { NewsGridWithInfiniteScroll } from "@/components/NewsGrid";
import { useNewsQuery } from "@/hooks/useNews";
import { useInView } from "@/hooks/useView";

const DEFAULT_PAGE_SIZE = 9;

interface CategoryNewsClientProps {
    category: string;
    exclude?: string; // optional, can exclude a slug
}

export default function CategoryNewsClient({ category, exclude }: CategoryNewsClientProps) {
    const [ref, inView] = useInView();

    // Use unified paginated hook
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useNewsQuery({ category, exclude, limit: DEFAULT_PAGE_SIZE });

    // Flatten pages into a single array
    const news = useMemo(
        () => data?.pages.flatMap(page => page.data) || [],
        [data]
    );

    // Capitalize category for display
    const title = useMemo(
        () =>
            category
                ? `${category.charAt(0).toUpperCase()}${category.slice(1)} News`
                : "News",
        [category]
    );

    // Infinite scroll: fetch next page when in view
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

            {/* Infinite scroll trigger */}
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
