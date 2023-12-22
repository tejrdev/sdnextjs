import React, { useEffect } from 'react';
// import '../../../Header/magnific-popup.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const Photos = ({ data }) => {
  const SliderSetting = {
    slidesToShow: 6,
    slidesToScroll: 2,
    speed: 300,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
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
                    '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<div class="mgpiframwrap">' +
                    '<iframe class="mfp-iframe" id="videoiframe" frameborder="0" allow="autoplay; fullscreen" ></iframe>' +
                    //'<div class="mfp-title">Some caption</div></div>'+
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
      {data.length > 0 && (
        <section className='photoslid toplinesec castperson_images sd_m_data'>
          <div className='container'>
            <div className='top_txt df fww just-between'>
              <h2>
                Gallery <i className='fal fa-angle-right'></i>
              </h2>
              {/* <div className="viewmovrebtn">
                <a href="?film-media=true" className="formpop btn goldbtn">
                  View More
                </a>
              </div> */}
            </div>
            <Slider {...SliderSetting} className='photo_slidbox df fww roundslickarrow'>
              {data.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {
                      /*index < 6 ? (*/
                      <div className='photo_sliditem'>
                        <div className='media_mvbox'>
                          <a className='media_gallery' href={item.url}>
                            <div className='photoinfoimg  pvr'>
                              <img src={item.url} alt='' className='objctimg_box' />
                            </div>
                          </a>
                        </div>
                      </div>
                      /*) : null*/
                    }
                  </React.Fragment>
                );
              })}
            </Slider>
          </div>
        </section>
      )}
    </>
  );
};

export default Photos;
