"use client";

import React from "react";
import { useSession } from "next-auth/react";
import {
    LogOut,
    User,
    Shield,
    CreditCard,
    Settings,
    ChevronRight,
} from "lucide-react";
import Image from "next/image";

// Type definitions
type SessionUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

type SessionData = {
    user?: SessionUser;
    expires?: string;
};

type SectionCardProps = {
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
};

// Components
const Avatar = ({
                    name,
                    image,
                }: {
    name?: string | null;
    image?: string | null;
}) => {
    if (image) {
        return (
            <div className="relative">
                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                        height={100}
                        width={100}
                        src={image}
                        alt={name || "User"}
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {name?.[0] ?? "U"}
            </div>
        </div>
    );
};

const ProfileHeader = ({ session }: { session: SessionData | null }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="relative">
                <Avatar name={session?.user?.name} image={session?.user?.image} />
            </div>

            <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    {session?.user?.name ?? "Samuel Wilson"}
                </h1>
                <p className="text-gray-500 text-lg">
                    {session?.user?.email ?? "wilson@example.com"}
                </p>
            </div>

            <div className="relative">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

const SectionCard = ({ icon: Icon, title, children }: SectionCardProps) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 p-6 border-b border-gray-100">
                <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="text-gray-900">{value}</span>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "enabled":
            case "verified":
            case "yes":
            case "premium member":
                return "bg-green-100 text-green-800";
            case "activated":
            case "subscribed":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
            {status}
        </span>
    );
};

export default function ProfilePage() {
    const { data: session } = useSession();

    // Mock data matching the screenshot structure
    const personalDetails = [
        { label: "Full Name", value: "Samuel Wilson" },
        { label: "Date of Birth", value: "January 1, 1987" },
        { label: "Gender", value: "Male" },
        { label: "Nationality", value: "American" },
        { label: "Address", value: "California - United States" },
        { label: "Phone Number", value: "(213) 555-1234" },
        { label: "Email", value: "wilson@example.com" },
    ];

    const securitySettings = [
        { label: "Password Last Changed", value: "July 15, 2024" },
        { label: "Two-Factor Authentication", value: "Enabled" },
        { label: "Security Questions Set", value: "Yes" },
        { label: "Login Notifications", value: "Enabled" },
        { label: "Connected Devices", value: "3 Devices" },
        { label: "Recent Account Activity", value: "No Suspicious Activity Detected" },
    ];

    const accountDetails = [
        { label: "Display Name", value: "s_wilson_168920" },
        { label: "Account Created", value: "March 20, 2020" },
        { label: "Last Login", value: "August 22, 2024" },
        { label: "Membership Status", value: "Premium Member" },
        { label: "Account Verification", value: "Verified" },
        { label: "Language Preference", value: "English" },
        { label: "Time Zone", value: "GMT-5 (Eastern Time)" },
    ];

    const preferences = [
        { label: "Email Notifications", value: "Subscribed" },
        { label: "SMS Alerts", value: "Enabled" },
        { label: "Content Preferences", value: "Technology, Design, Innovation" },
        { label: "Default Dashboard View", value: "Compact Mode" },
        { label: "Dark Mode", value: "Activated" },
        { label: "Language for Content", value: "English" },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <ProfileHeader session={session} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                    {/* Personal Details */}
                    <SectionCard icon={User} title="Personal Details">
                        <div className="space-y-1">
                            {personalDetails.map((detail, index) => (
                                <DetailRow key={index} label={detail.label} value={detail.value} />
                            ))}
                        </div>
                    </SectionCard>

                    {/* Security Settings */}
                    <SectionCard icon={Shield} title="Security Settings">
                        <div className="space-y-1">
                            {securitySettings.map((setting, index) => (
                                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                                    <span className="text-gray-600 font-medium">{setting.label}</span>
                                    <StatusBadge status={setting.value} />
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Account Details */}
                    <SectionCard icon={CreditCard} title="Account Details">
                        <div className="space-y-1">
                            {accountDetails.map((detail, index) => (
                                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                                    <span className="text-gray-600 font-medium">{detail.label}</span>
                                    {detail.label.includes("Status") || detail.label.includes("Verification") ? (
                                        <StatusBadge status={detail.value} />
                                    ) : (
                                        <span className="text-gray-900">{detail.value}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* Preferences */}
                    <SectionCard icon={Settings} title="Preferences">
                        <div className="space-y-1">
                            {preferences.map((preference, index) => (
                                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                                    <span className="text-gray-600 font-medium">{preference.label}</span>
                                    {preference.label.includes("Notifications") ||
                                    preference.label.includes("Alerts") ||
                                    preference.label.includes("Mode") ? (
                                        <StatusBadge status={preference.value} />
                                    ) : (
                                        <span className="text-gray-900">{preference.value}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <span className="font-medium text-gray-700">Edit Profile</span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <span className="font-medium text-gray-700">Security Settings</span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <span className="font-medium text-gray-700">Privacy Controls</span>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                </div>
            </div>
        </div>
    );
}