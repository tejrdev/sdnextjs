import React, { useEffect } from 'react';
// import '../../../Header/magnific-popup.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import imgData from '../../data.json';
function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

const Videos = ({ data }) => {
  const SliderSetting = {
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 300,
    infinite: false,
    autoplay: true,
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
        <section className="videoslid castperson_images sd_m_data">
          <div className="container">
            
            <Slider
            {...SliderSetting}
            className="photo_slidbox df fww roundslickarrow">
              {data.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {/*index < 4 ? (*/
                      <div className="vid_sliditem">
                        <div className="media_mvslicbox">
                          <a title="" className="popvidbox" href={item.video_url}>
                            <div className="playvid_box">
                              <span className="playico">
                                <img src={imgData.playicon} alt="play" />
                              </span>
                              <div className="artinfoimg  pvr">
                                <img src={item.bg_url} alt="" className="objctimg_box" />
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    /*) : null*/}
                  </React.Fragment>
                );
              })}
            </Slider>
          </div>
        </section>
      )}
    </>
  );
};

export default Videos;
