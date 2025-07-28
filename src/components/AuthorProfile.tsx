import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, X } from 'lucide-react';

interface AuthorProfileProps {
    author: {
        id?: string;
        name: string;
        image?: string;
        intro?: string;
        description?: string;
        twitter_link?: string;
        facebook_link?: string;
        instagram_link?: string;
        linkedin_link?: string;
    };
    className?: string;
}

export default function AuthorProfile({ author, className = '' }: AuthorProfileProps) {
    const authorImage = author.image || 'https://citizenwatchbharat.com/images/cwb/placeholder.svg';

    return (
        <div className={`bg-white shadow-sm border border-border p-6 ${className}`}>
            <div className="flex flex-col sm:flex-row gap-6">
                {/* Author Image */}
                <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-gray-100">
                        <Image
                            src={authorImage}
                            alt={author.name}
                            fill
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL="https://citizenwatchbharat.com/images/cwb/placeholder.svg"
                        />
                    </div>
                </div>

                {/* Author Info */}
                <div className="flex-1 min-w-0">
                    {/* Name and Role */}
                    <div className="mb-3 flex justify-between">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{author.name}</h3>

                        {/* Social Media Links */}
                        <div className="flex flex-wrap gap-3">
                            {author.twitter_link && (
                                <Link
                                    href={author.twitter_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow ${author.name} on X`}
                                    className="group flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-black text-gray-700 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
                                >
                                    <X className="w-4 h-4" />
                                </Link>
                            )}

                            {author.facebook_link && (
                                <Link
                                    href={author.facebook_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow ${author.name} on Facebook`}
                                    className="group flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-[#1877F3] text-gray-700 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
                                >
                                    <Facebook className="w-4 h-4" />
                                </Link>
                            )}

                            {author.instagram_link && (
                                <Link
                                    href={author.instagram_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow ${author.name} on Instagram`}
                                    className="group flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gradient-to-r hover:from-[#E1306C] hover:to-[#C13584] text-gray-700 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
                                >
                                    <Instagram className="w-4 h-4" />
                                </Link>
                            )}

                            {author.linkedin_link && (
                                <Link
                                    href={author.linkedin_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow ${author.name} on Instagram`}
                                    className="group flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-[#1877F3] text-gray-700 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Bio/Description */}
                    <div className="mb-4">
                        <p className="text-gray-700 leading-relaxed text- sm:text-base">
                            {author.intro}
                        </p>

                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            {author.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 