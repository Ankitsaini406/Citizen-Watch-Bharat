
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