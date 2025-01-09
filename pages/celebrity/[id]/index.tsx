import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import Faq from '../../../components/Faq/Faq';
import Awards from '../../../components/FilmData/DetailPages/Biography/Awards';
import Facts from '../../../components/FilmData/DetailPages/Biography/Facts';
import Filmography from '../../../components/FilmData/DetailPages/Biography/Filmography';
import KnownFor from '../../../components/FilmData/DetailPages/Biography/KnownFor';
import Navigation from '../../../components/FilmData/DetailPages/Biography/Navigation';
import NewsUpdate from '../../../components/FilmData/DetailPages/Biography/NewsUpdate';
import PeopleSearch from '../../../components/FilmData/DetailPages/Biography/PeopleSearch';
import PersonalDetails from '../../../components/FilmData/DetailPages/Biography/PersonalDetails';
import PersonIntro from '../../../components/FilmData/DetailPages/Biography/PersonIntro';
import Photos from '../../../components/FilmData/DetailPages/Biography/Photos';
import Videos from '../../../components/FilmData/DetailPages/Biography/Videos';
import Page404 from '../../../components/Page404';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import HeadComponent from '../../../components/HeadComponent';

interface PersonalDetail {
  // Add specific types based on your data structure
  [key: string]: any;
}

interface TalentFaq {
  a: string;
  q?: string;
}

interface BiographyData {
  error?: string;
  talent_attachment: string;
  name: string;
  film_photos?: any[];
  talent_videos?: any[];
  personal_details?: PersonalDetail;
  known_for: any[];
  award_list: any[];
  award_descriptions?: any;
  talent_movie_data_new: any[];
  facts?: string[];
  talent_faq: TalentFaq[];
  news?: any[];
  people_also_search: any[];
}

interface SEOData {
  tag: string | null;
  // Add more specific types based on your SEO data structure
}

interface BiographyProps {
  SEOdata: SEOData;
  BiographyData: BiographyData;
}

const API_URL = process.env.NEXT_PUBLIC_SD_API;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const id = params?.id as string;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SEO_LINK}celebrity/${id}`);
  const SEOdata = await res.json();
  
  if (!SEOdata) {
    return {
      notFound: true,
    };
  }

  const biographyRes = await fetch(
    `${process.env.NEXT_PUBLIC_SD_API}/detail_pages/talent_detail.php?url=${
      process.env.NEXT_PUBLIC_MENU_URL
    }celebrity/${id}/&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`
  );
  const BiographyData = await biographyRes.json();

  return {
    props: { SEOdata, BiographyData },
    revalidate: 10,
  };
};

declare global {
  interface Window {
    jQuery:any;
  }
}

const Biography: React.FC<BiographyProps> = ({ SEOdata, BiographyData }) => {
  const router = useRouter();
  const [favData, setFavData] = useState<number>(0);

  useEffect(() => {
    const LOGGED_EMAIL = localStorage.getItem('email');
    
    const getFavLists = async (): Promise<void> => {
      try {
        const fav_saveurl = `${API_URL}/login/favorite_get_all.php`;
        const response = await axios.get(fav_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL || ''),
            fav_type: window.btoa('fav_actors'),
            fav_id: window.btoa(BiographyData.talent_attachment),
          },
        });
        setFavData(response.data);
      } catch (err) {
        console.log('Distributor lists error ', err);
      }
    };

    getFavLists();
  }, [BiographyData.talent_attachment]);

  useEffect(() => {
    const $ = window.jQuery;
    if (!$) return;

    $('.photoslid .photo_slidbox').each(function() {
      const $photo_slidbox = $(this);

      $photo_slidbox.magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-with-zoom galleryslid',
        gallery: {
          enabled: true,
          preload: [0, 1],
        },
        callbacks: {
          elementParse: function(item: any) {
            if (item.el[0].className === 'popvidbox') {
              item.type = 'iframe';
              item.iframe = {
                markup:
                  '<div class="mfp-iframe-scaler">' +
                  '<div class="mfp-close"></div>' +
                  '<div class="mgpiframwrap">' +
                  '<iframe class="mfp-iframe" id="videoiframe" frameborder="0" allow="autoplay; fullscreen" ></iframe>' +
                  '</div>',
                patterns: {
                  youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: 'https://www.youtube.com/embed/%id%?enablejsapi=1',
                  },
                  vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: '//player.vimeo.com/video/%id%?autoplay=1',
                  },
                  gmaps: {
                    index: '//maps.google.',
                    src: '%id%&output=embed',
                  },
                },
              };
            } else {
              item.type = 'image';
              item.tLoading = 'Loading image #%curr%...';
              item.mainClass = 'mfp-img-mobile';
              item.image = {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
              };
            }
          },
        },
      });
    });

    $('.vidhero .vidhero_info .readmore_btn, .person_introbox .readmore_btn, .readmore_btn').click(function() {
      $(this).parent().toggleClass('open');
      $(this).hide();
      $('.person_info').removeAttr('style');
    });

    let totalHeight = 0;
    $('.person_info').children().each(function() {
      totalHeight += $(this).outerHeight(true);
    });

    if (totalHeight > 410) {
      $('.person_introbox .person_info').css('height', '358px');
    } else {
      $('.person_info + .readmore_btn').hide();
    }
  }, []);

  if (BiographyData.error === 'Page Not Found!' || SEOdata.tag === null) {
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
      <PersonIntro data={BiographyData} favoriteList={favData} />
      <AdminEditLink data={BiographyData} />
      <Navigation data={BiographyData} />
      {BiographyData.film_photos && <Photos data={BiographyData.film_photos} />}
      {BiographyData.talent_videos && <Videos data={BiographyData.talent_videos} />}
      {BiographyData.personal_details && <PersonalDetails data={BiographyData.personal_details} />}
      {BiographyData.known_for.length > 0 && <KnownFor data={BiographyData.known_for} />}
      {BiographyData.award_list.length > 0 && BiographyData.award_descriptions && (
        <Awards a_list={BiographyData.award_list} a_dic={BiographyData.award_descriptions} />
      )}
      {BiographyData.talent_movie_data_new.length > 0 && (
        <Filmography data={BiographyData.talent_movie_data_new} />
      )}
      {BiographyData.facts && <Facts data={BiographyData.facts} name={BiographyData.name} />}
      {BiographyData.talent_faq.length > 0 && BiographyData.talent_faq[0].a && (
        <Faq data={BiographyData.talent_faq} />
      )}
      {BiographyData.news && BiographyData.news.length > 0 && <NewsUpdate data={BiographyData.news} />}
      {BiographyData.people_also_search.length > 0 && (
        <PeopleSearch data={BiographyData.people_also_search} />
      )}
    </>
  );
};

export default Biography;

