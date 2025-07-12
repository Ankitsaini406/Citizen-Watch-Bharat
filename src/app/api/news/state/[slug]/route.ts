import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const PAGE_SIZE = 15;

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const skip = (page - 1) * PAGE_SIZE;

        // Get total count for pagination
        const total = await prisma.news.count({
            where: {
                OR: [
                    { state: { contains: slug, mode: 'insensitive' } },
                    { city: { contains: slug, mode: 'insensitive' } }
                ],
                isPublish: true,
                isDeleted: false,
            },
        });

        const news = await prisma.news.findMany({
            where: {
                OR: [
                    { state: { contains: slug, mode: 'insensitive' } },
                    { city: { contains: slug, mode: 'insensitive' } }
                ],
                isPublish: true,
                isDeleted: false,
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: PAGE_SIZE,
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
        });

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
        console.error('Error fetching state news:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch state news' }, { status: 500 });
    }
} 