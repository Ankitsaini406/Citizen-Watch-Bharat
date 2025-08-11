import { Metadata } from "next";
import { indianStatesBySlug } from "@/data/indianStates";
import StateNewsPage from "./StatePage";

type Props = {
    params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props ): Promise<Metadata> {
    const { category } = await params;
    const state = indianStatesBySlug[category];

    return {
        title: `${state.name} News`,
        description: state.description,
        keywords: state.keywords,
        openGraph: {
            title: `${state.name} News`,
            description: state.description,
            url: `https://citizenwatchbharat.com/news/national/${state.slug}`,
            images: [
                {
                    url: 'https://citizenwatchbharat.com/cover.webp',
                    width: 1200,
                    height: 630,
                    alt: `Citizen Watch Bharat ${state.slug} News Coverage`,
                },
            ],
        },
        alternates: {
            canonical: `https://citizenwatchbharat.com/news/national/${state.slug}`,
        }
    };
}

export default function Page() {
    return <StateNewsPage />
}