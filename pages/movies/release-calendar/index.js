import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import CategoryNavigation from '../../../components/FilmData/DetailPages/CategoryNavigation';
import TopmoviesSlider from '@/components/FilmData/DetailPages/ReleaseByWeek/TopmoviesSlider';
import Postername from '@/components/All/Postername';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';

import Loader from '../../../components/Loader';

export async function getStaticProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'movies/release-calendar');
  const data = await res.json();

  const ReleaseCalendar = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/releases-by-week_v2.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  const ReleaseCalendarData = await ReleaseCalendar.json();

  return {
    props: { data, ReleaseCalendarData }, //BOFilterData,
    revalidate: 10, // In seconds
  };
}

const ReleasesByWeekv2 = ({ data, ReleaseCalendarData }) => {
  const router = useRouter();
  const { yyyy, mm } = router.query;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullmonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [ReleaseCalData, setReleaseCalData] = useState(ReleaseCalendarData);
  const [ReleaseCalDataLoaded, setReleaseCalDataLoaded] = useState(true);
  const [scrollon, setScrollon] = useState(false);
  const [toggleon, setToggleon] = useState(false);
  const yeardata = ReleaseCalData.year_list;

  const [currentMonth, setCurrentMonth] = useState(parseInt(ReleaseCalData.month));
  const [currentyear, setCurrentyear] = useState(parseInt(ReleaseCalData.year));

  const PrevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const PrevYear = currentMonth === 1 ? currentyear - 1 : currentyear;
  const NexttMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const NextYear = currentMonth === 12 ? currentyear + 1 : currentyear;

  const WideReleases = {};
  WideReleases.title = 'Trending Movies';
  WideReleases.movies = [];
  ReleaseCalData.film_data.forEach((item) => {
    item.movies.forEach((movie) => {
      if (movie.dist_pattern === 'Wide') WideReleases.movies.push(movie);
    });
  });

  const togglehandle = (e) => setToggleon(!toggleon);

  useEffect(() => {
    if (yyyy !== '' && yyyy !== undefined && mm !== '' && mm !== undefined) {
      setCurrentyear(parseInt(yyyy));
      setCurrentMonth(parseInt(mm.replace('0', '')));
      router.push(router.pathname);
    }
  }, [router.query]);

  useEffect(() => {
    const handleScroll = () => {
      const rect = document.querySelector('.box_title').getBoundingClientRect();
      const isSectionScrolled = rect.top <= 0;
      setScrollon(isSectionScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if ((currentyear !== ReleaseCalData.year || currentMonth !== ReleaseCalData.month) && ReleaseCalDataLoaded) loadReleaseCalendarData();
  }, [currentyear, currentMonth]);

  const loadReleaseCalendarData = () => {
    setReleaseCalDataLoaded(false);
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/releases-by-week_v2.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&a_year=' + currentyear + '&a_month=' + currentMonth)
      .then((res) => {
        setReleaseCalData(res.data);
        setReleaseCalDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  const LoadPrevMonthData = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentyear(currentyear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const LoadNextMonthData = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentyear(currentyear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

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
      <AdminEditLink data={ReleaseCalendarData} />
      <CategoryNavigation />
      <div className={scrollon ? 'box_title secspace sticky top-0 bg-white z-10 px-3 md:px-4' : 'box_title secspace'}>
        <div className='container'>
          <div className='boxtitlein'>
            <h1 className='block lg:inline-block align-top pvr pr-0 md:pr-11 pt-3 pb-4 transition-all duration-300 ease-out text-center'>Upcoming Movies</h1>
            <div className='boxresultchoice inline-block align-top w-full lg:w-auto'>
              {/* <h3 className='text-center lg:text-left block'>Select year and Month to see results</h3> */}
              <div className='bxr_selectinfo xsm:flex lg:block flex-wrap justify-center'>
                <div className='bxrselectbox mb-3 xsm:mr-4 yearselecing xsm:inline-block align-top'>
                  <label htmlFor=''>Year</label>
                  <select
                    name=''
                    id=''
                    className='globalselect'
                    value={currentyear}
                    onChange={(e) => {
                      setCurrentyear(e.target.value);
                    }}>
                    {yeardata.map((item, i) => (
                      <option value={item} key={i}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='bxrselectbox mb-3 xsm:mr-4 yearselecing xsm:inline-block align-top xsm:max-w-36'>
                  <label htmlFor=''>Month</label>
                  <select
                    name=''
                    id=''
                    className='globalselect'
                    value={currentMonth}
                    onChange={(e) => {
                      setCurrentMonth(parseInt(e.target.value));
                    }}>
                    <option value={0}>{'Select Month'}</option>
                    {months.map((item, i) => (
                      <option value={i + 1} key={i}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ReleaseCalDataLoaded ? (
        <>
          {WideReleases.movies.length > 0 && (
            <section className='studio_topmovie pt-3 secspace'>
              <TopmoviesSlider title={WideReleases} />
            </section>
          )}

          <section className='releaseviews'>
            <div className='container'>
              <div className='top_txt df fww just-between'>
                <ul className={'daystype df fww ' + (toggleon ? 'off' : '')}>
                  <li className='tab_items ' data-title='postview'>
                    List View
                  </li>
                  <li className={'togglebtn ' + (toggleon ? 'off' : '')} onClick={togglehandle}>
                    <div className='togglehandel'></div>
                  </li>
                  <li className='tab_items active' data-title='listview'>
                    Poster View
                  </li>
                </ul>
                <h4>
                  {fullmonths[parseInt(ReleaseCalData.month) - 1]} {ReleaseCalData.year}
                </h4>
              </div>
              <div className='weeklistinfo'>
                {ReleaseCalData.film_data.map((item, index) => (
                  <div className='weekgridlists' key={index}>
                    <h3 className='weeklist_Title'>
                      {item.title} <i className='fal fa-angle-right'></i>
                    </h3>
                    <div className={`weeklistbox ${toggleon ? 'grid' : 'inlinerow'}`}>
                      {item.movies.map((movie, index) => (
                        <div className={`weeklistitem ${toggleon ? '' : 'df fww'}`} key={index}>
                          <Postername key={index} poster={movie} hideopen />
                          <div className={`weekposterinfo ${toggleon ? 'hide' : ''}`}>
                            {/* <a href='#' className='greytxt'> */}
                            <div className='top_txtbox df fww'>
                              <h6>
                                <Link href={movie.link}>{movie.title}</Link>
                                {/* <span>
                                    <span>{movie.release_date}</span>
                                  </span> */}
                              </h6>
                              {movie.dist_pattern && (
                                <label htmlFor='' className='uppercase'>
                                  {movie.dist_pattern}
                                </label>
                              )}
                            </div>
                            <Link href={movie.distributor_link}>
                              <p className='bluetxt'>{movie.distributor_name}</p>
                            </Link>
                            {movie?.primary_genre && (
                              <ul className='ml-0 mt-3 mb-0 list-none'>
                                {movie?.primary_genre?.map((item, i) => (
                                  <li key={i} className='text-sm inline-block align-top mr-2 mb-2'>
                                    <Link href={item.value} className='cursor-pointer hover:no-underline px-3 rounded-3xl text-black capitalize border border-gray-500 pb-[2px] hover:bg-gray-100 hover:text-black'>
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                            <ul className='ratinginfo_tags'>
                              {movie.rating && (
                                <li>
                                  <span>{movie.rating}</span>
                                </li>
                              )}
                              {movie.runtime && <li>{movie.runtime}</li>}
                            </ul>
                            <p>{movie.synopsis}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className='releasemonthnav df fww just-between'>
                  <button className='btn uppercase' onClick={LoadPrevMonthData}>
                    <i className='far fa-long-arrow-alt-left'></i> {months[PrevMonth - 1]} {PrevYear}
                  </button>
                  <button className='btn uppercase' onClick={LoadNextMonthData}>
                    {months[NexttMonth - 1]} {NextYear} <i className='far fa-long-arrow-alt-right'></i>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default ReleasesByWeekv2;
