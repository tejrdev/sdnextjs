import { useState, useEffect } from 'react';
const $ = require('jquery');
import { RiTriangleLine } from 'react-icons/ri';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const HeroVideo = ({ data }) => {
  useEffect(() => {
    const $ = window.jQuery;
    $('.popvid , .popvidbox').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
      gallery: {
        enabled: false,
      },
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

  const SliderSetting = {
    slidesToShow: 1,
    speed: 300,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    centerPadding: '0',
    focusOnSelect: true,
    arrows: false,
    dots: true,
  };

  return (
    <section className='herovideo'>
      <div className='container'>
        <div className='vidhero'>
          <Slider {...SliderSetting} className='vidhero_slider'>
            {data.map((item, index) => {
              // const iframeSrc = 'https://www.youtube.com/embed/' + item.id + '?rel=0&enablejsapi=1';
              const iframeSrc = 'http://www.youtube.com/watch?v=' + item.id;
              let originalyoutubeTitle = item.title;
              let newText = originalyoutubeTitle.replace('| Screendollars', '');
              let topcatrage_txt = item.content;
              let cutting_txtvidoindex = topcatrage_txt.indexOf('To watch more movie');
              let cutting_txtvido = topcatrage_txt.substring(0, cutting_txtvidoindex);
              return (
                <a className='vidheroitem popvidbox popyoutube' key={index} href={iframeSrc}>
                  <figure className='relative w-full rounded-xl'>
                    <img src={item.video_poster} className='objimg rounded-xl opacity-75 -z-10' alt='' />
                    <figcaption className='p-3 md:pr-36 py-8  bg-gradient-to-b from-transparent via-black to-black to-100%'>
                      <h2 dangerouslySetInnerHTML={{ __html: newText }} className='text-white truncate'></h2>
                    </figcaption>
                    <span className='btn absolute bottom-0 right-0 md:bottom-10 md:right-5  hover:bg-white'>
                      <RiTriangleLine className='inline-block align-middle rotate-90' /> <span className='hidden md:inline-block'>Play</span>
                    </span>
                  </figure>
                </a>
              );
            })}
          </Slider>
        </div>
        {/* <div className='vidhero df fww'>
          <div className='vidherofream'>
            <iframe width='100%' src={iframeSrc} title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
          </div>
          <div className='vidhero_info'>
            <div id="dark-toggle" className='dark:text-slate-50'>darkbnt</div>

            <div className='vidhero_detail' style={{ height: '172px' }}>
              {cutting_txtvido}
            </div>
            <div className='readmore_btn'>Read More...</div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroVideo;
