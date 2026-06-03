import Listings from '../../components/News/DetailPages/ArticleDetail/Top10/Listings';
import TopBanner from '../../components/News/DetailPages/ArticleDetail/Top10/TopBanner';
import HeadComponent from '../../components/HeadComponent';

// Import types from separate file
import { SEOData, ThreeDData, ThreeDProps } from '../../types/3d';

export async function getStaticProps() {
    // Fetch data from external API
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + '3d');
    const SEOdata: SEOData = await res.json();

    // static data
    const ThreeDResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/quick_link_post.php?page_name=3d&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const ThreeDData: ThreeDData = await ThreeDResponse.json();

    return {
        //
        props: { SEOdata, ThreeDData },
        revalidate: 10, // In seconds
    };
}

const ThreeD: React.FC<ThreeDProps> = ({ SEOdata, ThreeDData }) => {
    return (
        <>
            <HeadComponent data={SEOdata} />
            <div className='toparticels subfilmy'>
                <TopBanner data={ThreeDData} requestFrom='quicklinks' />
                <Listings data={ThreeDData.movies} requestFrom='quicklinks' />
            </div>
        </>
    );
};

export default ThreeD;
