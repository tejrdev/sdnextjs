import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import CustomSelect from '../../../components/Header/CustomSelect';
import CustomSelect from '../../../components/All/CustomSelect';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import Loader from '@/components/Loader';
import sdplaceholder2 from '../../../public/sdplaceholder2.jpg';

const order_options = [
  { 'name': 'Release Date', 'value': 'release_date' },
  { 'name': 'Title', 'value': 'title' },
];
// const $ = require('jquery');
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const genrename = params.genrename;

  // Fetch SEO data
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + '/movie-genres/' + genrename);
  const SEOdata = await res.json();
  //genre page
  let genreinfo = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-genre/genre_movies.php?genre=' + genrename + '&order_choice=release_date&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  genreinfo = await genreinfo.json();
  return {
    props: { genreinfo, SEOdata },
    revalidate: 10,
  };
}

const Genrename = ({ genreinfo, SEOdata }) => {
  const router = useRouter();
  const { genrename } = router.query;

  const Genre_options = Object.entries(genreinfo.genre_dropdown).map(([key, value]) => ({ name: value, value: value.toLowerCase() }));
  const [gridData, setGridData] = useState(genreinfo.movies);
  const [orderBy, setOrderBy] = useState('release_date');
  const [genreBy, setGenreBy] = useState(genrename ? genrename.toLocaleLowerCase() : 'all');
  const [pageNo, setpageNo] = useState(1);
  const [LoadMoreRequired, setLoadMoreRequired] = useState(true);
  const [ShowLoader, setShowLoader] = useState(false);
  const [DataChanged, setDataChanged] = useState(false);
  const [IsFutureRelease, setIsFutureRelease] = useState(false);

  const SortByChange = (value) => {
    setOrderBy(value);
  };
  const GenreChange = (value) => {
    setGenreBy(value);
  };

  const CheckFutureRelease = (e) => {
    const isFuture = e.target.checked;
    setIsFutureRelease(isFuture);
  };

  useEffect(() => {
    const $ = window.jQuery;
    const pathname = window.location.pathname;

    if (pathname !== pathname.toLowerCase()) {
      router.push(pathname.toLowerCase());
    }
  }, []);

  useEffect(() => {
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
    $('a.popvid , a.popvidgallery , a.popvidbox').each(function (i) {
      popurl.unshift($(this).attr('href'));
      for (var i = 0; i < popurl.length; i++) {
        var popnew = [];
        popnew.unshift(popurl[i].replace('youtu.be/', 'www.youtube.com/watch?v='));
        $(this).eq(i).attr('href', popnew[i]);
      }
    });
  }, [gridData]);

  useEffect(() => {
    if (DataChanged) loadGenreData();
  }, [pageNo]);
  const filterGenreData = () => {
    setShowLoader(true);
    setDataChanged(true);
    setGridData([]);
    setpageNo(1);
    setLoadMoreRequired(false);
    setTimeout(() => {
      setLoadMoreRequired(true);
    }, 1000);
  };
  useEffect(() => {
    const target = document.querySelector('#review-loadmore');
    let isVisible = null;

    const callBack = (entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && LoadMoreRequired) {
        setDataChanged(true);
        setpageNo(pageNo + 1);
      }
    };

    const options = {
      root: null,
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(callBack, options);
    LoadMoreRequired && target && observer.observe(target);
  }, [LoadMoreRequired]);

  const loadGenreData = () => {
    setShowLoader(true);
    setLoadMoreRequired(false);
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/movie-genre/genre_movies.php?genre=' + genreBy + '&page_no=' + pageNo + '&order_choice=' + orderBy + '&future_release=' + IsFutureRelease + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        if (gridData.length) {
          setGridData((oldData) => oldData.concat(res.data.movies));
        } else {
          setGridData(res.data.movies);
        }
        setShowLoader(false);
        setLoadMoreRequired(parseInt(res.data.max_page) === pageNo ? false : true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        {SEOdata.children &&
          SEOdata.children[0].children.map((item, index) => {
            const attributes = item.tag.toUpperCase();

            switch (attributes) {
              case 'TITLE':
                return <title key={index}>{item.html}</title>;
              case 'META':
                const name = item.name || '';
                if (name !== '') {
                  return <meta key={index} name={item.name} content={item.content} />;
                } else {
                  return <meta key={index} property={item.property} content={item.content} />;
                }
              case 'LINK':
                return <link key={index} rel={item.rel} href={item.href} />;
              case 'SCRIPT':
                return <script key={index} type={item.type} class={item.class} dangerouslySetInnerHTML={{ __html: item.html }}></script>;
              default:
                return null;
            }
          })}
      </Head>
      <AdminEditLink data={genreinfo} />
      <section className='genremovies subfilmy'>
        <div className='container'>
          <div className='allviewfilters df fww'>
            <CustomSelect options={Genre_options} label='Genre' id='f_genre' onSelect={GenreChange} value={genreBy} />
            <CustomSelect options={order_options} label='Sort By' id='f_order' onSelect={SortByChange} value={orderBy} />
            {/* <CustomSelect options={IMDB_options} label='IMDb Rating' id='f_imbd' onSelect={IMDBChange} value={IMDBRating} /> */}
            <div className='future cursor-pointer mt-2 sm:mt-6 mb-3 w-full sm:w-auto'>
              <input type='checkbox' name='' id='futurerls' onClick={CheckFutureRelease} />
              <label htmlFor='futurerls' className='capitalize cursor-pointer'>
                display future release
              </label>
            </div>
            <div className='filtersubmit'>
              <button className='btn' onClick={filterGenreData}>
                Submit
              </button>
            </div>
          </div>
          <div className='genremoviebox grid gap16' id='genre_movie_listing'>
            {gridData &&
              gridData.map((item, index) => {
                return (
                  <div className='postermovieinfo' key={index}>
                    <figure className={'pvr ' + (item.trailer_link || item.watch_now ? '' : 'darkoff')}>
                      <a href={item.link}>
                        <Image src={(item.img === null || item.img === "" || item.img === 'https://live.screendollars.com/wp-content/uploads/2020/05/no-img.jpg' || item.img === "https://live.screendollars.com/wp-content/themes/screendollars-live/assets/images/p_noimgico.png") ? sdplaceholder2.src : item.img} width='190' height='281' alt='' className='objctimg_box' />
                      </a>
                      {item.trailer_link || item.watch_now ? (
                        <figcaption>
                          {item.trailer_link && (
                            <a className='popvid' href={item.trailer_link}>
                              Trailer
                            </a>
                          )}
                          {item.watch_now && (
                            <a className='watchmh' href={item.watch_now} title='name'>
                              Watch Now
                              {item.watch_now_price && <span>({item.watch_now_price})</span>}
                            </a>
                          )}
                        </figcaption>
                      ) : (
                        ''
                      )}
                    </figure>
                    <div className='postermovie_detail'>
                      <h5>
                        <Link href={item.link ? item.link : '#'}>
                          <strong>{item.title}</strong>
                        </Link>
                        {item?.release_year && <span className='font-normal inline-block ml-1'>({item?.release_year})</span>}
                      </h5>
                      {item?.dis_title && (
                        <Link href={item?.dis_title_link} className='block mb-1 truncate' title={item?.dis_title}>
                          {item?.dis_title}
                        </Link>
                      )}
                      <div className='datwide mb-2 flex flex-wrap justify-between items-center my-2'>
                        {item?.release_date && (
                          <time datetime='' className='mr-3 text-base my-1'>
                            {item?.release_date}
                          </time>
                        )}
                        {item?.pattern && <p className='inline-block bg-gray-200 px-2 m-0 uppercase text-sm'> {item?.pattern}</p>}
                      </div>
                      <div className='ratingtime df fww'>
                        {item?.rating && <div className='rating mt-1 mr-2'>{item?.rating}</div>}
                        {item?.runtime && <div className='mb-1 mt-1'>{item?.runtime} </div>}
                      </div>
                      {item?.primary_genre && (
                        <ul className='ml-0 mt-3 mb-0 list-none'>
                          {item?.primary_genre?.map((item, i) => (
                            <li key={i} className='text-sm inline-block align-top mr-2 mb-2'>
                              <Link href={item.value} className='cursor-pointer hover:no-underline px-3 rounded-3xl text-black capitalize border border-gray-500 pb-[2px] hover:bg-gray-100 hover:text-black'>
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* {item.rotten_critics_score && item.imdbrating && (
                        <ul className='criticrate'>
                          {item.imdbrating && (
                            <li>
                              <Image src={item.imdbrating_img} alt='' width='90' height='90' /> - {item.imdbrating}
                            </li>
                          )}
                          {item.rotten_critics_score && (
                            <li>
                              <Image src={item.rotten_critics_score_img} alt='' width='20' height='20' /> - {item.rotten_critics_score}
                            </li>
                          )}
                        </ul>
                      )} */}
                    </div>
                  </div>
                );
              })}
          </div>

          {ShowLoader && (
            <div className='managloading pvr container' style={{ marginBottom: 40 }}>
              <div className='lodarhight'>
                <Loader />
              </div>
            </div>
          )}
          {LoadMoreRequired && (
            <div className='viewbtn'>
              <p id='review-loadmore' className='btn'>
                View More
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Genrename;
