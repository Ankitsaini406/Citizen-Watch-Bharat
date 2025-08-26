import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Career - Citizen Watch Bharat",
    description: "Join the team at Citizen Watch Bharat. Check for current career opportunities and future openings in our organization.",
    keywords: "citizen watch career, job opportunities, watch industry jobs, Citizen Watch Bharat career",
    openGraph: {
        title: "Career - Citizen Watch Bharat",
        description: "Explore career opportunities with Citizen Watch Bharat",
        url: 'https://citizenwatchbharat.com/career',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Citizen Watch Bharat Career',
            },
        ],
    },
    robots: {
        index: true, // Typically form pages shouldn't be indexed
        follow: true,
        nocache: true,
        googleBot: {
            index: false,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'none',
            'max-snippet': -1,
        },
    },
    twitter: {
        title: 'Career - Citizen Watch Bharat',
        description: 'Join the team at Citizen Watch Bharat. Check for current career opportunities and future openings in our organization.',
        images: ['https://citizenwatchbharat.com/cover.webp'],
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/career',
    }
}

export default function Page() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
            <Image
                src="/cwb-header.png"
                alt="Citizen Watch Bharat Logo"
                className="w-48 mb-8 drop-shadow-lg"
                height={200}
                width={300}
            />
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 flex flex-col items-center max-w-md w-full">
                <h2 className="text-xl md:text-2xl font-bold italic mb-2 text-center">Thank you for your interest in joining our team!</h2>
                <p className="text-gray-700 mb-6 text-center">
                    While we don&apos;t have any open positions right now, we encourage you to check back later for updates on future career opportunities or follow us on Social Media for future updates.
                </p>
            </div>
        </div>
    )
}