import Head from 'next/head';
import Exhibitor from '../../../components/DetailPages/Exhibitor';
import Page404 from '../../../components/Page404';
import HeadComponent from '@/components/HeadComponent';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import { GetStaticProps, GetStaticPaths } from 'next';

interface SEOData {
    tag?: unknown[] | null;
    children?: unknown[];
    [key: string]: any;
}

interface DetailsData {
    data?: any[];
    error?: string;
    [key: string]: any;
}

interface ExhibitorDetailsPageProps {
    SEOdata: SEOData;
    DetailsData: DetailsData;
    id: string;
    error?: any;
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
//   // Fetch data from external API
//   const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'exhibitors/' + id);
//   const SEOdata = await res.json();
//   if (!SEOdata) {
//     return {
//       notFound: true,
//     };
//   }
//   //DetailsData  static data
//   let DetailsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/exhibitors-theatres.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&url=' + process.env.NEXT_PUBLIC_BACKEND_URL + '/exhibitors/' + id);
//   DetailsData = await DetailsData.json();

//   return {
//     props: { SEOdata, DetailsData, id },
//     revalidate: 10, // In seconds
//   };
// }

export const getStaticProps: GetStaticProps<ExhibitorDetailsPageProps> = async (context) => {
    const { params } = context;
    const id = String(params?.id || '');

    const defaultData = {
        DetailsData: {
            data: [],
            error: '',
        },
    };

    const fetchConfigs = [
        {
            url: `${process.env.NEXT_PUBLIC_SEO_LINK}exhibitors/${id}`,
            key: 'SEOdata',
            defaultData: { tag: [], children: [] },
        },
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/detail_pages/exhibitors-theatres.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/exhibitors/${id}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'DetailsData',
            defaultData: defaultData.DetailsData,
        },
    ];

    const config: any = await getStaticPropsWithErrorHandling(fetchConfigs);
    config.props.id = id; // Add id to props
    return config;
};

const ExhibitorDetailsPage = ({ SEOdata, DetailsData, id, error }: ExhibitorDetailsPageProps) => {
    if (error) {
        return <ErrorDisplay error={error} />;
    }
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
    return (
        <>
            <HeadComponent data={SEOdata} />
            <Exhibitor data={DetailsData} listingId={id} />
        </>
    );
};
export default ExhibitorDetailsPage;

