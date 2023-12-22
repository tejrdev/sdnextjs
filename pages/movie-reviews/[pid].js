import axios from "axios";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

import CustomSelect from "../../components/Header/CustomSelect";

import Loader from "../../components/Loader";
import Page404 from "../../components/Page404";

import ArticleBanner from "../../components/News/DetailPages/ArticleDetail/ArticleBanner";
import DetailSection from "../../components/News/DetailPages/ArticleDetail/DetailSection";
import Recommanded from "../../components/News/DetailPages/ArticleDetail/Recommanded";
import CategoryNavigation from "../../components/News/DetailPages/CategotyNavigation";

const $ = require("jquery");

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const post_id = params.pid;
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + "/movie-reviews/" + post_id);
  const data = await res.json();

  // critic page static data
  console.log();
  let Movie_review_data = await fetch(process.env.NEXT_PUBLIC_SD_API + "/movie-review/movie-review-detail.php?url=" + process.env.NEXT_PUBLIC_MENU_URL + "/movie-reviews/" + post_id + "&api_token=" + process.env.NEXT_PUBLIC_API_TOKEN);
  Movie_review_data = await Movie_review_data.json();

  return {
    props: { data, Movie_review_data },
    revalidate: 10, // In seconds
  };

  //return { props: { data } };
}

const Movie_Review_detail = ({ data, Movie_review_data }) => {
  // if (data.error === 'Page Not Found!') {
  //   return (
  //     <>
  //       <Head>
  //         <meta name="robots" content="noindex" />
  //       </Head>
  //       <Page404 />
  //     </>
  //   );
  // }

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
      {Movie_review_data.error ? (
        <Page404 />
      ) : (
        <>
          <CategoryNavigation data={Movie_review_data.menu_items} />
          <ArticleBanner data={Movie_review_data} />
          <DetailSection data={Movie_review_data} />
          {Movie_review_data.recomoded.posts && <Recommanded recomoded={Movie_review_data.recomoded} />}
        </>
      )}
    </>
  );
};

export default Movie_Review_detail;
