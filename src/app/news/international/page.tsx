"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { extractFirstImage, PaginationProps, timeAgo } from "@/utils/Utils";
import { ButtonLink } from "@/utils/Buttons";
import { Pagination } from "@/utils/Utils";

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
        const res = await fetch(`/api/news/category/international?page=${page}`);
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
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-red-700">International News</h1>
      {loading ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
            <li key={idx} className="border border-gray-300 overflow-hidden animate-pulse">
              <div className="relative h-48 w-full bg-gray-200" />
              <div className="p-4 flex flex-col justify-between h-28">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="flex justify-between mt-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : news.length === 0 ? (
        <div>No news found.</div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <li key={item.id} className="border border-gray-300 overflow-hidden">
              {item.heroImage && extractFirstImage(item.heroImage) && (
                <div className="relative h-48 w-full bg-gray-300">
                  <Image
                    src={extractFirstImage(item.heroImage)}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="/placeholder.svg"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col justify-between h-28">
                <ButtonLink href={`/news/${item.slug}`} title={item.title} />
                <div className="text-xs text-gray-500 mt-2 flex justify-between">
                  <span>{item.author?.name ? `By ${item.author.name}` : '\u00A0'}</span>
                  <span>{timeAgo(item.createdAt)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Pagination Controls */}
      {pagination && (
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
          onPageChange={(newPage: number) => setPage(Math.max(1, Math.min(pagination.totalPages, newPage)))}
        />
      )}
    </main>
  );
}
