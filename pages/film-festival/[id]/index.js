import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Loader from '../../../components/Loader';
import TheatreInfo from '../../../components/DetailPages/TheatreInfo';
import NewsUpdate from '../../../components/FilmData/FilmDetail/NewsUpdate';
import FilmFestivals from '../../../components/DetailPages/FilmFestival/FilmFestivals';
import Page404 from '../../../components/Page404';

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
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  //FilmFestivalDetailsData  static data
  let FilmFestivalDetailsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/film_festival.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'film-festival/' + id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  FilmFestivalDetailsData = await FilmFestivalDetailsData.json();

  return {
    props: { data, FilmFestivalDetailsData },
    revalidate: 10, // In seconds
  };
}

const FilmFestival = ({ data, FilmFestivalDetailsData }) => {
  const router = useRouter();
  const { id } = router.query;
  const [FilmFestivalDetailsDataLoaded, setFilmFestivalDetailsDataLoaded] = useState(false);
  const [favData, setFavData] = useState(0);
  //const [FilmFestivalDetailsData, setFilmFestivalDetailsData] = useState([]);
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
    loadDetailPageData();
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

  const loadDetailPageData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/film_festival.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'film-festival/' + id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        //setFilmFestivalDetailsData(res.data);
        setFilmFestivalDetailsDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

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
      {
        /*FilmFestivalDetailsDataLoaded ? (*/
        <>
          <TheatreInfo data={FilmFestivalDetailsData} requestfrom='filmfestival' favoriteList={favData} />
          {FilmFestivalDetailsData.film_festivals ? (
            <>
              {FilmFestivalDetailsData.film_festivals.map((item, index) => {
                return <FilmFestivals data={item} data_2={''} key={index} />;
              })}
            </>
          ) : null}
          {/* <UserComments /> */}
          {FilmFestivalDetailsData.news.lenght > 1 && <NewsUpdate data={FilmFestivalDetailsData.news} />}
        </>
        /*) : (
        <Loader />
      )*/
      }
    </>
  );
};

export default FilmFestival;
