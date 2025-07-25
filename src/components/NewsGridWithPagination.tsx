import React from "react";
import Image from "next/image";
import { extractFirstImage, timeAgo } from "@/utils/Utils";
import { ButtonLink } from "@/utils/Buttons";
import { Pagination } from "@/utils/Utils";

export interface NewsItem {
    id: string;
    title: string;
    slug: string;
    heroImage: string[];
    createdAt: string;
    author?: { name: string };
    category: { slug: string };
}

export interface PaginationProps {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

interface NewsGridWithPaginationProps {
    news: NewsItem[];
    loading: boolean;
    pagination: PaginationProps | null;
    page: number;
    setPage: (page: number) => void;
    PAGE_SIZE: number;
    title: string;
    href: string;
}

const NewsGridWithPagination: React.FC<NewsGridWithPaginationProps> = ({
    news,
    loading,
    pagination,
    page,
    setPage,
    PAGE_SIZE,
    title,
    href
}) => {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 w-full mb-6">
                <h1 className="text-2xl font-bold text-red-700">{title}</h1>
                <div className="flex-1 border-t-2 border-red-700"></div>
            </div>
            {loading ? (
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
            ) : news.length === 0 ? (
                <div>No news found.</div>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map(item => {
                        const image = extractFirstImage(item.heroImage) || "/placeholder.svg";
                        return (
                            <li key={item.id} className="border border-gray-300 overflow-hidden">
                                {item.heroImage && extractFirstImage(item.heroImage) && (
                                    <div className="relative h-60 w-full bg-gray-300">
                                        <Image
                                            src={image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority={true}
                                            placeholder="blur"
                                            blurDataURL="/placeholder.svg"
                                        />
                                    </div>
                                )}
                                <div className="p-4 flex flex-col justify-between h-28">
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
            )}
            {/* Pagination Controls */}
            {pagination && (
                <Pagination
                    page={page}
                    totalPages={pagination.totalPages}
                    onPageChange={(newPage: number) => setPage(Math.max(1, Math.min(pagination.totalPages, newPage)))}
                />
            )}
        </main>
    );
};

export default NewsGridWithPagination; 