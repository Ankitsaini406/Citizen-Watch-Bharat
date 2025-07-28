"use client";

import React, { useEffect } from "react";
import { NewsGridWithInfiniteScroll } from "@/components/NewsGrid";
import { BottomBanner, LeftBanner, RightBanner, TopBanner } from "@/components/AddBanners";
import { useParams } from "next/navigation";
import { useNewsCategory } from "@/hooks/useNews";
import { useInView } from "@/hooks/useView";

const PAGE_SIZE = 9;

export default function Page() {
    const params = useParams();
    const category = params?.category as string;
    const [ref, inView] = useInView();
    
    const { 
        data, 
        isLoading, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage 
    } = useNewsCategory(category);

    // Flatten all pages of news items into a single array
    const news = data?.pages.flatMap(page => page.data) || [];

    // Capitalize category for title
    const title = category ? `${category.charAt(0).toUpperCase()}${category.slice(1)} News` : "News";

    // Handle infinite scroll
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <>
            <TopBanner place="News-Section" />
            <div className="container mx-auto px-4 py-8">
                <NewsGridWithInfiniteScroll
                    news={news}
                    loading={isLoading}
                    loadingMore={isFetchingNextPage}
                    title={title}
                    href={`/news/${category}`}
                    PAGE_SIZE={PAGE_SIZE}
                />
                
                {/* Infinite scroll trigger */}
                <div 
                    ref={ref} 
                    className="h-10 flex items-center justify-center py-4"
                    aria-live="polite"
                >
                    {isFetchingNextPage ? (
                        <p>Loading more news...</p>
                    ) : !hasNextPage && news.length > 0 ? (
                        <></>
                    ) : null}
                </div>
            </div>
            <LeftBanner place="News-Section" />
            <RightBanner place="News-Section" />
            <BottomBanner place="News-Section" />
        </>
    );
}