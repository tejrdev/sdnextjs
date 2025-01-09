import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Gallery from '../../../components/DetailPages/Gallery';
import TheatreInfo from '../../../components/DetailPages/TheatreInfo';
import UserComments from '../../../components/DetailPages/UserComments';
import ProductData from '../../../components/DetailPages/Vendor/ProductData.js';
import Claimlisting from '@/components/DetailPages/Claimlisting';
import Page404 from '../../../components/Page404';
import Promoimg from '@/components/DetailPages/Promoimg';
import HeadComponent from '@/components/HeadComponent';
import MenuNavigation from '@/components/Directory/ListingPages/MenuNavigation';

const API_URL = process.env.NEXT_PUBLIC_SD_API;
export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const id = params.id;
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'vendors/' + id);
  const SEOdata = await res.json();
  if (!SEOdata) {
    return {
      notFound: true,
    };
  }
  // return { props: { data } };

  // static data
  let VendorDetailsData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/detail_pages/vendors.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'vendors/' + id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  VendorDetailsData = await VendorDetailsData.json();

  return {
    props: { SEOdata, VendorDetailsData, id },
    revalidate: 10, // In seconds
  };
}

const Vendor = ({ SEOdata, VendorDetailsData, id }) => {
  const [favData, setFavData] = useState(0);

  useEffect(() => {
    var LOGGED_EMAIL = localStorage.getItem('email');
    const getFavLists = () => {
      var fav_saveurl = API_URL + '/login/favorite_get_all.php';
      axios
        .get(fav_saveurl, {
          params: {
            email: window.btoa(LOGGED_EMAIL),
            fav_type: window.btoa('fav_vendors'),
            fav_id: window.btoa(VendorDetailsData.id),
          },
        })
        .then((res) => {
          setFavData(res.data);
        })
        .catch((err) => console.log('Vendors lists error ', err));
    };
    getFavLists();
  }, []);

  if (VendorDetailsData.error === 'Page Not Found!' || VendorDetailsData.tag === null) {
    return (
      <>
        <Head>
          <meta name='robots' content='noindex' />
        </Head>
        <Page404 />
      </>
    );
  }
  return (
    <>
      <HeadComponent data={SEOdata} />
      <MenuNavigation />
      <TheatreInfo data={VendorDetailsData} requestfrom='VendorDetails' favoriteList={favData} />
      <Claimlisting listingId={id} listingType='vendors' listing_title={VendorDetailsData.title} claimed={VendorDetailsData.is_claimed} />
      {VendorDetailsData.products_services_data && <ProductData data={VendorDetailsData} />}
      {VendorDetailsData?.gallery_images?.length > 0 ? <Gallery data={VendorDetailsData.gallery_images} /> : null}
      {VendorDetailsData.promo_imgs && <Promoimg data={VendorDetailsData.promo_imgs} />}
    </>
  );
};

export default Vendor;
