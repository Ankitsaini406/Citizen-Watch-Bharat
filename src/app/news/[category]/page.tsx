"use client";

import React, { useEffect, useState } from "react";
import { PaginationProps } from "@/components/NewsGridWithPagination";
import NewsGridWithPagination from "@/components/NewsGridWithPagination";
import { BottomBanner, LeftBanner, RightBanner, TopBanner } from "@/components/AddBanners";
import { useParams } from "next/navigation";

const PAGE_SIZE = 10;

interface NewsItem {
    id: string;
    title: string;
    slug: string;
    heroImage: string[];
    createdAt: string;
    author?: { name: string };
    category: { slug: string };
}

export default function Page() {
    const params = useParams();
    const category = params?.category as string;
    const [news, setNews] = useState<NewsItem[]>([]);
    const [pagination, setPagination] = useState<PaginationProps | null>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!category) return;
        const fetchNews = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/news/category/${category}?page=${page}`);
                const data = await res.json();
                setNews(data.data.slice(0, PAGE_SIZE));
                setPagination(data.pagination);
            } catch {
                setNews([]);
                setPagination(null);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [category, page]);

    // Capitalize category for title
    const title = category ? `${category.charAt(0).toUpperCase()}${category.slice(1)} News` : "News";

    return (
        <>
            <TopBanner place="News-Section" />
            <NewsGridWithPagination
                news={news}
                loading={loading}
                pagination={pagination}
                page={page}
                setPage={setPage}
                PAGE_SIZE={PAGE_SIZE}
                title={title}
            />
            <LeftBanner place="News-Section" />
            <RightBanner place="News-Section" />
            <BottomBanner place="News-Section" />
        </>
    );
}