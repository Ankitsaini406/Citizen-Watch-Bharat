import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Points constant — adjust if needed
const SHARE_POINTS = 10;

export async function POST(req: Request) {
    try {

        const { platform, newsId, userId } = await req.json();
        console.log(`This is perameter : `, platform, newsId, userId);
        if (!newsId || !platform) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Check if user already shared today (prevent spamming same news multiple times per day)
        const alreadyShared = await prisma.sharedNews.findFirst({
            where: { userId, newsId, platform },
            orderBy: { sharedAt: "desc" },
        });

        if (alreadyShared) {
            return NextResponse.json({
                message: "Already rewarded for this share",
            });
        }

        // Create SharedNews record
        const sharedNews = await prisma.sharedNews.create({
            data: {
                userId,
                newsId,
                platform,
                pointsEarned: SHARE_POINTS,
            },
        });

        // Update user's total points
        const user = await prisma.user.update({
            where: { id: userId },
            data: { totalPoints: { increment: SHARE_POINTS } },
        });

        // Create PointsHistory record
        await prisma.pointsHistory.create({
            data: {
                userId,
                points: SHARE_POINTS,
                type: "news_share",
                description: `Shared news on ${platform}`,
                referenceId: sharedNews.id,
            },
        });

        return NextResponse.json({
            success: true,
            newPoints: user.totalPoints,
        });
    } catch (error) {
        console.error("Error awarding points:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
