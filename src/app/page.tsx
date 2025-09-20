
import { LeftBanner, RightBanner, TopBanner } from "@/components/AddBanners";
import { BrakingNews } from "@/components/NewsComponents";
import CategoryNewsList from "@/components/Home/CategoryNewsList";

export default async function Home() {

  return (
    <div className=" pb-10">
      <TopBanner />
      <BrakingNews />
      <LeftBanner />
        <CategoryNewsList />
      <RightBanner />
    </div>
  )
}