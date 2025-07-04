"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// --- Types ---
type Category = { name: string; slug: string };

type NavLink = { label: string; href: string };

// --- Data ---
const categories: Category[] = [
    { name: "Political", slug: "political" },
    { name: "Sports", slug: "sports" },
    { name: "Entertainment", slug: "entertainment" },
    { name: "Business", slug: "business" },
    { name: "Elections", slug: "elections" },
    { name: "International", slug: "international" },
    { name: "National", slug: "national" },
    { name: "Web-Stories", slug: "web-stories" },
];

const categoryNameHindi: Record<string, string> = {
    Political: "राजनीति",
    Sports: "खेल",
    Entertainment: "मनोरंजन",
    Business: "व्यापार",
    Elections: "चुनाव",
    International: "अंतरराष्ट्रीय",
    National: "राष्ट्रीय",
    "Web-Stories": "वेब कहानियाँ",
};

const commonLinks: NavLink[] = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Career", href: "/career" },
];

// --- Components ---
function CategoryLink({ cat, isActive }: { cat: Category; isActive: boolean }) {
    return (
        <Link
            href={`/category/${cat.slug}`}
            className={`px-2 py-1 transition-all border-b-2 text-foreground duration-300 focus-visible:underline ${isActive
                ? "text-red-600 border-red-600"
                : "border-transparent hover:border-red-600 hover:text-red-600"
                }`}
            aria-current={isActive ? "page" : undefined}
        >
            {categoryNameHindi[cat.name] || cat.name}
        </Link>
    );
}

function NavLinks({ onClick }: { onClick?: () => void }) {
    return (
        <>
            {commonLinks.map(({ label, href }) => (
                <Link
                    key={label}
                    href={href}
                    onClick={onClick}
                    className="py-2 hover:text-red-600"
                >
                    {label}
                </Link>
            ))}
        </>
    );
}

function LoginButton({ onClick, fullWidth = false }: { onClick?: () => void; fullWidth?: boolean }) {
    return (
        <Link href="/login" onClick={onClick}>
            <button
                className={`bg-black text-white px-4 py-2 rounded-lg border hover:bg-background hover:text-foreground duration-300 ${fullWidth ? "w-full mt-2" : ""
                    }`}
            >
                Log in
            </button>
        </Link>
    );
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();

    // Close menu on outside click or Escape key
    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (isOpen && event.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        // Always clean up overflow on state change
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);


    // Keyboard navigation: trap focus inside mobile menu
    useEffect(() => {
        if (!isOpen || !menuRef.current) return;
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        function trapFocus(e: KeyboardEvent) {
            if (e.key !== "Tab") return;
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
        menuRef.current.addEventListener("keydown", trapFocus);
        // return () => {
        //     menuRef.current?.removeEventListener("keydown", trapFocus);
        // }
    }, [isOpen]);

    // Memoized close handler for passing to children
    const handleCloseMenu = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {/* Top Navbar */}
            <header className="relative bg-white text-black border-b border-black/30 z-50" role="banner">
                <div className="border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link href="/" className="flex items-center" aria-label="Home">
                                <Image
                                    className="h-18 w-auto"
                                    src="/cwb-logo.png"
                                    alt="Citizen Watch Bharat Logo"
                                    width={100}
                                    height={80}
                                    priority
                                />
                            </Link>
                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => {
                                    if (isOpen) {
                                        setIsOpen(false);
                                    } else {
                                        setIsOpen(true);
                                    }
                                }}
                                aria-label="Open Menu"
                                aria-expanded={isOpen}
                                aria-controls="mobile-menu-panel"
                                className="text-2xl block md:hidden"
                            >
                                ☰
                            </button>
                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-6 font-medium" aria-label="Main Navigation">
                                <NavLinks />
                                <LoginButton />
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Mobile Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        aria-hidden="true"
                        onClick={handleCloseMenu}
                    />
                )}

                {/* Mobile Menu Panel */}
                <div
                    ref={menuRef}
                    id="mobile-menu-panel"
                    className={`fixed top-0 right-0 bottom-0 w-3/4 z-50 bg-white transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                    role="dialog"
                    aria-modal="true"
                    tabIndex={-1}
                >
                    <button
                        onClick={handleCloseMenu}
                        aria-label="Close Menu"
                        className="absolute top-4 right-4 text-3xl z-[60] focus:outline-none"
                    >
                        ✖
                    </button>
                    <nav className="h-full px-4 pt-16 pb-8 flex flex-col space-y-4 font-semibold divide-y overflow-y-auto" aria-label="Mobile Navigation">
                        <NavLinks onClick={handleCloseMenu} />
                        <LoginButton onClick={handleCloseMenu} fullWidth />
                    </nav>
                </div>
            </header>
            {/* Desktop Categories */}
            <nav className="hidden md:flex justify-center bg-white shadow-md py-3 z-40" aria-label="Categories">
                <ul className="flex gap-6 font-bold text-sm lg:text-base">
                    {categories.map((cat) => {
                        const isActive = pathname?.startsWith(`/category/${cat.slug}`);
                        return (
                            <li key={cat.slug}>
                                <CategoryLink cat={cat} isActive={!!isActive} />
                            </li>
                        );
                    })}
                </ul>
            </nav>
            {/* Mobile Categories */}
            <nav className="md:hidden sticky top-0 bg-white shadow-md z-30" aria-label="Categories">
                <ul className="flex gap-4 px-4 py-2 overflow-x-auto whitespace-nowrap font-bold text-[15px] scrollbar-hide">
                    {categories.map((cat) => {
                        const isActive = pathname?.startsWith(`/category/${cat.slug}`);
                        return (
                            <li key={cat.slug}>
                                <CategoryLink cat={cat} isActive={!!isActive} />
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
