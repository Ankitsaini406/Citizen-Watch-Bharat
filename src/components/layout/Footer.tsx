import Link from 'next/link';
import Image from 'next/image'; // If you have a logo
import { Facebook, Instagram, X, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-neutral-900 text-white border-t border-neutral-800">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* About Section */}
                    <div>
                        {/* Logo (optional) */}
                        <Image src="/cwb-footer.png" alt="Citizen Watch Bharat Logo" width={120} height={40} className="mb-4" />
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Your trusted source for comprehensive news coverage across India.<br />
                            Stay informed with the latest breaking news, politics, business, sports, and entertainment updates.
                        </p>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                            </svg>
                            <a href="mailto:info@citizenwatchbharat.com" className="hover:text-white transition-colors">info@citizenwatchbharat.com</a>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm mt-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                            </svg>
                            <span>Rajasthan, India</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                            {/* <li><Link href="/news/latest" className="text-gray-300 hover:text-white transition-colors">Latest News</Link></li> */}
                            <li><Link href="/news/national" className="text-gray-300 hover:text-white transition-colors">National</Link></li>
                            <li><Link href="/news/international" className="text-gray-300 hover:text-white transition-colors">International</Link></li>
                            <li><Link href="/news/business" className="text-gray-300 hover:text-white transition-colors">Business</Link></li>
                            <li><Link href="/news/sports" className="text-gray-300 hover:text-white transition-colors">Sports</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Categories</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/news/political" className="text-gray-300 hover:text-white transition-colors">Politics</Link></li>
                            <li><Link href="/news/entertainment" className="text-gray-300 hover:text-white transition-colors">Entertainment</Link></li>
                            <li><Link href="/news/elections" className="text-gray-300 hover:text-white transition-colors">Elections</Link></li>
                            <li><Link href="/news/web-stories" className="text-gray-300 hover:text-white transition-colors">Web Stories</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter & Social */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
                        <div className="flex space-x-4">
                            <Link href="https://www.facebook.com/citizenwatchbharat" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Facebook">
                            <Facebook />
                            </Link>
                            <Link href="https://x.com/cwbofficials" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                                {/* Twitter SVG */}
                                <X />
                            </Link>
                            <Link href="https://www.instagram.com/citizenwatchbharat" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors" aria-label="Instagram">
                                {/* Instagram SVG */}
                                <Instagram />
                            </Link>
                            <Link href="https://youtube.com/@citizenwatchbharat" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="YouTube">
                                {/* YouTube SVG */}
                                <Youtube />
                            </Link>
                            <Link href="https://www.threads.com/@citizenwatchbharat" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="T">
                                {/* YouTube SVG */}
                                @
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-neutral-800 border-t border-neutral-700 mt-8">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <div className="text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Citizen Watch Bharat</span>. All rights reserved.
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <Link href="/privacy-policy" className="text-gray-400 hover:text-red-600 transition-colors">Privacy Policy</Link>
                            <Link href="/terms-of-service" className="text-gray-400 hover:text-red-600 transition-colors">Terms of Service</Link>
                            <Link href="/contact" className="text-gray-400 hover:text-red-600 transition-colors">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}