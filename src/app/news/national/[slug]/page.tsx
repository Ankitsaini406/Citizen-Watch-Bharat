'use client';

import { LeftBanner, RightBanner, TopBanner, MiddleBanner, BottomBanner } from "@/components/AddBanners";
import { use, useState, useEffect } from "react";
import { fetchNewsByState } from "@/utils/ApiUtils";
import { NewsArticle } from "@/types/type";
import { ButtonLink } from "@/utils/Buttons";
import { extractFirstImage, timeAgo } from "@/utils/Utils";
import Image from "next/image";
import { indianStatesBySlug } from "@/data/indianStates";

export default function StatePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 0 });
    const [currentPage, setCurrentPage] = useState(1);

    const stateInfo = indianStatesBySlug[slug];

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const result = await fetchNewsByState(slug, currentPage);
                setNews(result.data);
                setPagination(result.pagination);
            } catch (error) {
                console.error('Error loading state news:', error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, [slug, currentPage]);


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
            <TopBanner place="News-Section" />
            <LeftBanner place="News-Section" />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{stateInfo.name} News</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {news.length === 0 ? (
                            <div className="bg-white shadow-md p-8 text-center">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">No News Available</h2>
                                <p className="text-gray-500">No news articles found for {stateInfo.name} at the moment.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {news.map((article, index) => {
                                    const imageUrl = extractFirstImage(article.heroImage);
                                    return (
                                        <div key={article.slug || article.id || index} className="bg-white shadow-md p-6">
                                            <div className="flex flex-col md:flex-row gap-4">
                                                {imageUrl && (
                                                    <div className="relative flex-shrink-0 w-full md:w-[200px] h-[150px]">
                                                        <Image
                                                            src={imageUrl}
                                                            alt={article.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2 mb-2">
                                                        <div className="flex gap-2">
                                                            <span className="text-xs text-gray-500">
                                                                {timeAgo(article.createdAt)}
                                                            </span>
                                                            {article.category && (
                                                                <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                                                    {article.category.name}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {article.city && (
                                                            <span className="text-xs text-gray-500">
                                                                {article.city}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <ButtonLink
                                                        href={`/news/${article.slug}`}
                                                        title={article.title}
                                                        className="text-lg font-semibold line-clamp-2 hover:text-red-600 mb-2"
                                                    />
                                                    {article.subtitle && (
                                                        <p className="text-gray-600 line-clamp-3 mb-2">
                                                            {article.subtitle}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        {article.author && (
                                                            <span>By {article.author.name}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="mt-8 flex justify-center">
                                <div className="flex gap-2">
                                    {currentPage > 1 && (
                                        <button
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Previous
                                        </button>
                                    )}
                                    <span className="px-4 py-2 text-gray-700">
                                        Page {currentPage} of {pagination.totalPages}
                                    </span>
                                    {currentPage < pagination.totalPages && (
                                        <button
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
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