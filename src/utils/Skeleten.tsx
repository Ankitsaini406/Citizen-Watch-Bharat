
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

export function NewsSkeleton() {
    return (
        <article className="max-w-3xl mx-auto mt-8 mb-16 overflow-hidden animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6" />
            <div className="relative w-full h-80 sm:h-[400px] bg-gray-300 rounded mb-6" />
            <div className="p-6 lg:px-0">
                {/* Category and Date */}
                <div className="flex flex-wrap justify-between gap-4 mb-2 text-sm">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="flex gap-5">
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                        <div className="h-4 w-28 bg-gray-200 rounded" />
                    </div>
                </div>
                {/* Main Content */}
                <div className="space-y-3 mb-8">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded-full" />
                    <div className="h-6 w-12 bg-gray-200 rounded-full" />
                </div>
                {/* Author and Social */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="h-6 w-32 bg-gray-200 rounded" />
                    <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-200 rounded" />
                        <div className="h-6 w-20 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        </article>
    );
}

export function SkeletonSocialNewsBox() {
    return (
        <div className="container mx-auto py-5 px-1 xl:px-0">
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-1">
                {[...Array(30)].map((_, idx) => (
                    <div key={idx}>
                        <div className="bg-white overflow-hidden h-32 md:h-48 lg:h-64 border-b border-gray-300 animate-pulse">
                            <div className="relative h-48 bg-gray-200"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
