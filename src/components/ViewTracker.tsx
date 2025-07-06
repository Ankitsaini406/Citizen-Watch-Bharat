"use client";

import { useEffect } from 'react';

interface ViewTrackerProps {
    slug: string;
    onViewTracked?: (views: number) => void;
}

export default function ViewTracker({ slug, onViewTracked }: ViewTrackerProps) {
    useEffect(() => {
        const trackView = async () => {
            try {
                // Check if user has already viewed this article
                const viewedArticles = JSON.parse(localStorage.getItem('viewedArticles') || '[]');
                
                // If user hasn't viewed this article before, track the view
                if (!viewedArticles.includes(slug)) {
                    const response = await fetch(`/api/news/${slug}`);
                    const data = await response.json();
                    
                    if (data.success) {
                        // Add this article to viewed list
                        viewedArticles.push(slug);
                        localStorage.setItem('viewedArticles', JSON.stringify(viewedArticles));
                        
                        if (onViewTracked) {
                            onViewTracked(data.data.views);
                        }
                    }
                } else {
                    // User has already viewed this article, just get current view count
                    const response = await fetch(`/api/news/${slug}/views`);
                    const data = await response.json();
                    
                    if (data.success && onViewTracked) {
                        onViewTracked(data.data.views);
                    }
                }
            } catch (error) {
                console.error('Error tracking view:', error);
            }
        };

        trackView();
    }, [slug, onViewTracked]);

    return null;
} 