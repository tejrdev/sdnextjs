import { useState, useEffect } from 'react';
import axios from 'axios';
import Toggleview from '../../components/All/Toggleview';
import USAchart from '../../components/Statechartinfo/StateUSA_Chart';
import CanadaChart from '../../components/Statechartinfo/StateCanada_Chart';
import StatePiechart from '../../components/Statechartinfo/StatePiechart';
// import { useRouter } from 'next/router';
import TableView from '@/components/Statechartinfo/TableView';
import TileView from '@/components/Statechartinfo/TileView';
import HeadComponent from '@/components/HeadComponent';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';

// export async function getStaticProps() {
//   const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'exhibitionreport/');
//   const SEOdata = await res.json();

//   let exbData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/state_of_pages/state_of_exhibutor.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&display_by=exhibitors&country=USA');
//   exbData = await exbData.json();

//   return {
//     props: { exbData, SEOdata },
//     revalidate: 10, // In seconds
//   };
// }

export async function getStaticProps() {
  const defaultData = {
    exbData: {
      data: [],
    },
  };

  const fetchConfigs = [
    {
      url: `${process.env.NEXT_PUBLIC_SEO_LINK}exhibitionreport`,
      key: 'SEOdata',
      defaultData: {},
    },
    {
      url: `${process.env.NEXT_PUBLIC_SD_API}/state_of_pages/state_of_exhibutor.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}&display_by=exhibitors&country=USA`,
      key: 'exbData',
      defaultData: defaultData.exbData,
    },
  ];

  return await getStaticPropsWithErrorHandling(fetchConfigs);
}

