"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import RichTextPreview from "@/utils/Editor/RichTextPreview";
import { timeAgo } from "@/utils/Utils";
import { BottomBanner, LeftBanner, MiddleBanner, RightBanner, TopBanner } from "@/components/AddBanners";
import { useArticle, useRelatedNews, useCategoryNews } from '@/hooks/useNews';
import AuthorProfile from '@/components/AuthorProfile';
import { ScrollableNewsSection } from "@/utils/ScrollAnimation";

// Error state component
function ErrorState({ message }: { message: string; }) {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-center text-red-600">
            <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="mb-2 text-lg font-semibold">{message}</div>
            <div className="flex gap-4 mt-2">
                <Link href="/" className="underline text-blue-600 px-4 py-2">Go Home</Link>
            </div>
        </div>
    );
}

// Shimmering skeleton loader for news article
function NewsSkeleton() {
    return (
        <article className="max-w-3xl mx-auto mt-8 mb-16 overflow-hidden animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6" />
            <div className="relative w-full h-80 sm:h-[400px] bg-gray-300 rounded mb-6" />
            <div className="p-6 lg:px-0">
                {/* Category and Date */}
                <div className="flex flex-wrap justify-between gap-4 mb-2 text-sm">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="flex gap-5">
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                        <div className="h-4 w-28 bg-gray-200 rounded" />
                    </div>
                </div>
                {/* Main Content */}
                <div className="space-y-3 mb-8">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded-full" />
                    <div className="h-6 w-12 bg-gray-200 rounded-full" />
                </div>
                {/* Author and Social */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="h-6 w-32 bg-gray-200 rounded" />
                    <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-200 rounded" />
                        <div className="h-6 w-20 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function NewsPage() {
    const params = useParams();
    const slug = params?.slug as string;

    // Fetch main article data
    const { data: articleData, isLoading, error } = useArticle(slug);

    // Fetch related news
    const {
        data: relatedNewsData,
        fetchNextPage: fetchNextRelatedPage,
        isFetchingNextPage: isFetchingNextRelated,
        hasNextPage: hasNextRelatedPage
    } = useRelatedNews(slug, articleData?.tags);

    // Fetch category news
    const {
        data: categoryNewsData,
        fetchNextPage: fetchNextCategoryPage,
        isFetchingNextPage: isFetchingNextCategory,
        hasNextPage: hasNextCategoryPage
    } = useCategoryNews(articleData?.category?.slug, slug);

    // Flatten the paginated data
    const relatedNews = useMemo(() =>
        relatedNewsData?.pages.flatMap(page => page.data) || [],
        [relatedNewsData]
    );

    const categoryNews = useMemo(() =>
        categoryNewsData?.pages.flatMap(page => page.data) || [],
        [categoryNewsData]
    );

    if (isLoading) return <NewsSkeleton />;
    if (error) return <ErrorState message={error.message} />;
    if (!articleData) return <ErrorState message="Article not found" />;

    if (!articleData) {
        return <ErrorState message="Article not found" />;
    }

    const heroImageRaw = articleData.heroImage;
    const firstImage = heroImageRaw || "https://citizenwatchbharat.com/images/cwb/placeholder.svg";


    return (
        <>
            <TopBanner place="Par-News" />
            <LeftBanner place="Par-News" />
            <RightBanner place="Par-News" />
            <article className="max-w-3xl mx-auto mt-8 mb-16 overflow-hidden">
                <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-relaxed px-4 lg:px-0">{articleData.title}</h1>
                {articleData.subtitle && (
                    <h2 className="md:text-xl text-gray-700 mb-4 px-4 lg:px-0">{articleData.subtitle}</h2>
                )}
                {firstImage && (
                    <div className="relative w-full h-80 sm:h-[400px]">
                        <Image
                            src={firstImage}
                            alt={articleData.title}
                            fill
                            className="object-cover"
                            priority={true}
                            placeholder="blur"
                            blurDataURL="https://citizenwatchbharat.com/images/cwb/placeholder.svg"
                        />
                    </div>
                )}

                <div className="p-4 lg:px-0">
                    {/* Category and Date */}
                    <div className="flex flex-wrap justify-between gap-4 mb-2 text-sm text-gray-500">
                        <span className="uppercase font-semibold tracking-wider text-red-600">
                            {articleData.category?.name}
                        </span>
                        <div className="flex gap-5">
                            <span>{timeAgo(articleData.createdAt)}</span>
                            {articleData.city && (
                                <span>{articleData.city}, {articleData.state}</span>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="prose max-w-none mb-8">
                        {articleData.content && typeof articleData.content === "object" ? (
                            <RichTextPreview lexicalJson={articleData.content} />
                        ) : (
                            <span className="text-gray-400">No content</span>
                        )}
                    </div>

                    {/* Tags */}
                    {articleData.tags && articleData.tags.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2.5">
                            {articleData.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 hover:text-foreground cursor-pointer"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Author Profile */}
                    <div className="mb-8">
                        <AuthorProfile
                            author={{
                                ...articleData.author,
                            }}
                        />
                    </div>
                </div>

                {(categoryNews.length > 0 || relatedNews.length > 0) && <MiddleBanner place="Par-News" />}

                {/* More from Category Section */}
                {categoryNews.length > 0 && (
                    <ScrollableNewsSection
                        // href={`/news/${articleData.category?.slug}`}
                        title={`More from ${articleData.category?.name}`}
                        news={categoryNews}
                        fetchNextPage={fetchNextCategoryPage}
                        isFetchingNextPage={isFetchingNextCategory}
                        hasNextPage={hasNextCategoryPage}
                    />
                )}

                {/* Related News Section */}
                {relatedNews.length > 0 && (
                    <ScrollableNewsSection
                        // href={`/news/${articleData.category.slug}`}
                        title="Related News"
                        news={relatedNews}
                        fetchNextPage={fetchNextRelatedPage}
                        isFetchingNextPage={isFetchingNextRelated}
                        hasNextPage={hasNextRelatedPage}
                    />
                )}
            </article>
            <BottomBanner place="Par-News" />
        </>
    );
}