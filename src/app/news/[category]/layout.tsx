"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { TopBanner, LeftBanner, RightBanner, BottomBanner } from "@/components/AddBanners";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Determine which banner to show based on current path
    const bannerPlace = useMemo(() => {
        if (pathname.startsWith("/news/national/")) {
            return "Par-News";
        } else if (pathname.startsWith("/news/")) {
            return "News-Section";
        } else {
            return "Home";
        }
    }, [pathname]);


    return (
        <main className="relative bg-background pb-10">
            {/* Full width Top Banner */}
            <div className="">
                <TopBanner place={bannerPlace} />
            </div>

            <div className="flex flex-col xl:flex-row gap-6 mt-6">
                {/* Sticky Left */}
                <div className={`self-start hidden xl:block sticky top-20 2xl:top-12 h-[36rem] 2xl:h-[50rem]`}>
                    <LeftBanner place={bannerPlace} />
                </div>

                {/* Main Content */}
                <section className={`flex-1 min-w-[300px] max-w-6xl w-full mx-auto`}>{children}</section>

                {/* Sticky Right */}
                <div className={`self-start hidden xl:block sticky top-20 2xl:top-12 h-[36rem] 2xl:h-[50rem]`}>
                    <RightBanner place={bannerPlace} />
                </div>
            </div>

            {/* Bottom Banner */}
            <div className="mt-8">
                <BottomBanner place={bannerPlace} />
            </div>
        </main>
    );
}
