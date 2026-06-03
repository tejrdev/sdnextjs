import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import noticeads from '../public/images/noticeadsimg.png';

import Headlines from '../components/Homepage/Headlines';
import FilmData from '../components/Homepage/FilmData';
import HomeSlider from '../components/Homepage/HomeSlider';
import InTheatres from '../components/Homepage/InTheatres';
//import Podcast from './Podcast';
// import Data from '../../data.json';
import HomePageAds from '../components/Homepage/HomePageAds';
import AdPlaceholder from '../components/Homepage/AdPlaceholder';
import Addhomeimg from '../components/Homepage/Addhomeimg';
import Polls from '../components/Homepage/Polls';
import ZipperMedia from '../components/Homepage/ZipperMedia';
import Subscriber from '../components/Homepage/Subscriber';
import Videos from '../components/Homepage/Videos';
import Directory from '../components/Homepage/Directory';
import NowInTheatres from '../components/Homepage/NowInTheatres';
import News from '../components/Homepage/News';
import Insideinfo from '@/components/Products/InsideInfo';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import HeadComponent from '../components/HeadComponent';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';

import { motion } from 'motion/react';
import { FadeinUp } from '../components/Anim/FadeinUp';

import homedirbnrmob from '@/public/images/Advertise_with_us_banner_adapt.jpg';

