
import Image from "next/image"

export default function Page() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
            <Image
                src="/cwb-header.png"
                alt="Citizen Watch Bharat Logo"
                className="w-48 mb-8 drop-shadow-lg"
                height={200}
                width={300}
            />
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 flex flex-col items-center max-w-md w-full">
                <h2 className="text-xl md:text-2xl font-bold italic mb-2 text-center">Thank you for your interest in joining our team!</h2>
                <p className="text-gray-700 mb-6 text-center">
                    While we don’t have any open positions right now, we encourage you to check back later for updates on future career opportunities or follow us on Social Media for future updates.
                </p>
            </div>
        </div>
    )
}