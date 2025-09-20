"use client";

import { ReactNode } from "react";

interface TooltipProps {
    text: string;
    children: ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
    return (
        <div className="relative flex items-center group">
            {children}
            <span className="absolute bottom-full mb-2 hidden w-max max-w-xs rounded bg-gray-800 px-2 py-1 text-xs text-white text-center opacity-0 group-hover:block group-hover:opacity-100 transition-opacity">
                {text}
            </span>
        </div>
    );
}