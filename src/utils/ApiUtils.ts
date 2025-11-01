import { Advertisement, Category, NewsArticle } from "@/types/type";

export const baseApiUrl = process.env.NODE_ENV === "production" ? process.env.HOST_API_URL : process.env.LOCAL_API_URL;

export async function fetchAdvertisements(position: string, page: string = 'home'): Promise<Advertisement[]> {
    try {
        const response = await fetch(`${baseApiUrl}advertisements?position=${position}&page=${page}`, { next: { revalidate: 1 } });

        if (!response.ok) {
            console.error(`This is error : ` , !response.ok);
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
            `${baseApiUrl}news/all`,
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
        const response = await fetch(`${baseApiUrl}news?isBreaking=true&limit=10`, {
            next: { revalidate: 1 },
        });
        if (!response.ok) throw new Error('Failed to fetch breaking news');

        const json = await response.json();

        // API returns data in 'data', not 'news'
        const news: NewsArticle[] = json.data ?? [];

        // Optional: filter again client-side if needed
        return news.filter((n) => n.isBreaking);
    } catch (error) {
        console.error('Error fetching breaking news:', error);
        return [];
    }
}

export async function fetchLatestNews(): Promise<NewsArticle[]> {

    try {
        const response = await fetch(`${baseApiUrl}news/latest?isPublish=true`, { next: { revalidate: 1 } });
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
