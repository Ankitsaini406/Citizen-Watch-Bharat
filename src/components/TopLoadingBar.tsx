"use client";

import { useLoading } from '@/context/LoadingContext';
import { useEffect, useState } from 'react';

export default function TopLoadingBar() {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(false);
    const { isLoading } = useLoading();

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined = undefined;
        let hideTimer: NodeJS.Timeout | undefined = undefined;

        const incrementProgress = () => {
            setProgress((prev) => {
                // Smoothly increment progress up to 95%
                const nextProgress = prev + Math.random() * 10;
                return nextProgress > 95 ? 95 : nextProgress;
            });
        };

        if (isLoading) {
            setProgress(0);
            setShow(true);
            timer = setInterval(incrementProgress, 200);
        } else {
            // When loading completes
            clearInterval(timer);
            
            // Immediately jump to 100%
            setProgress(100);
            
            // Hide after short delay
            hideTimer = setTimeout(() => setShow(false), 300);
        }

        return () => {
            clearInterval(timer);
            clearTimeout(hideTimer);
        };
    }, [isLoading]);

    if (!show) return null;

    return (
        <div className="fixed top-0 left-0 w-full right-0 z-[70] h-1">
            <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}