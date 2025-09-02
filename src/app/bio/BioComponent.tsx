"use client";

import { useSocialNews } from "@/hooks/useNews";
import { useInView } from "@/hooks/useView";
import { NewsArticle } from "@/types/type";
import { SkeletonSocialNewsBox } from "@/utils/Loading";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function BioComponent() {
    const [ref, inView] = useInView({
        threshold: 0.1,
        rootMargin: '100px'
    });

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useSocialNews();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allNews = data?.pages.flatMap(page => page.data) || [];

    if (isLoading && !data) {
        return <SkeletonSocialNewsBox />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto py-5 px-1 xl:px-0">
            <div className="relative h-32 aspect-video mb-4 mx-auto">
                <Image
                    src="/cwb-header.png"
                    alt="Description of image"
                    fill
                    className="object-cover"
                />
            </div>
            <Link href="/">
                <h2 className="text-lg font-semibold mb-2 bg-background text-red-700 max-w-2xs text-center mx-auto px-4 py-2 border-2 border-red-700">Visit Site</h2>
            </Link>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-1 mt-7">
                {allNews.map((item) => (
                    <NewsCard key={item.slug} item={item} />
                ))}
            </div>

            <div
                ref={ref}
                className="h-10 flex justify-center items-center py-4"
                style={{ minHeight: '1px' }}
            >
                {isFetchingNextPage && (
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
                )}
            </div>
        </div>
    );
}

const NewsCard = ({ item }: { item: NewsArticle }) => {
    const imageUrl = item.heroImage || "/placeholder.svg";
    const href =`/news/${item.category.slug}/${item.slug}`;

    return (
        <Link href={href} className="relative flex items-end h-32 md:h-48 lg:h-64 overflow-hidden px-0.5">
            <div className="absolute inset-0 bg-black/40 z-20" />
            <Image
                src={imageUrl}
                alt={item.title}
                fill
                className="object-cover z-10"
                priority
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 50vw"
                blurDataURL="/placeholder.svg"
            />
            <h2 className="relative font-bold text-xs text-white line-clamp-2 z-30 p-1">
                {item.title}
            </h2>
        </Link>
    );
};