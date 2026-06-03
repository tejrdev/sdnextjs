import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import bxbanner from '@/public/images/box_office_bg.jpg';
import Greytable, { GreytableRow } from '@/components/Boxoffice/Greytable';
import BoxofficeTrensChart from '@/components/Boxoffice/BoxofficeTrensChart';
import HeadComponent from '@/components/HeadComponent';
import Link from 'next/link';
import { convertToInternationalCurrencySystem } from '@/components/Homepage/FilmData';
import AdPlaceholder from '@/components/Homepage/AdPlaceholder';
import axios from 'axios';

export async function getStaticProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + '/box-office-results/');
  const SEOdata = await res.json();


  const BoxOffice = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-boxoffice/box-office-lending-page.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  const BoxOfficeData = await BoxOffice.json();

  return {
    props: { SEOdata, BoxOfficeData },
    revalidate: 10,
  };
}

export const infobox = (text: string) => {
  return (
    <span className="group relative inline-flex items-center justify-center bg-white text-black rounded-full size-6 cursor-pointer ml-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>
      <div className="absolute top-6 xl:-top-[80%] xl:left-10 right-0 sm:right-auto mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="relative bg-gray-200 text-gray-800 rounded-lg px-4 py-2 shadow-lg whitespace-nowrap text-center">
          <div className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-gray-200 border-b-[8px] border-b-transparent hidden xl:block"></div>
          <div className="text-sm font-medium">{text}</div>
        </div>
      </div>
    </span>
  )
}

