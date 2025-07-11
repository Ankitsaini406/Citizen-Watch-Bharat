'use client';

import { LeftBanner, RightBanner, TopBanner, MiddleBanner, BottomBanner } from "@/components/AddBanners";
import { useState, useEffect } from "react";
import { fetchAllCategoriesAndNews } from "@/utils/ApiUtils";
import { NewsArticle } from "@/types/type";
import { ButtonLink, ButtonSeeMore } from "@/utils/Buttons";
import { extractFirstImage, timeAgo } from "@/utils/Utils";
import Image from "next/image";

// Indian states with their capitals
const indianStates = [
    { name: "Andhra Pradesh", capital: "Amaravati", slug: "andhra-pradesh" },
    { name: "Arunachal Pradesh", capital: "Itanagar", slug: "arunachal-pradesh" },
    { name: "Assam", capital: "Dispur", slug: "assam" },
    { name: "Bihar", capital: "Patna", slug: "bihar" },
    { name: "Chhattisgarh", capital: "Raipur", slug: "chhattisgarh" },
    { name: "Goa", capital: "Panaji", slug: "goa" },
    { name: "Gujarat", capital: "Gandhinagar", slug: "gujarat" },
    { name: "Haryana", capital: "Chandigarh", slug: "haryana" },
    { name: "Himachal Pradesh", capital: "Shimla", slug: "himachal-pradesh" },
    { name: "Jharkhand", capital: "Ranchi", slug: "jharkhand" },
    { name: "Karnataka", capital: "Bengaluru", slug: "karnataka" },
    { name: "Kerala", capital: "Thiruvananthapuram", slug: "kerala" },
    { name: "Madhya Pradesh", capital: "Bhopal", slug: "madhya-pradesh" },
    { name: "Maharashtra", capital: "Mumbai", slug: "maharashtra" },
    { name: "Manipur", capital: "Imphal", slug: "manipur" },
    { name: "Meghalaya", capital: "Shillong", slug: "meghalaya" },
    { name: "Mizoram", capital: "Aizawl", slug: "mizoram" },
    { name: "Nagaland", capital: "Kohima", slug: "nagaland" },
    { name: "Odisha", capital: "Bhubaneswar", slug: "odisha" },
    { name: "Punjab", capital: "Chandigarh", slug: "punjab" },
    { name: "Rajasthan", capital: "Jaipur", slug: "rajasthan" },
    { name: "Sikkim", capital: "Gangtok", slug: "sikkim" },
    { name: "Tamil Nadu", capital: "Chennai", slug: "tamil-nadu" },
    { name: "Telangana", capital: "Hyderabad", slug: "telangana" },
    { name: "Tripura", capital: "Agartala", slug: "tripura" },
    { name: "Uttar Pradesh", capital: "Lucknow", slug: "uttar-pradesh" },
    { name: "Uttarakhand", capital: "Dehradun", slug: "uttarakhand" },
    { name: "West Bengal", capital: "Kolkata", slug: "west-bengal" },
    { name: "Delhi", capital: "New Delhi", slug: "delhi" },
    { name: "Jammu and Kashmir", capital: "Srinagar", slug: "jammu-kashmir" },
    { name: "Ladakh", capital: "Leh", slug: "ladakh" },
    { name: "Chandigarh", capital: "Chandigarh", slug: "chandigarh" },
    { name: "Puducherry", capital: "Puducherry", slug: "puducherry" },
    { name: "Andaman and Nicobar Islands", capital: "Port Blair", slug: "andaman-nicobar" },
    { name: "Dadra and Nagar Haveli and Daman and Diu", capital: "Daman", slug: "dadra-nagar-haveli-daman-diu" },
    { name: "Lakshadweep", capital: "Kavaratti", slug: "lakshadweep" }
];


function StateNewsSection({ state, news }: { state: { name: string; capital: string; slug: string }; news: NewsArticle[] }) {
    const stateNews = news
        .filter(article =>
            article.state?.toLowerCase().includes(state.name.toLowerCase()) ||
            article.city?.toLowerCase().includes(state.capital.toLowerCase())
        )
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (stateNews.length === 0) return null;

    const visibleNews = stateNews.slice(0, 6);

    return (
        <section aria-labelledby={`state-${state.slug}-heading`} className="p-6">
            <header className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 w-full">
                    <h2
                        id={`state-${state.slug}-heading`}
                        className="text-2xl font-bold text-red-700 whitespace-nowrap"
                    >
                        {state.name}
                    </h2>
                    <div className="flex-1 border-t-2 border-red-700"></div>
                </div>
            </header>
            <p className="text-sm text-gray-500 mb-4">Capital: {state.capital}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {visibleNews.map((article) => {
                    const imageUrl = extractFirstImage(article.heroImage);
                    return (
                        <div
                            key={article.slug}
                            className="flex flex-col overflow-hidden border border-gray-200"
                        >
                            {imageUrl && (
                                <div className="relative w-full h-40">
                                    <Image
                                        src={imageUrl}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 flex flex-col p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs text-gray-400">{timeAgo(article.createdAt)}</span>
                                    {article.category && (
                                        <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                            {article.category.name}
                                        </span>
                                    )}
                                </div>
                                <ButtonLink
                                    href={`/news/${article.slug}`}
                                    title={article.title}
                                    className="text-base font-semibold line-clamp-2 hover:text-red-600 mb-2 text-left"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
                    <ButtonSeeMore
                        href={`/news/state/${state.slug}`}
                        title="See all news"
                        aria-label={`See all news from ${state.name}`}
                    />
        </section>
    );
}


export default function NationalPage() {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const { news: allNews } = await fetchAllCategoriesAndNews();
                setNews(allNews);
            } catch (error) {
                console.error('Error loading news:', error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);

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

                <div className="grid grid-cols-1 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="mb-8">
                            <div className="grid grid-cols-1 gap-6">
                                {indianStates.map((state) => (
                                    <StateNewsSection
                                        key={state.slug}
                                        state={state}
                                        news={news}
                                    />
                                ))}
                            </div>
                        </div>
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