import Listings from '../../components/News/DetailPages/ArticleDetail/Top10/Listings';
import TopBanner from '../../components/News/DetailPages/ArticleDetail/Top10/TopBanner';
import HeadComponent from '@/components/HeadComponent';
import { GetStaticProps } from 'next';

interface SEOData {
    tag?: unknown[];
    children?: unknown[];
    [key: string]: any;
}

interface IMaxData {
    movies?: any[];
    [key: string]: any;
}

interface IMaxProps {
    data: SEOData;
    IMaxData: IMaxData;
}

export const getStaticProps: GetStaticProps<IMaxProps> = async () => {
    // Fetch data from external API
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'imax');
    const data: SEOData = await res.json();

    // static data
    const IMaxDataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/quick_link_post.php?page_name=imax&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const IMaxData: IMaxData = await IMaxDataResponse.json();

    return {
        props: { data, IMaxData },
        revalidate: 10,
    };
};

const IMax = ({ data, IMaxData }: IMaxProps) => {
    return (
        <>
            <HeadComponent data={data} />
            <div className="toparticels subfilmy">
                <TopBanner data={IMaxData} requestFrom="quicklinks" />
                <Listings data={IMaxData.movies} requestFrom="quicklinks" />
            </div>
        </>
    );
};

export default IMax;

