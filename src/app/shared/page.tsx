// app/shared/page.tsx
import { Suspense } from "react";
import SharedPage from "@/app/shared/Shared";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SharedPage />
        </Suspense>
    );
}
