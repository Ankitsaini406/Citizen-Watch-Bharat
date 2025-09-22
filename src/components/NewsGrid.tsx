import React from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Buttons";
import { NewsArticle } from "@/types/type";
import { slugToName, timeAgo } from "@/utils/Utils";

export interface NewsGridWithInfiniteScrollProps {
    news: NewsArticle[];
    loading: boolean;
    loadingMore: boolean;
    title: string;
    href: string;
    PAGE_SIZE: number;
}

export function NewsGridWithInfiniteScroll({
    news,
    loading,
    loadingMore,
    title,
    href,
    PAGE_SIZE,
}: NewsGridWithInfiniteScrollProps) {
    if (loading) {
        return (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
                    <li key={idx} className="border border-gray-300 overflow-hidden animate-pulse">
                        <div className="relative h-48 w-full bg-gray-200" />
                        <div className="p-4 flex flex-col justify-between h-28">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="flex justify-between mt-2">
                                <div className="h-4 bg-gray-200 rounded w-1/3" />
                                <div className="h-4 bg-gray-200 rounded w-1/4" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 w-full mb-6">
                <h1 className="text-2xl font-bold text-red-700">{title}</h1>
                <div className="flex-1 border-t-2 border-red-700"></div>
            </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map(item => {
                        const image = item.heroImage || "https://citizenwatchbharat.com/images/cwb/placeholder.svg";
                        return (
                            <li key={item.id} className="border border-border overflow-hidden">
                                {item.heroImage && item.heroImage && (
                                    <div className="relative h-60 w-full bg-gray-300">
                                        <Image
                                            src={image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority={true}
                                            placeholder="blur"
                                            blurDataURL="https://citizenwatchbharat.com/images/cwb/placeholder.svg"
                                        />
                                    </div>
                                )}
                                <div className="p-4 flex flex-col justify-between gap-2">
                                    {item.category.slug === 'national' && (
                                        <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full w-fit">
                                            {slugToName(item.state)}
                                        </span>
                                    )}
                                    <ButtonLink href={`${href}/${item.slug}`} title={item.title} />
                                    <div className="text-xs text-gray-500 mt-2 flex justify-between">
                                        <span>{item.author?.name ? `By ${item.author.name}` : '\u00A0'}</span>
                                        <span>{timeAgo(item.createdAt)}</span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            {loadingMore && <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
                    <li key={idx} className="border border-gray-300 overflow-hidden animate-pulse">
                        <div className="relative h-48 w-full bg-gray-200" />
                        <div className="p-4 flex flex-col justify-between h-28">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="flex justify-between mt-2">
                                <div className="h-4 bg-gray-200 rounded w-1/3" />
                                <div className="h-4 bg-gray-200 rounded w-1/4" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>}
        </main>
    );
}