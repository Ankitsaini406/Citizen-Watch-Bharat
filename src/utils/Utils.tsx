
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