import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;
        
        // Get the news article and increment view count
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

        // Increment view count
        const updatedNews = await prisma.news.update({
            where: { id: news.id },
            data: { views: { increment: 1 } },
            select: {
                id: true,
                title: true,
                views: true,
            },
        });

        return NextResponse.json({
            success: true,
            data: {
                id: updatedNews.id,
                title: updatedNews.title,
                views: updatedNews.views,
            },
        });
    } catch (error) {
        console.error('Error tracking news view:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to track view' },
            { status: 500 }
        );
    }
} 