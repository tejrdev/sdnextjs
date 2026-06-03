import { useEffect, useState } from 'react';
import HeroBanner from '@/components/Movies/HeroBanner'
import MovieList from '@/components/Movies/Upcoming/MovieList'
import MoviesByMonth from '@/components/Movies/Upcoming/MoviesByMonth'
import MovieSnap from '@/components/Movies/Upcoming/MovieSnap'
import HeadComponent from '@/components/HeadComponent'
import { GetStaticProps } from 'next'
import NewsletterSubscriber from '@/components/shared/NewsletterSubscriber';

const STATIC_BANNER_IMAGE = '/images/Upcoming_Movies.jpg';

interface UpcomingMoviesProps {
    UpcomingMoviesData: {
        data: {
            top_poster: any[];
            movies: any[];
            upcoming_months: any[];
            upcoming_movies_snap: any[];
        }
    }
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

    const upcomingMoviesData = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/film_data_pages/upcoming-movies_data.php`, requestOptions as RequestInit);
    const UpcomingMoviesData = await upcomingMoviesData.json();

    return {
        props: { UpcomingMoviesData },
        revalidate: 60, // In seconds
    }
}



const UpcomingMovies: React.FC<UpcomingMoviesProps> = ({ UpcomingMoviesData }) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const [monthlyData, setMonthlyData] = useState<any>([]);
    const meta_title = 'Upcoming Movies | Movies Coming Out Soon';
    const meta_description = 'Looking for movies coming out soon? Explore the latest upcoming movie releases, theater schedules, streaming premieres, and major blockbuster release dates.';
    const canonical_url = process.env.NEXT_PUBLIC_FRONTEND_URL + '/movies/upcoming-movies/';
    useEffect(() => {
        const fetchMonthlyData = async () => {
            const MonthlyDataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/upcoming-movies_y_m.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&a_year=' + currentYear + '&a_month=' + currentMonth);
            const MonthlyData = await MonthlyDataResponse.json();
            setMonthlyData(MonthlyData);
        }
        fetchMonthlyData();
    }, []);

    const generateJsonLd = () => {
        const upcomingMoviesList = UpcomingMoviesData?.data?.movies.map((item: any, index: number) => ({
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
                    "@id": "https://screendollars.com/movies/upcoming-movies/#webpage",
                    "url": "https://screendollars.com/movies/upcoming-movies/",
                    "name": "Upcoming Movies",
                    "headline": "Upcoming Movies",
                    "description": "Discover upcoming movies, including now playing in theatres, trending movies, movie reviews, and coming soon releases.",
                    "isPartOf": {
                        "@type": "WebSite",
                        "@id": "https://screendollars.com/#website"
                    },
                    "breadcrumb": {
                        "@id": "https://screendollars.com/movies/upcoming-movies/#breadcrumb"
                    },
                    "mainEntity": [
                        {
                            "@id": "https://screendollars.com/movies/upcoming-movies/#upcoming-movies"
                        },
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
                    "@id": "https://screendollars.com/movies/upcoming-movies/#breadcrumb",
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
                            "name": "Upcoming Movies",
                            "item": "https://screendollars.com/movies/new-movies-this-week/"
                        }
                    ]
                },
                {
                    "@type": "ItemList",
                    "@id": "https://screendollars.com/movies/upcoming-movies/#upcoming-movies",
                    "name": "Upcoming Movies",
                    "numberOfItems": 8,
                    "itemListElement": upcomingMoviesList,
                }
            ]
        };
    }
    return (
        <div>
            <HeadComponent meta_title={meta_title} meta_description={meta_description} canonical_url={canonical_url} jsonSchema={generateJsonLd()} />
            <HeroBanner data={UpcomingMoviesData?.data?.top_poster} static_banner_image={STATIC_BANNER_IMAGE} scrollToId="upcoming-movies-list" title="Upcoming Movies" description={`From <span class="text-orangegold font-bold">big-screen spectacles</span> to <span class="text-orangegold font-bold">buzzworthy titles</span> — discover what's hitting theatres next.`} />
            {UpcomingMoviesData?.data?.movies?.length > 0 && <MovieList data={UpcomingMoviesData?.data?.movies} />}
            {UpcomingMoviesData?.data?.upcoming_months?.length > 0 && <MoviesByMonth initialData={monthlyData} currentMonth={currentMonth} currentYear={currentYear} />}
            {UpcomingMoviesData?.data?.upcoming_movies_snap?.length > 0 && <MovieSnap initialData={monthlyData} currentMonth={currentMonth} currentYear={currentYear} />}
            <NewsletterSubscriber />
        </div>
    )
}

export default UpcomingMovies