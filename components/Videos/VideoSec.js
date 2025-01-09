import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
// import '../../Header/magnific-popup.min.css';
import playicoimg from '../../public/images/playicov2.png';
import Link from 'next/link';
import index from '@/pages/wp/[...all]';

const VideoSec = ({ data, index }) => {
  const type = data.video_view === 'portrait' ? 'shorts' : 'video';
  const SliderSetting =
    type === 'shorts'
      ? {
        slidesToShow: 5,
        speed: 300,
        infinite: data.length > 5,
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
      }
      : {
        slidesToShow: 4,
        speed: 300,
        infinite: data.length > 4,
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
    <section className={'videopg_box ' + (type === 'shorts' ? 'shorts' : '')}>
      <div className='container'>
        <div className='vidpg_row pt-9 sm:pt-10 md:pt-11 border-b border-gray-300 pb-3 sm:pb-4'>
          <div className='top_txt flex justify-between'>
            <h3>
              <a href={data.link} target='_blank' rel='noreferrer'>
                <span dangerouslySetInnerHTML={{ __html: data.title }} className='dark:text-gold'></span>
                {/* <i className="fal fa-angle-right"></i> */}
              </a>
            </h3>
            {index === 0 ? (
              <Link href='/video/trailers-clips/' className='btn dark:hover:text-white'>
                View all
              </Link>
            ) : (
              ''
            )}
          </div>
          <div className='vidpg_slider'>
            <Slider {...SliderSetting} className='vidpg_slideitem'>
              {data.video_lists.map((item, index) => {
                return (
                  <div className='vidpg_slideitem' key={index}>
                    <div className='vidpg_item'>
                      <a title='' className='popvid popyoutube' href={item.video_url}>
                        <div className='playvid_box'>
                          <div
                            className={'artinfoimg bgimage border border-gray-600 rounded-md ' + (type === 'shorts' ? 'pb-96' : 'pb-40')}
                            style={{ background: 'url(' + item.video_img + ')' }}
                          ></div>
                          {/* <div className="hmvid_duration">{item.video_duration}</div> */}
                          <span className='playico'>
                            <span>
                              <img src={playicoimg.src} width='25' alt='play' className='inline-block' />{' '}
                            </span>
                          </span>
                        </div>
                        <div className='homevid_infotxt'>
                          <h5 dangerouslySetInnerHTML={{ __html: item.video_title }} className='dark:text-white'></h5>
                          {/* {type === 'shorts' ? "" : <p className='dark:text-white'>Clip</p>} */}
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
