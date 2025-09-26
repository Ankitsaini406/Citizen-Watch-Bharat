import type { Metadata } from "next";
import ProfilePage from "@/app/profile/ProfilePage";

// 🔹 Add SEO metadata for this page
export const metadata: Metadata = {
    title: "Profile",
    description:
        "Manage your Citizen Watch Bharat profile, update account details, and personalize your preferences.",
    keywords: [
        "User Profile",
        "Citizen Watch Bharat",
        "Account Settings",
        "Profile Management",
        "Watch Community",
    ],
    openGraph: {
        title: "Profile | Citizen Watch Bharat",
        description:
            "Access your Citizen Watch Bharat profile to manage your account and preferences.",
        url: "https://citizenwatchbharat.com/profile",
        siteName: "Citizen Watch Bharat",
        images: [
            {
                url: "https://citizenwatchbharat.com/cover.webp",
                width: 1200,
                height: 630,
                alt: "Citizen Watch Bharat - Profile",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Profile | Citizen Watch Bharat",
        description:
            "Manage your Citizen Watch Bharat profile and update account settings easily.",
        images: ["https://citizenwatchbharat.com/cover.webp"],
    },
    robots: {
        index: false, // ❌ Usually you don’t want user profile pages indexed by Google
        follow: true,
    },
    alternates: {
        canonical: "https://citizenwatchbharat.com/profile",
    },
};

export default function Page() {
    return <ProfilePage />;
}
