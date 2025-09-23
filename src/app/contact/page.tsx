import { Metadata } from 'next';
import ContactUs from './ContactPage';

export const metadata: Metadata = {
    title: 'Contact Us ',
    description: 'Contact Citizen Watch Bharat (CWB) for collaborations, news tips, or feedback. Reach out to our team for ethical journalism partnerships, advertising inquiries, or civic issue reporting. We value transparency and public participation—connect with us via email, phone, or social media.',
    keywords: [
        'Contact citizen journalism India',
        'CWB news team contact',
        'Report civic issues to media',
        'Journalism collaboration India',
        'Ethical news portal contact',
        'Citizen Watch Bharat email',
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
            apple: '/icons/apple-touch-icon.png',
        },
        manifest: 'https://citizenwatchbharat.com/manifest.json',
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

export default function Page() {
    return <ContactUs />
}