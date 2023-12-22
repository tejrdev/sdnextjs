import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Loader from '../../../components/Loader';

import Casts from '../../../components/FilmData/FilmDetail/Casts';
import FilmReview from '../../../components/FilmData/FilmDetail/FilmReview';
import MovieDetailBanner from '../../../components/FilmData/FilmDetail/MovieDetailBanner';
import NewsUpdate from '../../../components/FilmData/FilmDetail/NewsUpdate';
import Photos from '../../../components/FilmData/FilmDetail/Photos';
import TheatreTiming from '../../../components/FilmData/FilmDetail/TheatreTiming';
import Summary from '../../../components/FilmData/FilmDetail/Summarysec';
// import UserComment from '../../../components/FilmData/FilmDetail/UserComment';

import Videos from '../../../components/FilmData/FilmDetail/Videos';
import Chartforcast from '../../../components/FilmData/FilmDetail/Chart_forcast';
// import Forcastchart from "../../../components/FilmData/FilmDetail/Forcastchart";
import imgData from '../../../components/data.json';
import Page404 from '../../../components/Page404';

//import AdvanceTicket from '@/components/FilmData/FilmDetail/AdvanceTicket';
import Detailtab from '@/components/FilmData/FilmDetail/DetailTab';
import BoxSummary from '@/components/FilmData/FilmDetail/BoxSummary';

import { FaChevronRight } from "react-icons/fa6";



const $ = require('jquery');
export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const film_id = params.film_id;
  // // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'film-detail/' + film_id);
  const data = await res.json();

  // let FilmDetailsData;
  let FilmDetailsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/film-detail.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'film-detail/' + film_id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  FilmDetailsData = await FilmDetailsData.json();

  return {
    props: { data, FilmDetailsData, film_id },
    revalidate: 10, // In seconds
  };
}

