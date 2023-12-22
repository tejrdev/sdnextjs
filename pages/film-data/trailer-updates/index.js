import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Loader from '../../../components/Loader';
// import './addtoany.min.css';

import AddToAny from '../../../components/AddToAny';
import HomePageAds from '../../../components/Homepage/HomePageAds';
import CategoryNavigation from '../../../components/FilmData/DetailPages/CategoryNavigation';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'film-data/trailer-updates');
  const data = await res.json();

  //TrailerUpdatesData static data
  let TrailerUpdatesData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/trailer_updates.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  TrailerUpdatesData = await TrailerUpdatesData.json();

  return {
    props: { data, TrailerUpdatesData },
    revalidate: 10, // In seconds
  };
}

const TrailerUpdates = ({ data, TrailerUpdatesData }) => {
  const [TrailerUpdatesDataLoaded, setTrailerUpdatesDataLoaded] = useState(false);
  //const [TrailerUpdatesData, setTrailerUpdatesData] = useState([]);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    loadTrailerUpdatesData();
    setDomLoaded(true);
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
  }, [TrailerUpdatesDataLoaded]);

  const loadTrailerUpdatesData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/trailer_updates.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        //setTrailerUpdatesData(res.data);
        setTrailerUpdatesDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

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
      <CategoryNavigation />
      {
        /*TrailerUpdatesDataLoaded ? (*/
        <section className='trailers subfilmy sidebar_block printarea'>
          <div className='container'>
            <div className='info_block'>
              <div className='top_txt middletitle_print'>
                <div className='top_info'>
                  <h2 className='h3'>{TrailerUpdatesData.title}</h2>
                </div>
                <div className='downloadbtn'>
                  <span className='pritbtn'>Print</span>
                </div>
              </div>
            </div>
            <div className='adssidebar df fww'>
              <div className='info_block'>
                <div className='info_box '>
                  <div className='info_txt'>
                    <div className='filmdtl_block '>
                      {TrailerUpdatesData.movie_list.map((item, index) => {
                        return (
                          <div className='filmdtl_data' key={index}>
                            <div className='filmdtl_dataimg'>
                              <a title='' className='popvid popyoutube' href={item.trailer_link}>
                                <figure>
                                  <img src={item.img.url} alt={item.img.filename} />
                                </figure>
                              </a>
                              <div className='front-show social_share hovered'>
                                <div className='share_ico'>
                                  <img src={process.env.NEXT_PUBLIC_MENU_URL1 + '/wp-content/themes/screendollars/assets/images/shareico.png'} alt='' />
                                </div>
                                {domLoaded && <AddToAny />}
                              </div>
                            </div>
                            <div className='trailer_detail filmdata_info'>
                              <div className='filmdata_infotop'>
                                <div className='tril_head'>
                                  <h3>
                                    <a href={item.link} title={item.title}>
                                      {item.title}
                                      <span>{' (' + item.release_year + ')'}</span>
                                    </a>
                                  </h3>
                                  <div className='trialer_duration'>
                                    <div className='trialer_timing'>
                                      {item.rating && <span className='tr_rate'>{item.rating}</span>}
                                      <span className='tr_timing'>{item.runtime && item.runtime}</span>
                                    </div>
                                  </div>
                                </div>
                                <ul>
                                  <li>
                                    <div className='trailer_info'>
                                      <strong>Release Date:</strong>
                                      {item.release_date}
                                    </div>
                                  </li>
                                  {item.distributor_link && (
                                    <li>
                                      <div className='trailer_info'>
                                        <strong>Distributor:</strong>
                                        <a href={item.distributor_link} title={item.distributor_title}>
                                          <strong>{item.distributor_title}</strong>
                                        </a>
                                      </div>
                                    </li>
                                  )}

                                  {item.director && (
                                    <li>
                                      <div className='trailer_info'>
                                        <strong>Director:</strong>
                                        {item.director}
                                      </div>
                                    </li>
                                  )}

                                  {item.cast && (
                                    <li>
                                      <div className='trailer_info'>
                                        <strong>Cast:</strong>
                                        {item.cast}
                                      </div>
                                    </li>
                                  )}
                                  <li>
                                    <div className='trailer_info'>
                                      <strong>Synopsis:</strong>
                                      <p>{item.synopsis}</p>
                                    </div>
                                  </li>
                                  <li>
                                    <div className='trailer_info noteslist'>
                                      <strong>Notes:</strong>
                                      {item.trailer_notes}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className='sidebarbox'>
                <div className='sidebarwrap'>
                  <HomePageAds cls='sideadsbox' />
                </div>
              </div>
            </div>
          </div>
        </section>
        /*) : (
        <Loader />
      )*/
      }
    </>
  );
};

export default TrailerUpdates;
