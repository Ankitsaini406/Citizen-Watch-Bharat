import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const position = searchParams.get('position');
        const page = searchParams.get('page') || 'Home';

        if (!position) {
            return NextResponse.json(
                { error: 'Position parameter is required' },
                { status: 400 }
            );
        }

        const advertisements = await prisma.advertisement.findMany({
            where: {
                position: position,
                page: page,
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(advertisements);
    } catch (error) {
        console.error('Error fetching advertisements:', error);
        return NextResponse.json(
            { error: 'Failed to fetch advertisements' },
            { status: 500 }
        );
    }
} 