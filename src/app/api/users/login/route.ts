
import { prisma } from "@/lib/prisma";
import { createToken, comparePassword } from "@/utils/Utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const { email, password } = await req.json();

        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Compare password with hashed password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Update lastLogin and lastActive fields
        await prisma.user.update({
            where: { id: user.id },
            data: {
                lastLogin: new Date(),
                isActive: true
            }
        });

        const token = createToken({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });

        const response = NextResponse.json({ token });
        response.cookies.set("userToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24, // 1 days
            path: "/",
        });

        return response;

    } catch (err) {
        console.error('[LOGIN_ERROR]', err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
