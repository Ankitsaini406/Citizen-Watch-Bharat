"use client";

import { Category, News } from "@/types/type";
import React, { useEffect, useState } from "react";
import NationalNewsBox from "./News-Sections/NationalNewsBox";
import InternationalNewsBox from "./News-Sections/InternationalNewsBox";
import PoliticalNewsBox from "./News-Sections/PoliticalNewsBox";
import BusinessNewsBox from "./News-Sections/BusinessNewsBox";
import SportsNewsBox from "./News-Sections/SportsNewsBox";
import EntertainmentNewsBox from "./News-Sections/EntertainmentNewsBox";
import ElectionsNewsBox from "./News-Sections/ElectionsNewsBox";
import WebStoriesNewsBox from "./News-Sections/WebStoriesNewsBox";
import { LatestNews } from "../NewsComponents";
import { ButtonSeeMore } from "@/utils/Buttons";
import { BottomBanner, MiddleBanner } from "../AddBanners";
import { fetchAllCategoriesAndNews } from "@/utils/ApiUtils";

const categoryPriority: Record<string, number> = {
    "National": 1,
    "International": 2,
    "Political": 3,
    "Business": 4,
    "Elections": 5,
    "Entertainment": 6,
    "Sports": 7,
    "Web-Stories": 8,
};

export default function CategoryNewsList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [news, setNews] = useState<News[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { categories, news } = await fetchAllCategoriesAndNews();
            setCategories(categories);
            setNews(news);
        };
        fetchData();
    }, []);

    if (!categories.length || !news.length) {
        return <div>No data loaded</div>;
    }

    const newsByCategory = categories
        .map((cat) => ({
            ...cat,
            news: news.filter((n) => n.category?.slug === cat.slug),
        }))
        .filter(cat => cat.news.length > 0)
        .sort((a, b) => {
            const pa = categoryPriority[a.name] ?? 999;
            const pb = categoryPriority[b.name] ?? 999;
            return pa - pb;
        });

    return (
        <div className="container mx-auto px-4 xl:px-0 py-8">
            {newsByCategory.map((cat) => {
                switch (cat.name) {
                    case "National":
                        return (
                            <div key={cat.name} className="my-5">
                                {/* Mobile Layout: Stack vertically */}
                                <div className="lg:hidden space-y-4">
                                    <NationalNewsBox key={cat.id} category={cat} />
                                    <ButtonSeeMore href={`/news/${cat.slug}`} title="See More" />
                                    <LatestNews />
                                </div>

                                {/* Desktop Layout: Grid with 70/30 split */}
                                <div className="hidden lg:grid lg:grid-cols-[70%_30%] gap-0 xl:gap-5">
                                    <NationalNewsBox key={cat.id} category={cat} />
                                    <LatestNews />
                                    <ButtonSeeMore href={`/news/${cat.slug}`} title="See More" />
                                </div>
                            </div>
                        );
                    case "International":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <InternationalNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="See More" />
                            </div>
                        );
                    case "Political":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <PoliticalNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="See More" />
                                <MiddleBanner />
                            </div>
                        );
                    case "Business":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <BusinessNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="See More" />
                            </div>
                        );
                    case "Elections":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <ElectionsNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="See More" />
                            </div>
                        );
                    case "Entertainment":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <EntertainmentNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="See More" />
                            </div>
                        );
                    case "Sports":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <SportsNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="See More" />
                            </div>
                        );
                    case "Web-Stories":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <WebStoriesNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="See More" />
                                <BottomBanner />
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}