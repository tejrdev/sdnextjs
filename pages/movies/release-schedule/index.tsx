import React, { useEffect, useRef, useState } from 'react';
import Tabletoggle from '@/components/All/Tabletoggle';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HeadComponent from '@/components/HeadComponent';
import Loader from '@/components/Loader';
import Postername from '@/components/All/Postername';

type ViewType = 'table' | 'list' | 'poster';

import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
   // Get query parameter from URL
   const requestFrom = context.query.requestFrom as string | undefined;
   const year = context.query.year as string | '';
   const month = context.query.month as string | '';

   let query = process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/releases-by-week_v2.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&wide_releases_only=' + (requestFrom === 'upcoming-movies' ? 'wide' : '');
   if (year) query += '&a_year=' + year;
   if (month) query += '&a_month=' + month;
   const ReleaseCalendar = await fetch(query);
   const ReleaseCalendarData = await ReleaseCalendar.json();
   if (!ReleaseCalendarData?.year_list?.includes(2026)) ReleaseCalendarData?.year_list?.unshift(2026);

   return {
      props: {
         ReleaseCalendarData,
         requestFrom: requestFrom || null
      },
   };
}

const ReleaseSchedule = ({ ReleaseCalendarData, requestFrom }: { ReleaseCalendarData: any, requestFrom?: string | null }) => {
   const [currentView, setCurrentView] = useState<ViewType>(requestFrom === 'upcoming-movies' ? 'list' : 'table');
   const router = useRouter();
   const { month, year, view, wide } = router.query;
   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   const [releaseCalData, setReleaseCalData] = useState<any>({});
   const [releaseCalDataLoaded, setReleaseCalDataLoaded] = useState(true);
   const [currentMonth, setCurrentMonth] = useState(parseInt(ReleaseCalendarData?.month || 1));
   const [currentyear, setCurrentyear] = useState(parseInt(ReleaseCalendarData?.year || 2024));
   const [wideReleasesOnly, setWideReleasesOnly] = useState(requestFrom === 'upcoming-movies' ? true : false);
   const [isInitialized, setIsInitialized] = useState(false);
   const isInitializingFromUrl = useRef(false);
   const meta_title = 'Release Schedule - Movie Release Schedule for Selected Month';
   const meta_description = 'View the release schedule for the selected month. Includes all movies released in the selected month, with details on the distributor, rating, pattern, opening weekend, and total collection.';
   const canonical_url = process.env.NEXT_PUBLIC_FRONTEND_URL + '/movies/release-schedule/';

   // Initialize from URL params on mount
   useEffect(() => {
      if (!router.isReady || isInitialized) return;

      isInitializingFromUrl.current = true;

      if (month && typeof month === 'string') {
         const parsed = parseInt(month);
         if (!isNaN(parsed) && parsed >= 1 && parsed <= 12) {
            setCurrentMonth(parsed);
         }
      }
      if (year && typeof year === 'string') {
         const parsed = parseInt(year);
         if (!isNaN(parsed)) {
            setCurrentyear(parsed);
         }
      }
      if (view && typeof view === 'string' && ['table', 'list', 'poster'].includes(view)) {
         setCurrentView(view as ViewType);
      }
      if (wide !== undefined) {
         const wideValue = wide === 'true' || wide === '1';
         setWideReleasesOnly(wideValue);
      }

      setIsInitialized(true);
      // Reset flag after a brief delay to allow state updates to complete
      setTimeout(() => {
         isInitializingFromUrl.current = false;
      }, 100);
   }, [router.isReady, month, year, view, wide, isInitialized]);

   // Update URL when state changes (after initialization)
   useEffect(() => {
      if (!router.isReady || !isInitialized || isInitializingFromUrl.current) return;

      const query: any = {};
      const defaultMonth = parseInt(ReleaseCalendarData?.month || 1);
      const defaultYear = parseInt(ReleaseCalendarData?.year || 2024);

      if (currentMonth !== defaultMonth) {
         query.month = currentMonth.toString();
      }
      if (currentyear !== defaultYear) {
         query.year = currentyear.toString();
      }
      if (currentView !== 'table') {
         query.view = currentView;
      }
      if (wideReleasesOnly === true) {
         query.wide = wideReleasesOnly.toString();
      }

      router.replace({
         pathname: router.pathname,
         query: Object.keys(query).length > 0 ? query : {},
      }, undefined, { shallow: true });
   }, [currentMonth, currentyear, currentView, wideReleasesOnly, router.isReady, isInitialized, router.pathname]);

   const handleViewChange = (view: ViewType) => {
      setCurrentView(view);
   };

   useEffect(() => {
      loadReleaseCalendarData();
   }, [currentyear, currentMonth, wideReleasesOnly]);

   const loadReleaseCalendarData = () => {
      setReleaseCalDataLoaded(false);
      axios
         .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/releases-by-week_v2.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&a_year=' + currentyear + '&a_month=' + currentMonth + (wideReleasesOnly === true ? '&wide_releases_only=wide' : ''))
         .then((res) => {
            setReleaseCalData(res.data);
            setReleaseCalDataLoaded(true);
         })
         .catch((err) => console.log(err));
   };

   return (
      <div>
         <HeadComponent meta_title={meta_title} meta_description={meta_description} canonical_url={canonical_url} />
         {/* <CategoryNavigation /> */}
         <section className="top_txt pt-4 md:pt-5">
            <div className="container">
               <div className="text-center">
                  <h1>Release Schedule</h1>
                  <p>Movie Release Schedule for Selected Month</p>
               </div>
            </div>
         </section>
         <section className="movie_reshdule">
            <div className="container">
               <div className="top_box my-3 text-left xsm:text-right flex flex-wrap xsm:justify-between justify-center sticky top-0 z-20 bg-white pt-3">
                  <div className="selectopts flex gap-4 items-center w-full xsm:w-auto mb-4 xsm:mb-0 justify-center xsm:justify-start">
                     <select className='form-select px-3 py-1 cursor-pointer border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white text-gray-700'
                        value={currentyear}
                        onChange={(e) => {
                           setCurrentyear(parseInt(e.target.value));
                        }}>
                        {ReleaseCalendarData.year_list.map((item: any, index: number) => (
                           <option value={item} key={index}>{item}</option>
                        ))}
                     </select>
                     <select className='form-select px-3 py-1 cursor-pointer border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white text-gray-700'
                        value={currentMonth}
                        onChange={(e) => {
                           setCurrentMonth(parseInt(e.target.value));
                        }}>
                        {months.map((item: any, index: number) => (
                           <option value={index + 1} key={index}>{item}</option>
                        ))}
                     </select>
                  </div>
                  <div className='flex flex-wrap gap-2 items-center justify-center xsm:justify-start'>
                     <div className={`text-orange-500 font-bold mr-2 hidden ${currentView === 'table' ? 'lg:block' : ''}`}>  * Forecast</div>
                     <ul className='widetoggle flex flex-wrap list-none ml-0 my-0.5 xsm:my-2 border border-gray-500 rounded-md overflow-hidden'>
                        <li className={'tab_items cursor-pointer min-w-28 text-center p-2 rounded-md' + (wideReleasesOnly ? '' : 'active bg-gold')} onClick={() => setWideReleasesOnly(false)}>All</li>
                        <li className={'tab_items cursor-pointer min-w-28 text-center p-2 border-l border-gray-500' + (wideReleasesOnly ? 'active bg-gold' : '')} onClick={() => setWideReleasesOnly(true)}>Wide</li>
                     </ul>
                     <Tabletoggle toggclick={handleViewChange} tabview={currentView} />
                  </div>
               </div>

               {!releaseCalDataLoaded && (
                  <div className='pvr container' style={{ marginBottom: 40 }}>
                     <div className='lodarhight'>
                        <Loader />
                     </div>
                  </div>
               )}

               {releaseCalDataLoaded && currentView === 'table' && (
                  <div className="mrtable mb-10" key="table-view">
                     <div className='datatable_wrap'>
                        <table className='responsive dataTable mrtablebox' id='sr-datatable'>
                           <thead>
                              <tr>
                                 {/* <th data-title='Release Date'>Release Date</th> */}
                                 <th data-title='Title'>Title</th>
                                 <th data-title='Distributor'>Distributor</th>
                                 <th data-title='Rating'>Rating</th>
                                 <th data-title='Pattern'>Pattern</th>
                                 <th data-title='opening weekend'>Opening Weekend</th>
                                 <th data-title='total '>Total </th>
                              </tr>
                           </thead>
                           <tbody>
                              {releaseCalData.film_data?.map((dateGroup: any, dateIndex: number) => {
                                 const isFriday = dateGroup.title.toLowerCase().includes('friday');

                                 return (
                                    <React.Fragment key={`date-group-${dateIndex}`}>
                                       <tr key={`date-header-${dateIndex}`} className={'datetr rounded-xl mt-2 sm:mt-0 ' + (isFriday ? 'bg-gold-yellow' : 'bg-gray-100')}>
                                          <td colSpan={6} className="date-header rounded-xl"><strong>{dateGroup.title}</strong></td>
                                       </tr>
                                       {dateGroup.movies.map((movie: any, movieIndex: number) => {
                                          const rowIndex = dateIndex * dateGroup.movies.length + movieIndex;
                                          return (
                                             <tr className={`box-office-res-row ${(rowIndex % 2) === 0 ? 'even' : 'odd'}`} role='row' key={`table-${dateIndex}-${movieIndex}`}>
                                                <td data-title='Title' className='text-left'>
                                                   <Link href={movie.link}>
                                                      <strong>{movie.title}</strong>
                                                   </Link>
                                                </td>
                                                <td data-title='Distributor' className='text-left'>
                                                   <Link href={movie.distributor_link}>
                                                      <strong>{movie.distributor_name}</strong>
                                                   </Link>
                                                </td>
                                                <td data-title='Rating'>{movie.rating}</td>
                                                <td data-title='Pattern'>{movie.dist_pattern}</td>
                                                <td data-title='Opening Weekend'>{movie?.box_office_projection?.openening_weekend_collection ?
                                                   <span className='text-orange-500 italic font-bold' title='Forecast'>{'$' + movie?.box_office_projection?.openening_weekend_collection?.toLocaleString()}</span> : movie.opening_box_office ? <span className=''>{'$' + movie.opening_box_office?.toLocaleString()}</span> : '-'}</td>
                                                <td data-title='Total'>{movie?.box_office_projection?.total_weekend_collection ?
                                                   <span className='text-orange-500 italic font-bold' title='Forecast'>{'$' + movie?.box_office_projection?.total_weekend_collection?.toLocaleString()}</span> : movie.total_box_office ? <span className=''>{'$' + movie.total_box_office?.toLocaleString()}</span> : '-'}</td>
                                             </tr>
                                          );
                                       })}
                                    </React.Fragment>
                                 );
                              })}
                           </tbody>
                        </table>
                     </div>
                  </div>
               )}

               {releaseCalDataLoaded && (currentView === 'list' || currentView === 'poster') && (
                  <div className="mrtable mb-10 space-y-6" key="poster-view">
                     {releaseCalData.film_data?.map((item: any, itemIndex: number) => {
                        const isPosterView = currentView === 'poster' ? true : false;
                        const isFridayposter = item.title.toLowerCase().includes('friday');
                        return (
                           <div className={"datewisemovies "} key={`poster-${itemIndex}`}>
                              <h3 className={"my-4 text-center py-2 " + (isFridayposter ? 'bg-gold-yellow' : 'bg-gray-100')}>{item.title}</h3>
                              <div className={` ${isPosterView ? 'weeklistbox grid' : ''}`}>
                                 {item.movies.map((movie: any, index: number) => {
                                    return (
                                       <div className="poster-box flex flex-wrap w-full flex-grow" key={`poster-${itemIndex}-${index}`}>
                                          <Link href={movie.link} className='w-[150px] block pb-2 md:pb-4 '>
                                             {isPosterView ? <Postername poster={movie} hideopen /> : <figure>
                                                <img src={movie.img} alt="Poster" className='rounded-lg' />
                                             </figure>}

                                          </Link>
                                          <div className={`poster-info max-w-full sm:max-w-[calc(100%-150px)] pb-5 sm:pl-5 w-full  ${isPosterView ? 'hide' : ''}`}>
                                             <div className="top_txtbox flex flex-wrap items-center">
                                                <h4><Link href={movie.link} className='text-black'>{movie.title}</Link></h4>
                                                <label htmlFor="" className="uppercase ml-auto bg-gray-200 px-2 py-1 ">{movie.dist_pattern}</label>
                                             </div>
                                             <a href={movie.distributor_link}><p className="bluetxt mb-2">{movie.distributor_name}</p></a>
                                             <ul className="ml-0 mt-3 mb-0 list-none">
                                                {movie.primary_genre?.map((genre: any, genreIndex: number) => {
                                                   return (
                                                      <li className="text-sm inline-block align-top mr-2 mb-2" key={`poster-genre-${itemIndex}-${index}-${genreIndex}`}>
                                                         <Link href={genre.value} className={`cursor-pointer hover:no-underline px-3 rounded-3xl text-black capitalize border border-gray-500 pb-[2px] hover:bg-gray-100 hover:text-black ${genre.name === movie?.primary_genre_name ? 'font-bold border-2 ' : ''}`}>
                                                            {genre.name}
                                                         </Link>
                                                      </li>
                                                   )
                                                })}
                                             </ul>
                                             <ul className="flex ml-0 my-2 list-none"><li>{movie.rating && <span className='border border-gray-400 rounded-md px-2 py-[2px] mr-2'>{movie.rating}</span>}</li><li>{movie.runtime}</li></ul>
                                             <p className='text-justify'>{movie.synopsis}</p>
                                          </div>
                                       </div>
                                    );
                                 })}
                              </div>
                           </div>
                        )
                     })}
                  </div>
               )}
            </div>
         </section>
      </div>
   )
}

export default ReleaseSchedule;