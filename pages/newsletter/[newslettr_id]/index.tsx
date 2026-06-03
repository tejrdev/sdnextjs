import Tabs from '@/components/All/Tabs';
import Tab from '@/components/All/Tabs';
import Head from 'next/head';
import Pagetitle from '@/components/Products/Pagetitle';
import HeadComponent from '@/components/HeadComponent';
import Page404 from '@/components/Page404';
import { GetStaticProps, GetStaticPaths } from 'next';

interface SEOData {
    tag?: unknown[] | null;
    error?: string;
    [key: string]: any;
}

interface ProData {
    title?: string;
    content?: string;
    news_letter_url?: string;
    news_letter_PDF?: string;
    film_tracking_PDF?: string;
    [key: string]: any;
}

interface NewsletterProps {
    Pro_data: ProData;
    data: SEOData;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
};

export const getStaticProps: GetStaticProps<NewsletterProps> = async (context) => {
    const { params } = context;
    const post_id = params?.newslettr_id as string;

    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'newsletter/' + post_id);
    const data: SEOData = await res.json();

    // news page static data
    const Pro_dataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/pro_newsletter_detail.php?news_id=' + post_id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const Pro_data: ProData = await Pro_dataResponse.json();

    return {
        props: { Pro_data, data },
        revalidate: 10, // In seconds
    };
};

export default function SD_Pro_Newsletter_detail({ Pro_data, data }: NewsletterProps) {
    const backlink = '/newsletter';

    if (data.error === 'Page Not Found!' || data.tag === null) {
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
            <HeadComponent data={data} />
            <div className='productdetail text-center paywallpvr'>
                <Pagetitle heading={Pro_data.title} disc={Pro_data.content} back={backlink} requestFrom='sunday_nwes' />
                <div className='productdetailbox text-center'>
                    <div className='container'>
                        <Tabs>
                            <Tab {...({ label: 'Email Newsletter' } as any)}>
                                <iframe src={Pro_data.news_letter_url} frameBorder='0' className='mailframenews'></iframe>
                            </Tab>
                            {Pro_data.news_letter_PDF && (
                                <Tab {...({ label: 'PDF Document' } as any)}>
                                    <div className='prodetialdoc trackreport '>
                                        <iframe src={Pro_data.news_letter_PDF} frameBorder='0'></iframe>
                                    </div>
                                </Tab>
                            )}

                            {Pro_data.film_tracking_PDF && (
                                <Tab {...({ label: 'Long Lead Film Tracking Grid' } as any)}>
                                    <div className='prodetialdoc trackgrid '>
                                        <iframe src={Pro_data.film_tracking_PDF} frameBorder='0'></iframe>
                                    </div>
                                </Tab>
                            )}
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}

