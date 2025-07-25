"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import RichTextPreview from "@/utils/Editor/RichTextPreview";
import { Facebook, Instagram, X } from "lucide-react";
import { NewsArticle } from "@/types/type";
import { extractFirstImage, ScrollableNewsSection, timeAgo } from "@/utils/Utils";
import { BottomBanner, LeftBanner, MiddleBanner, RightBanner, TopBanner } from "@/components/AddBanners";

// Error state component
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-center text-red-600">
            <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="mb-2 text-lg font-semibold">{message}</div>
            <div className="flex gap-4 mt-2">
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Retry
                </button>
                <Link href="/" className="underline text-blue-600 px-4 py-2">Go Home</Link>
            </div>
        </div>
    );
}

// Shimmering skeleton loader for news article
function NewsSkeleton() {
    return (
        <article className="max-w-3xl mx-auto mt-8 mb-16 overflow-hidden animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6" />
            <div className="relative w-full h-80 sm:h-[400px] bg-gray-300 rounded mb-6" />
            <div className="p-6 lg:px-0">
                {/* Category and Date */}
                <div className="flex flex-wrap justify-between gap-4 mb-2 text-sm">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="flex gap-5">
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                        <div className="h-4 w-28 bg-gray-200 rounded" />
                    </div>
                </div>
                {/* Main Content */}
                <div className="space-y-3 mb-8">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded-full" />
                    <div className="h-6 w-12 bg-gray-200 rounded-full" />
                </div>
                {/* Author and Social */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="h-6 w-32 bg-gray-200 rounded" />
                    <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-200 rounded" />
                        <div className="h-6 w-20 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function NewsPage() {
    const params = useParams();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retryKey, setRetryKey] = useState(0);

    // New states for related and category news
    const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
    const [categoryNews, setCategoryNews] = useState<NewsArticle[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/news/${params.slug}`);
                const data = await res.json();
                if (data.success) {
                    setArticle(data.data.news);
                } else {
                    setError("Article not found");
                }
            } catch {
                setError("Failed to load news");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [params?.slug, retryKey]);

    // Fetch related and category news after article is loaded
    useEffect(() => {
        if (!article) return;

        async function fetchRelatedAndCategoryNews() {
            // Fetch related news by tags
            if (article && article.tags && article.tags.length > 0) {
                try {
                    const res = await fetch(`/api/news/related?tags=${article.tags.join(",")}&exclude=${params.slug}`);
                    const data = await res.json();
                    console.log('Related news data:', data);
                    if (data.success) setRelatedNews(data.data || []);
                    else setRelatedNews([]);
                } catch {
                    setRelatedNews([]);
                }
            } else {
                setRelatedNews([]);
            }

            // Fetch more news from the same category
            if (article) {
                try {
                    const res = await fetch(`/api/news/category/${article.category.slug}?exclude=${params.slug}`);
                    const data = await res.json();
                    if (data.success) setCategoryNews(data.data || []);
                    else setCategoryNews([]);
                } catch {
                    setCategoryNews([]);
                }
            } else {
                setCategoryNews([]);
            }
        }

        fetchRelatedAndCategoryNews();
    }, [article, params.slug]);

    const handleRetry = () => {
        setRetryKey(prev => prev + 1);
    };

    if (loading) {
        return <NewsSkeleton />;
    }
    if (error) {
        return <ErrorState message={error} onRetry={handleRetry} />;
    }

    // Article page
    if (params?.slug && article) {
        const heroImageRaw = article.heroImage;
        const firstImage = extractFirstImage(heroImageRaw) || "/placeholder.svg";

        return (
            <>
                <TopBanner place="Par-News" />
                <LeftBanner place="Par-News" />
                <RightBanner place="Par-News" />
                <article className="max-w-3xl mx-auto mt-8 mb-16 overflow-hidden">
                    <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-relaxed px-4 lg:px-0">{article.title}</h1>
                    {article.subtitle && (
                        <h2 className="md:text-xl text-gray-700 mb-4 px-4 lg:px-0">{article.subtitle}</h2>
                    )}
                    {firstImage && (
                        <div className="relative w-full h-80 sm:h-[400px]">
                            <Image
                                src={firstImage}
                                alt={article.title}
                                fill
                                className="object-cover"
                                priority={true}
                                placeholder="blur"
                                blurDataURL="/placeholder.svg"
                            />
                        </div>
                    )}

                    <div className="p-4 lg:px-0">
                        {/* Category and Date */}
                        <div className="flex flex-wrap justify-between gap-4 mb-2 text-sm text-gray-500">
                            <span className="uppercase font-semibold tracking-wider text-red-600">
                                {article.category.name}
                            </span>
                            <div className="flex gap-5">
                                <span>{timeAgo(article.createdAt)}</span>
                                {article.city && (
                                    <span>{article.city}, {article.state}</span>
                                )}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="prose max-w-none mb-8">
                            {article.content && typeof article.content === "object" ? (
                                <RichTextPreview lexicalJson={article.content} />
                            ) : (
                                <span className="text-gray-400">No content</span>
                            )}
                        </div>

                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                            <div className="mb-6 flex flex-wrap gap-2.5">
                                {article.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 hover:text-foreground cursor-pointer"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Author and Social */}
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-800">By {article.author.name}</span>
                            </div>
                            <div className="flex gap-2">
                                {article.twitter_link && (
                                    <Link
                                        href={article.twitter_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="View on X"
                                        className="group rounded-full p-2 transition-all duration-150 bg-gray-100 hover:bg-black/90"
                                    >
                                        <X className="w-5 h-5 text-black group-hover:text-white transition-colors duration-150" />
                                    </Link>
                                )}
                                {article.facebook_link && (
                                    <Link
                                        href={article.facebook_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="View on Facebook"
                                        className="group rounded-full p-2 transition-all duration-150 bg-gray-100 hover:bg-[#1877F3]"
                                    >
                                        <Facebook className="w-5 h-5 text-[#1877F3] group-hover:text-white transition-colors duration-150" />
                                    </Link>
                                )}
                                {article.instagram_link && (
                                    <Link
                                        href={article.instagram_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="View on Instagram"
                                        className="group rounded-full p-2 transition-all duration-150 bg-gray-100 hover:bg-[#E1306C]"
                                    >
                                        <Instagram className="w-5 h-5 text-[#E1306C] group-hover:text-white transition-colors duration-150" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {((categoryNews?.length ?? 0) > 0 || (relatedNews?.length ?? 0) > 0) && <MiddleBanner place="Par-News" />}

                    {/* More from Category Section */}
                    {categoryNews.length > 0 && (
                        <ScrollableNewsSection
                            href={`/news/${article.category.slug}`}
                            title={`More from ${article.category?.name}`}
                            news={categoryNews}
                        />
                    )}

                    {/* Related News Section */}
                    {relatedNews.length > 0 && (
                        <ScrollableNewsSection
                            href={`/news/${article.category.slug}`}
                            title="Related News"
                            news={relatedNews}
                        />
                    )}

                </article>
                <BottomBanner place="Par-News" />
            </>
        );
    }
} 