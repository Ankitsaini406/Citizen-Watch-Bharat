
import { JwtPayload } from "jsonwebtoken";

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

export interface CategoryMetadata {
    title: string;
    description: string;
    keywords: string[];
    path: string;
}

export interface CommonMetadata {
    siteName: string;
    images: {
        default: string;
        sizes: {
            width: number;
            height: number;
        };
    };
    twitterHandle: string;
    locale: string;
    type: string;
}

export interface CategoryMetadata {
    title: string;
    description: string;
    keywords: string[];
    path: string;
}

export interface MetadataConfig {
    [key: string]: CategoryMetadata;
}

export interface DecodeToken extends JwtPayload {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
}

export type BookMarks = {
    id: string;
    userId: string;
    newsId: string;
}

export type SharedNews = {
    id: string;
    userId: string;
    newsId: string;
    pointsEarned: number;
    sharedAt: string;
    platform: string;
}

export type PointsHistory = {
    id: string;
    userId: string;
    points: string;
    type: string;
    description: string;
    referenceId: string;
}

export type UserData = {
    id: string;
    name: string;
    email: string;
    phonenumber?: string;
    address?: string;
    image?: string;
    role: string;
    isDelete: boolean;
    status?: string;
    lastLogin?: string;
    createdAt: string;
    updatedAt: string;
    manager?: { name: string } | null;
    isActive: boolean;
    department?: string;
    description?: string;
    intro?: string;
    facebook_link?: string;
    instagram_link?: string;
    linkedin_link?: string;
    twitter_link?: string;
    totalPoints: number;
    bookmarks: BookMarks[];
    sharedNews: SharedNews[];
    pointsHistory: PointsHistory[];
};
