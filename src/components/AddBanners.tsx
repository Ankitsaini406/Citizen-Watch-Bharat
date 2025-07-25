'use client';

import { Advertisement } from '@/types/type';
import { fetchAdvertisements } from '@/utils/ApiUtils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function TopBanner({ place = 'Home' } : { place?: string; }) {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAdvertisements = async () => {
            try {
                const ads = await fetchAdvertisements('top', place);
                setAdvertisements(ads);
            } catch (error) {
                console.error('Error loading top banner:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAdvertisements();
    }, [place]);

    if (loading) {
        return (
            <div className="container mx-auto my-10 px-10 xl:px-0">
                <div className="flex justify-center items-center w-full bg-gradient-to-l from-gray-500 to-gray-400 h-60 md:h-40 lg:h-60">
                    <h1 className="text-3xl text-background">Loading...</h1>
                </div>
            </div>
        );
    }

    if (advertisements.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto my-10 px-10 xl:px-0">
            {advertisements.map((ad) => (
                <div
                    key={ad.id}
                    className="relative mb-6  border-2 border-gray-300 shadow-lg overflow-hidden group"
                >
                    {/* Advertisement Label */}
                    <span className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs font-semibold px-3 py-1 ">
                        Advertisement
                    </span>
                    <Link
                        href={ad.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <div className="relative flex justify-center items-center w-full h-60 md:h-40 lg:h-60 overflow-hidden transition-transform group-hover:scale-105 duration-300">
                            {/* Optional overlay for better contrast */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300 z-10" />
                            <Image
                                fill
                                src={ad.imageUrl}
                                alt={ad.title}
                                className="w-full h-full object-cover"
                                style={{ zIndex: 0 }}
                            />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export function LeftBanner({ place = 'Home' } : { place?: string; }) {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAdvertisements = async () => {
            try {
                const ads = await fetchAdvertisements('left', place);
                setAdvertisements(ads);
            } catch (error) {
                console.error('Error loading left banner:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAdvertisements();
    }, [place]);

    if (loading) {
        return (
            <div className="hidden 2xl:block fixed left-0 top-48 h-3/4">
                <div className="flex justify-center items-center w-40 bg-gradient-to-l from-gray-500 to-gray-400 h-96  border-2 border-gray-300 shadow-lg">
                    <h1 className="text-3xl text-background">Loading...</h1>
                </div>
            </div>
        );
    }

    if (advertisements.length === 0) {
        return null;
    }

    return (
        <div className="hidden 2xl:block fixed left-0 top-48 h-3/4">
            {advertisements.map((ad) => (
                <div
                    key={ad.id}
                    className="relative mb-6  border-2 border-gray-300 shadow-lg overflow-hidden group h-full"
                >
                    <span className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs font-semibold px-3 py-1">
                        Advertisement
                    </span>
                    <Link
                        href={ad.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                    >
                        <div className="relative flex justify-center items-center w-40 h-full overflow-hidden transition-transform group-hover:scale-105 duration-300">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300 z-10 h-full" />
                            <Image
                                fill
                                src={ad.imageUrl}
                                alt={ad.title}
                                className="w-full h-full object-cover"
                                style={{ zIndex: 0 }}
                            />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export function RightBanner({ place = 'Home' } : { place?: string; }) {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAdvertisements = async () => {
            try {
                const ads = await fetchAdvertisements('right', place);
                setAdvertisements(ads);
            } catch (error) {
                console.error('Error loading right banner:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAdvertisements();
    }, [place]);

    if (loading) {
        return (
            <div className="hidden 2xl:block fixed right-0 top-48 h-3/4">
                <div className="flex justify-center items-center w-40 bg-gradient-to-l from-gray-500 to-gray-400 h-96  border-2 border-gray-300 shadow-lg">
                    <h1 className="text-3xl text-background">Loading...</h1>
                </div>
            </div>
        );
    }

    if (advertisements.length === 0) {
        return null;
    }

    return (
        <div className="hidden 2xl:block fixed right-0 top-48 h-3/4">
            {advertisements.map((ad) => (
                <div
                    key={ad.id}
                    className="relative mb-6  border-2 border-gray-300 shadow-lg overflow-hidden group h-full"
                >
                    <span className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs font-semibold px-3 py-1 ">
                        Advertisement
                    </span>
                    <Link
                        href={ad.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                    >
                        <div className="relative flex justify-center items-center w-40 h-full overflow-hidden transition-transform group-hover:scale-105 duration-300">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300 z-10 h-full" />
                            <Image
                                fill
                                src={ad.imageUrl}
                                alt={ad.title}
                                className="w-full h-full object-cover"
                                style={{ zIndex: 0 }}
                            />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export function MiddleBanner({ place = 'Home' } : { place?: string; }) {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAdvertisements = async () => {
            try {
                const ads = await fetchAdvertisements('middle', place);
                setAdvertisements(ads);
            } catch (error) {
                console.error('Error loading middle banner:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAdvertisements();
    }, [place]);

    if (loading) {
        return (
            <div className="my-10 px-10 xl:px-0">
                <div className="flex justify-center items-center w-full bg-gradient-to-l from-gray-500 to-gray-400 h-40  border-2 border-gray-300 shadow-lg">
                    <h1 className="text-3xl text-background">Loading...</h1>
                </div>
            </div>
        );
    }

    if (advertisements.length === 0) {
        return null;
    }

    return (
        <div className="my-10 px-10 xl:px-0">
            {advertisements.map((ad) => (
                <div
                    key={ad.id}
                    className="relative mb-6  border-2 border-gray-300 shadow-lg overflow-hidden group"
                >
                    <span className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs font-semibold px-3 py-1 ">
                        Advertisement
                    </span>
                    <Link
                        href={ad.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <div className="relative flex justify-center items-center w-full h-40 overflow-hidden transition-transform group-hover:scale-105 duration-300">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300 z-10" />
                            <Image
                                fill
                                src={ad.imageUrl}
                                alt={ad.title}
                                className="w-full h-full object-cover"
                                style={{ zIndex: 0 }}
                            />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export function BottomBanner({ place = 'Home' } : { place?: string; }) {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAdvertisements = async () => {
            try {
                const ads = await fetchAdvertisements('bottom', place);
                setAdvertisements(ads);
            } catch (error) {
                console.error('Error loading top banner:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAdvertisements();
    }, [place]);

    if (loading) {
        return (
            <div className="container mx-auto my-10 px-10 xl:px-0">
                <div className="flex justify-center items-center w-full bg-gradient-to-l from-gray-500 to-gray-400 h-60 md:h-40 lg:h-60  border-2 border-gray-300 shadow-lg">
                    <h1 className="text-3xl text-background">Loading...</h1>
                </div>
            </div>
        );
    }

    if (advertisements.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto my-10 px-10 xl:px-0">
            {advertisements.map((ad) => (
                <div
                    key={ad.id}
                    className="relative mb-6  border-2 border-gray-300 shadow-lg overflow-hidden group"
                >
                    <span className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs font-semibold px-3 py-1 ">
                        Advertisement
                    </span>
                    <Link
                        href={ad.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <div className="relative flex justify-center items-center w-full h-60 md:h-40 lg:h-60 overflow-hidden transition-transform group-hover:scale-105 duration-300">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300 z-10" />
                            <Image
                                fill
                                src={ad.imageUrl}
                                alt={ad.title}
                                className="w-full h-full object-cover"
                                style={{ zIndex: 0 }}
                            />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}