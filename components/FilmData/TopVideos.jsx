import { Fragment, useEffect, useState } from 'react';
// import '../../../../Header/magnific-popup.min.css';
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';

import { JSONData } from '@/components/shared/JSONData';
const TopVideos = ({ data }) => {
  const SliderSetting = {
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 300,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
  return (
    <>
      {data.length > 0 && (
        <section className='videoslid  castperson_images' id='videos'>
          <div className='container'>
            <div className='seclinespace'>
              <div className='top_txt df fww just-between'>
                <h2>Top Videos</h2>
                <div className='fmresult_view df fww'>
                  <div className='view_btn'>
                    <Link href='/video' className='btn'>
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Slider {...SliderSetting} className='photo_slidbox df fww roundslickarrow'>
              {data.map((item, index) => {
                let yourl = `https://www.youtube.com/watch?v=${item.id}`;
                return (
                  <Fragment key={index}>
                    <div className='vid_sliditem'>
                      <div className='media_mvslicbox'>
                        <a title={item.title} className='popvidgallery popyoutube popvidbox' href={`https://www.youtube.com/watch?v=${item.id}`}>
                          <div className='playvid_box'>
                            <span className='playico seen'>
                              <img src={JSONData.playicon} alt='play' />
                            </span>
                            <div className='artinfoimg  pvr pb-[56%]'>
                              <img src={item.video_poster ? item.video_poster : 'https://i.ytimg.com/vi/' + yourl + '/hqdefault.jpg'} alt='' className='objctimg_box' />
                            </div>
                          </div>
                          <div className='figcaption'>{item.title} </div>
                        </a>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </Slider>
          </div>
        </section>
      )}
    </>
  );
};

export default TopVideos;
