'use client';

import { LeftBanner, RightBanner, TopBanner, MiddleBanner, BottomBanner } from "@/components/AddBanners";
import { useState, useEffect } from "react";
import { fetchAllCategoriesAndNews } from "@/utils/ApiUtils";
import { NewsArticle, SubCategory, Category } from "@/types/type";
import { ButtonLink, ButtonSeeMore } from "@/utils/Buttons";
import { extractFirstImage, timeAgo } from "@/utils/Utils";
import Image from "next/image";

function SportsSubcategorySection({ subcategory, news }: { subcategory: SubCategory; news: NewsArticle[] }) {
    if (news.length === 0) return null;
    const visibleNews = news.slice(0, 6);
    return (
        <section aria-labelledby={`sports-subcat-${subcategory.slug}-heading`} className="p-6">
            <header className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 w-full">
                    <h2
                        id={`sports-subcat-${subcategory.slug}-heading`}
                        className="text-2xl font-bold text-red-700 whitespace-nowrap"
                    >
                        {subcategory.name}
                    </h2>
                    <div className="flex-1 border-t-2 border-red-700"></div>
                </div>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {visibleNews.map((article) => {
                    const imageUrl = extractFirstImage(article.heroImage) || "https://citizenwatchbharat.com/images/cwb/placeholder.svg";
                    return (
                        <div
                            key={article.slug}
                            className="flex flex-col overflow-hidden border border-gray-200"
                        >
                            {imageUrl && (
                                <div className="relative w-full h-60 bg-gray-300">
                                    <Image
                                        src={imageUrl}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                        priority={true}
                                        placeholder="blur"
                                        blurDataURL="https://citizenwatchbharat.com/images/cwb/placeholder.svg"
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
                href={`/news/sports/${subcategory.slug}`}
                title={`See all ${subcategory.name} news`}
                aria-label={`See all ${subcategory.name} news`}
            />
        </section>
    );
}

function SportsOtherSection({ news }: { news: NewsArticle[] }) {
    if (news.length === 0) return null;
    const visibleNews = news.slice(0, 6);
    return (
        <section aria-labelledby="sports-other-heading">
            <header className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 w-full">
                    <h2
                        id="sports-other-heading"
                        className="text-2xl font-bold text-red-700 whitespace-nowrap"
                    >
                        Other
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
                                    href={`/news/sports/${article.slug}`}
                                    title={article.title}
                                    className="text-base font-semibold line-clamp-2 hover:text-red-600 mb-2 text-left"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <ButtonSeeMore
                href={`/news/sports`}
                title="See all sports news"
                aria-label="See all sports news"
            />
        </section>
    );
}

function SportsNewsSkeleton() {
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

export default function SportsPage() {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const { categories, news: allNews } = await fetchAllCategoriesAndNews();
                // Find the sports category
                const sportsCategory = categories.find((cat: Category) => cat.name.toLowerCase() === 'sports');
                setSubCategories(sportsCategory?.subCategories || []);
                // Only sports news
                const sportsNews = allNews.filter((n: NewsArticle) => n.category?.name?.toLowerCase() === 'sports');
                setNews(sportsNews);
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
                                    <SportsNewsSkeleton key={idx} />
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

    // Group news by subcategory
    const newsBySubcategory: { [subcatId: string]: NewsArticle[] } = {};
    subCategories.forEach(subcat => {
        newsBySubcategory[subcat.id] = news.filter(n => n.subCategory?.id === subcat.id);
    });
    // News with no subcategory
    const otherNews = news.filter(n => !n.subCategory || !n.subCategory.id);

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
                                {subCategories.map(subcat => (
                                    <SportsSubcategorySection
                                        key={subcat.id}
                                        subcategory={subcat}
                                        news={newsBySubcategory[subcat.id] || []}
                                    />
                                ))}
                                <SportsOtherSection news={otherNews} />
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