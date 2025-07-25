"use client";

import { ButtonLeft, ButtonLink } from "@/utils/Buttons";
import { useEffect, useState } from "react";
import { fetchBreakingNews, fetchLatestNews } from "@/utils/ApiUtils";
import { NewsArticle } from "@/types/type";
import { LatestLoading } from "@/utils/Loading";
import { timeAgo } from "@/utils/Utils";

type BreakingNewsItem = {
    title: string;
    slug: string;
    category: string;
    subCategory: string;
};

type LatestNewsItem = {
    id: string;
    title: string;
    createdAt: string;
    slug: string;
    category?: {
        name: string;
        slug: string;
    } | null;
};

export function BrakingNews() {
    const [news, setNews] = useState<BreakingNewsItem[]>([]);

    useEffect(() => {
        fetchBreakingNews().then((breaking) => {
            setNews(
                breaking.map((item: NewsArticle) => ({
                    title: item.title,
                    slug: item.slug,
                    category: item.category?.slug || "",
                    subCategory: ""
                }))
            );
        });
    }, []);

    const marqueeText = news.map(n => n.title).join("   •   ");

    if (!news.length || !marqueeText.trim()) return null;

    return (
        <div className="container mx-auto bg-red-600 py-2 overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full flex items-center px-4 bg-red-800 text-white font-bold z-10">
                Breaking News
            </div>
            <div className="overflow-hidden">
                <div className="relative w-full h-6">
                    <div className="absolute top-0 left-0 w-full h-full flex items-center overflow-hidden">
                        <div className="marquee flex whitespace-nowrap text-white font-medium">
                            <span>{marqueeText}</span>
                            <span className="ml-16">{marqueeText}</span>
                            <span className="ml-16">{marqueeText}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LatestNews() {
    const [news, setNews] = useState<LatestNewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLatestNews().then((latest) => {
            setNews(
                latest.map((item: NewsArticle) => ({
                    id: item.id,
                    title: item.title,
                    createdAt: item.createdAt,
                    slug: item.slug,
                    category: item.category
                        ? { name: item.category.name, slug: item.category.slug }
                        : null
                }))
            );
            setLoading(false);
        });
    }, []);

    return (
        <div className="bg-white md:p-4 pr-0 pt-0 border-0 lg:border-l w-full h-fit">
            <h2 className="text-3xl font-extrabold text-red-700 mb-6">Latest News</h2>
            <div className="relative pl-6">
                {loading ? (
                    <LatestLoading />
                ) : news.length === 0 ? (
                    <div>No latest news.</div>
                ) : (
                    news.map((item, idx) => (
                        <div
                            key={item.slug || item.id || idx}
                            className="pb-3 last:mb-0 mt-3 border-b relative group transition-all duration-200"
                        >
                            {/* Timeline Dot */}
                            <span
                                className={`absolute -left-[20px] top-0 w-3 h-3 rounded-full border-2 ${idx === 0
                                    ? 'bg-black shadow-lg'
                                    : 'bg-white'
                                    } transition-all duration-200`}
                            ></span>
                            {/* Timeline Line Animation */}
                            {idx !== news.length - 1 && (
                                <span className="absolute -left-[14.6px] top-3 w-0.5 h-full bg-black"></span>
                            )}
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs">{timeAgo(item.createdAt)}</span>
                                {item.category?.name && (
                                    <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full capitalize">
                                        {item.category.name}
                                    </span>
                                )}
                            </div>
                            <ButtonLink href={`/news/${item.category?.slug}/${item.slug}`} title={item.title} className="line-clamp-2" />
                        </div>
                    ))
                )}
            </div>
            <div className="mt-6">
                <ButtonLeft href="/news" title="READ MORE STORIES" className="text-xs" />
            </div>
        </div>
    );
}