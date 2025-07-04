"use client";

import { Category, News } from "@/types/type";
import React from "react";

const categoryNameHindi: Record<string, string> = {
    "Political": "राजनीति",
    "Sports": "खेल",
    "Entertainment": "मनोरंजन",
    "Business": "व्यापार",
    "Elections": "चुनाव",
    "International": "अंतरराष्ट्रीय",
    "National": "राष्ट्रीय",
    "Web-Stories": "वेब कहानियाँ",
};

const categoryPriority: Record<string, number> = {
    "National": 1,
    "International": 2,
    "Political": 3,
    "Business": 4,
    "Sports": 5,
    "Entertainment": 6,
    "Elections": 7,
    "Web-Stories": 8,
};

type Props = {
    categories: Category[];
    news: News[];
};

export default function CategoryNewsList({ categories, news }: Props) {
    const newsByCategory = categories
        .map((cat) => ({
            ...cat,
            news: news.filter((n) => n.category?.slug === cat.slug),
        }))
        .filter(cat => cat.news.length > 0)
        .sort((a, b) => {
            const pa = categoryPriority[a.name] ?? 999;
            const pb = categoryPriority[b.name] ?? 999;
            return pa - pb;
        });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {newsByCategory.map((cat) => (
                <div key={cat.id} className="mb-12">
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-600 pb-2">
                            {categoryNameHindi[cat.name] || cat.name}
                        </h2>
                    </div>

                    {/* News Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cat.news.slice(0, 8).map((n) => (
                            <NewsCard key={n.id} news={n} />
                        ))}
                    </div>

                    {/* Show more button if there are more than 8 news */}
                    {cat.news.length > 8 && (
                        <div className="text-center mt-6">
                            <a 
                                href={`/category/${cat.slug}`}
                                className="inline-block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                            >
                                और {cat.news.length - 8} खबरें देखें
                            </a>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// News Card Component
function NewsCard({ news }: { news: News }) {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            {/* Image Placeholder */}
            <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Category Badge */}
                <div className="mb-2">
                    <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        {news.category?.slug || 'सामान्य'}
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
                    {news.title}
                </h3>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>आज</span>
                    <div className="flex items-center space-x-2">
                        <span>👁️ 0</span>
                        <span>💬 0</span>
                    </div>
                </div>

                {/* Read More Link */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <a 
                        href={`/news/${news.id}`}
                        className="text-red-600 hover:text-red-800 text-xs font-medium"
                    >
                        पूरा पढ़ें →
                    </a>
                </div>
            </div>
        </div>
    );
}