import Gallery from '../Gallery';
import Amenities from '../Amenities';
import NowShowing from '../NowShowing';
import TheatreInfo from '../TheatreInfo';
import WatchAtHome from '../WatchAtHome';
import { useEffect, useState } from 'react';

import axios from 'axios';
import Promoimg from '@/components/DetailPages/Promoimg';
// import './theatre_detail.css';
// import '../Exhibitor/exibitor_detail.css';
import Claimlisting from '@/components/DetailPages/Claimlisting';
import MenuNavigation from '@/components/Directory/ListingPages/MenuNavigation';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const Theatre = ({ data, listingId }) => {
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
    <MenuNavigation/>
      <TheatreInfo data={data} requestfrom='exibitor_theatre_list' favoriteList={favData} />
      <Claimlisting listingId={listingId} listingType='theatres' listing_title={data.title} claimed={data.is_claimed} />
      {data.amenities && data.amenities.length > 0 && <Amenities aminity={data.amenities} />}
      {data.gallery_images && data.gallery_images.length > 0 ? <Gallery title={data.title} data={data.gallery_images} /> : null}
      {data.promo_imgs && <Promoimg data={data.promo_imgs} />}
      {data.showtime_cinemas_id && data.showtime_cinemas_id !== '' ? <NowShowing data={data.showtime_cinemas_id} website={data.website} /> : null}
      {/*<WatchAtHome />*/}
    </>
  );
};

export default Theatre;
