
import CategoryNewsClient from './CategoryNewsClient';
import metadataConfig from '@/data/metadata';
import type { Metadata } from 'next'

type Props = {
    params: Promise<{ category: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const { category } = await params;

    const categorys = category as keyof typeof metadataConfig;
    const config = metadataConfig[categorys] || metadataConfig.international;

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
            canonical: config.path,
        }
    };
}

export default async function Page({ params }: Props) {
    const { category } = await params;
    return <CategoryNewsClient category={category} />;
}