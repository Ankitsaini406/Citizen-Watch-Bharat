import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const breakingNews = await prisma.news.findMany({
        where: { isBreaking: true, isPublish: true, isDeleted: false },
        orderBy: { createdAt: "desc" },
        select: { slug: true, title: true },
        take: 10,
    });
    return NextResponse.json(breakingNews);
}