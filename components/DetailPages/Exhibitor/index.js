import axios from 'axios';
import { useState, useEffect } from 'react';
import Gallery from '../Gallery';
import NowShowing from '../NowShowing';
import DirectoryInfo from '../DirectoryInfo';
import TheatreLocation from '../TheatreLocation';
import Promoimg from '@/components/DetailPages/Promoimg';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import TheaterHero from '@/components/DetailPages/Theatre/TheaterHero';
import TheaterSocial from '@/components/DetailPages/Theatre/TheaterSocial';
import TheaterInfo from '@/components/DetailPages/Theatre/TheaterInfo';

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
      <AdminEditLink data={data} />
      <TheaterHero listingId={listingId} listingType='exhibitors' data={data} />
      <TheaterSocial data={data} />
      <TheaterInfo data={data} listingType='exhibitors' />
      {/* <DirectoryInfo listingId={listingId} listingType='exhibitors' data={data} requestfrom='exibitor_theatre_list' favoriteList={favData} />
      <Claimlisting listingId={listingId} listingType='exhibitors' listing_title={data.title} claimed={data.is_claimed} is_claimed_under_process={data.is_claimed_under_process} /> */}
      {/* {data.gallery_images && data.gallery_images.length > 0 ? <Gallery data={data.gallery_images} /> : null} */}
      <TheatreLocation id={data.id} />
      {data.promo_imgs && <Promoimg data={data.promo_imgs} />}
      {/* <NowShowing /> */}
      {/* <UserComments /> */}
      {/*<WatchAtHome />*/}
    </>
  );
};

export default Exhibitor;
