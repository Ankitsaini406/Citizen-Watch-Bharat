import BioComponent from './BioComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bio ',
    description: 'Explore Citizen Watch Bharat’s official bio page — a single hub for our latest news, stories, and updates. Designed for social media profiles, this page works like Linktree, giving you quick access to our top civic journalism highlights and important links.',
    openGraph: {
        title: 'Bio | Citizen Watch Bharat',
        description: 'Explore Citizen Watch Bharat’s official bio page — a single hub for our latest news, stories, and updates. Designed for social media profiles, this page works like Linktree, giving you quick access to our top civic journalism highlights and important links.',
        url: 'https://citizenwatchbharat.com/bio',
        siteName: 'Citizen Watch Bharat',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Explore Citizen Watch Bharat’s official bio page',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Citizen Watch Bharat News Team',
        description: 'Have a news tip or feedback? Reach our editorial team directly.',
        images: ['https://citizenwatchbharat.com/cover.webp'],
        site: '@cwbofficials',
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/bio',
    },
    robots: {
        index: false,   // do not index
        follow: false,  // do not follow links
        nocache: false,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/icons/apple-touch-icon.png',
    },
    metadataBase: new URL('https://citizenwatchbharat.com'),
};

export default function Page() {
    return <BioComponent />
};