import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
// import '../../../Header/magnific-popup.min.css';
import ditlbnrimg from '../../../public/images/detailbnrbg.jpg';
import Countday from '../../countdownday/countdown';

const ERRORLOGIN = 'Please Login First! ';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
}

const MovieDetailBanner = ({ data, favoriteList, clickdata, advclick, mdetailshow }) => {
  //const [chartrun , setChartrun] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_SD_API;
  const [items, setItems] = useState([]);
  var ID = data.film_titles;

  useEffect(() => {
    if (favoriteList == 1) {
      setItems([ID]);
    }
  }, [favoriteList]);

  const charthandler = (e) => {
    clickdata();
  };
  const mdetailhandler = (e) => {
    advclick();
    // console.log(advmovieshow)
  };

  useEffect(() => {
    const $ = window.jQuery;
    $('.popvid , .popvidbox').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
      iframe: {
        markup:
          '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<div class="mgpiframwrap">' +
          '<iframe class="mfp-iframe" id="videoiframe" frameborder="0" allow="autoplay; fullscreen" ></iframe>' +
          //'<div class="mfp-title">Some caption</div></div>'+
          '</div>',

        patterns: {
          youtube: {
            index: 'youtube.com/',
            id: 'v=',
            //src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1&mute=1',
            //src: "//www.youtube.com/embed/%id%?rel=0&autoplay=1",
            src: 'https://www.youtube.com/embed/%id%?enablejsapi=1',
          },
        },
      },
      callbacks: {
        markupParse: function (template, values, item) {
          values.title = item.el.attr('title');
        },
        open: function () {
          var iframe = $('.mfp-iframe-scaler').find('iframe');
          iframe.prop('id', 'videoiframe');
          var YouTubeIframeLoader = require('youtube-iframe');
          YouTubeIframeLoader.load(function (YT) {
            var player = new YT.Player('videoiframe', {
              events: {
                onReady: function (e) {
                  e.target.playVideo();
                },
                onStateChange: function (e) {
                  if (e.data === YT.PlayerState.ENDED) {
                    //instance.close();
                  }
                },
              },
            });
          });
          $('body').addClass('popbopen');
        },
        close: function () {
          $('body').removeClass('popbopen');
        },
      },
    });
  }, []);

  const smoothscroll = (e) => {
    // first prevent the default behavior
    e.preventDefault();
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, '');
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  const favoriteHeart = (favoriteId, favoriteType) => {
    if (LOGGED_EMAIL === null || LOGGED_EMAIL === '') {
      alert(ERRORLOGIN);
      return false;
    }

    const addFavoriteAll = async () => {
      var favmobvie_addurl = API_URL + '/login/favorite_all.php';
      // setLoadingFav(LOADER);
      await axios
        .get(favmobvie_addurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            favoriteType: window.btoa(favoriteType),
            favoriteId: window.btoa(favoriteId),
          },
        })
        .then((res) => {
          setItems(res.data);
        });
    };
    addFavoriteAll();
  };

  return (
    <section className={data.landscape_image ? 'mvdetail_banner pvr detailbnrimgadd' : 'mvdetail_banner pvr '}>
      {data.landscape_image && (
        <div className='detailbnrimg'>
          <img src={data.landscape_image} alt='' className='objctimg_box' />
        </div>
      )}

      <div className='container'>
        <div className='changepagelink'>
          <label htmlFor=''>
            View{' '}
            <span className='adv_detail' onClick={charthandler}>
              {' '}
              Advanced Movie Data <i className='fal fa-info-circle greytxt'></i>
            </span>
            <span className='m_detail' onClick={mdetailhandler}>
              {' '}
              Movie Details <i className='fal fa-info-circle greytxt'></i>
            </span>
          </label>
          <p className='adv_detail'>
            <span>View box office forecast and results and data from online trends</span>
          </p>
          <p className='m_detail'>
            <span>View General Movie information including synopsis, ratings and a gallery of images and videos</span>
          </p>
        </div>

        <div className='mvdetail_box df fww'>
          <div className='media_mvslicbox distcl_media'>
            {/*<a title="" className={data.trailer_link ? 'popvid popyoutube' : ''} href={data.trailer_link ? data.trailer_link : '#!'}>*/}
            {/*data.trailer_link && (
                <span className="playtxt printdochide">
                  Watch Trailer <i className="far fa-play-circle"></i>
                </span>
              )*/}

            {data.poster_img && (
              <div className='artinfoimg pvr'>
                <img className='objctimg_box' src={data.poster_img} alt='' />
              </div>
            )}
            {data.poster_img_div && (
              <div
                className='artinfoimg noimgbrand'
                dangerouslySetInnerHTML={{
                  __html: data.poster_img_div,
                }}></div>
            )}
            {/*</a>*/}
            {/* data.trailer_link && ( <a title="" className="popvid popyoutube" href={data.trailer_link} >
                <span className="playtxt printdochide">Watch Trailer</span></a> )*/}

            <ul className='social-links df fww printdochide'>
              {data.facebook && (
                <li>
                  <a href={data.facebook} target='_blank' title='Facebook'>
                    <i className='fab fa-facebook-f' aria-hidden='true'></i>
                  </a>
                </li>
              )}
              {data.instagram && (
                <li>
                  <a href={data.instagram} target='_blank' title='Instagram'>
                    <i className='fab fa-instagram' aria-hidden='true'></i>
                  </a>
                </li>
              )}
              {data.twitter && (
                <li>
                  <a href={data.twitter} target='_blank' title='Twitter'>
                    <i className='fab fa-twitter' aria-hidden='true'></i>
                  </a>
                </li>
              )}
              {data.wikipedia && (
                <li>
                  <a href={data.wikipedia} target='_blank' title='Wikipedia'>
                    <i className='fab fa-wikipedia-w' aria-hidden='true'></i>
                  </a>
                </li>
              )}
              {data.distributor_movie_page && (
                <li>
                  <a href={data.distributor_movie_page} target='_blank' title='Distributor Movie Site'>
                    <i className='fas fa-browser'></i>
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className='mvdetail_info'>
            <h1>
              {data.title}
              <span onClick={() => favoriteHeart(ID, 'fav_filmdata')} className={data.favorite === 1 || items.includes(ID) ? 'favheart  redtxt biofavico' : 'favheart biofavico '}>
                <i className={data.favorite === 1 || items.includes(ID) ? 'fas fa-heart redtxt' : 'far fa-heart '}></i>
              </span>
            </h1>
            <a title='' className='' href={data.dis_title_link}>
              <span
                className='filmproducer'
                dangerouslySetInnerHTML={{
                  __html: data.dis_title,
                }}></span>
            </a>
            <ul className='ratinginfo_tags'>
              {data.release_date_year && <li>{data.release_date_year}</li>}
              {data.rating && (
                <li>
                  <span>{data.rating}</span>
                </li>
              )}
              {data.runtime && <li>{data.runtime}</li>}
              {data.genre && <li>{data.genre}</li>}
            </ul>
            {/* {console.log(mdetailshow)} */}
            {!mdetailshow && (
              <>
                <ul className='df fww criticratings'>
                  {/*
              <li className="sdrating">
                <a href="#!" className="ghostbtn">
                  <span className="scoreico">
                    <img
                      src="/wp-content/themes/screendollars-child/assets/images/sdicon.svg"
                      alt=""
                    />
                  </span>
                  <strong>4.3 Rate Now</strong>
                </a>
              </li>
              */}

                  {data.cinema_rating && (
                    <li>
                      <span className='scoreico'>
                        <img src={data.cinema_rating_img} alt='' />
                      </span>
                      <label htmlFor=''>{data.cinema_rating}</label>
                    </li>
                  )}
                  {data.imdbrating && (
                    <li>
                      <span className='scoreico'>
                        <img src={data.imdbrating_img} alt='' />
                      </span>
                      <label htmlFor=''>{data.imdbrating}</label>
                    </li>
                  )}
                  {data.rotten_critics_score && (
                    <li>
                      <span className='scoreico'>
                        <img src={data.rotten_critics_score_img} alt='' />
                      </span>
                      <label htmlFor=''>{data.rotten_critics_score}</label>
                    </li>
                  )}
                  {data.rotten_audience_score && (
                    <li>
                      <span className='scoreico'>
                        <img src={data.rotten_audience_score_img} alt='' />
                      </span>
                      <label htmlFor=''>{data.rotten_audience_score}</label>
                    </li>
                  )}
                </ul>

                <p className='sd_m_data'>{data.synopsis}</p>

                {/*  client removed this line
             { (data.plot_summary || data.story_line )  &&   
             <Link href="#viewsummary" className="tosummary sd_m_data" onClick={smoothscroll}>
            <strong><u>View Summaries</u></strong>
            {' '}<i className="fal fa-angle-right"></i></Link>
            } */}

                <div>
                  {data.public_movie_website && (
                    <a href={data.public_movie_website} target='_blank' className='officewebsite' title='Official Website'>
                      <i className='far fa-external-link'></i> <span>Official Website</span>
                    </a>
                  )}
                </div>
              </>
            )}

            {/* {data.format && (
              <p className='sd_m_data'>
                <strong>Technical Specs: </strong> {data.format}
              </p>
            )} */}
            {data.comments && (
              <p className='sd_m_data'>
                <strong>Note: </strong> {data.comments}
              </p>
            )}
            <div className='releasinginfo_dates'>
              <strong>
                <u>Release Date</u>
              </strong>

              <div className='limitdate'>
                {data.release_date && (
                  <>
                    <p>
                      {data.release_date}
                      {data.release_date_count_down < 30 && data.release_date_count_down != '' && (
                        <span className='releasedateinfo'>
                          <Countday data={data.release_date_count_down} />
                        </span>
                      )}
                      {data.release_date_note && <>{data.release_date_note}</>}
                      {data.release_date_info}
                    </p>
                  </>
                )}
                {data.re_release_boxoffice &&
                  data.re_release_boxoffice.map((item, index) => {
                    return <p>{item.release_date + ' (' + item.release_name + ')'}</p>;
                  })}
              </div>
            </div>
            {!mdetailshow && data.additional_key_dates && (
              <div className='otherkeydate'>
                <p>
                  <strong>
                    <u>Other Key Dates</u>
                  </strong>
                </p>
                <div className='widedate'>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data.additional_key_dates,
                    }}
                    className='m-0'></p>
                </div>
              </div>
            )}

            {!mdetailshow && (
              <div className='mvbnr_price sd_m_data'>
                {data.trailer_link && (
                  <a title='' className='popvid popyoutube ghostbtn' href={data.trailer_link}>
                    Watch Trailer
                  </a>
                )}
                {/*<a href="#" className="ghostbtn">find showtimes</a>  */}

                {data.watch_now && (
                  <a href={data.watch_now} title='Watch Now' className='ghostbtn' target='_blank'>
                    Watch Movie
                  </a>
                )}
              </div>
            )}

            {mdetailshow && data.production_budget && (
              <div className='movie_budget sd_adv_data'>
                <strong>Production Budget: </strong>{' '}
                <span>
                  {' '}
                  {data.production_budget}
                  <small> (Estimated)</small>
                </span>
              </div>
            )}

            {mdetailshow && data.comparable_films.length >= 1 && (
              <div className='movie_comparables sd_adv_data'>
                <div className='top_txt df fww'>
                  <h3>Comparable Titles:</h3>
                  <span className='ghostbtn goldbtn hide'>Add Movie to Compare</span>
                </div>
                <div className='movie_comparablesbox grid gap16'>
                  {data.comparable_films.map((item, index) => {
                    return (
                      <div className='moviecomp_col' key={index}>
                        <span className='close hide'>+</span>
                        <h4>
                          <a href={item.link} title={item.title}>
                            {item.title}{' '}
                          </a>
                          <span>({item.release_date_year})</span>
                        </h4>
                        {item.release_date && (
                          <p>
                            <strong>Opened: </strong> <span>{item.release_date}</span>
                          </p>
                        )}
                        {item.opening_weekend && (
                          <p>
                            <strong>Opening Weekend: </strong>
                            <span>{item.opening_weekend} </span>
                          </p>
                        )}

                        {item.production_budget && (
                          <p>
                            <strong>Production Budget: </strong>
                            <span>{item.production_budget}</span>
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailBanner;
