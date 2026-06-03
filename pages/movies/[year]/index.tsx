import {
    MonthSelector,
    MoviesYearTableView,
    MONTH_OPTIONS_WITH_ALL,
    MOVIE_YEAR_OPTIONS,
} from '@/components/Movies/Movies_MonthlyList'
import MovieCard from '@/components/shared/MovieCard';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import NewsletterSubscriber from '@/components/shared/NewsletterSubscriber';
import HeadComponent from '@/components/HeadComponent';

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}
export async function getStaticProps(context: any) {
    const { year } = context.params as { year: string }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    const raw = `{"a_year" : "${year}", "apikey" : "${process.env.NEXT_PUBLIC_PRIVATEAPI_TOKEN}"}`;
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/movie-boxoffice/movies-by-year-page.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`, requestOptions as RequestInit);
    const data = await response.json();
    return {
        props: { year, data },
        revalidate: 60, // In seconds
    }
}
const Movies_YearList = ({ year, data }: { year: string, data: any }) => {
    const router = useRouter();
    const selectedMonth = 2;
    const [upcomingData, setUpcomingData] = useState<any>(data);
    const [selectedYear, setSelectedYear] = useState(parseInt(year));
    const [isYearLoading, setIsYearLoading] = useState(false);
    const yearOptions = MOVIE_YEAR_OPTIONS;
    const monthOptions = MONTH_OPTIONS_WITH_ALL;
    const meta_title = `Upcoming Movies ${year} | Full Movie Release List`;
    const meta_description = `Explore all upcoming ${year} movies, including theatrical releases, streaming premieres, release dates, genres, studios, and the latest movie updates.`;
    const canonical_url = process.env.NEXT_PUBLIC_FRONTEND_URL + '/movies/' + year + '/';

    useEffect(() => {
        setUpcomingData(data);
        setSelectedYear(parseInt(year));
        setIsYearLoading(false);
    }, [data, year]);

    useEffect(() => {
        if (!selectedYear || selectedYear === parseInt(year)) return;
        setIsYearLoading(true);
        router.push(`/movies/${selectedYear}`, undefined, { scroll: false });
    }, [selectedYear, year, router]);

    const onMonthChange = (monthIndex: number) => {
        const monthLabel = monthOptions[monthIndex - 2];
        if (monthLabel === 'All') return;
        setIsYearLoading(true);
        router.push(`/movies/${selectedYear}/${monthLabel}`, undefined, { scroll: false });
    };

    return (
        <div>
            <HeadComponent meta_title={meta_title} meta_description={meta_description} canonical_url={canonical_url} />
            <section className="upcomingMonth bg-zinc-900 text-white secspace 2xl:pt-10">
                <div className="container">
                    <h1 className="h2">Upcoming Movies {year}</h1>
                    <div className="list grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 text-center my-6">

                        {data?.upcoming?.slice(0, 4).map((movie: any, index: number) => (
                            <MovieCard key={index} item={movie} />
                        ))}
                    </div>
                </div>
            </section>
            <section className="yearselector py-8 lg:py-12 xl:py-16 bg-zinc-100">
                <div className="container">
                    <h2 className="">{upcomingData.title}</h2>
                    <span className="text-lg xl:text-xl" dangerouslySetInnerHTML={{ __html: upcomingData.content }} />
                    <MonthSelector
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        yearOptions={yearOptions}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={onMonthChange}
                        monthOptions={monthOptions}
                    />
                    {isYearLoading ? (
                        <div className="relative min-h-[100px] mt-6 flex items-center justify-center bg-transparent">
                            <div className="w-12 h-12 rounded-full border-2 border-black border-t-transparent animate-spin" aria-hidden />
                        </div>
                    ) : (
                        <MoviesYearTableView movies={upcomingData.movies || []} />
                    )}
                </div>
            </section>
            <NewsletterSubscriber />
        </div>
    )
}

export default Movies_YearList
