import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Casts from '../../../components/FilmData/FilmDetail/Casts';
import MovieDetailBanner from '../../../components/FilmData/FilmDetail/MovieDetailBanner';
import NewsUpdate from '../../../components/FilmData/FilmDetail/NewsUpdate';
import Photos from '../../../components/FilmData/FilmDetail/Photos';
import TheatreTiming from '../../../components/FilmData/FilmDetail/TheatreTiming';
import Summary from '../../../components/FilmData/FilmDetail/Summarysec';
import Videos from '../../../components/FilmData/FilmDetail/Videos';
import Page404 from '../../../components/Page404';
import Detailtab from '../../../components/FilmData/FilmDetail/DetailTab';
import BoxSummary from '../../../components/FilmData/FilmDetail/BoxSummary';
import AdminEditLink from '../../../components/DetailPages/AdminEditLink';
import HeadComponent from '@/components/HeadComponent';

//for admin user
const admin_emails: any = process.env.NEXT_PUBLIC_ADMIN_EMAILS;

const $ = require('jquery');
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

interface Context {
  params: {
    film_id: string;
  };
}

export async function getStaticProps(context: Context) {
  const { params } = context;

  const film_id = params.film_id;
  // // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'movie/' + film_id);
  const SEOdata = await res.json();

  // let FilmDetailsData;
  let FilmDetailsData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/detail_pages/film-detail.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'movie/' + film_id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  FilmDetailsData = await FilmDetailsData.json();

  return {
    props: { SEOdata, FilmDetailsData, film_id },
    revalidate: 10, // In seconds
  };
}
type filmsdetail_data = {
  title: string;
  edit_link: string;
  film_titles: Number;
  id: string;
  favorite: boolean;
  error: string;
  content: string;
  release_date_year: string;
  news: [
    {
      link: string;
      title: string;
      title_full: string;
      img: string;
      icon_img: string;
      source: string;
      date: string;
    }
  ];
  additional_key_dates: string;
  landscape_image: string;
  trailer_link: string;
  watch_now: string;
  poster_img: string;
  dis_title_link: string;
  dis_title: string;
  imdbrating_img: string;
  imdbrating: string;
  rotten_critics_score_img: string;
  rotten_critics_score: string;
  rotten_audience_score_img: string;
  rotten_audience_score: string;
  rating: string;
  runtime: string;
  genre: string;
  public_movie_website: string;
  public_movie_img: string;
  distributor_movie_page: string;
  facebook: string;
  instagram: string;
  twitter: string;
  wikipedia: string;
  format: string;
  soundmix: string;
  aspect_ratio: string;
  comments: string;
  film_country: string;
  film_language: string;
  film_page_view: null;
  synopsis: string;
  plot_summary: string;
  story_line: string;
  top_cast: [
    {
      link: string;
      img: string;
      name: string;
      talent_name: string;
    }
  ];
  film_video: Array<{
    link: string;
    title?: string;
    img?: string;
  }>;

  movie_images: Array<{
    link: string;
    img: string;
    title?: string;
  }>;

  movie_images_filter: Array<{
    // define the structure of your filter objects
    id?: string;
    name?: string;
  }>;
  production_budget: string;
  boxoffice_domestic: string;
  boxoffice_international: string;
  worldwide_total_collection: string;
  re_release_boxoffice: [
    {
      release_date: string;
      release_name: string;
      distributor: string;
      domestic_gross: string;
      worldwide_gross: string;
      international_gross: string;
      domestic_details: [
        {
          week: string;
          weekly_gross: string;
          weekend_gross: number;
          locations: number;
          locations_2: string;
          weekly_gross_temp: string;
          weekend_gross_temp: string;
          weekend_gross_change: string;
          weekly_gross_change: string;
          locations_change: string;
          locations_2_change: string;
          average: string;
          average_2: string;
          to_date: string;
        }
      ];
      domestic_details_new: [
        {
          count: string;
          weekend_gross: string;
          weekly_gross: string;
          weeked_locations: string;
          weekly_locations: number;
          weekly_gross_temp: string;
          weekend_gross_temp: string;
          weekend_gross_change: string;
          weekly_gross_change: string;
          weeked_locations_change: string;
          weekly_locations_change: string;
          weeked_locations_adv: string;
          weekly_locations_adv: string;
          weekly_todate: string;
          weeked_todate: string;
        }
      ];
    }
  ];
  box_office_show: string;
  total_is_estimate_notes: null;
  comparable_films: Array<{
    // define the structure of your comparable films
    title?: string;
    id?: string;
  }>;

  advanceticket_cols: Array<{
    // define the structure of your advance ticket columns
    name?: string;
    data?: any;
  }>;

  movie_frist_week_collection: string;
  boxoffice_films_data: {
    table_total: string;
  };
  forcast_show: string;
  forcast: {
    chart_class: string;
  };
  boxoffice_films_end_ly: [
    {
      count: string;
      weekend_gross: string;
      weekend_gross_change: string;
      weeked_locations: string;
      weeked_locations_change: string;
      weeked_locations_adv: string;
      weeked_todate: string;
      weekly_gross: string;
      weekly_gross_change: string;
      weekly_locations: string;
      weekly_locations_change: string;
      weekly_locations_adv: string;
      weekly_todate: string;
    }
  ];
  release_date_note: string;
  release_date: string;
  release_date_count_down: string;
  release_date_info: string;
  chart: [
    {
      title: string;
      w_end: string;
      w_ly: string;
      tot_ly: string;
    }
  ];
  awreness: {
    dailer: {
      dialername: string;
      dailerinfo: string;
      topticketPersent: number;
      dailercolor: string;
    };
    linerchart: {
      series: any[];
    };
  };
  intrest: {
    dailer: {
      dialername: string;
      dailerinfo: string;
      topticketPersent: number;
      dailercolor: string;
    };
    linerchart: {
      series: any[];
    };
  };
  FILMFORCE: {
    dailer: {
      dialername: string;
      dailerinfo: string;
      topticketPersent: number;
      dailercolor: string;
    };
    linerchart: {
      series: any[];
    };
  };
  advanceticket: {
    dailer: {
      dialername: string;
      dailerinfo: string;
      topticketPersent: number;
      dailercolor: string;
    };
    linerchart: {
      series: string;
      xaxis: any[];
    };
  };
};
interface Props {
  SEOdata: {
    children?: any[] | undefined;
    tag: any[] | undefined;
  };
  FilmDetailsData: filmsdetail_data;
  film_id: string;
}
const FilmDetail = (props: Props) => {
  const { SEOdata, FilmDetailsData, film_id } = props;
  const API_URL = process.env.NEXT_PUBLIC_SD_API;
  const [favData, setFavData] = useState(0);
  // const [chartclick, setChartclick] = useState(false);
  const [advmovie, setAdvmovie] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  useEffect(() => {
    const LOGGED_EMAIL: string = localStorage.getItem('email') || '';
    const getFavLists = () => {
      var fav_saveurl = API_URL + '/login/favorite_get_all.php';
      axios
        .get(fav_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            fav_type: window.btoa('fav_filmdata'),
            fav_id: window.btoa(FilmDetailsData.id),
          },
        })
        .then((res) => {
          setFavData(res.data);
        })
        .catch((err) => console.log('Movie lists error ', err));
    };
    getFavLists();

    const login_email: string = localStorage.getItem('email') || '';
    if (login_email !== '' && admin_emails.indexOf(login_email) > -1) {
      setIsAdminUser(true);
    }
  }, []);
  useEffect(() => {
    /* youtube link replace*/
    const popurl: string[] = [];
    $('a.popvid, a.popvidgallery, a.popvidbox').each(function (this: HTMLElement, i: number) {
      const href = $(this).attr('href');
      if (href) {
        popurl.unshift(href);
        const popnew: string[] = [];
        popnew.unshift(popurl[i].replace('youtu.be/', 'www.youtube.com/watch?v='));
        $(this).attr('href', popnew[i]);
      }
    });

    //show advance movie data if coming from pro page
    if (window.location.hash === '#advanced') {
      setTimeout(() => {
        setAdvmovie(true);
      }, 500);
    }
  }, []);

  const toggleClick = () => {
    setAdvmovie(!advmovie);
  };

  if (FilmDetailsData.error === 'Page Not Found!' || SEOdata.tag === null) {
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
      <div className='filmdetailsec'>
        <div className='info_box'>
          <>
            <MovieDetailBanner data={FilmDetailsData} favoriteList={favData} toggleClick={toggleClick} mdetailshow={advmovie} />
            <AdminEditLink data={FilmDetailsData} />
            {!advmovie && (FilmDetailsData.forcast_show ? '' : <BoxSummary data={FilmDetailsData} mdetailshow={advmovie} />)}
            {advmovie && <Detailtab FilmDetailsData={FilmDetailsData} isAdminUser={isAdminUser} />}
            {!advmovie && (
              <>
                {FilmDetailsData.top_cast.length > 0 && <Casts data={FilmDetailsData.top_cast} />}
                {FilmDetailsData.movie_images && <Photos data={FilmDetailsData.movie_images} />}
                {FilmDetailsData.film_video && <Videos data={FilmDetailsData.film_video} />}
                <TheatreTiming data={FilmDetailsData} film_id={film_id} mdetailshow={advmovie} />
                {(FilmDetailsData.plot_summary || FilmDetailsData.story_line) && <Summary data={FilmDetailsData} />}
                {FilmDetailsData.news.length >= 1 && <NewsUpdate data={FilmDetailsData.news} />}
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default FilmDetail;
