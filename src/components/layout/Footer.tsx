import Link from 'next/link';
import Image from 'next/image'; // If you have a logo

export default function Footer() {
    return (
        <footer className="relative bg-neutral-900 text-white border-t border-neutral-800">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* About Section */}
                    <div>
                        {/* Logo (optional) */}
                        <Image src="/cwb-logo.png" alt="Citizen Watch Bharat Logo" width={120} height={40} className="mb-4 bg-white" />
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Your trusted source for comprehensive news coverage across India.<br />
                            Stay informed with the latest breaking news, politics, business, sports, and entertainment updates.
                        </p>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                            </svg>
                            <a href="mailto:info@citizenwatchbharat.com" className="hover:text-blue-400 transition-colors">info@citizenwatchbharat.com</a>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm mt-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                            </svg>
                            <span>Rajsthan, India</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</Link></li>
                            <li><Link href="/news/latest" className="text-gray-300 hover:text-blue-400 transition-colors">Latest News</Link></li>
                            <li><Link href="/news/national" className="text-gray-300 hover:text-blue-400 transition-colors">National</Link></li>
                            <li><Link href="/news/international" className="text-gray-300 hover:text-blue-400 transition-colors">International</Link></li>
                            <li><Link href="/news/business" className="text-gray-300 hover:text-blue-400 transition-colors">Business</Link></li>
                            <li><Link href="/news/sports" className="text-gray-300 hover:text-blue-400 transition-colors">Sports</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-blue-400">Categories</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/news/political" className="text-gray-300 hover:text-blue-400 transition-colors">Politics</Link></li>
                            <li><Link href="/news/entertainment" className="text-gray-300 hover:text-blue-400 transition-colors">Entertainment</Link></li>
                            <li><Link href="/news/elections" className="text-gray-300 hover:text-blue-400 transition-colors">Elections</Link></li>
                            {/* <li><Link href="/news/breaking-news" className="text-gray-300 hover:text-blue-400 transition-colors">Breaking News</Link></li> */}
                            <li><Link href="/news/web-stories" className="text-gray-300 hover:text-blue-400 transition-colors">Web Stories</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter & Social */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-blue-400">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Facebook">
                                {/* Facebook SVG */}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                                {/* Twitter SVG */}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors" aria-label="Instagram">
                                {/* Instagram SVG */}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                                </svg>
                            </a>
                            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="YouTube">
                                {/* YouTube SVG */}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
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
                            <Link href="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</Link>
                            <Link href="/terms-of-service" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</Link>
                            <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Us</Link>
                            <Link href="/advertise" className="text-gray-400 hover:text-blue-400 transition-colors">Advertise</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}