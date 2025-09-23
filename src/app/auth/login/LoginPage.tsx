"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "@/components/ui/Toast";
import { Mail, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Invalid credentials");
                toast.error(data.error || "Invalid credentials");
                return;
            }

            toast.success("Login successful 🎉");
            router.push("/");
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Try again.");
            toast.error("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 overflow-hidden">
            {/* Animated gradient blobs */}
            <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-full blur-3xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200 rounded-full blur-3xl opacity-70 animate-pulse"></div>

            {/* Floating animated smaller blobs */}
            <div className="absolute top-1/3 left-10 w-40 h-40 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-2xl opacity-60 animate-bounce"></div>
            <div className="absolute bottom-1/4 right-20 w-32 h-32 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full blur-2xl opacity-60 animate-ping"></div>

            {/* Subtle animated diagonal lines */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(120deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:40px_40px] animate-[move-lines_10s_linear_infinite]"></div>
            </div>

            {/* Card */}
            <div className="relative w-full max-w-4xl backdrop-blur-2xl bg-white/60 shadow-2xl rounded-3xl overflow-hidden border border-white/30">
                <div className="grid lg:grid-cols-2">
                    {/* Left Side (branding) */}
                    <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
                        <h1 className="text-5xl font-extrabold tracking-tight">
                            Citizen Watch Bharat
                        </h1>
                        <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                            Stay ahead with real-time, curated news updates.
                        </p>
                        <ul className="mt-10 space-y-5 text-gray-200 text-base">
                            <li className="flex items-center gap-3">
                                <span className="text-lg">⚡</span> Real-time breaking news alerts
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-lg">🎯</span> Personalized content curation
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-lg">📱</span> Cross-platform accessibility
                            </li>
                        </ul>
                    </div>

                    {/* Right Side (form) */}
                    <div className="p-10 flex flex-col justify-center">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-900">
                                Welcome Back 👋
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Log in to continue reading the latest updates.
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-black/70 focus:outline-none transition backdrop-blur-md"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-black/70 focus:outline-none transition backdrop-blur-md"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition disabled:opacity-50 shadow-lg"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center gap-4">
                            <div className="flex-1 border-t border-gray-300" />
                            <span className="text-gray-500 text-sm">OR</span>
                            <div className="flex-1 border-t border-gray-300" />
                        </div>

                        {/* Google Button */}
                        <button
                            onClick={() => signIn("google")}
                            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition backdrop-blur-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="mt-8 text-center text-gray-600 text-sm space-y-2">
                            <p>
                                Don&apos;t have an account?{" "}
                                <Link href="/auth/signup" className="text-black font-semibold hover:underline">
                                    Sign up
                                </Link>
                            </p>
                            {/*<p>*/}
                            {/*    Forgot password?{" "}*/}
                            {/*    <Link href="/auth/reset" className="text-black font-semibold hover:underline">*/}
                            {/*        Reset here*/}
                            {/*    </Link>*/}
                            {/*</p>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}