import { useEffect , useState } from 'react';
// import '../../../../Header/magnific-popup.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import imgData from '../../../data.json';
function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }
const Videos = ({ data }) => {

  const SliderSetting = {
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 300,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
                {
                    breakpoint: 900,
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

    /* youtube link replace*/
    var popurl = [];
    $("a.popvid , a.popvidgallery , a.popvidbox").each(function (i) {
        popurl.unshift($(this).attr("href"));
        for (var i = 0; i < popurl.length; i++) {
            var popnew = [];
            popnew.unshift(
                popurl[i].replace("youtu.be/", "www.youtube.com/watch?v=")
            );
            $(this).eq(i).attr("href", popnew[i]);
        }
    });

    
  }, []);
  return (
    <>
      {data.length > 0 && (
        <section className="videoslid  castperson_images" id="videos">
          <div className="container">
            <Slider
            {...SliderSetting}
            className="photo_slidbox df fww roundslickarrow">
              {data.map((item, index) => {
                const[vidtitle , setVidtitle] = useState();
                let yourl = youtube_parser(item.video_url);
                let yttitle = 'https://www.youtube.com/watch?v=' + yourl;
                fetch(`https://noembed.com/embed?dataType=json&url=${yttitle}`)
                .then(res => res.json())
                .then(data =>setVidtitle(data.title));
                return (
                  <>
                  <div className="vid_sliditem" key={index}>
                    <div className="media_mvslicbox">
                      <a title={vidtitle} className="popvidgallery popyoutube popvidbox" href={item.video_url}>
                        <div className="playvid_box">
                          <span className="playico">
                            <img src={imgData.playicon} alt="play" />
                          </span>
                          <div className="artinfoimg  pvr">
                            <img
                              src={item.bg_url ? item.bg_url : 'https://i.ytimg.com/vi/' + yourl + '/hqdefault.jpg'} alt="" className="objctimg_box"/>
                          <div className="figcaption" title={vidtitle}>
                          <span>{vidtitle}</span></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  </>
                );
              })}
            </Slider>
          </div>
        </section>
      )}
    </>
  );
};

export default Videos;
