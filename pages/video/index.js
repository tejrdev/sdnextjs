import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Loader from '../../components/Loader';
import HeroVideo from '../../components/Videos/HeroVideo';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import VideoSec from '../../components/Videos/VideoSec';
import Trailersec from '../../components/Videos/Trailersec';
import CenterSocial from '../../components/Videos/CenterSocial';
import Dropmassage from '../../components/Videos/Dropmassage';
import HomePageAds from '../../components/Homepage/HomePageAds';
import Darkmode from '../../components/All/Darkmode';
import HeadComponent from '@/components/HeadComponent';

const $ = require('jquery');
export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'video');
  const SEOdata = await res.json();

  // about page static data
  let VideosData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/video_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  VideosData = await VideosData.json();

  return {
    props: { SEOdata, VideosData },
    revalidate: 10, // In seconds
  };
}
const Videos = ({ SEOdata, VideosData }) => {
  const router = useRouter();

  useEffect(() => {
    const exitingFunction = () => {
      document.querySelector('html')?.classList.remove('dark');
    };

    // router.events.on('routeChangeStart', exitingFunction);
    router.events.on('routeChangeComplete', (url) => {
      if (url.indexOf('/video') === -1) exitingFunction();
    });
    return () => {
      router.events.off('routeChangeComplete', exitingFunction);
    };
  }, []);

  return (
    <>
      <HeadComponent data={SEOdata} />
      <AdminEditLink data={VideosData} />
      <Darkmode />
      <HeroVideo data={VideosData.top_videos} />
      {/* <Trailersec /> */}
      {VideosData.video_play_list.map((item, index) => {
        return <VideoSec data={item} key={index} index={index} />;
      })}
      <section className='vidads'>
        <div className='container'>
          {/* This Ads is only supported in server */}
          <div className='border-b border-gray-300 py-3'>
            <HomePageAds cls='ads_970' format='horizontal' />
          </div>
        </div>
      </section>
      <CenterSocial />
      {/* <Dropmassage /> */}
    </>
  );
};

export default Videos;
