import { Suspense } from "react";
import SharedPage from "@/app/shared/Shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Share News",
    description:
        "Share this news article with your friends and earn reward points on Citizen Watch Bharat.",
    openGraph: {
        title: "Share News | Citizen Watch Bharat",
        description:
            "Share this news article with your friends and earn reward points on Citizen Watch Bharat.",
        url: "https://citizenwatchbharat.com/shared",
        siteName: "Citizen Watch Bharat",
        images: [
            {
                url: "https://citizenwatchbharat.com/cover.webp", // replace with dynamic OG image if needed
                width: 1200,
                height: 630,
                alt: "Citizen Watch Bharat",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Share News | Citizen Watch Bharat",
        description:
            "Spread the word! Share this news article and earn reward points.",
        images: ["https://citizenwatchbharat.com/cover.webp"], // same as OG
    },
};

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SharedPage />
        </Suspense>
    );
}
