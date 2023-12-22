import axios from 'axios';
import { useState, useEffect } from 'react';
import Gallery from '../Gallery';
import NowShowing from '../NowShowing';
import TheatreInfo from '../TheatreInfo';
import UserComments from '../UserComments';
import WatchAtHome from '../WatchAtHome';
import TheatreLocation from '../TheatreLocation';

const API_URL = process.env.NEXT_PUBLIC_SD_API;
const Exhibitor = ({ data }) => {
  const [favData,setFavData]    =useState('');

  useEffect(() => {
    var LOGGED_EMAIL = localStorage.getItem('email');
    const getFavLists =  () => {
      var fav_saveurl = API_URL + '/login/favorite_get_all.php';
       axios
        .get(fav_saveurl, {
        params: {
          email: window.btoa(LOGGED_EMAIL),
          fav_type:window.btoa('fav_exhibitors'),
          fav_id :window.btoa(data.id)
        },
        })
        .then((res) => {
          setFavData(res.data);
          //console.log(res.data,'fav teatress exhibitora');
        })
        .catch((err) => console.log('Exhibitor lists error ', err));
      };
      getFavLists();

  }, []);
  return (
    <>
      <TheatreInfo data={data} requestfrom="exibitor_theatre_list"  favoriteList={favData}/>
      {data.galary_imgs.length > 0 ? <Gallery data={data.galary_imgs} /> : null}
      <TheatreLocation id={data.id} />

      {/* <NowShowing /> */}
      {/* <UserComments /> */}
      {/*<WatchAtHome />*/}
    </>
  );
};

export default Exhibitor;
