
export function TopBanner() {
    return (
        <div className="my-10 px-10 xl:px-0">
            <div className="flex justify-center items-center w-full bg-gradient-to-l from-gray-500 to-gray-400 h-60 md:h-40 lg:h-60">
                <h1 className="text-3xl text-background">
                    Advertisement
                </h1>
            </div>
        </div>
    )
}

export function LeftBanner() {
    return (
        <div className="hidden xl:block fixed left-0 top-96">
            <div className="flex justify-center items-center w-40 bg-gradient-to-l from-gray-500 to-gray-400 h-80">
                <h1 className="text-3xl text-background">
                    ADD
                </h1>
            </div>
        </div>
    )
}

export function RightBanner() {
    return (
        <div className="hidden xl:block fixed right-0 top-96">
            <div className="flex justify-center items-center w-40 bg-gradient-to-l from-gray-500 to-gray-400 h-80">
                <h1 className="text-3xl text-background">
                    ADD
                </h1>
            </div>
        </div>
    )
}