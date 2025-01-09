import Head from 'next/head';
import Loader from '../../components/Loader';

import ArticleBanner from '../../components/News/DetailPages/ArticleDetail/ArticleBanner';
import DetailSection from '../../components/News/DetailPages/ArticleDetail/DetailSection';
import Recommanded from '../../components/News/DetailPages/ArticleDetail/Recommanded';
import CategoryNavigation from '../../components/News/DetailPages/CategotyNavigation';
import Top10 from '../../components/News/DetailPages/ArticleDetail/Top10';
import Page404 from '../../components/Page404';
import HeadComponent from '../../components/HeadComponent';

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const post_id = params.post_id;
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + post_id);
  const SEOdata = await res.json();
  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }

  // static data
  let ArticleDetailData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/news_page/news_detail.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + post_id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  ArticleDetailData = await ArticleDetailData.json();

  return {
    props: { SEOdata, ArticleDetailData },
    revalidate: 10, // In seconds
  };
  //return { props: { data } };
}

const ArticleDetail = ({ SEOdata, ArticleDetailData }) => {
  if (SEOdata.error === 'Page Not Found!' || SEOdata.tag === null) {
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
      <HeadComponent data={SEOdata} />
      {ArticleDetailData ? (
        <>
          {ArticleDetailData.error ? (
            <Page404 />
          ) : (
            <>
              {ArticleDetailData.top_movies ? (
                <>
                  <Top10 data={ArticleDetailData} />
                  <Recommanded recomoded={ArticleDetailData.recomoded} />
                </>
              ) : (
                <>
                  <CategoryNavigation data={ArticleDetailData.menu_items} />
                  <ArticleBanner data={ArticleDetailData} />
                  <DetailSection data={ArticleDetailData} />
                  <Recommanded recomoded={ArticleDetailData.recomoded} />
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
