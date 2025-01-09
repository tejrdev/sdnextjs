import Head from 'next/head';
import Theatre from '../../../components/DetailPages/Theatre';
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
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'theatres/' + id);
  const SEOdata = await res.json();
  if (!SEOdata) {
    return {
      notFound: true,
    };
  }
  //DetailsData  static data
  let DetailsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/exhibitors-theatres.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&url=' + process.env.NEXT_PUBLIC_MENU_URL + 'theatres/' + id);
  DetailsData = await DetailsData.json();

  return {
    props: { SEOdata, DetailsData, id },
    revalidate: 10, // In seconds
  };
}

const TheatreDetailsPage = ({ SEOdata, DetailsData, id }) => {
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: DetailsData.title,
    image: DetailsData.logo,
    // '@id': DetailsData.id,
    url: 'https://screendollars.com/theatres/89er-theatre/',
    telephone: DetailsData.phone_no,
    priceRange: '$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: DetailsData.address,
      addressLocality: DetailsData.address,
      addressRegion: DetailsData.address,
      postalCode: DetailsData.address,
      addressCountry: DetailsData.address,
    },
  };

  return (
    <>
      <HeadComponent data={SEOdata} jsonSchema={jsonLd} />
      <Theatre data={DetailsData} listingId={id} />
    </>
  );
};
export default TheatreDetailsPage;
