"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";
import { useSession } from "next-auth/react";

// --- Types ---
type Category = { name: string; slug: string };
type NavLink = { label: string; href: string };

// --- Data ---
const categories: Category[] = [
    { name: "National", slug: "national" },
    { name: "International", slug: "international" },
    { name: "Political", slug: "political" },
    { name: "Business", slug: "business" },
    { name: "Elections", slug: "elections" },
    { name: "Entertainment", slug: "entertainment" },
    { name: "Sports", slug: "sports" },
    { name: "Web-Stories", slug: "web-stories" },
    { name: "Lifestyle", slug: "lifestyle" },
];

const commonLinks: NavLink[] = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Career", href: "/career" },
];

// --- Components ---
function CategoryLink({ cat, isActive }: { cat: Category; isActive: boolean }) {
    const { startLoading } = useLoading(); // Get startLoading from context

    return (
        <Link
            href={`/news/${cat.slug}`}
            className={`px-2 py-1 transition-all border-b-2 text-foreground duration-300 focus-visible:underline ${
                isActive
                    ? "text-red-600 border-red-600"
                    : "border-transparent hover:border-red-600 hover:text-red-600"
            }`}
            aria-current={isActive ? "page" : undefined}
            onClick={startLoading} // Add loading trigger
        >
            {cat.name}
        </Link>
    );
}

function LoginButton() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const { data: session } = useSession();
    const { startLoading } = useLoading();

    useEffect(() => {
        if (session?.user?.email) {
            // ✅ logged in via NextAuth session
            setIsLoggedIn(true);
            return;
        }
    }, [session]);

    if (isLoggedIn === null)
        return <div className="w-24 h-10 bg-gray-200 animate-pulse rounded" />;

    return isLoggedIn ? (
        <Link
            href="/profile"
            onClick={() => startLoading()}
            replace
            className="inline-flex items-center justify-center px-6 py-2 rounded-lg font-semibold
        text-white bg-primary hover:bg-primary-hover active:bg-red-800
        transition-colors duration-300"
        >
            Profile
        </Link>
    ) : (
        <Link
            href="/auth/login"
            onClick={() => startLoading()}
            replace
            className="inline-flex items-center justify-center px-6 py-2 rounded-lg font-semibold
        text-white bg-primary hover:bg-primary-hover active:bg-red-800
        transition-colors duration-300"
        >
            Login
        </Link>
    );
}

function NomineButton() {
    const { startLoading } = useLoading(); // Get startLoading from context

    return (
        <Link 
            href="/nomines" 
            className="bg-foreground border text-background px-2.5 py-1.5 hover:text-foreground hover:bg-background duration-300 rounded-md w-fit font-semibold"
            onClick={startLoading} // Add loading trigger
        >
            Nomination Form
        </Link>
    )
}

function NavLinks({ onClick }: { onClick?: () => void }) {
    const { startLoading } = useLoading();

    const handleClick = () => {
        startLoading();
        onClick?.();
    };

    return (
        <>
            {commonLinks.map(({ label, href }) => (
                <Link
                    key={label}
                    href={href}
                    onClick={handleClick}
                    className="py-2 hover:text-red-600 font-semibold"
                >
                    {label}
                </Link>
            ))}
        </>
    );
}

