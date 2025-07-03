import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const PAGE_SIZE = 15;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const skip = (page - 1) * PAGE_SIZE;

        const [total, news] = await Promise.all([
            prisma.news.count({
                where: {
                    isDeleted: false,
                    isPublish: true,
                },
            }),
            prisma.news.findMany({
                where: {
                    isDeleted: false,
                    isPublish: true,
                },
                select: {
                    id: true,
                    title: true,
                    subtitle: true,
                    slug: true,
                    content: true,
                    tags: true,
                    state: true,
                    city: true,
                    views: true,
                    heroImage: true,
                    createdAt: true,
                    updatedAt: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            role: true,
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
                orderBy: { createdAt: 'desc' },
                skip,
                take: PAGE_SIZE,
            })
        ]);

        const totalPages = Math.ceil(total / PAGE_SIZE);

        return NextResponse.json({
            success: true,
            data: news,
            pagination: {
                total,
                page,
                pageSize: PAGE_SIZE,
                totalPages,
            },
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch news' }, { status: 500 });
    }
}
