'use client';

import { LeftBanner, RightBanner, TopBanner, MiddleBanner, BottomBanner } from "@/components/AddBanners";
import { useState, useEffect } from "react";
import { fetchAllCategoriesAndNews } from "@/utils/ApiUtils";
import { NewsArticle } from "@/types/type";
import { ButtonLink, ButtonSeeMore } from "@/utils/Buttons";
import { extractFirstImage, timeAgo } from "@/utils/Utils";
import { indianStates } from "@/data/indianStates";
import Image from "next/image";


function StateNewsSection({ state, news }: { state: { name: string; slug: string }; news: NewsArticle[] }) {
    const stateNews = news
        .filter(article =>
            article.state?.toLowerCase().includes(state.name.toLowerCase())
        )
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (stateNews.length === 0) return null;
    const visibleNews = stateNews.slice(0, 6);

    return (
        <section aria-labelledby={`state-${state.slug}-heading`} className="p-6">
            <header className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 w-full">
                    <h2
                        id={`state-${state.slug}-heading`}
                        className="text-2xl font-bold text-red-700 whitespace-nowrap"
                    >
                        {state.name}
                    </h2>
                    <div className="flex-1 border-t-2 border-red-700"></div>
                </div>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {visibleNews.map((article) => {
                    const imageUrl = extractFirstImage(article.heroImage);
                    return (
                        <div
                            key={article.slug}
                            className="flex flex-col overflow-hidden border border-gray-200"
                        >
                            {imageUrl && (
                                <div className="relative w-full h-40">
                                    <Image
                                        src={imageUrl}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 flex flex-col p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs text-gray-400">{timeAgo(article.createdAt)}</span>
                                    {article.category && (
                                        <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                            {article.category.name}
                                        </span>
                                    )}
                                </div>
                                <ButtonLink
                                    href={`/news/national/${state.slug}/${article.slug}`}
                                    title={article.title}
                                    className="text-base font-semibold line-clamp-2 hover:text-red-600 mb-2 text-left"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <ButtonSeeMore
                href={`/news/national/${state.slug}`}
                title="See all news"
                aria-label={`See all news from ${state.name}`}
            />
        </section>
    );
}

function StateNewsSkeleton() {
    return (
        <section className="p-6">
            <header className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 w-full">
                    <div className="h-8 w-32 bg-gray-300 rounded animate-pulse" />
                    <div className="flex-1 border-t-2 border-gray-300"></div>
                </div>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="flex flex-col overflow-hidden border border-gray-200">
                        <div className="relative w-full h-40 bg-gray-200 animate-pulse" />
                        <div className="flex-1 flex flex-col p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-12 bg-gray-200 rounded-full animate-pulse" />
                            </div>
                            <div className="h-5 w-full bg-gray-200 rounded mb-2 animate-pulse" />
                            <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse mx-auto" />
        </section>
    );
}

export default function NationalPage() {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const { news: allNews } = await fetchAllCategoriesAndNews();
                setNews(allNews);
            } catch (error) {
                console.error('Error loading news:', error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen">
                {/* Top Banner Skeleton */}
                <div className="h-20 w-full animate-pulse mb-4" />
                {/* Left Banner Skeleton */}
                <div className="h-96 w-32 animate-pulse fixed left-0 top-24 hidden lg:block" />
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1">
                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-1 gap-6">
                                {[...Array(3)].map((_, idx) => (
                                    <StateNewsSkeleton key={idx} />
                                ))}
                            </div>
                        </div>
                        {/* Sidebar Middle Banner Skeleton */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <div className="h-96 w-full animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom Banner Skeleton */}
                <div className="h-20 w-full bg-gray-200 animate-pulse mt-4" />
                {/* Right Banner Skeleton */}
                <div className="h-96 w-32 animate-pulse fixed right-0 top-24 hidden lg:block" />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <TopBanner place="News-Section" />
            <LeftBanner place="News-Section" />
            <div className="container mx-auto px-4 py-8">

                <div className="grid grid-cols-1">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div>
                            <div className="grid grid-cols-1 gap-6">
                                {indianStates.map((state) => (
                                    <StateNewsSection
                                        key={state.slug}
                                        state={state}
                                        news={news}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <MiddleBanner place="News-Section" />
                        </div>
                    </div>
                </div>
            </div>

            <BottomBanner place="News-Section" />
            <RightBanner place="News-Section" />
        </div>
    );
}