import React from 'react';
import { useEffect } from 'react';
// import '../../Header/magnific-popup.min.css';
//import { Popup } from '@sekmet/react-magnific-popup';
import Link from 'next/link';

const $ = require('jquery');
const Trailers = ({ data }) => {
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
    <section className="movietm_trialer">
      <div className="container">
        <div className="top_txt df fww just-between">
          <h3>
            <Link href={data.view_more_link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
              {data.title} <i className="fal fa-angle-right"></i>
            </Link>
          </h3>
          <div className="viewmovrebtn">
            <Link href={data.view_more_link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} className="btn goldbtn" target="_blank" rel="noreferrer">
              View More
            </Link>
          </div>
        </div>
        <div className="movietm_trialerbox df fww just-between">
          {data.video_lists.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <div className="bigtm_trailerbox df fww">
                    <a
                      className="popvid w100"
                      href={item.video_url}
                      target="_blank"
                      tabindex="0"
                      rel="noreferrer"
                    >                     
                      <figure className="pvr">
                        <img src={item.video_img} alt="" className="objctimg_box" />
                      </figure>
                      <div className="bigtm_trailerbox_info">
                        <h3>{item.video_title}</h3>
                        <div className="hmvid_duration">{item.video_duration}</div>
                      </div>
                    </a>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
          <div className="smalltm_trailerbox">
            {data.video_lists.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {index > 0 ? (
                    <div className="smtrailerbox_item">
                      <a
                      className="popvid w100"
                      href={item.video_url}
                      target="_blank"
                      tabindex="0"
                      rel="noreferrer"
                    >   
                        <figure className="pvr">
                          <img src={item.video_img} alt="" className="objctimg_box" />
                        </figure>
                        <span className="bigtm_trailerbox_info">
                          <h4>{item.video_title}</h4>
                        </span>
                      </a>
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trailers;
