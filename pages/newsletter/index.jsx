import Image from 'next/image';
import axios from 'axios';
import { MdArrowRightAlt } from 'react-icons/md';
import newsltrthumb from '@/public/images/newsltrthumb.jpg';
import Subscriber from '@/components/Homepage/Subscriber';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FadeinUp } from '@/components/Anim/FadeinUp';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import HeadComponent from '@/components/HeadComponent';
import AdPlaceholder from '@/components/Homepage/AdPlaceholder';
import PlayIcon from '@/public/images/playicov2.png';

export async function getStaticProps() {
  const fetchConfigs = [
    {
      url: `${process.env.NEXT_PUBLIC_SEO_LINK}newsletter`,
      key: 'SEOdata',
      defaultData: {},
    },
    {
      url: `${process.env.NEXT_PUBLIC_SD_API}/newsletter_page/news_list.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
      key: 'newsletterData',
      defaultData: {},
    },
  ];

  return await getStaticPropsWithErrorHandling(fetchConfigs);
}
// const issuePerRow = 3;
const NewsLetter = ({ SEOdata, newsletterData, error }) => {
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  // const [next, setNext] = useState(3);
  const [page_no, setpageNo] = useState(2);
  const [gridData, setGridData] = useState([]);

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

  const handlemoreissues = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/newsletter_page/news_list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&page_no=' + page_no)
      .then((res) => {
        setGridData((oldData) => oldData.concat(res.data.news_post));
        setpageNo(page_no + 1);
        if (res.data.load_more_hide) {
          $('.newsitemsloadbtn').addClass('hide');
        }
      })
      .catch((err) => console.log(err));
  };
  // const handlemoreissues = () => {
  //   // setNext(next + issuePerRow);
  // };
  return (
    <>
      <HeadComponent data={SEOdata} />
      <div className='testchart'></div>
      <section className='home_subscribe newsletternav'>
        <Subscriber />
      </section>

      {/* Ad Placement - After Subscriber */}
      <AdPlaceholder
        variant="fullwidth"
        id="newsletter-ad-1"
        sectionClass="newsletter-ad-section py-6"
      />

      <section className='newslatterinfo secspace'>
        <div className='container'>
          <div className='newslatterbox grid'>
            {newsletterData.news_post?.map((item, index) => {
              return (
                <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }} className='newsltrboxitem' key={index}>
                  <Link href={item.link} title={item.title}>
                    <figure className='pvr'>
                      <Image src={item.img} width='390' height='550' alt='' className='objctimg_box' />
                    </figure>
                    <h4>{item.title}</h4>
                    <div className='newsltrbx-inner df fww'>
                      <span>{item.newsletter_date} </span>
                      <span className='uppercase'>
                        view more <MdArrowRightAlt />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className='seclinespacenews'></div>
          <div className='newslatterbox grid'>
            {gridData?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <motion.div variants={FadeinUp} initial='init' animate='anim' viewport={{ once: true }} className='newsltrboxitem'>
                    <Link href={item.link}>
                      <h4>{item.title}</h4>
                      <div className='newsltrbx-inner df fww'>
                        <span>{item.newsletter_date} </span>
                        <span className='uppercase'>
                          view more <MdArrowRightAlt />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                  {(index + 1) % 3 === 0 ? <div className='seclinespacenews full'></div> : null}
                </React.Fragment>
              );
            })}
          </div>
          <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='newsitemsloadbtn text-center'>
            <button className='btn uppercase' onClick={handlemoreissues}>
              show more issues
            </button>
          </motion.div>
        </div>
      </section>

      {/* Ad Placement - Before Trailer */}
      <AdPlaceholder
        variant="fullwidth"
        id="newsletter-ad-2"
        sectionClass="newsletter-ad-section py-6"
      />

      <section className='newsltr_trailer'>
        <div className='container'>
          <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='newsltr_trailebox df fww'>
            <h3>Get our Wednesday Report to know more about Forecasts, Advance Tickets, Awareness & Interest.</h3>
            <div className='newstraileritem pvr'>
              <a className='popvid' href='https://www.youtube.com/watch?v=JP93-cc3zYI'>
                <div className=' vid_boxslide pvr vidoin'>
                  <span className='playico show'>
                    <img src={PlayIcon.src} alt='play' />
                  </span>
                  <figure className='pvr'>
                    <img src='https://i.ytimg.com/vi/Kr54T80rfYQ/hqdefault.jpg' alt='' className='objctimg_box' />
                  </figure>
                </div>
              </a>
            </div>
            <div className='newstlrinfo'>
              <h6 className='protag uppercase'>
                <strong>pro exclusive</strong>
              </h6>
              <h4>The hunger games: the ballad of songbirds and snakes returns to strong box office numbers</h4>
              <p>
                <small>15 Nov 2023</small>
              </p>
              <button className='btn ghostbtn uppercase goldbtn'>view more</button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NewsLetter;
