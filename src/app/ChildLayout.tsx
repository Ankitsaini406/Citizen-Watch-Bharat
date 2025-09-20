"use client";

import React from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TopLoadingBar from "@/components/TopLoadingBar";
import { LoadingProvider } from "@/context/LoadingContext";
import TailwindIndicator from "@/lib/TailwindIndicator";
import { usePathname } from "next/navigation";

export default function ChildLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isBioPage = pathname === '/bio'
    return (
        <LoadingProvider>
            <TopLoadingBar />
            {!isBioPage && <Header />}
            {children}
            <TailwindIndicator />
            {!isBioPage && <Footer />}
        </LoadingProvider>
    )
}