import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
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
                <h2 className="text-xl md:text-2xl font-bold text-yellow-600 mb-2">This Page is Under Construction</h2>
                <p className="text-gray-700 mb-6 text-center">
                    We are working hard to bring you this page soon. Please check back later!
                </p>
                <Link
                    href="/"
                    className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded transition"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}