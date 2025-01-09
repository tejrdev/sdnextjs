import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import TheatreInfo from '../../../components/DetailPages/TheatreInfo';
import NewsUpdate from '../../../components/FilmData/FilmDetail/NewsUpdate';
import FilmFestivals from '../../../components/DetailPages/FilmFestival/FilmFestivals';
import Gallery from '../../../components/DetailPages/Gallery';
import Page404 from '../../../components/Page404';
import Claimlisting from '@/components/DetailPages/Claimlisting';
import Promoimg from '../../../components/DetailPages/Promoimg';
import DetailAwards from '../../../components/DetailPages/FilmFestival/DetailAwards';
import DetailMview from '../../../components/DetailPages/FilmFestival/DetailMview';
import Publication from '../../../components/DetailPages/Publication';
import HeadComponent from '@/components/HeadComponent';
import MenuNavigation from '@/components/Directory/ListingPages/MenuNavigation';

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
}

const $ = require('jquery');
const API_URL = process.env.NEXT_PUBLIC_SD_API;
export async function getStaticProps(context) {
  const { params } = context;

  const id = params.id;
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'film-festival/' + id);
  const SEOdata = await res.json();
  if (!SEOdata) {
    return {
      notFound: true,
    };
  }
  //FilmFestivalDetailsData  static data
  let FilmFestivalDetailsData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/detail_pages/film_festival.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'film-festival/' + id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  FilmFestivalDetailsData = await FilmFestivalDetailsData.json();

  return {
    props: { SEOdata, FilmFestivalDetailsData, id },
    revalidate: 10, // In seconds
  };
}

const FilmFestival = ({ SEOdata, FilmFestivalDetailsData, id }) => {
  const [favData, setFavData] = useState(0);

  useEffect(() => {
    var LOGGED_EMAIL = localStorage.getItem('email');
    const getFavLists = () => {
      var fav_saveurl = API_URL + '/login/favorite_get_all.php';
      axios
        .get(fav_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            fav_type: window.btoa('fav_filmfestivals'),
            fav_id: window.btoa(FilmFestivalDetailsData.id),
          },
        })
        .then((res) => {
          setFavData(res.data);
        })
        .catch((err) => console.log('Film Festivals lists error ', err));
    };
    getFavLists();
  }, []);
  useEffect(() => {
    $('.readmore_view').on('click', function () {
      $(this).parents('.opencol_info').find('.topread_open').show();
      $(this).parents('.opencol_info').find('.topread_view').hide();
      $(this).hide();
    });

    var totalHeight = 0;
    $('.openletterbox .opencol_info')
      .children()
      .each(function () {
        totalHeight = totalHeight + $(this).outerHeight(true);
      });
    if (totalHeight > 375) {
      $('.openletterbox  .opencol .opencol_info .topread_view').css('height', '332px');
      $('.openletterbox  .opencol .readmore_btn').click(function () {
        $(this).parent().toggleClass('open');
        $(this).hide();
      });
    }
  }, []);

  if (FilmFestivalDetailsData.error === 'Page Not Found!' || FilmFestivalDetailsData.tag === null) {
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
      <MenuNavigation />
      <TheatreInfo data={FilmFestivalDetailsData} requestfrom='filmfestival' favoriteList={favData} />
      <Claimlisting listingId={id} listingType='film-festival' listing_title={FilmFestivalDetailsData.title} claimed={FilmFestivalDetailsData.is_claimed} />
      {FilmFestivalDetailsData.film_festivals ? (
        <>
          {FilmFestivalDetailsData?.film_festivals.map((item, index) => {
            return <FilmFestivals data={item} data_2={''} key={index} />;
          })}
        </>
      ) : null}
      {/* <UserComments /> */}
      {FilmFestivalDetailsData?.gallery_images?.length > 0 ? <Gallery data={FilmFestivalDetailsData.gallery_images} /> : null}
      {FilmFestivalDetailsData.promo_imgs && <Promoimg data={FilmFestivalDetailsData.promo_imgs} />}
      {FilmFestivalDetailsData.award_list && <DetailAwards data={FilmFestivalDetailsData.award_list} />}
      {FilmFestivalDetailsData.review_list?.length > 0 && <DetailMview data={FilmFestivalDetailsData.review_list} />}
      {/* convarted dailies to Publication section */}
      {/* {FilmFestivalDetailsData?.film_festivals[0]?.festival_dailies.length > 0 && <Publication data={FilmFestivalDetailsData?.film_festivals[0]?.festival_dailies} />} */}
      {FilmFestivalDetailsData.news.length > 1 && <NewsUpdate data={FilmFestivalDetailsData.news} />}
    </>
  );
};

export default FilmFestival;
