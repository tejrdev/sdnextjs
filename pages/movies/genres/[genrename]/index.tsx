import axios from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import CustomSelect from '@/components/All/CustomSelect';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import Loader from '@/components/Loader';
import sdplaceholder2 from '@/public/images/sdplaceholder2.jpg';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import HeadComponent from '@/components/HeadComponent';

declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
}

const ORDER_OPTIONS = [
    { name: 'Release Date', value: 'release_date' },
    { name: 'Title', value: 'title' },
];

const MAX_AUTO_LOADS = 5;
const LOAD_MORE_ID = 'review-loadmore';
const PLACEHOLDER_IMAGES = [
    process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/uploads/2020/05/no-img.jpg',
    process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/themes/screendollars-live/assets/images/p_noimgico.png',
];

interface Genre {
    name: string;
    value: string;
}

interface MovieItem {
    id?: string | number;
    title: string;
    link?: string;
    img?: string | null;
    trailer_link?: string;
    watch_now?: string;
    watch_now_price?: string;
    release_year?: string;
    dis_title?: string;
    dis_title_link?: string;
    release_date?: string;
    pattern?: string;
    rating?: string;
    runtime?: string;
    primary_genre?: Genre[];
    [key: string]: any;
}

interface GenreInfo {
    movies: MovieItem[];
    genre_dropdown?: Record<string, string>;
    max_page?: number;
    [key: string]: any;
}

interface GenrePageProps {
    genreinfo?: GenreInfo;
    SEOdata?: { [key: string]: any };
    error?: { message: string; code: string } | null;
}

const hasMorePages = (maxPage: number | undefined, currentPage: number, movieCount: number) =>
    Number.isFinite(maxPage) ? (maxPage as number) > currentPage : movieCount > 0;

const getMovieImage = (img?: string | null) =>
    !img || img === '' || PLACEHOLDER_IMAGES.includes(img) ? sdplaceholder2.src : img;

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: [],
    fallback: 'blocking',
});

export const getStaticProps: GetStaticProps<GenrePageProps> = async (context) => {
    const genrename = context.params?.genrename as string;

    return getStaticPropsWithErrorHandling([
        {
            url: `${process.env.NEXT_PUBLIC_SEO_LINK}movies/genres/${genrename}`,
            key: 'SEOdata',
            defaultData: { children: [] },
        },
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/movie-genre/genre_movies.php?genre=${genrename}&order_choice=release_date&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'genreinfo',
            defaultData: { movies: [], genre_dropdown: {} },
        },
    ]);
};

