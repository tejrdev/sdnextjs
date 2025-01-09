import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Loader from '../../../components/Loader';
import Heading from '../../../components/Videos/Heading';
import VideoList from '../../../components/Videos/VideoList';
import Darkmode from '../../../components/All/Darkmode';
import HomePageAds from '../../../components/Homepage/HomePageAds';
import CenterSocial from '../../../components/Videos/CenterSocial';
import Dropmassage from '../../../components/Videos/Dropmassage';
import HeadComponent from '@/components/HeadComponent';
import Link from 'next/link';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'video/trailers-clips');
  const SEOdata = await res.json();

  // trailers clip videos page static data
  let BoxofficeBuzzData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/video_page/video_sub_page.php?page=' + 1 + '&url=' + process.env.NEXT_PUBLIC_MENU_URL + 'video/trailers-clips/&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  BoxofficeBuzzData = await BoxofficeBuzzData.json();

  return {
    props: { SEOdata, BoxofficeBuzzData },
    revalidate: 10, // In seconds
  };
}

const TrailersClips = ({ SEOdata, BoxofficeBuzzData }) => {
  const [MoviesData, setMoviesData] = useState(BoxofficeBuzzData.video_list);
  const [pageNo, setpageNo] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [HideLoader, setHideLoader] = useState(true);
  const [LoadMoreRequired, setLoadMoreRequired] = useState(true);
  const [NoResult, setNoResult] = useState(false);
  const [DataChanged, setDataChanged] = useState(false);
  const [searchClicked, setsearchClicked] = useState(false);
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

  useEffect(() => {
    if (DataChanged) loadBoxofficeBuzzData();
  }, [pageNo, searchClicked]);

  const loadBoxofficeBuzzData = () => {
    setHideLoader(false);
    setLoadMoreRequired(false);
    setNoResult(false);
    setsearchClicked(false);
    axios
      .get(
        process.env.NEXT_PUBLIC_SD_API +
        '/video_page/video_sub_page.php?page=' +
        pageNo +
        '&search=' +
        searchText +
        '&url=' +
        process.env.NEXT_PUBLIC_MENU_URL +
        'video/trailers-clips/?api_token=' +
        process.env.NEXT_PUBLIC_API_TOKEN
      )
      .then((res) => {
        if (res.data.total_pages === 0) {
          setNoResult(true);
          setHideLoader(true);
          return;
        }
        if (MoviesData.length) {
          setMoviesData((oldData) => oldData.concat(res.data.video_list));
        } else {
          setMoviesData(res.data.video_list);
        }
        setHideLoader(true);
        setDataChanged(false);
        setTimeout(() => {
          setLoadMoreRequired(parseInt(res.data.total_pages) === pageNo ? false : true);
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const target = document.querySelector('#trailers-loadmore');
    let isVisible = null;

    const callBack = (entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && LoadMoreRequired) {
        setpageNo(pageNo + 1);
        setDataChanged(true);
      }
    };

    const options = {
      root: null,
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(callBack, options);
    LoadMoreRequired && target && observer.observe(target);
  }, [LoadMoreRequired]);

  const onSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const filterData = (e) => {
    e.preventDefault();
    setMoviesData([]);
    setpageNo(1);
    setLoadMoreRequired(false);
    setDataChanged(true);
    setsearchClicked(true);
  };
  return (
    <>
      <HeadComponent data={SEOdata} />
      <section className='video_gallery'>
        <Darkmode />
        <div className='page_intro'>
          <div className='container'>
            <Heading title={'All Trailers'} content={BoxofficeBuzzData.content} />
          </div>
        </div>
        <div className='trailer_srchshort'>
          <div className='container'>
            <div className='backpage dark:text-white sm:-translate-y-14 font-bold cursor-pointer hover:underline inline-block sm:mb-0 mb-1'>
              <Link href='/video' className='text-black dark:text-white'>
                <i className='fas fa-long-arrow-left'></i> Back to Videos
              </Link>
            </div>
            <div className='xsm:flex justify-between text-center'>
              <form action='' className='dircsearch_list pvr mx-auto xsm:mx-0' onSubmit={filterData}>
                <input
                  type='text'
                  name=''
                  id=''
                  value={searchText}
                  onChange={onSearchChange}
                  placeholder='Search Trailers'
                  className='w-100 dark:border-gray-300 dark:bg-transparent focus:bg-transparent dark:text-white'
                />
                <button type='submit' id='top_search_header'>
                  <i className='far fa-search dark:text-white'></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        {NoResult ? <div className="container"><h4>No Trailers found.</h4></div> : <VideoList data={MoviesData} />}



        {!HideLoader && (
          <div className='pvr' style={{ minHeight: 200 }}>
            <Loader />
          </div>
        )}
        {LoadMoreRequired && (
          <div className='viewbtn opacity-0'>
            <p id='trailers-loadmore' className='btn'>
              View More
            </p>
          </div>
        )}
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
      </section>
    </>
  );
};

export default TrailersClips;
