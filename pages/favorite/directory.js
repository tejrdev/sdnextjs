import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { checkLocalStorageVariable } from '../../components/Login/localStorageUtil';
import Head from 'next/head';

const API_URL = process.env.NEXT_PUBLIC_SD_API;
const SITE_URL = process.env.NEXT_PUBLIC_LOGIN_URL;
const LOADER = 'Loading..';
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

const Directory = () => {
  const router = useRouter();
  const [directoryData, setDirectoryData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [directoryName, setDirectoryName] = useState('');
  const [hiddenValue, setHiddenValue] = useState({ display: 'none' });
  const [loadingFav, setLoadingFav] = useState('');
  const [items, setItems] = useState([]);
  useEffect(() => {
    listDirectory();
  }, []);
  useEffect(() => {
    const userLoggedIn = checkLocalStorageVariable('email');
    const enc_login = checkLocalStorageVariable('enc_email');
    if (!userLoggedIn && !enc_login) {
      router.push('/login');
    }
  }, []);

  const listDirectory = async () => {
    var profile_saveurl = API_URL + '/login/favorite_directory_all.php';
    await axios
      .get(profile_saveurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
        },
      })
      .then((res) => {
        var objectRelated = res.data;
        var mapValues = Object.values(objectRelated);
        //console.log(objectRelated);
        setDirectoryData(objectRelated);
        const arrayDirectory = [];
        objectRelated.map((currentDirectory, index) => {
          if (currentDirectory.favorite === 1) {
            arrayDirectory.push(currentDirectory.id);
          }
        });
        setItems(arrayDirectory);
      })
      .catch((err) => console.log('Distributor lists error ', err));
  };

  const searchDirectory = () => {
    const directory = async () => {
      var profile_saveurl = API_URL + '/login/favorite_directory_search.php';
      await axios
        .get(profile_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            directoryname: window.btoa(directoryName),
          },
        })
        .then((res) => {
          // console.log(res.data,'--search directory');
          setSearchData(res.data);
          //  console.log(res.data);
          setHiddenValue({ display: ' ' });
        })
        .catch((err) => console.log('Directory lists error ', err));
    };
    directory();
  };
  const searchSelect = (value) => {
    setHiddenValue({ display: 'none' });
    setDirectoryName(value);
    //console.log(hiddenValue);
  };
  const addFavoriteDir = async () => {
    if (LOGGED_EMAIL === null || LOGGED_EMAIL === '') {
      alert(ERRORLOGIN);
      return false;
    }

    var favmobvie_addurl = API_URL + '/login/favorite_directory_add.php';
    setLoadingFav(LOADER);
    await axios
      .get(favmobvie_addurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          directoryname: window.btoa(directoryName),
          type: 'button',
        },
      })
      .then((res) => {
        // console.log(res.data,'---directory values result');
        setLoadingFav('');
      });
  };
  const favoriteHeart = (favoriteId, favoriteType) => {
    if (LOGGED_EMAIL === null || LOGGED_EMAIL === '') {
      alert(ERRORLOGIN);
      return false;
    }

    const addFavoriteAll = async () => {
      var favmobvie_addurl = API_URL + '/login/fav_directory_setlisting.php';
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
            fav_type: window.btoa('fav_dist_listing'),
          },
        })
        .then((res) => {
          /// console.log(Object.values(res.data));
          setItems(res.data);
        })
        .catch((err) => console.log('Directory lists error ', err));
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
      <section className='favcompany favdetails nowshowing toplinesec '>
        <div className='container'>
          <div className='top_txt df fww just-between'>
            <h4>
              <Link href='/favorite'>
                <i className='far fa-long-arrow-left'></i>{' '}
              </Link>
              Back
            </h4>
            <div className='viewmovrebtn df fww'>
              <div className='favaddinput'>
                <div className='favinbox pvr'>
                  <input type='text' placeholder='Enter Companies and Organizations' list='favmoviename1' value={directoryName} onChange={(e) => setDirectoryName(e.target.value)} />
                  <button>
                    <i className='far fa-search' onClick={searchDirectory}></i>
                  </button>
                  <div className='favauto' style={hiddenValue}>
                    <ul>
                      {searchData.map((directorySearch, index) => {
                        return (
                          <li key={index} onClick={() => searchSelect(directorySearch.title)}>
                            {directorySearch.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <button className='btn goldbtn' onClick={(e) => addFavoriteDir('button')}>
                  add
                </button>{' '}
                {loadingFav}
              </div>
            </div>
          </div>

          <div className='favcompany_box grid gap16'>
            {directoryData.map((currentElement, index) => {
              const ID = currentElement.id;
              const type = currentElement.type;
              const directory = currentElement.directory_type;
              return (
                <>
                  <div className='favcompanyitem'>
                    <figure className='pvr'>
                      <Link href={currentElement.link}>
                        <Image src={currentElement.img} alt={currentElement.title} title={currentElement.title} height='100' width='100' />
                      </Link>
                    </figure>
                    <div className='favcompany_detail'>
                      <div className='text-center'>
                        <div className='darectory_tag'>{directory} </div>
                      </div>
                      <h4>
                        <Link href={currentElement.link}>{currentElement.title} </Link>
                        <span className={items.includes(ID) ? 'favheart  redtxt' : 'favheart '} onClick={() => favoriteHeart(ID, type)}>
                          <i className={items.includes(ID) ? 'fas fa-heart' : 'far fa-heart '}></i>
                        </span>
                      </h4>
                    </div>
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

export default Directory;
