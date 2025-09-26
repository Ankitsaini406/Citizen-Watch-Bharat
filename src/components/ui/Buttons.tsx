"use client";

import { useLoading } from "@/context/LoadingContext";
import {ChevronRight, MoveRight} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {useState} from "react";

// Common click handler logic
const useNavigationHandler = (href: string) => {
    const { startLoading } = useLoading();
    const pathname = usePathname();

    const handleClick = () => {
        // Only start loading if we're actually changing routes
        if (!pathname || pathname !== href) {
            startLoading();
        }
    };

    return handleClick;
};

interface AccentButtonProps {
    href?: string;
    title: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export function AccentButton({ href, title, className, type = "button", disabled = false }: AccentButtonProps) {

    const { startLoading } = useLoading();
    const pathname = usePathname();

    const baseClasses = `inline-flex items-center justify-center px-6 py-2 rounded-lg font-semibold border border-primary
    text-white bg-primary hover:bg-white hover:text-primary active:bg-primary active:text-white
    transition-colors duration-300 ${className}`;

    if (href) {
        const handleClick = () => {
            if (!pathname || pathname !== href) {
                startLoading();
            }
        };

        return (
            <Link href={href} onClick={handleClick} className={baseClasses}>
                {title}
            </Link>
        );
    }

    return (
        <button type={type} disabled={disabled} className={baseClasses}>
            {title}
        </button>
    );
}

export function ButtonLeft({ href, title, className }: { href: string; title: string; className?: string; }) {
    const handleClick = useNavigationHandler(href);

    return (
        <Link 
            href={href} 
            className="text-black font-bold group relative leading-snug"
            onClick={handleClick}
        >
            <span className={`relative z-10 ${className}`}>{title}</span>
            <span
                className="absolute left-0 bottom-0 h-0.5 bg-black w-full transition-all duration-300 group-hover:w-0 right-0 group-hover:right-0"
            ></span>
        </Link>
    )
}

export function ButtonSeeMore({ href, title }: { href: string; title: string }) {
    const handleClick = useNavigationHandler(href);

    return (
        <Link 
            href={href} 
            className="flex items-center justify-center col-span-2 text-black hover:bg-gray-100 py-2 px-6 font-bold group duration-300"
            onClick={handleClick}
        >
            <div className="relative w-fit">
                <span className="flex items-center justify-center gap-2">{title} <MoveRight /></span>
                <span
                    className="absolute left-0 bottom-0 h-[1.5px] bg-black w-full transition-all duration-300 group-hover:w-0 right-0 group-hover:right-0"
                ></span>
            </div>
        </Link>
    )
}

export function ButtonLink({ href, title, className }: { href: string; title: string; className?: string; }) {
    const handleClick = useNavigationHandler(href);

    return (
        <Link 
            href={href} 
            className={`text-black font-bold hover:underline underline-offset-2 line-clamp-2 leading-snug ${className}`}
            onClick={handleClick}
        >
            <span className="relative z-10">{title}</span>
        </Link>
    )
}

export function ReadMore ({ text, length = 150 }: { text: string, length?: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const needsTruncation = text.length > length;
    const displayText = isExpanded ? text : (needsTruncation ? text.slice(0, length) + '...' : text);

    return (
        <div>
            <p className={`text-gray-700 leading-relaxed text-sm sm:text-base text-justify ${isExpanded ? '' : 'line-clamp-3'}`}>
                {displayText}
            </p>
            {needsTruncation && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-primary hover:text-primary-hover text-sm font-medium mt-1 focus:outline-none"
                >
                    {isExpanded ? 'Show Less' : 'Read More'}
                </button>
            )}
        </div>
    );
}

export function QuickAction({ label, onClick }: { label: string; onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            className="flex items-center justify-between w-full rounded-xl border border-gray-200 bg-white px-4 py-3 cursor-pointer transition-all hover:border-blue-300 hover:shadow-md"
        >
            <span className="font-medium text-gray-700">{label}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
    );
}