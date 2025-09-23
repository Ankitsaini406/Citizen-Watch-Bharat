
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/utils/Utils";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Directly destructure the fields from the request body
        const {
            name,
            email,
            password,
            role,
            phonenumber,
            address,
        } = body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        // Hash the password securely
        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                id: crypto.randomUUID(),
                name,
                email,
                password: hashedPassword,
                role,
                phonenumber,
                address,
                updatedAt: new Date(),
            },
        });

        // Create response object without password
        const userResponse = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            phonenumber: newUser.phonenumber,
            address: newUser.address,
            joindate: newUser.createdAt,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        };

        return NextResponse.json(
            { message: "User created successfully", user: userResponse },
            { status: 201 }
        );
    } catch (error) {
        console.error('[CREATE_USER_ERROR]', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}