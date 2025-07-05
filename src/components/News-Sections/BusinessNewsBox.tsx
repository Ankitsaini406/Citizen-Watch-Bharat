import { Category, News } from "@/types/type";
import Link from "next/link";
import React from "react";

interface Props {
  category: Category & { news: News[] };
  categoryNameHindi: Record<string, string>;
}

export default function BusinessNewsBox({ category, categoryNameHindi }: Props) {
  return (
    <div className="mb-1 p-0 md:p-4 xl:p-0 pt-0 pl-0">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 w-full">
          <h1 className="text-xl font-bold text-red-700 whitespace-nowrap">
            {categoryNameHindi[category.name] || category.name}
          </h1>
          <div className="flex-1 border-t-2 border-red-700"></div>
        </div>
      </div>
      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.news.slice(0, 9).map((n, index) => (
          <div key={n.slug} className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}>
            <NewsCard news={n} isFirst={index === 0} showImage={index < 3} />
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsCard({ news, isFirst = false, showImage = true }: { news: News; isFirst?: boolean; showImage?: boolean }) {
  if (isFirst) {
    return (
      <div className="bg-white overflow-hidden h-full border border-gray-300">
        <Link href={`/news/${news.slug}`} className="block h-full">
          {/* Full height image with text overlay */}
          <div className="relative h-80 lg:h-full bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            {/* Text overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
              <h3 className="font-semibold text-white text-2xl leading-tight line-clamp-3 hover:underline underline-offset-2">
                {news.title}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  if (showImage) {
    return (
      <div className="bg-white overflow-hidden h-full border-b border-gray-300">
        <Link href={`/news/${news.slug}`} className="block h-full">
          {/* Image Placeholder */}
          <div className="relative h-48 bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="pt-4">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 text-base leading-tight mb-4 line-clamp-2 hover:underline underline-offset-2">
              {news.title}
            </h3>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden h-full border-b border-gray-300">
      <Link href={`/news/${news.slug}`} className="block h-full">
        {/* Title only - no image */}
        <h3 className="font-semibold text-gray-900 leading-tight mb-4 line-clamp-2 hover:underline underline-offset-2">
          {news.title}
        </h3>
      </Link>
    </div>
  );
} 