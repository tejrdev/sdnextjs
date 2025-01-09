import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
// import '../../../Header/magnific-popup.min.css';
import ditlbnrimg from '../../../public/images/detailbnrbg.jpg';
import Countday from '../../countdownday/countdown';
import sdplaceholder2 from '@/public/sdplaceholder2.jpg';

const ERRORLOGIN = 'Please Login First! ';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
}

const MovieDetailBanner = ({ data, favoriteList, toggleClick, mdetailshow }) => {
  //const [chartrun , setChartrun] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_SD_API;
  const isFutureRelease = data.release_date_count_down < 30 && data.release_date_count_down != '' ? true : false;
  const [items, setItems] = useState([]);
  var ID = data.film_titles;

  useEffect(() => {
    if (favoriteList == 1) {
      setItems([ID]);
    }
  }, [favoriteList]);

  // const charthandler = (e) => {
  //   clickdata();
  // };
  // const mdetailhandler = (e) => {
  //   advclick();
  //   // console.log(advmovieshow)
  // };

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
    var popurl = [];
    $('a.popvid , a.popvidgallery , a.popvidbox').each(function (i) {
      popurl.unshift($(this).attr('href'));
      for (var i = 0; i < popurl.length; i++) {
        var popnew = [];
        popnew.unshift(popurl[i].replace('youtu.be/', 'www.youtube.com/watch?v='));
        $(this).eq(i).attr('href', popnew[i]);
      }
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

  const filmgenre = data.genre;
  let filmgenrearr = filmgenre.split(/\s*,\s*/);

  function getytID(url) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

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
            <span className={mdetailshow ? 'm_detail' : 'adv_detail'} onClick={toggleClick}>
              {mdetailshow ? 'Movie Details' : 'Advanced Movie Data'} <i className='fal fa-info-circle greytxt'></i>
            </span>
            {/* <span className='m_detail' onClick={mdetailhandler}>
              Movie Details <i className='fal fa-info-circle greytxt'></i>
            </span> */}
          </label>

          <p className={mdetailshow ? 'm_detail' : 'adv_detail'}>
            <span>
              {mdetailshow ? 'View General Movie information including synopsis, ratings and a gallery of images and videos' : 'View box office forecast and results and data from online trends'}
            </span>
          </p>
        </div>

        <div className='mvdetail_box df fww'>
          <div className='media_mvslicbox distcl_media'>
            {data.poster_img && (
              <div className='artinfoimg pvr'>
                <img
                  className='objctimg_box'
                  src={data.poster_img === null || data.poster_img === 'https://live.screendollars.com/wp-content/uploads/2020/05/no-img.jpg' ? sdplaceholder2.src : data.poster_img}
                  alt=''
                  loading='lazy'
                />
              </div>
            )}
            {data.poster_img_div && (
              <>
                {/* <div className='artinfoimg noimgbrand' dangerouslySetInnerHTML={{ __html: data.poster_img_div, }}></div> */}
                <div className='artinfoimg pvr'>
                  <img className='objctimg_box' src={sdplaceholder2.src} alt='' loading='lazy' />
                </div>
              </>
            )}
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
              {data.release_date_year && <span className='font-normal ml-2'>{'(' + data.release_date_year + ')'}</span>}
              <span onClick={() => favoriteHeart(ID, 'fav_filmdata')} className={data.favorite === 1 || items.includes(ID) ? 'favheart  redtxt biofavico' : 'favheart biofavico '}>
                <i className={data.favorite === 1 || items.includes(ID) ? 'fas fa-heart redtxt' : 'far fa-heart '}></i>
              </span>
            </h1>
            <a title='' className='' href={data?.dis_title_link}>
              <span className='filmproducer' dangerouslySetInnerHTML={{ __html: data.dis_title }}></span>
            </a>
            <ul className='ratinginfo_tags my-4 mx-0'>
              {/* {data.release_date_year && <li>{data.release_date_year}</li>} */}
              {data.rating && (
                <li>
                  <span>{data.rating}</span>
                </li>
              )}
              {data?.runtime && <li>{data?.runtime}</li>}
              {(data?.primary_genre || data?.secondary_genre) && (
                <li>
                  <ul className='ml-0 mt-2'>
                    {data?.primary_genre?.map((item, i) => (
                      <li key={i} className='text-sm inline-block align-top mr-2 mb-2'>
                        <Link href={item.value} className='cursor-pointer hover:no-underline px-3 rounded-3xl text-black capitalize border border-gold pb-[2px] hover:bg-gold-yellow'>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    {data?.secondary_genre?.map((item, i) => (
                      <li key={i} className='text-sm inline-block align-top mr-2 mb-2'>
                        <span className='inline-block px-3 rounded-3xl text-black capitalize border border-gray-400 pb-[2px]'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
            {data.release_date && (
              <div className='capitalize mb-3'>
                <label htmlFor='' className='font-bold'>
                  Release Date:
                </label>
                {' ' + data.release_date}
              </div>
            )}

            {!mdetailshow && (
              <>
                <ul className='df fww criticratings'>
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
                </ul>
                <p className='sd_m_data'>{data.synopsis}</p>
                <div>
                  {data.public_movie_website && (
                    <a href={data.public_movie_website} target='_blank' className='officewebsite' title='Official Website'>
                      <i className='far fa-external-link'></i> <span>Official Website</span>
                    </a>
                  )}
                </div>
                {data.comments && (
                  <div className='sd_m_data flex flex-wrap'>
                    <strong className='pr-1'>Note: </strong>
                    <span dangerouslySetInnerHTML={{ __html: data.comments }}></span>
                  </div>
                )}
              </>
            )}

            {data.extra_release_dates.length > 0 || isFutureRelease ? (
              <div className='releasinginfo_dates'>
                <strong>
                  <u>Releases</u>
                </strong>
                <div className='limitdate'>
                  {isFutureRelease && (
                    <>
                      {data.release_date_info}
                      <span className='releasedateinfo'>
                        <Countday data={data.release_date_count_down} />
                      </span>
                    </>
                  )}
                  {data.extra_release_dates &&
                    data.extra_release_dates.map((date, i) => {
                      if (isFutureRelease && i === 0) return;
                      const isReleaseStep = date.steps;
                      if (isReleaseStep) {
                        return (
                          <ul className='pl-4 mb-0' key={i}>
                            <li>{date.release_date + ' | ' + date.pattern}</li>
                          </ul>
                        );
                      }
                      // const pattern = date.pattern !== '' ? date.pattern + ' | ' : '';
                      const distributior = date.distributior_name !== data.dis_title ? date.distributior_name : '';
                      const release_name = date.release_name !== '' ? date.release_name + (distributior !== '' ? ' (' + distributior + ') ' : '') + '  | ' : '';
                      return <p key={i}>{release_name + date.release_date}</p>;
                    })}
                </div>
              </div>
            ) : null}

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
                    className='m-0'
                  ></p>
                </div>
              </div>
            )}

            {!mdetailshow && (
              <div className='mvbnr_price sd_m_data'>
                {data.trailer_link && (
                  <a title='' className='popvid popyoutube ghostbtn' href={`https://www.youtube.com/watch?v=${getytID(data?.trailer_link ?? '')}`}>
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
                <strong>Production Budget: </strong>
                <span>
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
                          <Link href={item.link} title={item.title}>
                            {item.title}
                          </Link>
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
