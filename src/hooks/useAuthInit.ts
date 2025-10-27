"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";
import {getCookie} from "@/utils/Utils";

export function useAuthInit() {
    const { accessToken, setAuthData } = useAuthStore();

    useEffect(() => {
        const token = getCookie("refreshToken");
        const user = localStorage.getItem("user");
        const parsedUser = user ? JSON.parse(user) as { id?: string } : null;

        // ✅ If token exists in localStorage but not in Zustand, restore it
        if (token && !accessToken) {
            setAuthData(token, parsedUser?.id ?? "");
        }
    }, [accessToken, setAuthData]);
}
