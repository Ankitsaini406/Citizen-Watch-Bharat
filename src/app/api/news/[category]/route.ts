import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: Promise<{ category: string }> }) {
    try {
        const { searchParams } = new URL(request.url)
        const excludeSlug = searchParams.get('exclude')
        const page = parseInt(searchParams.get('page') || '1', 10)
        const pageSize = 6 

        const { category } = await params;

        const categoryExists = await prisma.category.findUnique({
            where: { slug: category },
            select: { id: true } // Only fetch what we need for validation
        })

        if (!categoryExists) {
            return NextResponse.json(
                { success: false, message: 'Category not found' },
                { status: 404 }
            )
        }

        const [news, total] = await Promise.all([
            prisma.news.findMany({
                where: {
                    category: { slug: category },
                    isDeleted: false,
                    isPublish: true,
                    ...(excludeSlug ? { slug: { not: excludeSlug } } : {})
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * pageSize,
                take: pageSize,
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    subtitle: true,
                    heroImage: true,
                    createdAt: true,
                    city: true,
                    state: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true
                        }
                    },
                    author: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            }),
            prisma.news.count({
                where: {
                    category: { slug: category },
                    isDeleted: false,
                    isPublish: true,
                    ...(excludeSlug ? { slug: { not: excludeSlug } } : {})
                }
            })
        ])

        return NextResponse.json({
            success: true,
            data: news,
            pagination: {
                total,
                page,
                pageSize,
                hasMore: page * pageSize < total
            }
        })

    } catch (error) {
        console.error('Error fetching category news:', error)
        return NextResponse.json(
            { 
                success: false, 
                message: 'Failed to fetch category news',
                error: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        )
    }
}