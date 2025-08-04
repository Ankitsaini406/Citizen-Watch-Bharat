"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TailwindIndicator from "@/lib/TailwindIndicator";
import { usePathname } from "next/navigation";

export default function ChildLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isBioPage = pathname === '/bio'
    return (
        <>
            {!isBioPage && <Header />}
            {children}
            <TailwindIndicator />
            {!isBioPage && <Footer />}
        </>
    )
}