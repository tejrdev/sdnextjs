import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import imgData from '../../components/data.json';
import { Popup } from '@sekmet/react-magnific-popup';
import React from 'react';
import Link from 'next/link';
import $ from 'jquery';

function Videos({ data }) {
  const config = {
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
  };
  const SliderSetting = {
    slidesToShow: 1,
    speed: 300,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    centerPadding: '0',
    focusOnSelect: true,
    arrows: false,
    dots: true,
  };
  return (
    <div className="container" id="load_2">
      <div className="seclinespace">
        <div className="top_txt df fww just-between">
          <div className="secnav df fww">
            <h2>
              <Link href="/video/">
                Videos <i className="fal fa-angle-right"></i>
              </Link>
            </h2>
          </div>
          <div className="view_btn">
            <Link href="/video/" className="btn">
              Videos 
            </Link>
          </div>
        </div>
      </div>
      <div className="homvidinfo df fww">
        <div className="homvid_feature">
          <Slider {...SliderSetting} className="detailinfo_slider detailinfo_slider_video slick-dotted">
            {data &&
              data.video_slider.map((item, id) => {
                return (
                  <div className="detailinfo_item" key={id}>
                    <Popup className="popvid" href={item.video_url} config={config}>
                      <div className="bnr_boxslide pvr vidoin">
                        <span className="playico">
                          <img src={imgData.playicon} alt="play" />
                        </span>
                        <figure className="pvr">
                          <img src={item.video_img} alt="" className="objctimg_box" />
                          <div className="hmvid_duration">{item.video_time}</div>
                        </figure>
                      </div>
                      <div className="bnrboxslide_info">
                        <h4>{item.video_title}</h4>
                      </div>
                    </Popup>
                  </div>
                );
              })}
          </Slider>
        </div>
        <div className="homvid_box df fww">
          <div className="homevid_boxcol ">
            {data &&
              data.video_list.map((item, id) => {
                return (
                  <React.Fragment key={id}>
                    {id < 2 ? (
                      <div className="homvid_item" key={id}>
                        <Popup className="popvid" href={item.video_url} title={item.video_title} config={config}>
                          <div className=" vid_boxslide pvr vidoin">
                            <span className="playico">
                              <img src={imgData.playicon} alt="play" />
                            </span>
                            <figure className="pvr">
                              <img src={item.video_img} alt="" className="objctimg_box" />
                              <div className="hmvid_duration">{item.video_time}</div>
                            </figure>
                          </div>
                          <div className="bnrboxslide_info">
                            <h5>{item.video_title}</h5>
                          </div>
                        </Popup>
                      </div>
                    ) : null}
                  </React.Fragment>
                );
              })}
          </div>
          <div className="homevid_boxcol ">
            {data &&
              data.video_list.map((item, id) => {
                return (
                  <React.Fragment key={id}>
                    {id >= 2 ? (
                      <div className="homvid_item" key={id}>
                        <Popup className="popvid" href={item.video_url} title={item.video_title} config={config}>
                          <div className=" vid_boxslide pvr vidoin">
                            <span className="playico">
                              <img src={imgData.playicon} alt="play" />
                            </span>
                            <figure className="pvr">
                              <img src={item.video_img} alt="" className="objctimg_box" />
                              <div className="hmvid_duration">{item.video_time}</div>
                            </figure>
                          </div>
                          <div className="bnrboxslide_info">
                            <h5>{item.video_title}</h5>
                          </div>
                        </Popup>
                      </div>
                    ) : null}
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Videos;