export async function getStaticProps() {
  const defaultData = {
    homeAPIData: {
      data: [],
    },
  };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  const raw = `{"apikey" : "${process.env.NEXT_PUBLIC_PRIVATEAPI_TOKEN}"}`;

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  const fetchConfigs = [
    {
      url: `${process.env.NEXT_PUBLIC_SEO_LINK}`,
      key: 'SEOdata',
      defaultData: {},
    },
    {
      url: `${process.env.NEXT_PUBLIC_SD_API}/SD-home-page/home-page.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
      key: 'homeAPIData',
      defaultData: defaultData.homeAPIData,
      requestOptions: requestOptions,
    },
  ];

  return await getStaticPropsWithErrorHandling(fetchConfigs);
}

export default function HomePage({ SEOdata, homeAPIData, error }) {
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  const boxOfficeData = homeAPIData;
  const GenrelistData = homeAPIData?.genre_list;
  const [zipperDataLoaded, setZipperDataLoaded] = useState(false);
  const [zipperData, setzipperData] = useState([]);
  const [homeVideoDataLoaded, setHomeVideoDataLoaded] = useState(false);
  const [homeVideoData, setHomeVideoData] = useState([]);
  const [homeDirectoryDataLoaded, setHomeDirectoryDataLoaded] = useState(false);
  const [homeDirectoryData, setHomeDirectoryData] = useState([]);
  const [nowInTheatresDataLoaded, setNowInTheatresDataLoaded] = useState(false);
  const [nowInTheatresData, setNowInTheatresData] = useState([]);
  const [newsDataLoaded, setNewsDataLoaded] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [pollsDataLoaded, setPollsDataLoaded] = useState(false);
  const [pollsData, setPollsData] = useState([]);

  useEffect(() => {
    loadZipperData();
    loadHomeVideos();
    loadHomeDirectory();
    loadNowInTheatres();
    loadNews();
    loadPolls();
  }, []);

  const loadZipperData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/non_stop_news/index.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setzipperData(res.data.non_stop_news);
        setZipperDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };
  const loadHomeVideos = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/home_video/index.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setHomeVideoData(res.data);
        setHomeVideoDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };
  const loadHomeDirectory = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/home_directory/index.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setHomeDirectoryData(res.data);
        setHomeDirectoryDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };
  const loadNowInTheatres = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/home_now_in_theatres/index.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setNowInTheatresData(res.data);
        setNowInTheatresDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };
  const loadNews = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/home_news/index.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setNewsData(res.data);
        setNewsDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };
  const loadPolls = () => {
    const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
    let string_data = uint32.toString(16);
    let get_user_ips = localStorage.getItem('user_ip') || '';
    if (get_user_ips === '') {
      localStorage.setItem('user_ip', 'User-' + string_data);
      get_user_ips = 'User-' + string_data;
    }

    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/poll_quiz_new/index.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&ip_address=' + get_user_ips + '&timestamp=' + new Date().getTime())
      .then((res) => {
        setPollsData(res.data);
        setPollsDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <HeadComponent data={SEOdata} />
      <div id='page' className='site'>
        <div className='site-inner'>
          <div id='content' className='site-content'>
            <div className='main-wrap'>
              {/* <Insideinfo /> */}
              <AdminEditLink data={homeAPIData} />
              {/* {homepageDataLoaded ? ( */}
              <main className='main-content'>
                {/* Full-width Ad Placement - Just Below Header */}
                <AdPlaceholder
                  variant="fullwidth"
                  id="homepage-header-ad"
                  minHeight="450px"
                  sectionClass="header-ad-section py-4"
                />

                <section className='bannerbox'>
                  <div className='container'>
                    <div className='googlesearch_inputs mb-6'>
                      <div className='max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-2 border-blue-400 dark:border-blue-600 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
                        <a
                          href='https://www.google.com/preferences/source?q=screendollars.com'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center justify-center gap-3 px-3 py-4 text-center group'
                        >
                          <svg
                            className='w-6 h-6 text-darkgold flex-shrink-0 group-hover:scale-110 transition-transform duration-300'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path d='M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z' />
                          </svg>
                          <span className='text-base md:text-lg font-medium text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
                            Click here (and check the box) to prioritize <span className='font-bold decoration-2 underline-offset-2'>Screendollars.com</span> in your Google search results
                          </span>
                          <svg
                            className='w-5 h-5 text-darkgold flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className='usernote pb-8'>
                      <div className='notebox max-w-4xl mx-auto bg-gold-yellow border border-gold rounded-md flex justify-center md:justify-between p-3 items-center flex-col tablet:flex-row text-center md:text-left'>
                        <p className='text-lg mb-2 tablet:mb-0'>Check out newly launched SCREENDOLLARS reports!</p>
                        <div className='ctas'>
                          <Link href={'/exhibitionreport/'} className='btn mx-3 md:ml-3 my-1 active:text-black focus:text-black' target='_blank'>
                            Exhibition Report
                          </Link>
                          <Link href={'/distributionreport/'} className='btn mx-3 md:ml-3 my-1 active:text-black focus:text-black' target='_blank'>
                            Distribution Report
                          </Link>
                        </div>
                      </div>
                    </div>
                    <h1 className='size-0 overflow-hidden m-0'>Screendollars</h1>
                    <div className='bannerboxtop_in df fww'>
                      <div className='bnrbox_left'>
                        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                          <HomeSlider data={homeAPIData.top_slider} />
                        </motion.div>
                        <div className='bof_comingbox df fww just-between'>
                          <motion.div className='bofcomedata' initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2 }}>
                            <div className='boftable'>
                              <input type='hidden' value='2021' id='h_p_select_year' />
                              <input type='hidden' value='21' id='h_p_select_week' />
                              <ul id='home_page_boxoffice_data' className=''>
                                <li className='bofrow df fww just-between'>
                                  <h5>
                                    <Link href='/box-office-results/'>Latest Box Office</Link>
                                    <i className='far fa-angle-right'></i>
                                  </h5>
                                  <p>
                                    <em>{boxOfficeData.boxoffice_title}</em>
                                  </p>
                                </li>
                                <FilmData data={boxOfficeData.boxoffice_data} tag={'latest'} />
                              </ul>
                            </div>
                          </motion.div>

                          <motion.div className='bofcomedata' initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.2 }}>
                            <div className='boftable'>
                              <input type='hidden' value='2021' id='h_p_select_year' />
                              <input type='hidden' value='21' id='h_p_select_week' />
                              <ul id='home_page_boxoffice_data' className=''>
                                <li className='bofrow df fww just-between'>
                                  <h5>
                                    <Link href='/movies/upcoming-movies/'>Upcoming Wide Releases</Link>
                                    <i className='far fa-angle-right'></i>
                                  </h5>
                                </li>
                                <FilmData data={boxOfficeData.boxoffice_upcomming} tag={'upcoming'} />
                              </ul>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                      <div className='bnrbox_right df fww'>
                        <motion.div className='bnrbox_telent' initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                          <motion.div className='top_txt' initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
                            <h5>
                              <Link href='/celebrities/' title='Featured Talent'>
                                Featured Celebrities <i className='far fa-angle-right'></i>
                              </Link>
                            </h5>
                          </motion.div>
                          <div className='feature_telent df fww'>
                            {homeAPIData.featured_talent &&
                              homeAPIData.featured_talent.map((titems, tid) => {
                                return (
                                  <motion.div className='catcrewcol' key={tid} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 + tid * 0.2 }}>
                                    <ul className='castcrew_people'>
                                      <li>
                                        <Link href={titems.link.replace(process.env.NEXT_PUBLIC_BACKEND_URL, '')}>
                                          <div className='cast_pic bgimage' style={{ backgroundImage: 'url(' + titems.img.replace(/ /g, '%20') + ')' }}></div>
                                          <div className='cast_info'>
                                            <h5>{titems.name}</h5>
                                          </div>
                                        </Link>
                                      </li>
                                    </ul>
                                  </motion.div>
                                );
                              })}
                          </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.6 }} className='bnrbox_rightinner'>
                          <div className='homtheatr_box'>
                            <div className='top_txt'>
                              <h5>
                                <Link href='/movies/releases-by-week/' title='In Theatres'>
                                  Now in Theatres <i className='far fa-angle-right'></i>
                                </Link>
                              </h5>
                            </div>
                            <div className='homtheaterbox_info df fww'>
                              <InTheatres data={homeAPIData.in_theatres} />
                            </div>
                          </div>
                          {/* <div className='homtheatr_box'>
                            <div className='top_txt'>
                              <h5>
                                <a href='https://themoviehub.com/' title='Watch at Home' target='_blank' rel='noreferrer'>
                                  Watch at Home
                                  <i className='far fa-angle-right'></i>
                                </a>
                              </h5>
                            </div>
                            <div className='homtheaterbox_info df fww'>
                              <InTheatres data={homeAPIData.streaming} />
                            </div>
                          </div> */}
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.8 }} className='bnrbox_rightinner'>
                          <div className='featurereview'>
                            <div className='top_txt'>
                              <h5>
                                <a href='/movies/reviews/' title='Critics’ Reviews'>
                                  Movie Reviews <i className='far fa-angle-right'></i>{' '}
                                </a>
                              </h5>
                            </div>
                            {homeAPIData.featured_reviews &&
                              homeAPIData.featured_reviews.map((titems, tid) => {
                                if (tid === 0) {
                                  return (
                                    <div className='feater_reviewbox' data={tid} key={tid}>
                                      <a href={titems.link} target='_blank' title={titems.name}>
                                        <figure className='pvr'>
                                          <img src={titems.img} alt={titems.name} className='objctimg_box' />
                                        </figure>
                                        <h5>{titems.name}</h5>
                                        <div className='h6' dangerouslySetInnerHTML={{ __html: titems.content }}></div>
                                      </a>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div className='feater_reviewbox' data={tid} key={tid}>
                                      <a href={titems.link} target='_blank' title={titems.name}>
                                        <h5>{titems.name}</h5>
                                      </a>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </section>
                <motion.section className='zipper_poll ' initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.4 }}>
                  <div className='container'>
                    <div className='zipperpollin df fww '>
                      <div className='prodcastads df fww just-between'>
                        {/* <HomePageAds cls='add_300' format='rectangle' /> */}
                        <div className='add_300'>
                          <Link href='/advertise-with-us/#adscontact' className='block'>
                            <Image src={homedirbnrmob?.src} alt='multimedia' width={280} height={310} className='h-auto rounded-md' />
                          </Link>
                        </div>

                        <div className='prodcastinfo '>
                          <div className='prodcastbox_in df fww'>
                            <div className='optbxtitle df fww just-between'>
                              <h5>
                                {' '}
                                <a href={homeAPIData.pod_title}>
                                  {' '}
                                  Podcast <i className='far fa-angle-right'></i>{' '}
                                </a>{' '}
                              </h5>
                            </div>
                            <div className='ticketmedia text-center'>
                              <a href={homeAPIData.youtube_video_url} target='_blank' rel='noopener noreferrer'>
                                <figure className='w100 pvr'>
                                  <Image className='ticketride' src={homeAPIData.podcast_image} alt=' ' width={260} height={260} />
                                  <figcaption>play Podcast</figcaption>
                                </figure>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='zipperquize df fww'>
                        {/* {pollsDataLoaded && pollsData.poll_quiz_display === 'd_poll' ? (
                          <div className='pollads'>
                            <Polls data={pollsData.polls} tag='poll' ip={IPAddress} />
                          </div>
                        ) : (
                          ''
                        )} */}

                        {pollsDataLoaded && (
                          <div className='quizebox'>
                            <div className='qpollitem ansoptionbox df fww xl:min-h-[550px] xl:-mt-[228px]'>
                              <Polls data={pollsData} />
                            </div>
                          </div>
                        )}

                        {zipperDataLoaded && <ZipperMedia data={zipperData} />}
                      </div>
                    </div>
                  </div>
                </motion.section>
                <motion.section variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='home_subscribe'>
                  <Subscriber />
                </motion.section>

                {/* Mid-page Ad Placement - Leaderboard */}
                <AdPlaceholder
                  variant="leaderboard"
                  id="homepage-mid-ad"
                  sectionClass="mid-page-ad-section py-6"
                />

                <section className='homdirectory'>{homeDirectoryDataLoaded && <Directory data={homeDirectoryData} />}</section>
                <section className='moviedb'>
                  <div className='container'>
                    <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='seclinespace'>
                      <div className='top_txt df fww just-between'>
                        <div className='secnav df fww'>
                          <h2>
                            <Link href='/movies/' title='Film Data'> Movies </Link>
                          </h2>
                          {/* <ul className='distcat_name df fww'>
                            <li>
                              <Link href='/movies/box-office-results/' title='Box Office'>
                                Box Office
                              </Link>
                            </li>
                            <li>
                              <Link href='/movies/releases-by-week/' title='Release Schedules'>
                                Release Schedules
                              </Link>
                            </li>
                            <li>
                              <Link href='/movies/release-changes/' title='Release Changes'>
                                Release Changes
                              </Link>
                            </li>
                          </ul> */}
                        </div>
                      </div>
                    </motion.div>
                    <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='moviedbbox df fww just-between'>
                      {boxOfficeData.boxoffice_data && (
                        <div className='moviedbdata'>
                          <div className='moviedbdata_title df fww just-between'>
                            <h5 className='m-0'>
                              <a href='/box-office-results/'>Box Office</a>
                              <i className='far fa-angle-right'></i>
                            </h5>
                            {boxOfficeData.boxoffice_title && <p className='m-0'>{boxOfficeData.boxoffice_title}</p>}
                          </div>
                          <ul className='grid'>
                            {boxOfficeData.boxoffice_data.slice(0, 4).map((iteminfo, index) => (
                              <li className='bofrow' key={index}>
                                <a href={iteminfo.permalink}>
                                  <figure className='pvr'>
                                    <Image src={iteminfo.poster_thumbnail} width='190' height='275' priority={true} alt='' className='objctimg_box' />
                                  </figure>
                                  <p className='m-0'>
                                    {iteminfo.title}
                                    {iteminfo.weekend_gross_home && <span>{'$' + iteminfo.weekend_gross_home}</span>}
                                  </p>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {boxOfficeData.boxoffice_upcomming && (
                        <div className='moviedbdata'>
                          <div className='moviedbdata_title df fww just-between'>
                            <h5 className='m-0'>
                              <a href='/movies/upcoming-movies/'>Coming Soon</a>
                              <i className='far fa-angle-right'></i>
                            </h5>
                          </div>
                          <ul className='grid'>
                            {boxOfficeData.boxoffice_upcomming.slice(0, 4).map((iteminfo, index) => (
                              <li className='bofrow' key={index}>
                                <a href={iteminfo.link}>
                                  <figure className='pvr'>
                                    <Image src={iteminfo.poster_thumbnail} width='190' height='275' priority={true} alt='' className='objctimg_box' />
                                  </figure>
                                  <p className='m-0'>{iteminfo.title}</p>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>

                    <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='homfilmdata_btm df fww	'>
                      <div className='homegenre homfilm_media hmgrybg'>
                        <div className='moviedbdata_title df fww just-between'>
                          <h5 className='m-0'>
                            <Link href={homeAPIData?.page_link} className=''>
                              Browse Movies by Genre
                            </Link>
                            <i className='far fa-angle-right'></i>
                          </h5>
                          {
                            <p className='m-0 uppercase'>
                              <Link href={homeAPIData?.page_link} className='blacktxt'>
                                <u>View More</u>
                              </Link>
                            </p>
                          }
                        </div>
                        <div className='homegenrebox genrelistbox grid gap16 auto-fill-[180px] lg:auto-fill-[230px]'>
                          {GenrelistData?.map((item, index) => (
                            <div className='homegenre_item genrelistitem' key={index}>
                              <Link href={homeAPIData?.page_link + item.select_genre.toLowerCase()}>
                                <figure className='pvr'>
                                  <Image src={item.genre_image} alt='' className='objctimg_box' width={175} height={110} />
                                  <figcaption className='genmiddlename'>{item.select_genre}</figcaption>
                                </figure>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* <div className='homfilm_scupdate df fww'>
                        <div className='homfilm_scupdate_col'>
                          <div className='headlinesbox'>
                            <div className='top_txt'>
                              <h5>
                                Quick Links <i className='far fa-angle-right'></i>
                              </h5>
                            </div>
                            <Headlines id='quick_links' data={boxOfficeData.schedules} tag='quick_links' />

                             <HomePageAds cls='add_300' format='rectangle' /> 
                          </div>
                        </div>
                      </div> */}
                    </motion.div>
                  </div>
                </section>
                {/* <section className='homvideos'>{homeVideoDataLoaded && <Videos data={homeVideoData} />}</section> */}

                <section className='nowshow'>
                  <div className='container'>
                    <div className='seclinespace'>
                      <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='top_txt df fww just-between'>
                        <div className='secnav df fww'>
                          <h2>
                            <Link href='/movies/releases-by-week/' title='In Theatres'> Now in Theatres </Link>
                          </h2>
                        </div>
                      </motion.div>
                      {nowInTheatresDataLoaded && (
                        <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }}>
                          <NowInTheatres data={nowInTheatresData.in_theatres} />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </section>

                {/* <section className='nowshow'>
                  <div className='container'>
                    <div className='seclinespace'>
                      <div className='top_txt df fww just-between'>
                        <div className='secnav df fww'>
                          <h2>
                            <a href='https://themoviehub.com/' title='Watch at Home' target='_blank' rel='noreferrer'>
                              Watch at Home
                              <i className='far fa-angle-right'></i>
                            </a>
                          </h2>
                        </div>
                      </div>
                      {nowInTheatresDataLoaded && <NowInTheatres data={nowInTheatresData.streaming} />}
                    </div>
                  </div>
                </section> */}

                {/* Bottom Ad Placement - Before News */}
                <AdPlaceholder
                  variant="fullwidth"
                  id="homepage-bottom-ad"
                  sectionClass="bottom-ad-section py-6"
                />

                <section className='homnews'>{newsDataLoaded && <News data={newsData} />}</section>
              </main>
              {/* ) : (
                <Loader />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
