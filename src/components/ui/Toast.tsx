"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
    duration?: number;
    visible?: boolean;
}

let toastId = 0;
let addToastHandler: ((toast: Omit<Toast, "id">) => void) | null = null;

export const toast = {
    success: (message: string, duration?: number) =>
        addToastHandler?.({ message, type: "success", duration }),
    error: (message: string, duration?: number) =>
        addToastHandler?.({ message, type: "error", duration }),
    info: (message: string, duration?: number) =>
        addToastHandler?.({ message, type: "info", duration }),
};

export const ToastContainer = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        addToastHandler = ({ message, type, duration }) => {
            const id = ++toastId;
            const newToast: Toast = { id, message, type, duration, visible: false };

            setToasts((prev) => {
                const newStack = [...prev, newToast];
                // Keep maximum 3 toasts
                if (newStack.length > 3) newStack.shift();
                return newStack;
            });

            // Fade-in
            setTimeout(() => {
                setToasts((prev) =>
                    prev.map((t) => (t.id === id ? { ...t, visible: true } : t))
                );
            }, 50);

            // Auto-remove
            if (duration !== 0) {
                setTimeout(() => closeToast(id), duration ?? 5000);
            }
        };

        return () => {
            addToastHandler = null;
        };
    }, []);

    const closeToast = (id: number) => {
        // Fade-out
        setToasts((prev) =>
            prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
        );

        // Remove from DOM after animation
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 500);
    };

    return (
        <div className="fixed top-5 right-5 flex flex-col gap-3 z-[9999]">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`
            flex items-center justify-between px-5 py-3 rounded-xl font-medium shadow-lg
            transform transition-all duration-500
            ${t.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}
            ${t.type === "success" ? "bg-green-300/90 text-green-900 shadow-green-200" : ""}
            ${t.type === "error" ? "bg-red-300/90 text-red-900 shadow-red-200" : ""}
            ${t.type === "info" ? "bg-blue-300/90 text-blue-900 shadow-blue-200" : ""}
          `}
                    style={{
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        minWidth: "280px",
                        maxWidth: "350px",
                    }}
                >
                    <span className="flex-1">{t.message}</span>
                    <button
                        onClick={() => closeToast(t.id)}
                        className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
};
