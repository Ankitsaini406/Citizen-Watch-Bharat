import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subCategories: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        news: {
          where: { isPublish: true, isDeleted: false },
          orderBy: { createdAt: 'desc' },
          select: {
            title: true,
            slug: true,
            heroImage: true,
            subtitle: true,
            createdAt: true,
            isBreaking: true,
            state: true,
            city: true,
            subCategory: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              }
            }
          }
        },
      },
      orderBy: { name: 'asc' },
    });

    // Optionally flatten all news for easier consumption
    const news = categories.flatMap((cat: { news: typeof categories[number]['news'] }) => cat.news);

    return NextResponse.json({ categories, news });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch data ${error}` }, { status: 500 });
  }
} 