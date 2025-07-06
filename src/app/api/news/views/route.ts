import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50', 10);
        const category = searchParams.get('category'); // optional filter
        
        // Build where clause
        const whereClause: {
            isDeleted: boolean;
            isPublish: boolean;
            category?: { slug: string };
        } = {
            isDeleted: false,
            isPublish: true,
        };

        if (category) {
            whereClause.category = { slug: category };
        }

        // Get news with view counts, sorted by views (highest first)
        const newsWithViews = await prisma.news.findMany({
            where: whereClause,
            select: {
                id: true,
                title: true,
                slug: true,
                views: true,
                createdAt: true,
                category: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
                author: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: { views: 'desc' },
            take: limit,
        });

        return NextResponse.json({
            success: true,
            data: newsWithViews,
            total: newsWithViews.length,
        });
    } catch (error) {
        console.error('Error fetching news views:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch news views' },
            { status: 500 }
        );
    }
} 