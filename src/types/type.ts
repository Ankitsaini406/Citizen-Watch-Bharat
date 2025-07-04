
export type Category = {
    id: string;
    name: string;
    slug: string;
};

export type News = {
    id: string;
    title: string;
    category?: { slug: string };
};
