import { useState, useMemo } from 'react';
import tile from '@/public/images/Grid_View.svg';
import tablelist from '@/public/images/List_table_View.svg';
import HeadComponent from '@/components/HeadComponent';
import BoxOfficeResultTile from '@/components/FilmData/DetailPages/BoxOfficeResults/Boxofficetile';
import chartimg from '@/public/images/ChartPieSlice.svg';
import BoxOfficeRatingChart from '@/components/FilmData/DetailPages/BoxOfficeResults/BoxOfficeRatingChart';
import { RatingDataItem } from '@/types/boxofficeresults';
import Link from 'next/link';

interface MoviesByRatingsProps {
  BoxOfficeResultData: {
    data: RatingDataItem[];
  };
}

export async function getStaticProps() {
  // Fetch data from external API
  const BoxOffice = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-boxoffice/box_office_yearly_rating.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  const BoxOfficeResultData = await BoxOffice.json();

  return {
    props: { BoxOfficeResultData },
    revalidate: 10,
  };
}
type ViewType = 'table' | 'tile' | 'chart';
interface ToggleviewProps {
  viewpass: (view: ViewType) => void;
}

const MoviesByRatings: React.FC<MoviesByRatingsProps> = ({ BoxOfficeResultData }) => {
  const [tableon, setTableon] = useState<ViewType>('table');
  const tablehandle = (view: ViewType) => {
    setTableon(view);
    //viewpass(view);
  };

  // Process data for table view - ratings as rows, years as columns
  const tableData = useMemo(() => {
    if (!BoxOfficeResultData?.data || BoxOfficeResultData.data.length === 0) {
      return { ratings: [], years: [], sortedData: [] as RatingDataItem[] };
    }

    // Sort years descending (newest first)
    const sortedYears = [...BoxOfficeResultData.data].sort((a, b) => b.year - a.year);
    const years = sortedYears.map(item => item.year);

    // Define ratings with their corresponding keys
    const ratings = [
      { label: 'G', key: 'G_total', perKey: 'G_total_per', link: '/box-office/highest-grossing/all-years/g/' },
      { label: 'PG', key: 'PG_total', perKey: 'PG_total_per', link: '/box-office/highest-grossing/all-years/pg/' },
      { label: 'PG-13', key: 'PG_13_total', perKey: 'PG_13_total_per', link: '/box-office/highest-grossing/all-years/pg-13/' },
      { label: 'R', key: 'R_total', perKey: 'R_total_per', link: '/box-office/highest-grossing/all-years/r/' },
      { label: 'Other', key: 'other_total', perKey: 'other_total_per', link: '' },
      { label: 'Total', key: 'yearly_total', perKey: 'total_per', link: '', isTotal: true },
    ];

    return { ratings, years, sortedData: sortedYears };
  }, [BoxOfficeResultData]);

  const meta_title = `Box Office Totals by Rating for All Years | Screendollars Box Office`;
  const meta_description = `Box Office Totals by Rating for All Years in the Domestic Box Office.`;
  const canonical_url = process.env.NEXT_PUBLIC_FRONTEND_URL + '/box-office/totals/rating/';

  return (
    <>
      <HeadComponent meta_title={meta_title} meta_description={meta_description} canonical_url={canonical_url} />
      {/* <BoxOfficeResultsNavigation /> */}
      <div className='box_title pt-4 md:pt-5'>
        <div className='container'>
          <div className='text-center'>
            <h1 className='block lg:inline-block align-top pvr pr-0 lg:pt-3 transition-all duration-300 ease-out text-center'>Box Office Totals by Rating for All Years </h1>
            <p>Totals by MPA Rating for 2025-2017 in the Domestic Box Office </p>
          </div>
        </div>
      </div>
      <div className='boxresulinfo'>
        <div className='container'>
          <div className='boxresultable'>
            <div className='boxtableswich my-3 text-center xsm:text-right sticky top-0 z-20 bg-white pt-3'>

              <ul className={'viewsbox inline-flex flex-wrap list-none mb-1  justify-center border border-gray-500 rounded-lg overflow-hidden max-w-[150px] mx-auto' + (tableon ? 'off' : '')}>
                <li className={'tab_items cursor-pointer border-r border-gray-500 px-3 py-2 ' + (tableon === 'table' ? 'bg-gold' : '')} onClick={() => tablehandle('table')}>
                  <img src={tablelist.src} alt='' title='Table View' />
                </li>
                <li className={'tab_items cursor-pointer border-r border-gray-500 px-3 py-2 ' + (tableon === 'tile' ? 'bg-gold' : '')} onClick={() => tablehandle('tile')}>
                  <img src={tile.src} alt='' title='Tile View' />
                </li>
                <li
                  className={`chartview cursor-pointer  rounded-r-lg flex justify-center items-center w-12 h-11 ml-[-1px] ${tableon === 'chart' ? 'on bg-gold' : 'off grayscale'}`}
                  onClick={() => tablehandle('chart')}
                >
                  <img src={chartimg.src} alt='' className='mx-auto max-w-8' />
                </li>
              </ul>
            </div>
            {tableon === 'tile' && (
              <BoxOfficeResultTile data={BoxOfficeResultData.data as any} currentLayout='RY' /> //rating yearly
            )}
            {tableon === 'table' && (
              <div className='overflow-x-auto'>
                <table className='responsive dataTable w-full mb-10'>
                  <thead>
                    <tr>
                      <th data-title='Rating' className='text-center md:min-w-[100px]'>Rating</th>
                      {tableData.years.map((year) => (
                        <th key={year} data-title={year} className='text-center md:min-w-[100px]'>
                          <Link href={`/box-office/highest-grossing/${year}`} className="text-black">{year}</Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.ratings.map((rating) => (
                      <tr key={rating.label}>
                        <td data-title='Rating' className={rating.isTotal ? 'text-gray-600 font-bold' : ''}>
                          {rating.link ? (
                            <Link href={rating.link} className='text-gray-600 font-bold hover:text-gold'>
                              {rating.label}
                            </Link>
                          ) : (
                            rating.label
                          )}
                        </td>
                        {tableData.years.map((year) => {
                          const yearData = tableData.sortedData.find(item => item.year === year);
                          const value = yearData ? (yearData[rating.key as keyof RatingDataItem] as number) : 0;
                          const perValue = yearData && !rating.isTotal
                            ? (yearData[rating.perKey as keyof RatingDataItem] as string) || ''
                            : yearData && rating.isTotal
                              ? (yearData[rating.perKey as keyof RatingDataItem] as string) || ''
                              : '';

                          return (
                            <td
                              key={year}
                              data-title={year}
                              className={rating.isTotal ? 'font-bold text-gray-600 text-center md:min-w-[100px]' : ''}
                            >
                              <Link href={`/box-office/highest-grossing/${year}/${rating.label.toLowerCase()}`} className="text-black hover:text-gold">
                                {value != null && value !== 0 ? `$${Number(value).toLocaleString()}` : '-'}
                                {perValue && !rating.isTotal && (
                                  <>
                                    <br />
                                    <span className='text-sm text-gray-600 hover:text-gold'>{perValue}</span>
                                  </>
                                )}
                                {perValue && rating.isTotal && (
                                  <>
                                    <br />
                                    <span className='text-sm text-gray-600 hover:text-gold'>{perValue}</span>
                                  </>
                                )}
                              </Link>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {tableon === 'chart' && (
              <BoxOfficeRatingChart data={BoxOfficeResultData.data} />
            )}
          </div>
        </div>
      </div>


    </>
  );
};

export default MoviesByRatings;
