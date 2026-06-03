import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import HeadComponent from '@/components/HeadComponent';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import type { SEOData } from '@/types/blog';
import BlogBanner from '@/components/shared/BlogBanner';
import BlogTitle from '@/components/shared/BlogTitle';
import TwoColumnNews from '@/components/shared/TwoColumnNews';
import NewsletterSubscriber from '@/components/shared/NewsletterSubscriber';
import CategorisData from '@/components/Blog/CategorisData';
import { JSONData } from '@/components/shared/JSONData';

const news_seo_data = JSONData.news_seo_data;
const news_seo_data_item = news_seo_data?.find((item: any) => item.key === 'blog');

interface NewsPageProps {
    SEOdata: SEOData;
    newsData: Record<string, any>;
}

export const getStaticProps: GetStaticProps<NewsPageProps> = async () => {
    const fetchConfigs = [
        {
            url: `${process.env.NEXT_PUBLIC_SEO_LINK}blog`,
            key: 'SEOdata',
            defaultData: {},
        },
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/news-room/blog-main.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'newsData',
            defaultData: {},
        },
    ];

    const result = await getStaticPropsWithErrorHandling(fetchConfigs);
    return result as any;
};

const News = ({ SEOdata, newsData }: NewsPageProps) => {
    const meta_title = news_seo_data_item?.metaTitle || '';
    const meta_description = news_seo_data_item?.metaDescription || '';

    return (
        <>
            <HeadComponent data={SEOdata as any} meta_title={meta_title} meta_description={meta_description} />
            <BlogBanner data={newsData.highlight_article} requestFrom="blog" />
            <div className="blogmiddle bg-zinc-100">
                <BlogTitle title={news_seo_data_item?.pageHeading || ''} description={news_seo_data_item?.pageContent || ''} />
                <CategorisData data={newsData.category_list_data} />
            </div>

            <TwoColumnNews data={newsData.main_news} left_tag="celebrity" right_tag="business" />
            <NewsletterSubscriber />
        </>
    );
};
export default News;
