import { useState, useMemo } from "react";
import tablelist from "@/public/images/List_table_View.svg";
import tile from "@/public/images/Grid_View.svg";
import chartimg from "@/public/images/ChartPieSlice.svg";
import GenreTile from "@/components/Boxoffice/GenreTile";
import GenreCharts from "@/components/Boxoffice/GenreCharts";
import Link from "next/link";
import HeadComponent from "@/components/HeadComponent";

export interface BoxOfficeGenreAllResponse {
    content: string;
    title: string;
    data: { year: YearSummary[] };
    genre_data: GenreGroup[];
}

export interface YearSummary {
    year: number;
    total_in_year: number;
    total_per: string;
}

export interface GenreGroup {
    name: string;
    data: GenreItem[];
}

export interface GenreItem {
    name?: string;
    total?: number | '-';
    movies_count?: number | '-';
    per_count?: string | '-';
    year?: number | '-';
}

interface ProcessedGenreData {
    name: string;
    total: number;
    per_count: string;
}

interface ProcessedYearData {
    year: number;
    genres: ProcessedGenreData[];
    labels: string[];
    series: number[];
}

type ViewType = 'table' | 'tile' | 'chart';

// Main genres to display as individual items
const MAIN_GENRES = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Sci-Fi'];

export async function getStaticProps() {
    // Fetch data from external API
    // const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + '3d');
    // const SEOdata: SEOData = await res.json();

    // static data
    try {
        const genredataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-boxoffice/box_office_genre_all.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
        // Check if response is ok


        // Parse JSON from text
        const genredata: BoxOfficeGenreAllResponse = await genredataResponse.json();

        return {
            props: { genredata },
            revalidate: 10, // In seconds
        };
    } catch (error) {
        console.error('Error fetching genre data:', error);
        // Fallback to static data if API fails
        return {
            props: { genredata: [] },
            revalidate: 10, // In seconds
        };
    }
}

