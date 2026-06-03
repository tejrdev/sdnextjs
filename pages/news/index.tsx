import { GetStaticProps } from 'next';
import { SEOData } from '@/types/blog';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import HeadComponent from '@/components/HeadComponent';
import BlogBanner from '@/components/shared/BlogBanner';
import BlogTitle from '@/components/shared/BlogTitle';
import NewsletterSubscriber from '@/components/shared/NewsletterSubscriber';
import TwoColumnNews from '@/components/shared/TwoColumnNews';
import TopStories from '@/components/News/TopStories';
import CategoriesData from '@/components/News/CategoriesData';
import { JSONData } from '@/components/shared/JSONData';

const news_seo_data = JSONData.news_seo_data;
const news_seo_data_item = news_seo_data?.find((item: any) => item.key === 'news');

interface NewsPageProps {
    SEOdata: SEOData;
    newsData: Record<string, any>;
}

export const getStaticProps: GetStaticProps<NewsPageProps> = async () => {
    const fetchConfigs = [
        {
            url: `${process.env.NEXT_PUBLIC_SEO_LINK}news/`,
            key: 'SEOdata',
            defaultData: {},
        },
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/news-room/news-room.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'newsData',
            defaultData: {},
        },
    ];

    const result = await getStaticPropsWithErrorHandling(fetchConfigs);
    return result as any;
};

const News = ({ SEOdata, newsData }: NewsPageProps) => {

    return (
        <div className="newspage">
            <HeadComponent data={SEOdata as any} meta_title={news_seo_data_item?.metaTitle || ''} meta_description={news_seo_data_item?.metaDescription || ''} />
            <BlogBanner data={newsData.highlight_article} requestFrom="news" />
            <BlogTitle title={news_seo_data_item?.pageHeading || ''} description={news_seo_data_item?.pageContent || ''} />
            <TopStories data={newsData.top_story} />
            <TwoColumnNews data={newsData.main_news} left_tag="celebrity" right_tag="business" />
            <CategoriesData data={newsData.category_list_data} />
            <NewsletterSubscriber />
        </div >
    );
};

export default News;