'use client';

import { useEffect } from "react";
// import { indianStatesBySlug } from "@/data/indianStates";
import { useParams } from "next/navigation";
import { useStateNews } from "@/hooks/useNews";
import { useInView } from "@/hooks/useView";
import { LeftBanner, RightBanner, TopBanner, BottomBanner } from "@/components/AddBanners";
import { NewsGridWithInfiniteScroll } from "@/components/NewsGrid";

function slugToName(slug: string) {
    return slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function StateNewsPage() {
    const params = useParams();
    const category = params?.category as string;
    const [ref, inView] = useInView();

    const stateInfo = slugToName(category);
    const PAGE_SIZE = 10


    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isError,
        error
    } = useStateNews(category);

    // Combine all pages of articles into a single array
    const newsArticles = data?.pages.flatMap(page => page.data) || [];

    console.log(`This is news : `, category);

    // Handle infinite scroll
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (!stateInfo) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p>State not found</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p>Error loading news: {error?.message}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <TopBanner place="News-Section" />
            <LeftBanner place="News-Section" />

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1">
                    <NewsGridWithInfiniteScroll
                        news={newsArticles}
                        loading={isFetching && !isFetchingNextPage}
                        loadingMore={isFetchingNextPage}
                        title={`${stateInfo} News`}
                        href={`/news/national/${category}`}
                        PAGE_SIZE={PAGE_SIZE}
                    />

                    {/* Infinite scroll trigger */}
                    <div
                        ref={ref}
                        className="h-10 flex items-center justify-center py-4"
                        aria-live="polite"
                    >
                        {isFetchingNextPage ? (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
                                    <li key={idx} className="border border-gray-300 overflow-hidden animate-pulse">
                                        <div className="relative h-48 w-full bg-gray-200" />
                                        <div className="p-4 flex flex-col justify-between h-28">
                                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                                            <div className="flex justify-between mt-2">
                                                <div className="h-4 bg-gray-200 rounded w-1/3" />
                                                <div className="h-4 bg-gray-200 rounded w-1/4" />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : !hasNextPage && newsArticles.length > 0 ? (
                            <></>
                        ) : null}
                    </div>
                </div>
            </div>

            <BottomBanner place="News-Section" />
            <RightBanner place="News-Section" />
        </div>
    );
}