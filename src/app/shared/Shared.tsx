"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import {baseApiUrl} from "@/utils/ApiUtils";
import { useAuthStore } from "@/store/AuthStore";

export default function SharedPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { accessToken } = useAuthStore();

    useEffect(() => {
        const awardPoints = async () => {
            const newsId = searchParams.get("newsId");
            const userId = searchParams.get("userId");
            const platform = searchParams.get("platform");
            const redirectUrl = searchParams.get("redirect") || "/";

            if (!newsId || !platform) {
                router.replace("/");
                return;
            }

            try {
                await fetch(`${baseApiUrl}user/award-points`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ userId, newsId, platform }),
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
