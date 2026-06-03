import React, { useEffect, useState } from 'react'
import MovieCard from '@/components/shared/MovieCard';
import Link from 'next/link';

const UpcomingMovies = ({ week_start_date, movies, currentWeek }: { week_start_date: string, movies: any, currentWeek: number }) => {
    const [selectedWeek, setSelectedWeek] = useState(currentWeek);
    const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set());
    const [next7Weeks, setNext7Weeks] = useState<{ dateRange: string; startDate: string; weekNumber: number; weekStart: string; currentYear: number }[]>([]);
    const [weekMovies, setWeekMovies] = useState<any>(movies);
    const [loading, setLoading] = useState(false);
    // console.log(next7Weeks?.find((week) => week.weekNumber === selectedWeek)?.dateRange)
    const isExpandedForSelectedWeek = expandedWeeks.has(selectedWeek);
    useEffect(() => {
        //get next 7 weeks date range
        const next7Weeks: { dateRange: string; startDate: string; weekNumber: number; weekStart: string; currentYear: number }[] = [];
        for (let i = 0; i < 7; i++) {
            const startDate = new Date(new Date(week_start_date).setDate(new Date(week_start_date).getDate() + i * 7));
            const endDate = new Date(new Date(week_start_date).setDate(new Date(week_start_date).getDate() + i * 7 + 6));

            next7Weeks.push({
                dateRange: startDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                }) + ' - ' + endDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                }),
                startDate: startDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                }),
                weekNumber: currentWeek + i,
                currentYear: startDate.getFullYear(),
                weekStart: startDate.toISOString().split('T')[0],//convert to Date object 2026-03-13
            });
        }
        setNext7Weeks(next7Weeks);
    }, []);


    useEffect(() => {
        const selectedWeekData = next7Weeks.find((week) => week.weekNumber === selectedWeek);
        if (selectedWeekData) {
            const fetchMovies = async () => {
                setLoading(true);
                try {
                    const moviesResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movies_listing/sd-movie-list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&a_year=' + selectedWeekData.currentYear + '&a_week=' + selectedWeekData.weekNumber);
                    const res = await moviesResponse.json();
                    setWeekMovies(res?.week_movies);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                } finally {
                    setLoading(false);
                }
            }
            fetchMovies();
        }
    }, [selectedWeek]);

    const handleShowAll = () => {
        setExpandedWeeks(prev => new Set(prev).add(selectedWeek));
    };

    return (
        <section className='moviesPage_section  py-8 md:py-12 lg:py-14 bg-zinc-100 border-t border-zinc-200'>
            <div className='container'>
                <h1>Discover New Releases, Trailers & Film Insights
                </h1>
                <p className='max-w-3xl text-lg'>Dive into the world of movies with Screendollars—explore new releases, watch trailers, and access expert insights on the latest films shaping the industry</p>
                <div className="dateselector_dates mt-6 md:mt-8 mb-3 md:mb-6">
                    <ul className='inline-flex  flex-wrap gap-2 list-none items-center ml-0 mb-0 xl:border border-zinc-800 rounded-lg p-1.5 xl:bg-white
                [&>li]:py-2 [&>li]:px-3 [&>li]:rounded-lg [&>li]:bg-stone-900 [&>li]:text-white [&>li]:cursor-pointer [&>li]:min-w-12 [&>li]:text-center [&>li:hover]:bg-orangegold [&>li:hover]:text-black [&>li.active]:bg-orangegold [&>li.active]:text-black  [&>li]:flex [&>li]:items-center [&>li]:justify-center [&>li]:min-h-24'>
                        {next7Weeks.map((week, index) => (
                            <li key={index} className={`${selectedWeek === week.weekNumber ? 'active' : ''}`} onClick={() => setSelectedWeek(week.weekNumber)}><span className='font-bold block mt-[-6px] xsm:mt-0 uppercase'>
                                {week.dateRange}
                                <p className='my-1'>Week {week.weekNumber}  </p>
                                {/* {next7Weeks.find((week) => week.weekNumber === selectedWeek)?.dateRange*/}</span></li>
                        ))}
                    </ul>

                </div>
                <div className="moviesreleases">
                    {loading ? <div className="relative min-h-[100px] mt-6 flex items-center justify-center bg-transparent">
                        <div className="w-12 h-12 rounded-full border-2 border-black border-t-transparent animate-spin" aria-hidden />
                    </div> : (
                        <>
                            <div className="grid gap-4 lg:gap-5 lg:gap-y-7 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] text-center ">
                                {(isExpandedForSelectedWeek ? weekMovies : weekMovies?.slice(0, 4))?.map((movie: any, index: number) => (
                                    <MovieCard key={movie?.title_id ?? index} item={movie} requestFrom="upcoming-movies" />
                                ))}
                            </div>
                            {!isExpandedForSelectedWeek && weekMovies?.length > 4 && (
                                <div className="cta_btn mt-6 lg:mt-10">
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        className="inline-block hover:underline cursor-pointer font-medium"
                                        onClick={handleShowAll}
                                        onKeyDown={(e) => e.key === 'Enter' && handleShowAll()}
                                    >
                                        + Show all ({weekMovies?.length})
                                    </span>
                                </div>
                            )}
                        </>
                    )}
                    <div className="cta_btn text-center mt-6 lg:mt-10">
                        <Link href="/movies/release-schedule?requestFrom=upcoming-movies" className="bg-orangegold text-black hover:bg-black hover:text-white min-w-40 transition-all duration-300 mt-2 lg:text-xl text-lg px-8 py-1.5 rounded-2xl font-bold capitalize">View Release schedule</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpcomingMovies