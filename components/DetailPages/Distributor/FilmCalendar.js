import { useEffect } from 'react';
import Pagination from '../../Directory/ListingPages/Pagination';
import { Movielist } from '../../../components/FilmData/DetailPages/BoxOfficeResults/TopQmovies';
import Loader from '@/components/Loader';

const FilmCalendar = ({ data, setCurrentPage, sortBy, setSortBy, currPage, title, setFutureRelease, showLoader }) => {
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
    const currSortBy = e.target.value;
    setSortBy(currSortBy);
  };

  const CheckFutureRelease = (e) => {
    const isFuture = e.target.checked;
    setFutureRelease(isFuture);
  };
  return (
    <section className='distfilm_calander relese_cal dlsecspace toplinesec'>
      <div className='container'>
        <div className='top_txt df fww'>
          <h3>
            Release Calendar <i className='fal fa-angle-right'></i>
          </h3>
          <div className='shortingbox flex flex-wrap'>
            <div className='furelease mt-1 mr-4'>
              <input type='checkbox' name='release' id='futurelease' onClick={CheckFutureRelease} />
              <label for='futurelease'>Show Future Releases</label>
            </div>
            <div className='shortingselect flex flex-wrap'>
              <label htmlFor='' className='mt-1'>
                Sort by
              </label>
              {/* <div className='shortitem'>
              <span onClick={setDistributorSortBy} className={sortBy === 'releasedate' ? 'active' : ''} name='releasedate'>
                Release Date
              </span>
              <span onClick={setDistributorSortBy} className={sortBy === 'title' ? 'active' : ''} name='title'>
                Title
              </span>
            </div> */}
              <div className='shortingopt ml-2'>
                <select name='SortbySelect' className='globalselect' onChange={setDistributorSortBy} value={sortBy}>
                  <option value='releasedate'> Release Date </option>
                  <option value='title'> Title </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {showLoader && (
          <div className='managloading pvr container' style={{ marginBottom: 40 }}>
            <div className='lodarhight'>
              <Loader />
            </div>
          </div>
        )}
        {data.list.length === 0 ? (
          <h5 className='text-center' style={{ marginTop: 10 }}>
            No movies found
          </h5>
        ) : (
          <>
            <div className='distfilmcalndr_row flex flex-wrap gap-y-5 mb-8'>
              {data.list.map((item, i) => (
                <Movielist data={item} key={i} title={title} />
              ))}
            </div>
            <Pagination totalPages={data.total_page} setCurrentPage={setCurrentPage} currentPage={currPage} />
          </>
        )}
      </div>
    </section>
  );
};

export default FilmCalendar;
