import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const news = await prisma.news.findUnique({
            where: {
                slug: slug,
                isDeleted: false,
                isPublish: true,
            },
            select: {
                id: true,
                title: true,
                subtitle: true,
                city: true,
                state: true,
                subCategoryId: true,
                pngImage: true,
                facebook_link: true,
                twitter_link: true,
                instagram_link: true,
                heroImage: true,
                tags: true,
                createdAt: true,
                content: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        intro: true,
                        description: true,
                        instagram_link: true,
                        facebook_link: true,
                        linkedin_link: true,
                        twitter_link: true,
                    },
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
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
                title: true,
                views: true,
            },
        });

        return NextResponse.json({
            success: true,
            data: {
                news: news,
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