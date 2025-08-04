import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const PAGE_SIZE = 20; // Must match the hook's limit

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const skip = (page - 1) * PAGE_SIZE;

        // Get total count for pagination
        const total = await prisma.news.count({
            where: {
                isPublish: true,
                isDeleted: false,
            },
        });

        const news = await prisma.news.findMany({
            where: {
                isDeleted: false,
                isPublish: true,
            },
            select: {
                id: true,
                title: true,
                slug: true,
                heroImage: true,
                state: true,
                city: true,
                category: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
                createdAt: true, // Essential for sorting
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: PAGE_SIZE,
        });

        return NextResponse.json({
            success: true,
            data: news,
            pagination: {
                total,
                page,
                pageSize: PAGE_SIZE,
                hasMore: (page * PAGE_SIZE) < total,
            },
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching social news:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to fetch social news',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}