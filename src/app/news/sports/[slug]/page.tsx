'use client';

import { LeftBanner, RightBanner, TopBanner, MiddleBanner, BottomBanner } from "@/components/AddBanners";
import { useState, useEffect } from "react";
import { fetchNewsBySportsSlug } from "@/utils/ApiUtils";
import { NewsArticle } from "@/types/type";
import NewsGridWithPagination from "@/components/NewsGridWithPagination";

// Optionally, create a mapping for sports slugs to display names
const sportsSlugToName: Record<string, string> = {
    football: "Football",
    cricket: "Cricket",
    tennis: "Tennis",
    // ...add more as needed
};

export default function SportsSlugPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 0, pageSize: 10 });
    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE = 10;
    const sportsName = sportsSlugToName[slug] || slug;

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const result = await fetchNewsBySportsSlug(slug, currentPage);
                setNews(result.data);
                setPagination({ ...result.pagination, pageSize: PAGE_SIZE });
            } catch (error) {
                console.error('Error loading sports news:', error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, [slug, currentPage]);

    return (
        <div className="min-h-screen bg-gray-50">
            <TopBanner place="News-Section" />
            <LeftBanner place="News-Section" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{sportsName} News</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <NewsGridWithPagination
                            news={news}
                            loading={loading}
                            pagination={pagination}
                            page={currentPage}
                            setPage={setCurrentPage}
                            PAGE_SIZE={PAGE_SIZE}
                            title={`${sportsName} News`}
                        />
                    </div>
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <MiddleBanner place="News-Section" />
                        </div>
                    </div>
                </div>
            </div>
            <BottomBanner place="News-Section" />
            <RightBanner place="News-Section" />
        </div>
    );
}