import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { checkLocalStorageVariable } from '../../components/Login/localStorageUtil';
import Head from 'next/head';

const $ = require('jquery');
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const LOADER = 'Loading..';
const ERRORLOGIN = 'Please Login First! ';

if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
  var LOGIN_TYPE = localStorage.getItem('from');
  var LOGGED_AVATAR = localStorage.getItem('avatar');
  //  LOGGED_AVATAR = '';
  var LOGGED_AVATAR_TITLE = localStorage.getItem('avatarTitle');
  //console.log(LOGGED_AVATAR);
  // return false;
}
const Talent = () => {
  const [items, setItems] = useState([]);
  const [actorList, setActorList] = useState([]);
  const [talentName, setTalentName] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [loadingFav, setLoadingFav] = useState('');
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
    listActors();
  }, []);

  const listActors = async () => {
    var profile_saveurl = API_URL + '/login/favorite_talent.php';
    await axios
      .get(profile_saveurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          s_text: window.btoa('blank'),
          type: window.btoa('actors'),
        },
      })
      .then((res) => {
        var objectRelated = res.data;
        //var mapValues = Object.values(objectRelated);
        //var favCheck = mapValues[0]['fav'];
        //var favActorsIds = mapValues[0]['fav_list'];

        //setActorList(mapValues);
        //console.log(objectRelated,'----talent listing');
        setActorList(objectRelated);
      })
      .catch((err) => console.log('Actors lists error ', err));
  };

  const searchSelect = (value) => {
    setHiddenValue({ display: 'none' });
    setTalentName(value);
    // console.log(hiddenValue);
  };
  const searchTalent = () => {
    const talent = async () => {
      var profile_saveurl = API_URL + '/login/favorite_talent_search.php';
      await axios
        .get(profile_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            talentname: window.btoa(talentName),
          },
        })
        .then((res) => {
          //console.log(res.data,'--search talent');
          setSearchData(res.data);

          //  console.log(res.data);
          setHiddenValue({ display: ' ' });
        })
        .catch((err) => console.log('Talent lists error ', err));
    };
    talent();
  };
  const addFavoriteTalent = async () => {
    if (LOGGED_EMAIL === null || LOGGED_EMAIL === '') {
      alert(ERRORLOGIN);
      return false;
    }

    var favmobvie_addurl = API_URL + '/login/favorite_talent_add.php';
    setLoadingFav(LOADER);
    await axios
      .get(favmobvie_addurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          talentname: window.btoa(talentName),
          type: 'button',
        },
      })
      .then((res) => {
        //console.log(res.data,'---talent values result');
        setTalentName('');
        setLoadingFav('');
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
          //console.log(res.data);
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
            fav_type: window.btoa('fav_actors'),
          },
        })
        .then((res) => {
          /// console.log(Object.values(res.data));
          setItems(res.data);
        })
        .catch((err) => console.log('Actors lists error ', err));
    };
    getFavLists();
  }, []);

  const Intro = dynamic(() => import('./intro'), {
    ssr: false,
  });
  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <Intro />
      <section className='favtalent favdetails nowshowing toplinesec '>
        <div className='container'>
          <div className='top_txt df fww just-between'>
            <h4>
              <Link href='/favorite'>
                <i className='far fa-long-arrow-left'></i>
              </Link>{' '}
              Back
            </h4>
            <div className='viewmovrebtn df fww'>
              <div className='favaddinput'>
                <div className='favinbox pvr'>
                  <input type='text' placeholder='Enter Actor, Actress or Filmmaker' list='favmoviename1' value={talentName} onChange={(e) => setTalentName(e.target.value)} />
                  <button onClick={searchTalent}>
                    <i className='far fa-search'></i>
                  </button>
                  <div className='favauto' style={hiddenValue}>
                    <ul>
                      {searchData.map((talentSearch, index) => {
                        return (
                          <li key={index} onClick={() => searchSelect(talentSearch.title)}>
                            {talentSearch.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <button className='btn goldbtn' onClick={(e) => addFavoriteTalent('button')}>
                  add{' '}
                </button>
                {loadingFav}
              </div>
            </div>
          </div>
          <div className='talentlist grid'>
            {actorList.map((actor, index) => {
              const ID = actor.ID;
              return (
                <>
                  <div className='catcrewcol'>
                    <ul className='castcrew_people'>
                      <li>
                        <div className='cast_pic bgimage' style={{ backgroundImage: `url(${actor.image_url})` }}></div>
                        <div className='cast_info'>
                          <h5>
                            {' '}
                            <Link href={actor.post_url}>{actor.title} </Link>
                            <span onClick={() => favoriteHeart(ID, 'fav_actors')} className={items.includes(ID) ? 'favheart  redtxt' : 'favheart '}>
                              <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                            </span>
                          </h5>
                          <p>
                            <Link href={actor.post_url}>{actor.talent_movie_id}</Link>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Talent;
