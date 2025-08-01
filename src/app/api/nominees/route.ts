// app/api/nominees/create/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the request body
        if (!body.name || !body.email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        const nominee = await prisma.nominees.create({
            data: {
                award: body.award,
                name: body.name,
                age: body.age,
                phoneNumber: body.phoneNumber,
                email: body.email,
                address: body.address,
                currentOccupation: body.currentOccupation,
                organizationName: body.organizationName,
                linkdin: body.linkdin,
                facebook: body.facebook,
                instagram: body.instagram,
                twitter: body.twitter,
                background: body.background,
                journey: body.journey,
                impactArea: body.impactArea,
                keyAchievements: body.keyAchievements,
                challengesOvercome: body.challengesOvercome,
                recognitionReason: body.recognitionReason,
                photos: body.photos,
                videos: body.videos,
                mediaCoverage: body.mediaCoverage,
            }
        });

        return NextResponse.json(nominee, { status: 201 });

    } catch (error) {
        console.error('Error creating nominee:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Optionally add other HTTP methods
export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    );
}