import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    userId: string | null;
    isAuthenticated: boolean;
    setAuthData: (token: string, userId: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            userId: null,
            isAuthenticated: false,

            // ✅ Set both token and userId
            setAuthData: (token, userId) =>
                set({
                    accessToken: token,
                    userId,
                    isAuthenticated: true,
                }),

            // ✅ Clear all on logout
            logout: () =>
                set({
                    accessToken: null,
                    userId: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: "auth-storage", // localStorage key
        }
    )
);
