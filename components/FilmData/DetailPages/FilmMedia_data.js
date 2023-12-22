import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import Loader from '../../../components/Loader';

import '../../../Header/magnific-popup.min.css';
const $ = require('jquery');

const SliderSettings = {
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: 300,
  infinite: false,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  dots: true,
  arrows: true,

  responsive: [
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
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const FilmMedia_data = ({ data }) => {
  let { id } = useParams();
  const [FilmDetailsDataLoaded, setFilmDetailsDataLoaded] = useState(false);
  const [FilmDetailsData, setFilmDetailsData] = useState([]);
  useEffect(() => {
    if (data !== '') {
      loadDetailPageData_talent();
    } else {
      loadDetailPageData();
    }

    $('.popvidgallery').magnificPopup({
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

    function photonoslide() {
      var photosliditems = $('.photodetail_gal .photogal_box .slick-slide:not(.slick-cloned) .media_gallerybox').length;
      var photosliditemscount = $('.photodetail_gal .photogal_box .media_gallerybox').length;
      if (photosliditems < 29 || photosliditemscount < 29) {
        //$(".photogal_box").slick('unslick');
        $('.photodetail_gal .photodtlgal_item .photogalitem_box').unwrap();
        $('.photoogalcount .videogal_total').css('opacity', 0);
      }
    }
    photonoslide();
    var photosliditemscounter = $('.photodetail_gal .photogal_box .slick-slide.slick-cloned .media_gallerybox').length;

    $('.photogalitem_box > a.media_gallerybox').magnificPopup({
      //delegate: '.slides:not(.slick-cloned) a.media_gallerybox',
      type: 'image',
      closeMarkup: '<button title="closing" type="button" class="mfp-close">×</button>',
      closeOnContentClick: true,
      closeBtnInside: true,
      titleSrc: 'title',
      tCounter: '<span class="mfp-counter">%curr% of %total%</span>',
      mainClass: 'mfp-no-margins mfp-with-zoom photodtlgallery',
      image: {
        markup:
          '<div class="mfp-figure">' +
          '' +
          '<div class="mfp-close">×</div>' +
          '<div class="mfp-img"></div>' +
          '<div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div>' +
          '' +
          '</div>' +
          '</div>',
        verticalFit: true,
        titleSrc: function (item) {
          //return item.el.parent('.photogalitem_box').find('.photocaption_txt').html();
          return item.el.parent('.photogalitem_box').find('.photocaption_txt').html();
        },
      },
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true,
        duration: 300,
      },
    });

    /*view all video page videos slider*/
    if ($('.videogal_box').length > 0) {
      if ($('.videogal_box .videogal_item').length < 3) {
        // setTimeout(function() {
        //     $(".videogal_box").slick('unslick');
        //     $(".videogal_box .videogal_item .videoitem_box > a").unwrap();
        //     $(".videogal_box .videogal_item > a").unwrap();
        //     $(".videogal_box > a").each(function() {
        //         $(this).wrap('<div class="videogal_item"><div class="videoitem_box"></div></div>');
        //     });
        // }, 300);
      }

      var vidsliditems = $('.videos_gal .videogal_box .slick-slide:not(.slick-cloned) .popvidgallery').length;
      $('.videos_gal .slideitems').html(vidsliditems);

      function vidslidcounting() {
        var vidslidshown_items = $('.videos_gal .videogal_box .slick-active').length * 2;
        var vidactivedot = $('.videos_gal .gelslide__dots .slick-dots .slick-active .dot').html();
        var vidslid_countlast = vidslidshown_items * vidactivedot;
        var vidslid_countfirstcalc = vidslid_countlast - vidslidshown_items;
        var vidslid_countfirst = vidslid_countfirstcalc + 1;
        if (vidslid_countfirst < 1) {
          var vidslid_countfirst = 1;
        }
        if (vidslid_countlast > vidsliditems) {
          var vidslid_countlast = vidsliditems;
          var vidslid_countfirstcalc = vidslid_countlast - vidslidshown_items;
          var vidslid_countfirst = vidslid_countfirstcalc + 1;
        }
        $('.videos_gal .vidfirstcount').html(vidslid_countfirst);
        $('.videos_gal .vidlastcount').html(vidslid_countlast);
        if (vidactivedot == undefined) {
          var vidactivedot = vidsliditems;
          $('.videos_gal .vidfirstcount').html('1');
          $('.videos_gal .vidlastcount').html(vidsliditems);
        }
      }
      setTimeout(function () {
        vidslidcounting();
      }, 1000);
      $('.videos_gal .navarrow,.videos_gal .slick-dots > li > a').click(function () {
        setTimeout(function () {
          vidslidcounting();
        }, 1000);
      });

      $('.videogal_item').css({ display: 'inline-block', width: '100%' });
    }
  }, [FilmDetailsDataLoaded]);

  const loadDetailPageData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/media_data.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'film-detail/' + id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setFilmDetailsData(res.data);
        setFilmDetailsDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  const loadDetailPageData_talent = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/media_talent.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'biography/' + id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setFilmDetailsData(res.data);
        setFilmDetailsDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {FilmDetailsDataLoaded ? (
        <>
          <div className="allvidtop_txt">
            <div className="container">
              <div className="allvidhead pvr">
                <a href={FilmDetailsData.link} className="backbtn">
                  <i className="fas fa-long-arrow-left"></i> Back
                </a>
                <h1>
                  <span>Videos and Images for</span> {FilmDetailsData.title}
                </h1>
              </div>
            </div>
          </div>

          {FilmDetailsData.videos_list.length >= 1 && (
            <section className="videos_gal">
              <div className="container">
                <div className="videosgal_in">
                  <div className="top_txt linehead">
                    <h2 className="h3">Videos</h2>
                  </div>
                  <div className="videogalcount">
                    <div className="videogal_total">
                      {' '}
                      <span className="vidfirstcount"></span>-<span className="vidlastcount"></span> Of <span className="slideitems"></span> Videos{' '}
                    </div>
                  </div>
                  <div className="row">
                    <Slider {...SliderSettings} className="videogal_box df fww">
                      {FilmDetailsData.videos_list.map((item, index) => {
                        return (
                          <>
                            <div className="videogal_item">
                              <div className="videoitem_box" dangerouslySetInnerHTML={{ __html: item }}></div>
                            </div>
                          </>
                        );
                      })}
                    </Slider>
                    <div className="galslide__arrows df fww">
                      <div className="gelslide__dots"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {FilmDetailsData.photos_list.length >= 1 && (
            <section className="photodetail_gal">
              <div className="container">
                <div className="photodtl_in">
                  <div className="top_txt linehead">
                    <h2 className="h3">Photos</h2>
                  </div>
                  {/*
                <div className="photoogalcount df fww">
                  <div className="videogal_total"> <span className="vidfirstcount"></span>-<span className="vidlastcount"></span> Of <span className="slideitems"></span> Photos </div>                  
                </div>
                */}
                  <div className="row">
                    <div className="photogal_box df fww">
                      {FilmDetailsData.photos_list.map((items, index) => {
                        return (
                          <>
                            <div className="photodtlgal_item">
                              {items.map((pho, inde) => {
                                return (
                                  <div className="photogalitem_box">
                                    <a className="media_gallerybox" href={pho.img} title="bannerbg.jpg">
                                      <div className="photoinfoimg pvr">
                                        <img src={pho.thumbnail} alt="" className="objctimg_box" />
                                      </div>
                                    </a>
                                    {pho.person_name && (
                                      <div className="mfp-hide photocaption_txt">
                                        {pho.person_name}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className="galslide__arrows df fww">
                      <div className="gelslide__dots"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default FilmMedia_data;