function Breadcrumb() {
    const pathname = usePathname();
    const { startLoading } = useLoading();

    if (!pathname || pathname === "/" || pathname === "/not-found" || pathname === "404") return null;
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length <= 1) return null;

    let path = "";

    return (
        <nav
            className="max-w-7xl mx-auto w-full px-4 py-2 text-sm"
            aria-label="Breadcrumb"
        >
            <ol className="flex items-center space-x-1 overflow-hidden">
                {segments.map((seg, idx) => {
                    path += `/${seg}`;
                    const isLast = idx === segments.length - 1;
                    const decoded = decodeURIComponent(seg);
                    let label = decoded.replace(/-/g, " ");

                    if (label.length > 24) {
                        label = label.slice(0, 24) + "...";
                    }

                    label = label
                        .split(" ")
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                        )
                        .join(" ");

                    const isNews = seg === "news";
                    const linkHref = isNews ? "/" : path;

                    return (
                        <li key={path} className="flex items-center">
                            {idx > 0 && (
                                <span
                                    className="mx-1 text-gray-400 select-none"
                                    aria-hidden="true"
                                >
                                    /
                                </span>
                            )}
                            {isLast ? (
                                <span
                                    className="text-gray-800 font-semibold capitalize whitespace-nowrap"
                                    aria-current="page"
                                >
                                    {label}
                                </span>
                            ) : (
                                <Link
                                    href={linkHref}
                                    className="hover:underline font-medium text-gray-700 capitalize whitespace-nowrap transition-colors"
                                    onClick={startLoading} // Add loading trigger
                                >
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();
    const { startLoading } = useLoading(); // Get startLoading from context

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
        return () => {
            menuRef.current?.removeEventListener("keydown", trapFocus);
        };
    }, [isOpen]);

    const handleCloseMenu = useCallback(() => setIsOpen(false), []);

    // Add loading to logo click
    const handleLogoClick = () => {
        if (pathname !== "/") {
            startLoading();
        }
    };

    return (
        <>
            {/* Top Navbar */}
            <header className="relative bg-white text-black z-50" role="banner">
                <div className="border-b border-gray-100">
                    <div className="px-2 md:px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link 
                                href="/" 
                                className="flex items-center" 
                                aria-label="Home"
                                onClick={handleLogoClick} // Add loading trigger
                            >
                                <Image
                                    className="h-14 w-auto"
                                    src="/cwb-header.png"
                                    alt="Citizen Watch Bharat Logo"
                                    width={100}
                                    height={80}
                                    priority
                                />
                            </Link>
                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label={isOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isOpen}
                                aria-controls="mobile-menu-panel"
                                aria-haspopup="dialog"
                                className="text-2xl block md:hidden"
                            >
                                {isOpen ? "✖" : "☰"}
                            </button>
                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-6 font-medium" aria-label="Main Navigation">
                                <NavLinks />
                                <NomineButton />
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
                    className={`fixed top-0 right-0 bottom-0 w-3/4 z-50 bg-white transform transition-transform duration-500 ease-in-out ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mobile-menu-title"
                    aria-label="Mobile navigation menu"
                    tabIndex={-1}
                >
                    <h2 id="mobile-menu-title" className="sr-only">Mobile navigation menu</h2>
                    <button
                        onClick={handleCloseMenu}
                        aria-label="Close menu"
                        className="absolute top-4 right-4 text-3xl z-[60] focus:outline-none"
                    >
                        ✖
                    </button>
                    <nav className="h-full px-4 pt-16 pb-8 flex flex-col space-y-4 font-semibold divide-y overflow-y-auto" aria-label="Mobile Navigation">
                        <NavLinks onClick={handleCloseMenu} />
                        <NomineButton />
                        <LoginButton />
                    </nav>
                </div>
            </header>
            {/* Desktop Categories */}
            <nav className="hidden lg:flex sticky top-0 justify-center bg-gray-100 shadow-md py-3 z-40" aria-label="News Categories">
                <ul className="flex gap-6 font-bold text-sm lg:text-base">
                    {categories.map((cat) => {
                        const isActive = pathname?.startsWith(`/news/${cat.slug}`);
                        return (
                            <li key={cat.slug}>
                                <CategoryLink cat={cat} isActive={!!isActive} />
                            </li>
                        );
                    })}
                </ul>
            </nav>
            {/* Mobile Categories */}
            <nav className="lg:hidden sticky top-0 bg-gray-100 shadow-md z-30" aria-label="News Categories">
                <ul className="flex gap-4 px-4 py-2 overflow-x-auto whitespace-nowrap font-bold text-[15px] scrollbar-hide">
                    {categories.map((cat) => {
                        const isActive = pathname?.startsWith(`/news/${cat.slug}`);
                        return (
                            <li key={cat.slug}>
                                <CategoryLink cat={cat} isActive={!!isActive} />
                            </li>
                        );
                    })}
                </ul>
            </nav>
            {/* Breadcrumb */}
            <Breadcrumb />
        </>
    );
}