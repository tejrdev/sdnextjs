import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Toggleview from '../../components/All/Toggleview';
import StatePiechart from '../../components/Statechartinfo/StatePiechart';
import TableView from '@/components/Statechartinfo/TableView';
import TileView from '@/components/Statechartinfo/TileView';
import HeadComponent from '@/components/HeadComponent';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';

// export async function getStaticProps() {
//   const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'distributionreport/');
//   const SEOdata = await res.json();
//   let distributorData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/state_of_pages/state_of_distributors.php?year=2024');
//   distributorData = await distributorData.json();

//   return {
//     props: { distributorData, SEOdata },
//     revalidate: 10, // In seconds
//   };
// }

export async function getStaticProps() {
  const defaultData = {
    distributorData: {
      data: [],
    },
  };

  const fetchConfigs = [
    {
      url: `${process.env.NEXT_PUBLIC_SEO_LINK}distributionreport`,
      key: 'SEOdata',
      defaultData: {},
    },
    {
      url: `${process.env.NEXT_PUBLIC_SD_API}/state_of_pages/state_of_distributors.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
      key: 'distributorData',
      defaultData: defaultData.distributorData,
    },
  ];

  return await getStaticPropsWithErrorHandling(fetchConfigs);
}

const State_Distributor = ({ distributorData, SEOdata, error }) => {
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  // Safely access distributorData properties with fallbacks
  const safeDistributorData = distributorData || {};
  const [StateDistributorData, setStateDistributor] = useState(safeDistributorData.data || []);
  const PageTitle = safeDistributorData.title || 'Distribution Report';
  const PageDescription = safeDistributorData.content || '';
  const [tabledata, setTabledata] = useState(StateDistributorData);
  const [chrtmapdata, setchrtmapdata] = useState(StateDistributorData);
  const [tableon, setTableon] = useState(true);
  const [SelectedYear, setSelectedYear] = useState(safeDistributorData.year || '2024');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  const [sortarrow, setSortarrow] = useState<any>([]);
  const [asds, setAsds] = useState('hidden');
  const [chartview, setChartview] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);
  const [DataChanged, setDataChanged] = useState(false);
  const currentYear = new Date().getFullYear();
  const yearsData: number[] = useMemo(() =>
    Array.from({ length: currentYear - 2017 + 1 }, (_, index) => currentYear - index),
    [currentYear]
  );

  const tableConfig = [
    { title: 'Rank', sortable: true, max_width: 'max-w-14', key: 'id' },
    { title: 'Distributor Name', sortable: true, max_width: '', key: 'title' },
    { title: '# New Movies Released', sortable: true, max_width: 'max-w-24', key: 'new_movies' },
    { title: '# Movies in Distribution', sortable: true, max_width: 'max-w-24', key: 'total_movies' },
    { title: 'Box Office Total', sortable: true, max_width: 'max-w-32x', key: 'box_office' },
    { title: 'Box Office Market Share', sortable: true, max_width: 'max-w-28', key: 'market' },
  ];

  const total_new_movies = tabledata.reduce((total, entry) => {
    const newMovies = entry?.new_movies ? parseFloat(entry.new_movies) : 0;
    return total + (isNaN(newMovies) ? 0 : newMovies);
  }, 0).toFixed(0);
  const total_box_office = tabledata.reduce((total, entry) => {
    const boxOffice = entry?.box_office ? parseFloat(entry.box_office) : 0;
    return total + (isNaN(boxOffice) ? 0 : boxOffice);
  }, 0).toLocaleString('en-US');

  type DateOptions = {
    timeZone: string;
    month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day: 'numeric' | '2-digit';
    year: 'numeric' | '2-digit';
  };

  const dateOptions: DateOptions = { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' };
  const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);

  const getYearStartEndDates = (year: number) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    // Get first day of the year
    const firstDay = new Date(year, 0, 1);
    const firstDayNextYear = new Date(year + 1, 0, 1);

    // Find first Friday
    const firstFriday = new Date(firstDay);
    while (firstFriday.getDay() !== 5) {
      // 5 represents Friday
      firstFriday.setDate(firstFriday.getDate() + 1);
    }
    firstFriday.setDate(firstFriday.getDate() + 1);
    let lastThursday;
    if (year === currentYear) {
      // If current year, get the most recent Thursday
      lastThursday = new Date(currentDate);
      while (lastThursday.getDay() !== 4) {
        // 4 represents Thursday
        lastThursday.setDate(lastThursday.getDate() - 1);
      }
    } else {
      // Find next year first Friday
      lastThursday = new Date(firstDayNextYear);
      while (lastThursday.getDay() !== 5) {
        // 5 represents Friday
        lastThursday.setDate(lastThursday.getDate() + 1);
      }
    }
    return {
      startDate: firstFriday,
      endDate: lastThursday,
    };
  };

  const StartEndDates = getYearStartEndDates(parseInt(SelectedYear));
  useEffect(() => {
    if (StateDistributorData) {
      setTabledata([...StateDistributorData]);
      setchrtmapdata([...StateDistributorData]);
    }
  }, [StateDistributorData]);

  useEffect(() => {
    const loadDetailPageData = () => {
      setShowLoader(true);
      axios
        .get(process.env.NEXT_PUBLIC_SD_API + '/state_of_pages/state_of_distributors.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&year=' + SelectedYear)
        .then((res) => {
          setStateDistributor(res.data.data);
          setShowLoader(false);
          setDataChanged(false);
        })
        .catch((err) => console.log(err));
    };

    if (!DataChanged) return;

    loadDetailPageData();
  }, [SelectedYear]);

  useEffect(() => {
    let sortableItems = [...tabledata];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Convert to numbers if the values are numeric strings or numbers
        const aNum = !isNaN(parseFloat(aValue)) ? parseFloat(aValue) : null;
        const bNum = !isNaN(parseFloat(bValue)) ? parseFloat(bValue) : null;

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
      if (sortConfig.key !== null) {
        setSortarrow([sortConfig.key]);
      }
    }
    setTabledata(sortableItems);
  }, [sortConfig]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
      setAsds('hidden');
    } else {
      setAsds('');
    }
    setSortConfig({ key, direction });
  };

  const viewhandler = (view: string) => {
    setChartview(false);
    view === 'table' && setTableon(true);
    view === 'tile' && setTableon(false);
    view === 'chart' ? setChartview(!chartview) : setChartview(false);
  };

  const OnYearChange = (e: any) => {
    const selectedValue = e.target.value;
    setSelectedYear(selectedValue);
    setDataChanged(true);
    // router.push({
    //   pathname: router.pathname,
    //   query: { ...router.query, display_by: selectedValue },
    // });
  };

  return (
    <>
      <HeadComponent data={SEOdata} />
      <div className='stateinfo  mb-5'>
        <div className='container '>
          <div className='toptxt text-center  pt-7 md:pt-10 xl:pt-11 border-b-gray-400 border-b'>
            <div className='max-w-4xl mx-auto'>
              <h1 className='md:mb-5'>{PageTitle}</h1>
              <div dangerouslySetInnerHTML={{ __html: PageDescription }}></div>
            </div>
          </div>
          <div className='statetable'>
            <div className='tabletop flex flex-wrap justify-center xl:justify-between sm:flex-row sm:justify-between my-3 md:mt-4'>
              <div className='selection inline-flex flex-col sm:flex-row items-center justify-center mb-3 xl:mb-0 xl:justify-start w-full xl:w-auto'>
                <select name='' id='' value={SelectedYear} onChange={OnYearChange} className='border border-gray-400 rounded-md px-2 py-1 cursor-pointer mr-2'>
                  {yearsData.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <p className='my-2 text-right xsm:text-left'>
                  {dateFormatter.format(StartEndDates.startDate)} - {dateFormatter.format(StartEndDates.endDate)}
                </p>
              </div>
              <div className='inline-flex flex-wrap w-full xl:w-auto justify-center xl:justify-end'>
                <div className='totalsnum flex flex-col xsm:flex-row w-full xsm:w-auto'>
                  <p className='mx-4 xsm:mt-3 text-center'>
                    Total Box Office: <strong>${total_box_office}</strong>
                  </p>
                  <p className='mx-4 xsm:mt-3 text-center'>
                    Movie Released: <strong>{total_new_movies}</strong>
                  </p>
                </div>
                <div className='viewchange text-center flex border border-gray-500 h-11 rounded-lg overflow-hidden  max-w-[150px] md:ml-2'>
                  <Toggleview viewpass={viewhandler} />
                </div>
              </div>
            </div>

            {ShowLoader ? (
              <div className='nowshow_sliderbox pvr' style={{ minHeight: 200, marginBottom: 20 }}>
                <div className='secloder'>
                  <div className='secspinner'></div>
                </div>
              </div>
            ) : chartview ? (
              <div className='statepiechart mt-10 text-center'>
                <h2>
                  Distributor Market Share <br /> USA & Canada - {SelectedYear}
                </h2>
                <div className='mt-5 mx-auto max-w-xl'>
                  <StatePiechart chrtmapdata={chrtmapdata} requestFrom='Distributor' />
                </div>
              </div>
            ) : (
              <div className='boxviews'>
                {tableon ? (
                  <TableView requestFrom='Distributor' selectedYear={SelectedYear} tabledata={tabledata} tableConfig={tableConfig} requestSort={requestSort} sortarrow={sortarrow} asds={asds} />
                ) : (
                  <TileView requestFrom='Distributor' selectedYear={SelectedYear} tabledata={tabledata} tableConfig={tableConfig} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default State_Distributor;