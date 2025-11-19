
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

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));

    // If older than 4 days → return actual date
    if (diffInDays > 4) {
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    // If within 4 days → show time ago
    if (diffInDays >= 1) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInSeconds / 3600);
    if (diffInHours >= 1) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes >= 1) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

    return "Just now";
}

// Password hashing utilities
export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};