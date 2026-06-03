import Link from 'next/link'
import React, { Fragment } from 'react'
import defaultMoviePoster from '@/public/images/sdplaceholder2.jpg';
import tableview from '@/public/images/icon-table.svg';
import posterView from '@/public/images/Grid_View.svg';
import GlightVideo from '@/components/shared/GlightVideo';

export type MoviesViewType = 'table' | 'poster';

export const MONTH_OPTIONS_WITH_ALL = ['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const MOVIE_YEAR_OPTIONS = [2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

export const MoviesViewToggle = ({ viewMode, onViewChange }: { viewMode: MoviesViewType; onViewChange: (view: MoviesViewType) => void }) => (
    <ul className={'viewsbox ttab flex xsm:inline-flex flex-wrap list-none mb-1 ml-0 xsm:ml-4 justify-center ' + (viewMode === 'poster' ? 'off' : '')}>
        <li
            className={`tab_items ${viewMode === 'table' ? 'bg-gold' : ''}`}
            onClick={() => onViewChange('table')}
        >
            <img src={tableview.src} alt='' title='Table View' />
        </li>
        <li
            className={`tab_items ${viewMode === 'poster' ? 'bg-gold' : ''}`}
            onClick={() => onViewChange('poster')}
        >
            <img src={posterView.src} alt='' title='Poster View' />
        </li>
    </ul>
);

const MoviesTableRow = ({ movie }: { movie: any }) => (
    <tr className="hover:bg-gray-50 block sm:table-row mb-3 sm:mb-0 rounded-lg bg-white">
        <td className="px-4 py-1 sm:border-r border-gray-200 sm:table-cell flex justify-between border-b text-center sm:text-left" data-title="Title">
            <span className="block sm:hidden font-bold">Title</span>
            <Link href={movie?.link} className="text-black hover:underline">{movie?.title}</Link>
        </td>
        <td className="px-4 py-1 sm:border-r border-gray-200 sm:table-cell flex justify-between border-b text-center sm:text-left" data-title="Genre">
            <span className="block sm:hidden font-bold">Genre</span>
            {movie?.primary_genre?.length > 0 && (
                <Fragment>
                    {movie?.primary_genre?.filter((genre: any) => genre.is_primary === true)?.map((genre: any, index: number) => (
                        <Link href={genre.value} className="text-black hover:underline" key={index}>{genre.name}</Link>
                    ))}
                </Fragment>
            )}
        </td>
        <td className="px-4 py-1 sm:border-r border-gray-200 sm:table-cell flex justify-between border-b text-center sm:text-left" data-title="Distributor">
            <span className="block sm:hidden font-bold">Distributor</span>
            {movie?.distributor_link ? (
                <Link href={movie?.distributor_link} className="text-black hover:underline">{movie?.distributor_name}</Link>
            ) : (
                <span className="text-gray-500">{movie?.distributor_note}</span>
            )}
        </td>
        <td className="px-4 py-1 sm:border-r border-gray-200 sm:table-cell flex justify-between border-b text-center sm:text-left" data-title="Platform">
            <span className="block sm:hidden font-bold">Pattern</span>
            <div className='flex justify-between items-center'>
                <span className="pr-2">{movie?.release_pattern || movie?.dist_pattern}</span>
                {movie?.trailer_link && (
                    <GlightVideo
                        videoLink={movie?.trailer_link}
                        className="w-6 h-6 text-[12px] inline-flex items-center justify-center bg-gray-800 text-white rounded-full hover:text-orange-400"
                        ariaLabel="Play trailer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                    </GlightVideo>
                )}
            </div>
        </td>
    </tr>
);

const MoviesTableHeader = () => (
    <thead className="bg-gray-900 text-white hidden sm:table-header-group">
        <tr>
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="px-4 py-3 font-semibold w-52">Genre</th>
            <th className="px-4 py-3 font-semibold w-80">Distributor</th>
            <th className="px-4 py-3 font-semibold w-52">Pattern</th>
        </tr>
    </thead>
);

export const MoviesYearTableView = ({ movies }: { movies: any[] }) => (
    <div className="overflow-x-auto">
        <div className="yearlist shadow rounded-lg overflow-hidden sm:min-w-[1000px]">
            <table className="w-full text-base text-left border-collapse">
                <MoviesTableHeader />
                <tbody className="divide-y">
                    {(movies || []).map((movie: any, index: number) => (
                        <Fragment key={index}>
                            {movie?.monthly_data?.map((monthly_data: any, monthlyIndex: number) => (
                                <Fragment key={monthlyIndex}>
                                    <tr className="bg-neutral-200 text-gray-800 block sm:table-row">
                                        <td colSpan={4} className="px-4 py-1 font-bold text-lg sm:border-r border-gray-200 sm:table-cell flex justify-between border-b text-center sm:text-left">{monthly_data?.date}</td>
                                    </tr>
                                    {monthly_data?.movie_data?.map((row: any, rowIndex: number) => (
                                        <MoviesTableRow movie={row} key={rowIndex} />
                                    ))}
                                </Fragment>
                            ))}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export const MoviesMonthTableView = ({ movies }: { movies: any[] }) => (
    <div className="overflow-x-auto">
        <div className="yearlist shadow rounded-lg overflow-hidden sm:min-w-[1000px]">
            <table className="w-full text-base text-left border-collapse">
                <MoviesTableHeader />
                <tbody className="divide-y">
                    {(movies || []).map((movie: any, index: number) => {
                        const release_date = movie.release_date;
                        const prev_release_date = index === 0 ? '' : movies[index - 1].release_date;
                        const formatted_release_date = release_date
                            ? new Date(release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                            : release_date;
                        return (
                            <Fragment key={index}>
                                {release_date !== prev_release_date && (
                                    <tr className="bg-neutral-200 text-gray-800 block sm:table-row">
                                        <td colSpan={4} className="px-4 py-1 font-bold text-lg sm:border-r border-gray-200 sm:table-cell flex justify-between border-b text-center sm:text-left">{formatted_release_date}</td>
                                    </tr>
                                )}
                                <MoviesTableRow movie={movie} />
                            </Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
);

export const MoviesPosterView = ({ data }: { data: any[] }) => (
    <div className="flex flex-wrap gap-4">
        {data?.map((movie: any, index: number) => {
            const release_date = movie.release_date;
            const prev_release_date = index === 0 ? '' : data[index - 1].release_date;
            const formatted_release_date = release_date
                ? new Date(release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                : release_date;
            return (
                <Fragment key={index}>
                    {release_date !== prev_release_date && (
                        <div className="list mt-2 lg:mt-2 xl:mt-4 w-full">
                            <div className="listblock inline-block">
                                <h3 className="text-gray-800">{formatted_release_date}</h3>
                            </div>
                        </div>
                    )}
                    <div className="card-item w-full md:w-[calc(50%-16px)]">
                        <div className="rounded-lg relative border border-gray-200 z-[1] w-full flex flex-wrap p-[2px] bg-stone-900">
                            <div className="card-media ">
                                {movie.hero_img && <img src={movie.hero_img} alt={movie.title} width={460} height={168} className="w-full h-full object-cover absolute top-0 left-0 z-[-2] rounded-lg" />}
                                <div className="imgfig bg-gray-900/90 absolute top-0 left-0 w-full h-full z-[-1] rounded-lg"></div>
                                <div className="card-item-image rounded-lg overflow-hidden mr-4 lg:w-[153px] lg:h-[243px] w-[113px] h-[168px]">
                                    <Link href={movie.link} className="rounded-lg relative border border-gray-200 z-[1] w-full bg-stone-900">
                                        <img src={movie.img != '' ? movie.img : defaultMoviePoster.src} alt={movie.title} width={153} height={243} className="w-full h-full object-cover" />
                                    </Link>
                                </div>
                            </div>
                            <div className="card-item-content text-neutral-200 lg:w-[calc(100%-180px)] w-[calc(100%-133px)] py-2 flex flex-col items-start justify-center">
                                <h3 className="card-item-title"><Link href={movie.link} className="hover:text-gray-200 text-white mr-1">{movie.title}</Link> {movie.rating && <span className="inline-block text-center bg-white px-4 rounded-2xl text-black uppercase text-sm font-normal">{movie.rating}</span>}</h3>
                                <p className="card-item-description text-gray-200 hover:text-white line-clamp-2" title={movie.synopsis}>{movie.synopsis}</p>
                                <div className="genrelist">
                                    {movie.primary_genre && movie.primary_genre.length > 0 && (
                                        movie.primary_genre?.map((genre: any, genreIndex: number): React.ReactNode =>
                                            <Link href={genre.value} className="hover:no-underline" key={genreIndex}><div className={`card-item-tag border border-gray-300 rounded-2xl px-4 py-0.5 inline-block text-gray-300 bg-black/60 mr-2 mb-1 ${genre.is_primary ? 'font-bold bg-black border-2 text-white' : ''}`}>{genre.name}</div></Link>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        })}
    </div>
);

const Movies_MonthlyList = ({
    movies,
    selectedMonth,
    setSelectedMonth,
    monthOptions,
    MonthLoading,
    viewMode,
    onViewChange,
    showViewToggle = true,
    selectedYear,
    setSelectedYear,
    yearOptions = MOVIE_YEAR_OPTIONS,
}: {
    movies: any[],
    selectedMonth: number,
    setSelectedMonth: (month: number) => void,
    monthOptions: string[],
    MonthLoading: boolean,
    viewMode: MoviesViewType,
    onViewChange: (view: MoviesViewType) => void,
    showViewToggle?: boolean,
    selectedYear?: number,
    setSelectedYear?: (year: number) => void,
    yearOptions?: number[],
}) => {
    return (
        <div className="movies_monthly_list">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <MonthSelector
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    yearOptions={yearOptions}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    monthOptions={monthOptions}
                />
                {showViewToggle && <MoviesViewToggle viewMode={viewMode} onViewChange={onViewChange} />}
            </div>
            {MonthLoading ? (
                <div className="relative min-h-[100px] mt-6 flex items-center justify-center bg-transparent">
                    <div className="w-12 h-12 rounded-full border-2 border-black border-t-transparent animate-spin" aria-hidden />
                </div>
            ) : (
                viewMode === 'table'
                    ? <MoviesMonthTableView movies={movies} />
                    : <MoviesPosterView data={movies} />
            )}
        </div>
    )
}

export const MonthSelector = ({ selectedYear, setSelectedYear, yearOptions, selectedMonth, setSelectedMonth, monthOptions }: { selectedYear?: number, setSelectedYear?: (year: number) => void, yearOptions?: number[], selectedMonth: number, setSelectedMonth: (month: number) => void, monthOptions: string[] }) => {
    const monthOffset = 2;
    return (
        <div className="list">
            <div className="listblock bg-zinc-900 rounded-lg lg:rounded-full p-2 inline-flex flex-wrap gap-2 items-center justify-center mb-2 md:mb-3 ml-0">
                <div className='yearon'>
                    <div className="relative inline-block">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear?.(Number(e.target.value))}
                            className="appearance-none min-w-40 rounded-full border-4 border-stone-900 bg-white text-gray-600 text-lg leading-none px-5 py-2 pr-14 focus:outline-none focus:ring-0 cursor-pointer"
                            name='YearSelect'
                            id='YearSelect'
                        >
                            {yearOptions?.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                            </svg>
                        </span>
                    </div>
                </div>
                <ul className="monthSelector bg-white rounded-lg lg:rounded-full p-1 flex flex-wrap gap-1 list-none m-0
                    [&>li]:bg-stone-900 [&>li]:text-gray-300 [&>li]:cursor-pointer [&>li]:rounded-2xl [&>li]:px-2 [&>li]:py-1 [&>li]:capitalize 
                    [&>li:hover]:bg-orangegold [&>li:hover]:text-black [&>li]:min-w-12 [&>li]:text-center [&>li.active]:bg-orangegold [&>li.active]:text-black">
                    {monthOptions.map((month: string, index: number) => (
                        <li key={index} className={selectedMonth === monthOptions.indexOf(month) + monthOffset ? 'active' : ''} onClick={() => { setSelectedMonth(monthOptions.indexOf(month) + monthOffset); }}>{month}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Movies_MonthlyList