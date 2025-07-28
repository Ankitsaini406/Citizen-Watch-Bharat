import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate required fields
        if (!data.name || !data.email || !data.subject || !data.message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create submission in database using the correct model name
        const submission = await prisma.content.create({
            data: {
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message
            }
        });

        return NextResponse.json({
            message: 'Submission received successfully',
            submission,
            success: true
        });

    } catch (error) {
        console.error('Error saving contact submission:', error);
        return NextResponse.json(
            { 
                error: 'Internal server error',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}