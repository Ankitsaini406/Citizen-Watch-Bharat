import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const PAGE_SIZE = 15;

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const skip = (page - 1) * PAGE_SIZE;

        // Get total count for pagination
        const [category, total] = await Promise.all([
            prisma.category.findUnique({
                where: { slug },
            }),
            prisma.news.count({
                where: {
                    category: { slug },
                    isPublish: true,
                    isDeleted: false,
                },
            }),
        ]);

        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        const news = await prisma.news.findMany({
            where: {
                category: { slug },
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
        console.error('Error fetching category news:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch category news' }, { status: 500 });
    }
} 