import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { checkLocalStorageVariable } from '../../components/Login/localStorageUtil';
import Head from 'next/head';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
}

const $ = require('jquery');
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const LOADER = 'Loading...';
const ERRORLOGIN = 'Please Login First! ';
if (typeof window !== 'undefined') {
  var LOGGED_EMAIL = localStorage.getItem('email');
}

const Theatre = () => {
  const router = useRouter();
  const [theatreData, setTheatreData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [hiddenValue, setHiddenValue] = useState({ display: 'none' });
  const [loaderTheatreZip, setLoaderTheatreZip] = useState();
  const [theatreName, setTheatreName] = useState('');
  const [loadingFav, setLoadingFav] = useState('');
  const [userLocationData, setUserLocationData] = useState(''); //33 Miller Hill Road, Dover, MA 02030 USA
  const [items, setItems] = useState([]);

  useEffect(() => {
    const userLoggedIn = checkLocalStorageVariable('email');
    const enc_login = checkLocalStorageVariable('enc_email');
    if (!userLoggedIn && !enc_login) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (pos) => {
    const crd = pos.coords;
    const coordinatesUrl = `https://api.opencagedata.com/geocode/v1/json?q=${crd.latitude}+${crd.longitude}&key=7bcf32f4394e4c56820a138c135722e2`;
    fetch(coordinatesUrl)
      .then((res) => res.json())
      .then((json) => {
        var userLoc = json.results[0].formatted;
        var userZip = json.results[0].components.postcode;
        var userLat = crd.latitude;
        var userLng = crd.longitude;
        setUserLocationData(userLoc);
        allTheatres(userLoc, userZip, userLat, userLng);
      });
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const allTheatres = (userLoc, userZip, userLat, userLng) => {
    const listTheatre = async () => {
      var profile_saveurl = API_URL + '/login/favorite_theatre_list.php';
      await axios
        .get(profile_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            userlocationDetail: window.btoa(userLoc),
            zipcode: window.btoa(userZip),
            latitude: userLat,
            longitude: userLng,
          },
        })
        .then((res) => {
          var objectRelated = res;
          var mapValues = Object.values(objectRelated);
          setTheatreData(res.data);
        })
        .catch((err) => console.log('Theatre lists error ', err));
    };
    listTheatre();
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
          setItems(res.data);
        });
    };
    addFavoriteAll();
  };

  const searchSelect = (value) => {
    setHiddenValue({ display: 'none' });
    setTheatreName(value);
  };

  const addFavoriteTheatre = async () => {
    if (LOGGED_EMAIL === null || LOGGED_EMAIL === '') {
      alert(ERRORLOGIN);
      return false;
    }

    var favmobvie_addurl = API_URL + '/login/favorite_theatre_add.php';
    setLoadingFav(LOADER);
    await axios
      .get(favmobvie_addurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          theatrename: window.btoa(theatreName),
          type: 'button',
        },
      })
      .then((res) => {
        setLoadingFav('');
        router.push('/favorite/theatre');
      });
  };

  useEffect(() => {
    const getFavLists = () => {
      var fav_saveurl = API_URL + '/login/favorite_get_listingall.php';
      axios
        .get(fav_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            fav_type: window.btoa('fav_theatres'),
          },
        })
        .then((res) => {
          /// console.log(Object.values(res.data));
          setItems(res.data);
        })
        .catch((err) => console.log('THeatre lists error ', err));
    };
    getFavLists();
  }, []);

  const searchTheatres = () => {
    const theatres = async () => {
      var profile_saveurl = API_URL + '/login/favorite_theatres_search.php';
      await axios
        .get(profile_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            theatrename: window.btoa(theatreName),
          },
        })
        .then((res) => {
          //console.log(res.data,'--search theatres');
          setSearchData(res.data);
          //  console.log(res.data);
          setHiddenValue({ display: ' ' });
        })
        .catch((err) => console.log('Theatre Search lists error ', err));
    };
    theatres();
  };

  const getTheatreDataDetail = async () => {
    var profile_saveurl = API_URL + '/login/favorite_theatres_listing2.php';
    setLoaderTheatreZip(LOADER);
    await axios
      .get(profile_saveurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          zipcode: window.btoa(userLocationData),
        },
      })
      .then((res) => {
        setLoaderTheatreZip(' ');
        setTheatreData(res.data);
      })
      .catch((err) => console.log('Theatre lists error ', err));
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
      <section className='favtheatre favdetails nowshowing toplinesec '>
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
                  <input type='text' placeholder='Enter Theatre Name' list='favmoviename1' value={theatreName} onChange={(e) => setTheatreName(e.target.value)} />
                  <button onClick={searchTheatres}>
                    <i className='far fa-search'></i>
                  </button>
                  <div className='favauto' style={hiddenValue}>
                    <ul>
                      {searchData.map((theatresearch, index) => {
                        return (
                          <li key={index} onClick={() => searchSelect(theatresearch.title)}>
                            {theatresearch.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <button className='btn goldbtn' onClick={(e) => addFavoriteTheatre('button')}>
                  add{' '}
                </button>{' '}
                {loadingFav}
              </div>
            </div>
          </div>
          <div className='favaddinput'>
            <div className='currentlocation df fww'>
              <p>
                <input type='text' className='locinputplace' value={userLocationData} placeholder='Enter Location (City &amp; State or ZIP)' onChange={(e) => setUserLocationData(e.target.value)} onBlur={getTheatreDataDetail} />
                {loaderTheatreZip} <strong>or</strong>
              </p>
              <div className='locbtn'>
                <button className='btn goldbtn' onClick={getLocation}>
                  Find My Location
                </button>
                (U.S & Canada Only)
              </div>
            </div>
          </div>
          <div className='favtheatershowtime grid'>
            {theatreData.length > 0 ? (
              theatreData.map((currentElement, index) => {
                if (currentElement.title !== '') {
                  const id = currentElement.id;
                  return (
                    <div className='exb_infocarditem'>
                      <div className='exb_infocarditeminner'>
                        <h4>
                          {currentElement.title}
                          <span onClick={() => favoriteHeart(id, 'fav_theatres')} className={items.includes(id) ? 'favheart  redtxt' : 'favheart '}>
                            <i className={items.includes(id) ? 'fas fa-heart' : 'far fa-heart '}></i>
                          </span>
                        </h4>
                        <p>
                          {currentElement.address}, {currentElement.hq}, {currentElement.zip}
                        </p>
                        <p>{currentElement.screens === '1' ? `${currentElement.screens} Screen` : `${currentElement.screens} Screens`}</p>
                        <div className='theaters_features'>
                          {/* <ul className="df fww">
								   <li>Parking</li>
								   <li>Dine-in</li>
								   <li>iMAX</li>
								   <li>4dX</li>
								   <li>Dolby aTMOS</li>
								   <li>Recliners</li>
							   </ul>*/}
                        </div>
                        <div className='theater_dist'>
                          <span>{currentElement.zip_distance}mi</span>
                        </div>
                        <div className='showtimebtn'>
                          <a href='javascript:void(0)' className='btn ghostbtn' target='_self'>
                            Find Showtimes
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <>
                <div className='exb_infocarditem' style={{ textAlign: 'center' }}>
                  <h4>No Theatre Found!</h4>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Theatre;
