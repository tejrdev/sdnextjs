import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
// import '../../Header/magnific-popup.min.css';

const VideoSec = ({ data }) => {
  const SliderSetting = {
    slidesToShow: 4,
    speed: 300,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
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
                  if (e.data == YT.PlayerState.ENDED) {
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
    <section className="videopg_box">
      <div className="container">
        <div className="vidpg_row seclinespace">
          <div className="top_txt">
            <h3>
              <a href={data.link} target="_blank" rel="noreferrer">
                <span
                  dangerouslySetInnerHTML={{
                    __html: data.title,
                  }}
                ></span>
                <i className="fal fa-angle-right"></i>
              </a>
            </h3>
          </div>
          <div className="vidpg_slider">
            <Slider {...SliderSetting} className="vidpg_slideitem">
              {data.video_lists.map((item, index) => {
                return (
                  <div className="vidpg_slideitem" key={index}>
                    <div className="vidpg_item">
                      <a title="" className="popvid popyoutube" href={item.video_url}>
                        <div className="playvid_box">
                          <div
                            className="artinfoimg bgimage"
                            style={{
                              background: 'url(' + item.video_img + ')',
                            }}
                          ></div>
                          <div className="hmvid_duration">{item.video_duration}</div>
                        </div>
                        <div className="homevid_infotxt">
                          <h5
                            dangerouslySetInnerHTML={{
                              __html: item.video_title,
                            }}
                          ></h5>
                        </div>
                      </a>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSec;
