'use client';

import { LeftBanner, RightBanner, TopBanner, MiddleBanner, BottomBanner } from "@/components/AddBanners";
import { useState, useEffect } from "react";
import { fetchNewsByState } from "@/utils/ApiUtils";
import { NewsArticle } from "@/types/type";
import { ButtonLink } from "@/utils/Buttons";
import { extractFirstImage } from "@/utils/Utils";
import Image from "next/image";
import Link from "next/link";

// Indian states mapping
const indianStates = {
    "andhra-pradesh": { name: "Andhra Pradesh", capital: "Amaravati" },
    "arunachal-pradesh": { name: "Arunachal Pradesh", capital: "Itanagar" },
    "assam": { name: "Assam", capital: "Dispur" },
    "bihar": { name: "Bihar", capital: "Patna" },
    "chhattisgarh": { name: "Chhattisgarh", capital: "Raipur" },
    "goa": { name: "Goa", capital: "Panaji" },
    "gujarat": { name: "Gujarat", capital: "Gandhinagar" },
    "haryana": { name: "Haryana", capital: "Chandigarh" },
    "himachal-pradesh": { name: "Himachal Pradesh", capital: "Shimla" },
    "jharkhand": { name: "Jharkhand", capital: "Ranchi" },
    "karnataka": { name: "Karnataka", capital: "Bengaluru" },
    "kerala": { name: "Kerala", capital: "Thiruvananthapuram" },
    "madhya-pradesh": { name: "Madhya Pradesh", capital: "Bhopal" },
    "maharashtra": { name: "Maharashtra", capital: "Mumbai" },
    "manipur": { name: "Manipur", capital: "Imphal" },
    "meghalaya": { name: "Meghalaya", capital: "Shillong" },
    "mizoram": { name: "Mizoram", capital: "Aizawl" },
    "nagaland": { name: "Nagaland", capital: "Kohima" },
    "odisha": { name: "Odisha", capital: "Bhubaneswar" },
    "punjab": { name: "Punjab", capital: "Chandigarh" },
    "rajasthan": { name: "Rajasthan", capital: "Jaipur" },
    "sikkim": { name: "Sikkim", capital: "Gangtok" },
    "tamil-nadu": { name: "Tamil Nadu", capital: "Chennai" },
    "telangana": { name: "Telangana", capital: "Hyderabad" },
    "tripura": { name: "Tripura", capital: "Agartala" },
    "uttar-pradesh": { name: "Uttar Pradesh", capital: "Lucknow" },
    "uttarakhand": { name: "Uttarakhand", capital: "Dehradun" },
    "west-bengal": { name: "West Bengal", capital: "Kolkata" },
    "delhi": { name: "Delhi", capital: "New Delhi" },
    "jammu-kashmir": { name: "Jammu and Kashmir", capital: "Srinagar" },
    "ladakh": { name: "Ladakh", capital: "Leh" },
    "chandigarh": { name: "Chandigarh", capital: "Chandigarh" },
    "puducherry": { name: "Puducherry", capital: "Puducherry" },
    "andaman-nicobar": { name: "Andaman and Nicobar Islands", capital: "Port Blair" },
    "dadra-nagar-haveli-daman-diu": { name: "Dadra and Nagar Haveli and Daman and Diu", capital: "Daman" },
    "lakshadweep": { name: "Lakshadweep", capital: "Kavaratti" }
};

export default function StatePage({ params }: { params: { slug: string } }) {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 0 });
    const [currentPage, setCurrentPage] = useState(1);

    const stateInfo = indianStates[params.slug as keyof typeof indianStates];

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const result = await fetchNewsByState(params.slug, currentPage);
                setNews(result.data);
                setPagination(result.pagination);
            } catch (error) {
                console.error('Error loading state news:', error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, [params.slug, currentPage]);

    if (!stateInfo) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">State Not Found</h1>
                    <Link href="/news/national" className="text-red-600 hover:text-red-800">
                        ← Back to National News
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded mb-4"></div>
                        <div className="h-64 bg-gray-300 rounded mb-4"></div>
                        <div className="h-32 bg-gray-300 rounded mb-4"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <TopBanner />
            <LeftBanner />
            
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/news/national" className="text-red-600 hover:text-red-800">
                            ← Back to National News
                        </Link>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{stateInfo.name} News</h1>
                    <p className="text-gray-600">Capital: {stateInfo.capital}</p>
                    <p className="text-gray-600">Latest news and updates from {stateInfo.name}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {news.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">No News Available</h2>
                                <p className="text-gray-500">No news articles found for {stateInfo.name} at the moment.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {news.map((article, index) => {
                                    const imageUrl = extractFirstImage(article.heroImage);
                                    return (
                                        <div key={article.slug || article.id || index} className="bg-white rounded-lg shadow-md p-6">
                                            <div className="flex gap-4">
                                                {imageUrl && (
                                                    <div className="flex-shrink-0">
                                                        <Image
                                                            src={imageUrl}
                                                            alt={article.title}
                                                            width={200}
                                                            height={150}
                                                            className="rounded-md object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(article.createdAt).toLocaleDateString()}
                                                        </span>
                                                        {article.category && (
                                                            <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                                                {article.category.name}
                                                            </span>
                                                        )}
                                                        {article.city && (
                                                            <span className="text-xs text-gray-500">
                                                                {article.city}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <ButtonLink 
                                                        href={`/news/${article.slug}`} 
                                                        title={article.title}
                                                        className="text-lg font-semibold line-clamp-2 hover:text-red-600 mb-2"
                                                    />
                                                    {article.subtitle && (
                                                        <p className="text-gray-600 line-clamp-3 mb-2">
                                                            {article.subtitle}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        {article.author && (
                                                            <span>By {article.author.name}</span>
                                                        )}
                                                        <span>{article.views} views</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="mt-8 flex justify-center">
                                <div className="flex gap-2">
                                    {currentPage > 1 && (
                                        <button
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Previous
                                        </button>
                                    )}
                                    <span className="px-4 py-2 text-gray-700">
                                        Page {currentPage} of {pagination.totalPages}
                                    </span>
                                    {currentPage < pagination.totalPages && (
                                        <button
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <MiddleBanner />
                        </div>
                    </div>
                </div>
            </div>

            <BottomBanner />
            <RightBanner />
        </div>
    );
} 