const Boxoffice = ({ SEOdata, BoxOfficeData }: { SEOdata: any, BoxOfficeData: any }) => {
  const currentQuarter = parseInt(BoxOfficeData.qty.replace('q', ''));
  const currentWeek = parseInt(BoxOfficeData.selected_week);
  const currentWeekend = parseInt(BoxOfficeData.selected_weekend);
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);
  // const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [selectedFilter, setSelectedFilter] = useState('Last Weekend');
  const currentYear = new Date().getFullYear();
  const noOfWeeksInCurrentQuarter = currentWeek % 13 ? currentWeek % 13 : (currentQuarter * 13);
  const startWeekOfCurrentQuarter = ((currentQuarter - 1) * 13) + 1;
  const meta_title = 'Box Office Data & Movie Earnings';
  const meta_description = 'Explore domestic box office performance, including weekend results, yearly totals, and highest-grossing movies across all theatrical releases.';
  const canonicalUrl = process.env.NEXT_PUBLIC_FRONTEND_URL + '/box-office/';

  // All years from 2017 to current year (descending order for display)
  const allYears = useMemo(() =>
    Array.from({ length: currentYear - 2017 + 1 }, (_, index) => currentYear - index),
    [currentYear]
  );

  // Get initial years from chart data (last 3 years)
  const initialYears: number[] = useMemo(() => {
    if (!BoxOfficeData?.chartSeries) return [];
    return BoxOfficeData.chartSeries.map((series: any) => Number(series.name));
  }, [BoxOfficeData?.chartSeries]);

  // Store all chart series data (starts with initial data, grows as more years are fetched)
  const [chartSeriesData, setChartSeriesData] = useState<any[]>(BoxOfficeData?.chartSeries || []);

  // Track which years are currently loading
  const [loadingYears, setLoadingYears] = useState<number[]>([]);

  // Track which years have been fetched (to avoid duplicate API calls)
  const [fetchedYears, setFetchedYears] = useState<Set<number>>(new Set(initialYears));

  // Multi-select years state (default to initial available years)
  const [selectedYears, setSelectedYears] = useState<number[]>(initialYears);

  // Fetch chart data for a specific year
  const fetchYearData = useCallback(async (year: number) => {
    if (fetchedYears.has(year) || loadingYears.includes(year)) return;

    setLoadingYears(prev => [...prev, year]);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SD_API}/movie-boxoffice/box-office-lending-page.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}&a_years=${year}`
      );

      if (response.data?.chartSeries) {
        // Find the data for the requested year
        const yearData = response.data.chartSeries.find((s: any) => Number(s.name) === year);
        if (yearData) {
          setChartSeriesData(prev => {
            // Check if year already exists
            if (prev.some(s => Number(s.name) === year)) return prev;
            // Add and sort by year
            return [...prev, yearData].sort((a, b) => Number(a.name) - Number(b.name));
          });
          setFetchedYears(prev => new Set([...Array.from(prev), year]));
        }
      }
    } catch (error) {
      console.error(`Failed to fetch data for year ${year}:`, error);
    } finally {
      setLoadingYears(prev => prev.filter(y => y !== year));
    }
  }, [fetchedYears, loadingYears]);

  // Toggle year selection
  const toggleYear = useCallback(async (year: number) => {
    // If year is being selected and not yet fetched, fetch it first
    if (!selectedYears.includes(year) && !fetchedYears.has(year)) {
      await fetchYearData(year);
    }

    setSelectedYears(prev => {
      if (prev.includes(year)) {
        // Don't allow deselecting if it's the last selected year
        if (prev.length === 1) return prev;
        return prev.filter(y => y !== year);
      } else {
        return [...prev, year].sort((a, b) => a - b);
      }
    });
  }, [selectedYears, fetchedYears, fetchYearData]);


  const bxbnrboxlist = [
    {
      title: 'Last Weekend',
      date: 'Week ' + currentWeekend + ' (' + BoxOfficeData.last_weekend_date + ')',
      amount: '$' + convertToInternationalCurrencySystem(BoxOfficeData.last_weekend),
      link: `/box-office/results/${BoxOfficeData.selected_weekend_year}/W${BoxOfficeData.selected_weekend}?tab=weekend`,
      info: '3-Day totals for ' + BoxOfficeData.last_weekend_date,
      table_dates: 'Week ' + currentWeekend + '<br /> (' + BoxOfficeData.last_weekend_date + ')'
    },
    {
      title: 'Last Week',
      date: 'Week ' + currentWeek + ' (' + BoxOfficeData.last_week_date + ')',
      amount: '$' + convertToInternationalCurrencySystem(BoxOfficeData.last_week),
      link: `/box-office/results/${BoxOfficeData.selected_week_year}/W${BoxOfficeData.selected_week}?tab=weekly`,
      info: '7-Day totals for ' + BoxOfficeData.last_week_date,
      table_dates: 'Week ' + currentWeek + '<br /> (' + BoxOfficeData.last_week_date + ')'
    },
    // Only show This Quarter if data exists
    ...(BoxOfficeData.this_quarter ? [{
      title: 'This Quarter',
      date: (startWeekOfCurrentQuarter === currentWeek ? 'Week ' + startWeekOfCurrentQuarter : 'Weeks ' + startWeekOfCurrentQuarter + '-' + currentWeek) + ' (' + BoxOfficeData.this_quarter_date + ')',
      amount: '$' + convertToInternationalCurrencySystem(BoxOfficeData.this_quarter),
      link: '/box-office/totals/' + BoxOfficeData.selected_week_year + '/' + BoxOfficeData.qty.toUpperCase(),
      info: noOfWeeksInCurrentQuarter + '-Week totals for ' + BoxOfficeData.selected_week_year + (startWeekOfCurrentQuarter === currentWeek ? ' Week ' + startWeekOfCurrentQuarter : ' Weeks ' + startWeekOfCurrentQuarter + ' - ' + currentWeek),
      table_dates: (startWeekOfCurrentQuarter === currentWeek ? 'Week ' + startWeekOfCurrentQuarter : 'Weeks ' + startWeekOfCurrentQuarter + '-' + currentWeek) + '<br /> (' + BoxOfficeData.this_quarter_date + ')'
    }] : []),
    // Only show This Year if data exists
    ...(BoxOfficeData.this_year ? [{
      title: 'This Year',
      date: (currentWeek === 1 ? 'Week ' + currentWeek : 'Weeks 1-' + currentWeek) + ' (' + BoxOfficeData.this_year_date + ')',
      amount: '$' + convertToInternationalCurrencySystem(BoxOfficeData.this_year),
      link: '/box-office/totals/' + BoxOfficeData.selected_week_year,
      info: currentWeek + '-Week totals for ' + BoxOfficeData.selected_week_year + (currentWeek === 1 ? ' Week ' + currentWeek : ' Weeks 1 - ' + currentWeek),
      table_dates: (currentWeek === 1 ? 'Week ' + currentWeek : 'Weeks 1-' + currentWeek) + '<br /> (' + BoxOfficeData.this_year_date + ')'
    }] : [])
  ]

  const tableinfo = useMemo(() => {
    switch (selectedFilter) {
      case 'Last Weekend':
        return BoxOfficeData.last_weekend_all;
      case 'Last Week':
        return BoxOfficeData.last_week_all;
      case 'This Quarter':
        return BoxOfficeData.this_quarter_all;
      case 'This Year':
        return BoxOfficeData.this_year_all;
      default:
        return BoxOfficeData.last_weekend_all;
    }
  }, [selectedFilter]);

  return (
    <>
      {SEOdata && (<HeadComponent data={SEOdata} canonical_url={canonicalUrl} meta_title={meta_title} meta_description={meta_description} />)}
      <div className='bxresults'>
        <section className='bxbanner bg-black relative z-0 pt-10 md:pt-16 lg:pt-32 pb-5 md:pb-8 lg:pb-16'>
          <div className='container'>
            <div className="bxbannermedia absolute top-0 left-0 w-full h-full -z-10">
              <img src={bxbanner.src} alt="Box Office Results" className='w-full h-full object-cover' />
            </div>
            <div className='bxbanner-content text-white'>
              <h1 className='bxbanner-title text-4xl font-bold relative mb-6'>{BoxOfficeData?.title}
                {infobox(BoxOfficeData?.update_time)}
              </h1>
              <div className="bxbnrboxlist flex flex-wrap gap-5">
                {bxbnrboxlist.map((item, index) => (
                  <div className="bxbnrbox-item min-w-[263px] max-w-md inline-block" key={index}>
                    <Link href={item.link}>
                      <div className="bg-black border border-gray-400 rounded-xl px-6 py-2 text-center">
                        <div className="text-orangegold font-bold mb-2 text-2xl">{item.title}
                          {infobox(item.info)}</div>
                        <div className="text-white text-sm mb-3 capitalize">{item.date}</div>
                        <div className="text-white font-bold text-3xl">{item.amount}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bxtrends bg-stone-900 pt-8 md:pt-10 lg:pt-16 pb-4 md:pb-6 lg:pb-10">
          <div className="container">
            <div className="lg:flex lg:justify-center md:gap-7 gap-4">
              <div className="bxtrends_left w-full max-w-[300px]">
                <h2 className="text-white text-3xl font-bold mb-8 text-center">Box Office Comparisons</h2>
                <div className="bg-white rounded-xl mx-auto border-2 border-white max-w-md">
                  <div className="flex justify-around bg-stone-900 rounded-xl p-2">
                    <div className="font-bold text-white">Year</div>
                    <div className="font-bold text-white">Quarter</div>
                    {/* <div className="font-bold text-white">Week</div> */}
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-3 items-center text-center text-sm sm:text-lg">
                    {/* Year Column */}
                    <div className="border-r border-gray-300 pr-4">
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {allYears.map((year) => (
                          <div
                            key={year}
                            onClick={() => !loadingYears.includes(year) && toggleYear(year)}
                            className={`px-3 rounded font-bold cursor-pointer flex items-center gap-2 transition-all duration-200
                              ${loadingYears.includes(year) ? 'opacity-50 cursor-wait' : ''}
                              ${selectedYears.includes(year) ? 'text-black' : 'text-gray-400'}
                            `}
                          >
                            <span className={`w-4 h-4 rounded border-2 flex items-center justify-center text-xs
                              ${selectedYears.includes(year)
                                ? 'bg-orangegold border-orangegold text-black'
                                : 'border-gray-400 bg-white'
                              }`}
                            >
                              {loadingYears.includes(year) ? (
                                <span className="animate-spin text-[8px]">⏳</span>
                              ) : selectedYears.includes(year) ? '✓' : ''}
                            </span>
                            {year}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quarter Column */}
                    <div className="pr-3 sm:px-6">
                      <div className="space-y-2">
                        {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => (
                          <div
                            key={quarter}
                            onClick={() => setSelectedQuarter(parseInt(quarter.replace('Q', '')))}
                            className={`cursor-pointer px-3 rounded-2xl font-bold max-w-36 mx-auto transition-all duration-300 ${selectedQuarter === parseInt(quarter.replace('Q', ''))
                              ? 'bg-stone-900 text-orangegold' : ''}`} >
                            {quarter}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
                <div className="flex justify-center md:mt-8 my-4" >
                  <Link href={`/box-office/results/${BoxOfficeData.selected_week_year}/W${BoxOfficeData.selected_week}`}>
                    <button className=" border border-white text-white px-20 py-1 rounded-3xl hover:bg-gray-600 transition-colors text-lg">
                      View More
                    </button>
                  </Link>
                </div>
              </div>
              <div className="bxtrends_right text-white text-2xl w-full max-w-calc(100% - 500px)">
                <div className="flex items-center justify-center">
                  <BoxofficeTrensChart data={chartSeriesData} quarter={selectedQuarter as 1 | 2 | 3 | 4} blinkerWeek={currentWeek} selectedYears={selectedYears} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Placement - After Trends Chart */}
        <AdPlaceholder
          variant="fullwidth"
          id="boxoffice-ad-1"
          sectionClass="boxoffice-ad-section bg-stone-900 py-6"
        />

        <section className="bxmovietable bg-white py-10 md:py-16">
          <div className="container">
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-4xl font-bold md:mb-8 mb-4">Top Movies </h2>
              {/* Filter Buttons */}
              <div className="mb-4">
                <div className="inline-flex flex-wrap sm:bg-black rounded-xl p-1.5 gap-2">
                  {bxbnrboxlist.map((filter, index) => (
                    <div className="tabfilter-item" key={index}>
                      <button
                        onClick={() => setSelectedFilter(filter.title)}
                        className={`px-3 md:px-6 py-2 rounded-full font-bold text-sm transition-colors ${selectedFilter === filter.title
                          ? 'bg-orangegold text-black'
                          : 'bg-white text-black hover:bg-gray-100'
                          }`}
                      >
                        {filter.title}
                      </button>
                      <label className={`text-sm  block text-center mt-2 ${selectedFilter === filter.title
                        ? 'text-orangegold'
                        : 'sm:text-gray-100'
                        } `} dangerouslySetInnerHTML={{ __html: filter.table_dates }}></label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Data Table */}
            <Greytable data={tableinfo} selectedFilter={selectedFilter as 'Last Weekend' | 'Last Week' | 'This Quarter' | 'This Year'} />
          </div>
        </section>

        {/* Ad Placement - After Table */}
        <AdPlaceholder
          variant="fullwidth"
          id="boxoffice-ad-2"
          sectionClass="boxoffice-ad-section bg-white py-6"
        />
      </div>
    </>
  );
};

export default Boxoffice;