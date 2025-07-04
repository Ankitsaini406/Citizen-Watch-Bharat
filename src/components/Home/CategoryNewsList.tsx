"use client";

import { Category, News } from "@/types/type";
import React from "react";

// Mapping from English category names to Hindi
const categoryNameHindi: Record<string, string> = {
    "Political": "राजनीति",
    "Sports": "खेल",
    "Entertainment": "मनोरंजन",
    "Business": "व्यापार",
    "Elections": "चुनाव",
    "International": "अंतरराष्ट्रीय",
    "National": "राष्ट्रीय",
    "Web-Stories": "वेब कहानियाँ",
    // Add more as needed, using the exact English names from your DB
};

// Priority mapping: lower number = higher priority (comes first)
const categoryPriority: Record<string, number> = {
    "National": 1,
    "International": 2,
    "Political": 3,
    "Business": 4,
    "Sports": 5,
    "Entertainment": 6,
    "Elections": 7,
    "Web-Stories": 8,
    // Add more as needed
};

type Props = {
    categories: Category[];
    news: News[];
};

export default function CategoryNewsList({ categories, news }: Props) {
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
        <div>
            {newsByCategory.map((cat) => (
                <div key={cat.id}>
                    <h2>
                        {categoryNameHindi[cat.name] || cat.name}
                    </h2>
                    <ul className="list-disc">
                        {cat.news.map((n) => (
                            <li className="list-disc" key={n.id}>{n.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}