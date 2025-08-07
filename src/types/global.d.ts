
interface Window {
    fbq: (...args: unknown[]) => void;
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
}