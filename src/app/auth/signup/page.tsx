import SignUpPage from "@/app/auth/signup/SignupPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sign Up | Citizen Watch Bharat',
    description: 'Create your account on Citizen Watch Bharat to submit news tips, participate in citizen journalism, and stay updated with ethical reporting. Join our platform for civic engagement and media contributions.',
    keywords: [
        'CWB sign up',
        'Citizen Watch Bharat register',
        'Create account citizen journalism',
        'News portal sign up India',
        'Submit news citizen watch',
        'Citizen journalism account registration',
    ],
    openGraph: {
        title: 'Sign Up to Citizen Watch Bharat',
        description: 'Join Citizen Watch Bharat to participate in citizen journalism, submit news tips, and engage with our platform.',
        url: 'https://citizenwatchbharat.com/auth/signup',
        siteName: 'Citizen Watch Bharat',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Sign Up to Citizen Watch Bharat',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sign Up | Citizen Watch Bharat',
        description: 'Create an account to submit news tips and engage with our citizen journalism platform.',
        images: ['https://citizenwatchbharat.com/cover.webp'],
        site: '@cwbofficials',
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/auth/signup',
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
    return <SignUpPage />;
}
