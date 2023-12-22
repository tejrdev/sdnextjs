import { useEffect } from 'react';

import Navigation from './Navigation';
// import '../../Header/magnific-popup.min.css';

const VideoList = ({ data, totalPages, setCurrentPage }) => {
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
    <div className="video_gallerybox">
      <div className="container">
        <div className="row">
          <div className="video_galleryin df fww filter_tabsinfo active">
            {data &&
              data.map((item, index) => {
                return (
                  <div className="vid_gallerycol" key={index}>
                    <a className="popvid popyoutube" href={item.video_url} title={item.title}>
                      <div className="playvid_box">
                        <span className="playico">
                          <img src={item.play_icon} alt="play" />
                        </span>
                        <div className="artinfoimg pvr">
                          <img src={item.img} alt={item.title} className="objctimg_box" />
                        </div>
                        <div className="hmvid_duration">{item.video_duration}</div>
                      </div>
                      <div className="homevid_infotxt">
                        <h5>
                          <span dangerouslySetInnerHTML={{ __html: item.title }}></span>
                        </h5>
                      </div>
                    </a>
                  </div>
                );
              })}
            <Navigation totalPages={totalPages} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
