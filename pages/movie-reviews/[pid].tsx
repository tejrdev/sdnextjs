import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';

import CustomSelect from '../../components/Header/CustomSelect';

import Loader from '../../components/Loader';
import Page404 from '../../components/Page404';

import ArticleBanner from '../../components/News/DetailPages/ArticleDetail/ArticleBanner';
import DetailSection from '../../components/News/DetailPages/ArticleDetail/DetailSection';
import Recommanded from '../../components/News/DetailPages/ArticleDetail/Recommanded';
// import CategoryNavigation from '../../components/News/DetailPages/CategotyNavigation';

import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import HeadComponent from '@/components/HeadComponent';

interface SEOData {
    tag?: unknown[];
    children?: unknown[];
    [key: string]: any;
}

interface Recomoded {
    posts?: any[];
    [key: string]: any;
}

interface MovieReviewData {
    error?: string;
    title?: string;
    img_url?: string;
    get_cat_ttiles?: string;
    img_caption?: string;
    recomoded?: Recomoded;
    [key: string]: any;
}

interface MovieReviewProps {
    data?: SEOData;
    Movie_review_data?: MovieReviewData;
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

export const getStaticProps: GetStaticProps<MovieReviewProps> = async (context) => {
    const { params } = context;
    const post_id = params?.pid as string;

    const defaultData = {
        Movie_review_data: {
            data: [],
            error: '',
        },
    };

    const fetchConfigs = [
        {
            url: `${process.env.NEXT_PUBLIC_SEO_LINK}movie-reviews/${post_id}`,
            key: 'data',
            defaultData: { children: [] },
        },
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/movie-review/movie-review-detail.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/movie-reviews/${post_id}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'Movie_review_data',
            defaultData: defaultData.Movie_review_data,
        },
    ];
    const config = await getStaticPropsWithErrorHandling(fetchConfigs);
    return config;
};

const Movie_Review_detail = ({ data, Movie_review_data, error }: MovieReviewProps) => {
    if (error) {
        return <ErrorDisplay error={error} />;
    }
    // if (data.error === 'Page Not Found!') {
    //   return (
    //     <>
    //       <Head>
    //         <meta name="robots" content="noindex" />
    //       </Head>
    //       <Page404 />
    //     </>
    //   );
    // }

    return (
        <>
            <HeadComponent data={data} />
            {Movie_review_data?.error ? (
                <Page404 />
            ) : (
                <>
                    {/* <CategoryNavigation /> */}
                    {Movie_review_data && <ArticleBanner data={Movie_review_data} />}
                    {Movie_review_data && <DetailSection data={Movie_review_data} />}
                    {Movie_review_data?.recomoded?.posts && Movie_review_data.recomoded && <Recommanded recomoded={Movie_review_data.recomoded} />}
                </>
            )}
        </>
    );
};

export default Movie_Review_detail;

