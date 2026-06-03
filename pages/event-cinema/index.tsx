import TopBanner from '../../components/News/DetailPages/ArticleDetail/Top10/TopBanner';
import HeadComponent from '@/components/HeadComponent';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';

export async function getStaticProps() {
  const fetchConfigs = [
    {
      url: `${process.env.NEXT_PUBLIC_SEO_LINK}event-cinema`,
      key: 'SEOdata',
      defaultData: {},
    },
    {
      url: `${process.env.NEXT_PUBLIC_SD_API}/detail_pages/quick_link_post.php?page_name=event-cinema&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
      key: 'EventCinemaData',
      defaultData: {},
    },
  ];

  return await getStaticPropsWithErrorHandling(fetchConfigs);
}

const EventCinema = ({ SEOdata, EventCinemaData }) => {
  return (
    <>
      <HeadComponent data={SEOdata} />
      <div className='toparticels subfilmy'>
        <TopBanner data={EventCinemaData} requestFrom='quicklinks' />
      </div>
    </>
  );
};

export default EventCinema;
