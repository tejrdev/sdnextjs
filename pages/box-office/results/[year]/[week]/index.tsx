import axios from 'axios';
import { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next/types';
import Loader from '@/components/Loader';
import { useRouter } from 'next/router';
import Boxofficetitle from '@/components/FilmData/DetailPages/BoxOfficeResults/Boxofficetitle';
import BoxOfficeResultsNavigation from '@/components/FilmData/DetailPages/BoxOfficeResults/Navigation';
import BoxOfficeResultTable from '@/components/FilmData/DetailPages/BoxOfficeResults/BoxOfficeResultTable';
import BoxOfficeResultTile from '@/components/FilmData/DetailPages/BoxOfficeResults/Boxofficetile';
import tile from '@/public/images/Grid_View.svg';
import tablelist from '@/public/images/List_table_View.svg';
import HeadComponent from '@/components/HeadComponent';
/* import ScrollTop from '@/components/All/ScrollTop'; */
import createFilmCalendar from '@/utils/filmCalendar';

// Types
interface BoxOfficeData {
  title: string;
  year: string;
  week: string;
  boxoffice_data: any[];
  boxoffice_data_weekly: any[];
  box_office_year: string[];
}

interface BoxOfficeResultsProps {
  data: any;
  BoxOfficeLoadedData: BoxOfficeData;
  year: string;
  week: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const year = params?.year;
  const week = (params?.week as string).replace('W', '');

  try {
    // Fetch data from external API
    const BoxOffice = await fetch(
      process.env.NEXT_PUBLIC_SD_API +
      '/movie-boxoffice/box_office_select_week.php?api_token=' +
      process.env.NEXT_PUBLIC_API_TOKEN +
      '&boxoffice_result=true&a_year=' + year + '&a_week=' + week
    );
    const BoxOfficeLoadedData = await BoxOffice.json();

    return {
      props: { BoxOfficeLoadedData, year, week },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { BoxOfficeLoadedData: {} },
      revalidate: 10,
    };
  }
}

const BoxOfficeResults: React.FC<BoxOfficeResultsProps> = ({ BoxOfficeLoadedData, year, week }) => {
  const router = useRouter();
  const { tab } = router.query;
  // State management
  const [dataLoaded, setDataLoaded] = useState<boolean>(true);
  const [boxOfficeResultData, setBoxOfficeResultData] = useState<BoxOfficeData>(BoxOfficeLoadedData);
  const [toggleon, setToggleon] = useState<boolean>(tab === 'weekly' ? true : false);
  const [tableon, setTableon] = useState<boolean>(false);
  const [currentyear, setCurrentyear] = useState<number>(parseInt(year));
  const [currentWeek, setCurrentWeek] = useState<number>(parseInt(week));
  const [readYearFromURL, setReadYearFromURL] = useState<boolean>(false);
  const [blnDataChanged, setblnDataChanged] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' }>({
    key: '',
    direction: 'ascending'
  });
  const [sortarrow, setSortarrow] = useState<string>('');
  const [asds, setAsds] = useState<string>('hidden');
  const [tabledata, setTabledata] = useState<any[]>(
    toggleon ? boxOfficeResultData.boxoffice_data_weekly : boxOfficeResultData.boxoffice_data
  );

  const currentYear = new Date().getFullYear();
  const yearsData: number[] = Array.from({ length: currentYear - 2017 + 1 }, (_, index) => currentYear - index);
  const tableConfig = [//selected week
    { title: 'Rank', sortable: true, max_width: 'min-w-20', key: 'rank' },
    { title: 'Title', sortable: true, max_width: 'min-w-40', key: 'title' },
    { title: 'Rating', sortable: true, max_width: 'min-w-16', key: 'rating' },
    { title: 'Distributor', sortable: true, max_width: '', key: 'distributor_name' },
    { title: toggleon ? 'Total Weekly' : 'Total Weekend', sortable: true, max_width: 'w-26', key: toggleon ? 'weekly_gross_order' : 'weekend_gross_order', isCurrency: true },
    { title: '+-LW', sortable: false, max_width: 'max-w-14', key: toggleon ? 'weekly_gross_change' : 'weekend_gross_change', pctField: true },
    { title: 'Locations', sortable: true, max_width: 'min-w-30', key: toggleon ? 'weekly_locations' : 'weeked_locations' },
    { title: '+-LW', sortable: false, max_width: 'max-w-14', key: toggleon ? 'weekly_locations_change' : 'weeked_locations_change' },
    { title: 'Avg. Per Location', sortable: true, max_width: 'max-w-20', key: 'per_theater_avg', isCurrency: true, roundoffReqd: true },
    { title: 'Total To-Date', sortable: true, max_width: 'max-w-24', key: toggleon ? 'weekly_total' : 'weekend_total', isCurrency: true },
    { title: 'Weeks', sortable: true, max_width: 'min-w-22', key: 'week' },
  ];

  const meta_title = 'Box Office Results: Weekend & Weekly Performance';
  const meta_description = 'Track domestic box office results with updated weekend and weekly performance data, including grosses, theater counts, and trends.';
  const canonicalUrl = process.env.NEXT_PUBLIC_FRONTEND_URL + '/box-office/results/' + currentyear + '/W' + currentWeek + '/';
  const robots = 'noindex, nofollow';

  // Utility functions
  const getDateOfWeek = (w: number, y: number): Date => {
    let date = new Date(y, 0, 1 + (w - 1) * 7);
    date.setDate(date.getDate() + (5 - date.getDay()));
    return date;
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    // timeZone: 'en-US',
    month: 'short',
    day: 'numeric',
    // year: 'numeric'
  };
  const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);

  const startDate = new Date(getDateOfWeek(currentWeek, currentyear));
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
  const formattedStartDate = dateFormatter.format(startDate);
  const formattedEndDate = dateFormatter.format(endDate);
  const weekendEndDate = new Date(startDate);
  weekendEndDate.setDate(weekendEndDate.getDate() + 2);
  const formattedWeekendEndDate = dateFormatter.format(weekendEndDate);

  // Generate JSON-LD schema
  const generateJsonLd = () => {
    const movieData = toggleon ? BoxOfficeLoadedData.boxoffice_data_weekly : BoxOfficeLoadedData.boxoffice_data;
    const movieList = movieData.map((item, index) => ({
      '@type': 'Movie',
      'position': index + 1,
      'name': item.title,
      'image': item.poster_url,
      'url': process.env.NEXT_PUBLIC_FRONTEND_URL + item.permalink,
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': BoxOfficeLoadedData.title,
      'url': 'https://screendollars.com/box-office-results/',
      'description': `${formattedStartDate} - ${formattedEndDate}`,
      'itemListElement': {
        '@type': 'ItemList',
        'name': 'Movies',
        'itemListElement': movieList
      },
    };
  };

  // Event handlers
  const togglehandle = (): void => setToggleon(!toggleon);
  const tablehandle = (): void => setTableon(!tableon);

  const onWeekChange = (year: number, weekselect: number): void => {
    setCurrentyear(year);
    setCurrentWeek(weekselect);
  };

  const onYearChange = (year: number): void => {
    setCurrentyear(year);
    setCurrentWeek(0);
  };

  // API call function
  const loadFilterData = async (): Promise<void> => {

    setDataLoaded(false);
    setReadYearFromURL(false);

    let sd_api = `${process.env.NEXT_PUBLIC_SD_API}/movie-boxoffice/box_office_select_week.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}&boxoffice_result=true&a_year=${currentyear}&a_week=${currentWeek}`;

    try {
      const response = await axios.get(sd_api);
      setDataLoaded(true);
      setBoxOfficeResultData(response.data);
      setblnDataChanged(false);
    } catch (error) {
      console.error('Error loading filter data:', error);
      setDataLoaded(true);
    }
    router.push('/box-office/results/' + currentyear + '/W' + currentWeek + '/');
  };

  // Effects
  useEffect(() => {
    if (tab === 'weekly') {
      setToggleon(true);
    } else {
      setToggleon(false);
    }
  }, [router.query, router]);

  useEffect(() => {
    if (toggleon) {
      router.push(`/box-office/results/${currentyear}/W${currentWeek}/?tab=weekly`);
    } else {
      router.push(`/box-office/results/${currentyear}/W${currentWeek}/?tab=weekend`);
    }
  }, [toggleon]);

  useEffect(() => {
    if ((currentWeek !== parseInt(boxOfficeResultData.week) && currentWeek !== 0) || readYearFromURL) {
      loadFilterData();
    }
  }, [currentWeek, readYearFromURL, currentyear]);

  useEffect(() => {
    if (!sortConfig.key) return;

    const sortableItems = [...tabledata].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Convert to numbers if the values are numeric strings or numbers
      const aNum = !isNaN(parseFloat(String(aValue).replace(/,/g, '')))
        ? parseFloat(String(aValue).replace(/,/g, ''))
        : null;
      const bNum = !isNaN(parseFloat(String(bValue).replace(/,/g, '')))
        ? parseFloat(String(bValue).replace(/,/g, ''))
        : null;

      // If both values can be converted to numbers, do numeric comparison
      if (aNum !== null && bNum !== null) {
        return sortConfig.direction === 'ascending' ? aNum - bNum : bNum - aNum;
      }

      // Handle strings (case-insensitive)
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();

      if (aString < bString) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aString > bString) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }

      return 0;
    });

    setSortarrow(sortConfig.key);
    setTabledata(sortableItems);
  }, [sortConfig]);

  const onSortByChange = (key: string): void => {
    const direction = (sortConfig.key === key && sortConfig.direction === 'ascending')
      ? 'descending'
      : 'ascending';

    setAsds(direction === 'descending' ? 'hidden' : '');
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (!boxOfficeResultData) return;

    let newTableData: any[] = toggleon ? boxOfficeResultData.boxoffice_data_weekly : boxOfficeResultData.boxoffice_data;
    setTabledata([...newTableData]);

    // Update ranks for SW layout
    if (!blnDataChanged) {
      boxOfficeResultData.boxoffice_data_weekly?.forEach((item, index) => {
        item.rank = index + 1;
      });
      boxOfficeResultData.boxoffice_data?.forEach((item, index) => {
        item.rank = index + 1;
      });
    }
  }, [boxOfficeResultData, toggleon, blnDataChanged]);

  type Week = {
    weekNumber: number;
    startDate: Date;
    endDate: Date;
    formattedRange: string;
    isCurrentWeek: boolean;
  };

  const [weeks, setWeeks] = useState<Week[]>([]);
  //const [weekselect, setWeekselect] = useState(currentWeek);

  useEffect(() => {
    const filmCalendar = createFilmCalendar(currentyear);
    const allWeeks = filmCalendar.getAllWeeks();
    setWeeks(allWeeks);

    // Find current week if viewing current year
    // if (selectedYear === new Date().getFullYear()) {
    //   const currentWeek = allWeeks.find((week) => week.isCurrentWeek) || 0;
    //   setWeekselect(currentWeek.weekNumber);
    // }
  }, [currentyear]);

  useEffect(() => {
    currentWeek && onWeekChange(currentyear, currentWeek);
  }, [currentWeek]);

  const infoweekhandler = (e) => {
    if (e.target.value === '0') return;
    setCurrentWeek(parseInt(e.target.value));
  };

  return (
    <>
      <HeadComponent jsonSchema={generateJsonLd()} meta_title={meta_title} meta_description={meta_description} canonical_url={canonicalUrl} robots={robots} />
      {/* <BoxOfficeResultsNavigation /> count week start and end date for description*/}
      <div className={'boxofresult'}>
        <Boxofficetitle
          title={toggleon ? `Box Office Results for ${currentyear} Week ${currentWeek} Weekly` : `Box Office Results for ${currentyear} Week ${currentWeek} Weekend`}
          description={toggleon ? `Domestic Box Office Results for ${currentyear} Week ${currentWeek} (7-Day ${formattedStartDate} - ${formattedEndDate})` : `Domestic Box Office Results for ${currentyear} Week ${currentWeek} (3-Day ${formattedStartDate} - ${formattedWeekendEndDate})`}
        />


        <div className='boxresulinfo'>
          <div className='container'>
            <div className='boxresultable'>
              <div className='boxtableswich my-3 text-left xsm:text-right flex flex-wrap xsm:justify-between justify-center sticky top-0 z-20 bg-white pt-3'>
                <div className='boxresultchoice inline-block align-top w-full lg:w-auto'>
                  <div className='bxr_selectinfo xsm:flex lg:block flex-wrap justify-center'>
                    <div className='bxrselectbox mb-3 xsm:mx-2 lg:ml-0 lg:mr-4 yearselecing xsm:inline-block align-top'>
                      <select
                        name='YearSelect'
                        className='globalselect'
                        value={currentyear}
                        onChange={(e) => {
                          onYearChange(parseInt(e.target.value));
                        }}>
                        {yearsData.map((item, i) => (
                          <option value={item} key={i}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='bxrselectbox mb-3 xsm:mx-2 lg:ml-0 lg:mr-4 weekselecing xsm:inline-block align-top'>
                      <select name='WeekSelect' id='WeekSelect' className='globalselect' value={currentWeek} onChange={infoweekhandler}>
                        <option value={0}>{'Select Week'}</option>
                        {weeks
                          .slice()
                          .reverse()
                          .map((week, i) => (
                            <option value={week.weekNumber} key={i}>
                              {week.formattedRange} (Week {week.weekNumber})
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className='mx-auto lg:mx-0 '>
                  <ul className={`ttab flex xsm:inline-flex flex-wrap mb-2 ml-0 list-none justify-center ${toggleon ? 'off' : ''}`}>
                    <li
                      className={`tab_items min-w-28 ${toggleon ? '' : 'bg-gold'}`}
                      data-title='Weekend'
                      id='weekend_colection_data'
                      onClick={togglehandle}
                    >
                      Weekend
                    </li>
                    <li
                      className={`tab_items min-w-28 ${toggleon ? 'bg-gold' : ''}`}
                      data-title='Weekly'
                      id='weekely_colection_data'
                      onClick={togglehandle}
                    >
                      Weekly
                    </li>
                  </ul>

                  <ul className={`viewsbox ttab flex xsm:inline-flex flex-wrap list-none mb-1 ml-0 xsm:ml-4 justify-center ${tableon ? 'off' : ''}`}>
                    <li
                      className={`tab_items ${tableon ? '' : 'bg-gold'}`}
                      onClick={tablehandle}
                    >
                      <img src={tablelist.src} alt='Table View' title='Table View' />
                    </li>
                    <li
                      className={`tab_items ${tableon ? 'bg-gold' : ''}`}
                      onClick={tablehandle}
                    >
                      <img src={tile.src} alt='Tile View' title='Tile View' />
                    </li>
                  </ul>
                </div>
              </div>
              {dataLoaded ? (
                <>
                  {tableon ? (
                    <BoxOfficeResultTile
                      data={tabledata as any}
                      toggleon={toggleon}
                      currentLayout={'SW'}
                      selectedYear={currentyear}
                    />
                  ) : (
                    <BoxOfficeResultTable
                      data={tabledata}
                      toggleon={toggleon}
                      tableConfig={tableConfig}
                      OnSortByChange={onSortByChange}
                      currentLayout={'SW'}
                      sortarrow={sortarrow}
                      asds={asds}
                    />
                  )}
                </>
              ) : (
                <div className='pvr container' style={{ marginBottom: 40 }}>
                  <div className='lodarhight'>
                    <Loader />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
      {/* <ScrollTop /> */}
    </>
  );
};

export default BoxOfficeResults;
