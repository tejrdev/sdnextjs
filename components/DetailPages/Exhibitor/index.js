import axios from 'axios';
import { useState, useEffect } from 'react';
import Gallery from '../Gallery';
import NowShowing from '../NowShowing';
import TheatreInfo from '../TheatreInfo';
import UserComments from '../UserComments';
import WatchAtHome from '../WatchAtHome';
import TheatreLocation from '../TheatreLocation';
import Claimlisting from '@/components/DetailPages/Claimlisting';
import Promoimg from '@/components/DetailPages/Promoimg';
import MenuNavigation from '@/components/Directory/ListingPages/MenuNavigation';

const API_URL = process.env.NEXT_PUBLIC_SD_API;
const Exhibitor = ({ data, listingId }) => {
  const [favData, setFavData] = useState('');

  useEffect(() => {
    var LOGGED_EMAIL = localStorage.getItem('email');
    const getFavLists = () => {
      var fav_saveurl = API_URL + '/login/favorite_get_all.php';
      axios
        .get(fav_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            fav_type: window.btoa('fav_exhibitors'),
            fav_id: window.btoa(data.id),
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
    <MenuNavigation/>
      <TheatreInfo data={data} requestfrom='exibitor_theatre_list' favoriteList={favData} />
      <Claimlisting listingId={listingId} listingType='exhibitors' listing_title={data.title} claimed={data.is_claimed} />
      {data.gallery_images && data.gallery_images.length > 0 ? <Gallery data={data.gallery_images} /> : null}
      <TheatreLocation id={data.id} />
      {data.promo_imgs && <Promoimg data={data.promo_imgs} />}
      {/* <NowShowing /> */}
      {/* <UserComments /> */}
      {/*<WatchAtHome />*/}
    </>
  );
};

export default Exhibitor;
