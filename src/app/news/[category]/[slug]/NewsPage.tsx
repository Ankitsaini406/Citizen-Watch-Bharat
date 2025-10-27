"use client";

import React, { useMemo } from "react";
import { redirect, useParams} from "next/navigation";
import Image from "next/image";
import RichTextPreview from "@/utils/Editor/RichTextPreview";
import { slugToName, timeAgo } from "@/utils/Utils";
import { MiddleBanner } from "@/components/AddBanners";
import { useArticle, useRelatedNews, useCategoryNews } from '@/hooks/useNews';
import AuthorProfile from '@/components/AuthorProfile';
import { ScrollableNewsSection } from "@/utils/ScrollAnimation";
import ShareButtons from "@/components/ui/ShareButton";
import {useAuthStore} from "@/store/AuthStore";
import { NewsSkeleton } from "@/utils/Skeleten";


export default function NewsPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const { userId } = useAuthStore();

    // Fetch main article data
    const { data: articleData, isLoading } = useArticle(slug);

    // Fetch related news
    const {
        data: relatedNewsData,
        fetchNextPage: fetchNextRelatedPage,
        isFetchingNextPage: isFetchingNextRelated,
        hasNextPage: hasNextRelatedPage
    } = useRelatedNews(slug, articleData?.news?.tags);

    // Fetch category news
    const {
        data: categoryNewsData,
        fetchNextPage: fetchNextCategoryPage,
        isFetchingNextPage: isFetchingNextCategory,
        hasNextPage: hasNextCategoryPage
    } = useCategoryNews(articleData?.news?.category?.slug, slug);

    // Flatten the paginated data
    const relatedNews = useMemo(() =>
        relatedNewsData?.pages.flatMap(page => page.data) || [],
        [relatedNewsData]
    );

    const categoryNews = useMemo(() =>
        categoryNewsData?.pages.flatMap(page => page.data) || [],
        [categoryNewsData]
    );

    if (isLoading) return <NewsSkeleton />

    if (!articleData?.news) {
        redirect("/not-found");
    }

    const heroImageRaw = articleData.news.heroImage;
    const firstImage = heroImageRaw || "https://citizenwatchbharat.com/images/cwb/placeholder.svg";


    return (
        <>
        <article className="w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-snug">{articleData.news.title}</h1>

            {articleData.news.subtitle && (
                <h2 className="md:text-xl text-gray-600 mb-6 leading-relaxed">{articleData.news.subtitle}</h2>
            )}

            {firstImage && (
                <div className="relative w-full h-64 sm:h-80 md:h-[500px] overflow-hidden shadow">
                    <Image
                        src={firstImage}
                        alt={articleData.news.title}
                        fill
                        className="object-cover"
                        priority
                        placeholder="blur"
                        blurDataURL="/images/cwb/placeholder.svg"
                    />
                </div>
            )}

            <div className="mt-6 text-sm text-gray-500 flex flex-wrap justify-between gap-3">
        <span className="uppercase font-semibold tracking-wide text-red-600">
            {articleData.news.category?.name}
        </span>
                <div className="flex gap-4">
                    <span>{timeAgo(articleData.news.createdAt)}</span>
                    <span>
                {[articleData.news.city, articleData.news.state, articleData.news.country]
                    .filter((part): part is string => Boolean(part))
                    .map(slugToName)
                    .join(", ")}
            </span>
                </div>
            </div>

            <div className="prose prose-lg max-w-none mt-6 mb-10">
                {articleData.news.content && typeof articleData.news.content === "object" ? (
                    <RichTextPreview lexicalJson={articleData.news.content} />
                ) : (
                    <span className="text-gray-400">No content</span>
                )}
            </div>

                    {/* Tags */}
                    {articleData.news.tags && articleData.news.tags.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2.5">
                            {articleData.news.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 hover:text-foreground cursor-pointer"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <ShareButtons
                        url={`https://citizenwatchbharat.com/news/${articleData.news.category.slug}/${slug}`}
                        title={articleData.news.title}
                        userId={userId == undefined ? undefined : userId}
                        newsId={articleData.news?.id}
                    />

                    {/* Author Profile */}
                    <div className="mb-8">
                        <AuthorProfile
                            author={{
                                ...articleData.news.author,
                            }}
                        />
                    </div>

                {(categoryNews.length > 0 || relatedNews.length > 0) && <MiddleBanner place="Par-News" />}

                {/* More from Category Section */}
                {categoryNews.length > 0 && (
                    <ScrollableNewsSection
                        title={`More from ${articleData.news.category?.name}`}
                        news={categoryNews}
                        onLoadMore={() => fetchNextCategoryPage()}
                        isFetchingNextPage={isFetchingNextCategory}
                        hasNextPage={hasNextCategoryPage}
                    />
                )}

                {/* Related News Section */}
                {relatedNews.length > 0 && (
                    <ScrollableNewsSection
                        title="Related News"
                        news={relatedNews}
                        onLoadMore={() => fetchNextRelatedPage()}
                        isFetchingNextPage={isFetchingNextRelated}
                        hasNextPage={hasNextRelatedPage}
                    />
                )}
            </article>
        </>
    );
}