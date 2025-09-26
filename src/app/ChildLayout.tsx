"use client";

import React from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TopLoadingBar from "@/components/TopLoadingBar";
import { LoadingProvider } from "@/context/LoadingContext";
import TailwindIndicator from "@/lib/TailwindIndicator";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

export default function ChildLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const hiddenPaths = ["/bio", "/auth/login", "/auth/signup"];
    const shouldHideLayout = hiddenPaths.includes(pathname);
    return (
        <SessionProvider>
            <LoadingProvider>
                <Toaster closeButton richColors position="top-right" />
                <TopLoadingBar />
                {!shouldHideLayout && <Header />}
                {children}
                <TailwindIndicator />
                {!shouldHideLayout && <Footer />}
            </LoadingProvider>
        </SessionProvider>
    )
}