import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - Citizen Watch Bharat',
    description: 'Learn about Citizen Watch Bharat - Our mission, editorial philosophy, core values, and impact in civic journalism.',
    keywords: [
        'citizen journalism',
        'ethical reporting',
        'civic accountability',
        'independent media',
        'Indian news platform',
        'public service journalism'
    ],
    openGraph: {
        title: 'About Citizen Watch Bharat',
        description: 'Journalism for People. By People. With Integrity. Learn about our mission and values.',
        url: 'https://citizenwatchbharat.com/about',
        siteName: 'Citizen Watch Bharat',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Citizen Watch Bharat Team',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Citizen Watch Bharat',
        description: 'Journalism for People. By People. With Integrity. Learn about our mission and values.',
        images: ['https://citizenwatchbharat.com/cover.webp'],
        site: '@cwbofficials',
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/about',
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
    manifest: 'https://citizenwatchbharat.com/site.webmanifest',
    authors: [
        {
            name: 'Citizen Watch Bharat',
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
};