const TopMoviesByGenre = ({ genredata }: { genredata: BoxOfficeGenreAllResponse }) => {
    const total_years = genredata?.data?.year?.length || 9;
    genredata?.genre_data?.forEach(item => {
        while (item?.data?.length < total_years) {
            item.data.push({ year: '-', total: '-' });
        }
    });

    const [tableon, setTableon] = useState<ViewType>('table');
    const tablehandle = (view: ViewType) => {
        setTableon(view);
        //viewpass(view);
    };

    const dataToUse = genredata && genredata?.genre_data?.length > 0 ? genredata?.genre_data : [];
    dataToUse.sort((a, b) => a.name?.toLowerCase().localeCompare(b.name?.toLowerCase()));

    // Process data for tile and chart views (year-wise with grouped genres)
    const processedYearData: ProcessedYearData[] = useMemo(() => {
        if (!genredata?.data?.year || !genredata?.genre_data) {
            return [];
        }

        return genredata.data.year.map((yearItem) => {
            const genreMap = new Map<string, { total: number; per_count: string }>();
            let otherTotal = 0;
            const yearTotal = yearItem.total_in_year ? Number(yearItem.total_in_year) : 0;

            // Process each genre
            genredata.genre_data.forEach((genreItem) => {
                const genreYearData = genreItem.data.find(
                    (item) => item.year === yearItem.year && item.total !== '-' && item.total !== undefined
                );

                if (!genreYearData) return;

                const total = genreYearData.total ? Number(genreYearData.total) : 0;
                const per_count = genreYearData.per_count || '0%';

                // Check if this is one of the main genres
                const isMainGenre = MAIN_GENRES.some(
                    (mainGenre) => mainGenre.toLowerCase() === genreItem.name.toLowerCase()
                );

                if (isMainGenre) {
                    // Use the exact genre name from MAIN_GENRES to ensure consistent casing
                    const mainGenreName = MAIN_GENRES.find(
                        (mg) => mg.toLowerCase() === genreItem.name.toLowerCase()
                    ) || genreItem.name;
                    genreMap.set(mainGenreName, { total, per_count });
                } else {
                    // Add to "Other" category
                    otherTotal += total;
                }
            });

            // Calculate "Other" percentage based on year total
            const otherPerCount = yearTotal > 0
                ? `${((otherTotal / yearTotal) * 100).toFixed(1)}%`
                : '0%';

            // Build genres array in the order of MAIN_GENRES, then "Other"
            const genres: ProcessedGenreData[] = [];
            const labels: string[] = [];
            const series: number[] = [];

            MAIN_GENRES.forEach((genre) => {
                const genreData = genreMap.get(genre);
                if (genreData) {
                    genres.push({
                        name: genre,
                        total: genreData.total,
                        per_count: genreData.per_count,
                    });
                    labels.push(genre);
                    series.push(genreData.total);
                } else {
                    genres.push({
                        name: genre,
                        total: 0,
                        per_count: '0%',
                    });
                    labels.push(genre);
                    series.push(0);
                }
            });

            // Add "Other" if it has a value
            if (otherTotal > 0) {
                genres.push({
                    name: 'Other',
                    total: otherTotal,
                    per_count: otherPerCount,
                });
                labels.push('Other');
                series.push(otherTotal);
            }

            return {
                year: yearItem.year,
                genres,
                labels,
                series,
            };
        });
    }, [genredata]);

    const meta_title = `Box Office Totals by Genre for All Years | Screendollars Box Office`;
    const meta_description = `Box Office Totals by Genre for All Years in the Domestic Box Office.`;
    const canonical_url = process.env.NEXT_PUBLIC_FRONTEND_URL + '/box-office/totals/genre/';
    const currentYear = new Date().getFullYear();

    return (
        <>
            <HeadComponent meta_title={meta_title} meta_description={meta_description} canonical_url={canonical_url} />
            <div className='box_title pt-4 md:pt-5'>
                <div className='container'>
                    <div className='text-center'>
                        <h1 className='block lg:inline-block align-top pvr pr-0 lg:pt-3 transition-all duration-300 ease-out text-center'>Box Office Totals by Genre for All Years  </h1>
                        <p className='text-gray-600 text-lg'>Totals by Primary Genre for {currentYear}-2017 in the Domestic Box Office</p>
                    </div>
                </div>
            </div>
            <div className='genre_market_share'>
                <div className='container'>
                    <div className='genresharetable my-6 lg:my-10'>
                        <div className='boxtableswich my-3 text-center xsm:text-right sticky top-0 z-20 bg-white pt-3'>

                            <ul className={'viewsbox inline-flex flex-wrap list-none mb-1  justify-center border border-gray-500 rounded-lg overflow-hidden max-w-[150px] mx-auto' + (tableon ? 'off' : '')}>
                                <li className={'tab_items cursor-pointer border-r border-gray-500 px-3 py-2 ' + (tableon === 'table' ? 'bg-gold' : '')} onClick={() => tablehandle('table')}>
                                    <img src={tablelist.src} alt='' title='Table View' />
                                </li>
                                <li className={'tab_items cursor-pointer border-r border-gray-500 px-3 py-2 ' + (tableon === 'tile' ? 'bg-gold' : '')} onClick={() => tablehandle('tile')}>
                                    <img src={tile.src} alt='' title='Tile View' />
                                </li>
                                <li
                                    className={`chartview cursor-pointer  rounded-r-lg flex justify-center items-center w-12 h-11 ml-[-1px] ${tableon === 'chart' ? 'on bg-gold' : 'off grayscale'}`}
                                    onClick={() => tablehandle('chart')}
                                >
                                    <img src={chartimg.src} alt='' className='mx-auto max-w-8' />
                                </li>
                            </ul>
                        </div>
                        {tableon === 'table' && (
                            <div className='overflow-x-auto '>
                                <table className='responsive dataTable w-full mb-1'>
                                    <thead>
                                        <tr>
                                            <th data-title='genre' className='text-left md:min-w-[100px] sticky left-0 bg-white z-10'>Genre</th>
                                            {genredata?.data?.year?.length > 0 && genredata.data.year.map((item, index) => (
                                                <th data-title={item.year} className='text-center md:min-w-[100px]' key={index}>
                                                    <Link href={`/box-office/highest-grossing/${item.year}`} className="text-black ">{item.year}</Link></th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataToUse.map((item, index) => (
                                            <tr key={index}>
                                                <td data-title='Genre' className={`text-left sticky left-0 z-10 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}><Link href={`/box-office/highest-grossing/all-years/all-ratings/${item.name.toLowerCase()}`} className="text-black hover:text-gold font-bold capitalize">{item?.name}</Link></td>
                                                {item?.data?.length > 0 && item.data.map((item, index) => (
                                                    <td data-title={item?.year} key={index}>
                                                        <Link href={`/box-office/highest-grossing/${item.year}/all-ratings/${item?.name?.toLowerCase()}`} className="text-black hover:text-gold">
                                                            {item.total != null && item.total !== '-' ? '$' + Number(item.total).toLocaleString() : '-'} <br /> {item.per_count}
                                                        </Link>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr className='bg-gold-yellow border-t-4 border-b-2 border-orangegold shadow-md'>
                                            <td data-title='Total' className='font-bold text-black text-lg py-4 uppercase tracking-wide sticky left-0 bg-gold-yellow z-10'>Total</td>
                                            {genredata?.data?.year?.length > 0 && genredata.data.year.map((item, index) => (
                                                <td data-title={item.year} className='font-bold text-black text-center md:min-w-[100px] text-lg py-4 bg-gold-yellow' key={index}>
                                                    {item.total_in_year ? '$' + Number(item.total_in_year).toLocaleString() : '-'} <br />
                                                    <span className='text-sm text-gray-700'>{item.total_per ?? '-'}</span>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {tableon === 'tile' && (
                            <div className='tileview'>
                                <GenreTile data={processedYearData} />
                            </div>
                        )}
                        {tableon === 'chart' && (
                            <div className='chartview'>
                                <GenreCharts data={processedYearData} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopMoviesByGenre;
