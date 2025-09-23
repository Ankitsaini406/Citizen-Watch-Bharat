import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { comparePassword } from "@/utils/Utils";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
    session: { strategy: "jwt" },
    providers: [
        // Credentials Provider
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user && user.password && (await comparePassword(credentials.password, user.password))) {
                    // Return only necessary fields
                    return { id: user.id, email: user.email, name: user.name, role: user.role };
                }
                return null;
            },
        }),

        // Google OAuth
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
                session.user.role = token.role as string;
            }
            return session;
        },
    },

    pages: {
        signIn: `${process.env.NEXTAUTH_URL}/auth/login`,
        signOut: `${process.env.NEXTAUTH_URL}/auth/signup`,
    },
    secret: process.env.AUTH_SECRET,
};

export default authOptions;
