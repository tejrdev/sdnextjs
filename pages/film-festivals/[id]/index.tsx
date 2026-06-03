import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import DirectoryInfo from '@/components/DetailPages/DirectoryInfo';
import NewsUpdate from '@/components/FilmData/FilmDetail/NewsUpdate';
import FilmFestivals from '@/components/DetailPages/FilmFestival/FilmFestivals';
import Gallery from '@/components/DetailPages/Gallery';
import Page404 from '@/components/Page404';
import Claimlisting from '@/components/DetailPages/Claimlisting';
import Promoimg from '@/components/DetailPages/Promoimg';
import DetailAwards from '@/components/DetailPages/FilmFestival/DetailAwards';
import DetailMview from '@/components/DetailPages/FilmFestival/DetailMview';
import Publication from '@/components/DetailPages/Publication';
import HeadComponent from '@/components/HeadComponent';
import { GetStaticProps, GetStaticPaths } from 'next';
import TheaterHero from '@/components/DetailPages/Theatre/TheaterHero';
import TheaterSocial from '@/components/DetailPages/Theatre/TheaterSocial';
import TheaterInfo from '@/components/DetailPages/Theatre/TheaterInfo';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';

// Declare jQuery as global
declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
}

const $ = typeof window !== 'undefined' ? window.jQuery || window.$ : require('jquery');
const API_URL = process.env.NEXT_PUBLIC_SD_API;

interface SEOData {
    tag?: unknown[] | null;
    children?: unknown[];
    [key: string]: any;
}

interface FilmFestivalItem {
    [key: string]: any;
}

interface FilmFestivalDetailsData {
    id?: string | number;
    title?: string;
    error?: string;
    tag?: unknown[] | null;
    is_claimed?: string | boolean;
    is_claimed_under_process?: string | boolean;
    film_festivals?: FilmFestivalItem[];
    gallery_images?: any[];
    promo_imgs?: any;
    award_list?: any;
    review_list?: any[];
    news?: any[];
    [key: string]: any;
}

interface FilmFestivalProps {
    SEOdata: SEOData;
    FilmFestivalDetailsData: FilmFestivalDetailsData;
    id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
};

export const getStaticProps: GetStaticProps<FilmFestivalProps> = async (context) => {
    const { params } = context;
    const id = String(params?.id || '');

    // Fetch data from external API
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'film-festivals/' + id);
    const SEOdata = await res.json();
    if (!SEOdata) {
        return {
            notFound: true,
        };
    }
    //FilmFestivalDetailsData  static data
    let FilmFestivalDetailsResponse = await fetch(
        process.env.NEXT_PUBLIC_SD_API + '/detail_pages/film_festival.php?url=' + process.env.NEXT_PUBLIC_BACKEND_URL + '/film-festivals/' + id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
    );
    const FilmFestivalDetailsData: FilmFestivalDetailsData = await FilmFestivalDetailsResponse.json();

    return {
        props: { SEOdata, FilmFestivalDetailsData, id },
        revalidate: 10, // In seconds
    };
};

const FilmFestival = ({ SEOdata, FilmFestivalDetailsData, id }: FilmFestivalProps) => {
    const [favData, setFavData] = useState<number>(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const LOGGED_EMAIL = localStorage.getItem('email');
        const getFavLists = () => {
            const fav_saveurl = API_URL + '/login/favorite_get_all.php';
            axios
                .get(fav_saveurl, {
                    params: {
                        email: window.btoa(LOGGED_EMAIL || ''),
                        fav_type: window.btoa('fav_filmfestivals'),
                        fav_id: window.btoa(String(FilmFestivalDetailsData.id || '')),
                    },
                })
                .then((res) => {
                    setFavData(res.data);
                })
                .catch((err) => console.log('Film Festivals lists error ', err));
        };
        getFavLists();
    }, [FilmFestivalDetailsData.id]);

    useEffect(() => {
        if (typeof window === 'undefined' || !$) return;

        $('.readmore_view').on('click', function () {
            $(this).parents('.opencol_info').find('.topread_open').show();
            $(this).parents('.opencol_info').find('.topread_view').hide();
            $(this).hide();
        });

        let totalHeight = 0;
        $('.openletterbox .opencol_info')
            .children()
            .each(function () {
                totalHeight = totalHeight + $(this).outerHeight(true);
            });
        if (totalHeight > 375) {
            $('.openletterbox  .opencol .opencol_info .topread_view').css('height', '332px');
            $('.openletterbox  .opencol .readmore_btn').click(function () {
                $(this).parent().toggleClass('open');
                $(this).hide();
            });
        }
    }, []);

    if (FilmFestivalDetailsData.error === 'Page Not Found!' || FilmFestivalDetailsData.tag === null) {
        return (
            <>
                <Head>
                    <meta name='robots' content='noindex' />
                </Head>
                <Page404 />
            </>
        );
    }
    return (
        <>
            <HeadComponent data={SEOdata} />
            <AdminEditLink data={FilmFestivalDetailsData} />
            <TheaterHero listingId={id} listingType='film-festivals' data={FilmFestivalDetailsData} />
            <TheaterSocial data={FilmFestivalDetailsData} />
            <TheaterInfo data={FilmFestivalDetailsData} listingType='film-festivals' />
            {/* <DirectoryInfo listingId={id} listingType='film-festivals' data={FilmFestivalDetailsData} requestfrom='filmfestival' favoriteList={favData} />
            <Claimlisting listingId={id} listingType='film-festivals' listing_title={FilmFestivalDetailsData.title} claimed={FilmFestivalDetailsData.is_claimed} is_claimed_under_process={FilmFestivalDetailsData.is_claimed_under_process} /> */}
            {FilmFestivalDetailsData.film_festivals ? (
                <>
                    {FilmFestivalDetailsData?.film_festivals.map((item, index) => {
                        return <FilmFestivals data={item} data_2={''} key={index} />;
                    })}
                </>
            ) : null}
            {/* <UserComments /> */}
            {/* {FilmFestivalDetailsData?.gallery_images && FilmFestivalDetailsData.gallery_images.length > 0 ? <Gallery data={FilmFestivalDetailsData.gallery_images} title={FilmFestivalDetailsData.title} /> : null} */}
            {/* {FilmFestivalDetailsData.promo_imgs && <Promoimg data={FilmFestivalDetailsData.promo_imgs} />} */}
            {FilmFestivalDetailsData.award_list && <DetailAwards data={FilmFestivalDetailsData.award_list} />}
            {FilmFestivalDetailsData.review_list && FilmFestivalDetailsData.review_list.length > 0 && <DetailMview data={FilmFestivalDetailsData.review_list} />}
            {/* convarted dailies to Publication section */}
            {/* {FilmFestivalDetailsData?.film_festivals[0]?.festival_dailies.length > 0 && <Publication data={FilmFestivalDetailsData?.film_festivals[0]?.festival_dailies} />} */}
            {FilmFestivalDetailsData.news && FilmFestivalDetailsData.news.length > 1 && <NewsUpdate data={FilmFestivalDetailsData.news} />}
        </>
    );
};

export default FilmFestival;

