import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// import Gallery from '@/components/DetailPages/Gallery';
import ProductData from '@/components/DetailPages/Vendor/ProductData.js';
// import Claimlisting from '@/components/DetailPages/Claimlisting';
import Page404 from '@/components/Page404';
// import Promoimg from '@/components/DetailPages/Promoimg';
import HeadComponent from '@/components/HeadComponent';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import Spotlight from '@/components/DetailPages/Vendor/Spotlight';
// import PressRelease from '@/components/DetailPages/Vendor/PressRelease';
import { GetStaticProps, GetStaticPaths } from 'next';
// import DirectoryInfo from '@/components/DetailPages/DirectoryInfo';
import TheaterInfo from '@/components/DetailPages/Theatre/TheaterInfo';
import TheaterSocial from '@/components/DetailPages/Theatre/TheaterSocial';
import TheaterHero from '@/components/DetailPages/Theatre/TheaterHero';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';

const API_URL = process.env.NEXT_PUBLIC_SD_API;

interface SEOData {
    tag?: unknown[] | null;
    children?: unknown[];
    [key: string]: any;
}

interface VendorDetailsData {
    error?: string;
    tag?: unknown[] | null;
    id?: string | number;
    title?: string;
    is_claimed?: string | boolean;
    is_claimed_under_process?: string | boolean;
    products_services_data?: any;
    spolight_data?: any[];
    gallery_images?: any[];
    promo_imgs?: any;
    [key: string]: any;
}

interface VendorProps {
    SEOdata: SEOData;
    VendorDetailsData: VendorDetailsData;
    id: string;
    error?: {
        message: string;
        code: string;
    } | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
};

export const getStaticProps: GetStaticProps<VendorProps> = async (context) => {
    const { params } = context;
    const id = params?.id as string;

    const defaultData = {
        VendorDetailsData: {
            data: [],
            error: '',
        },
    };

    const fetchConfigs = [
        {
            url: `${process.env.NEXT_PUBLIC_SEO_LINK}vendors/${id}`,
            key: 'SEOdata',
            defaultData: { tag: [], children: [] },
        },
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/detail_pages/vendors.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/vendors/${id}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'VendorDetailsData',
            defaultData: defaultData.VendorDetailsData,
        },
    ];

    const config: any = await getStaticPropsWithErrorHandling(fetchConfigs);
    config.props.id = id; // Add id to props
    return config;
};

const Vendor = ({ SEOdata, VendorDetailsData, id, error }: VendorProps) => {
    if (error) {
        return <ErrorDisplay error={error} />;
    }
    const [favData, setFavData] = useState<number>(0);
    const router = useRouter();
    const qrclaim = router.query.qrclaim;
    const [DetailsDataLoaded, setDetailsDataLoaded] = useState<boolean>(true);
    const [DetailData, setDetailsData] = useState<VendorDetailsData>(VendorDetailsData);

    // Dummy press release data
    const dummyPressReleaseData = [
        {
            title: 'New Product Launch Announcement',
            img_url: 'https://picsum.photos/390/550?random=1',
            link: '#'
        },
        {
            title: 'Partnership with Major Studio',
            img_url: 'https://picsum.photos/390/550?random=2',
            link: '#'
        },
        {
            title: 'Industry Award Recognition',
            img_url: 'https://picsum.photos/390/550?random=3',
            link: '#'
        },
        {
            title: 'Technology Innovation Update',
            img_url: 'https://picsum.photos/390/550?random=4',
            link: '#'
        }
    ];

    useEffect(() => {
        if (qrclaim) {
            const fetchLatestClaimData = async () => {
                setDetailsDataLoaded(false);
                const DetailPageDataResponse = await fetch(
                    process.env.NEXT_PUBLIC_SD_API +
                    '/detail_pages/vendors.php?api_token=' +
                    process.env.NEXT_PUBLIC_API_TOKEN +
                    '&url=' +
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    '/vendors/' +
                    id +
                    '&timestamp=' +
                    new Date().getTime()
                );
                const DetailPageData: VendorDetailsData = await DetailPageDataResponse.json();
                setDetailsData(DetailPageData);
                setDetailsDataLoaded(true);
            };
            fetchLatestClaimData();
        }
    }, [qrclaim, id]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const LOGGED_EMAIL = localStorage.getItem('email');
        const getFavLists = () => {
            const fav_saveurl = API_URL + '/login/favorite_get_all.php';
            axios
                .get(fav_saveurl, {
                    params: {
                        email: window.btoa(LOGGED_EMAIL || ''),
                        fav_type: window.btoa('fav_vendors'),
                        fav_id: window.btoa(String(DetailData.id || '')),
                    },
                })
                .then((res) => {
                    setFavData(res.data);
                })
                .catch((err) => console.log('Vendors lists error ', err));
        };
        getFavLists();
    }, [DetailData.id]);

    if (DetailData.error === 'Page Not Found!' || DetailData.tag === null) {
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
            {DetailsDataLoaded ? (
                <>
                    <HeadComponent data={SEOdata} />
                    <AdminEditLink data={DetailData} />
                    <TheaterHero listingId={id} listingType='vendors' data={DetailData} />
                    <TheaterSocial data={DetailData} />
                    <TheaterInfo data={DetailData} listingType='vendors' />
                    {/* <DirectoryInfo listingId={id} listingType='vendors' data={DetailData} requestfrom='VendorDetails' favoriteList={favData} />
                    <Claimlisting listingId={id} listingType='vendors' listing_title={DetailData.title} claimed={DetailData.is_claimed} is_claimed_under_process={DetailData.is_claimed_under_process} /> */}
                    {DetailData.products_services_data && <ProductData data={DetailData} />}
                    {DetailData.spolight_data && DetailData.spolight_data.length > 0 && <Spotlight data={DetailData.spolight_data} />}
                    {/* <PressRelease data={dummyPressReleaseData} /> 
                    {DetailData?.gallery_images && DetailData.gallery_images.length > 0 ? <Gallery data={DetailData.gallery_images} title={DetailData.title} /> : null}
                    {DetailData.promo_imgs && <Promoimg data={DetailData.promo_imgs} />}*/}
                </>
            ) : (
                <div className='nowshow_sliderbox pvr' style={{ minHeight: 200, marginBottom: 20 }}>
                    <div className='secloder'>
                        <div className='secspinner'></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Vendor;

