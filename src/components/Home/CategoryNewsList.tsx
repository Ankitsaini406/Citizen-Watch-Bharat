
import NationalNewsBox from "./News-Sections/NationalNewsBox";
import InternationalNewsBox from "./News-Sections/InternationalNewsBox";
import PoliticalNewsBox from "./News-Sections/PoliticalNewsBox";
import BusinessNewsBox from "./News-Sections/BusinessNewsBox";
import SportsNewsBox from "./News-Sections/SportsNewsBox";
import EntertainmentNewsBox from "./News-Sections/EntertainmentNewsBox";
import ElectionsNewsBox from "./News-Sections/ElectionsNewsBox";
import WebStoriesNewsBox from "./News-Sections/WebStoriesNewsBox";
import { LatestNews } from "../NewsComponents";
import { ButtonSeeMore } from "@/utils/Buttons";
import { BottomBanner, MiddleBanner } from "../AddBanners";
import { fetchAllCategoriesAndNews } from "@/utils/ApiUtils";
import LifestyleNewsBox from "./News-Sections/LifestyleNewsBox";

const categoryPriority: Record<string, number> = {
    "National": 1,
    "International": 2,
    "Political": 3,
    "Business": 4,
    "Elections": 5,
    "Entertainment": 6,
    "Sports": 7,
    "Web-Stories": 8,
    "Lifestyle": 9,
};

export default async function CategoryNewsList() {
    const { categories, news } = await fetchAllCategoriesAndNews();

    const newsByCategory = categories
        .map((cat) => ({
            ...cat,
            news: news.filter((n) => n.category?.slug === cat.slug),
        }))
        .filter(cat => cat.news.length > 0)
        .sort((a, b) => {
            const pa = categoryPriority[a.name] ?? 999;
            const pb = categoryPriority[b.name] ?? 999;
            return pa - pb;
        });

    return (
        <div className="container mx-auto px-4 xl:px-0">
            {newsByCategory.map((cat) => {
                switch (cat.name) {
                    case "National":
                        return (
                            <div key={cat.name} className="my-5">
                                {/* Mobile Layout: Stack vertically */}
                                <div className="xl:hidden space-y-4">
                                    <NationalNewsBox key={cat.id} category={cat} />
                                    <ButtonSeeMore href={`/news/${cat.slug}`} title="National News" />
                                    <LatestNews />
                                </div>

                                {/* Desktop Layout: Grid with 70/30 split */}
                                <div className="hidden xl:grid xl:grid-cols-[70%_30%] gap-0 xl:gap-5">
                                    <NationalNewsBox key={cat.id} category={cat} />
                                    <LatestNews />
                                    <ButtonSeeMore href={`/news/${cat.slug}`} title="National News" />
                                </div>
                            </div>
                        );
                    case "International":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <InternationalNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="International News" />
                            </div>
                        );
                    case "Political":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <PoliticalNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="Political News" />
                                <MiddleBanner />
                            </div>
                        );
                    case "Business":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <BusinessNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="Business News" />
                            </div>
                        );
                    case "Elections":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <ElectionsNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="Elections News" />
                            </div>
                        );
                    case "Entertainment":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <EntertainmentNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="Entertainment News" />
                            </div>
                        );
                    case "Sports":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <SportsNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="Sports News" />
                                <BottomBanner />
                            </div>
                        );
                    case "Web-Stories":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <WebStoriesNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="Web-Stories News" />
                            </div>
                        );
                    case "Lifestyle":
                        return (
                            <div key={cat.name} className="my-10 flex flex-col gap-4">
                                <LifestyleNewsBox key={cat.id} category={cat} />
                                <ButtonSeeMore href={`/news/${cat.slug}`} title="Lifestyle News" />
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}