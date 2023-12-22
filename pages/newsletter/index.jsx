import Image from 'next/image';
import axios from 'axios';
import { MdArrowRightAlt } from 'react-icons/md';
import newsltrthumb from '@/public/newsltrthumb.jpg';
import Subscriber from '@/components/Homepage/Subscriber';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'newsletter');
  const data = await res.json();

  // newsletter page static data
  let newsletterData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/newsletter_page/news_list.php/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  newsletterData = await newsletterData.json();

  return {
    props: { data, newsletterData },
    revalidate: 10, // In seconds
  };
}
// const issuePerRow = 3;
const NewsLetter = ({ data, newsletterData }) => {
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
      .get(process.env.NEXT_PUBLIC_SD_API + '/newsletter_page/news_list.php/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&page_no=' + page_no)
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
      <Head>
        {data.children[0].children.map((item, index) => {
          const attributes = item.tag.toUpperCase();

          switch (attributes) {
            case 'TITLE':
              return <title key={index}>{item.html}</title>;
            case 'META':
              const name = item.name || '';
              if (name !== '') {
                return <meta key={index} name={item.name} content={item.content} />;
              } else {
                return <meta key={index} property={item.property} content={item.content} />;
              }
            case 'LINK':
              return <link key={index} rel={item.rel} href={item.href} />;
            case 'SCRIPT':
              return <script key={index} type={item.type} class={item.class} dangerouslySetInnerHTML={{ __html: item.html }}></script>;
            default:
              return null;
          }
        })}
      </Head>
      <div className="testchart">
      </div>
      <section className='home_subscribe newsletternav'>
        <Subscriber />
      </section>
      <section className='newslatterinfo secspace'>
        <div className='container'>
          <div className='newslatterbox grid'>
            {newsletterData.news_post?.map((item, index) => {
              return (
                <div className='newsltrboxitem' key={index}>
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
                </div>
              );
            })}
          </div>
          <div className='seclinespacenews'></div>
          <div className='newslatterbox grid'>
            {gridData?.map((item, index) => {
              return (
                <>
                  <div className='newsltrboxitem' key={index}>
                    <Link href={item.link}>
                      <h4>{item.title}</h4>
                      <div className='newsltrbx-inner df fww'>
                        <span>{item.newsletter_date} </span>
                        <span className='uppercase'>
                          view more <MdArrowRightAlt />
                        </span>
                      </div>
                    </Link>
                  </div>
                  {(index + 1) % 3 === 0 ? <div className='seclinespacenews full'></div> : null}
                </>
              );
            })}
          </div>
          <div className='newsitemsloadbtn text-center'>
            <button className='btn uppercase' onClick={handlemoreissues}>
              show more issues
            </button>
          </div>
        </div>
      </section>
      <section className='newsltr_trailer'>
        <div className='container'>
          <div className='newsltr_trailebox df fww'>
            <h3>Get our Wednesday Report to know more about Forecasts, Advance Tickets, Awareness & Interest.</h3>
            <div className='newstraileritem pvr'>
              <a className='popvid' href='https://www.youtube.com/watch?v=JP93-cc3zYI'>
                <div className=' vid_boxslide pvr vidoin'>
                  <span className='playico show'>
                    <img src='https://www.live.screendollars.com/wp-content/themes/screendollars-live/assets/images/playicov2.png' alt='play' />
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
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsLetter;
