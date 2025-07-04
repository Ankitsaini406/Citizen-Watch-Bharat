
export type Category = {
    id: string;
    name: string;
    slug: string;
};

export type News = {
    slug: string;
    title: string;
    category?: { slug: string };
};
