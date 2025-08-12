"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type LoadingContextType = {
    isLoading: boolean;
    startLoading: () => void;
    completeLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    const startLoading = () => {
        setIsLoading(true);
    };

    const completeLoading = () => {
        setIsLoading(false);
    };

    // Auto-complete loading when route changes
    useEffect(() => {
        completeLoading();
    }, [pathname]);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, completeLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}