import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';

import FilmCalendar from '../../../components/DetailPages/Distributor/FilmCalendar';
import NewsUpdate from '../../../components/FilmData/FilmDetail/NewsUpdate';
import Page404 from '../../../components/Page404';
import Promoimg from '@/components/DetailPages/Promoimg';
import HeadComponent from '../../../components/HeadComponent';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import TheaterHero from '@/components/DetailPages/Theatre/TheaterHero';
import TheaterSocial from '@/components/DetailPages/Theatre/TheaterSocial';
import TheaterInfo from '@/components/DetailPages/Theatre/TheaterInfo';

const API_URL = process.env.NEXT_PUBLIC_SD_API;

type FilmCalendarData = {
    list: unknown[];
    total_page: number;
};

interface DistributorDetailsData {
    movies?: FilmCalendarData;
    id?: number;
    error?: string;
    tag?: unknown | null;
    title?: string;
    gallery_images?: unknown[];
    promo_imgs?: unknown[];
    news?: unknown[];
    is_claimed?: boolean;
    is_claimed_under_process?: boolean;
}

interface SEOData {
    tag?: unknown[];
    children?: unknown[];
}

interface DistributorProps {
    SEOdata?: SEOData;
    DistributorDetailsData?: DistributorDetailsData;
    id?: string;
    error?: { message: string; code: string } | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
};

export const getStaticProps: GetStaticProps<DistributorProps> = async (context) => {
    const { params } = context;
    const id = params?.id as string;

    if (!id) {
        return {
            notFound: true,
        };
    }

    const defaultData = {
        DistributorDetailsData: {
            data: [],
            error: '',
        },
    };

    const fetchConfigs = [
        {
            url: `${process.env.NEXT_PUBLIC_SEO_LINK}distributors/${id}`,
            key: 'SEOdata',
            defaultData: { tag: [], children: [] },
        },
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/detail_pages/distributors_detail.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/distributors/${id}&page_no=1&order_choice=releasedate&undated=true&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'DistributorDetailsData',
            defaultData: defaultData.DistributorDetailsData,
        },
    ];

    const config = await getStaticPropsWithErrorHandling(fetchConfigs);
    config.props.id = id; // Add id to props
    return config;
};

const Distributor = ({ SEOdata, DistributorDetailsData, id, error }: DistributorProps) => {
    if (error && error.message && error.code) {
        return <ErrorDisplay error={error} />;
    }
    const [favData, setFavData] = useState(0);

    useEffect(() => {
        var LOGGED_EMAIL = localStorage.getItem('email');
        const getFavLists = () => {
            var fav_saveurl = API_URL + '/login/favorite_get_all.php';
            axios
                .get(fav_saveurl, {
                    params: {
                        email: window.btoa(LOGGED_EMAIL || ''),
                        fav_type: window.btoa('fav_dist_listing'),
                        fav_id: window.btoa(String(DistributorDetailsData?.id || '')),
                    },
                })
                .then((res) => {
                    setFavData(res.data);
                })
                .catch((err) => console.log('Distributor lists error ', err));
        };
        getFavLists();
    }, []);

    if (DistributorDetailsData?.error === 'Page Not Found!' || DistributorDetailsData?.tag === null) {
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
            <AdminEditLink data={DistributorDetailsData} />
            <TheaterHero listingId={id} listingType='theatres' data={DistributorDetailsData} />
            <TheaterSocial data={DistributorDetailsData} />
            <TheaterInfo data={DistributorDetailsData} listingType='distributors' />

            <FilmCalendar
                distributorId={id as string}
                title={DistributorDetailsData?.title as string}
            />
            {DistributorDetailsData?.promo_imgs && <Promoimg data={DistributorDetailsData.promo_imgs} />}
            {DistributorDetailsData?.news && DistributorDetailsData.news.length > 0 && <NewsUpdate data={DistributorDetailsData.news} />}
        </>
    );
};

export default Distributor;

