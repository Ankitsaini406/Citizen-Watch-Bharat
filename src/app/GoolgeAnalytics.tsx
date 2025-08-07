"use client";
import React, { useEffect } from 'react';

const GoogleTagManagerAndAnalytics = () => {
    const isProduction = process.env.NODE_ENV === "production";

    useEffect(() => {
        if (!isProduction) return;

        const loadWithDelay = () => {
            // GTM Script
            const gtmScript = document.createElement('script');
            gtmScript.innerHTML = `
                (function(w,d,s,l,i){
                    w[l]=w[l]||[];
                    w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true;
                    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','G-6DZ6QW4ZLQ');
            `;
            
            // GA Script
            const gaScript = document.createElement('script');
            gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-6HS1L2H40M';
            gaScript.async = true;
            
            const gaConfigScript = document.createElement('script');
            gaConfigScript.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-6HS1L2H40M', {
                    page_path: window.location.pathname,
                });
            `;

            // Append all scripts after 2 seconds
            setTimeout(() => {
                document.head.appendChild(gtmScript);
                document.head.appendChild(gaScript);
                document.head.appendChild(gaConfigScript);
            }, 2000);
        };

        loadWithDelay();

        // Cleanup function
        return () => {
            // Remove any script elements if component unmounts
            const scripts = document.querySelectorAll(
                'script[src*="googletagmanager.com"], script#google-analytics'
            );
            scripts.forEach(script => script.remove());
        };
    }, [isProduction]);

    return isProduction ? (
        <>
            {/* GTM NoScript - Important for tracking users without JS */}
            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=G-6DZ6QW4ZLQ`}
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                />
            </noscript>
        </>
    ) : null;
};

export default GoogleTagManagerAndAnalytics;