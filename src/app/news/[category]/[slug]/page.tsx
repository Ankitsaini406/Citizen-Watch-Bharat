import { baseUrl } from "@/utils/ApiUtils";
import NewsPage from "./NewsPage";
import type { Metadata } from 'next'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const response = await fetch(`${baseUrl}api/news/${slug}`);
    const articleData = await response.json();
    const news = articleData.data.news;

    return {
        title: news.title || "Default Title",
        description: news.subtitle || news.metaDescription || "Default Description",
        keywords: news.tags?.join(', ') || "Default Keywords",
        openGraph: {
            title: news.title || "Default Title",
            description: news.subtitle || news.metaDescription || "Default Description",
            url: `https://citizenwatchbharat.com/news/${news.category.slug}/${slug}`,
            images: [
                {
                    url: news.heroImage || 'https://citizenwatchbharat.com/cover.webp',
                    width: 1200,
                    height: 630,
                    alt: news.title || `Citizen Watch Bharat ${news.category.name} News Coverage`,
                },
            ],
        },
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: `https://citizenwatchbharat.com/news/${news.category.slug}/${slug}`,
        }
    };
}

export default function Page() {
    return <NewsPage />
}