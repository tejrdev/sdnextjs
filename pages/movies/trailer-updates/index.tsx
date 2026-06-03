import { useEffect } from 'react';
import Link from 'next/link';
import AddToAny from '../../../components/AddToAny';
import HomePageAds from '../../../components/Homepage/HomePageAds';
import CategoryNavigation from '../../../components/FilmData/DetailPages/CategoryNavigation';
import HeadComponent from '@/components/HeadComponent';
import { GetStaticProps } from 'next';

// Declare jQuery as global
declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
}

interface SEOData {
    tag?: unknown[];
    children?: unknown[];
    [key: string]: any;
}

interface Genre {
    name: string;
    value: string;
}

interface MovieImage {
    url: string;
    filename: string;
}

interface MovieListItem {
    title: string;
    trailer_link?: string;
    img: MovieImage;
    link?: string;
    release_year?: string;
    rating?: string;
    runtime?: string;
    primary_genre?: Genre[];
    release_date?: string;
    distribution_pattern?: string;
    distributor_link?: string;
    distributor_title?: string;
    director?: string;
    cast?: string;
    synopsis?: string;
    trailer_notes?: string;
    [key: string]: any;
}

interface TrailerUpdatesData {
    title?: string;
    movie_list?: MovieListItem[];
    [key: string]: any;
}

interface TrailerUpdatesProps {
    data: SEOData;
    TrailerUpdatesData: TrailerUpdatesData;
}

export const getStaticProps: GetStaticProps<TrailerUpdatesProps> = async () => {
    // Fetch data from external API
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'movies/trailer-updates');
    const data: SEOData = await res.json();

    //TrailerUpdatesData static data
    const TrailerUpdatesDataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/trailer_updates.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const TrailerUpdatesData: TrailerUpdatesData = await TrailerUpdatesDataResponse.json();

    return {
        props: { data, TrailerUpdatesData },
        revalidate: 10,
    };
};

