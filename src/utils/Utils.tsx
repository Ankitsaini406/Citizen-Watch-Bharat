import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { ButtonLink } from "./Buttons";
import { NewsArticle } from "@/types/type";
import Image from "next/image";
import { useInView } from '@/hooks/useView';

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

export function extractFirstImage(input: string | string[]): string {
    let firstImage = "";

    if (Array.isArray(input) && input.length > 0) {
        const first = input[0];

        if (typeof first === "string" && first.trim().startsWith("[")) {
            try {
                const parsed = JSON.parse(first);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    firstImage = parsed[0];
                }
            } catch (e) {
                console.warn("Failed to parse nested JSON image array:", e);
                firstImage = first;
            }
        } else if (typeof first === "string") {
            firstImage = first;
        }
    } else if (typeof input === "string") {
        firstImage = input;
    }

    return firstImage;
}

export function timeAgo(dateString: string | Date): string {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
}

export interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-400 bg-gray-100 text-gray-700 disabled:opacity-50"
            >
                Previous
            </button>
            <span>
                Page {page} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-400 bg-gray-100 text-gray-700 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

// Scrollable News Section Component
export function ScrollableNewsSection({
    title,
    news,
    className = "",
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
}: {
    title: string;
    news: NewsArticle[];
    className?: string;
    fetchNextPage: () => void;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [loaderRef, inView] = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

    const checkScrollButtons = useCallback(() => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    }, []);

    useEffect(() => {
        checkScrollButtons();
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', checkScrollButtons);
            return () => scrollElement.removeEventListener('scroll', checkScrollButtons);
        }
    }, [checkScrollButtons, news]);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
            const newScrollLeft = scrollRef.current.scrollLeft +
                (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        }
    };

    if (news.length === 0) return null;

    return (
        <section className={`mt-12 px-6 lg:px-0 ${className}`}>
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>

            <div className="relative group">
                {canScrollLeft && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                )}

                {canScrollRight && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {news.map((newsItem, index) => {
                        const isLastItem = index === news.length - 1;
                        const imageUrl = extractFirstImage(newsItem.heroImage) || "/placeholder.svg";

                        console.log(`This is state info : `, newsItem.state);
                        const href = newsItem.category?.name?.toLowerCase() === 'national'
                            ? `/news/${newsItem.category?.slug}/${newsItem.state}/${newsItem.slug}` // For national, use the baseHref which includes state
                            : `/news/${newsItem.category?.slug}/${newsItem.slug}`; // For others, use standard path

                        return (
                            <div
                                key={`${newsItem.slug}-${index}`}
                                className="flex-shrink-0 w-full sm:w-80 border border-gray-300 overflow-hidden bg-white snap-start"
                                ref={isLastItem ? loaderRef : null}
                            >
                                {imageUrl && (
                                    <div className="relative w-full h-40 bg-gray-200">
                                        <Image
                                            src={imageUrl}
                                            alt={newsItem.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 320px"
                                            placeholder="blur"
                                            blurDataURL="/placeholder.svg"
                                        />
                                    </div>
                                )}
                                <div className="p-4">
                                    <div className="text-xs text-red-600 font-semibold mb-1">
                                        {newsItem.category?.name}
                                    </div>
                                    <div className="flex flex-col justify-between h-20">
                                        <ButtonLink href={href} title={newsItem.title} />
                                        <div className="text-xs text-gray-500">
                                            {timeAgo(newsItem.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {isFetchingNextPage && (
                        <div className="flex-shrink-0 w-full sm:w-80 flex items-center justify-center">
                            <div className="animate-pulse">Loading more news...</div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}