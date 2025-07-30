
export type Category = {
    id: string;
    name: string;
    slug: string;
    subCategories?: SubCategory[];
};

export type News = {
    slug: string;
    title: string;
    state: string;
    heroImage: string;
    category?: { slug: string };
};

export type SubCategory = {
    id: string;
    name: string;
    slug: string;
};

export interface LexicalNode {
    type: string;
    text?: string;
    format?: string | number;
    listType?: string;
    url?: string;
    children?: LexicalNode[];
    src?: string;
    alignment?: string;
    width?: number;
    height?: number;
    tag?: string;
}

export interface NewsArticle {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    tags: string[];
    category: {
        name: string;
        slug: string;
    };
    content: { root: { children: LexicalNode[] } };
    author: {
        name: string;
        twitter_link?: string;
        facebook_link?: string;
        instagram_link?: string;
        linkedin_link?: string;
    };
    views: number;
    twitter_link: string;
    facebook_link: string;
    instagram_link: string;
    createdAt: string;
    city: string;
    state: string;
    country?: string;
    heroImage: string;
    subCategoryId?: string;
    subCategory?: SubCategory;
    pngImage?: string;
    isBreaking: boolean;
}

export interface Advertisement {
    id: string;
    title: string;
    imageUrl: string;
    link: string;
    position: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    page: string;
}
