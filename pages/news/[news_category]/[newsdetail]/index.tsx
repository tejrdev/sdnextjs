import Link from 'next/link';
import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next';
import { getStaticPropsWithErrorHandling } from '../../../../utils/staticProps';
import Page404 from '@/components/Page404';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import Sidebar from '@/components/shared/Sidebar';
import HeadComponent from '@/components/HeadComponent';
import Image from 'next/image';
import AuthorData from '@/components/shared/AuthorData';
import Page410 from '@/components/Page410';
import { JSONData } from '@/components/shared/JSONData';
import fourabtsld from '@/public/images/bruno-cervera.jpg'
import pdfIcon from '@/public/images/pdf_redicoin.png'

const NEWS_CATEGORIES = JSONData.NEWS_CATEGORIES;


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
};

export const getStaticProps: GetStaticProps<any, { news_category: string, newsdetail: string }> = async (context) => {
    const { params } = context;
    const post_id = String(params?.newsdetail || '');
    const news_category = String(params?.news_category || '');

    if (!NEWS_CATEGORIES.includes(news_category) || news_category === 'undefined') {
        return { props: { error: 410 } }
    }


    const defaultData = {
        NewsData: {
            data: [],
            error: '',
        },
    } as const;
    const fetchConfigs = [
        {
            url: `${process.env.NEXT_PUBLIC_SEO_LINK + 'news/' + news_category + '/' + post_id}`,
            key: 'SEOdata',
            defaultData: { tag: [], children: [] },
        },
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/news-room/news-detail.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL + '/news/' + news_category + '/' + post_id}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'NewsData',
            defaultData: defaultData.NewsData,
        },
    ];

    const config: any = await getStaticPropsWithErrorHandling(fetchConfigs);
    config.props.news_category = news_category;
    return config;
};


