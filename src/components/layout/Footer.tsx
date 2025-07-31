import Link from 'next/link';
import Image from 'next/image';

// Data structure for maintainability
const footerData = {
    about: {
        logo: '/cwb-footer.png',
        description: 'Your trusted source for comprehensive news coverage across India. Stay informed with the latest breaking news, politics, business, sports, and entertainment updates.',
        contact: {
            email: 'info@citizenwatchbharat.com',
            location: 'Rajasthan, India'
        }
    },
    quickLinks: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Careers', href: '/careers' },
        { name: 'Code of Ethics', href: '/code-of-ethics' },
        // { name: 'Grievance Redressal', href: '/grievance' }
    ],
    categories: [
        { name: 'National', href: '/news/national' },
        { name: 'International', href: '/news/international' },
        { name: 'Business', href: '/news/business' },
        { name: 'Sports', href: '/news/sports' },
        { name: 'Politics', href: '/news/politics' },
        { name: 'Entertainment', href: '/news/entertainment' },
    ],
    socialMedia: [
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/citizenwatchbharat',
            icon: '/social/facebook.webp',
            alt: 'Facebook Logo'
        },
        {
            name: 'Twitter/X',
            href: 'https://twitter.com/cwbofficials',
            icon: '/social/twitter.webp',
            alt: 'Twitter Logo'
        },
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/citizenwatchbharat',
            icon: '/social/instagram.webp',
            alt: 'Instagram Logo'
        },
        {
            name: 'YouTube',
            href: 'https://youtube.com/@citizenwatchbharat',
            icon: '/social/youtube.webp',
            alt: 'YouTube Logo'
        },
        {
            name: 'Threads',
            href: 'https://www.threads.net/@citizenwatchbharat',
            icon: '/social/threads.webp',
            alt: 'Threads Logo'
        },
        // {
        //     name: 'LinkedIn',
        //     href: 'https://linkedin.com/company/citizenwatchbharat',
        //     icon: '/social/linkedin.webp',
        //     alt: 'LinkedIn Logo'
        // }
    ],
    legalLinks: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        // { name: 'Cookie Policy', href: '/cookie-policy' },
        // { name: 'GDPR Compliance', href: '/gdpr' }
    ]
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-neutral-900 text-white border-t border-neutral-800">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 md:px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* About Section */}
                    <div className="flex flex-col gap-2">
                        <Link href="/" aria-label="Citizen Watch Bharat Home" className='w-fit'>
                            <Image
                                src={footerData.about.logo}
                                alt="Citizen Watch Bharat Logo"
                                width={150}
                                height={50}
                                className="h-auto w-32"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {footerData.about.description}
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <a
                                    href={`mailto:${footerData.about.contact.email}`}
                                    className="hover:text-white transition-colors"
                                    aria-label="Email Citizen Watch Bharat"
                                >
                                    {footerData.about.contact.email}
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>{footerData.about.contact.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            {footerData.quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors text-sm"
                                        aria-label={`Go to ${link.name}`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">News Categories</h3>
                        <ul className="space-y-3">
                            {footerData.categories.map((category) => (
                                <li key={category.name}>
                                    <Link
                                        href={category.href}
                                        className="text-gray-300 hover:text-white transition-colors text-sm"
                                        aria-label={`Browse ${category.name} news`}
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Connect With Us</h3>
                        <div className="flex flex-wrap gap-4">
                            {footerData.socialMedia.map((social) => (
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
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-neutral-800 border-t border-neutral-700">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-400">
                            &copy; {currentYear} <span className="font-semibold text-white">Citizen Watch Bharat</span>. All Rights Reserved.
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            {footerData.legalLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                    aria-label={`View ${link.name}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}