import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import MovieCard from '@/components/shared/MovieCard';
import { GetStaticPaths } from 'next';

import Movies_MonthlyList, {
    MONTH_OPTIONS_WITH_ALL,
    MOVIE_YEAR_OPTIONS,
    MoviesViewType,
} from '@/components/Movies/Movies_MonthlyList';
import NewsletterSubscriber from '@/components/shared/NewsletterSubscriber';
import HeadComponent from '@/components/HeadComponent';

interface SEOData {
    [key: string]: any;
}
interface ReleaseCalendarProps {
    data: SEOData;
    year: string;
    month: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

interface Context {
    params: {
        year: string;
        month: string;
    };
}

const monthOptions = MONTH_OPTIONS_WITH_ALL;
const monthSlugOptions = monthOptions.slice(1);
const FullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export async function getStaticProps(context: Context) {
    const { year, month } = context.params as { year: string, month: string }
    const monthIndex = monthSlugOptions.indexOf(month);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    const raw = `{"a_year" : "${year}", "a_month" : "${monthIndex + 1}", "apikey" : "${process.env.NEXT_PUBLIC_PRIVATEAPI_TOKEN}"}`;
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/movie-boxoffice/movies-by-month-page.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`, requestOptions as RequestInit);
    const data = await response.json();
    return {
        props: { year, month, data },
        revalidate: 60,
    }
}

const ReleasesCalendar: React.FC<ReleaseCalendarProps> = ({ year, month, data }) => {
    const nextRouter = useRouter();
    const [selectedYear, setSelectedYear] = useState(parseInt(year));
    const [selectedMonth, setSelectedMonth] = useState(monthOptions.indexOf(month) + 2);
    const [monthNavLoading, setMonthNavLoading] = useState(false);
    const [viewMode, setViewMode] = useState<MoviesViewType>(
        nextRouter.query.view === 'poster' ? 'poster' : 'table'
    );
    const meta_title = `${FullMonths[monthSlugOptions.indexOf(month)]} ${year} Movies`;
    const meta_description = `See all movies releasing in  ${FullMonths[monthSlugOptions.indexOf(month)]} ${year}, including theatrical releases, streaming premieres, genres, distributors, and release schedules.`;
    const canonical_url = process.env.NEXT_PUBLIC_FRONTEND_URL + '/movies/' + year + '/' + month + '/';


    useEffect(() => {
        setSelectedYear(parseInt(year));
        setSelectedMonth(monthOptions.indexOf(month) + 2);
        setMonthNavLoading(false);
        if (nextRouter.query.view === 'poster') {
            setViewMode('poster');
        }
    }, [year, month, nextRouter.query.view]);

    useEffect(() => {
        if (!selectedYear || selectedYear === parseInt(year)) return;
        setMonthNavLoading(true);
        const query = viewMode === 'poster' ? '?view=poster' : '';
        router.push(`/movies/${selectedYear}/${month}${query}`, undefined, { scroll: false });
    }, [selectedYear, year, month, viewMode]);


    const onViewChange = (view: MoviesViewType) => {
        setViewMode(view);
        const basePath = `/movies/${year}/${month}`;
        router.replace(view === 'poster' ? `${basePath}?view=poster` : basePath, undefined, { shallow: true, scroll: false });
    };

    const onMonthChange = (monthIndex: number) => {
        const monthLabel = monthOptions[monthIndex - 2];
        if (monthLabel === 'All') {
            if (monthIndex === selectedMonth) return;
            setMonthNavLoading(true);
            router.push(`/movies/${year}`, undefined, { scroll: false });
            return;
        }
        if (monthIndex === selectedMonth) return;
        setMonthNavLoading(true);
        setSelectedMonth(monthIndex);
        const query = viewMode === 'poster' ? '?view=poster' : '';
        router.push(`/movies/${year}/${monthLabel}${query}`, undefined, { scroll: false });
    };

    return (
        <div className="movieMonths">
            <HeadComponent meta_title={meta_title} meta_description={meta_description} canonical_url={canonical_url} />
            <section className="upcomingMonth bg-zinc-900 text-white secspace 2xl:pt-10">
                <div className="container">
                    <h1 className="h2">{FullMonths[monthSlugOptions.indexOf(month)]} {year} Movies</h1>
                    <div className="list grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 text-center my-6">
                        {data?.upcoming?.slice(0, 4).map((movie: any, index: number) => (
                            <MovieCard key={index} item={movie} />
                        ))}
                    </div>
                </div>
            </section>
            <section className="monthselector py-8 lg:py-12 xl:py-16 bg-zinc-100">
                <div className="container">
                    <h2 className="">Movies By Month</h2>
                    <p className="text-lg xl:text-xl">Browse the best new movies coming out each month.</p>
                    <Movies_MonthlyList
                        movies={data.movies || []}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={onMonthChange}
                        monthOptions={monthOptions}
                        MonthLoading={monthNavLoading}
                        viewMode={viewMode}
                        onViewChange={onViewChange}
                        showViewToggle={true}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        yearOptions={MOVIE_YEAR_OPTIONS}
                    />
                </div>
            </section>
            <NewsletterSubscriber />
        </div>
    );
};

export default ReleasesCalendar;
