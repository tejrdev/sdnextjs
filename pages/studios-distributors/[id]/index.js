import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';
import Loader from '../../../components/Loader';

import Gallery from '../../../components/DetailPages/Gallery';
import TheatreInfo from '../../../components/DetailPages/TheatreInfo';
import FilmCalendar from '../../../components/DetailPages/Distributor/FilmCalendar';
import NewsUpdate from '../../../components/FilmData/FilmDetail/NewsUpdate';
import Page404 from '../../../components/Page404';

const API_URL = process.env.NEXT_PUBLIC_SD_API;
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
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'studios-distributors/' + id);
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  //DistributorDetailsData  static data
  let DistributorDetailsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/distributors_detail.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'studios-distributors/' + id + '&page_no=' + 1 + '&order_choice=' + 'releasedate' + '&undated=""&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  DistributorDetailsData = await DistributorDetailsData.json();

  return {
    props: { data, DistributorDetailsData },
    revalidate: 10, // In seconds
  };
}

const Distributor = ({ data, DistributorDetailsData }) => {
  const router = useRouter();
  const { id } = router.query;
  const [DistributorDetailsDataLoaded, setDistributorDetailsDataLoaded] = useState(false);
  //const [DistributorDetailsData, setDistributorDetailsData] = useState([]);
  const [distributorMovieData, setDistributorMovieData] = useState(DistributorDetailsData.movies);
  const [distributorMoviePage, setDistributorMoviePage] = useState(1);
  const [distributorMovieSortBy, setDistributorMovieSortBy] = useState('releasedate');
  const [favData, setFavData] = useState(0);

  useEffect(() => {
    var LOGGED_EMAIL = localStorage.getItem('email');
    const getFavLists = () => {
      var fav_saveurl = API_URL + '/login/favorite_get_all.php';
      axios
        .get(fav_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            fav_type: window.btoa('fav_dist_listing'),
            fav_id: window.btoa(DistributorDetailsData.id),
          },
        })
        .then((res) => {
          setFavData(res.data);
        })
        .catch((err) => console.log('Distributor lists error ', err));
    };
    getFavLists();
  }, []);
  useEffect(() => {
    loadDetailPageData();
  }, []);

  const setCurrentPage = (currentPage) => {
    setDistributorMoviePage(currentPage);
  };

  const setSortBy = (sortBy) => {
    setDistributorMovieSortBy(sortBy);
  };
  useEffect(() => {
    loadDetailPageData();
  }, [distributorMoviePage, distributorMovieSortBy]);

  useEffect(() => {
    const $ = window.jQuery;
    $('.formpop').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',

      // When elemened is focused, some mobile browsers in some cases zoom in
      // It looks not nice, so we disable it:
      callbacks: {
        beforeOpen: function () {
          if ($(window).width() < 700) {
            this.st.focus = false;
          } else {
            this.st.focus = '#name';
          }
        },
      },
    });
  }, [DistributorDetailsDataLoaded]);
  const loadDetailPageData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/distributors_detail.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'studios-distributors/' + id + '&page_no=' + distributorMoviePage + '&order_choice=' + distributorMovieSortBy + '&undated=""&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        if (distributorMoviePage === 1) {
          //setDistributorDetailsData(res.data);
          setDistributorDetailsDataLoaded(true);
        }
        setDistributorMovieData(res.data.movies);
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
        /*DistributorDetailsDataLoaded ? (*/
        <>
          <TheatreInfo data={DistributorDetailsData} requestfrom='Distributor' favoriteList={favData} />
          {/*DistributorDetailsData.galary_imgs && <Gallery data={DistributorDetailsData.galary_imgs} />*/}
          {/* <UserComments /> */}
          {distributorMovieData.list.length > 1 && <FilmCalendar data={distributorMovieData} setCurrentPage={setCurrentPage} sortBy={distributorMovieSortBy} setSortBy={setSortBy} />}
          {DistributorDetailsData.news && DistributorDetailsData.news.length > 0 && <NewsUpdate data={DistributorDetailsData.news} />}
        </>
        /*) : (
        <Loader />
      )*/
      }
    </>
  );
};

export default Distributor;
