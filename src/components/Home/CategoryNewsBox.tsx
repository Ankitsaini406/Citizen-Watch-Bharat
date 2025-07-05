import { Category, News } from "@/types/type";
import Link from "next/link";
import React from "react";

interface Props {
    category: Category & { news: News[] };
    categoryNameHindi: Record<string, string>;
}

export default function CategoryNewsBox({ category, categoryNameHindi }: Props) {
    return (
        <div className="mb-12">
            {/* Category Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-600 pb-2">
                    {categoryNameHindi[category.name] || category.name}
                </h2>
            </div>
            {/* News Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.news.slice(0, 8).map((n) => (
                    <NewsCard key={n.slug} news={n} />
                ))}
            </div>
            {/* Show more button if there are more than 8 news */}
            {category.news.length > 8 && (
                <div className="text-center mt-6">
                    <a
                        href={`/category/${category.slug}`}
                        className="inline-block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                        और {category.news.length - 8} खबरें देखें
                    </a>
                </div>
            )}
        </div>
    );
}

function NewsCard({ news }: { news: News }) {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <Link href={`/news/${news.slug}`}>
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="p-4">
                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
                        {news.title}
                    </h3>
                </div>
            </Link>
        </div>
    );
} 