const TrailerUpdates = ({ data, TrailerUpdatesData }: TrailerUpdatesProps) => {
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
                    //'<div class="mfp-title">Some caption</div></div>'+
                    '</div>',

                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        //src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1&mute=1',
                        //src: "//www.youtube.com/embed/%id%?rel=0&autoplay=1",
                        src: 'https://www.youtube.com/embed/%id%?enablejsapi=1',
                    },
                },
            },
            callbacks: {
                markupParse: function (template: any, values: any, item: any) {
                    values.title = item.el.attr('title');
                },
                open: function () {
                    const iframe = $('.mfp-iframe-scaler').find('iframe');
                    iframe.prop('id', 'videoiframe');
                    const YouTubeIframeLoader = require('youtube-iframe');
                    YouTubeIframeLoader.load(function (YT: any) {
                        const player = new YT.Player('videoiframe', {
                            events: {
                                onReady: function (e: any) {
                                    e.target.playVideo();
                                },
                                onStateChange: function (e: any) {
                                    if (e.data === YT.PlayerState.ENDED) {
                                        //instance.close();
                                    }
                                },
                            },
                        });
                    });
                    $('body').addClass('popbopen');
                },
                close: function () {
                    $('body').removeClass('popbopen');
                },
            },
        });
    }, []);

    return (
        <>
            <HeadComponent data={data} />
            {/* <CategoryNavigation /> */}
            <section className='trailers subfilmy sidebar_block printarea'>
                <div className='container'>
                    <div className='info_block'>
                        <div className='top_txt middletitle_print'>
                            <div className='top_info'>
                                <h2 className='h3'>{TrailerUpdatesData.title}</h2>
                            </div>
                            <div className='downloadbtn'>
                                <span className='pritbtn'>Print</span>
                            </div>
                        </div>
                    </div>
                    <div className='adssidebar df fww'>
                        <div className='info_block'>
                            <div className='info_box '>
                                <div className='info_txt'>
                                    <div className='filmdtl_block '>
                                        {TrailerUpdatesData?.movie_list && TrailerUpdatesData?.movie_list?.length > 0 &&
                                            TrailerUpdatesData.movie_list.map((item, index) => {
                                                return (
                                                    <div className='filmdtl_data' key={index}>
                                                        <div className='filmdtl_dataimg'>
                                                            <a title='' className='popvid popyoutube' href={item.trailer_link || '#'}>
                                                                <figure>
                                                                    <img src={item.img.url} alt={item.img.filename} />
                                                                </figure>
                                                            </a>
                                                            <div className='front-show social_share hovered'>
                                                                <div className='share_ico'>
                                                                    <img src={process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/themes/screendollars/assets/images/shareico.png'} alt='' />
                                                                </div>
                                                                <AddToAny />
                                                            </div>
                                                        </div>
                                                        <div className='trailer_detail filmdata_info'>
                                                            <div className='filmdata_infotop'>
                                                                <div className='tril_head'>
                                                                    <h3>
                                                                        <a href={item.link || '#'} title={item.title}>
                                                                            {item.title}
                                                                            {item.release_year && <span className='font-normal'>{' (' + item.release_year + ')'}</span>}
                                                                        </a>
                                                                    </h3>
                                                                    <div className='trialer_duration'>
                                                                        <div className='flex flex-wrap text-sm mt-1 items-center space-x-2'>
                                                                            {/* {item.release_year && <li>{item.release_year}</li>} */}
                                                                            {item.rating && (
                                                                                <div className='tr_rate'>
                                                                                    <span className='bg-white px-2 py-[1px] border border-gray-400 inline-block m-0 rounded-md leading-snug'>{item.rating}</span>
                                                                                </div>
                                                                            )}
                                                                            <div className='tr_time'>{item.runtime && item.runtime}</div>
                                                                            {/* {item.genre_list && <li>{item.genre_list}</li>} */}
                                                                            {item?.primary_genre && item?.primary_genre?.length > 0 && (
                                                                                <div className='ml-0 mt-2 mb-0 list-none'>
                                                                                    {item?.primary_genre?.map((genreItem, i) => (
                                                                                        <div key={i} className='text-sm inline-block align-top mr-2 mb-2'>
                                                                                            <Link href={genreItem.value} className='cursor-pointer hover:no-underline px-3 rounded-3xl text-black capitalize border border-gray-500 pb-[2px] hover:bg-gray-200 hover:text-black tracking-wide'>
                                                                                                {genreItem.name}
                                                                                            </Link>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <div className='trailer_info'>
                                                                            <strong>Release Date:</strong>
                                                                            {item.release_date} {item.distribution_pattern && ' | ' + item.distribution_pattern}
                                                                        </div>
                                                                    </li>
                                                                    {item.distributor_link && (
                                                                        <li>
                                                                            <div className='trailer_info'>
                                                                                <strong>Distributor:</strong>
                                                                                <a href={item.distributor_link} title={item.distributor_title}>
                                                                                    <strong>{item.distributor_title}</strong>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    )}

                                                                    {item.director && (
                                                                        <li>
                                                                            <div className='trailer_info'>
                                                                                <strong>Director:</strong>
                                                                                {item.director}
                                                                            </div>
                                                                        </li>
                                                                    )}

                                                                    {item.cast && (
                                                                        <li>
                                                                            <div className='trailer_info'>
                                                                                <strong>Cast:</strong>
                                                                                {item.cast}
                                                                            </div>
                                                                        </li>
                                                                    )}
                                                                    <li>
                                                                        <div className='trailer_info'>
                                                                            <strong>Synopsis:</strong>
                                                                            <p>{item.synopsis}</p>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className='trailer_info noteslist'>
                                                                            <strong>Notes:</strong>
                                                                            {item.trailer_notes}
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sidebarbox'>
                            <div className='sidebarwrap'>
                                <HomePageAds cls='sideadsbox' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TrailerUpdates;

