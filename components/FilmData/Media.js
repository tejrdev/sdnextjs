import React from 'react';
import imgData from '../data.json';
import { useEffect } from 'react';

const Media = ({ videos, images }) => {
  useEffect(() => {
  const $ = window.jQuery;
    $('.popvid').magnificPopup({
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
          '</div>',

        patterns: {
          youtube: {
            index: 'youtube.com/',
            id: 'v=',
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
    <div className="updateview_box">
      <>
        {videos.map((item, index) => {
          return (
            <div className="updateviewbox_item df fww just-between" key={index}>
              <div className="upviewbox_vid detailinfo_item">
                <a className="popvid" href={item.v_url}>
                  <span className="playico">
                    <img src={imgData.playicon} alt="play" />
                  </span>
                  <div className="bnr_boxslide pvr vidoin">
                    <figure className="pvr">
                      <img src={item.v_img} alt="" className="objctimg_box" />
                    </figure>
                    <div className="bnrboxslide_info">
                      <h4>{item.v_title}</h4>
                      <p>{item.v_comments}</p>
                      <time>{item.sdyt_video_duration}</time>
                    </div>
                  </div>
                </a>
              </div>
              <div className="upviewbox_posters df fww just-between">
                {images.map((item, id) => {
                  return (
                    <React.Fragment>
                      {(index === 0 && id < 2) || (index === 1 && id > 1) ? (
                        <div className="upposter_item" key={index}>
                          <figure className=" pvr">
                           {item.poster_link !== "#" || "" ?  <a href={item.poster_link}>
                              <img src={item.img} alt="" className="objctimg_box" />
                            </a> : 
                            <img src={item.img} alt="" className="objctimg_box" />}
                          </figure>
                        </div>
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default Media;
