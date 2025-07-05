// src/app/page.tsx

import { TopBanner } from "@/components/AddBanners";
import { BrakingNews } from "@/components/NewsComponents";
import CategoryNewsList from "@/components/Home/CategoryNewsList";
import { getCategoriesWithNews } from "@/data/dummyData";

export default async function Home() {
  const categoriesWithNews = getCategoriesWithNews();
  
  // Extract categories and news for the existing component structure
  const categories = categoriesWithNews.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug
  }));
  
  const news = categoriesWithNews.flatMap(cat => cat.news);

  return (
    <div className="container mx-auto pb-10">
      <TopBanner />
      <BrakingNews />
      {/* <LeftBanner /> */}
        <CategoryNewsList categories={categories} news={news} />
      {/* <RightBanner /> */}
    </div>
  )
}