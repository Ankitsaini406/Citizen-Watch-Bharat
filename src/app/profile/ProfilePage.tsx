"use client";

import { toast } from "sonner";
import { UserData } from "@/types/type";
import { baseApiUrl } from "@/utils/ApiUtils";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangePasswordDialog, EditProfileDialog } from "@/app/profile/ProfileCompoent";
import { LogOut, User, Settings, Mail, Phone, MapPin, Award, Share2, Bookmark, Building } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { accessToken, logout } = useAuthStore();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                // ✅ Get token from Zustand or localStorage
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    toast.error("User not authenticated");
                    return;
                }
                // ✅ Call NestJS API with Authorization header
                const res = await fetch(`${baseApiUrl}user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    toast.error("Failed to fetch user profile");
                    return;
                }
                const data: UserData = await res.json();
                setUser(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    toast.error(err.message);
                } else {
                    toast.error("An unexpected error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            if (!accessToken) {
                toast.error("Not logged in");
                return;
            }

            // 🔥 1. Call NestJS logout endpoint
            const res = await fetch(`${baseApiUrl}auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                throw new Error(errData?.message || "Logout failed");
            }

            // 🔥 2. Clear Zustand + localStorage
            logout(); // this clears Zustand state
            localStorage.removeItem("accessToken");

            // 🔥 3. Optional: redirect user
            toast.success("Logged out successfully");
            router.push("/auth/login");

        } catch (err: unknown) {
            if (err instanceof Error) toast.error(err.message);
            else toast.error("Failed to log out");
        }
    };

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                <Card>
                    <CardContent className="py-12">
                        <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
                        <p className="text-muted-foreground mb-4">Unable to load user profile</p>
                        <button onClick={() => window.location.reload()}>
                            Try Again
                        </button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="px-8 py-8 space-y-8">
            {/* Enhanced Profile Header */}
            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200 to-transparent opacity-50 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200 to-transparent opacity-50 rounded-full -ml-12 -mb-12" />

                <CardContent className="relative p-8">
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <div className="relative">
                            <Avatar className="h-28 w-28 border-4 border-white shadow-2xl">
                                <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                                <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                    {user.name?.[0]?.toUpperCase() ?? "U"}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="flex-1 text-center lg:text-left">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-3">
                                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                                    {user.name}
                                </h1>
                            </div>
                            <p className="text-lg text-muted-foreground mb-2 flex items-center justify-center lg:justify-start gap-2">
                                <Mail className="h-4 w-4" />
                                {user.email}
                            </p>
                            {user.department && (
                                <p className="text-muted-foreground flex items-center justify-center lg:justify-start gap-2">
                                    <Building className="h-4 w-4" />
                                    {user.department}
                                </p>
                            )}
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 shadow-md hover:from-red-600 hover:to-red-700"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={Award}
                    label="Total Points"
                    value={user.totalPoints?.toString() || "0"}
                    subtitle="From sharing activities"
                    gradient="from-amber-500 to-orange-500"
                />
                <StatCard
                    icon={Share2}
                    label="News Shared"
                    value={user.sharedNews?.length?.toString() || "0"}
                    subtitle="Across platforms"
                    gradient="from-green-500 to-emerald-600"
                />
                <StatCard
                    icon={Bookmark}
                    label="Bookmarks"
                    value={user.bookmarks?.length?.toString() || "0"}
                    subtitle="Saved articles"
                    gradient="from-purple-500 to-pink-600"
                />
            </div>

                {/* Left Column - Personal & Account Details */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Details */}
                        <DetailCard
                            icon={User}
                            title="Personal Details"
                            items={[
                                { icon: User, label: "Full Name", value: user.name },
                                { icon: Mail, label: "Email", value: user.email },
                                { icon: Phone, label: "Phone", value: user.phonenumber || "Not provided" },
                                { icon: MapPin, label: "Address", value: user.address || "Not provided" },
                            ]}
                        />

                        {/* Quick Actions */}
                        <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-white">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Settings className="h-5 w-5 text-primary" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <EditProfileDialog user={user} onSave={(updated) => setUser(updated)} />
                                <ChangePasswordDialog />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
    );
}

// Supporting Components
function ProfileSkeleton() {
    return (
        <div className="px-8 py-8 space-y-8">
            {/* Header Skeleton */}
            <Card className="p-8">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                    <Skeleton className="h-28 w-28 rounded-full" />
                    <div className="flex-1 space-y-3 text-center lg:text-left">
                        <Skeleton className="h-8 w-64 mx-auto lg:mx-0" />
                        <Skeleton className="h-6 w-48 mx-auto lg:mx-0" />
                        <Skeleton className="h-4 w-32 mx-auto lg:mx-0" />
                    </div>
                    <Skeleton className="h-10 w-24" />
                </div>
            </Card>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-32 rounded-xl" />
                ))}
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {[...Array(2)].map((_, i) => (
                            <Skeleton key={i} className="h-64 rounded-xl" />
                        ))}
                    </div>
                    <Skeleton className="h-48 rounded-xl" />
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-48 rounded-xl" />
                    <Skeleton className="h-40 rounded-xl" />
                </div>
            </div>
        </div>
    );
}

function StatCard({
                      icon: Icon,
                      label,
                      value,
                      subtitle,
                      gradient
                  }: {
    icon: React.ElementType;
    label: string;
    value: string;
    subtitle: string;
    gradient: string;
}) {
    return (
        <Card className="relative overflow-hidden border-0 shadow-lg group hover:shadow-xl transition-all duration-300">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
                        <p className="text-3xl font-bold">{value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-to-br ${gradient} text-white`}>
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function DetailCard({
                        icon: Icon,
                        title,
                        items
                    }: {
    icon: React.ElementType;
    title: string;
    items: Array<{ icon?: React.ElementType; label: string; value: string; type?: "text" | "link" }>;
}) {
    return (
        <Card className="shadow-lg border-0 h-full">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-5 w-5 text-primary" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                                {item.icon && <item.icon className="h-4 w-4 text-muted-foreground" />}
                                <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                            </div>
                            <div className="text-right max-w-[60%]">
                                {item.type === "link" ? (
                                    <a
                                        href={item.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 text-sm truncate block"
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    <span className="text-sm font-medium truncate block">{item.value}</span>
                                )}
                            </div>
                        </div>
                        {index < items.length - 1 && <Separator className="mt-4" />}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}