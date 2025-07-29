import { Advertisement, Category, NewsArticle } from "@/types/type";

export const baseUrl = process.env.NODE_ENV === "production" ? process.env.HOST_URL : process.env.LOCAL_URL;

export async function fetchAdvertisements(position: string, page: string = 'home'): Promise<Advertisement[]> {
    try {
        const response = await fetch(`${baseUrl}api/advertisements?position=${position}&page=${page}`, { next: { revalidate: 1 } });

        if (!response.ok) {
            throw new Error('Failed to fetch advertisements');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching advertisements:', error);
        return [];
    }
}

export async function fetchAllCategoriesAndNews(): Promise<{ categories: Category[]; news: NewsArticle[] }> {
    try {
        const response = await fetch(
            `${baseUrl}api/news/all`,
            { next: { revalidate: 1 } }
        );
        if (!response.ok) {
            throw new Error('Failed to fetch categories and news');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories and news:', error);
        return { categories: [], news: [] };
    }
}

export async function fetchBreakingNews(): Promise<NewsArticle[]> {

    try {
        const response = await fetch(`${baseUrl}api/news/all`, { next: { revalidate: 1 } });
        if (!response.ok) throw new Error('Failed to fetch breaking news');
        const { news } = await response.json();
        return news.filter((n: NewsArticle) => n.isBreaking);
    } catch (error) {
        console.error('Error fetching breaking news:', error);
        return [];
    }
}

export async function fetchLatestNews(): Promise<NewsArticle[]> {

    try {
        const response = await fetch(`${baseUrl}api/news/latest`, { next: { revalidate: 1 } });
        if (!response.ok) throw new Error('Failed to fetch latest news');
        const news = await response.json();
        return news.data.sort((a: NewsArticle, b: NewsArticle) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    } catch (error) {
        console.error('Error fetching latest news:', error);
        return [];
    }
}

export async function fetchNewsByState(stateSlug: string, page = 1): Promise<{ data: NewsArticle[]; pagination: { total: number; page: number; totalPages: number } }> {
    try {
        const response = await fetch(`${baseUrl}api/news/state/${stateSlug}?page=${page}`, { next: { revalidate: 1 } });
        if (!response.ok) throw new Error('Failed to fetch state news');
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching state news:', error);
        return { data: [], pagination: { total: 0, page: 1, totalPages: 0 } };
    }
}

export async function fetchNewsBySportsSlug(slug: string, page: number = 1) {
    try {
        const res = await fetch(`/api/news/sports/${slug}?page=${page}`, { next: { revalidate: 1 } });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to fetch sports news');
        }
        return await res.json();
    } catch (error) {
        console.error("Error in fetchNewsBySportsSlug:", error);
        throw error;
    }
} 
