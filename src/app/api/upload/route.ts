import { writeFile, mkdir } from "fs/promises";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const file = data.get("file") as File;
        const folder = data.get("folder")?.toString() || "default";

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ success: false, error: "No valid file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // const ext = path.extname(file.name);
        const fileName = file.name;

        const basePath = "/var/www/html/images/cwb";
        const folderPath = path.join(basePath, folder);
        const filePath = path.join(folderPath, fileName);

        console.log("📁 Saving to:", filePath);

        await mkdir(folderPath, { recursive: true });

        console.log("📂 Folder exists:", fs.existsSync(folderPath)); // log this
        await writeFile(filePath, buffer);
        console.log("✅ File written:", fs.existsSync(filePath)); // log this

        return NextResponse.json({
            success: true,
            url: `https://citizenwatchbharat.com/images/cwb/${folder}/${fileName}`,
        });

    } catch (err) {
        console.error("❌ Upload failed:", err);
        return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
    }
}
