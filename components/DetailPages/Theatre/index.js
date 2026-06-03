import Gallery from '../Gallery';
import Amenities from '../Amenities';
import NowShowing from '../NowShowing';
import DirectoryInfo from '../DirectoryInfo';
import { useEffect, useState } from 'react';
import Faq from '@/components/Faq/Faq';

import axios from 'axios';
import Promoimg from '@/components/DetailPages/Promoimg';
import SponcerAds from '../SponcerAds';
import TheaterHero from './TheaterHero';
import TheaterSocial from './TheaterSocial';
import TheaterInfo from './TheaterInfo';
import NewsletterSubscriber from '@/components/shared/NewsletterSubscriber';
import AdminEditLink from '../AdminEditLink';

const API_URL = process.env.NEXT_PUBLIC_SD_API;
const Theatre = ({ data, listingId, showads }) => {
  // const { data, listingId } = props;
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
    <AdminEditLink data={data} />
      <TheaterHero listingId={listingId} listingType='theatres' data={data} />
      <TheaterSocial data={data} />
      <TheaterInfo data={data} />
      {data?.theatre_amenities && data?.theatre_amenities?.length > 0 && <Amenities aminity={data?.theatre_amenities} />}
      <NowShowing id={data?.id} website={data?.website} />
      <NewsletterSubscriber />
      {/* <DirectoryInfo data={data} listingId={listingId} listingType='theatres' requestfrom='exibitor_theatre_list' favoriteList={favData} />
      {showads ? <SponcerAds showads={showads} /> : null} */}
      {/* <Claimlisting listingId={listingId} listingType='theatres' listing_title={data.title} claimed={data.is_claimed} is_claimed_under_process={data.is_claimed_under_process} /> */}
      {/* {data?.gallery_images && data?.gallery_images?.length > 0 ? <Gallery title={data?.title} data={data?.gallery_images} /> : null}
      {data?.promo_imgs && <Promoimg data={data?.promo_imgs} />}
      {data?.theatre_faq && data?.theatre_faq?.length > 0 ? <div className='theaterfqa my-4'><Faq data={data?.theatre_faq} center /></div> : null} */}
      {/*<WatchAtHome />*/}
    </>
  );
};

export default Theatre;
