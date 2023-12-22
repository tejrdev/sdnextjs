import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Loader from '../../../components/Loader';
import Faq from '@/components/Faq/Faq';
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
import imgData from '../../../components/data.json';
import Page404 from '../../../components/Page404';
//import RankMathSEO from '@/components/RankMathSEO';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
}

// Fetching data from the JSON file
//import fsPromises from 'fs/promises';
//import path from 'path'

export async function getStaticProps(context) {
  const { params } = context;

  // const filePath = path.join(process.cwd(), '/pages/biography/filmography.json');
  // const jsonData = await fsPromises.readFile(filePath);
  // const objectData = JSON.parse(jsonData);

  const id = params.id;
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'biography/' + id);
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  let BiographyData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/talent_detail.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'biography/' + id + '/&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  BiographyData = await BiographyData.json();

  return {
    props: { data, BiographyData },
    revalidate: 10, // In seconds
  };
}

const Biography = ({ data, BiographyData }) => {
  const router = useRouter();
  const { id } = router.query;
  const [favData, setFavData] = useState(0);
  // const [BiographyDataLoaded, setBiographyDataLoaded] = useState(false);
  // const [BiographyData, setBiographyData] = useState([]);

  // useEffect(() => {
  //   loadBiographyData();
  // }, []);
  useEffect(() => {
    var LOGGED_EMAIL = localStorage.getItem('email');
    const getFavLists = () => {
      var fav_saveurl = API_URL + '/login/favorite_get_all.php';
      axios
        .get(fav_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            fav_type: window.btoa('fav_actors'),
            fav_id: window.btoa(BiographyData.talent_attachment),
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
    const $ = window.jQuery;

    $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault();

      $('html, body').animate(
        {
          scrollTop: $($.attr(this, 'href')).offset().top - 15,
        },
        500
      );
    });

    $('.photoslid .photo_slidbox').each(function () {
      var $photo_slidbox = $(this);

      $photo_slidbox.magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-with-zoom galleryslid',
        gallery: {
          enabled: true,
          preload: [0, 1],
        },
        callbacks: {
          elementParse: function (item) {
            //console.log(item.el[0].className);
            if (item.el[0].className == 'popvidbox') {
              // eslint-disable-next-line no-unused-expressions
              (item.type = 'iframe'),
                (item.iframe = {
                  markup:
                    '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<div class="mgpiframwrap">' +
                    '<iframe class="mfp-iframe" id="videoiframe" frameborder="0" allow="autoplay; fullscreen" ></iframe>' +
                    //'<div class="mfp-title">Some caption</div></div>'+
                    '</div>',
                  patterns: {
                    youtube: {
                      index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                      id: 'v=', // String that splits URL in a two parts, second part should be %id%
                      // Or null - full URL will be returned
                      // Or a function that should return %id%, for example:
                      // id: function(url) { return 'parsed id'; }

                      //src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
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
                });
            } else {
              // eslint-disable-next-line no-unused-expressions
              (item.type = 'image'),
                (item.tLoading = 'Loading image #%curr%...'),
                (item.mainClass = 'mfp-img-mobile'),
                (item.image = {
                  tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                });
            }
          },
        },
      });
    });

    $('.vidhero .vidhero_info .readmore_btn , .person_introbox .readmore_btn , .readmore_btn').click(function () {
      $(this).parent().toggleClass('open');
      $(this).hide();
      $('.person_info').removeAttr('style');
    });
    var totalHeight = 0;
    $('.person_info')
      .children()
      .each(function () {
        totalHeight = totalHeight + $(this).outerHeight(true);
      });
    if (totalHeight > 410) {
      $('.person_introbox .person_info').css('height', '358px');
    } else {
      $('.person_info + .readmore_btn').hide();
    }
  }, []);

  if (BiographyData.error === 'Page Not Found!') {
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
      {/* {BiographyDataLoaded && ( */}
      <PersonIntro data={BiographyData} favoriteList={favData} />
      <Navigation data={BiographyData} />
      {BiographyData.film_photos && <Photos data={BiographyData.film_photos} />}
      {BiographyData.talent_videos && <Videos data={BiographyData.talent_videos} />}
      {BiographyData.personal_details && <PersonalDetails data={BiographyData.personal_details} />}
      {BiographyData.Filmography.length > 1 && <KnownFor data={BiographyData.Filmography} />}
      { (BiographyData.award_list.length >= 1 || BiographyData.award_descriptions) && <Awards a_list={BiographyData.award_list} a_dic ={BiographyData.award_descriptions} /> }

      {BiographyData.talent_movie_data.length >= 1 && <Filmography data={BiographyData.talent_movie_data} />}
      {BiographyData.facts && <Facts data={BiographyData.facts} name={BiographyData.name} />}
      {BiographyData.talent_faq.length >= 1 && <Faq data={BiographyData.talent_faq} />}
      {BiographyData.news && BiographyData.news.length > 0 && <NewsUpdate data={BiographyData.news} />}
      {BiographyData.people_also_search.length > 1 && <PeopleSearch data={BiographyData.people_also_search} />}

      {/*
          <div id="talent_media" className="white-popup-block  mfp-hide formpopbox">
            <div className="formpop_info">
              <div className="allvidtop_txt">
                <div className="container">
                  <div className="allvidhead pvr">
                    <h1>
                      <span>Videos and Images for</span>
                      {BiographyData.name}
                    </h1>
                  </div>
                </div>
              </div>
              {BiographyData.talent_videos && (
                <section className="videos_gal">
                  <div className="container">
                    <div className="videosgal_in">
                      <div className="top_txt linehead">
                        <h2 className="h3">Videos</h2>
                      </div>
                      <div className="videogalcount">
                        <div className="videogal_total">
                          {' '}
                          <span className="vidfirstcount">1</span>-<span className="vidlastcount">{BiographyData.talent_videos.length}</span> Of{' '}
                          <span className="slideitems">{BiographyData.talent_videos.length}</span> Videos{' '}
                        </div>
                      </div>
                      <div className="row">
                        <div className="videogal_box df fww">
                          {BiographyData.talent_videos.map((item, index) => {
                            return (
                              <div className="videogal_item" key={index}>
                                <div className="videoitem_box">
                                  <a title="" className="popvidbox" href={item.video_url}>
                                    <div className="playvid_box">
                                      <span className="playico">
                                        <img src={imgData.playicon} alt="play" />
                                      </span>
                                      <div className="artinfoimg  pvr">
                                        <img src="https://i.ytimg.com/vi/ZtgTS87DOGQ/hqdefault.jpg" alt="" className="objctimg_box" />
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="galslide__arrows df fww">
                          <div className="gelslide__dots"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {BiographyData.film_photos && (
                <section className="photodetail_gal distdetail_gal">
                  <div className="container">
                    <div className="photodtl_in">
                      <div className="top_txt linehead">
                        <h2 className="h3">Images</h2>
                      </div>
                      <div className="photoogalcount df fww">
                        {/* <div className="videogal_total">
                        {' '}
                        <span className="vidfirstcount"></span>-
                        <span className="vidlastcount"></span> Of{' '}
                        <span className="slideitems"></span>
                      </div>
                      </div>
                      <div className="row">
                        <div className="photogal_box df fww">
                          {BiographyData.film_photos.map((item, index) => {
                            return (
                              <div className="photogalitem_box" key={index}>
                                <a className="media_gallery" href={item.url} title="bannerbg.jpg">
                                  <div className="photoinfoimg  pvr">
                                    <img src={item.url} alt="" className="objctimg_box" />
                                  </div>
                                </a>
                              </div>
                            );
                          })}
                        </div>
                        <div className="galslide__arrows df fww">
                          <div className="gelslide__dots"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
                        */}
    </>
  );
};

export default Biography;
