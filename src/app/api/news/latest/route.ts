import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const news = await prisma.news.findMany({
            where: {
                isDeleted: false,
                isPublish: true,
                createdAt: {
                    gte: twentyFourHoursAgo,
                },
            },
            select: {
                id: true,
                title: true,
                createdAt: true,
                category: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ success: true, data: news }, { status: 200 });
    } catch (error) {
        console.error('Error fetching latest news:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch latest news' }, { status: 500 });
    }
} 