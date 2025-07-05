import { MoveRight } from "lucide-react";
import Link from "next/link";

export function ButtonLeft({ href, title, className }: { href: string; title: string; className?: string; }) {
    return (
        <Link href={href} className="text-black font-bold group relative leading-snug">
            <span className={`relative z-10 ${className}`}>{title}</span>
            <span
                className="absolute left-0 bottom-0 h-0.5 bg-black w-full transition-all duration-300 group-hover:w-0 right-0 group-hover:right-0"
            ></span>
        </Link>
    )
}

export function ButtonSeeMore({ href, title }: { href: string; title: string }) {
    return (
        <Link href={href} className="flex items-center justify-center col-span-2 text-black hover:bg-gray-100 py-2 px-6 font-bold group duration-300">
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
    return (
        <Link href={href} className={`text-black font-bold hover:underline underline-offset-2 leading-snug ${className}`}>
            <span className="relative z-10">{title}</span>
        </Link>
    )
}

