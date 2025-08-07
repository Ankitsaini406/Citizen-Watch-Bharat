import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - Citizen Watch Bharat',
    description: 'Legal terms governing the use of Citizen Watch Bharat digital platforms and services. RNI Registered Monthly Newspaper.',
    keywords: [
        'terms of service',
        'website terms',
        'user agreement',
        'civic journalism terms',
        'content usage policy',
        'media platform rules'
    ],
    openGraph: {
        title: 'Terms of Service | Citizen Watch Bharat',
        description: 'Legal agreement for using our civic journalism platforms and services',
        url: 'https://citizenwatchbharat.com/terms-of-service',
        siteName: 'Citizen Watch Bharat',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Citizen Watch Bharat Terms of Service',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Terms of Service - Citizen Watch Bharat',
        description: 'User agreement for our civic journalism platforms',
        site: '@cwbofficials',
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/terms-of-service',
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    authors: [
        {
            name: 'Citizen Watch Bharat Legal Team',
            url: 'https://citizenwatchbharat.com',
        },
    ],
    publisher: 'Citizen Watch Bharat',
    applicationName: 'Citizen Watch Bharat',
    metadataBase: new URL('https://citizenwatchbharat.com'),
    other: {
        'terms-version': '3.2',
        'effective-date': '2025-07-31',
        'document-type': 'Terms of Service',
        'governing-law': 'Laws of India',
        'jurisdiction': 'Courts in Rajasthan, India',
        'compliance': 'RNI Guidelines, IT Act 2000',
        'contact-legal': 'legal@citizenwatchbharat.com'
    }
};