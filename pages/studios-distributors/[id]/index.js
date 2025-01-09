import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Gallery from '../../../components/DetailPages/Gallery';
import TheatreInfo from '../../../components/DetailPages/TheatreInfo';
import FilmCalendar from '../../../components/DetailPages/Distributor/FilmCalendar';
import NewsUpdate from '../../../components/FilmData/FilmDetail/NewsUpdate';
import Page404 from '../../../components/Page404';
import Claimlisting from '@/components/DetailPages/Claimlisting';
import Promoimg from '@/components/DetailPages/Promoimg';
import HeadComponent from '../../../components/HeadComponent';
import MenuNavigation from '@/components/Directory/ListingPages/MenuNavigation';

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
  const SEOData = await res.json();
  if (!SEOData) {
    return {
      notFound: true,
    };
  }
  //DistributorDetailsData  static data
  let DistributorDetailsData = await fetch(
    process.env.NEXT_PUBLIC_SD_API +
      '/detail_pages/distributors_detail.php?url=' +
      process.env.NEXT_PUBLIC_MENU_URL +
      'studios-distributors/' +
      id +
      '&page_no=' +
      1 +
      '&order_choice=releasedate&undated=""&api_token=' +
      process.env.NEXT_PUBLIC_API_TOKEN
  );
  DistributorDetailsData = await DistributorDetailsData.json();

  return {
    props: { SEOData, DistributorDetailsData, id },
    revalidate: 10, // In seconds
  };
}

const Distributor = ({ SEOData, DistributorDetailsData, id }) => {
  const [distributorMovieData, setDistributorMovieData] = useState(DistributorDetailsData.movies);
  const [distributorMoviePage, setDistributorMoviePage] = useState(1);
  const [distributorMovieSortBy, setDistributorMovieSortBy] = useState('releasedate');
  const [isFutureRelease, setisFutureRelease] = useState(false);
  const [favData, setFavData] = useState(0);
  const [DataChanged, setDataChanged] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);

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

  const setCurrentPage = (currentPage) => {
    setDistributorMoviePage(currentPage);
    setDataChanged(true);
  };

  const setFutureRelease = (isFuture) => {
    setisFutureRelease(isFuture);
    setDistributorMoviePage(1);
    setDataChanged(true);
  };
  const setSortBy = (sortBy) => {
    setDistributorMovieSortBy(sortBy);
    setDistributorMoviePage(1);
    setDataChanged(true);
  };
  useEffect(() => {
    if (DataChanged) loadDetailPageData();
  }, [distributorMoviePage, distributorMovieSortBy, isFutureRelease]);

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
  }, []);
  const loadDetailPageData = () => {
    setShowLoader(true);
    axios
      .get(
        process.env.NEXT_PUBLIC_SD_API +
          '/detail_pages/distributors_detail.php?url=' +
          process.env.NEXT_PUBLIC_MENU_URL +
          'studios-distributors/' +
          id +
          '&page_no=' +
          distributorMoviePage +
          '&order_choice=' +
          distributorMovieSortBy +
          '&undated=' +
          isFutureRelease +
          '&api_token=' +
          process.env.NEXT_PUBLIC_API_TOKEN
      )
      .then((res) => {
        setDistributorMovieData(res.data.movies);
        setShowLoader(false);
      })
      .catch((err) => console.log(err));
  };

  if (DistributorDetailsData.error === 'Page Not Found!' || DistributorDetailsData.tag === null) {
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
      <HeadComponent data={SEOData} />
      <MenuNavigation />
      <TheatreInfo data={DistributorDetailsData} requestfrom='Distributor' favoriteList={favData} />
      <Claimlisting listingId={id} listingType='studios-distributors' listing_title={DistributorDetailsData.title} claimed={DistributorDetailsData.is_claimed} />
      {DistributorDetailsData.gallery_images && <Gallery data={DistributorDetailsData.gallery_images} />}
      {/* <UserComments /> */}
      {distributorMovieData.list && (
        <FilmCalendar
          data={distributorMovieData}
          setCurrentPage={setCurrentPage}
          sortBy={distributorMovieSortBy}
          setSortBy={setSortBy}
          currPage={distributorMoviePage}
          title={DistributorDetailsData.title}
          setFutureRelease={setFutureRelease}
          showLoader={ShowLoader}
        />
      )}
      {DistributorDetailsData.promo_imgs && <Promoimg data={DistributorDetailsData.promo_imgs} />}
      {DistributorDetailsData.news && DistributorDetailsData.news.length > 0 && <NewsUpdate data={DistributorDetailsData.news} />}
    </>
  );
};

export default Distributor;
