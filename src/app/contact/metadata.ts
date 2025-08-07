import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - Citizen Watch Bharat',
    description: 'Reach our editorial team with news tips, corrections, or feedback. Your voice matters to us.',
    keywords: [
        'contact citizen watch bharat',
        'news tips submission',
        'editorial contact',
        'journalism feedback',
        'report news to media',
        'citizen journalism contact'
    ],
    openGraph: {
        title: 'Contact Our News Team | Citizen Watch Bharat',
        description: 'Submit news tips, corrections, or feedback to our editorial team. We value your contributions to civic journalism.',
        url: 'https://citizenwatchbharat.com/contact',
        siteName: 'Citizen Watch Bharat',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Contact Citizen Watch Bharat Editorial Team',
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
        canonical: 'https://citizenwatchbharat.com/contact',
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
            name: 'Citizen Watch Bharat Editorial Team',
            url: 'https://citizenwatchbharat.com',
        },
    ],
    publisher: 'Citizen Watch Bharat',
    applicationName: 'Citizen Watch Bharat',
    formatDetection: {
        email: true,
        address: true,
        telephone: true,
    },
    metadataBase: new URL('https://citizenwatchbharat.com'),
    other: {
        'contact': 'info@citizenwatchbharat.com',
        'telephone': '+91 8058885858',
        'streetAddress': 'WeBrain Tech Academy Complex, Opp. Mangal Transport, Near Chandpole Gate',
        'addressLocality': 'Sikar',
        'addressRegion': 'Rajasthan',
        'postalCode': '332001',
        'addressCountry': 'IN'
    }
};