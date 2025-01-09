import React, { useEffect, useState } from 'react';
// import '../../Header/magnific-popup.min.css';
import MediaGallery from './MediaGallery';
//const $ = require('jquery');
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';


const Gallery = ({ data, title }) => {
  const [viewgall, setViewgall] = useState(false);
  const [indexclick, setIndexclick] = useState(-1);
  console.log(indexclick)
  const isInfinite = data.length > 5 ? true : false;
  const SliderSetting = {
    slidesToShow: 5,
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

  useEffect(() => {

    $('.allgallery').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',
      closeBtnInside: true,

      // When elemened is focused, some mobile browsers in some cases zoom in
      // It looks not nice, so we disable it:
      callbacks: {
        beforeOpen: function () {
          if ($(window).width() < 700) {
            this.st.focus = false;
          } else {
            this.st.focus = '#name';
          }
        },
        change: function () {
          $(document).on('click', '.media_galleryall_item', function (e) {
            // e.preventDefault(); // Prevent default link behavior
            const index = $(this).index('.media_galleryall_item');
            console.log('Clicked image index:', index);
            setIndexclick(index);
            $.magnificPopup.close();

          });
        }
      },
    });

  }, []);

  useEffect(() => {
    $($('.photo_slidbox .media_gallery')[indexclick]).trigger('click');
  }, [indexclick]);

  return (
    <>

      {data.length ? (
        <section className='photoslid dlsecspace thdetial_gallery toplinesec'>
          <div className='container'>
            <div className='top_txt df fww just-between'>
              <h2> Gallery <i className='fal fa-angle-right'></i> </h2>
              {data?.length > 10 ? (
                <div className="viewmovrebtn">
                  <a href="#media_galleryall" className="allgallery btn goldbtn" >
                    View All
                  </a>
                </div>
              ) : null}

            </div>
            <div className='photo_slidbox'>
              <Slider {...SliderSetting} className='  roundslickarrow' >
                {data.map((item, index) => {
                  return (
                    <div className='photo_sliditem' key={index}>
                      <div className='media_mvbox'>
                        <a className='media_gallery' href={item.url ? item.url : item} title={item.caption}>
                          <div className='photoinfoimg pvr'>
                            <img src={item.url ? item.url : item} alt={item.caption} className='objctimg_box' />
                          </div>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className='media_galleryall bg-white relative mx-auto my-14 w-auto max-w-5xl rounded-md mfp-hide' mfp-align-top='' id='media_galleryall'>
              <ul className='list-none grid p-8 pt-11 gap-4 m-0 auto-fit-[135px]'>
                {data.map((item, index) =>
                  <li key={index} className='media_galleryall_item'>
                    {/* <a className='media_galleryshow' href={item.url ? item.url : item} title={item.caption}
                      data-mfp-src={item.url ? item.url : item}> */}
                    <div className='photoinfogallery pb-40 pvr'>
                      <img src={item.url ? item.url : item} alt={item.caption} className='objctimg_box max-w-full' />
                    </div>
                    {/* </a> */}
                  </li>
                )}
              </ul>
            </div>
          </div>
          {/* <MediaGallery title={title} galary_imgs={data} /> */}
        </section>
      ) : null}

    </>
  );
};

export default Gallery;
