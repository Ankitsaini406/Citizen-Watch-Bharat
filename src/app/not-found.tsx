import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist or has been moved. Return to the homepage for the latest civic journalism and news from India.',
    keywords: [
        '404 error',
        'page not found',
        'Citizen Watch Bharat',
        'civic journalism',
        'Indian news'
    ],
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Page Not Found | Citizen Watch Bharat',
        description: 'The page you are looking for does not exist. Return to our homepage for the latest civic journalism and news from India.',
        url: 'https://citizenwatchbharat.com/not-found',
        siteName: 'Citizen Watch Bharat',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Citizen Watch Bharat - Page Not Found',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/not-found',
    },
    other: {
        'error-type': '404 Not Found',
        'response-status': '404'
    }
};

export default function NotFound() {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <Image
            src="/cwb-header.png"
            alt="Citizen Watch Bharat Logo"
            className="mx-auto mb-6 drop-shadow-lg"
            height={80}
            width={240}
            priority
          />
          <h1 className="text-6xl md:text-9xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-md w-full mb-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          <p className="text-gray-600 text-center mb-6">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
      </div>
  );
}