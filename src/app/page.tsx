
import {LeftBanner, RightBanner, TopBanner} from "@/components/AddBanners";
import { BrakingNews } from "@/components/NewsComponents";
import CategoryNewsList from "@/components/Home/CategoryNewsList";

export default async function Home() {

  return (
    <main className="relative pb-10">
            {/* Top Full Width Banner */}
            <TopBanner place="Home" />
            <BrakingNews />
            {/* Left + Right below banner but sticky on scroll */}
            <div className="flex justify-between w-full">
                {/* Left */}
                <div className="self-start hidden 2xl:block sticky top-12 h-[36rem] 2xl:h-[50rem]">
                    <LeftBanner place="Home" />
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <CategoryNewsList />
                </div>

                {/* Right */}
                <div className="self-start hidden 2xl:block sticky top-12 h-[36rem] 2xl:h-[50rem]">
                    <RightBanner place="Home" />
                </div>
            </div>
    </main>
  )
}