import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - Citizen Watch Bharat',
    description: 'Learn how we collect, use, and protect your personal information in accordance with civic journalism ethics and data protection standards.',
    keywords: [
        'privacy policy',
        'data protection',
        'journalism ethics',
        'reader privacy',
        'civic journalism',
        'information security'
    ],
    openGraph: {
        title: 'Privacy Policy | Citizen Watch Bharat',
        description: 'Our commitment to protecting your personal information while delivering ethical civic journalism.',
        url: 'https://citizenwatchbharat.com/privacy-policy',
        siteName: 'Citizen Watch Bharat',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Citizen Watch Bharat Privacy Policy',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Privacy Policy - Citizen Watch Bharat',
        description: 'How we protect your data while delivering civic journalism',
        site: '@cwbofficials',
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/privacy-policy',
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
            name: 'Citizen Watch Bharat Editorial Board',
            url: 'https://citizenwatchbharat.com',
        },
    ],
    publisher: 'Citizen Watch Bharat',
    applicationName: 'Citizen Watch Bharat',
    metadataBase: new URL('https://citizenwatchbharat.com'),
    other: {
        'policy-version': '2.1',
        'effective-date': '2025-07-31',
        'policy-type': 'Privacy Policy',
        'governing-law': 'Laws of India',
        'compliance': 'RNI Guidelines, IT Act 2000',
        'data-protection-officer': 'info@citizenwatchbharat.com'
    }
};