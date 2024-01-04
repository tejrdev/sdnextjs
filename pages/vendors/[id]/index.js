import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Loader from '../../../components/Loader';

import Gallery from '../../../components/DetailPages/Gallery';
import NowShowing from '../../../components/DetailPages/NowShowing';
import TheatreInfo from '../../../components/DetailPages/TheatreInfo';
import UserComments from '../../../components/DetailPages/UserComments';
import WatchAtHome from '../../../components/DetailPages/WatchAtHome';
import ProductData from '../../../components/DetailPages/Vendor/ProductData.js';
import Page404 from '../../../components/Page404';
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
  const data = await res.json();
  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }
  // return { props: { data } };

  // static data
  let VendorDetailsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/vendors.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'vendors/' + id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  VendorDetailsData = await VendorDetailsData.json();

  return {
    props: { data, VendorDetailsData },
    revalidate: 10, // In seconds
  };
}

const Vendor = ({ data, VendorDetailsData }) => {
  const router = useRouter();
  const { id } = router.query;
  const [favData, setFavData] = useState(0);
  //const [VendorDetailsDataLoaded, setVendorDetailsDataLoaded] = useState(false);
  //const [VendorDetailsData, setVendorDetailsData] = useState([]);

  useEffect(() => {}, []);

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

  if (data.error === 'Page Not Found!' || data.tag === null) {
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
      <Head>
        {data.children[0].children.map((item, index) => {
          const attributes = item.tag.toUpperCase();

          switch (attributes) {
            case 'TITLE':
              return <title key={index}>{item.html}</title>;
            case 'META':
              const name = item.name || '';
              if (name !== '') {
                return <meta key={index} name={item.name} content={item.content} />;
              } else {
                return <meta key={index} property={item.property} content={item.content} />;
              }
            case 'LINK':
              return <link key={index} rel={item.rel} href={item.href} />;
            case 'SCRIPT':
              return <script key={index} type={item.type} class={item.class} dangerouslySetInnerHTML={{ __html: item.html }}></script>;
            default:
              return null;
          }
        })}
      </Head>
      {VendorDetailsData ? (
        <>
          <TheatreInfo data={VendorDetailsData} requestfrom='VendorDetails' favoriteList={favData} />
          {VendorDetailsData.products_services_data && <ProductData data={VendorDetailsData} />}

          {VendorDetailsData.galary_imgs.length > 0 ? <Gallery data={VendorDetailsData.galary_imgs} /> : null}
          {/* <NowShowing />
           <UserComments />
          <WatchAtHome /> */}
          <br />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Vendor;
