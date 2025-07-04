import type { Metadata } from "next";
import "./globals.css";
import { Tiro_Devanagari_Hindi, Hind } from "next/font/google";
import ChildLayout from "./ChildLayout";

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
  description: "News Paper",
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
        <ChildLayout>
        {children}
        </ChildLayout>
      </body>
    </html>
  );
}
