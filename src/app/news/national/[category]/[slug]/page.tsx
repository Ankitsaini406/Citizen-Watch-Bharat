"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import RichTextPreview from "@/utils/Editor/RichTextPreview";
import { timeAgo } from "@/utils/Utils";
import { BottomBanner, LeftBanner, MiddleBanner, RightBanner, TopBanner } from "@/components/AddBanners";
import AuthorProfile from "@/components/AuthorProfile";
import { useArticle, useCategoryNews, useRelatedNews } from "@/hooks/useNews";
import { ScrollableNewsSection } from "@/utils/ScrollAnimation";

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
    const { data: articleData, isLoading } = useArticle(slug);

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

    if (isLoading) {
        return <NewsSkeleton />;
    }

    // Article page
    if (params?.slug && articleData) {
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
                                {articleData.category.name}
                            </span>
                            <div className="flex gap-5">
                                <span>{timeAgo(articleData.createdAt)}</span>
                                <span>
                                    {[articleData.city, articleData.state, articleData.country]
                                        .filter(Boolean)
                                        .join(', ')}
                                </span>
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
                                {articleData.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 hover:text-foreground cursor-pointer"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Author and Social */}
                        {/* Author Profile */}
                        <div className="mb-8">
                            <AuthorProfile
                                author={{
                                    ...articleData.author,
                                }}
                            />
                        </div>
                    </div>

                    {((categoryNews?.length ?? 0) > 0 || (relatedNews?.length ?? 0) > 0) && <MiddleBanner place="Par-News" />}

                    {/* More from Category Section */}
                    {categoryNews.length > 0 && (
                        <ScrollableNewsSection
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
} 