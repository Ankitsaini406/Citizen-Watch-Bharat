
import { Metadata } from 'next';
import NationalPage from './NationalPage';

export const metadata: Metadata = {
    title: 'National News ',
    description: 'Comprehensive coverage of Indian national affairs - politics, governance, social developments, and economic updates. Citizen Watch Bharat delivers factual, unbiased reporting on issues shaping the nation.',
    keywords: [
        'India national news',
        'Indian current affairs',
        'Delhi political updates',
        'Government policies India',
        'Social issues in India',
        'Economic developments India',
        'Fact-checked Indian news',
        'National security updates',
        'Indian infrastructure news',
        'Rural development India'
    ],
    openGraph: {
        title: 'National News Coverage | Citizen Watch Bharat',
        description: 'In-depth reporting on India\'s political landscape, governance, and social developments. Your trusted source for factual national news.',
        url: 'https://citizenwatchbharat.com/news/national',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Citizen Watch Bharat National News Coverage',
            },
        ],
    },
    twitter: {
        title: 'Latest National News Updates | Citizen Watch Bharat',
        description: 'Stay informed with credible reporting on India\'s political, economic and social developments',
        images: ['https://citizenwatchbharat.com/cover.webp'],
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/news/national',
    },
    category: 'news',
    other: {
        'content-type': 'news',
        'coverage': 'National (India)',
        'audience': 'Indian citizens, policymakers, researchers',
        'topic': 'Politics, Governance, Economy, Society'
    }
};

export default function Page() {
    return <NationalPage />
}