import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        
        // Get the news article view count without incrementing
        const news = await prisma.news.findUnique({
            where: {
                slug: slug,
                isDeleted: false,
                isPublish: true,
            },
            select: {
                id: true,
                title: true,
                views: true,
            },
        });

        if (!news) {
            return NextResponse.json(
                { success: false, error: 'News article not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                id: news.id,
                title: news.title,
                views: news.views,
            },
        });
    } catch (error) {
        console.error('Error fetching news view count:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch view count' },
            { status: 500 }
        );
    }
} 