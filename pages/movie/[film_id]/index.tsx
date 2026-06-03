import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Casts from '../../../components/FilmData/FilmDetail/Casts';
import MovieDetailBanner from '../../../components/FilmData/FilmDetail/MovieDetailBanner';
import Releasedates from '../../../components/FilmData/FilmDetail/Releasedates';
import Funfacts from '../../../components/FilmData/FilmDetail/Funfacts';
import NewsUpdate from '../../../components/FilmData/FilmDetail/NewsUpdate';
import Photos from '../../../components/FilmData/FilmDetail/Photos';
import FilmReview from '../../../components/FilmData/FilmDetail/FilmReview';
import TheatreTiming from '../../../components/FilmData/FilmDetail/TheatreTiming';
import UpcomingReleases from '../../../components/FilmData/UpcomingReleases';
import Summary from '../../../components/FilmData/FilmDetail/Summarysec';
import Videos from '../../../components/FilmData/FilmDetail/Videos';
import Page404 from '../../../components/Page404';
import Detailtab from '../../../components/FilmData/FilmDetail/DetailTab';
import BoxSummary from '../../../components/FilmData/FilmDetail/BoxSummary';
import AdminEditLink from '../../../components/DetailPages/AdminEditLink';
import HeadComponent from '@/components/HeadComponent';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import Technicals from '../../../components/FilmData/FilmDetail/Technicals';
import Faq from '../../../components/Faq/Faq';
import { MovieProps } from '@/types/movies';

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

  const defaultData = {
    FilmDetailsData: {
      data: [],
      error: '',
    },
  };

  const fetchConfigs = [
    {
      url: `${process.env.NEXT_PUBLIC_SEO_LINK}movie/${film_id}`,
      key: 'SEOdata',
      defaultData: { tag: [], children: [] },
    },
    {
      url: `${process.env.NEXT_PUBLIC_SD_API}/detail_pages/film-detail.php?url=${process.env.NEXT_PUBLIC_BACKEND_URL}/movie/${film_id}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
      key: 'FilmDetailsData',
      defaultData: defaultData.FilmDetailsData,
    },
  ];

  const config = await getStaticPropsWithErrorHandling(fetchConfigs);
  config.props.film_id = film_id; // Add film_id to props
  return config;
}

const FilmDetail = (props: MovieProps) => {
  const { SEOdata, FilmDetailsData, film_id, error } = props;
  if (error) {
    return <ErrorDisplay error={error} />;
  }
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

  // Handle scrolling when advanced data is shown
  useEffect(() => {
    if (advmovie) {
      setTimeout(() => {
        const advancedElement = document.getElementById('advanced');
        if (advancedElement) {
          advancedElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 500); // Increased delay to ensure component is fully rendered
    }
  }, [advmovie]);

  if (FilmDetailsData?.error === 'Page Not Found!' || SEOdata?.tag === null) {
    return (
      <>
        <Head>
          <meta name='robots' content='noindex' />
        </Head>
        <Page404 />
      </>
    );
  }
  // Generate JSON-LD schema
  const generateJsonLd = () => {
    const DirectorData = FilmDetailsData.top_cast.find((item) => item.talent_name === 'Director');
    //actors
    const actorsData = FilmDetailsData.top_cast.filter((item) => item.talent_name !== 'Director');
    const actorList = actorsData.map((item) => ({
      '@type': 'Person',
      'name': item.name,
      'url': process.env.NEXT_PUBLIC_FRONTEND_URL + item.link,
    }));
    const genre: string[] = [];
    FilmDetailsData?.primary_genre?.map((item: any) => genre.push(item.name));
    const publishedDate = FilmDetailsData.release_date.includes('|') ? FilmDetailsData.release_date.split('|')[0]?.trim() : FilmDetailsData.release_date;

    return {
      '@context': 'https://schema.org',
      '@type': 'Movie',
      'name': FilmDetailsData.title,
      'url': process.env.NEXT_PUBLIC_FRONTEND_URL + '/movie/' + film_id,
      // "sameAs": [
      //   "https://www.wikidata.org/wiki/Q133886934"
      // ],
      "image": FilmDetailsData.poster_img,
      'description': FilmDetailsData.synopsis,
      "datePublished": publishedDate,
      "genre": genre,
      "director": {
        "@type": "Person",
        "name": DirectorData?.name,
        "url": process.env.NEXT_PUBLIC_FRONTEND_URL + (DirectorData?.link ?? ''),
      },
      "actor": actorList,
    };
  };

  return (
    <>
      <HeadComponent data={SEOdata} jsonSchema={generateJsonLd()} />
      <div className='filmdetailsec'>
        <div className='info_box'>
          <>
            <MovieDetailBanner data={FilmDetailsData} favoriteList={favData} toggleClick={toggleClick} mdetailshow={advmovie} />
            {/* <Releasedates data={FilmDetailsData} /> */}
            <AdminEditLink data={FilmDetailsData} />
            {!advmovie && (FilmDetailsData?.forcast_show ? '' : <BoxSummary data={FilmDetailsData} mdetailshow={advmovie} />)}
            {advmovie && <Detailtab FilmDetailsData={FilmDetailsData} isAdminUser={isAdminUser} />}
            {!advmovie && <TheatreTiming data={FilmDetailsData} film_id={film_id} mdetailshow={advmovie} />}
            {!advmovie && (
              <>
                {FilmDetailsData?.top_cast?.length > 0 && <Casts data={FilmDetailsData.top_cast} />}
                {FilmDetailsData?.movie_images && <Photos data={FilmDetailsData.movie_images} />}
                {FilmDetailsData?.film_video && <Videos data={FilmDetailsData.film_video} />}
                {<Technicals data={FilmDetailsData} />}
                {(FilmDetailsData?.plot_summary || FilmDetailsData?.story_line) && <Summary data={FilmDetailsData} />}
                {FilmDetailsData.movie_review && FilmDetailsData.movie_review.length > 0 && <FilmReview data={FilmDetailsData.movie_review} />}
                {FilmDetailsData.movie_faqs && FilmDetailsData.movie_faqs.length > 0 && <Faq data={FilmDetailsData.movie_faqs} />}
                {FilmDetailsData.fun_facts && FilmDetailsData.fun_facts.length > 0 && <Funfacts data={FilmDetailsData.fun_facts} />}
                {FilmDetailsData.similar_movies && FilmDetailsData.similar_movies.length > 0 && <UpcomingReleases data={FilmDetailsData.similar_movies} title="Similar Movies" />}
                {FilmDetailsData?.news.length >= 1 && <NewsUpdate data={FilmDetailsData.news} />}
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default FilmDetail;
