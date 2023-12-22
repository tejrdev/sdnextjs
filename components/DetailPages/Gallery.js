import React, { useEffect } from 'react';
// import '../../Header/magnific-popup.min.css';
import MediaGallery from './MediaGallery';
const $ = require('jquery');

const Gallery = ({ data, title }) => {
  useEffect(() => {
    $('.photoslid .photo_slidbox').each(function () {
      var $photo_slidbox = $(this);

      $photo_slidbox.magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-with-zoom galleryslid',
        gallery: {
          enabled: true,
          preload: [0, 1],
        },
        callbacks: {
          elementParse: function (item) {
            //console.log(item.el[0].className);
            if (item.el[0].className == 'popvidbox') {
              // eslint-disable-next-line no-unused-expressions
              (item.type = 'iframe'),
                (item.iframe = {
                  markup:
                    '<div className="mfp-iframe-scaler">' +
                    '<div className="mfp-close"></div>' +
                    '<div className="mgpiframwrap">' +
                    '<iframe className="mfp-iframe" id="videoiframe" frameborder="0" allow="autoplay; fullscreen" ></iframe>' +
                    //'<div className="mfp-title">Some caption</div></div>'+
                    '</div>',
                  patterns: {
                    youtube: {
                      index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                      id: 'v=', // String that splits URL in a two parts, second part should be %id%
                      // Or null - full URL will be returned
                      // Or a function that should return %id%, for example:
                      // id: function(url) { return 'parsed id'; }

                      //src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                      src: 'https://www.youtube.com/embed/%id%?enablejsapi=1',
                    },
                    vimeo: {
                      index: 'vimeo.com/',
                      id: '/',
                      src: '//player.vimeo.com/video/%id%?autoplay=1',
                    },
                    gmaps: {
                      index: '//maps.google.',
                      src: '%id%&output=embed',
                    },
                  },
                });
            } else {
              // eslint-disable-next-line no-unused-expressions
              (item.type = 'image'),
                (item.tLoading = 'Loading image #%curr%...'),
                (item.mainClass = 'mfp-img-mobile'),
                (item.image = {
                  tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                });
            }
          },
        },
      });
    });
  }, []);

  return (
    <>
      {data.length ? (
        <section className="photoslid dlsecspace thdetial_gallery toplinesec">
          <div className="container">
            <div className="top_txt df fww just-between">
              <h2>
                Gallery <i className="fal fa-angle-right"></i>
              </h2>
              {/*
              <div className="viewmovrebtn">
                <a href="#media_gallery" className="formpop btn goldbtn">
                  View More
                </a>
              </div>*/}
            </div>
            <div className="photo_slidbox grid">
              {data.map((item, index) => {
                return (
                  <>
                    <div className="photo_sliditem" key={index}>
                      <div className="media_mvbox">
                        <a className="media_gallery" href={item.url ? item.url : item} title="">
                          <div className="photoinfoimg pvr">
                            <img src={item.url ? item.url : item} alt="" className="objctimg_box" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <MediaGallery title={title} galary_imgs={data} />
        </section>
      ) : null}
    </>
  );
};

export default Gallery;
