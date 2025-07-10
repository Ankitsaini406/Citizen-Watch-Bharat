import { Advertisement } from "@/types/type";


export async function fetchAdvertisements(position: string, page: string = 'home'): Promise<Advertisement[]> {
    try {
        const response = await fetch(`/api/advertisements?position=${position}&page=${page}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch advertisements');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching advertisements:', error);
        return [];
    }
} 
