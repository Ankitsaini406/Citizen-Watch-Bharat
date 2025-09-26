"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { UserData } from "@/types/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, User, CreditCard } from "lucide-react";
import {QuickAction} from "@/components/ui/Buttons";

export default function ProfilePage() {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/users/profile");
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
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut({ callbackUrl: "/auth/login" });
            toast.success("Logged out successfully");
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Failed to log out");
            }
        }
    };

    if (!user) {
        // skeleton loader
        return (
            <div className="max-w-6xl mx-auto px-4 py-12 space-y-6">
                <div className="flex items-center gap-6">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-5 w-1/4" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton className="h-40 w-full rounded-xl" />
                    <Skeleton className="h-40 w-full rounded-xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
            {/* Profile Header */}
            <Card className="p-6 flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-lg">
                    <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                    <AvatarFallback className="text-2xl">
                        {user.name?.[0] ?? "U"}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        {user.name}
                    </h1>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 shadow-md hover:from-red-600 hover:to-red-700"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <User className="h-5 w-5 text-primary" />
                            Personal Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <DetailRow label="Name" value={user.name} />
                        <Separator />
                        <DetailRow label="Phone" value={user.phonenumber ?? "N/A"} />
                        <Separator />
                        <DetailRow label="Address" value={user.address ?? "N/A"} />
                    </CardContent>
                </Card>

                {/* Account Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <CreditCard className="h-5 w-5 text-primary" />
                            Account Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <DetailRow label="Role" value={user.role} />
                        <Separator />
                        <DetailRow label="Total Points" value={user.totalPoints} />
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <QuickAction label="Edit Profile" onClick={() => console.log("Edit")} />
                    <QuickAction label="Security Settings" />
                    <QuickAction label="Privacy Controls" />
                </CardContent>
            </Card>
        </div>
    );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}