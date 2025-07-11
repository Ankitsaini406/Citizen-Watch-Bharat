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
                                    href={`/news/${article.slug}`}
                                    title={article.title}
                                    className="text-base font-semibold line-clamp-2 hover:text-red-600 mb-2 text-left"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <ButtonSeeMore
                href={`/news/national/state/${state.slug}`}
                title="See all news"
                aria-label={`See all news from ${state.name}`}
            />
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
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded mb-4"></div>
                        <div className="h-64 bg-gray-300 rounded mb-4"></div>
                        <div className="h-32 bg-gray-300 rounded mb-4"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <TopBanner />
            <LeftBanner />
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
                            <MiddleBanner />
                        </div>
                    </div>
                </div>
            </div>

            <BottomBanner />
            <RightBanner />
        </div>
    );
}