import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import {prisma} from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const { email } = await req.json();
    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        // Always respond with success to prevent email enumeration
        return NextResponse.json({ success: true });
    }

    // Generate a secure token
    const token = randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 1000 * 60 * 30);

    await prisma.user.update({
        where: { email },
        data: {
            passwordResetToken: token,
            passwordResetTokenExpiry: expiry,
        },
    });

    // TODO: Send email with link: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`

    return NextResponse.json({ success: true });
} 