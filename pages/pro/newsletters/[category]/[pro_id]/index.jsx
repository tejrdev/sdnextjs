import LayoutPro from '@/components/Layout/LayoutPro';
import { useEffect } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Page404 from '@/components/Page404';
import WeekendChanges from '@/components/Pro/Newsletter/WeekendChanges';
import TopProjected, { Posterearnings } from '@/components/Pro/Newsletter/TopProjected';
import NewOpening from '@/components/Pro/Newsletter/NewOpening';
import OtherNotable from '@/components/Pro/Newsletter/OtherNotable';
import NewsletterTitleBlock from '@/components/Pro/Newsletter/NewsletterTitleBlock';
import PlayIcon from '@/public/images/playicov2.png';

import Image from 'next/image';
import Link from 'next/link';

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const post_id = params.pro_id;
  const category = params.category;

  // load wed data
  let Pro_data;
  if (category === 'wed') {
    Pro_data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/web_newsletter_detail.php?news_id=' + post_id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    Pro_data = await Pro_data.json();
  } else {
    Pro_data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/fri_newsletter_detail.php?news_id=' + post_id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    Pro_data = await Pro_data.json();
  }
  return {
    props: { Pro_data, category },
    revalidate: 10, // In seconds
  };
}

export default function SD_Pro_Newsletter_detail({ Pro_data, category }) {
  if (Pro_data.error === 'not found' || Pro_data.tag === null) {
    return (
      <>
        <Head>
          <meta name='robots' content='noindex' />
        </Head>{' '}
        <Page404 />
      </>
    );
  }
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const loginUser = localStorage.getItem('email');
    if (!loginUser || !user) {
      localStorage.removeItem('email');
      router.replace({
        pathname: '/pro/login',
        query: { from: encodeURIComponent(router.asPath) },
      });
    }

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

  const backlink = category === 'fri' ? '/pro/newsletters/fri/' : '/pro/newsletters/wed/';
  let chngLastYrDataIcon = 'fas';
  if (category === 'wed') {
    if (Pro_data.change_last_year_data?.color === 'green') {
      chngLastYrDataIcon += ' fa-sort-up';
    } else if (Pro_data.change_last_year_data?.color === 'red') {
      chngLastYrDataIcon += ' fa-sort-up';
    }
  }

  const onBackClick = () => {
    router.push(backlink);
  };

  return (
    <>
      <div className='newsltrdetail'>
        <div className='container'>
          <div className='backlink'>
            <i className='far fa-long-arrow-left'></i>{' '}
            <span>
              <strong onClick={onBackClick}>Back To Listing</strong>{' '}
            </span>
          </div>

          {category === 'wed' && (
            <>
              <Pronews_detailtitle dayname={'WEDNESDAY'} weekdateinfo={Pro_data.news_letter_date} />
              <div className='newsletter-side-video-block'>
                {Pro_data.video_ids ? (
                  <a className='popvid pvr' href={Pro_data.video_url} title=''>
                    <div className=' vid_boxslide '>
                      <span className='playico show'>
                        <img src={PlayIcon.src} alt='play' />
                      </span>
                      <figure className='pvr'>
                        <img src={'https://i.ytimg.com/vi/' + Pro_data.video_ids + '/hqdefault.jpg'} alt='' className='objctimg_box' />
                      </figure>
                    </div>
                  </a>
                ) : (
                  <figure className='pvr'>
                    <img src={Pro_data.img_url} alt='' className='objctimg_box' />
                  </figure>
                )}
                <NewsletterTitleBlock Pro_data={Pro_data} />
              </div>
              {Pro_data.week_data.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <WeekendChanges item={item} index={index} />
                    <TopProjected item={item} />
                    <NewOpening item={item} />
                    <OtherNotable item={item} />
                  </React.Fragment>
                );
              })}
            </>
          )}

          {category === 'fri' && (
            <div className='frinewsltrdetail'>
              <Pronews_detailtitle dayname={'Friday'} weekdateinfo={Pro_data.news_letter_date} />
              <h4>Friday Report, a weekly series of emails highlighting the upcoming 13 weeks of wide movie releases, with a forecast of each title’s total domestic box office. You may click on any title for more movie details.</h4>
              <div className='upcomingtitle df fww just-between'>
                <h2 className='uppercase'>Upcoming Wide Releases</h2>
                <h6>
                  <span>Title Includes Estimated Total</span>
                  <span>* Indicates Change or Addition from Previous Week</span>
                </h6>
              </div>
              {Pro_data.week_data?.map((item, index) => (
                <React.Fragment key={index}>
                  <WeekmonthTitle month={item.startdate + '-' + item.enddate} week={item.year + ' Week ' + item.week} />
                  {index === 0 ? (
                    //for first week, display detailed view
                    item.movie_list.map((movie, i) => (
                      <div className='frinewsltr_item' key={i}>
                        <div className='df fww blacktxt'>
                          <figure className='pvr'>
                            <Link href={movie.link}>
                              <Image src={movie.landscape_image} className='objimg' alt='' width={648} height={357} />
                            </Link>
                          </figure>
                          <div className='newsitem_info'>
                            <h3 className='uppercase goldtxt'>
                              <Link href={movie.link}>{movie.title}</Link>
                            </h3>
                            <Link href={movie.dis_title_link}>
                              <p>{movie.dis_title}</p>
                            </Link>
                            <ul className='ratinginfo_tags'>
                              <li>{movie.rating && <span>{movie.rating}</span>}</li>
                              {movie.runtime && <li>{movie.runtime}</li>}
                              {movie.genre && <li>{movie.genre}</li>}
                            </ul>
                            <ul className='df fww criticratings'>
                              {movie.imdbrating && (
                                <li>
                                  <span className='scoreico'>
                                    <img src={movie.imdbrating_img} alt='' />
                                  </span>
                                  <label htmlFor=''>{movie.imdbrating}</label>
                                </li>
                              )}
                              {movie.rotten_critics_score && (
                                <li>
                                  <span className='scoreico'>
                                    <img src={movie.rotten_critics_score_img} alt='' />
                                  </span>
                                  <label htmlFor=''>{movie.rotten_critics_score}</label>
                                </li>
                              )}
                              {movie.rotten_audience_score && (
                                <li>
                                  <span className='scoreico'>
                                    <img src={movie.rotten_audience_score_img} alt='' />
                                  </span>
                                  <label htmlFor=''>{movie.rotten_audience_score}</label>
                                </li>
                              )}
                            </ul>
                            <div className='boxearning'>
                              <p>
                                <strong>Opening Weekend:</strong>
                                {movie.weekend}
                              </p>
                              <p>
                                <strong>Total: </strong>
                                {movie.total}
                              </p>
                              <p>
                                <strong>Locations: </strong>
                                {movie.locations}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    //for other weeks 2-13, just show poster view
                    <div className='posterearnbox df fww'>
                      {item.movie_list.map((movie, i) => (
                        <Posterearnings info={movie} key={i} />
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const WeekmonthTitle = ({ month, week }) => {
  return (
    <div className='newsltr_weekmonthtitle df fww just-between'>
      <h2 className='uppercase'>{month}</h2>
      <h4 className='uppercase'>{week}</h4>
    </div>
  );
};

export const Pronews_detailtitle = ({ dayname, weekdateinfo }) => {
  const dateString = weekdateinfo;
  const parts = dateString.split(' ');
  const year = weekdateinfo ? parseInt(parts[2]) : 0;
  const month = parts[0];
  const day = weekdateinfo ? parseInt(parts[1].replace(',', '')) : '';
  const newsltrdate = [day, month, year];

  return (
    <div className='newsdetail-top-heading df fww just-between'>
      <h1 className='df fww just-between gap16 m-0'>
        <span className='uppercase'>{dayname} REPORT</span>
        <small>
          {dayname === 'WEDNESDAY' ? 'FORECAST - 4 ' : 'RELEASE CALENDAR - 13 '}
          WEEKS {dayname === 'WEDNESDAY' ? 'OUT' : ''}
        </small>
        <span></span>
      </h1>
      <div className='newsltrdate uppercase'>
        {newsltrdate.map((item, i) => (
          <h4 key={i}>{item < 10 ? `0${item}` : item}</h4>
        ))}
      </div>
    </div>
  );
};

SD_Pro_Newsletter_detail.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};