const State_Exhibitor = ({ exbData, SEOdata, error }) => {
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  // const router = useRouter();

  const [StateExhibitordata, setStateExhibitor] = useState(exbData.data);
  const PageTitle = exbData.title;
  const PageDescription = exbData.content;

  const [tabledata, setTabledata] = useState(StateExhibitordata);
  const [chrtmapdata, setchrtmapdata] = useState(StateExhibitordata);
  const [Total_Screen, setTotal_Screen] = useState(exbData.total_screen);
  const [Total_Theatres, setTotal_Theatres] = useState(exbData.total_location);
  const [tableon, setTableon] = useState(true);
  const [DisplayBy, setDisplayBy] = useState('exhibitors');
  const [Country, setCountry] = useState('USA');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  const [sortarrow, setSortarrow] = useState<any>([]);
  const [asds, setAsds] = useState('hidden');
  const [chartview, setChartview] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);
  const [DataChanged, setDataChanged] = useState(false);

  // const total_theatres = tabledata.reduce((total, entry) => total + parseFloat(entry.location), 0).toLocaleString('en-US');
  // const total_screen = tabledata.reduce((total, entry) => total + parseFloat(entry.screen), 0).toLocaleString('en-US');

  const tableConfig = [
    { title: 'Rank', sortable: true, max_width: 'max-w-14', key: 'id' },
    { title: DisplayBy === 'exhibitors' ? 'Exhibitor Name' : 'State', sortable: true, max_width: 'min-w-40', key: 'title' },
    { title: '# Theatres', sortable: true, max_width: 'w-36', key: 'location' },
    { title: '# Screens', sortable: true, max_width: 'w-40', key: 'screen' },
    { title: 'Market Share', sortable: true, max_width: 'w-36', key: 'market' },
    { title: DisplayBy === 'exhibitors' ? 'Headquarters' : 'Top Exhibitors', sortable: false, max_width: 'max-w-sm', key: 'headquaters' },
  ];

  useEffect(() => {
    if (StateExhibitordata) {
      setTabledata([...StateExhibitordata]);
      setchrtmapdata([...StateExhibitordata]);
    }
  }, [StateExhibitordata]);

  useEffect(() => {
    const loadDetailPageData = () => {
      setShowLoader(true);
      let sd_api = process.env.NEXT_PUBLIC_SD_API + '/state_of_pages/state_of_exhibutor.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&display_by=' + DisplayBy;
      if (Country !== 'All') {
        sd_api += '&country=' + Country;
      }
      axios
        .get(sd_api)
        .then((res) => {
          setStateExhibitor(res.data.data);
          setTotal_Screen(res.data.total_screen);
          setTotal_Theatres(res.data.total_location);
          setShowLoader(false);
          setDataChanged(false);
        })
        .catch((err) => console.log(err));
    };

    if (!DataChanged) return;

    loadDetailPageData();
  }, [Country, DisplayBy]);

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

  const OnDisplayByChange = (e: any) => {
    const selectedValue = e.target.value;
    setDisplayBy(selectedValue);
    setDataChanged(true);
    // router.push({
    //   pathname: router.pathname,
    //   query: { ...router.query, display_by: selectedValue },
    // });
  };
  const OnCountryChange = (e: any) => {
    const selectedValue = e.target.value;
    setCountry(selectedValue);
    setDataChanged(true);
    // router.push({
    //   pathname: router.pathname,
    //   query: { ...router.query, country: selectedValue },
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
          <div className='statetable '>
            <div className='tabletop flex flex-wrap justify-center xl:justify-between sm:flex-row sm:justify-between my-3 md:mt-4'>
              <div className='selection inline-flex flex-col sm:flex-row items-center justify-center mb-3 xl:mb-0 xl:justify-start w-full xl:w-auto'>
                <div className='sortselect mb-2 sm:mb-0 sm:mr-4 flex items-center'>
                  <label htmlFor='' className='mr-2'>
                    Display by
                  </label>
                  <select name='' id='' className='border border-gray-400 rounded-md px-2 py-1 cursor-pointer mr-2' onChange={OnDisplayByChange}>
                    <option value='exhibitors'>Exhibitors</option>
                    <option value='states'>States</option>
                  </select>
                </div>
                <div className='headqurterselect flex items-center'>
                  <label htmlFor='' className='mr-2'>
                    Headquarters in
                  </label>
                  <select name='' id='' className='border border-gray-400 rounded-md px-2 py-1 cursor-pointer mr-2' onChange={OnCountryChange}>
                    <option value='USA'>USA</option>
                    <option value='CAN'>Canada</option>
                    <option value='All'>USA & Canada</option>
                  </select>
                </div>
              </div>

              <div className='inline-flex flex-wrap w-full xl:w-auto justify-center xl:justify-end'>
                <div className='totalsnum flex flex-col xsm:flex-row w-full xsm:w-auto'>
                  <p className='mx-4 xsm:mt-3 text-center'>
                    Total Theatres: <strong>{Total_Theatres.toLocaleString('en-US')}</strong>
                  </p>
                  <p className='mx-4 xsm:mt-3 text-center'>
                    Total Screens: <strong>{Total_Screen.toLocaleString('en-US')}</strong>
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
                {DisplayBy === 'exhibitors' ? (
                  <div>
                    <h2> Exhibitors Market Share - {Country === 'All' ? 'USA & Canada' : Country === 'CAN' ? 'Canada' : Country}</h2>
                    <div className='mt-5 mx-auto sm:max-w-xl'>
                      <StatePiechart chrtmapdata={chrtmapdata} requestFrom='Exhibitor' />
                    </div>
                  </div>
                ) : DisplayBy === 'states' && (Country === 'USA' || Country === 'All') ? (
                  <div className='mt-5 mx-auto '>
                    <USAchart chrtmapdata={chrtmapdata} />
                  </div>
                ) : (
                  <div className='mt-5 mx-auto '>
                    <CanadaChart chrtmapdata={chrtmapdata} />
                  </div>
                )}
              </div>
            ) : (
              <div className='boxviews'>
                {tableon ? (
                  <TableView requestFrom='Exhibitor' DisplayBy={DisplayBy} tabledata={tabledata} tableConfig={tableConfig} requestSort={requestSort} sortarrow={sortarrow} asds={asds} />
                ) : (
                  <TileView requestFrom='Exhibitor' DisplayBy={DisplayBy} tabledata={tabledata} tableConfig={tableConfig} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default State_Exhibitor;
