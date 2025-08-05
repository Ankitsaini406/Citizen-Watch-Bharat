/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";

export default function FacebookAnalytics() {

    // const FACEBOOK_ID = process.env.FACEBOOK_ID;

    useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
            console.log("Facebook Pixel is disabled in development mode.");
            return;
        }

        // Initialize Facebook Pixel
        (function (f: Window & { fbq?: (...args: unknown[]) => void }, b, e, v, n, t: HTMLScriptElement | null, s: HTMLScriptElement | null) {
            if (typeof f.fbq !== "undefined") return;
            n = f.fbq = function (...args: unknown[]) {
                (f.fbq as ((...args: unknown[]) => void) & { queue: unknown[], version?: string, loaded?: boolean }).queue.push(args);
            };
            (f.fbq as ((...args: unknown[]) => void) & { queue: unknown[], version?: string, loaded?: boolean }).queue = (f.fbq as ((...args: unknown[]) => void) & { queue: unknown[], version?: string, loaded?: boolean }).queue || [];
            (f.fbq as ((...args: unknown[]) => void) & { queue: unknown[], version?: string, loaded?: boolean }).loaded = true;
            (f.fbq as ((...args: unknown[]) => void) & { queue: unknown[], version?: string, loaded?: boolean }).version = "2.0";
            t = b.createElement(e) as HTMLScriptElement;
            t.async = true;
            t.src = v;
            s = b.getElementsByTagName(e)[0] as HTMLScriptElement;
            if (s?.parentNode) {
                s.parentNode.insertBefore(t, s);
            }
        })(
            window,
            document,
            "script",
            "https://connect.facebook.net/en_US/fbevents.js",
            window.fbq,
            null,
            null
        );

        // Replace with your Pixel ID
        if (window.fbq) {
            window.fbq("init", `1309941770565568`);
            window.fbq("track", "PageView");
        }
    }, []);

    return (
        <>
            {/* Fallback noscript for browsers with JavaScript disabled */}
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    alt="Facebook Pixel"
                    src={`https://www.facebook.com/tr?id=1309941770565568&ev=PageView&noscript=1`}
                />
            </noscript>
        </>
    );
};

