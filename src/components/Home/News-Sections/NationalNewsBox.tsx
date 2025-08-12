import { Category, News } from "@/types/type";
import React, { useMemo } from "react";
import Image from "next/image";
import { slugify } from "@/utils/Utils";
import Head from "next/head";
import { ButtonLink } from "@/utils/Buttons";

interface NewsWithImage extends News {
    heroImage: string;
}

interface Props {
    category: Category & { news: News[] };
}

export default function NationalNewsBox({ category }: Props) {
    const heroImageUrl = useMemo(() => {
        return category.news[0]?.heroImage || "";
    }, [category.news]);

    return (
        <div className="mb-1 p-0 md:p-4 xl:p-0 pt-0 pl-0">
            {/* Preload the hero image */}
            {heroImageUrl && (
                <Head>
                    <link
                        rel="preload"
                        as="image"
                        href={heroImageUrl}
                        imageSrcSet={`
                            ${heroImageUrl}?w=640 640w,
                            ${heroImageUrl}?w=1024 1024w,
                            ${heroImageUrl}?w=1600 1600w
                        `}
                        imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                    />
                </Head>
            )}

            {/* Category Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 w-full">
                    <h1 className="text-xl font-bold text-red-700 whitespace-nowrap">
                        {category.name}
                    </h1>
                    <div className="flex-1 border-t-2 border-red-700"></div>
                </div>
            </div>

            {/* News Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.news.slice(0, 9).map((n, index) => (
                    <div key={n.slug} className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                        <NewsCard
                            news={n as NewsWithImage}
                            isFirst={index === 0}
                            showImage={index < 3}
                            index={index}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function NewsCard({ news, isFirst = false, showImage = true, index }: { news: NewsWithImage; isFirst?: boolean; showImage?: boolean; index: number }) {
    const imageUrl = news.heroImage || "/placeholder.svg";
    const altText = useMemo(() =>
        news.title.split(" ").slice(0, 5).join(" ") + (news.title.split(" ").length > 5 ? "..." : ""),
        [news.title]
    );

    if (isFirst) {
        return (
            <div className="bg-white overflow-hidden h-full border border-gray-300 md:min-h-96">
                <div className="block h-full">
                    {/* Full height image with text overlay */}
                    <div className="relative h-80 lg:h-full bg-gray-200">
                        <Image
                            src={imageUrl}
                            alt={altText}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                            priority
                            fetchPriority="high"
                            placeholder="blur"
                            blurDataURL="/placeholder.svg"
                            quality={85}
                            loading="eager"
                        />
                        {/* Text overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                            <ButtonLink
                                href={`/news/${news.category?.slug}/${slugify(news.state)}/${news.slug}`}
                                title={news.title}
                                className="font-semibold text-white text-2xl line-clamp-2 leading-10 hover:underline underline-offset-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (showImage) {
        return (
            <div className="bg-white overflow-hidden h-full border-b border-gray-300">
                <div className="block h-full">
                    {/* Image or Placeholder */}
                    <div className="relative h-48 bg-gray-200">
                        <Image
                            src={imageUrl}
                            alt={altText + " alt"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={index < 3}
                            placeholder="blur"
                            blurDataURL="https://citizenwatchbharat.com/images/cwb/placeholder.svg"
                            loading={index < 3 ? "eager" : "lazy"}
                        />
                    </div>
                    <div className="pt-4">
                        <ButtonLink href={`/news/${news.category?.slug}/${slugify(news.state)}/${news.slug}`}
                            title={news.title}
                            className="font-semibold text-gray-900 text-base mb-4 line-clamp-2 hover:underline underline-offset-2"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white overflow-hidden h-full border-b border-gray-300">
            <div className="block h-full">
                <ButtonLink href={`/news/${news.category?.slug}/${slugify(news.state)}/${news.slug}`}
                    className="font-semibold text-gray-900 mb-4 line-clamp-2 hover:underline underline-offset-2"
                    title={news.title}
                />
            </div>
        </div>
    );
}