import Slider from 'react-slick';
import { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import Image from 'next/image';
import tometoimg from '../../public/images/tometoico.svg';
import sdplaceholder2 from '../../public/sdplaceholder2.jpg';
import Link from 'next/link';
function youtube_parser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}
const ShowtimeSlider = ({ data, webinfo, activeDate }) => {
  const slidedata = data.filter((item) => item.title !== null && item.show_dates.indexOf(activeDate) > -1);
  const isInfinite = slidedata.length > 5 ? true : false;
  const SliderSetting = {
    slidesToShow: 6,
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
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
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
    <div className='nowshow_sliderbox'>
      <Slider {...SliderSetting} className='nowshow_slider roundslickarrow'>
        {data &&
          slidedata.map((items, indexs) => {
            return (
              <div className='nowshow_item' key={indexs}>
                <div className='nowshow_iteminner'>
                  <figure className='pvr'>
                    {items.m_link && items.title ? (
                      <a href={items.m_link}>
                        <img
                          src={
                            items.poster_image_thumbnail === null || items.poster_image_thumbnail === 'https://live.screendollars.com/wp-content/uploads/2020/05/no-img.jpg'
                              ? sdplaceholder2.src
                              : items.poster_image_thumbnail
                          }
                          alt={items.title}
                          className='objctimg_box'
                        />
                        <span className='nowshow_posterinfo'>
                          <span className='nowshow_timerating'>
                            {items.rating ? <span>{items.rating}</span> : ''}
                            {items.runtime ? (
                              <span>
                                <time>{items.runtime} </time>
                              </span>
                            ) : (
                              ''
                            )}
                          </span>

                          <span className='nowshow_genere'>{items.rating ? items?.genre?.map((gener, i) => <span key={i}>{gener}</span>) : ''}</span>
                          {items.rotten_score ? (
                            <span className='nowshow_rotanscore'>
                              <Image src={tometoimg} alt='Tometo score' width={20} height={20} />
                              {items.rotten_score}
                            </span>
                          ) : (
                            ''
                          )}
                        </span>
                      </a>
                    ) : (
                      <span>
                        <img
                          src={
                            items.poster_image_thumbnail !== null || items.poster_image_thumbnail === 'https://live.screendollars.com/wp-content/uploads/2020/05/no-img.jpg'
                              ? items.poster_image_thumbnail
                              : sdplaceholder2.src
                          }
                          alt={items.title}
                          className='objctimg_box'
                        />
                        {items.rating || items.runtime || items.rotten_score ? (
                          <span className='nowshow_posterinfo'>
                            <span className='nowshow_timerating'>
                              {items.rating ? <span>{items.rating}</span> : ''}
                              {items.runtime ? (
                                <span>
                                  {' '}
                                  <time>{items.runtime} </time>{' '}
                                </span>
                              ) : (
                                ''
                              )}
                            </span>

                            <span className='nowshow_genere'>{items.rating ? items.genre.map((gener, i) => <span key={i}>{gener}</span>) : ''}</span>
                            {items.rotten_score ? (
                              <span className='nowshow_rotanscore'>
                                <Image src={tometoimg} alt='Tometo score' width={20} height={20} />
                                {items.rotten_score}
                              </span>
                            ) : (
                              ''
                            )}
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                    )}
                    {items.trailer_link ? (
                      <a className='popvid popyoutube nowshoe_trailer' href={'https://www.youtube.com/watch?v=' + youtube_parser(items.trailer_link)}>
                        Watch Trailer
                      </a>
                    ) : (
                      ''
                    )}
                  </figure>
                  <div className='nowshow_info'>
                    <h5>{items.m_link ? <Link href={items.m_link}>{items.title}</Link> : <span href={items.m_link}> {items.title}</span>}</h5>
                    {/*<div className="pghr df fww just-between">
                                              {items.rating ? (
                                                <div className="rating">{items.rating}</div>
                                              ) : ('')} 
                                              {items.runtime ? <time>{items.runtime} </time> : ''}
                                            </div>*/}
                    <div className='timimg'>
                      {items.show_times &&
                        items.show_times.map((showitems, index) => {
                          if (showitems.date !== activeDate) return;
                          return (
                            <a href={showitems.booking_link ? showitems.booking_link : webinfo} target='_blank' rel='noreferrer' key={index}>
                              <span className='showtimgig linkedbtn'>{showitems.start_at}</span>
                              <span className='buybtn btn'>{showitems.booking_link ? 'Buy Now' : 'More Info'}</span>
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
