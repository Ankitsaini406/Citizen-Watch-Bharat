import { Category, News } from "@/types/type";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { extractFirstImage } from "@/utils/Utils";

interface NewsWithImage extends News {
  heroImage: string[];
}

interface Props {
  category: Category & { news: News[] };
  categoryNameHindi: Record<string, string>;
}

export default function SportsNewsBox({ category, categoryNameHindi }: Props) {
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
            <NewsCard news={n as NewsWithImage} isFirst={index === 0} showImage={index < 3} />
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsCard({ news, isFirst = false, showImage = true }: { news: NewsWithImage; isFirst?: boolean; showImage?: boolean }) {
  const imageUrl = extractFirstImage(news.heroImage) || "/placeholder.svg";

  if (isFirst) {
    return (
      <div className="bg-white overflow-hidden h-full border border-gray-300 min-h-96">
        <Link href={`/news/${news.slug}`} className="block h-full">
          <div className="relative h-80 lg:h-full bg-gray-200">
            <Image
              src={imageUrl}
              alt={
                news.title.split(" ").slice(0, 5).join(" ") +
                (news.title.split(" ").length > 5 ? "..." : "") +
                " alt"
              }
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={true}
              placeholder="blur"
              blurDataURL="/placeholder.svg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
              <h2 className="font-semibold text-white text-2xl leading-tight line-clamp-3 hover:underline underline-offset-2">
                {news.title}
              </h2>
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
          <div className="relative h-48 bg-gray-200">
            <Image
              src={imageUrl}
              alt={
                news.title.split(" ").slice(0, 5).join(" ") +
                (news.title.split(" ").length > 5 ? "..." : "") +
                " alt"
              }
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
              placeholder="blur"
              blurDataURL="/placeholder.svg"
            />
          </div>
          <div className="pt-4">
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
        <h4 className="font-semibold text-gray-900 leading-tight mb-4 line-clamp-2 hover:underline underline-offset-2">
          {news.title}
        </h4>
      </Link>
    </div>
  );
} 