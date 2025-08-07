import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Journalism Code of Ethics - Citizen Watch Bharat',
    description: 'Our commitment to ethical journalism, accuracy, independence, and public service. Learn about our editorial principles and standards.',
    keywords: [
        'journalism ethics',
        'media standards',
        'ethical reporting',
        'press code of conduct',
        'Indian journalism principles',
        'citizen journalism ethics'
    ],
    openGraph: {
        title: 'Code of Ethics for Journalism | Citizen Watch Bharat',
        description: 'Our pledge for accurate, independent, and ethical journalism that serves the public interest.',
        url: 'https://citizenwatchbharat.com/code-of-ethics',
        siteName: 'Citizen Watch Bharat',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Citizen Watch Bharat Code of Ethics',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Journalism Code of Ethics - Citizen Watch Bharat',
        description: 'Our commitment to ethical journalism, accuracy, and public service',
        images: ['https://citizenwatchbharat.com/cover.webp'],
        site: '@cwbofficials',
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/code-of-ethics',
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
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://citizenwatchbharat.com'),
    other: {
        'copyright': '© Citizen Watch Bharat. All rights reserved.',
        'content-type': 'text/html; charset=UTF-8',
        'language': 'English',
        'revisit-after': '7 days',
        'distribution': 'global',
        'rating': 'general',
        'doc-type': 'Web Page',
    }
};