import { useEffect } from 'react';
// import '../../../Header/magnific-popup.min.css';
import Pagination from '../../Directory/ListingPages/Pagination';

const FilmCalendar = ({ data, setCurrentPage, sortBy, setSortBy }) => {
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
  }, []);

  const setDistributorSortBy = (e) => {
    const currSortBy = e.target.attributes['name'].value;
    setSortBy(currSortBy);

    // let shortdata = [...fmcalanderinfo].sort(function (a, b) {
    //   console.log(currSortBy)
    //   if (a.title < b.title) {
    //     return -1;
    //   }
    //   if (a.title > b.title) {
    //     return 1;
    //   }
    //   return 0;
    // }) 
  };

  return (
    <section className="distfilm_calander relese_cal dlsecspace toplinesec">
      <div className="container">
        <div className="top_txt df fww">
          <h3>
            Film Calendar <i className="fal fa-angle-right"></i>
          </h3>
          <div className="shortingbox df fww">
            <label for="">Sort by</label>
            <div className="shortitem">
              <span onClick={setDistributorSortBy} className={sortBy === 'releasedate' ? 'active' : ''} name="releasedate">
                Release Date
              </span>
              <span onClick={setDistributorSortBy} className={sortBy === 'title' ? 'active' : ''} name="title">
                Title
              </span>
            </div>
          </div>
        </div>
        <div className="distfilmcalndr_row grid">
          {data.list.map((item, index) => {
            return (
              <div className="distfilmcalndr_item df fww" key={index}>
                <div className="distcl_media">
                  {item.trailer_link !== '' ? (
                    <a title="" className="popvid popyoutube" href={item.trailer_link}>
                      <div className="playinico">
                        <i className="fas fa-play"></i>
                      </div>
                      {item.img !== '' ? (
                        <div className="artinfoimg  pvr">
                          <img className="objctimg_box" src={item.img} alt="" />
                        </div>
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: item.img_no_img }}></div>
                      )}
                    </a>
                  ) : (
                    <>
                      {item.img !== '' ? (
                        <div className="artinfoimg  pvr">
                          <img className="objctimg_box" src={item.img} alt="" />
                        </div>
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: item.img_no_img }}></div>
                      )}
                    </>
                  )}
                </div>
                <div className="distcl_mediatxt">
                  <h3>
                    <a href={item.link} title={item.title}>
                      {' '}
                      {item.title}
                    </a>
                  </h3>

                  <div className="distcl_mediadetail">
                    <p>
                      <strong>{item.genre}</strong>
                    </p>
                    <p>
                      <strong>{item.release_type}</strong>
                    </p>
                    <p>
                      <strong>Release Date: </strong> {item.release_date}
                    </p>
                    {item.Director && (
                      <p>
                        <strong>Director: </strong> <span dangerouslySetInnerHTML={{ __html: item.Director }}></span>
                      </p>
                    )}
                    {item.cast && (
                      <p>
                        <strong>Top Cast: </strong> <span dangerouslySetInnerHTML={{ __html: item.cast }}></span>
                      </p>
                    )}
                  </div>
                  <div className="distcl_btn printdochide">
                  {item.mh_link && 
                    <a href={item.mh_link} className="btn">
                      Watch Now
                    </a>
                  }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination totalPages={data.total_page} setCurrentPage={setCurrentPage} />
      </div>
    </section>
  );
};

export default FilmCalendar;
