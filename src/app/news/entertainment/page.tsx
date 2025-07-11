"use client";

import React, { useEffect, useState } from "react";
import { PaginationProps } from "@/components/NewsGridWithPagination";
import NewsGridWithPagination from "@/components/NewsGridWithPagination";
import { BottomBanner, LeftBanner, RightBanner, TopBanner } from "@/components/AddBanners";

const PAGE_SIZE = 10;

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  heroImage: string[];
  createdAt: string;
  author?: { name: string };
}

export default function Page() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pagination, setPagination] = useState<PaginationProps | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/news/category/entertainment?page=${page}`);
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
  }, [page]);

  return (
    <>
      <TopBanner />
      <NewsGridWithPagination
        news={news}
        loading={loading}
        pagination={pagination}
        page={page}
        setPage={setPage}
        PAGE_SIZE={PAGE_SIZE}
        title="Entertainment News"
      />
      <LeftBanner />
      <RightBanner />
      <BottomBanner />
    </>
  );
}