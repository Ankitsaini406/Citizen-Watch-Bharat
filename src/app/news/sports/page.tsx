import { Metadata } from 'next';
import SportsPage from './SportsPage';

export const metadata: Metadata = {
    title: 'Sports News | Citizen Watch Bharat',
    description: 'Live scores, match highlights, player updates and in-depth analysis of cricket, football, hockey and other sports in India. Get the latest sports news and coverage.',
    keywords: [
        'Cricket news India',
        'IPL updates',
        'Football news India',
        'ISL latest',
        'Indian hockey team',
        'Olympics coverage',
        'Sports tournaments',
        'Athlete interviews',
        'Match predictions',
        'Sports analysis',
        'Kabaddi news',
        'Badminton rankings',
        'Tennis tournaments',
        'Indian Premier League',
        'Domestic cricket',
        'Sports injuries',
        'Coaching updates',
        'Sports business',
        'Fantasy sports tips'
    ],
    openGraph: {
        title: 'Latest Sports News & Updates | Citizen Watch Bharat',
        description: 'Comprehensive coverage of cricket, football, hockey and other sports with live scores, match highlights and expert analysis',
        url: 'https://citizenwatchbharat.com/news/sports',
        images: [
            {
                url: 'https://citizenwatchbharat.com/cover.webp',
                width: 1200,
                height: 630,
                alt: 'Citizen Watch Bharat Sports News Coverage',
            },
        ],
    },
    twitter: {
        title: 'Live Sports Updates & News | Citizen Watch Bharat',
        description: 'Get the latest scores, match highlights and breaking sports news from India and worldwide',
        images: ['https://citizenwatchbharat.com/cover.webp'],
    },
    alternates: {
        canonical: 'https://citizenwatchbharat.com/news/sports',
    },
    category: 'sports',
    other: {
        'content-type': 'sports',
        'coverage': 'Sports (India & International)',
        'audience': 'Sports fans, fantasy players, athletes',
        'topic': 'Cricket, Football, Hockey, Tennis, Kabaddi',
        'sport': [
            'cricket',
            'football',
            'hockey',
            'tennis',
            'kabaddi',
            'badminton',
            'athletics'
        ]
    }
};

export default function Page() {
    return <SportsPage />;
}