import type { Metadata } from "next";
import "./globals.css";
import ChildLayout from "./ChildLayout";
import QueryProvider from "@/lib/queryClient";
import GoogleTagManagerClient from "./GoolgeAnalytics";

export const metadata: Metadata = {
  title: {
    default: 'Citizen Watch Bharat | Ethical Civic Journalism in India',
    template: '%s | Citizen Watch Bharat'
  },
  description: 'Citizen Watch Bharat (CWB) – India’s civic-first journalism platform delivering verified news, accountability reports & grassroots stories for citizens.',
  keywords: [
    'Citizen Watch Bharat',
    'Indian News',
    'Hindi News',
    'Breaking News',
    'Political News',
    'National News',
    'Bharat News',
  ],
  metadataBase: new URL('https://citizenwatchbharat.com'),
  applicationName: 'Citizen Watch Bharat',
  authors: [{ name: 'Citizen Watch Bharat', url: 'https://citizenwatchbharat.com' }],
  publisher: 'Citizen Watch Bharat',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Citizen Watch Bharat',
    description: 'Trusted source for real-time news across India – powered by citizen journalism.',
    url: '/',
    siteName: 'Citizen Watch Bharat',
    images: [
      {
        url: '/cover.webp',
        width: 1200,
        height: 630,
        alt: 'Citizen Watch Bharat Team',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Citizen Watch Bharat',
    description: 'Stay updated with the latest unbiased news across India.',
    creator: '@cwbofficials',
    images: ['/cover.webp'], // Relative to metadataBase
  },
  alternates: {
    canonical: 'https://citizenwatchbharat.com',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
          <GoogleTagManagerClient />
        </head>
      <body
        className={`antialiased flex flex-col min-h-screen`}
      >
        <QueryProvider>
          <ChildLayout>
            <main className="min-h-screen">
              {children}
            </main>
          </ChildLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
