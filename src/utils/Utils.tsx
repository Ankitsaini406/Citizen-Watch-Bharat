import React from "react";

export function extractFirstImage(input: string | string[]): string {
    let firstImage = "";

    if (Array.isArray(input) && input.length > 0) {
        const first = input[0];

        if (typeof first === "string" && first.trim().startsWith("[")) {
            try {
                const parsed = JSON.parse(first);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    firstImage = parsed[0];
                }
            } catch (e) {
                console.warn("Failed to parse nested JSON image array:", e);
                firstImage = first;
            }
        } else if (typeof first === "string") {
            firstImage = first;
        }
    } else if (typeof input === "string") {
        firstImage = input;
    }

    return firstImage;
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

export interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-400 bg-gray-100 text-gray-700 disabled:opacity-50"
            >
                Previous
            </button>
            <span>
                Page {page} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-400 bg-gray-100 text-gray-700 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};