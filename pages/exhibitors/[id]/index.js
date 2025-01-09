import Head from 'next/head';
import Exhibitor from '../../../components/DetailPages/Exhibitor';
import Page404 from '../../../components/Page404';
import HeadComponent from '@/components/HeadComponent';

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const id = params.id;
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'exhibitors/' + id);
  const SEOdata = await res.json();
  if (!SEOdata) {
    return {
      notFound: true,
    };
  }
  //DetailsData  static data
  let DetailsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/exhibitors-theatres.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&url=' + process.env.NEXT_PUBLIC_MENU_URL + 'exhibitors/' + id);
  DetailsData = await DetailsData.json();

  return {
    props: { SEOdata, DetailsData, id },
    revalidate: 10, // In seconds
  };
}

const ExhibitorDetailsPage = ({ SEOdata, DetailsData, id }) => {
  if (DetailsData.error === 'Page Not Found!' || DetailsData.tag === null) {
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
    <HeadComponent data={SEOdata}/>
      <Exhibitor data={DetailsData} listingId={id} />
    </>
  );
};
export default ExhibitorDetailsPage;
