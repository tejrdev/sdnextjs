import Slider from 'react-slick/lib/slider';
import { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import Image from 'next/image';
import tometoimg from '../../public/images/tometoico.svg';
import sdplaceholder2 from '../../public/images/sdplaceholder2.jpg';
import Link from 'next/link';

function youtube_parser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}
const ShowtimeSlider = ({ data, webinfo, activeDate }) => {
  const slidedata = data.filter((item) => item.title !== null && item.show_dates.indexOf(activeDate) > -1);
  const isInfinite = slidedata.length > 4 ? true : false;
  const SliderSetting = {
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 300,
    infinite: isInfinite,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    // const $ = window.jQuery;
    // $('.popvid , .popvidbox').magnificPopup({
    //   type: 'iframe',
    //   mainClass: 'mfp-fade',
    //   removalDelay: 160,
    //   preloader: false,
    //   fixedContentPos: false,
    //   iframe: {
    //     markup:
    //       '<div class="mfp-iframe-scaler">' +
    //       '<div class="mfp-close"></div>' +
    //       '<div class="mgpiframwrap">' +
    //       '<iframe class="mfp-iframe" id="videoiframe" frameborder="0" allow="autoplay; fullscreen" ></iframe>' +
    //       //'<div class="mfp-title">Some caption</div></div>'+
    //       '</div>',

    //     patterns: {
    //       youtube: {
    //         index: 'youtube.com/',
    //         id: 'v=',
    //         //src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1&mute=1',
    //         //src: "//www.youtube.com/embed/%id%?rel=0&autoplay=1",
    //         src: 'https://www.youtube.com/embed/%id%?enablejsapi=1',
    //       },
    //     },
    //   },
    //   callbacks: {
    //     markupParse: function (template, values, item) {
    //       values.title = item.el.attr('title');
    //     },
    //     open: function () {
    //       var iframe = $('.mfp-iframe-scaler').find('iframe');
    //       iframe.prop('id', 'videoiframe');
    //       var YouTubeIframeLoader = require('youtube-iframe');
    //       YouTubeIframeLoader.load(function (YT) {
    //         var player = new YT.Player('videoiframe', {
    //           events: {
    //             onReady: function (e) {
    //               e.target.playVideo();
    //             },
    //             onStateChange: function (e) {
    //               if (e.data === YT.PlayerState.ENDED) {
    //                 //instance.close();
    //               }
    //             },
    //           },
    //         });
    //       });
    //       $('body').addClass('popbopen');
    //     },
    //     close: function () {
    //       $('body').removeClass('popbopen');
    //     },
    //   },
    // });

    let lightbox = null;
    import('glightbox').then((mod) => {
      const GLightbox = mod.default;
      lightbox = GLightbox({
        selector: '.glightboxvideo',
        skin: 'round',
        closeButton: true,
        height: 'auto',
        width: '700px',
      });
      document.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement && e.target.closest('.myglightclose')) {
          lightbox.close();
        }
      });
    });

    return () => {
      lightbox?.destroy();
    };
  }, []);
  function decodeHtmlEntities(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }
  return (
    <div className='nowshow_sliderbox '>
      <Slider {...SliderSetting} className='nowshow_slider roundslickarrowlong'>
        {data &&
          slidedata.map((items, indexs) => {
            return (
              <div className='nowshow_item' key={indexs}>
                <div className='card-item border border-gray-100 rounded-lg bg-white p-[2px] text-center h-full'>
                  <figure className='relative lg:pb-[150%] pb-[140%] sm:pb-[335px] group overflow-hidden'>
                    <img
                      src={
                        items.poster_image_thumbnail === null || items.poster_image_thumbnail === process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/uploads/2020/05/no-img.jpg'
                          ? sdplaceholder2.src
                          : items.poster_image_thumbnail
                      }
                      alt={items.title}
                      className='objctimg_box'
                    />
                    {items.rating || items.runtime || items.rotten_score ? (
                      <span className='nowshow_posterinfo opacity-0 group-hover:opacity-100 transition-all duration-300 absolute left-0 group-hover:top-0 w-full h-full flex flex-wrap gap-1 justify-center items-end content-end'>
                        <span className='w-full group-hover:opacity-100 flex flex-col items-center  '>
                          {items.rating ? <span className='font-bold'>{items.rating}</span> : ''}
                          {items.runtime ? (
                            <span>
                              <time>{items.runtime} </time>
                            </span>
                          ) : (
                            ''
                          )}
                        </span>

                        <span className='w-full group-hover:opacity-100 flex flex-wrap gap-1 justify-center py-4'>{items.rating ? items?.genre?.map((gener, i) => <span key={i} className='border border-gray-200 text-white px-2 py-0 rounded-full'>{gener}</span>) : ''}</span>
                        {items.rotten_score ? (
                          <span className='w-full group-hover:opacity-100 flex flex-wrap gap-3 items-center justify-center pb-3'>
                            <Image src={tometoimg} alt='Tometo score' width={20} height={20} />
                            {items.rotten_score}
                          </span>
                        ) : (
                          ''
                        )}
                        {items.trailer_link ? (
                          <a className='popyoutube text-white hover:text-white  font-medium flex flex-wrap gap-3 items-center justify-center py-3 focus:text-white glightboxvideo' data-glightbox="type: video" href={'https://www.youtube.com/watch?v=' + youtube_parser(items.trailer_link)}>
                            <span className='hover:underline pr-2'>Watch Trailer</span> <button className="w-6 h-6 text-[12px] pl-1 inline-flex items-center justify-center bg-gray-200 text-gray-800 rounded-full">▶</button>
                          </a>
                        ) : (
                          ''
                        )}
                      </span>
                    ) : (
                      ''
                    )}

                  </figure>
                  <div className='card_content lg:mb-2 mb-1 m-1'>
                    <h4 title={items.title} className='line-clamp-1'>{items.m_link ? <Link href={items.m_link}>{decodeHtmlEntities(items.title)}</Link> : <span href={items.m_link}> {decodeHtmlEntities(items.title)}</span>}</h4>
                    {/*<div className="pghr df fww just-between">
                                              {items.rating ? (
                                                <div className="rating">{items.rating}</div>
                                              ) : ('')} 
                                              {items.runtime ? <time>{items.runtime} </time> : ''}
                                            </div>*/}
                    <div className='timimg flex flex-wrap gap-1 justify-center'>
                      {items.show_times &&
                        items.show_times.map((showitems, index) => {
                          if (showitems.date !== activeDate) return;
                          return (
                            <a href={showitems.booking_link ? showitems.booking_link : webinfo} target='_blank' rel='noreferrer' key={index} className='cta_btn inline-block border border-gray-900 rounded-full pl-2 pr-2.5 sm:py-0.5 text-black transition-all duration-300 cursor-pointer group opacity-70 hover:opacity-100 hover:bg-black hover:text-white relative min-w-[90px] text-center'>
                              <span className='showtimgig linkedbtn opacity-100 group-hover:opacity-0 transition-all duration-300 absolute max-auto inline-block text-center'>{showitems.start_at}</span>
                              <span className='opacity-0 group-hover:opacity-100 transition-all duration-300'>{showitems.booking_link ? 'Buy Now' : 'More Info'}</span>
                            </a>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default ShowtimeSlider;
