import { useState, useEffect } from 'react';
import tile from '@/public/images/Grid_View.svg';
import tableview from '@/public/images/icon-table.svg';
import HeadComponent from '@/components/HeadComponent';
import BoxOfficeResultsNavigation from '@/components/FilmData/DetailPages/BoxOfficeResults/Navigation';
import BoxOfficeResultTable from '@/components/FilmData/DetailPages/BoxOfficeResults/BoxOfficeResultTable';
import BoxOfficeResultTile from '@/components/FilmData/DetailPages/BoxOfficeResults/Boxofficetile';
import Loader from '@/components/Loader';

const tableConfig = [//top movies quarterly/yearly
  { title: 'Year', sortable: true, max_width: 'w-24', key: 'year' },
  { title: 'Dates', sortable: false, max_width: 'min-w-40', key: 'year_date' },
  { title: 'Film Weeks', sortable: false, max_width: 'min-w-30', key: 'total_week' },
  { title: 'Total', sortable: false, max_width: 'w-24', key: 'total', isCurrency: true },
  { title: '+-LY', sortable: false, max_width: 'min-w-30', key: 'ly', pctField: true },
  { title: 'Releases', sortable: true, max_width: 'max-w-24', key: 'movies_total' },
  { title: 'Top Titles', sortable: false, max_width: 'min-w-30', key: 'top_movies' },
];

const currentYear = new Date().getFullYear();
const meta_title = `Box Office Totals for All Years | Screendollars Box Office`;
const meta_description = `Box Office Totals for ${currentYear}-2017 in the Domestic Box Office.`;
const canonical_url = process.env.NEXT_PUBLIC_FRONTEND_URL + '/box-office/totals/';

interface AllYearsSummaryProps {
  // Add your props here
  SEOdata: any;
  BoxOfficeResultData: any;
}

type ViewType = 'table' | 'tile';


export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + '/box-office-results/highest-grossing-movies/');
  const SEOdata = await res.json();

  const BoxOffice = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-boxoffice/box_office_year_summery.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  const BoxOfficeResultData = await BoxOffice.json();

  return {
    props: { SEOdata, BoxOfficeResultData },
    revalidate: 10,
  };
}

const AllYearsSummary: React.FC<AllYearsSummaryProps> = ({ SEOdata, BoxOfficeResultData }) => {
  const [currentView, setCurrentView] = useState<ViewType>('table');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [sortarrow, setSortarrow] = useState('');
  const [asds, setAsds] = useState('hidden');
  const [tabledata, setTabledata] = useState(BoxOfficeResultData.year_summery);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  useEffect(() => {
    let sortableItems = [...tabledata];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        // Convert to numbers if the values are numeric strings or numbers
        const aNum = !isNaN(parseFloat(aValue)) ? parseFloat(String(aValue).replace(/,/g, '')) : null;
        const bNum = !isNaN(parseFloat(bValue)) ? parseFloat(String(bValue).replace(/,/g, '')) : null;

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
        setSortarrow(sortConfig.key);
      }
    }
    setTabledata(sortableItems);
  }, [sortConfig]);


  const OnSortByChange = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
      setAsds('hidden');
    } else {
      setAsds('');
    }
    setSortConfig({ key, direction });
  };

  const renderView = () => {
    switch (currentView) {
      case 'table':
        return <BoxOfficeResultTable data={tabledata} tableConfig={tableConfig} OnSortByChange={OnSortByChange} sortarrow={sortarrow} asds={asds} currentLayout='AY' />;
      case 'tile':
        return <BoxOfficeResultTile data={tabledata} currentLayout='AY' />;//All-time Top movies Tile view (ATT)
      default:
        return <BoxOfficeResultTable data={tabledata} tableConfig={tableConfig} OnSortByChange={OnSortByChange} sortarrow={sortarrow} asds={asds} currentLayout='AY' />;
    }
  };
  return (
    <>
      <HeadComponent meta_title={meta_title} meta_description={meta_description} canonical_url={canonical_url} />
      <div className='box_title pt-4 md:pt-5'>
        <div className='container'>
          <div className='text-center'>
            <h1 className='block lg:inline-block align-top pvr pr-0 lg:pt-3 transition-all duration-300 ease-out text-center'>Box Office Totals for All Years</h1>
            <p>Totals for {currentYear}-2017 in the Domestic Box Office</p>
          </div>
        </div>
      </div>
      <div className='boxresulinfo'>
        <div className='container'>
          <div className='boxresultable'>
            <div className='boxtableswich my-3 text-center xsm:text-right sticky top-0 z-20 bg-white pt-3'>

              <ul className={'viewsbox ttab flex xsm:inline-flex flex-wrap list-none mb-1 ml-0 xsm:ml-4 justify-center ' + (currentView === 'tile' ? 'off' : '')}>
                <li
                  className={`tab_items ${currentView === 'table' ? 'bg-gold' : ''}`}
                  onClick={() => handleViewChange('table')}
                >
                  <img src={tableview.src} alt='' title='Table View' />
                </li>
                <li
                  className={`tab_items ${currentView === 'tile' ? 'bg-gold' : ''}`}
                  onClick={() => handleViewChange('tile')}
                >
                  <img src={tile.src} alt='' title='Tile View' />
                </li>
              </ul>
            </div>
            {isLoading ? (
              <div className='pvr container' style={{ marginBottom: 40 }}>
                <div className='lodarhight'>
                  <Loader />
                </div>
              </div>
            ) : (
              renderView()
            )}
          </div>
          <div className='mt-4'>
            <p className='text-sm'><b>Note:</b> Amounts shown include domestic box office earned within the specified year.  For example, if a movie is released in December 2024, some of its box office collection will take place within the weeks in December and the remainders of its box office collections will take place in January 2025 and following months.  In this case, a portion of that movie's box office will be counted within 2024 totals and the rest in 2025.</p>
          </div>
        </div>
      </div>


    </>
  );
};

export default AllYearsSummary;