const NewsDetail = ({ SEOdata, NewsData, error, news_category }: any) => {
    if (error) {
        if (error === 410) {
            return <Page410 />;
        }
        const normalizedError: any = typeof error === 'string' ? { message: error, code: '' } : error;
        return <ErrorDisplay error={normalizedError} />;
    }
    if (NewsData.error === 'Page Not Found!' || (SEOdata as any).tag === null) {
        return <Page404 />;
    }
    //console.log(NewsData, news_category)
    const newshero = NewsData.hero_image === null ? fourabtsld.src : NewsData.hero_image;
    return (
        <div>
            <HeadComponent data={SEOdata} />
            <AdminEditLink data={NewsData} />
            <div className={`newsbanner_item relative z-[1] ${news_category === 'press-releases' ? 'mb-10' : ''}`}>
                <div className="mediainfo absolute top-0 left-0 w-full h-full z-[-1]">
                    <Image src={news_category === 'press-releases' ? newshero : NewsData.img_url} alt={NewsData.title} width={1520} height={285} className="w-full h-full object-cover absolute top-0 left-0 z-[-1]" loading="lazy" />
                    <div className="imgfig bg-gradient-to-r from-gray-900 to-transparent absolute top-0 left-0 w-full h-full"></div>
                    {NewsData?.img_caption && <div className="imgcaption absolute bottom-0 right-5 z-[1] bg-gray-900/80 p-2 pl-3 rounded-sm">
                        <p className="text-white text-base m-0 flex items-center ">
                            {NewsData.img_caption}</p>
                    </div>}
                </div>
                <div className="container text-white ">
                    <div className={`${news_category === 'press-releases' ? 'xl:max-w-[1200px]' : 'lg:w-1/2'} w-full pt-20 pb-16 sm:pt-28 sm:pb-16 `}>
                        <h1 className="leading-snug">{NewsData.title}</h1>
                    </div>
                </div>
            </div>
            {news_category === 'press-releases' ?
                <div className="container">
                    <div className="top_txt mb-4">
                        <p className="text-gray-500">{NewsData.published_date}
                            {NewsData.location && <> · {NewsData.location}</>}
                            {NewsData.press_links?.link && NewsData.press_links?.title && <> · <Link href={NewsData.press_links.link} className="cursor-pointer text-black hover:text-blue">{NewsData.press_links.title}</Link></>}
                        </p>
                    </div>
                    <div className="mediafdownloads">
                        <div className="mediafdownloads-item mb-4">
                            {NewsData.pdf_press_releases && <a href={NewsData.pdf_press_releases} target="_blank" className="mediafdownloads-item-link inline-flex items-center gap-1 rounded-full border border-black p-[2px] pr-1 font-medium text-black transition-colors hover:bg-neutral-50">
                                <span className="flex size-9 items-center justify-center rounded-full bg-white text-white">
                                    <img src={pdfIcon.src} alt="PDF Icon" className="w-5 h-5" />
                                </span>
                                <span className="pr-3 inline-block text-base">Download</span>
                            </a>}
                        </div>
                    </div>

                    <div className="pressmedia-box">
                        <p dangerouslySetInnerHTML={{ __html: NewsData.article_content }} />
                    </div>

                </div>
                : <>
                    <div className="postsocialinfo my-1 py-4">
                        <AuthorData data={NewsData.author_data} published_date={NewsData.published_date} />
                    </div>
                    <section className="newscontent">
                        <div className="container subartbox df fww">
                            <div className="newscontent_box subartbox_left">
                                <div className="newscontent_box_item gap-6 mb-6" dangerouslySetInnerHTML={{ __html: NewsData.article_content }} />

                                {NewsData.original_source && (
                                    <div className='article-original-link'>
                                        <a href={NewsData.source_article} target='_blank' rel="noopener noreferrer">
                                            <strong>{NewsData.original_source}</strong>
                                        </a>
                                    </div>
                                )}

                            </div>
                            <Sidebar requestFrom='news' />

                        </div>

                        <div className="container">
                            <div className="newscontent_box_item py-4 sm:py-6">
                                <div className="relatednews border border-gray-700 rounded-lg px-4 py-2 mb-4">
                                    <h2 className=''>{NewsData.related?.title}</h2>
                                    <div className="relatednews_box grid grid-cols-[repeat(auto-fit,minmax(181px,1fr))] gap-4 ">
                                        {NewsData.related?.posts?.map((post: any, index: number) => (
                                            <Link href={post.link} key={index}>
                                                <div className="cbnews_celebrity ">
                                                    <div className="bg-white rounded-lg flex flex-col items-start gap-1">
                                                        <div className="w-full sm:w-[181px] flex-shrink-0 pb-[120px] relative">
                                                            <img
                                                                src={post.img_url}
                                                                alt={post.title}
                                                                className="w-full h-full object-cover rounded-md absolute top-0 left-0"
                                                                title={post.title}
                                                            />
                                                        </div>
                                                        <div className="w-full sm:flex-1 py-1 flex flex-col justify-between">
                                                            <div>
                                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight line-clamp-3" title={post.title}>
                                                                    {post.title}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    {NewsData.recomoded?.posts?.length > 0 && <section className="recmend sm:py-8 py-5 bg-gray-200">
                        <div className="container">
                            <h2 className="text-2xl sm:text-4xl font-bold mb-5">{NewsData.recomoded?.title}</h2>
                            <div className="recmend_box flex flex-wrap gap-5">
                                {NewsData.recomoded?.posts?.map((item: any, index: number) => (
                                    <div className="recmend_item xl:flex-1 w-full lg:w-[calc(50%-20px)]" key={index}>
                                        <div className="bg-white rounded-lg flex flex-col sm:flex-row items-center">
                                            <div className="w-full sm:w-[180px] xl:w-[280px] flex-shrink-0 pb-[180px] relative">
                                                <img
                                                    src={item.img}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover rounded-md absolute top-0 left-0"
                                                />
                                            </div>
                                            <div className="w-full sm:w-[calc(100%-180px)] xl:w-[calc(100%-280px)] py-1 px-3 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                                <div className="mt-4 mb-2">
                                                    <Link href={item.link}>
                                                        <button className="roundbtn min-w-40">
                                                            Read Now
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>}
                </>}

        </div>
    )
}

export default NewsDetail