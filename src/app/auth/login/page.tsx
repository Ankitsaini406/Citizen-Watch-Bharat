import LoginPage from "@/app/auth/login/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login | Citizen Watch Bharat',
    description: 'Login to Citizen Watch Bharat to access your dashboard, submit news tips, manage account settings, and engage with our citizen journalism platform.',
    keywords: [
        'CWB login',
        'Citizen Watch Bharat account',
        'Citizen journalism login',
        'News portal login India',
        'Submit news citizen watch',
    ],
    openGraph: {
        title: 'Login to Citizen Watch Bharat',
        description: 'Access your account to submit news tips, manage your profile, and interact with Citizen Watch Bharat.',
        url: 'https://citizenwatchbharat.com/auth/login',
        siteName: 'Citizen Watch Bharat',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Login to Citizen Watch Bharat',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Login to Citizen Watch Bharat',
        description: 'Access your account to submit news tips, manage your profile, and engage with our platform.',
        images: ['https://citizenwatchbharat.com/cover.webp'],
        site: '@cwbofficials',
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/auth/login',
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
};

export default function Page() {
    return <LoginPage />;
}
