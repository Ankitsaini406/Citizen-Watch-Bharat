import { Category, News } from "@/types/type";

// Dummy Categories
export const dummyCategories: Category[] = [
    {
        id: "cat-1",
        name: "National",
        slug: "national"
    },
    {
        id: "cat-2", 
        name: "International",
        slug: "international"
    },
    {
        id: "cat-3",
        name: "Political",
        slug: "political"
    },
    {
        id: "cat-4",
        name: "Business",
        slug: "business"
    },
    {
        id: "cat-5",
        name: "Sports",
        slug: "sports"
    },
    {
        id: "cat-6",
        name: "Entertainment",
        slug: "entertainment"
    },
    {
        id: "cat-7",
        name: "Elections",
        slug: "elections"
    },
    {
        id: "cat-8",
        name: "Web-Stories",
        slug: "web-stories"
    }
];

// Dummy News Items
export const dummyNews: News[] = [
    // National News
    {
        slug: "pm-modi-addresses-nation-on-independence-day",
        title: "PM Modi addresses nation on Independence Day, announces new development schemes",
        category: { slug: "national" }
    },
    {
        slug: "delhi-metro-expansion-phase-4",
        title: "Delhi Metro Phase 4 expansion work begins, 6 new corridors planned",
        category: { slug: "national" }
    },
    {
        slug: "mumbai-local-train-services-resume",
        title: "Mumbai local train services resume with full capacity after COVID restrictions",
        category: { slug: "national" }
    },
    {
        slug: "bangalore-tech-summit-2024",
        title: "Bangalore Tech Summit 2024: India's largest technology conference kicks off",
        category: { slug: "national" }
    },
    {
        slug: "chennai-water-crisis-solution",
        title: "Chennai water crisis: New desalination plant to provide relief to residents",
        category: { slug: "national" }
    },
    {
        slug: "kolkata-durga-puja-preparations",
        title: "Kolkata Durga Puja preparations in full swing, artisans working overtime",
        category: { slug: "national" }
    },
    {
        slug: "hyderabad-pharma-hub-development",
        title: "Hyderabad emerges as global pharma hub, attracts major investments",
        category: { slug: "national" }
    },
    {
        slug: "pune-education-reforms",
        title: "Pune education reforms: New digital learning initiatives for government schools",
        category: { slug: "national" }
    },
    {
        slug: "ahmedabad-textile-industry-boom",
        title: "Ahmedabad textile industry sees unprecedented boom, exports surge 40%",
        category: { slug: "national" }
    },
    {
        slug: "lucknow-culture-festival-2024",
        title: "Lucknow Culture Festival 2024 celebrates Awadhi heritage and traditions",
        category: { slug: "national" }
    },

    // International News
    {
        slug: "us-china-trade-talks-resume",
        title: "US-China trade talks resume in Washington, focus on economic cooperation",
        category: { slug: "international" }
    },
    {
        slug: "ukraine-russia-peace-talks",
        title: "Ukraine-Russia peace talks show progress, ceasefire agreement expected",
        category: { slug: "international" }
    },
    {
        slug: "climate-summit-paris-2024",
        title: "Global climate summit in Paris: World leaders commit to carbon neutrality",
        category: { slug: "international" }
    },
    {
        slug: "japan-tech-innovation-ai",
        title: "Japan leads AI innovation with new robotics breakthrough",
        category: { slug: "international" }
    },
    {
        slug: "australia-wildfire-recovery",
        title: "Australia wildfire recovery: Communities rebuild with sustainable practices",
        category: { slug: "international" }
    },
    {
        slug: "canada-immigration-policy-update",
        title: "Canada updates immigration policy to attract skilled workers",
        category: { slug: "international" }
    },
    {
        slug: "brazil-amazon-conservation",
        title: "Brazil launches massive Amazon conservation project",
        category: { slug: "international" }
    },
    {
        slug: "south-africa-economic-recovery",
        title: "South Africa shows strong economic recovery post-pandemic",
        category: { slug: "international" }
    },

    // Political News
    {
        slug: "parliament-winter-session-begins",
        title: "Parliament winter session begins with focus on economic bills",
        category: { slug: "political" }
    },
    {
        slug: "opposition-unity-meeting-delhi",
        title: "Opposition unity meeting in Delhi: Parties discuss 2024 strategy",
        category: { slug: "political" }
    },
    {
        slug: "bjp-national-executive-meeting",
        title: "BJP national executive meeting: Party sets agenda for upcoming elections",
        category: { slug: "political" }
    },
    {
        slug: "congress-campaign-rally-mumbai",
        title: "Congress campaign rally in Mumbai draws massive crowd",
        category: { slug: "political" }
    },
    {
        slug: "aap-delhi-government-achievements",
        title: "AAP Delhi government highlights achievements in education and healthcare",
        category: { slug: "political" }
    },
    {
        slug: "dmk-tamil-nadu-development",
        title: "DMK government in Tamil Nadu announces new development projects",
        category: { slug: "political" }
    },
    {
        slug: "trinamool-bengal-infrastructure",
        title: "Trinamool Congress focuses on Bengal infrastructure development",
        category: { slug: "political" }
    },
    {
        slug: "bjp-karnataka-campaign",
        title: "BJP Karnataka campaign gains momentum ahead of local elections",
        category: { slug: "political" }
    },

    // Business News
    {
        slug: "sensex-reaches-new-high",
        title: "Sensex reaches new all-time high, crosses 75,000 mark",
        category: { slug: "business" }
    },
    {
        slug: "reliance-jio-5g-expansion",
        title: "Reliance Jio announces nationwide 5G expansion plan",
        category: { slug: "business" }
    },
    {
        slug: "tata-motors-ev-launch",
        title: "Tata Motors launches new electric vehicle lineup",
        category: { slug: "business" }
    },
    {
        slug: "infosys-quarterly-results",
        title: "Infosys reports strong quarterly results, beats market expectations",
        category: { slug: "business" }
    },
    {
        slug: "hdfc-bank-digital-transformation",
        title: "HDFC Bank accelerates digital transformation with AI integration",
        category: { slug: "business" }
    },
    {
        slug: "startup-funding-india-2024",
        title: "Indian startup ecosystem sees record funding in 2024",
        category: { slug: "business" }
    },
    {
        slug: "oil-prices-global-market",
        title: "Global oil prices stabilize as OPEC+ agrees on production cuts",
        category: { slug: "business" }
    },
    {
        slug: "cryptocurrency-regulation-india",
        title: "India announces comprehensive cryptocurrency regulation framework",
        category: { slug: "business" }
    },

    // Sports News
    {
        slug: "india-australia-test-series",
        title: "India vs Australia Test series: Hosts dominate Day 1",
        category: { slug: "sports" }
    },
    {
        slug: "ipl-2024-auction-results",
        title: "IPL 2024 auction: Record-breaking bids for international stars",
        category: { slug: "sports" }
    },
    {
        slug: "neeraj-chopra-olympic-preparation",
        title: "Neeraj Chopra begins Olympic preparation with new training regime",
        category: { slug: "sports" }
    },
    {
        slug: "football-league-india",
        title: "Indian Super League: New season promises exciting football action",
        category: { slug: "sports" }
    },
    {
        slug: "hockey-india-world-cup",
        title: "Hockey India announces squad for World Cup 2024",
        category: { slug: "sports" }
    },
    {
        slug: "badminton-prakash-padukone",
        title: "Prakash Padukone Badminton Academy produces new champions",
        category: { slug: "sports" }
    },
    {
        slug: "chess-viswanathan-anand",
        title: "Viswanathan Anand wins prestigious international chess tournament",
        category: { slug: "sports" }
    },
    {
        slug: "tennis-sania-mirza-retirement",
        title: "Sania Mirza announces retirement from professional tennis",
        category: { slug: "sports" }
    },

    // Entertainment News
    {
        slug: "bollywood-box-office-2024",
        title: "Bollywood box office 2024: Record-breaking collections for action films",
        category: { slug: "entertainment" }
    },
    {
        slug: "amitabh-bachchan-new-film",
        title: "Amitabh Bachchan announces new film with acclaimed director",
        category: { slug: "entertainment" }
    },
    {
        slug: "deepika-padukone-hollywood",
        title: "Deepika Padukone makes Hollywood debut in major production",
        category: { slug: "entertainment" }
    },
    {
        slug: "music-industry-digital-transformation",
        title: "Indian music industry embraces digital transformation",
        category: { slug: "entertainment" }
    },
    {
        slug: "tv-serials-ott-platforms",
        title: "TV serials find new audience on OTT platforms",
        category: { slug: "entertainment" }
    },
    {
        slug: "comedy-shows-india",
        title: "Stand-up comedy shows gain popularity across Indian cities",
        category: { slug: "entertainment" }
    },
    {
        slug: "fashion-week-mumbai",
        title: "Mumbai Fashion Week showcases sustainable fashion trends",
        category: { slug: "entertainment" }
    },
    {
        slug: "art-exhibition-delhi",
        title: "Contemporary art exhibition in Delhi draws international attention",
        category: { slug: "entertainment" }
    },

    // Elections News
    {
        slug: "election-commission-guidelines-2024",
        title: "Election Commission announces new guidelines for 2024 polls",
        category: { slug: "elections" }
    },
    {
        slug: "voter-registration-drive",
        title: "Massive voter registration drive across all states",
        category: { slug: "elections" }
    },
    {
        slug: "political-parties-manifesto",
        title: "Major political parties release election manifestos",
        category: { slug: "elections" }
    },
    {
        slug: "campaign-rally-schedule",
        title: "Election campaign rally schedule announced for all constituencies",
        category: { slug: "elections" }
    },
    {
        slug: "voting-machines-security",
        title: "EVM security measures strengthened for upcoming elections",
        category: { slug: "elections" }
    },
    {
        slug: "exit-poll-guidelines",
        title: "Exit poll guidelines issued by Election Commission",
        category: { slug: "elections" }
    },
    {
        slug: "candidate-nomination-process",
        title: "Candidate nomination process begins for all constituencies",
        category: { slug: "elections" }
    },
    {
        slug: "election-expenditure-monitoring",
        title: "Election expenditure monitoring teams deployed nationwide",
        category: { slug: "elections" }
    },

    // Web Stories
    {
        slug: "digital-india-success-story",
        title: "Digital India: Success stories from rural villages",
        category: { slug: "web-stories" }
    },
    {
        slug: "startup-entrepreneur-journey",
        title: "From garage to unicorn: Startup entrepreneur's inspiring journey",
        category: { slug: "web-stories" }
    },
    {
        slug: "women-empowerment-rural-india",
        title: "Women empowerment in rural India: Stories of change",
        category: { slug: "web-stories" }
    },
    {
        slug: "education-technology-revolution",
        title: "Education technology revolution: Transforming learning in India",
        category: { slug: "web-stories" }
    },
    {
        slug: "sustainable-farming-success",
        title: "Sustainable farming success: Farmers adopt organic methods",
        category: { slug: "web-stories" }
    },
    {
        slug: "youth-innovation-awards",
        title: "Youth innovation awards: Young minds solving real problems",
        category: { slug: "web-stories" }
    },
    {
        slug: "cultural-heritage-preservation",
        title: "Cultural heritage preservation: Communities protecting traditions",
        category: { slug: "web-stories" }
    },
    {
        slug: "healthcare-rural-transformation",
        title: "Healthcare transformation in rural India: Telemedicine success",
        category: { slug: "web-stories" }
    }
];

// Helper function to get news by category
export const getNewsByCategory = (categorySlug: string): News[] => {
    return dummyNews.filter(news => news.category?.slug === categorySlug);
};

// Helper function to get categories with their news
export const getCategoriesWithNews = (): (Category & { news: News[] })[] => {
    return dummyCategories.map(category => ({
        ...category,
        news: getNewsByCategory(category.slug)
    }));
};

// Breaking news items (subset of news marked as breaking)
export const breakingNews = dummyNews.slice(0, 5).map(news => ({
    ...news,
    isBreaking: true
}));

// Latest news items (recent news)
export const latestNews = dummyNews.slice(0, 10).map(news => ({
    ...news,
    createdAt: new Date().toISOString()
})); 