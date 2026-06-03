import axios from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import FilmFilter from '../../../../components/FilmData/DetailPages/Films/FilmFilter';
import Pagination from '../../../../components/Directory/ListingPages/Pagination';
import HomePageAds from '../../../../components/Homepage/HomePageAds';
import HeadComponent from '@/components/HeadComponent';
import { FaFilter } from "react-icons/fa";
import Loader from '@/components/Loader';
import {
    MoviesAZProps,
    MoviesAZResponse,
    MovieSearchResponse,
    DistributorSearchResponse,
    MovieListItem
} from '@/types/movies';
import { JSONData } from '@/components/shared/JSONData';

const AZMoviesData = JSONData.AZMoviesData;

export const getStaticPaths: GetStaticPaths = async () => {
    // Generate paths for all alphabets (a-z and 0-9)
    const alphabets = [
        ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // a-z
        ...Array.from({ length: 10 }, (_, i) => i.toString()) // 0-9
    ];

    const paths = alphabets.map((alphabet) => ({
        params: { alphabet },
    }));

    return {
        paths,
        fallback: false, // Show 404 for any other alphabet
    };
};

export const getStaticProps: GetStaticProps<MoviesAZProps> = async ({ params }) => {
    try {
        const alphabet = params?.alphabet as string || 'a';

        // Fetch data from external API
        const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'movies/a-z');
        const data = await res.json();

        // film a-z static data with the specific alphabet
        const FilmsDataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/movie-a-z.php?filter=' + alphabet + '&page_no=' + 1 + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
        const FilmsData: MoviesAZResponse = await FilmsDataResponse.json();

        return {
            props: { data, FilmsData, alphabet },
            revalidate: 10, // In seconds
        };
    } catch (error) {
        console.error('Error in getStaticProps:', error);
        return {
            props: {
                data: {},
                FilmsData: { movies: [], max_page: 1 },
                alphabet: 'a'
            },
            revalidate: 10,
        };
    }
};

