"use client";

import React, { useState } from "react";
import NewsGridWithPagination from "@/components/NewsGridWithPagination";
import { BottomBanner, LeftBanner, RightBanner, TopBanner } from "@/components/AddBanners";
import { useParams } from "next/navigation";
import { useNewsCategory } from "@/hooks/useNews";

const PAGE_SIZE = 10;

export default function Page() {
    const params = useParams();
    const category = params?.category as string;
    const [page, setPage] = useState(1);
    
    const { data, isLoading } = useNewsCategory(category, page);

    // Capitalize category for title
    const title = category ? `${category.charAt(0).toUpperCase()}${category.slice(1)} News` : "News";

    return (
        <>
            <TopBanner place="News-Section" />
            <NewsGridWithPagination
                news={data?.data || []}
                loading={isLoading}
                pagination={data?.pagination || null}
                page={page}
                setPage={setPage}
                PAGE_SIZE={PAGE_SIZE}
                title={title}
                href={`/news/${category}`}
            />
            <LeftBanner place="News-Section" />
            <RightBanner place="News-Section" />
            <BottomBanner place="News-Section" />
        </>
    );
}