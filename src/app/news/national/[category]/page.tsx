'use client';

import { LeftBanner, RightBanner, TopBanner, BottomBanner } from "@/components/AddBanners";
import { useState, useEffect } from "react";
import { fetchNewsByState } from "@/utils/ApiUtils";
import { NewsArticle } from "@/types/type";
import { indianStatesBySlug } from "@/data/indianStates";
import NewsGridWithPagination from "@/components/NewsGridWithPagination";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const category = params?.category as string;
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 0, pageSize: 10 });
    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE = 10;
    const stateInfo = indianStatesBySlug[category];

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const result = await fetchNewsByState(category, currentPage);
                setNews(result.data);
                setPagination({ ...result.pagination, pageSize: PAGE_SIZE });
            } catch (error) {
                console.error('Error loading state news:', error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, [category, currentPage]);

    return (
        <div className="min-h-screen bg-gray-50">
            <TopBanner place="News-Section" />
            <LeftBanner place="News-Section" />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1">
                    {/* Main Content */}
                    <NewsGridWithPagination
                        news={news}
                        loading={loading}
                        pagination={pagination}
                        page={currentPage}
                        setPage={setCurrentPage}
                        PAGE_SIZE={PAGE_SIZE}
                        title={`${stateInfo.name} News`}
                        href={`/news/national/${category}`}
                    />
                </div>
            </div>
            <BottomBanner place="News-Section" />
            <RightBanner place="News-Section" />
        </div>
    );
} 