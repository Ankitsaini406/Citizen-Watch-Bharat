import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Select only the fields you want to expose
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
            },
            orderBy: { name: 'asc' },
        });
        return NextResponse.json({ success: true, data: categories }, { status: 200 });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 });
    }
}