import type { Metadata } from "next";
import "./globals.css";
import { Tiro_Devanagari_Hindi, Hind } from "next/font/google";
import ChildLayout from "./ChildLayout";
import QueryProvider from "@/lib/queryClient";
import GoogleTagManagerAndAnalytics from "./GoolgeAnalytics";

const hinduTitleFont = Tiro_Devanagari_Hindi({
  variable: "--font-hindu-title",
  weight: ["400"],
  subsets: ["devanagari", "latin"],
  display: "swap",
});

const hinduBodyFont = Hind({
  variable: "--font-hindu-body",
  weight: ["400", "500", "600", "700"],
  subsets: ["devanagari", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Citizen Watch Bharat",
  description: "Citizen Watch Bharat – A trusted source for unbiased news across India.",
  keywords: [
    "Citizen Watch Bharat",
    "Indian News",
    "Hindi News",
    "Breaking News",
    "Political News",
    "National News",
    "Bharat News",
  ],
  authors: [{ name: "Citizen Watch Bharat", url: "https://citizenwatchbharat.com" }],
  metadataBase: new URL("https://citizenwatchbharat.com"),
  openGraph: {
    title: "Citizen Watch Bharat",
    description: "Trusted source for real-time news across India – powered by citizen journalism.",
    url: "https://citizenwatchbharat.com",
    siteName: "Citizen Watch Bharat",
    // images: [
    //   {
    //     url: "/og-image.jpg", // Replace with your actual OG image path
    //     width: 1200,
    //     height: 630,
    //     alt: "Citizen Watch Bharat – News that matters",
    //   },
    // ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Citizen Watch Bharat",
    description: "Stay updated with the latest unbiased news across India.",
    site: "https://citizenwatchbharat.com", // Replace with your actual handle
    creator: "https://x.com/cwbofficials", // Replace with your actual handle
    // images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hinduTitleFont.variable} ${hinduBodyFont.variable} antialiased flex flex-col min-h-screen`}
      >
        <GoogleTagManagerAndAnalytics />
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
