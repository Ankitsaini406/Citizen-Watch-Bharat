import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <Image
                src="/cwb-header.png"
                alt="Citizen Watch Bharat Logo"
                className="w-48 mb-8 drop-shadow-lg"
                height={200}
                width={300}
            />
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md w-full">
                <h2 className="text-3xl font-bold text-red-600 mb-2">404 - Page Not Found</h2>
                <p className="text-gray-700 mb-6 text-center">
                    Oops! The page you are looking for does not exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}