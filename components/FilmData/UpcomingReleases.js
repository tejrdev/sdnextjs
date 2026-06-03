import Slider from 'react-slick/lib/slider';
import Link from 'next/link';
import { useEffect } from 'react';
import createFilmCalendar from '@/utils/filmCalendar';
import sdplaceholder2 from '@/public/images/sdplaceholder2.jpg';

import 'slick-carousel/slick/slick.css';

import { FiTriangle } from 'react-icons/fi';
import { PiTicketBold } from 'react-icons/pi';

import { motion } from 'motion/react';

const UpcomingReleases = ({ data, title, linebrack = false, playing = false }) => {
  const SliderSetting = {
    slidesToShow: 6,
    slidesToScroll: 5,
    speed: 300,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
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
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const currentYear = new Date().getFullYear();
  const filmCalendar = createFilmCalendar(currentYear);
  let currentWeek = filmCalendar.getCurrentWeek();
  currentWeek = currentWeek.weekNumber;

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
    <section className='nowshow releasecalander'>
      <div className='container'>
        <div className={linebrack ? 'seclinespace' : 'pt-6 md:pt-11'}>
          {title !== 'Similar Movies' ? (
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} className='top_txt df fww just-between'>
              <div className='secnav df fww'>
                <h2>
                  <Link href={`${playing ? '/movies/releases-by-week' : '/movies/upcoming-movies/'}`}> {title} </Link>
                </h2>
              </div>
              <div className='view_btn'>
                <Link href={`${playing ? '/movies/releases-by-week' : '/movies/upcoming-movies/'}`} className='btn'>
                  View All
                </Link>
              </div>
            </motion.div>
          ) : (
            <h2> {title} </h2>
          )}
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.4 }} className='nowshow_infobox'>
            <Slider {...SliderSetting} className='realsecal_slider roundslickarrow slick-dotted'>
              {data &&
                data.map((item, index) => {
                  return (
                    <div className='rs_slideitems' key={index}>
                      <Link href={item.link ? item.link : item.permalink}>
                        <figure className='pvr'>
                          <img src={item.img_url === "https://api.screendollars.com/wp-content/themes/screendollars-live/assets/images/noimgico.jpg" ?
                            sdplaceholder2.src
                            : (item.img_url ? item.img_url : item.poster_thumbnail)} alt='' className='objctimg_box' />
                        </figure>
                        <h5>
                          <strong>{item.title}</strong>
                        </h5>
                      </Link>
                      <div className='timerate'>
                        <p className='mb-2'>
                          {item.rating && <span className='ratingbox rounded-sm'>{item.rating}</span>}
                          {item.runtime && <span className='mx-1'>{item.runtime}</span>}
                        </p>
                        <p className='m-0'> {item.genre}</p>
                        {/* <span>Opens {item.release_date.split('/')[0] + ' / ' + item.release_date.split('/')[1]}</span> */}
                        <div className={` mt-1 flex justify-between text-sm ${playing ? 'goldcta' : ''}`}>
                          {playing ? (
                            <Link href={item.permalink + '#theater_timing'} className='font-semibold'>
                              <PiTicketBold className=' inline-block' /> Showtimes
                            </Link>
                          ) : null}

                          {item.trailer_link && item.trailer_link !== '' ? (
                            <a href={item.trailer_link} className={`popvid ${playing ? 'text-gold flex font-semibold' : 'popyoutube ghostbtn w-full my-2 font-bold'}`}>
                              {playing ? <FiTriangle className='rotate-90 inline-block' /> : null} Trailer
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingReleases;
