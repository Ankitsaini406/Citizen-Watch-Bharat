"use client";

import React, { useState } from "react";
import { AccentButton } from "@/components/ui/Buttons";
import {toast} from "@/components/ui/Toast";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        toast.success("Login successful");
        toast.error("Login successful");
        toast.info("Login successful");

        // try {
        //     const res = await fetch("/api/auth/login", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ email, password }),
        //     });
        //
        //     if (!res.ok) throw new Error("Invalid credentials");
        //
        //     window.location.href = "/";
        // } catch (err: any) {
        //     setError(err.message);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="relative min-h-screen flex flex-col md:flex-row">
            {/* Liquid Glass Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-tr from-blue-200/50 to-purple-200/40 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-pink-200/40 to-yellow-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Left Side: Info & Logo */}
            <div className="md:w-1/2 flex flex-col items-center justify-center bg-gray-50 p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Citizen Watch Bharat</h1>
                    <p className="text-gray-700 max-w-sm mx-auto">
                        Stay updated with the latest breaking news, in-depth articles, and
                        exclusive stories from around the world. Your trusted source for
                        accurate journalism.
                    </p>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
                {/* Glass Card */}
                <div className="relative w-full max-w-md rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-8">
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
                        Welcome Back 👋
                    </h1>
                    <p className="text-gray-600 text-center mb-6">
                        Log in to access your account and read the latest news.
                    </p>

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-100 border border-red-200 px-3 py-2 text-sm text-red-600 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute top-3 left-3 w-5 h-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 12H8m8 0a4 4 0 10-8 0 4 4 0 008 0zm2 0a6 6 0 11-12 0 6 6 0 0112 0z"
                                />
                            </svg>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl bg-white/50 border border-gray-200 pl-10 pr-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none backdrop-blur-sm"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute top-3 left-3 w-5 h-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 15v2m-6-2v2m12-2v2m-9-8a3 3 0 116 0v4H9v-4z"
                                />
                            </svg>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl bg-white/50 border border-gray-200 pl-10 pr-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none backdrop-blur-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <AccentButton
                            type="submit"
                            title={loading ? "Logging in..." : "Login"}
                            className="w-full !rounded-xl !py-3 text-lg tracking-wide"
                            disabled={loading}
                        />
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>
                            Don’t have an account?{" "}
                            <a href="/auth/signup" className="text-blue-600 hover:underline">
                                Sign up
                            </a>
                        </p>
                        <p className="mt-2">
                            Forgot password?{" "}
                            <a href="/auth/reset" className="text-blue-600 hover:underline">
                                Reset here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
