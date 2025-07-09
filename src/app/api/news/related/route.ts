import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const tags = searchParams.get("tags")?.split(",") || [];
    const exclude = searchParams.get("exclude");

    if (tags.length === 0) {
        return NextResponse.json({ success: false, message: "No tags provided" }, { status: 400 });
    }

    try {
        const news = await prisma.news.findMany({
            where: {
                tags: { hasSome: tags },
                ...(exclude ? { slug: { not: exclude } } : {}),
            },
            orderBy: { createdAt: "desc" },
            take: 6,
            include: { category: true, author: true },
        });

        return NextResponse.json({ success: true, data: news });
    } catch (error) {
        return NextResponse.json({ success: false, message: `Error fetching related news ${error}` }, { status: 500 });
    }
}