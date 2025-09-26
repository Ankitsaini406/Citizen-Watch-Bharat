// app/shared/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SharedPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const awardPoints = async () => {
            const newsId = searchParams.get("newsId");
            const platform = searchParams.get("platform");
            const redirectUrl = searchParams.get("redirect") || "/";

            if (!newsId || !platform) {
                router.replace("/");
                return;
            }

            try {
                await fetch("/api/users/award-points", {
                    method: "POST",
                    body: JSON.stringify({ newsId, platform }),
                    headers: { "Content-Type": "application/json" },
                });
            } catch (err) {
                console.error("Error awarding points:", err);
            } finally {
                // Always redirect user to the actual news
                router.replace(redirectUrl);
            }
        };

        awardPoints();
    }, [searchParams, router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-gray-500">Redirecting...</p>
        </div>
    );
}