const FilmDetail = ({ data, FilmDetailsData, film_id }) => {
  const API_URL = process.env.NEXT_PUBLIC_SD_API;
  const router = useRouter();
  const [favData, setFavData] = useState(0);
  const [chartclick, setChartclick] = useState(false);
  const [advmovie, setAdvmovie] = useState(false);
  const [moviedetail, setMoviedetail] = useState(true);
  // const dispatch = useDispatch();
  // const [FilmDetailsDataLoaded, setFilmDetailsDataLoaded] = useState(false);
  // const [FilmDetailsData, setFilmDetailsData] = useState([]);

  // useEffect(() => {
  //   loadDetailPageData();
  // }, []);

  useEffect(() => {
    var LOGGED_EMAIL = localStorage.getItem('email');
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
  }, []);
  useEffect(() => {
    $('.changepagelink .adv_detail').show();
    $('.changepagelink .m_detail').hide();
    //$('.sd_adv_data').hide();
    $('.detailtab').hide();

    $('.changepagelink .adv_detail').click(function () {
      $('.changepagelink .adv_detail').hide();
      $('.changepagelink .m_detail').show();
      $('.sd_m_data').hide();
      //$('.sd_adv_data').show();
      $('.detailtab').show();
      $('.info_box > .boxsummery ').hide();
    });

    $('.changepagelink .m_detail').click(function () {
      $('.changepagelink .adv_detail').show();
      $('.changepagelink .m_detail').hide();
      $('.sd_m_data').show();

      //$('.sd_adv_data').hide();
      $('.detailtab').hide();
      $('.info_box > .boxsummery ').show();
    });

    $('.boxsummery a.adv_tab_click')
      .last()
      .on('click', function () {
        $('.changepagelink a.adv_detail').trigger('click');
        //return false;
      });

    /* youtube link replace*/
    var popurl = [];
    $('a.popvid , a.popvidgallery , a.popvidbox').each(function (i) {
      popurl.unshift($(this).attr('href'));
      for (var i = 0; i < popurl.length; i++) {
        var popnew = [];
        popnew.unshift(popurl[i].replace('youtu.be/', 'www.youtube.com/watch?v='));
        $(this).eq(i).attr('href', popnew[i]);
      }
    });

    //show advance movie data if coming from pro page
    if (window.location.hash === '#advanced') {
      setTimeout(() => {
        $('.changepagelink .adv_detail').click();
      }, 500);
    }
  }, []);

  const handelclickdata = () => {
    setChartclick(true);
    setAdvmovie(true);
    localStorage.setItem('isOriginalRelease', true);
  };
  const handeladvmovie = () => {
    setAdvmovie(false);
  };
  const handelclickindata = () => {
    setChartclick(true);
    setAdvmovie(true);
    localStorage.setItem('isOriginalRelease', true);
  };

  // const loadDetailPageData = () => {
  //   axios
  //     .get(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/film-detail.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'film-detail/' + film_id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
  //     .then((res) => {
  //       setFilmDetailsData(res.data);
  //       setFilmDetailsDataLoaded(true);
  //     })
  //     .catch((err) => console.log(err));
  // };
  if (FilmDetailsData.error === 'Page Not Found!') {
    return (
      <>
        <Head>
          <meta name='robots' content='noindex' />
        </Head>
        <Page404 />
      </>
    );
  }
  /*console.log(Object.keys(FilmDetailsData).length)*/
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
      <div className='filmdetailsec'>
        <div className='info_box'>
          <>
            <MovieDetailBanner data={FilmDetailsData} favoriteList={favData} clickdata={handelclickdata} advclick={handeladvmovie} mdetailshow={advmovie} />
            {/* <pre>{JSON.stringify(FilmDetailsData , null, 2)}</pre> */}
            {FilmDetailsData.forcast_show ? '' : <BoxSummary data={FilmDetailsData} mdetailshow={advmovie} clickdata={handelclickindata} />}
            {/* {console.log(FilmDetailsData)} */}
            {/* {FilmDetailsData.forcast_show && <Chartforcast data={FilmDetailsData} />} */}
            {/* {FilmDetailsData.forcast_show && <Forcastchart />} */}
            {advmovie && <Detailtab FilmDetailsData={FilmDetailsData} />}
            {FilmDetailsData.top_cast.length > 0 && <Casts data={FilmDetailsData.top_cast} />}
            {FilmDetailsData.movie_images && <Photos data={FilmDetailsData.movie_images} />}
            {FilmDetailsData.film_video && <Videos data={FilmDetailsData.film_video} />}
            <section className="tecotherinfo">
              <div className="container">
                <div className="tecinfo grid">
                  <div className="techinfoitem">
                    <h4>Technical Specifications <FaChevronRight /></h4>
                    <p><strong> Sound Mix: </strong> Dolby Atmos</p>
                    <p><strong> Aspect Ratio: </strong> 2.39 : 1</p>
                  </div>
                  <div className="techinfoitem">
                    <h4>Other Details <FaChevronRight /></h4>
                    <p><strong> Country of Origin:  </strong> USA </p>
                    <p><strong> Language:  </strong> English</p>
                  </div>
                </div>
              </div>
            </section>
            <TheatreTiming film_id={film_id} mdetailshow={advmovie} />

            {(FilmDetailsData.plot_summary || FilmDetailsData.story_line) && <Summary data={FilmDetailsData} />}
            {/*
            <FilmReview data={FilmDetailsData} />
            <UserComment data={FilmDetailsData} />            
            */}
            {FilmDetailsData.news.length >= 1 && <NewsUpdate data={FilmDetailsData.news} />}

            <div id='film_media' className='white-popup-block  mfp-hide formpopbox'>
              <div className='formpop_info'>
                <div className='allvidtop_txt'>
                  <div className='container'>
                    <div className='allvidhead pvr'>
                      <h2 className='h1'>
                        {' '}
                        <span>Videos and Images for</span>
                        {FilmDetailsData.title}
                      </h2>
                    </div>
                  </div>
                </div>
                {FilmDetailsData.film_video && (
                  <section className='videos_gal sd_m_data'>
                    <div className='container'>
                      <div className='videosgal_in'>
                        <div className='top_txt linehead'>
                          <h2 className='h3'>Videos</h2>
                        </div>
                        <div className='videogalcount'>
                          <div className='videogal_total'>
                            {' '}
                            <span className='vidfirstcount'>1</span>-<span className='vidlastcount'>{FilmDetailsData.film_video.length}</span> Of <span className='slideitems'>{FilmDetailsData.film_video.length}</span> Videos{' '}
                          </div>
                        </div>
                        <div className='row'>
                          <div className='videogal_box df fww'>
                            {FilmDetailsData.film_video.map((item, index) => {
                              return (
                                <div className='videogal_item' key={index}>
                                  <div className='videoitem_box'>
                                    <a title='' className='popvidbox' href={item.video_url}>
                                      <div className='playvid_box'>
                                        <span className='playico'>
                                          <img src={imgData.playicon} alt='play' />
                                        </span>
                                        <div className='artinfoimg  pvr'>
                                          <img src='https://i.ytimg.com/vi/ZtgTS87DOGQ/hqdefault.jpg' alt='' className='objctimg_box' />
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className='galslide__arrows df fww'>
                            <div className='gelslide__dots'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {FilmDetailsData.movie_images && (
                  <section className='photodetail_gal distdetail_gal sd_m_data'>
                    <div className='container'>
                      <div className='photodtl_in'>
                        <div className='top_txt linehead'>
                          <h2 className='h3'>Images</h2>
                        </div>
                        <div className='photoogalcount df fww'>
                          {/* <div className="videogal_total">
                        {' '}
                        <span className="vidfirstcount"></span>-
                        <span className="vidlastcount"></span> Of{' '}
                        <span className="slideitems"></span>
                      </div> */}
                        </div>
                        <div className='row'>
                          <div className='photogal_box df fww'>
                            {FilmDetailsData.movie_images.map((item, index) => {
                              return (
                                <div className='photogalitem_box' key={index}>
                                  <a className='media_gallery' href={item.url} title='bannerbg.jpg'>
                                    <div className='photoinfoimg  pvr'>
                                      <img src={item.url} alt='' className='objctimg_box' />
                                    </div>
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                          <div className='galslide__arrows df fww'>
                            <div className='gelslide__dots'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default FilmDetail;
