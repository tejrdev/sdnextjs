import axios from "axios";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";

import ArticleBanner from "../../components/News/DetailPages/ArticleDetail/ArticleBanner";
import DetailSection from "../../components/News/DetailPages/ArticleDetail/DetailSection";
import Recommanded from "../../components/News/DetailPages/ArticleDetail/Recommanded";
import CategoryNavigation from "../../components/News/DetailPages/CategotyNavigation";
import Top10 from "../../components/News/DetailPages/ArticleDetail/Top10";
import Page404 from "../../components/Page404";

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const post_id = params.post_id;
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + post_id);
  const data = await res.json();
  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }

  // static data
  let ArticleDetailData = await fetch(process.env.NEXT_PUBLIC_SD_API + "/news_page/news_detail.php?url=" + process.env.NEXT_PUBLIC_MENU_URL + post_id + "&api_token=" + process.env.NEXT_PUBLIC_API_TOKEN);
  ArticleDetailData = await ArticleDetailData.json();

  return {
    props: { data, ArticleDetailData },
    revalidate: 10, // In seconds
  };

  //return { props: { data } };
}

const ArticleDetail = ({ data, ArticleDetailData }) => {
  const router = useRouter();
  const { post_id } = router.query;
  //const [ArticleDetailDataLoaded, setArticleDetailDataLoaded] = useState(false);
  //const [ArticleDetailData, setArticleDetailData] = useState([]);

  useEffect(() => {
    // loadArticleDetailData();
  }, []);

  if (data.error === "Page Not Found!") {
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
            case "TITLE":
              return <title key={index}>{item.html.replace(/[^a-zA-Z0-9-|]/g, " ")}</title>;
            case "META":
              const name = item.name || "";
              if (name !== "") {
                return <meta key={index} name={item.name} content={item.content} />;
              } else {
                return <meta key={index} property={item.property} content={item.content} />;
              }
            case "LINK":
              return <link key={index} rel={item.rel} href={item.href} />;
            case "SCRIPT":
              return <script key={index} type={item.type} class={item.class} dangerouslySetInnerHTML={{ __html: item.html }}></script>;
            default:
              return null;
          }
        })}
      </Head>
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
