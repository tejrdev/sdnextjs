import Loader from '@/components/Loader';
import ArticleBanner from '@/components/News/DetailPages/ArticleDetail/ArticleBanner';
import DetailSection from '@/components/News/DetailPages/ArticleDetail/DetailSection';
import Recommanded from '@/components/News/DetailPages/ArticleDetail/Recommanded';
import Top10 from '@/components/News/DetailPages/ArticleDetail/Top10';
import Page404 from '@/components/Page404';
import HeadComponent from '@/components/HeadComponent';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import type { GetStaticProps, GetStaticPaths } from 'next';
import Spotlight from '@/components/News/DetailPages/ArticleDetail/Spotlight';
import Page410 from '@/components/Page410';

import type { PageProps } from '@/types/blog';
import { JSONData } from '@/components/shared/JSONData';

const BLOG_CATEGORIES = JSONData.BLOG_CATEGORIES;

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
    const { params } = context;
    const post_id = String(params?.post_id || '');
    const blog_category = String(params?.blog_category || '');

    if (!BLOG_CATEGORIES.includes(blog_category) || blog_category === 'undefined') {
        return { props: { error: 410 } }
    }


    const defaultData = {
        ArticleDetailData: {
            data: [],
            error: '',
        },
    } as const;

    const fetchConfigs = [
        {
            url: `${process.env.NEXT_PUBLIC_SEO_LINK + 'blog/' + blog_category + '/' + post_id}`,
            key: 'SEOdata',
            defaultData: { tag: [], children: [] },
        },
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/news_page/${blog_category === 'screendollars-spotlight' ? 'detail-spolight' : 'news_detail'}.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL + '/blog/' + blog_category + '/' + post_id}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'ArticleDetailData',
            defaultData: defaultData.ArticleDetailData,
        },
    ];

    const config: any = await getStaticPropsWithErrorHandling(fetchConfigs);
    config.props.blog_category = blog_category;
    return config;
};

const ArticleDetail = ({ SEOdata, ArticleDetailData, error, blog_category }: PageProps) => {
    if (error) {
        if (typeof error === 'number' && error === 410) {
            return <Page410 />;
        }
        const normalizedError: any = typeof error === 'string' ? { message: error, code: '' } : error;
        return <ErrorDisplay error={normalizedError} />;
    }
    if (ArticleDetailData.error === 'Page Not Found!' || (SEOdata as any).tag === null) {
        return <Page404 />;
    }

    if (blog_category === 'screendollars-spotlight') {
        return <Spotlight data={ArticleDetailData} />
    }

    const movieList: any[] = [];
    let jsonLd: Record<string, any> | null = null;
    const MovieData = ArticleDetailData?.top_movies ? ArticleDetailData?.top_movies : null;
    const htmlString = ArticleDetailData?.top_content;
    function stripHTMLTags(htmlString?: string) {
        return htmlString?.replace(/<[^>]*>/g, '');
    }

    const plainText = stripHTMLTags(htmlString) || '';

    // extracting title and description from SEOdata objects array
    const pageTitle = SEOdata?.children?.[0]?.children?.find((item) => item?.tag === 'title')?.html || ArticleDetailData?.title;
    const pageDescription = SEOdata?.children?.[0]?.children?.find((item) => item?.tag === 'meta' && item?.name === 'description')?.content || plainText;
    const moviedatacount = (MovieData?.length || 0) > 20 ? 20 : MovieData?.length;
    if (MovieData) {
        MovieData?.slice(0, 20)?.map((item) => {
            movieList.push({
                '@type': 'Movie',
                'name': item?.title_new,
                'url': (process.env.NEXT_PUBLIC_FRONTEND_URL ?? '') + (item?.link ?? ''),
                'image': item?.img,
                'datePublished': item?.release_year,
                'director': {
                    '@type': 'Person',
                    'name': item?.director_name,
                },
            });
        });

        jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'name': pageTitle,
            'description': pageDescription,
            'itemListOrder': 'ItemListOrderAscending',
            'numberOfItems': moviedatacount,
            'itemListElement': { '@type': 'ItemList', 'name': 'Movies', 'itemListElement': movieList },
        };
    }
    return (
        <>
            <HeadComponent data={SEOdata as any} jsonSchema={jsonLd || undefined} />
            {ArticleDetailData ? (
                <>
                    {ArticleDetailData.error ? (
                        <Page404 />
                    ) : (
                        <>
                            {ArticleDetailData.top_movies ? (
                                <>
                                    <Top10 data={ArticleDetailData as any} />
                                    <Recommanded recomoded={(ArticleDetailData as any).recomoded} />
                                </>
                            ) : (
                                <>
                                    {/* <CategoryNavigation /> */}
                                    <ArticleBanner data={ArticleDetailData as any} />
                                    <DetailSection data={ArticleDetailData as any} />
                                    <Recommanded recomoded={(ArticleDetailData as any).recomoded} />
                                </>
                            )}
                        </>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default ArticleDetail;
