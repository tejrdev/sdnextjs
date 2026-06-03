import { useEffect, useState, useRef } from 'react'
import snapbg from '@/public/images/snapbg.jpg'
import snapreleasebg from '@/public/images/snapreleasebg.jpg'
import snapselectbg from '@/public/images/snapselectbg.jpg'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import defaultMoviePoster from '@/public/images/sdplaceholder2.jpg';
import Link from 'next/link';

const MovieSnap = ({ initialData, currentMonth, currentYear }: { initialData: any, currentMonth: number, currentYear: number }) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const navigationMonths = monthNames.slice(currentMonth - 1, currentMonth + 5);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [snapData, setSnapData] = useState<any>(initialData);
    const [DataChanged, setDataChanged] = useState(false);
    const [genres, setGenres] = useState<any>([]);
    const [FilteredMovies, setFilteredMovies] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const updateGenres = (snapData: any) => {
        //genre logic
        let genres = snapData?.all_genre_list?.map((genre: string) => ({ name: genre, count: 0 })) || [];
        snapData?.movies?.forEach((movie: any) => {
            const movieGenre = movie?.primary_genres;
            if (!movieGenre) return;
            const genreObj = genres.find((g: any) => g.name.toLowerCase() === movieGenre.trim().toLowerCase());
            if (genreObj) {
                genreObj.count++;
            }
        });
        // console.log('genres', genres);
        //by default select movie with max count of genre
        if (genres?.length > 0) {
            const maxCountGenre = genres?.reduce((max: any, genre: any) => genre.count > max.count ? genre : max, genres[0]);
            setSelectedGenre(maxCountGenre?.name);
        }

        //sort genre by count in descending order and then by name in ascending order
        genres.sort((a: any, b: any) => b.count - a.count || a.name.localeCompare(b.name));
        return genres;
    }
    // Update monthlyData when initialData changes (from parent fetch)
    useEffect(() => {
        if (initialData) {
            setSnapData(initialData);
            setGenres(updateGenres(initialData));
        }
    }, [initialData]);

    // Update snapData when selectedGenre changes
    useEffect(() => {
        if (snapData) {
            //filter movies by genre
            const filteredMovies = snapData?.movies?.filter((movie: any) => movie?.primary_genres?.toLowerCase() === selectedGenre?.toLowerCase());
            setFilteredMovies(filteredMovies);
        }
    }, [selectedGenre, snapData]);

    useEffect(() => {
        const fetchSnapData = async () => {
            try {
                setLoading(true);
                const SnapDataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/upcoming-movies_y_m.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&a_year=' + currentYear + '&a_month=' + selectedMonth);
                const SnapData = await SnapDataResponse.json();
                setSnapData(SnapData);
                setGenres(updateGenres(SnapData));
            } catch (error) {
                console.error('Error fetching snap data:', error);
            } finally {
                setLoading(false);
            }
        }
        if (DataChanged) {
            fetchSnapData();
            setDataChanged(false);
        }

    }, [selectedMonth]);

    const SliderSettings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        arrows: false,
        dots: true,
        speed: 300,
        centerPadding: '0',
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ]
    }
    const filterByGenre = (genre: string) => {
        setSelectedGenre(genre);
    }

    const [startCount, setStartCount] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });
    useEffect(() => {
        if (inView) {
            setStartCount(true);
        }
    }, [inView]);
    return (
        <section className="upcoming-moviesnap py-10 lg:py-14 text-white bg-stone-900 relative z-[1]">
            <div className="moviesnapbg">
                <img src={snapbg.src} alt="Movie Snap" className="w-full h-full object-cover absolute top-0 left-0 z-[-2]" />
                <div className="imgfig bg-black/90 absolute top-0 left-0 w-full h-full z-[-1]"></div>
            </div>
            <div className="container">
                <h2>Upcoming Movie Snapshot</h2>
                <div className="topblock mb-5">
                    <div className="rounded-xl border border-gray-400 bg-black/80    flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 lg:p-6 xl:px-11 xl:pr-32 relative z-[2]">
                        <div className="releasebg absolute top-0 left-0 w-full h-full z-[-2]">
                            <img src={snapreleasebg.src} alt="Release Background" className="w-full h-full object-cover absolute top-0 left-0 z-[-2] rounded-xl" />
                        </div>
                        <div className="flex items-center gap-2">
                            <a
                                href="/movies/release-schedule?requestFrom=upcoming-movies">
                                <span className="text-4xl sm:text-4xl lg:text-5xl font-bold text-orangegold hover:text-white" ref={ref}>
                                    {startCount && <CountUp start={2} end={parseInt(snapData.future_movie)} duration={3} separator=',' />}
                                </span></a>
                            <span className="text-gray-300 text-lg sm:text-xl lg:text-[23px] font-bold">Future Releases</span>
                            <span className="group relative inline-flex items-center justify-center bg-white text-black rounded-full size-6 cursor-pointer ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>
                                <div className="absolute top-6 xl:-top-[80%] xl:left-10 right-0 sm:right-auto mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-[300px]">
                                    <div className="relative bg-gray-200 text-gray-800 rounded-lg px-4 py-2 shadow-lg  text-center">
                                        <div className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-gray-200 border-b-[8px] border-b-transparent hidden xl:block"></div>
                                        <div className="text-sm font-medium">{'Movies are added to this list when they are confirmed for release, but have not yet been released in theaters.'}</div>
                                    </div>
                                </div>
                            </span>
                        </div>
                        <a
                            href="/movies/release-schedule?requestFrom=upcoming-movies"
                            className="inline-block bg-orangegold hover:bg-gray-700 hover:text-white text-black font-medium px-6 py-1 rounded-full transition-all duration-300 shrink-0"
                        >
                            View Release Schedule
                        </a>
                    </div>
                </div>
                <div className="bottomblock">
                    <div className="rounded-xl border border-gray-400 bg-black/80 overflow-hidden flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 lg:p-6 relative z-[1]">
                        <div className="releasebg absolute top-0 left-0 w-full h-full z-[-2]">
                            <img src={snapselectbg.src} alt="Select Background" className="w-full h-full object-cover absolute top-0 left-0 z-[-2] rounded-xl" />
                        </div>
                        <div className="upnewreleases flex flex-wrap justify-between gap-4 w-full">
                            <div className="releasecounts w-full xl:w-[calc(100%-492px)]">
                                <div className="top_info">
                                    {/* <h2>Browse By Month</h2> */}
                                    <ul className="monthSelector bg-white rounded-full p-2 flex  flex-wrap gap-2 list-none mb-2 md:mb-3 ml-0 mt-3 md:mt-5
                    [&>li]:bg-stone-900 [&>li]:text-gray-300 [&>li]:cursor-pointer [&>li]:rounded-2xl [&>li]:px-2 [&>li]:py-1 [&>li]:capitalize 
                    [&>li:hover]:bg-orangegold [&>li:hover]:text-black [&>li]:min-w-12 [&>li]:text-center [&>li.active]:bg-orangegold [&>li.active]:text-black">
                                        {navigationMonths.map((month: string, index: number) => (
                                            <li key={index} className={selectedMonth === monthNames.indexOf(month) + 1 ? 'active' : ''} onClick={() => { setSelectedMonth(monthNames.indexOf(month) + 1); setDataChanged(true); }}>{month}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="topselect flex flex-wrap items-center gap-2">
                                    <div className="rounded-lg border border-gray-400 bg-black/80 px-3 py-1.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-orangegold inline-block">
                                        <a href="/movies/release-schedule?requestFrom=upcoming-movies" className="text-orangegold hover:text-white">
                                            {startCount && <CountUp start={2} end={parseInt(snapData.total_movies_month)} duration={3} separator=',' />}
                                        </a>
                                    </div>
                                    <span className="text-white font-bold sm:text-xl lg:text-[23px]">Future Releases</span>
                                </div>
                                {loading && (
                                    <div className="relative min-h-[100px] mt-6 flex items-center justify-center bg-transparent">
                                        <div className="w-12 h-12 rounded-full border-2 border-white border-t-transparent animate-spin" aria-hidden />
                                    </div>
                                )}
                                {!loading && (
                                    <div className="bottomselect mt-4 sm:mt-3 lg:mt-4">
                                        <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                                            {genres?.map((genre) => {
                                                const isActive = selectedGenre === genre.name
                                                return (
                                                    <li key={genre.name}>
                                                        <button
                                                            type="button"
                                                            onClick={() => filterByGenre(genre.name)}
                                                            className={`
                                                            inline-flex items-center gap-2 rounded-full border px-4 py-1 pl-9 transition-colors cursor-pointer blink min-w-[140px] justify-center relative
                                                            ${isActive
                                                                    ? 'bg-orangegold border-orangegold text-black'
                                                                    : ' border-gray-400 text-white hover:border-gray-300 hover:bg-black hover:text-white'
                                                                }
                                                        `}
                                                        >
                                                            <span className={`
                                                            inline-flex items-center justify-center min-w-[1.5rem] h-6 rounded-full text-base absolute top-[3px] left-1
                                                            ${isActive ? 'bg-black text-white' : ' text-black bg-white'}
                                                        `}>
                                                                {genre.count}
                                                            </span>
                                                            <span>{genre.name}</span>
                                                        </button>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            {!loading && (<>
                                {FilteredMovies?.length > 3 ? (
                                    <div className="snap_rotate xl:mx-0 mx-auto w-[230px] sm:w-[475px] mb-5">
                                        <Slider {...SliderSettings}>
                                            {FilteredMovies?.map((movie: any, index: number) => (
                                                <div className="slideitem" key={index}>
                                                    <Link href={movie.link} className='cursor-pointer'>
                                                        <div className="slideitem_img relative pb-[290px] sm:pb-[242px] rounded-xl border-2 border-gray-200 ">
                                                            <img src={movie.img != '' ? movie.img : defaultMoviePoster.src} alt={movie.title} className="w-full h-full object-cover absolute top-0 left-0 z-[-2] rounded-xl" />
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                ) : (
                                    <div className="snap_rotate xl:mx-0 mx-auto w-full xl:w-[475px] mb-5">
                                        <div className="w-full xl:w-[475px] flex flex-wrap gap-3 justify-center">
                                            {FilteredMovies?.map((movie: any, index: number) => (
                                                <div key={index} className="w-[30%] xl:w-[150px] sm:w-[230px]">
                                                    <Link href={movie.link} className='cursor-pointer'>
                                                        <div className="slick-slide_img relative xl:pb-[242px] sm:pb-[340px] pb-[150%]">
                                                            <img src={movie.img != '' ? movie.img : defaultMoviePoster.src} alt={movie.title} className="w-full h-full object-cover absolute top-0 left-0 z-[-2] rounded-xl" />
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MovieSnap