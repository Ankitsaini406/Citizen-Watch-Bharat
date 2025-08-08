
import { Metadata } from 'next';
import CategoryNewsClient from './CategoryNewsClient';
import metadataConfig from '@/data/metadata';

export async function generateMetadata({
    params
}: {
    params: { category: string }
}): Promise<Metadata> {
    const category = params.category as keyof typeof metadataConfig;
    const config = metadataConfig[category] || metadataConfig.national;

    return {
        title: config.title,
        description: config.description,
        keywords: config.keywords,
        openGraph: {
            title: config.title,
            description: config.description,
            url: config.path,
            // siteName: metadataConfig.common.siteName,
            images: [
                {
                    url: 'https://citizenwatchbharat.com/cover.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Citizen Watch Bharat Sports News Coverage',
                },
            ],
        },
        alternates: {
            canonical: config.path,
        }
    };
}

export default function Page({ params }: { params: { category: string } }) {
    return <CategoryNewsClient category={params.category} />;
}