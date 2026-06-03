import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Theatre from '../../../components/DetailPages/Theatre';
import Page404 from '../../../components/Page404';
import HeadComponent from '@/components/HeadComponent';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import { GetStaticProps, GetStaticPaths } from 'next';

interface SEOData {
    tag?: unknown[] | null;
    children?: unknown[];
    [key: string]: any;
}

interface DetailsData {
    error?: string;
    title?: string;
    logo?: string;
    phone_no?: string;
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
    [key: string]: any;
}

interface JsonLdAddress {
    '@type': string;
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
}

interface JsonLd {
    '@context': string;
    '@type': string;
    name?: string;
    image?: string;
    url?: string;
    telephone?: string;
    priceRange?: string;
    address?: JsonLdAddress;
}

interface TheatreDetailsPageProps {
    SEOdata: SEOData;
    DetailsData: DetailsData;
    id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
};

// export async function getStaticProps(context) {
//   const { params } = context;
//   const id = params.id;

//   try {
//     // Fetch SEO data
//     const seoRes = await fetch(`${process.env.NEXT_PUBLIC_SEO_LINK}theatres/${id}`);
//     const SEOdata = seoRes.ok ? await seoRes.json() : { tag: [], children: [] };

//     // Fetch details data
//     const detailsRes = await fetch(
//       `${process.env.NEXT_PUBLIC_SD_API}/detail_pages/exhibitors-theatres.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/theatres/${id}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`
//     );
//     const DetailsData = detailsRes.ok ? await detailsRes.json() : { data: [], error: '' };

//     return {
//       props: {
//         SEOdata,
//         DetailsData,
//         id,
//         error: null,
//       },
//       revalidate: 60,
//     };
//   } catch (error) {
//     console.error('getStaticProps error:', error);
//     return {
//       props: {
//         SEOdata: { tag: [], children: [] },
//         DetailsData: { data: [], error: '' },
//         id,
//         error: {
//           message: 'Failed to load data. Please try again later.',
//           code: 'FETCH_ERROR'
//         },
//       },
//       revalidate: 60,
//     };
//   }
// }

export const getStaticProps: GetStaticProps<TheatreDetailsPageProps> = async (context) => {
    const { params } = context;
    const id = params?.id as string;

    // Fetch data from external API
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'theatres/' + id);
    const SEOdata: SEOData = await res.json();

    // static data
    const DetailsDataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/exhibitors-theatres.php?url=' + process.env.NEXT_PUBLIC_BACKEND_URL + '/theatres/' + id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const DetailsData: DetailsData = await DetailsDataResponse.json();

    return {
        //
        props: { SEOdata, DetailsData, id },
        revalidate: 10, // In seconds
    };
};

const TheatreDetailsPage = ({ SEOdata, DetailsData, id }: TheatreDetailsPageProps) => {
    // if (error) {
    //   return <ErrorDisplay error={error} />;
    // }
    if (DetailsData.error === 'Page Not Found!' || SEOdata.tag === null) {
        return (
            <>
                <Head>
                    <meta name='robots' content='noindex' />
                </Head>
                <Page404 />
            </>
        );
    }
    const jsonLd: JsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: DetailsData.title,
        image: DetailsData.logo,
        // '@id': DetailsData.id,
        url: 'https://screendollars.com/theatres/' + id + '/',
        telephone: DetailsData.phone_no,
        priceRange: '$',
        address: {
            '@type': 'PostalAddress',
            streetAddress: DetailsData.streetAddress,
            addressLocality: DetailsData.addressLocality,
            addressRegion: DetailsData.addressRegion,
            postalCode: DetailsData.postalCode,
            addressCountry: DetailsData.addressCountry,
        },
    };

    const router = useRouter();
    const qrclaim = router.query.qrclaim;
    const [DetailsDataLoaded, setDetailsDataLoaded] = useState<boolean>(true);
    const [DetailData, setDetailsData] = useState<DetailsData>(DetailsData);
    const [showads, setShowAds] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const requestFromQRCode = localStorage.getItem('requestFromQRCode') || '';
        const claimURL = localStorage.getItem('claimURL') || '';
        if (requestFromQRCode === 'true' && claimURL === '/theatres/' + id + '/') {
            setShowAds(true);
        }
    }, [id]);

    useEffect(() => {
        if (qrclaim) {
            const fetchLatestClaimData = async () => {
                setDetailsDataLoaded(false);
                const DetailPageDataResponse = await fetch(
                    process.env.NEXT_PUBLIC_SD_API +
                    '/detail_pages/exhibitors-theatres.php?api_token=' +
                    process.env.NEXT_PUBLIC_API_TOKEN +
                    '&url=' +
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    '/theatres/' +
                    id +
                    '&timestamp=' +
                    new Date().getTime()
                );
                const DetailPageData: DetailsData = await DetailPageDataResponse.json();
                setDetailsData(DetailPageData);
                setDetailsDataLoaded(true);
            };
            fetchLatestClaimData();
            setShowAds(true);
        }
    }, [qrclaim, id]);

    return (
        <>
            {DetailsDataLoaded ? (
                <>
                    <HeadComponent data={SEOdata} jsonSchema={jsonLd} />
                    <Theatre data={DetailData} listingId={id} showads={showads} />
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
export default TheatreDetailsPage;

