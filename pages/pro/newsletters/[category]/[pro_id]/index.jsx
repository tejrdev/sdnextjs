import LayoutPro from '@/components/Layout/LayoutPro';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
//import axios from 'axios';
import Tabs from '@/components/All/Tabs';
import Tab from '@/components/All/Tabs';

import Pagetitle from '@/components/Products/Pagetitle';
import Paywall from '@/components/Products/Paywall';
import WeekendChanges from '@/components/Pro/Newsletter/WeekendChanges';
import TopProjected from '@/components/Pro/Newsletter/TopProjected';
import NewOpening from '@/components/Pro/Newsletter/NewOpening';
import OtherNotable from '@/components/Pro/Newsletter/OtherNotable';
import NewsletterTitleBlock from '@/components/Pro/Newsletter/NewsletterTitleBlock';
//import sunpdf from "@/public/pro/SCREENDOLLARS-NEWSLETTER-2023.08.27.pdf"

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
    Pro_data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/pro_newsletter_detail.php?news_id=' + post_id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    Pro_data = await Pro_data.json();
  }
  return {
    props: { Pro_data, category },
    revalidate: 10, // In seconds
  };
}

export default function SD_Pro_Newsletter_detail({ Pro_data, category }) {
  const router = useRouter();
  const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
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

    setLink(localStorage.getItem('type_link'));
    setEmail(localStorage.getItem('email'));
  }, []);
  let backlink = '/pro/newsletters/wed/';
  let chngLastYrDataIcon = 'fas';
  if (category === 'wed') {
    if (Pro_data.change_last_year_data?.color === 'green') {
      chngLastYrDataIcon += ' fa-sort-up';
    } else if (Pro_data.change_last_year_data?.color === 'red') {
      chngLastYrDataIcon += ' fa-sort-up';
    }
  }

  const onBackClick = () => {
    history.back();
  };
  return (
    <>
      {category === 'wed' ? (
        <div className='newsltrdetail'>
          <div className='container'>
            <div className='backlink'>
              <i class='far fa-long-arrow-left'></i>{' '}
              <span>
                <strong onClick={onBackClick}>Back To Listing</strong>
              </span>
            </div>

            <div className='newsdetail-top-heading'>
              <h1 className='df fww just-between gap16 m-0'>
                <span>WEDNESDAY REPORT</span>
                <span>{Pro_data.news_letter_date}</span>
              </h1>
            </div>

            <div className='newsletter-side-video-block'>
              {/* <a href='#' className='newsletter--side-video pvr' title=''>
              <span className='vid-play-btn df align-items-center justify-content-center'>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
                  <path d='M3 22v-20l18 10-18 10z'></path>
                </svg>
              </span>
              <img className='objimg' src='https://staging.project-progress.net/projects/latest-cenegenics/wp-content/uploads/2021/12/Dec21-Homepage_Help_Image_1.webp' alt='' />
            </a> */}
              {Pro_data.video_ids ? (
                <a className='popvid pvr' href={Pro_data.video_url} title=''>
                  <div className=' vid_boxslide '>
                    <span className='playico show'>
                      <img src='https://www.live.screendollars.com/wp-content/themes/screendollars-live/assets/images/playicov2.png' alt='play' />
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
          </div>
        </div>
      ) : (
        <div className='productdetail text-center paywallpvr'>
          <Pagetitle heading={Pro_data.title} disc={Pro_data.content} back={backlink} />
          <div className='productdetailbox text-center'>
            <div className='container'>
              {/* <pre>{JSON.stringify(Pro_data, null, 4)}</pre> */}
              {/* <h3>Latest Issue: {Pro_data.news_letter_date}</h3>

            {console.log(Pro_data)} && Pro_data.news_letter_PDF !== null*/}
              {/* {Pro_data.news_type == 'sun'  ? (
              <>
                <div className='newsletertabs tab-buttons df fww gap16'>
                  <button className={activeTab === 1 ? 'active btn ' : 'btn'} onClick={() => handleTabClick(1)}>
                    Email Newsletter
                  </button>
                  <button className={activeTab === 2 ? 'active btn' : 'btn'} onClick={() => handleTabClick(2)}>
                    PDF Newsletter
                  </button>
                </div>
                <div className='productdetailblock tab-content'>
                  {activeTab === 1 && (
                    <div className='prodetailimail'>
                      {link !== 'pro' ? ( // && link !== 'default'
                        <iframe src={Pro_data.news_letter_url} frameborder='0' scrolling='no'></iframe>
                      ) : (
                        <iframe src={Pro_data.news_letter_url} frameborder='0'></iframe>
                      )}
                    </div>
                  )}
                  {activeTab === 2 && (
                    <div className='prodetialdoc'>
                      <iframe src={'https://live.screendollars.com/sdwebvideo/SCREENDOLLARS-NEWSLETTER-2023.08.27.pdf'} frameborder='0'></iframe>
                    </div>
                  )}
                </div>
              </>
            ) : link !== 'pro' ? ( //&& link !== 'default'
              <iframe src={Pro_data.news_letter_url} frameborder='0' scrolling='no'></iframe>
            ) : (
              <iframe src={Pro_data.news_letter_url} frameborder='0'></iframe>
            )} */}

              <Tabs>
                <Tab label='Email Newsletter'>
                  {link !== 'pro' ? ( //&& link !== 'default'
                    <iframe src={Pro_data.news_letter_url} frameborder='0' scrolling='no' className='mailframenews proiframe'></iframe>
                  ) : (
                    <iframe src={Pro_data.news_letter_url} frameborder='0' className='mailframenews'></iframe>
                  )}
                </Tab>
                {Pro_data.news_letter_PDF && (
                  <Tab label='6-Weeks Out Film Tracking Report'>
                    <div className={'prodetialdoc trackreport ' + (link !== 'pro' ? 'proiframe' : '')}>
                      <iframe src={Pro_data.news_letter_PDF} frameborder='0' scrolling={link == 'pro' ? '' : 'no'}></iframe>
                    </div>
                  </Tab>
                )}

                {Pro_data.film_tracking_PDF && (
                  <Tab label='Long Lead Film Tracking Grid'>
                    <div className={'prodetialdoc trackgrid ' + (link !== 'pro' ? 'proiframe' : '')}>
                      <iframe src={Pro_data.film_tracking_PDF} frameborder='0'></iframe>
                    </div>
                  </Tab>
                )}
              </Tabs>
            </div>
          </div>
          {link !== 'pro' && <Paywall />}
          {/* //&& link !== 'default' */}
        </div>
      )}
    </>
  );
}

SD_Pro_Newsletter_detail.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};
