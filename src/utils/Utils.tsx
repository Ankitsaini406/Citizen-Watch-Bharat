
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined");
}

export function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

export function slugToName(slug: string) {
    return slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function timeAgo(dateString: string | Date): string {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
}

// Password hashing utilities
export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};