import React from "react";


export const LatestLoading = () => (
    <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-700"></div>
    </div>
);

export function SkeletonBox({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-gray-200 animate-pulse rounded ${className}`}></div>
    );
}

export function NewsSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div>
            {[...Array(count)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2 mb-6">
                    <SkeletonBox className="h-6 w-1/3 mb-2" />
                    <SkeletonBox className="h-4 w-2/3" />
                    <SkeletonBox className="h-4 w-1/2" />
                </div>
            ))}
        </div>
    );
}