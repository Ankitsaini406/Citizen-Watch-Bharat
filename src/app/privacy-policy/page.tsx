
import React from 'react';
import Link from 'next/link';

export default function Page() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Privacy Policy
                </h1>
                <p className="text-gray-600 italic">
                    RNI Registered Monthly Newspaper, Committed to Universal Ethics & Protocol of Civic Journalism
                </p>
            </header>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">INTRODUCTION</h2>
                <div className="space-y-4 text-gray-700">
                    <p>
                        Citizen Watch Bharat (hereinafter referred to as &quot;CWB&quot;) recognizes the critical importance of maintaining the privacy and trust of every reader, subscriber, and visitor to our digital platforms. As a civic journalism initiative, we follow universal ethics, transparency, and responsible handling of information.
                    </p>
                    <p>
                        This Privacy Policy explains how we collect, use, and protect your personal information when you use our website, mobile application, or any other online service linked to this policy (collectively, &quot;Services&quot;). By visiting and/or using our Services, you agree to the terms outlined below.
                    </p>
                    <p>
                        We may update this policy from time to time to reflect evolving practices or legal obligations. We encourage you to review it periodically.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">INFORMATION WE COLLECT</h2>
                <div className="space-y-4 text-gray-700">
                    <p>We collect:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong>Information provided by you</strong> - Name, contact details (email/phone), demographic information, or any details shared during registration, subscription, or interaction with our Services.
                        </li>
                        <li>
                            <strong>Automated information</strong> - Device details (IP address, browser type, operating system, location, device identifiers), browsing patterns, and interactions with our digital content.
                        </li>
                        <li>
                            <strong>Third-party-linked information</strong> - Data shared via third-party sign-ins (e.g., Google, Facebook) as per their policies and your consent.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">HOW WE COLLECT INFORMATION</h2>
                <div className="space-y-4 text-gray-700">
                    <ul className="list-disc pl-6 space-y-2">
                        <li>When you subscribe, comment, or register for newsletters.</li>
                        <li>When you access our website/apps, interact with notifications or surveys.</li>
                        <li>Through cookies, web beacons, analytics tools, and other technologies for performance and personalization.</li>
                        <li>If location services are enabled, we may capture geolocation for relevant news and civic alerts.</li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">COOKIES & TRACKING TECHNOLOGIES</h2>
                <div className="space-y-4 text-gray-700">
                    <p>
                        Cookies enable us to enhance user experience, deliver content relevant to your interests, and improve site functionality. You can manage cookies in your browser settings. Disabling cookies may limit full functionality of our Services.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">HOW WE USE YOUR INFORMATION</h2>
                <div className="space-y-4 text-gray-700">
                    <p>We use collected data to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Deliver and manage our journalism and digital services.</li>
                        <li>Personalize content and reader experience.</li>
                        <li>Communicate updates, newsletters, civic awareness campaigns, and verified news alerts.</li>
                        <li>Analyze readership behavior to improve our reporting and editorial policies.</li>
                        <li>Ensure compliance with laws and protect the rights, safety, and integrity of our platforms, journalists, and readers.</li>
                    </ul>
                    <p>
                        We do not sell personal data. Any content customization or advertising remains compliant with ethical civic journalism norms.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">HOW WE SHARE INFORMATION</h2>
                <div className="space-y-4 text-gray-700">
                    <p>We may share information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>With trusted service providers (hosting, analytics, newsletter delivery) bound by confidentiality agreements.</li>
                        <li>With affiliated civic journalism partners when legally required or consented by you.</li>
                        <li>To comply with law, enforce agreements, or safeguard public safety.</li>
                        <li>In case of mergers, acquisitions, or organizational restructuring (rare and transparent cases).</li>
                    </ul>
                    <p>
                        We never share personal data for purposes contrary to civic journalism ethics.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">ACCESS & CONTROL OF YOUR DATA</h2>
                <div className="space-y-4 text-gray-700">
                    <p>
                        You can review or update your personal information by logging into your account or by writing to us. Upon request, we will delete or anonymize personal data as per legal obligations and ethical standards.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">OPTING OUT OF COMMUNICATIONS</h2>
                <div className="space-y-4 text-gray-700">
                    <p>
                        You may unsubscribe from newsletters or updates via the &quot;unsubscribe&quot; link or by contacting us directly. Opting out does not affect legally required communications or civic engagement notifications directly linked to public interest.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">SECURITY & DATA PROTECTION</h2>
                <div className="space-y-4 text-gray-700">
                    <p>
                        We follow industry-standard security measures and ethical handling of sensitive information. However, as with all digital systems, absolute security cannot be guaranteed.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">CONTACT US</h2>
                <div className="space-y-4 text-gray-700">
                    <p>
                        For privacy-related queries or withdrawal of consent, email:{" "}
                        <Link href="mailto:info@citizenwatchbharat.com" className="text-red-600 hover:underline">
                            info@citizenwatchbharat.com
                        </Link>
                    </p>
                    <p className="font-medium">&quot;Use the subject line as mentioned Below to ensure faster processing of your request&quot;</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>For general privacy queries:<br />
                            <strong>Subject:</strong> Privacy Policy Inquiry - Citizen Watch Bharat</li>
                        <li>For consent withdrawal or data deletion requests:<br />
                            <strong>Subject:</strong> Consent Withdrawal / Data Deletion Request - Citizen Watch Bharat</li>
                    </ul>
                    <p className="mt-4">
                        Citizen Watch Bharat reaffirms its dedication to transparent, responsible journalism aligned with RNI guidelines and universal civic ethics.
                    </p>
                </div>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                    Last updated: July 31, 2025
                </p>
            </div>
        </div>
    );
};