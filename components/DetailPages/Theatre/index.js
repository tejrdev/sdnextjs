import Gallery from '../Gallery';
import NowShowing from '../NowShowing';
import TheatreInfo from '../TheatreInfo';
import WatchAtHome from '../WatchAtHome';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import './theatre_detail.css';
// import '../Exhibitor/exibitor_detail.css';
import Claimlisting from '@/components/DetailPages/Claimlisting';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const Theatre = ({ data }) => {
  const [favData, setFavData] = useState(0);
  useEffect(() => {
    var LOGGED_EMAIL = localStorage.getItem('email');
    const getFavLists = () => {
      var fav_saveurl = API_URL + '/login/favorite_get_all.php';
      axios
        .get(fav_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            fav_type: window.btoa('fav_theatres'),
            fav_id: window.btoa(data.id),
          },
        })
        .then((res) => {
          setFavData(res.data);
        })
        .catch((err) => console.log('Exhibitors lists error ', err));
    };
    getFavLists();
  }, []);
  return (
    <>
      <TheatreInfo data={data} requestfrom='exibitor_theatre_list' favoriteList={favData} />
      {/* <Claimlisting /> */}
      {data.galary_imgs && data.galary_imgs.length > 0 ? <Gallery title={data.title} data={data.galary_imgs} /> : null}
      {data.showtime_cinemas_id && data.showtime_cinemas_id !== '' ? <NowShowing data={data.showtime_cinemas_id} /> : null}
      {/*<WatchAtHome />*/}
    </>
  );
};

export default Theatre;
