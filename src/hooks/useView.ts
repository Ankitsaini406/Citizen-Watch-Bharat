import { useRef, useEffect, useState } from 'react';

export const useInView = (options?: IntersectionObserverInit & { triggerOnce?: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                if (options?.triggerOnce) {
                    setHasTriggered(true);
                }
            } else if (!options?.triggerOnce) {
                setInView(false);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef && !(options?.triggerOnce && hasTriggered)) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options, hasTriggered]);

    return [ref, inView] as const;
};