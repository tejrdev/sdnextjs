import HeroBanner from '@/components/Movies/HeroBanner';
import NowPlaying from '@/components/Movies/MoviesByWeek/NowPlaying';
import Trendings from '@/components/Movies/Trendings';
import ComingSoon from '@/components/Movies/MoviesByWeek/ComingSoon';
import Reviews from '@/components/Movies/Reviews';
import { GetStaticProps } from 'next';
import HeadComponent from '@/components/HeadComponent';
import NewsletterSubscriber from '@/components/shared/NewsletterSubscriber';

const STATIC_BANNER_IMAGE = '/images/webpage_quartely_hero_image.webp';

interface MoviesByWeekProps {
    SEOData: SEOData;
    ReleasesByWeekData: {
        data: {
            top_poster: any[];
            top_bg: string;
            comming_soon: any[];
            now_in_theatre: any[];
            movie_review: any[];
            trending: any[];
        }
    }
}
interface SEOData {
    tag?: unknown[];
    children?: unknown[];
    [key: string]: any;
}
export const getStaticProps: GetStaticProps = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    const raw = `{"apikey" : "${process.env.NEXT_PUBLIC_PRIVATEAPI_TOKEN}"}`;

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    const ReleasesByWeekDataResponse = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/film_data_pages/sd-new-movie-this-week.php`, requestOptions as RequestInit);
    const ReleasesByWeekData = await ReleasesByWeekDataResponse.json();


    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'movies/releases-by-week');
    const SEOData: SEOData = await res.json();

    return {
        props: { SEOData, ReleasesByWeekData },
        revalidate: 60, // In seconds
    }
}

const MoviesByWeek: React.FC<MoviesByWeekProps> = ({ SEOData, ReleasesByWeekData }) => {
    const generateJsonLd = () => {
        const nowPlayingList = ReleasesByWeekData?.data?.now_in_theatre.splice(0, 8).map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Movie",
                "name": item.title,
                "url": process.env.NEXT_PUBLIC_FRONTEND_URL + item.link,
                "image": item.img,
                "genre": item.primary_genres,
                "datePublished": item.release_date,
                "publisher": {
                    "@type": "Organization",
                    "name": item.distributor_name,
                    "url": process.env.NEXT_PUBLIC_FRONTEND_URL + item.distributor_link,
                },
            }
        }));

        const trendingList = ReleasesByWeekData?.data?.trending?.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Movie",
                "name": item.title,
                "url": process.env.NEXT_PUBLIC_FRONTEND_URL + item.link,
                "image": item.img,
                "genre": item.primary_genres,
                "datePublished": item.release_date,
                "publisher": {
                    "@type": "Organization",
                    "name": item.distributor_name,
                    "url": process.env.NEXT_PUBLIC_FRONTEND_URL + item.distributor_link,
                },
            }
        }));

        const comingSoonList = ReleasesByWeekData?.data?.comming_soon.splice(0, 10).map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Movie",
                "name": item.title,
                "url": process.env.NEXT_PUBLIC_FRONTEND_URL + item.link,
                "image": item.img,
                "genre": item.primary_genres,
                "datePublished": item.release_date,
                "publisher": {
                    "@type": "Organization",
                    "name": item.distributor_name,
                    "url": process.env.NEXT_PUBLIC_FRONTEND_URL + item.distributor_link,
                },
            }
        }));
        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "CollectionPage",
                    "@id": "https://screendollars.com/movies/new-movies-this-week/#webpage",
                    "url": "https://screendollars.com/movies/new-movies-this-week/",
                    "name": "New Movies This Week",
                    "headline": "New Movies This Week",
                    "description": "Discover new movies this week, including now playing in theatres, trending movies, movie reviews, and coming soon releases.",
                    "isPartOf": {
                        "@type": "WebSite",
                        "@id": "https://screendollars.com/#website"
                    },
                    "breadcrumb": {
                        "@id": "https://screendollars.com/movies/new-movies-this-week/#breadcrumb"
                    },
                    "mainEntity": [
                        {
                            "@id": "https://screendollars.com/movies/new-movies-this-week/#now-playing"
                        },
                        {
                            "@id": "https://screendollars.com/movies/new-movies-this-week/#trending-movies"
                        },
                        {
                            "@id": "https://screendollars.com/movies/new-movies-this-week/#coming-soon"
                        }
                    ]
                },
                {
                    "@type": "WebSite",
                    "@id": "https://screendollars.com/#website",
                    "url": "https://screendollars.com/",
                    "name": "Screen Dollars",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://screendollars.com/?s={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                },
                {
                    "@type": "BreadcrumbList",
                    "@id": "https://screendollars.com/movies/new-movies-this-week/#breadcrumb",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://screendollars.com/"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Movies",
                            "item": "https://screendollars.com/movies/"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "New Movies This Week",
                            "item": "https://screendollars.com/movies/new-movies-this-week/"
                        }
                    ]
                },
                {
                    "@type": "ItemList",
                    "@id": "https://screendollars.com/movies/new-movies-this-week/#now-playing",
                    "name": "Now Playing in Theatres",
                    "numberOfItems": 8,
                    "itemListElement": nowPlayingList,
                },
                {
                    "@type": "ItemList",
                    "@id": "https://screendollars.com/movies/new-movies-this-week/#trending-movies",
                    "name": "Trending Movies",
                    "numberOfItems": 4,
                    "itemListElement": trendingList
                },
                {
                    "@type": "ItemList",
                    "@id": "https://screendollars.com/movies/new-movies-this-week/#coming-soon",
                    "name": "Coming Soon",
                    "numberOfItems": 10,
                    "itemListElement": comingSoonList,
                }
            ]
        }
    }
    return (
        <div>
            <HeadComponent data={SEOData} jsonSchema={generateJsonLd()} />
            <HeroBanner data={ReleasesByWeekData?.data?.top_poster} static_banner_image={STATIC_BANNER_IMAGE} scrollToId="nowplaying-movies-list" title="New Movies This Week" description={`Discover the latest films arriving in theatres this week, including new wide releases and notable titles hitting the big screen.`} />
            <NowPlaying data={ReleasesByWeekData?.data?.now_in_theatre} />
            <Reviews data={ReleasesByWeekData?.data?.movie_review} />
            <Trendings data={ReleasesByWeekData?.data?.trending} />
            {ReleasesByWeekData?.data?.comming_soon?.length > 0 && <ComingSoon data={ReleasesByWeekData?.data?.comming_soon} />}
            <NewsletterSubscriber />
        </div>
    );
};


export default MoviesByWeek;