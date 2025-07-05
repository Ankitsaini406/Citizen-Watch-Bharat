"use client";

import { ButtonLeft, ButtonLink } from "@/utils/Buttons";
import { useEffect, useState } from "react";
import { breakingNews, latestNews } from "@/data/dummyData";

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
    category?: { name: string } | null;
};

export function BrakingNews() {
    const [news, setNews] = useState<BreakingNewsItem[]>([]);

    useEffect(() => {
        // Use dummy breaking news data
        const dummyBreakingNews = breakingNews.map(item => ({
            title: item.title,
            slug: item.slug,
            category: item.category?.slug || "",
            subCategory: ""
        }));
        setNews(dummyBreakingNews);
    }, []);

    const marqueeText = news.map(n => n.title).join("   •   ");

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
        // Use dummy latest news data
        const dummyLatestNews = latestNews.slice(0, 6).map((item, index) => ({
            id: `latest-${index}`,
            title: item.title,
            createdAt: item.createdAt || new Date().toISOString(),
            category: { name: item.category?.slug || "General" }
        }));
        setNews(dummyLatestNews);
        setLoading(false);
    }, []);

    function timeAgo(dateString: string) {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 60) return `${diffMins} mins ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hrs ago`;
        return date.toLocaleDateString();
    }

    return (
        <div className="bg-white md:p-4 pr-0 pt-0 border-0 lg:border-l w-full h-fit">
            <h2 className="text-3xl font-extrabold text-red-700 mb-6">Latest News</h2>
            <div className="relative pl-6">
                {loading ? (
                    <div>Loading...</div>
                ) : news.length === 0 ? (
                    <div>No latest news.</div>
                ) : (
                    news.map((item, idx) => (
                        <div
                            key={item.id}
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
                                <span className="text-xs text-gray-400">{timeAgo(item.createdAt)}</span>
                                {item.category?.name && (
                                    <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                        {item.category.name}
                                    </span>
                                )}
                            </div>
                            <ButtonLink href={`/news/${item.id}`} title={item.title} className="line-clamp-2" />
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