const Genrename = ({ genreinfo, SEOdata, error }: GenrePageProps) => {
    if (error) return <ErrorDisplay error={error} />;

    const router = useRouter();
    const genrename = (router.query.genrename as string)?.toLowerCase() || '';

    const genreOptions = Object.entries(genreinfo?.genre_dropdown || {}).map(([, value]) => ({
        name: value as string,
        value: (value as string).toLowerCase(),
    }));

    const [movies, setMovies] = useState<MovieItem[]>(genreinfo?.movies || []);
    const [genreBy, setGenreBy] = useState(genrename || 'all');
    const [orderBy, setOrderBy] = useState('release_date');
    const [futureRelease, setFutureRelease] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [autoLoadCount, setAutoLoadCount] = useState(0);

    const pageRef = useRef(1);
    const autoLoadsRef = useRef(0);
    const wasVisibleRef = useRef(false);
    const fetchingRef = useRef(false);
    const skipSsrSyncRef = useRef(false);

    const resetPagination = () => {
        pageRef.current = 1;
        autoLoadsRef.current = 0;
        wasVisibleRef.current = false;
        setAutoLoadCount(0);
    };

    const fetchMovies = useCallback(async (page: number, append: boolean) => {
        if (fetchingRef.current) return;

        fetchingRef.current = true;
        setLoading(true);
        setHasMore(false);

        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SD_API}/movie-genre/genre_movies.php`, {
                params: {
                    genre: genreBy,
                    page_no: page,
                    order_choice: orderBy,
                    future_release: futureRelease,
                    api_token: process.env.NEXT_PUBLIC_API_TOKEN,
                },
            });

            const results = data.movies || [];
            setMovies((prev) => (append ? prev.concat(results) : results));
            pageRef.current = page;
            setHasMore(hasMorePages(Number(data.max_page), page, results.length));
        } catch (err) {
            console.log(err);
        } finally {
            fetchingRef.current = false;
            setLoading(false);
        }
    }, [genreBy, orderBy, futureRelease]);

    const loadNextPage = useCallback(() => {
        fetchMovies(pageRef.current + 1, true);
    }, [fetchMovies]);

    const handleSubmit = () => {
        skipSsrSyncRef.current = true;
        setMovies([]);
        resetPagination();
        setHasMore(false);

        if (genreBy !== genrename) {
            router.push(`/movies/genres/${genreBy}`, undefined, { scroll: false });
        }

        fetchMovies(1, false);
    };

    // Lowercase URL if needed
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const { pathname } = window.location;
        if (pathname !== pathname.toLowerCase()) {
            router.push(pathname.toLowerCase());
        }
    }, [router]);

    // Sync filters when route changes (direct nav / back button)
    useEffect(() => {
        if (!genrename) return;
        setGenreBy(genrename);
        resetPagination();
    }, [genrename]);

    // Apply SSR data on route change, unless submit already fetched client-side
    useEffect(() => {
        if (!genreinfo || fetchingRef.current) return;

        if (skipSsrSyncRef.current) {
            skipSsrSyncRef.current = false;
            return;
        }

        setMovies(genreinfo.movies || []);
        pageRef.current = 1;
        setHasMore(hasMorePages(genreinfo.max_page, 1, genreinfo.movies?.length ?? 0));
        setLoading(false);
    }, [genreinfo]);

    // Trailer popup bindings
    useEffect(() => {
        if (typeof window === 'undefined' || !window.$) return;

        const $ = window.$;
        $('.popvid , .popvidbox').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            iframe: {
                markup:
                    '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<div class="mgpiframwrap">' +
                    '<iframe class="mfp-iframe" id="videoiframe" frameborder="0" allow="autoplay; fullscreen" ></iframe>' +
                    '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'https://www.youtube.com/embed/%id%?enablejsapi=1',
                    },
                },
            },
            callbacks: {
                markupParse: (_template: any, values: any, item: any) => {
                    values.title = item.el.attr('title');
                },
                open: () => {
                    const iframe = $('.mfp-iframe-scaler').find('iframe');
                    iframe.prop('id', 'videoiframe');
                    const YouTubeIframeLoader = require('youtube-iframe');
                    YouTubeIframeLoader.load((YT: any) => {
                        new YT.Player('videoiframe', {
                            events: {
                                onReady: (e: any) => e.target.playVideo(),
                            },
                        });
                    });
                    $('body').addClass('popbopen');
                },
                close: () => $('body').removeClass('popbopen'),
            },
        });

        $('a.popvid , a.popvidgallery , a.popvidbox').each(function (this: HTMLElement) {
            const href = $(this).attr('href');
            if (href) {
                $(this).attr('href', href.replace('youtu.be/', 'www.youtube.com/watch?v='));
            }
        });
    }, [movies]);

    // Auto-load on scroll (up to MAX_AUTO_LOADS), then manual button only
    useEffect(() => {
        if (!hasMore || autoLoadsRef.current >= MAX_AUTO_LOADS) return;

        const target = document.getElementById(LOAD_MORE_ID);
        if (!target) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                wasVisibleRef.current = false;
                return;
            }
            if (wasVisibleRef.current || fetchingRef.current || autoLoadsRef.current >= MAX_AUTO_LOADS) return;

            wasVisibleRef.current = true;
            autoLoadsRef.current += 1;
            setAutoLoadCount(autoLoadsRef.current);
            loadNextPage();
        }, { threshold: 0.5 });

        observer.observe(target);
        return () => observer.disconnect();
    }, [hasMore, loadNextPage]);

    return (
        <>
            <HeadComponent data={SEOdata} />
            <AdminEditLink data={genreinfo} />
            <section className='genremovies subfilmy'>
                <div className='container'>
                    <div className='allviewfilters df fww gap-2'>
                        <div className='flex flex-col'>
                            <div className='select_filters hidden'>
                                <CustomSelect options={genreOptions} label='Primary Genre' id='f_genre' onSelect={setGenreBy} value={genreBy} />
                            </div>
                            <label htmlFor='GenreSelect' className='greytxt mb-1'>Primary Genre</label>
                            <select
                                id='GenreSelect'
                                className='form-select px-3 py-1 cursor-pointer border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white text-gray-700'
                                value={genreBy}
                                onChange={(e) => setGenreBy(e.target.value.toLowerCase())}
                            >
                                {genreOptions.map((item) => (
                                    <option value={item.value} key={item.value}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <div className='select_filters hidden'>
                                <CustomSelect options={ORDER_OPTIONS} label='Sort By' id='f_order' onSelect={setOrderBy} value={orderBy} />
                            </div>
                            <label htmlFor='SortBySelect' className='greytxt mb-1'>Sort By</label>
                            <select
                                id='SortBySelect'
                                className='form-select px-3 py-1 cursor-pointer border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white text-gray-700'
                                value={orderBy}
                                onChange={(e) => setOrderBy(e.target.value)}
                            >
                                {ORDER_OPTIONS.map((item) => (
                                    <option value={item.value} key={item.value}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='future cursor-pointer mt-2 sm:mt-8 mb-3 w-full sm:w-auto'>
                            <input type='checkbox' id='futurerls' checked={futureRelease} onChange={(e) => setFutureRelease(e.target.checked)} />
                            <label htmlFor='futurerls' className='capitalize cursor-pointer'>display future release</label>
                        </div>
                        <div className='filtersubmit'>
                            <button className='btn' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>

                    <div className='genremoviebox grid gap16' id='genre_movie_listing'>
                        {movies.map((item, index) => (
                            <div className='postermovieinfo' key={index}>
                                <figure className={'pvr ' + (item.trailer_link || item.watch_now ? '' : 'darkoff')}>
                                    <a href={item.link}>
                                        <Image src={getMovieImage(item.img)} width={190} height={281} alt='' className='objctimg_box' />
                                    </a>
                                    {(item.trailer_link || item.watch_now) && (
                                        <figcaption>
                                            {item.trailer_link && <a className='popvid' href={item.trailer_link}>Trailer</a>}
                                            {item.watch_now && (
                                                <a className='watchmh' href={item.watch_now} title='name'>
                                                    Watch Now
                                                    {item.watch_now_price && <span>({item.watch_now_price})</span>}
                                                </a>
                                            )}
                                        </figcaption>
                                    )}
                                </figure>
                                <div className='postermovie_detail'>
                                    <h5>
                                        <Link href={item.link || '#'}><strong>{item.title}</strong></Link>
                                        {item.release_year && <span className='font-normal inline-block ml-1'>({item.release_year})</span>}
                                    </h5>
                                    {item.dis_title && (
                                        <Link href={item.dis_title_link || '#'} className='block mb-1 truncate' title={item.dis_title}>
                                            {item.dis_title}
                                        </Link>
                                    )}
                                    <div className='datwide mb-2 flex flex-wrap justify-between items-center my-2'>
                                        {item.release_date && <time className='mr-3 text-base my-1'>{item.release_date}</time>}
                                        {item.pattern && <p className='inline-block bg-gray-200 px-2 m-0 uppercase text-sm'>{item.pattern}</p>}
                                    </div>
                                    <div className='ratingtime df fww'>
                                        {item.rating && <div className='rating mt-1 mr-2'>{item.rating}</div>}
                                        {item.runtime && <div className='mb-1 mt-1'>{item.runtime}</div>}
                                    </div>
                                    {item.primary_genre && (
                                        <ul className='ml-0 mt-3 mb-0 list-none'>
                                            {item.primary_genre.map((genreItem, i) => (
                                                <li key={i} className='text-sm inline-block align-top mr-2 mb-2'>
                                                    <Link href={genreItem.value} className='cursor-pointer hover:no-underline px-3 rounded-3xl text-black capitalize border border-gray-500 pb-[2px] hover:bg-gray-100 hover:text-black'>
                                                        {genreItem.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {loading && (
                        <div className='managloading pvr container' style={{ marginBottom: 40 }}>
                            <div className='lodarhight'><Loader /></div>
                        </div>
                    )}
                    {hasMore && (
                        <div className='viewbtn'>
                            <div className='flex justify-center items-center py-5'>
                                <p
                                    id={LOAD_MORE_ID}
                                    className='btn cursor-pointer'
                                    onClick={autoLoadCount >= MAX_AUTO_LOADS ? loadNextPage : undefined}
                                >
                                    View More
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Genrename;
