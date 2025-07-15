import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        if (!slug || typeof slug !== "string") {
            return Response.json({ error: "Invalid or missing slug parameter." }, { status: 400 });
        }

        const { searchParams } = new URL(request.url);
        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
        const pageSize = Math.min(50, parseInt(searchParams.get("pageSize") || "10", 10)); // Max 50 per page
        const skip = (page - 1) * pageSize;

        // Fetch news articles and total count in parallel
        const [data, total] = await Promise.all([
            prisma.news.findMany({
                where: {
                    category: { slug: "sports" },
                    subCategory: { slug },
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: pageSize,
            }),
            prisma.news.count({
                where: {
                    category: { slug: "sports" },
                    subCategory: { slug },
                },
            }),
        ]);

        return Response.json({
            data,
            pagination: {
                total,
                page,
                totalPages: Math.ceil(total / pageSize),
                pageSize,
            },
        });
    } catch (error) {
        console.error("Error fetching sports news:", error);
        return Response.json({ error: "Internal server error." }, { status: 500 });
    }
} 