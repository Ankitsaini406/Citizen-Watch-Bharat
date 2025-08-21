"use client";

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

const GoogleTagManagerAndAnalytics = () => {
    const [isProduction, setIsProduction] = useState(false);

    useEffect(() => {
        // Check if we're in production - this runs only on client
        setIsProduction(process.env.NODE_ENV === "production");
    }, []);

    useEffect(() => {
        if (!isProduction) return;

        const loadOnInteraction = () => {
            // Remove event listeners after first interaction
            window.removeEventListener('scroll', loadOnInteraction);
            window.removeEventListener('mousemove', loadOnInteraction);
            window.removeEventListener('touchstart', loadOnInteraction);

            // Initialize dataLayer if it doesn't exist
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            
            // Load GA script
            const gaScript = document.createElement('script');
            gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-6HS1L2H40M';
            gaScript.async = true;
            
            // GA configuration
            const gaConfigScript = document.createElement('script');
            gaConfigScript.innerHTML = `
                window.gtag = window.gtag || function() {
                    window.dataLayer.push(arguments);
                };
                gtag('js', new Date());
                gtag('config', 'G-6HS1L2H40M', {
                    page_path: window.location.pathname,
                });
            `;

            document.head.appendChild(gaScript);
            document.head.appendChild(gaConfigScript);
        };

        // Load on user interaction
        window.addEventListener('scroll', loadOnInteraction, { passive: true, once: true });
        window.addEventListener('mousemove', loadOnInteraction, { once: true });
        window.addEventListener('touchstart', loadOnInteraction, { once: true });

        // Fallback: load after 4 seconds if no interaction
        const fallbackTimer = setTimeout(loadOnInteraction, 4000);

        return () => {
            clearTimeout(fallbackTimer);
            window.removeEventListener('scroll', loadOnInteraction);
            window.removeEventListener('mousemove', loadOnInteraction);
            window.removeEventListener('touchstart', loadOnInteraction);
        };
    }, [isProduction]);

    return isProduction ? (
        <>
            {/* Preconnect for better performance when scripts load */}
            <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
            
            {/* Minimal initial script for critical tracking */}
            <Script id="gtm-data-layer" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    window.gtag = window.gtag || function() {
                        window.dataLayer.push(arguments);
                    };
                `}
            </Script>
        </>
    ) : null;
};

export default GoogleTagManagerAndAnalytics;