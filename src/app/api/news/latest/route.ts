import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const news = await prisma.news.findMany({
            where: {
                isDeleted: false,
                isPublish: true,
            },
            select: {
                id: true,
                title: true,
                slug: true,
                createdAt: true,
                state: true,
                category: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
            },
            take: 7,
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ success: true, data: news }, { status: 200 });
    } catch (error) {
        console.error('Error fetching latest news:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch latest news' }, { status: 500 });
    }
} 