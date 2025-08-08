import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

const socialMedia = [
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/citizenwatchbharat',
        icon: '/social/facebook-black.webp',
        alt: 'Facebook Logo'
    },
    {
        name: 'Twitter/X',
        href: 'https://twitter.com/cwbofficials',
        icon: '/social/twitter-black.webp',
        alt: 'Twitter Logo'
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/citizenwatchbharat',
        icon: '/social/instagram-black.webp',
        alt: 'Instagram Logo'
    },
    {
        name: 'YouTube',
        href: 'https://youtube.com/@citizenwatchbharat',
        icon: '/social/youtube-black.webp',
        alt: 'YouTube Logo'
    },
    {
        name: 'Threads',
        href: 'https://www.threads.net/@citizenwatchbharat',
        icon: '/social/threads-black.webp',
        alt: 'Threads Logo'
    },
    // {
    //     name: 'LinkedIn',
    //     href: 'https://linkedin.com/company/citizenwatchbharat',
    //     icon: '/linkedin.webp',
    //     alt: 'LinkedIn Logo'
    // }
]

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Citizen Watch Bharat (CWB) is India’s leading civic journalism platform, dedicated to ethical news reporting, public accountability, and citizen empowerment. As an RNI-registered monthly newspaper and digital news portal, we bridge the gap between journalism and social change. Our mission is to promote transparency, truth, and participatory democracy through impact-driven journalism.',
    keywords: [
        'Ethical news reporting platform',
        'Independent media',
        'Public accountability news',
        'Indian news platform',
        'Civic empowerment in India',
        'Best independent journalism website',
        'RNI-registered newspaper',
        'Impact-driven journalism',
    ],
    openGraph: {
        title: 'About Citizen Watch Bharat',
        description: 'Journalism for People. By People. With Integrity. Learn about our mission and values.',
        url: 'https://citizenwatchbharat.com/about',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Citizen Watch Bharat Team',
            },
        ],
    },
    twitter: {
        title: 'About Citizen Watch Bharat',
        description: 'Journalism for People. By People. With Integrity. Learn about our mission and values.',
        images: ['https://citizenwatchbharat.com/cover.webp'],
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/about',
    }
}

export default function Page() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    About Us
                </h1>
                <p className="text-gray-600  italic">
                    Journalism for People. By People. With Integrity.
                </p>
            </header>

            <section className="mb-12">
                <div className="relative h-64 w-full overflow-hidden mb-8">
                    <Image
                        src="/cover.webp"
                        alt="Citizen Watch Bharat team in action"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <p className="text-lg text-gray-700 mb-6">
                    Citizen Watch Bharat (CWB) is an RNI-registered monthly newspaper and digital civic journalism platform committed to building a culture of ethical, impact-driven, and citizen-first reporting. We exist at the intersection of journalism, social accountability, and public empowerment, working relentlessly to ensure truth, transparency, and civic participation are not just ideals—but everyday practices.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                    Our Editorial Philosophy
                </h2>
                <p className="text-gray-700 mb-6">
                    At Citizen Watch Bharat, we believe journalism is more than news—it is a public service and a moral responsibility. In an era dominated by viral headlines and sensational narratives, our focus remains steadfast on:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="text-red-600 mr-2">✓</span> Accuracy over Speed
                        </h3>
                        <p className="text-gray-700">
                            We prioritize verified facts over quick clicks, ensuring every published piece withstands public and professional scrutiny.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="text-red-600 mr-2">✓</span> Independence & Impartiality
                        </h3>
                        <p className="text-gray-700">
                            We maintain an editorial firewall from political, corporate, or ideological influence, guaranteeing unbiased coverage.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="text-red-600 mr-2">✓</span> Ethical Reporting
                        </h3>
                        <p className="text-gray-700">
                            Guided by global journalism codes and civic protocols, we ensure stories respect human dignity, cultural diversity, and the greater public good.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="text-red-600 mr-2">✓</span> Civic-Centric Narratives
                        </h3>
                        <p className="text-gray-700">
                            From grassroots governance to citizen-led reforms, our stories amplify voices that often go unheard—bridging citizens with policy, institutions, and change-makers.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                    Core Values We Live By
                </h2>
                <ul className="grid md:grid-cols-2 gap-4 mb-6">
                    <li className="flex items-start">
                        <span className="text-red-600 font-bold mr-2">•</span>
                        <div>
                            <h3 className="font-semibold text-gray-800">Truth & Transparency</h3>
                            <p className="text-gray-700">Our journalism is rooted in verifiable data, on-ground insights, and transparent sourcing.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-red-600 font-bold mr-2">•</span>
                        <div>
                            <h3 className="font-semibold text-gray-800">Accountability</h3>
                            <p className="text-gray-700">We hold institutions, systems, and even ourselves accountable for the information we deliver.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-red-600 font-bold mr-2">•</span>
                        <div>
                            <h3 className="font-semibold text-gray-800">Constructive Journalism</h3>
                            <p className="text-gray-700">We go beyond reporting problems, focusing on solutions and citizen-driven change models.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-red-600 font-bold mr-2">•</span>
                        <div>
                            <h3 className="font-semibold text-gray-800">Respect & Empathy</h3>
                            <p className="text-gray-700">Every story is approached with sensitivity to the people and communities involved.</p>
                        </div>
                    </li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                    Our Work & Impact
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="border-l-4 border-red-600 pl-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Investigative & Civic Reporting</h3>
                        <p className="text-gray-700">Exposing gaps in governance, public services, and policy implementation.</p>
                    </div>
                    <div className="border-l-4 border-red-600 pl-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Data-Backed Insights</h3>
                        <p className="text-gray-700">Turning complex socio-economic and political realities into accessible, citizen-friendly information.</p>
                    </div>
                    <div className="border-l-4 border-red-600 pl-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Educational Journalism</h3>
                        <p className="text-gray-700">Enhancing civic literacy through explainer series, community workshops, and awareness campaigns.</p>
                    </div>
                    <div className="border-l-4 border-red-600 pl-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Digital & Print Reach</h3>
                        <p className="text-gray-700">From our monthly newspaper to real-time digital platforms—including RSS feeds, newsletters, and multimedia formats—we deliver news built for an informed citizenry.</p>
                    </div>
                </div>
            </section>

            <section className="mb-12 bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Why We Exist</h2>
                <p className="text-gray-700 mb-6">
                    In an age of information overload, misinformation, and polarized media, the public deserves a trustworthy, non-partisan source of civic journalism. Citizen Watch Bharat is that space—a citizen-powered, ethics-driven platform enabling society to understand, engage with, and shape the systems that govern them.
                </p>
            </section>

            <section className="text-center py-8 border-t border-b border-gray-200 mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Join the Citizen Journalism Movement</h2>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                    Citizen Watch Bharat is not just a newsroom—it is a collective for truth and accountability. Whether you are a reader, reporter, reformer, or policymaker, you have a role in strengthening democracy and civic ethics.
                </p>

                {/* Social Media */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <div className="flex flex-wrap gap-4">
                        {socialMedia.map((social) => (
                            <Link
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Follow us on ${social.name}`}
                                className="hover:opacity-75 transition-opacity"
                            >
                                <Image
                                    src={social.icon}
                                    alt={social.alt}
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <div className="text-center text-sm text-gray-500">
                <p>RNI Registration Number: RAJBIL27032</p>
                <p>Established in 2017 | Headquarters: Sikar, Rajasthan</p>
            </div>
        </div>
    );
};