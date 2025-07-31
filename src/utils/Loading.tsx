import React from "react";


export function SkeletonLatest() {
    return (
        <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-[5px] top-0 w-0.5 h-full bg-gray-200"></div>

            {[...Array(8)].map((_, idx) => (
                <div
                    key={idx}
                    className="pb-3 last:mb-0 mt-3 border-b border-gray-100 relative group transition-all duration-200"
                >
                    {/* Timeline Dot Skeleton */}
                    <div
                        className={`absolute -left-[20px] top-0 w-3 h-3 rounded-full border-2 ${idx === 0
                            ? 'bg-gray-300 border-gray-400'
                            : 'bg-gray-100 border-gray-200'
                            } animate-pulse`}
                    ></div>

                    {/* Timeline Line Animation - only between items */}
                    {idx !== 7 && (
                        <div className="absolute -left-[14.6px] top-3 w-0.5 h-full bg-gray-200"></div>
                    )}

                    {/* Meta info skeleton */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-16 h-3 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>

                    {/* Title skeleton */}
                    <div className="mb-1">
                        <div className="w-full h-5 bg-gray-200 rounded-full animate-pulse mb-1"></div>
                        <div className="w-4/5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

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

export function SkeletonNewsBox() {
    return (
        <div className="mb-1 p-0 md:p-4 xl:p-0 pt-0 pl-0">
            {/* Category Header Skeleton */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 w-full">
                    <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1 border-t-2 border-gray-200"></div>
                </div>
            </div>

            {/* News Cards Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="md:col-span-2 md:row-span-2">
                    <div className="bg-white overflow-hidden h-full border border-gray-300 md:min-h-96 animate-pulse">
                        <div className="relative h-80 lg:h-full bg-gray-200">
                        </div>
                    </div>
                </div>

                {[...Array(2)].map((_, idx) => (
                    <div key={idx}>
                        <div className="bg-white overflow-hidden h-full border-b border-gray-300 animate-pulse">
                            <div className="relative h-48 bg-gray-200"></div>
                            <div className="pt-4">
                                <div className="h-5 bg-gray-200 rounded-full mb-4 w-full"></div>
                                <div className="h-5 bg-gray-200 rounded-full mb-4 w-4/5"></div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Small Cards without Images (6 items) */}
                {[...Array(6)].map((_, idx) => (
                    <div key={idx + 2}>
                        <div className="bg-white overflow-hidden h-full border-b border-gray-300 animate-pulse">
                            <div className="pt-4">
                                <div className="h-5 bg-gray-200 rounded-full mb-4 w-full"></div>
                                <div className="h-5 bg-gray-200 rounded-full mb-4 w-3/4"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};