const Films: React.FC<MoviesAZProps> = ({ data, FilmsData, alphabet }) => {
    const router = useRouter();
    const tdStyle: React.CSSProperties = {
        border: '1px solid #f2f2f2',
        borderCollapse: 'collapse',
        padding: '6px',
    };

    // State management
    const [FilmsPages, setFilmsPages] = useState<number>(1);
    const [FilmsPage, setFilmsPage] = useState<number>(1);
    const [FilmsListData, setFilmsListData] = useState<MovieListItem[]>(FilmsData.movies || []);
    const [FilmsTotalMovies, setFilmsTotalMovies] = useState<number>(FilmsData.total_movies || 0);
    const [FilmsAlphabet, setFilmsAlphabet] = useState<string>(alphabet || 'a');
    const [SearchFilms, setSearchFilms] = useState<string>('');
    const [FilmsSearchFilter, setFilmsSearchFilter] = useState<string>('');
    const [SearchDistributor, setSearchDistributor] = useState<string>('');
    const [DistributorSearchDataLoaded, setDistributorSearchDataLoaded] = useState<boolean>(false);
    const [DistributorSearchData, setDistributorSearchData] = useState<DistributorSearchResponse | null>(null);
    const [FilmsYear, setFilmsYear] = useState<string>('');
    const [FilmsDistributor, setFilmsDistributor] = useState<string>('');
    const [FilmsDistributorName, setFilmsDistributorName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [routeLoading, setRouteLoading] = useState<boolean>(false);
    const [filtertoggle, setFilterToggle] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Ref for distributor search timeout
    const distributorSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (distributorSearchTimeoutRef.current) {
                clearTimeout(distributorSearchTimeoutRef.current);
            }
        };
    }, []);


    const setCurrentPage = useCallback((currentPage: number) => {
        setFilmsPage(currentPage);
    }, []);

    const setSelectedValue = useCallback((value: string, tag: string) => {
        switch (tag) {
            case 'years':
                setFilmsYear(value);
                break;
            case 'distributors':
                const distributor = distfilterWithId.find(item => item.name === value);
                setFilmsDistributor(distributor ? distributor.id.toString() : '');
                setFilmsDistributorName(distributor ? distributor.name : '');
                break;
        }
        setFilmsPage(1);
    }, []);


    const onSearchFilmSubmit = () => {
        setFilmsSearchFilter(SearchFilms.trim());
        setFilmsPage(1);
    };

    const onSearchFilmKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearchFilmSubmit();
        }
    };

    const onDistributorSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        setSearchDistributor(search);

        // Clear previous timeout
        if (distributorSearchTimeoutRef.current) {
            clearTimeout(distributorSearchTimeoutRef.current);
        }

        if (search !== '') {
            setDistributorSearchDataLoaded(false);
            distributorSearchTimeoutRef.current = setTimeout(() => {
                loadSearchDistributorData(search);
            }, 1000);
        } else {
            setDistributorSearchData(null);
            setDistributorSearchDataLoaded(false);
            setFilmsDistributor('');
        }
    }, []);

    const setSelectedDistributor = useCallback((item: { id: string; title: string }) => {
        setFilmsDistributor(item.id);
        setSearchDistributor(item.title);
        setDistributorSearchDataLoaded(false);
        setDistributorSearchData(null);
        setFilmsPage(1);
    }, []);

    const clearDistributorFilter = useCallback(() => {
        setFilmsDistributor('');
        setSearchDistributor('');
        setFilmsDistributorName('');
        setDistributorSearchData(null);
        setDistributorSearchDataLoaded(false);
    }, []);

    const loadSearchDistributorData = useCallback(async (searchText: string) => {
        if (!searchText || searchText === '') {
            setDistributorSearchData(null);
            setDistributorSearchDataLoaded(false);
            setFilmsDistributor('');
            setSearchDistributor('');
            return;
        }

        try {
            const response = await axios.get<DistributorSearchResponse>(
                `${process.env.NEXT_PUBLIC_SD_API}/film_data_pages/distibutor_movies_search.php?search_text=${searchText}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`
            );

            if (response.data && response.data.search_list && response.data.search_list.length > 0) {
                setDistributorSearchData(response.data);
                setDistributorSearchDataLoaded(true);
            } else {
                setDistributorSearchData(null);
                setDistributorSearchDataLoaded(false);
            }
        } catch (error) {
            console.error('Error loading distributor search data:', error);
            setDistributorSearchData(null);
            setDistributorSearchDataLoaded(false);
        }
    }, []);

    // Load films data when dependencies change
    useEffect(() => {
        loadFilmsData();
    }, [FilmsPage, FilmsAlphabet, FilmsYear, FilmsDistributor, FilmsSearchFilter]);

    // Update alphabet from URL when it changes
    useEffect(() => {
        if (router.query.alphabet && router.query.alphabet !== FilmsAlphabet) {
            setFilmsAlphabet(router.query.alphabet as string);
            setFilmsSearchFilter('');
            setFilmsPage(1); // Reset to page 1 when alphabet changes
        }
    }, [router.query.alphabet, FilmsAlphabet]);


    // Handle route change loading states
    useEffect(() => {
        const handleStart = () => setRouteLoading(true);
        const handleComplete = () => setRouteLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]);

    const loadFilmsData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            let API_URL = `${process.env.NEXT_PUBLIC_SD_API}/film_data_pages/movie-a-z.php?filter=${FilmsAlphabet}&page_no=${FilmsPage}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`;

            if (FilmsYear !== '') {
                API_URL += `&year=${FilmsYear}`;
            }
            if (FilmsDistributor !== '') {
                API_URL += `&distributor=${FilmsDistributor}`;
            }
            if (FilmsSearchFilter !== '') {
                API_URL += `&search_title=${FilmsSearchFilter}`;
            }

            const response = await axios.get<MoviesAZResponse>(API_URL);

            if (response.data?.movies) {
                setFilmsListData(response.data.movies);
                setFilmsPages(response.data.max_page || 1);
                setFilmsTotalMovies(response.data.total_movies || 0);
            } else {
                setFilmsListData([]);
                setFilmsPages(1);
                setFilmsTotalMovies(0);
            }
        } catch (error) {
            console.error('Error loading films data:', error);
            setError('Failed to load films data. Please try again.');
            setFilmsListData([]);
            setFilmsPages(1);
        } finally {
            setLoading(false);
        }
    }, [FilmsPage, FilmsAlphabet, FilmsYear, FilmsDistributor, FilmsSearchFilter]);

    // Data arrays
    const alphanumericArray1 = [
        ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)),
        ...Array.from({ length: 10 }, (_, i) => i.toString())
    ];

    let yeararray = [...Array.from({ length: 9 }, (_, i) => (2026 - i).toString())];
    yeararray.push('2016-2000', '1999-1900');
    const distfilter = ['DIS', 'UNI', 'WB', 'PAR', 'SNY', 'LGF', 'AMZMGM', 'A24', '20TH', 'FOC'];

    const distfilterWithId = [
        { id: 993, name: 'DIS' },
        { id: 1102, name: 'UNI' },
        { id: 449, name: 'WB' },
        { id: 442, name: 'PAR' },
        { id: 1108, name: 'SNY' },
        { id: 1144, name: 'LGF' },
        { id: 143, name: 'AMZMGM' },
        { id: 1130, name: 'A24' },
        { id: 1052, name: '20TH' },
        { id: 1106, name: 'FOC' },
    ];
    /* { id: 1146, name: 'NEON' }, */

    const pageData = AZMoviesData.find(item => item.key.toLowerCase() === alphabet?.toLowerCase());
    const page_heading = pageData?.pageHeading;
    const page_content = pageData?.pageContent;
    const meta_title = pageData?.metaTitle;
    const meta_description = pageData?.metaDescription;


    // Generate JSON-LD schema
    const generateJsonLd = () => {
        const movieList = FilmsListData.map((item, index) => ({
            '@type': 'Movie',
            'position': index + 1,
            'name': item.title,
            'url': process.env.NEXT_PUBLIC_FRONTEND_URL + item.link,
        }));

        return {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'name': page_heading,
            'url': process.env.NEXT_PUBLIC_FRONTEND_URL + '/movies/a-z/' + alphabet,
            'description': page_content,
            'itemListElement': {
                '@type': 'ItemList',
                'name': 'Movies',
                'itemListElement': movieList
            },
        };
    };

    // Error boundary fallback
    if (error) {
        return (
            <>
                <HeadComponent data={data} />
                {/* <CategoryNavigation /> */}
                <section className='filmaz subfilmy'>
                    <div className='container container2'>
                        <div className='info_block'>
                            <div className='info_box printarea wtbg'>
                                <div className='text-center p-8'>
                                    <h2 className='text-red-600 mb-4'>Error Loading Data</h2>
                                    <p className='mb-4'>{error}</p>
                                    <button onClick={() => { setError(null); loadFilmsData(); }}
                                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' > Try Again </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <HeadComponent data={data} meta_title={meta_title} meta_description={meta_description} jsonSchema={generateJsonLd()} canonical_url={process.env.NEXT_PUBLIC_FRONTEND_URL + '/movies/a-z/' + alphabet + '/'} />
            <section className='filmaz  alldist_list py-4 lg:py-8'>
                <div className='container container2'>
                    <div className='info_block'>
                        <div className='info_box printarea wtbg'>
                            <div className='top_txt middletitle_print'>
                                <div className='top_info'>
                                    <div className='page_introbox text-center'>
                                        <h1 className='h2'>{page_heading}</h1>
                                        <p>{page_content}</p>
                                    </div>
                                </div>
                                <div className='downloadbtn'>
                                    <span className='pritbtn'>Print</span>
                                </div>
                            </div>
                            <div className='info_txt printbox'>
                                <div className='filmaztable tablebox flex flex-wrap gap-5'>
                                    <div className="tbledftside w-64 sticky top-0 lg:relative z-10 flex items-start tab_items">
                                        <div className={`bg-white lg:pt-0 lg:border-0 rounded-md overflow-y-auto lg:max-h-max max-h-screen absolute lg:relative transition-all duration-500 ${filtertoggle ? 'active p-2 border border-gray-200 w-full' : 'w-0 lg:w-auto overflow-hidden p-0'}`}>
                                            <div className="top_head flex items-center justify-between">
                                                <h5 className=''>Filter By Alphabet</h5>
                                                <p className='mb-2 mr-4 cursor-pointer' onClick={() => router.push('/movies/a-z')}>Clear</p>
                                            </div>
                                            <div className="filmaz_filter min-w-[238px]">
                                                <ul className="df fww">
                                                    {alphanumericArray1.map((item, index) => (
                                                        <li
                                                            className={`numa ${item === FilmsAlphabet ? 'active' : ''} ${loading || routeLoading ? 'disabled' : ''}`}
                                                            key={index}
                                                        >
                                                            <Link href={`/movies/a-z/${item}`}>
                                                                <button
                                                                    className="alpha-filter block w-full text-center py-2 px-3 hover:bg-gray-100"
                                                                    onClick={(e) => {
                                                                        if (loading || routeLoading) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    disabled={loading || routeLoading}
                                                                >
                                                                    {item}
                                                                </button>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="moviesbysrch ">
                                                <h5>Search By Title</h5>
                                                <div className='film_search_box'>
                                                    <input type='text' id='f_film_search' placeholder='Enter Movie Name' tabIndex={0} value={SearchFilms} onChange={(e) => { setSearchFilms(e.target.value) }} onKeyPress={onSearchFilmKeyPress} disabled={loading || routeLoading} />
                                                    <button onClick={onSearchFilmSubmit} disabled={loading || routeLoading} >
                                                        <i className='far fa-search'></i>
                                                    </button>
                                                </div>
                                                {/* {FilmsSearchDataLoaded && FilmsSearchData && FilmsSearchData.movies &&
                                          <div className='srchwrap'>
                                             {FilmsSearchData.movies.map((item, index) => (
                                                <div className='srch_films' tabIndex={1} key={index}>
                                                   <Link href={item.link.replace(process.env.NEXT_PUBLIC_BACKEND_URL || '', '')} className=' df fww'>
                                                      <div
                                                         className='srch_media bgimage'
                                                         style={{
                                                            background: 'url(' + item.img + ')',
                                                         }}></div>
                                                      <div className='srch_fliminfo'>
                                                         <h4>{item.title}</h4>
                                                         <p>{item.year}</p>
                                                         <p>{item.genre}</p>
                                                      </div>
                                                   </Link>
                                                </div>
                                             ))}
                                          </div>
                                       } */}
                                            </div>
                                            <div className="top_head flex items-center justify-between mt-5">
                                                <h5>Filter By Year</h5>
                                                <p className='mb-2 mr-4 cursor-pointer' onClick={() => setFilmsYear('')}>Clear</p>
                                            </div>
                                            <div className="yearfilters"><FilmFilter data={yeararray} tag='years' setSelectedValue={setSelectedValue} currentValue={FilmsYear} mobsize disabled={loading || routeLoading}
                                            /></div>
                                            <div className="top_head flex items-center justify-between">
                                                <h5>Filter By Distributor</h5>
                                                <p className='mb-2 cursor-pointer' onClick={() => { clearDistributorFilter() }}>Clear</p>
                                            </div>

                                            <FilmFilter
                                                data={distfilter}
                                                tag='distributors'
                                                setSelectedValue={setSelectedValue}
                                                currentValue={FilmsDistributorName}
                                                cls="w-1/2 text-sm flex"
                                                mobsize
                                                disabled={loading || routeLoading}
                                            />
                                            <div className='film_atoz_search -mt-6'>
                                                <div className='film_search_box'>
                                                    <input
                                                        type='text'
                                                        id='f_distributor_search'
                                                        placeholder='Enter Distributor Name'
                                                        tabIndex={0}
                                                        value={SearchDistributor}
                                                        onChange={onDistributorSearch}
                                                        disabled={loading || routeLoading}
                                                    />
                                                    <button disabled={loading || routeLoading}>
                                                        <i className='far fa-search'></i>
                                                    </button>
                                                    {DistributorSearchDataLoaded && DistributorSearchData && DistributorSearchData.search_list && DistributorSearchData.search_list.length > 0 && (
                                                        <div className='srchwrap distributor_search_result_data'>
                                                            {DistributorSearchData.search_list.map((item, index) => (
                                                                <div className='srch_films py-2 border-b border-gray-300 cursor-pointer' data-id={item.id} onClick={() => setSelectedDistributor(item)} tabIndex={1} key={index}>
                                                                    <div className='srch_fliminfodist'>
                                                                        <span>{item.title}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`filtercta my-2 rounded-md p-2 border border-gray-200 w-auto inline-block lg:hidden bg-white relative transition-all duration-500 ${filtertoggle ? 'left-64' : 'left-0'}`}
                                            onClick={() => setFilterToggle(!filtertoggle)}
                                        >
                                            {filtertoggle ? <FaFilter /> : <div className='flex'><FaFilter className='mt-1 text-sm' /> <strong className='pl-2'>Filter</strong></div>}

                                        </div>
                                    </div>
                                    <div className='w-full lg:w-[calc(100%-17.5rem)]'>
                                        {(loading || routeLoading) && (
                                            <div className="datatable_wrap">
                                                <div className='pvr container' style={{ marginTop: 40 }}>
                                                    <div className='lodarhight'>
                                                        <Loader />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {!loading && !routeLoading && FilmsListData && FilmsListData.length > 0 && (
                                            <div className="datatable_wrap">
                                                <p className='text-sm text-gray-500 mb-2'>Showing {(FilmsPage - 1) * 50 + 1} to {FilmsTotalMovies > (FilmsPage * 50) ? (FilmsPage * 50) : FilmsTotalMovies} of {FilmsTotalMovies} results</p>
                                                <table className='responsive dataTable w-full' id='film-datatable'>
                                                    <thead>
                                                        <tr>
                                                            <th data-title='Title'>Title</th>
                                                            <th data-title='Distributor'>Distributor</th>
                                                            <th data-title='Release year' className='text-center'>Release year</th>
                                                            <th data-title='Release date' className='text-center'>Release date</th>
                                                            <th data-title='Rating' className='text-center'>Rating</th>
                                                            <th data-title='Distribution Pattern' className='text-center'>Pattern</th>
                                                            <th data-title='Box Office Total' className='text-center'>Box Office Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {FilmsListData.map((item, index) => (
                                                            <tr className={`box-office-res-row ${(index % 2) === 0 ? 'even' : 'odd'}`} role='row' key={index}>
                                                                <td data-title='Title' style={tdStyle}>
                                                                    <h2 className='movtable_title mb-0'>
                                                                        <Link href={item.link?.replace(process.env.NEXT_PUBLIC_BACKEND_URL || '', '') || '#'} title={item.title}>
                                                                            <strong>{item.title}</strong>
                                                                        </Link>
                                                                    </h2>
                                                                </td>
                                                                <td data-title='Distributor' style={tdStyle}>
                                                                    <Link href={item.distributor_link?.replace(process.env.NEXT_PUBLIC_BACKEND_URL || '', '') || '#'} title={item.distributor}>
                                                                        <strong>{item.distributor}</strong>
                                                                    </Link>
                                                                </td>
                                                                <td data-title='Release year' style={tdStyle}>
                                                                    {item.release_year}
                                                                </td>
                                                                <td data-title='Release date' style={tdStyle}>
                                                                    {item.release_date}
                                                                </td>
                                                                <td data-title='Rating' style={tdStyle}>
                                                                    {item.rating}
                                                                </td>
                                                                <td data-title='Distribution Pattern' style={tdStyle}>
                                                                    <div dangerouslySetInnerHTML={{ __html: item.dist_pattern }} />
                                                                </td>
                                                                <td data-title='Box Office Total' style={tdStyle} suppressHydrationWarning>
                                                                    ${item.box_office_total ? parseInt(item.box_office_total).toLocaleString() : '0'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {!loading && !routeLoading && FilmsListData && FilmsListData.length === 0 && (
                                            <div className="datatable_wrap">
                                                <p>No data found for filter applied {FilmsAlphabet && <> Filter By Alphabet: <strong>{FilmsAlphabet.toUpperCase()}</strong></>} {FilmsYear && <> Filter By Year: <strong>{FilmsYear}</strong></>} {FilmsDistributor && <> Filter By Distributor: <strong>{SearchDistributor || FilmsDistributorName}</strong></>} {FilmsSearchFilter && <> Filter By Title: <strong>{FilmsSearchFilter}</strong></>}</p>
                                            </div>
                                        )}
                                        <div id='film_atoz_pag_nav ' className='lg:translate-y-2 lg:w-[calc(100%-480px)] lg:mx-auto min-h-10'>
                                            <Pagination
                                                totalPages={FilmsPages}
                                                setCurrentPage={setCurrentPage}
                                                requestFrom='films'
                                                currentPage={FilmsPage}
                                            />

                                        </div>
                                        {/* //button to go to MOvies A_Z page */}
                                        <div className='flex justify-between gap-4 flex-wrap lg:-mt-11'>
                                            <Link href='/movies/a-z' className='bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 btn'>Browse A–Z Movie Database</Link>
                                            {/* Dynamic Next Alphabet button - only for letters a-y, not for z or 0-9 */}
                                            {(() => {
                                                const currentAlphabet = alphabet?.toLowerCase();
                                                // Only show for letters a-y (not z and not 0-9)
                                                if (!currentAlphabet || currentAlphabet === 'z' || /[0-9]/.test(currentAlphabet)) {
                                                    return null;
                                                }

                                                const currentIndex = alphanumericArray1.findIndex(item => item.toLowerCase() === currentAlphabet);
                                                const nextIndex = currentIndex >= 0 && currentIndex < 25 ? currentIndex + 1 : null; // 25 is 'z' index
                                                const nextAlphabet = nextIndex !== null ? alphanumericArray1[nextIndex] : null;

                                                return nextAlphabet && (
                                                    <Link href={`/movies/a-z/${nextAlphabet}`} className='btn' >
                                                        Movies Starting with {nextAlphabet.toUpperCase()}
                                                    </Link>
                                                );
                                            })()}
                                        </div>
                                        <HomePageAds cls='ads_970 my-4' format='horizontal' />
                                    </div>
                                </div>

                            </div>

                        </div>





                    </div>
                </div>
            </section>
        </>
    );
};

export default Films; 