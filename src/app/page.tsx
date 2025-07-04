// src/app/page.tsx

import { TopBanner } from "@/components/AddBanners";
import CategoryNewsList from "@/components/Home/CategoryNewsList";

async function getCategories() {
  const res = await fetch(`http://localhost:3007/api/news/category`, { cache: "no-store" });
  const data = await res.json();
  return data.data || [];
}

async function getNews() {
  const res = await fetch(`http://localhost:3007/api/news`, { cache: "no-store" });
  const data = await res.json();
  return data.data || [];
}

export default async function Home() {
  const categories = await getCategories();
  const news = await getNews();

  return (
    <div className="container mx-auto">
      <TopBanner />
      <CategoryNewsList categories={categories} news={news} />;
    </div>
  )
}