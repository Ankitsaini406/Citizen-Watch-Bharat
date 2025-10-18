"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";

export function useAuthInit() {
    const { accessToken, setAuthToken } = useAuthStore();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        // ✅ If token exists in localStorage but not in Zustand, restore it
        if (token && !accessToken) {
            setAuthToken(token);
        }
    }, [accessToken, setAuthToken]);
}
