import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative bg-black text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-blue-400">Citizen Watch Bharat</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Your trusted source for comprehensive news coverage across India. 
                            Stay informed with the latest breaking news, politics, business, 
                            sports, and entertainment updates.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/news/latest" className="text-gray-300 hover:text-white transition-colors">Latest News</Link></li>
                            <li><Link href="/news/category/national" className="text-gray-300 hover:text-white transition-colors">National</Link></li>
                            <li><Link href="/news/category/international" className="text-gray-300 hover:text-white transition-colors">International</Link></li>
                            <li><Link href="/news/category/business" className="text-gray-300 hover:text-white transition-colors">Business</Link></li>
                            <li><Link href="/news/category/sports" className="text-gray-300 hover:text-white transition-colors">Sports</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-blue-400">Categories</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/news/category/politics" className="text-gray-300 hover:text-white transition-colors">Politics</Link></li>
                            <li><Link href="/news/category/entertainment" className="text-gray-300 hover:text-white transition-colors">Entertainment</Link></li>
                            <li><Link href="/news/category/elections" className="text-gray-300 hover:text-white transition-colors">Elections</Link></li>
                            <li><Link href="/news/category/breaking-news" className="text-gray-300 hover:text-white transition-colors">Breaking News</Link></li>
                            <li><Link href="/news/category/web-stories" className="text-gray-300 hover:text-white transition-colors">Web Stories</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-blue-400">Connect With Us</h4>
                        {/* <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                </svg>
                                <span className="text-sm text-gray-300">info@citizenwatchbharat.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                                </svg>
                                <span className="text-sm text-gray-300">New Delhi, India</span>
                            </div>
                        </div> */}
                        
                        {/* Social Media */}
                        <div className="mt-4">
                            <h5 className="text-sm font-medium mb-3 text-gray-300">Follow Us</h5>
                            <div className="flex space-x-3">
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Facebook">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Instagram">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="YouTube">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <div className="text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} Citizen Watch Bharat. All rights reserved.
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Advertise</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}