import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

// 1. Configure larger size limit (50MB)
export const config = {
    api: {
        bodyParser: false, // Required for file uploads
        sizeLimit: '50mb', // Set to 50MB
    },
};

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const file = data.get("file") as File;
        const folder = data.get("folder")?.toString() || "default";

        // 2. Validate file exists
        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { success: false, error: "No valid file uploaded" },
                { status: 400 }
            );
        }

        // 3. Validate file size (client-side validation should prevent this)
        const MAX_SIZE = 50 * 1024 * 1024; // 50MB
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { success: false, error: "File exceeds 50MB limit" },
                { status: 413 }
            );
        }

        // 4. Create unique filename to prevent collisions
        const timestamp = Date.now();
        const ext = path.extname(file.name);
        const baseName = path.basename(file.name, ext);
        const uniqueFileName = `${baseName}-${timestamp}${ext}`;

        // 5. Set up file paths
        const basePath = "/var/www/html/images/cwb";
        const folderPath = path.join(basePath, folder);
        const filePath = path.join(folderPath, uniqueFileName);

        // 6. Create directory if it doesn't exist
        await mkdir(folderPath, { recursive: true });

        // 7. Save file
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);

        // 8. Return success response
        return NextResponse.json({
            success: true,
            url: `https://citizenwatchbharat.com/images/cwb/${folder}/${uniqueFileName}`,
            size: file.size,
            type: file.type,
            name: uniqueFileName
        });

    } catch (err) {
        console.error("❌ Upload failed:", err);
        return NextResponse.json(
            { success: false, error: "Upload failed. Please try again." },
            { status: 500 }
        );
    }
}