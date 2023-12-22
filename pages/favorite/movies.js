import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { checkLocalStorageVariable } from '../../components/Login/localStorageUtil';
import Head from 'next/head';

const $ = require('jquery');
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const SITE_URL = process.env.NEXT_PUBLIC_LOGIN_URL;
const LOADER = 'Loading..';
const ERROR = 'Movie Already Exists in favorite list';
const SUCCESS = 'Movie Added Successfully';
const ERRORLOGIN = 'Please Login First! ';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
  var LOGIN_TYPE = localStorage.getItem('from');
  var LOGGED_AVATAR = localStorage.getItem('avatar');
  var LOGGED_AVATAR_TITLE = localStorage.getItem('avatarTitle');
  var LOGGED_USER = localStorage.getItem('username');
  //console.log(LOGGED_AVATAR);
  // return false;
}
const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  const [items, setItems] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [loadingFav, setLoadingFav] = useState('');
  const [errorFav, setErrorFav] = useState('');
  const [successFav, setSuccessFav] = useState('');
  const [movieId, setMovieId] = useState('');
  const [movieType, setMovieType] = useState('button');
  const [hiddenValue, setHiddenValue] = useState({ display: 'none' });
  const router = useRouter();

  useEffect(() => {
    const userLoggedIn = checkLocalStorageVariable('email');
    const enc_login = checkLocalStorageVariable('enc_email');
    if (!userLoggedIn && !enc_login) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    listMovies();
  }, []);
  useEffect(() => {
    setMovieName(movieId);
  }, [movieId]);

  useEffect(() => {
    const $ = window.jQuery;
    $('.watchbtn .eatchoptionbtn').click(function () {
      $(this).next().slideToggle();
      $(this).parent().toggleClass('watchactive');
    });
  }, []);

  const addFavoriteMovie = async () => {
    if (LOGGED_EMAIL === null || LOGGED_EMAIL === '') {
      alert(ERRORLOGIN);
      return false;
    }

    var favmobvie_addurl = API_URL + '/login/favorite_movies_add.php';
    setLoadingFav(LOADER);
    await axios
      .get(favmobvie_addurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          moviename: window.btoa(movieName),
          type: movieType,
        },
      })
      .then((res) => {
        setLoadingFav('');
        listMovies();
        //var objectRelated = res.data.talent;
        //var mapValues = Object.values(objectRelated);
        //setActorList(mapValues);
        //setLoadActor('');
      });
  };

  const favoriteHeart = (favoriteId, favoriteType) => {
    if (LOGGED_EMAIL === null || LOGGED_EMAIL === '') {
      alert(ERRORLOGIN);
      return false;
    }

    const addFavoriteAll = async () => {
      var favmobvie_addurl = API_URL + '/login/favorite_all.php';
      // setLoadingFav(LOADER);
      await axios
        .get(favmobvie_addurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            favoriteType: window.btoa(favoriteType),
            favoriteId: window.btoa(favoriteId),
          },
        })
        .then((res) => {
          // console.log(res.data);
          setItems(res.data);
          // setLoadingFav('');
        });
    };
    addFavoriteAll();
  };

  useEffect(() => {
    const getFavLists = () => {
      var fav_saveurl = API_URL + '/login/favorite_get_listingall.php';
      axios
        .get(fav_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            fav_type: window.btoa('fav_filmdata'),
          },
        })
        .then((res) => {
          setItems(Object.values(res.data));
        })
        .catch((err) => console.log('Movies lists error ', err));
    };
    getFavLists();
  }, []);

  const listMovies = async () => {
    var profile_saveurl = API_URL + '/login/favorite_movies.php';
    await axios
      .get(profile_saveurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          s_text: window.btoa('blank'),
        },
      })
      .then((res) => {
        setMovieData(res.data);
      })
      .catch((err) => console.log('Movies lists error ', err));
  };
  const searchMovies = () => {
    const movies = async () => {
      var profile_saveurl = API_URL + '/login/favorite_movies_search.php';
      await axios
        .get(profile_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            moviename: window.btoa(movieName),
          },
        })
        .then((res) => {
          //console.log(res.data,'--search movies');
          setSearchData(res.data);
          //  console.log(res.data);
          setHiddenValue({ display: ' ' });
        })
        .catch((err) => console.log('Movies lists error ', err));
    };
    movies();
  };

  const searchSelect = (value) => {
    setHiddenValue({ display: 'none' });
    setMovieName(value);
    // console.log(hiddenValue);
  };

  const Intro = dynamic(() => import('./intro'), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <Intro />
      <section className='favmovies favdetails nowshowing toplinesec '>
        <div className='container'>
          <div className='top_txt df fww just-between'>
            <h4>
              <Link href='/favorite'>
                <i className='far fa-long-arrow-left'></i> Back
              </Link>
            </h4>
            <div className='viewmovrebtn df fww'>
              <div className='favaddinput'>
                <div className='favinbox pvr'>
                  <input type='text' placeholder='Enter Movie' list='favmoviename1' value={movieName} onChange={(e) => setMovieName(e.target.value)} />
                  <button onClick={searchMovies}>
                    <i className='far fa-search'></i>
                  </button>
                  <div className='favauto' style={hiddenValue}>
                    <ul>
                      {searchData.map((movieSearch, index) => {
                        return (
                          <li key={index} onClick={() => searchSelect(movieSearch.title)}>
                            {movieSearch.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <button className='btn goldbtn' onClick={(e) => addFavoriteMovie('button')}>
                  add {loadingFav}
                </button>
              </div>
            </div>
          </div>
          <div className='nowshow_sliderbox'>
            <div className='favmovie_detail grid'>
              {movieData.map((current, index) => {
                var movieTitle = current.title;
                var ID = current.ID;
                //	console.log(current.image_url.sizes.thumbnail,current.image_url);
                var imageSrc = current.image_url;
                return (
                  <>
                    {current.title !== '' ? (
                      <>
                        <div className='nowshow_item' key={index}>
                          <div className='nowshow_iteminner'>
                            <figure className='pvr'>
                              <Link href={current.permalink}>
                                <img src={imageSrc ? imageSrc : ''} alt={current.title} className='objctimg_box' />
                              </Link>
                            </figure>
                            <div className='nowshow_info'>
                              <h5>
                                {' '}
                                <Link href={current.permalink}> {current.title} </Link>
                                <span onClick={() => favoriteHeart(ID, 'fav_filmdata')} className={items.includes(ID) ? 'favheart  redtxt' : 'favheart '}>
                                  <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                                </span>
                              </h5>
                              <div className='pghr df fww just-between'>
                                <div className='rating'>{current.rating} </div>

                                <time> {current.runtime}</time>
                              </div>
                            </div>
                            <div className='watchbtn'>
                              <span className='eatchoptionbtn'>Watch Options</span>
                              <ul>
                                <li>
                                  <a href='javascript:void(0)' target='_self'>
                                    Find Showtimes
                                  </a>
                                </li>
                                <li>
                                  <a href='javascript:void(0)' target='_self'>
                                    Watch Now
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Movies;
