import Head from 'next/head';
import Theatre from '../../../components/DetailPages/Theatre';
import Page404 from '../../../components/Page404';

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
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'exhibitors-theatres/' + id);
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  //DetailsData  static data
  let DetailsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/exhibitors-theatres.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&url=' + process.env.NEXT_PUBLIC_MENU_URL + 'exhibitors-theatres/' + id);
  DetailsData = await DetailsData.json();

  return {
    props: { data, DetailsData },
    revalidate: 10, // In seconds
  };
}

const TheatreDetailsPage = ({ data, DetailsData }) => {
  if (data.error === 'Page Not Found!' || data.tag === null) {
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
      <Head>
        {data.children[0].children.map((item, index) => {
          const attributes = item.tag.toUpperCase();

          switch (attributes) {
            case 'TITLE':
              return <title key={index}>{item.html}</title>;
            case 'META':
              const name = item.name || '';
              if (name !== '') {
                return <meta key={index} name={item.name} content={item.content} />;
              } else {
                return <meta key={index} property={item.property} content={item.content} />;
              }
            case 'LINK':
              return <link key={index} rel={item.rel} href={item.href} />;
            case 'SCRIPT':
              return <script key={index} type={item.type} class={item.class} dangerouslySetInnerHTML={{ __html: item.html }}></script>;
            default:
              return null;
          }
        })}
      </Head>
      <Theatre data={DetailsData} />
    </>
  );
};
export default TheatreDetailsPage;
