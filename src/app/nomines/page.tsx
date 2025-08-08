import { Metadata } from 'next';
import NominationForm from './NominationPage';

export const metadata: Metadata = {
    title: 'Nomination Form ',
    description: 'Nominate inspiring individuals for recognition in our impact awards. Celebrate changemakers driving positive social transformation across India.',
    keywords: [
        'nomination form',
        'social impact awards',
        'changemaker recognition',
        'citizen journalism awards',
        'women empowerment awards',
        'community leaders nomination'
    ],
    openGraph: {
        title: 'Nominate Changemakers | Citizen Watch Bharat',
        description: 'Submit nominations for our impact awards recognizing extraordinary individuals creating positive change.',
        url: 'https://citizenwatchbharat.com/nomines',
        siteName: 'Citizen Watch Bharat',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Citizen Watch Bharat Nomination Process',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nominate for Citizen Watch Bharat Impact Awards',
        description: 'Recognize inspiring changemakers through our nomination platform',
        images: ['https://citizenwatchbharat.com/cover.webp'],
        site: '@cwbofficials',
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/nomines',
    },
    robots: {
        index: false, // Typically form pages shouldn't be indexed
        follow: true,
        nocache: true,
        googleBot: {
            index: false,
            follow: true,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'none',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/icons/apple-touch-icon.png',
    },
    manifest: 'https://citizenwatchbharat.com/manifest.json',
    authors: [
        {
            name: 'Citizen Watch Bharat Awards Committee',
            url: 'https://citizenwatchbharat.com',
        },
    ],
    publisher: 'Citizen Watch Bharat',
    applicationName: 'Citizen Watch Bharat',
    formatDetection: {
        email: true,
        telephone: true,
    },
    metadataBase: new URL('https://citizenwatchbharat.com'),
    other: {
        'award-categories': 'Her Story Her Impact, Changemakers Award, Founders Connect',
        'eligibility': 'Open to all Indian residents creating social impact',
    }
};

export default function Page() {
    return <NominationForm />
}