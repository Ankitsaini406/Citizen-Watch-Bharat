"use client";

import { useEffect, useState } from "react";

type BreakingNewsItem = {
    title: string;
    slug: string;
    category: string;
    subCategory: string;
};

export function BrakingNews() {
    const [news, setNews] = useState<BreakingNewsItem[]>([]);

    useEffect(() => {
        fetch("/api/breaking-news")
            .then(res => res.json())
            .then(data => setNews(data));
    }, []);

    const marqueeText = news.map(n => n.title).join("   •   ");

    return (
        <div className="bg-red-600 py-2 overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full flex items-center px-4 bg-red-800 text-white font-bold z-10">
                Breaking News
            </div>
            <div className="ml-40">
                <div className="relative w-full h-6">
                    <div className="absolute top-0 left-0 w-full h-full flex items-center">
                        <div className="marquee whitespace-nowrap text-white font-medium">
                            {marqueeText}
                        </div>
                        <div className="marquee whitespace-nowrap text-white font-medium" aria-hidden="true">
                            {marqueeText}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}