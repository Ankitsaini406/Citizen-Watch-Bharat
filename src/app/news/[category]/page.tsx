
import CategoryNewsClient from './CategoryNewsClient';
import metadataConfig from '@/data/metadata';
import type { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation';

type Props = {
    params: Promise<{ category: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const { category } = await params;

    const categorys = category as keyof typeof metadataConfig;
    const config = metadataConfig[categorys];

    if (!config) {
        // 👉 If invalid category, show 404 page without rendering
        notFound();
    }

    return {
        title: config.title,
        description: config.description,
        keywords: config.keywords,
        openGraph: {
            title: config.title,
            description: config.description,
            url: config.path,
            images: [
                {
                    url: 'https://citizenwatchbharat.com/cover.webp',
                    width: 1200,
                    height: 630,
                    alt: `Citizen Watch Bharat ${config.title} News Coverage`,
                },
            ],
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: config.path,
        }
    };
}

export default async function Page({ params }: Props) {
    const { category } = await params;
    const config = metadataConfig[category as keyof typeof metadataConfig];

    if (!config) {
        // 👉 redirect to a safe page instead of loading
        redirect('/not-found'); // or `notFound()` if you want a 404
    }
    return <CategoryNewsClient category={category} />;
}