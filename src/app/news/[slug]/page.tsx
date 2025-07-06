"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ViewTracker from '@/components/ViewTracker';

interface NewsArticle {
    id: string;
    title: string;
    subtitle?: string;
    slug: string;
    content: string | object;
    tags: string[];
    state: string;
    city: string;
    views: number;
    heroImage: string[];
    createdAt: string;
    updatedAt: string;
    author: {
        id: string;
        name: string;
        image?: string;
        role: string;
    };
    category: {
        id: string;
        name: string;
        slug: string;
    };
    subCategory?: {
        id: string;
        name: string;
        slug: string;
    };
}

export default function NewsArticlePage() {
    const params = useParams();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentViews, setCurrentViews] = useState<number>(0);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/news?slug=${params.slug}`);
                const data = await response.json();

                if (data.success && data.data.length > 0) {
                    setArticle(data.data[0]);
                    setCurrentViews(data.data[0].views || 0);
                } else {
                    setError('Article not found');
                }
            } catch {
                setError('Failed to load article');
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchArticle();
        }
    }, [params.slug]);

    const handleViewTracked = (views: number) => {
        setCurrentViews(views);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="h-96 bg-gray-200 rounded mb-8"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            {error || 'Article not found'}
                        </h1>
                        <Link href="/" className="text-red-600 hover:text-red-800 underline">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ViewTracker 
                slug={params.slug as string} 
                onViewTracked={handleViewTracked}
            />
            
            <div className="container mx-auto px-4 py-8">
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600">
                        <li>
                            <Link href="/" className="hover:text-red-600">Home</Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href={`/news/category/${article.category.slug}`} className="hover:text-red-600">
                                {article.category.name}
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-gray-900 truncate">{article.title}</li>
                    </ol>
                </nav>

                <article className="bg-white rounded-lg shadow-sm border p-8">
                    <div className="mb-4">
                        <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">
                            {article.category.name}
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {article.title}
                    </h1>

                    {article.subtitle && (
                        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                            {article.subtitle}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
                        <div className="flex items-center">
                            <span>{article.author.name}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold text-red-600">{currentViews} views</span>
                        </div>
                        <div className="flex items-center">
                            <span>{article.city}, {article.state}</span>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <div className="text-gray-700 leading-relaxed">
                            <p>This is a sample news article content. The view count above shows how many times this article has been viewed.</p>
                            <p>Every time someone visits this page, the view count will automatically increase by 1.</p>
                        </div>
                    </div>

                    {article.tags && article.tags.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </article>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-red-600 hover:text-red-800 underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
} 